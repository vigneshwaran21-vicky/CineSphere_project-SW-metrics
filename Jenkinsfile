pipeline {
    agent any

    environment {
        DB_NAME = 'cinesphere_db'
        DB_USER = 'root'
        EC2_USER = 'ubuntu'
        EC2_IP = '15.252.243.69'
        SSH_KEY_ID = 'aws-ssh-key' // Jenkins SSH Credentials ID
        TARGET_DIR = '/var/www/html/CineSphere'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git...'
                checkout scm
            }
        }

        stage('Build & Lint') {
            steps {
                echo 'Running PHP Syntax Validation...'
                sh '''
                    if command -v php >/dev/null 2>&1; then
                        find . -name "*.php" -not -path "*/.*" -exec php -l {} \\;
                    else
                        echo "PHP CLI not found on Jenkins agent, skipping local lint."
                    fi
                '''
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                sshagent([SSH_KEY_ID]) {
                    echo "Deploying CineSphere application to ${EC2_USER}@${EC2_IP}:${TARGET_DIR}..."
                    // Ensure target directory exists and ubuntu user has write permissions
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} 'sudo mkdir -p ${TARGET_DIR} && sudo chown -R ${EC2_USER}:${EC2_USER} ${TARGET_DIR}'"
                    
                    // Sync files using rsync
                    sh "rsync -avz --delete -e 'ssh -o StrictHostKeyChecking=no' --exclude '.git' --exclude 'Jenkinsfile' . ${EC2_USER}@${EC2_IP}:${TARGET_DIR}/"
                    
                    // Restore Apache web server permissions
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} 'sudo chown -R www-data:www-data ${TARGET_DIR} && sudo chmod -R 755 ${TARGET_DIR}'"
                }
            }
        }

        stage('Database Migration') {
            steps {
                sshagent([SSH_KEY_ID]) {
                    echo 'Applying MySQL Database Schema on EC2...'
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} 'sudo mysql -e \"CREATE DATABASE IF NOT EXISTS ${DB_NAME};\" && sudo mysql ${DB_NAME} < ${TARGET_DIR}/database.sql'"
                }
            }
        }

        stage('Smoke Test') {
            steps {
                echo "Verifying live deployment at http://${EC2_IP}/index.html..."
                sh "curl -s -I http://${EC2_IP}/index.html | grep -E 'HTTP/|Server:|Content-Type:'"
            }
        }
    }

    post {
        success {
            echo "🎬 CineSphere Deployment to AWS EC2 (${EC2_IP}) Successful!"
        }
        failure {
            echo '❌ Deployment failed. Check logs, SSH credentials, or network connectivity.'
        }
    }
}
