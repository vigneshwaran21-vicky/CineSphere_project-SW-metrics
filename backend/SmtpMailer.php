<?php
class SmtpMailer {
    private $host;
    private $port;
    private $username;
    private $password;
    public $error = '';

    public function __construct($host = 'smtp.gmail.com', $port = 587, $username = '', $password = '') {
        $this->host     = $host;
        $this->port     = $port;
        $this->username = $username;
        $this->password = $password;
    }

    public function send($to, $subject, $message) {
        $crlf = "\r\n";

        // -------------------------------------------------------
        // FIX: EHLO must identify the LOCAL connecting machine,
        // NOT the remote SMTP server (smtp.gmail.com).
        // Sending "EHLO smtp.gmail.com" was causing Gmail to
        // silently drop outgoing mails to external recipients.
        // -------------------------------------------------------
        $local_hostname = gethostname() ?: 'localhost';

        // Fast connection with 4s timeout
        $connect_host = ($this->port == 465 && strpos($this->host, 'ssl://') === false) ? 'ssl://' . $this->host : $this->host;
        $socket = @fsockopen($connect_host, $this->port, $errno, $errstr, 4);
        if (!$socket) {
            // Fallback to standard host if ssl prefix failed
            $socket = @fsockopen($this->host, $this->port, $errno, $errstr, 4);
        }

        if (!$socket) {
            $this->error = "Could not connect to SMTP host [{$this->host}:{$this->port}]: $errstr ($errno)";
            return false;
        }
        stream_set_timeout($socket, 5); // 5s timeout for fast response

        // Greeting
        if (!$this->server_parse($socket, "220")) return false;

        if (strpos($connect_host, 'ssl://') === false && $this->port != 465) {
            // Step 1: EHLO with LOCAL hostname
            fputs($socket, "EHLO $local_hostname" . $crlf);
            if (!$this->server_parse($socket, "250")) return false;

            // Step 2: Upgrade to TLS
            fputs($socket, "STARTTLS" . $crlf);
            if (!$this->server_parse($socket, "220")) return false;

            // Enable encryption on socket
            if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                $this->error = "Failed to enable TLS encryption.";
                fclose($socket);
                return false;
            }

            // Step 3: Re-identify after TLS handshake
            fputs($socket, "EHLO $local_hostname" . $crlf);
            if (!$this->server_parse($socket, "250")) return false;
        } else {
            // Direct SSL Handshake
            fputs($socket, "EHLO $local_hostname" . $crlf);
            if (!$this->server_parse($socket, "250")) return false;
        }

        // Step 4: Authenticate with Gmail App Password
        fputs($socket, "AUTH LOGIN" . $crlf);
        if (!$this->server_parse($socket, "334")) return false;

        fputs($socket, base64_encode($this->username) . $crlf);
        if (!$this->server_parse($socket, "334")) return false;

        fputs($socket, base64_encode($this->password) . $crlf);
        if (!$this->server_parse($socket, "235")) return false;

        // Step 5: Specify sender
        fputs($socket, "MAIL FROM: <{$this->username}>" . $crlf);
        if (!$this->server_parse($socket, "250")) return false;

        // Step 6: Specify recipient (any email address, not just @gmail.com)
        fputs($socket, "RCPT TO: <$to>" . $crlf);
        if (!$this->server_parse($socket, "250")) return false;

        // Step 7: Send email body
        fputs($socket, "DATA" . $crlf);
        if (!$this->server_parse($socket, "354")) return false;

        $headers  = "MIME-Version: 1.0" . $crlf;
        $headers .= "From: CineMatch <{$this->username}>" . $crlf;
        $headers .= "To: $to" . $crlf;
        $headers .= "Subject: $subject" . $crlf;
        $headers .= "Content-Type: text/html; charset=UTF-8" . $crlf;
        $headers .= "X-Mailer: CineMatch-Mailer/1.0" . $crlf;

        fputs($socket, $headers . $crlf . $message . $crlf . "." . $crlf);
        if (!$this->server_parse($socket, "250")) return false;

        // Step 8: Quit cleanly
        fputs($socket, "QUIT" . $crlf);
        fclose($socket);

        return true;
    }

    private function server_parse($socket, $response) {
        $server_response = "";
        // Read multi-line SMTP responses (e.g. 250-... 250 OK)
        while (substr($server_response, 3, 1) !== ' ') {
            $server_response = fgets($socket, 256);
            if ($server_response === false) {
                $this->error = "Lost connection to SMTP server while waiting for response $response.";
                return false;
            }
        }
        if (substr($server_response, 0, 3) !== $response) {
            $this->error = "SMTP error — Expected: $response | Got: " . trim($server_response);
            return false;
        }
        return true;
    }
}
?>
