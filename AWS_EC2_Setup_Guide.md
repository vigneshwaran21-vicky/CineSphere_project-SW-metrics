# 🚀 Complete AWS EC2 Setup & Deployment Guide for CineSphere

This guide provides simple, step-by-step instructions to create an AWS EC2 instance and deploy your **CineSphere** movie web application.

---

## 💡 Important: Windows Server vs. Ubuntu Linux on AWS EC2

You asked: *"Give the Windows OS that will be easy right?"*

Here is the honest reality of running Windows Server vs. Ubuntu on AWS EC2:

| Feature | 🐧 Ubuntu Linux (Recommended) | 🪟 Windows Server |
| :--- | :--- | :--- |
| **Connecting** | **1-Click in Browser** ("EC2 Instance Connect"). No setup needed. | Requires downloading `.rdp` file, decrypting passwords, and launching Remote Desktop. |
| **Free Tier Performance** | **Extremely fast & smooth**. Uses only ~150 MB RAM on `t2.micro` (1 GB RAM). | **Very slow & lags/freezes** on `t2.micro`. Windows Server requires 2–4 GB RAM just to run the desktop. |
| **Project Compatibility** | **100% Native**. Your project already has `deploy.sh` and `Jenkinsfile` built specifically for Ubuntu! | Incompatible with your existing `deploy.sh` and Jenkins pipeline. |
| **Setup Speed** | **Under 5 minutes** by pasting commands directly into the terminal. | Takes 15–20 minutes to download and configure XAMPP manually via Remote Desktop. |

> **Conclusion**: While you are used to Windows on your personal computer, **Ubuntu on AWS EC2 is significantly easier, completely free, and takes just copy-pasting a few commands**.
> 
> *Both options are covered below. We strongly recommend following **Option A (Ubuntu)**.*

---

# 📌 OPTION A: Ubuntu Linux (Recommended & Easiest)

## Part 1: Launch EC2 Instance in AWS Console

1. **Sign in to AWS Console**: Open [https://aws.amazon.com/console/](https://aws.amazon.com/console/) and search for **EC2** in the search bar.
2. Click the orange **"Launch Instance"** button.
3. **Name and tags**:
   - Name: `CineSphere-Server`
4. **Application and OS Images (Amazon Machine Image)**:
   - Select **Ubuntu** (Choose the default **Ubuntu Server 24.04 LTS** or **22.04 LTS**, labeled *Free tier eligible*).
5. **Instance type**:
   - Select **`t2.micro`** (or `t3.micro` if in newer regions — both are *Free tier eligible*).
6. **Key pair (login)**:
   - If you want to connect via Jenkins or SSH later, click **Create new key pair**, name it `cinesphere-key`, choose **RSA** and `.pem`, and download it.
   - *(If only testing now, you can select "Proceed without a key pair", because you can use 1-click EC2 Instance Connect in the browser).*
7. **Network settings (Firewall / Security Group)** — *Very Important!*:
   - Ensure **Create security group** is selected.
   - Check **✅ Allow SSH traffic from** -> Select **Anywhere (0.0.0.0/0)**.
   - Check **✅ Allow HTTP traffic from the internet** (Port 80).
8. **Configure storage**:
   - Keep default **8 GiB gp3** (or set to 20 GiB, up to 30 GiB is free).
9. Click **"Launch Instance"**.
10. Click **View all instances** and wait 1–2 minutes until the status says **Running**.

---

## Part 2: Connect to your AWS Terminal in 1 Click

1. In the EC2 Console list, click the checkbox next to your **`CineSphere-Server`**.
2. Click the **"Connect"** button at the top right.
3. Select the **"EC2 Instance Connect"** tab.
4. Leave username as `ubuntu`.
5. Click the orange **"Connect"** button at the bottom.
6. A black terminal window will open directly inside your browser tab!

---

## Part 3: Commands to Run in the AWS Terminal

Copy and paste these command blocks into the AWS terminal one by one:

### Step 1: Update Server & Install Apache, PHP, MySQL, and Git
```bash
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y apache2 mysql-server php libapache2-mod-php php-mysql php-curl git curl
```

---

### Step 2: Configure MySQL Database for CineSphere
Your project connects via `backend/db.php` (`host: localhost`, `db_name: cinesphere_db`, `user: root`, blank password). 

Run this single command to create the database and configure MySQL permissions:
```bash
sudo mysql -e "CREATE DATABASE IF NOT EXISTS cinesphere_db; ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''; FLUSH PRIVILEGES;"
```
*(If you are on Ubuntu 24.04 with MySQL 8.4+, run this alternative if needed)*:
```bash
sudo mysql -e "CREATE DATABASE IF NOT EXISTS cinesphere_db; ALTER USER 'root'@'localhost' IDENTIFIED BY ''; FLUSH PRIVILEGES;"
```

---

### Step 3: Clone your CineSphere Code from GitHub
```bash
cd /var/www/html
sudo git clone https://github.com/vigneshwaran21-vicky/CineSphere_project-SW-metrics.git CineSphere
```

---

### Step 4: Import the Database Tables
```bash
sudo mysql cinesphere_db < /var/www/html/CineSphere/database.sql
```

---

### Step 5: Configure Apache & Run the Deploy Script
Give execution permission and run your project's automated deploy script:
```bash
sudo chmod +x /var/www/html/CineSphere/deploy.sh
sudo bash /var/www/html/CineSphere/deploy.sh
```

---

### Step 6: Access your Live Website!
Find your EC2 instance's **Public IPv4 address** in your AWS Console (e.g., `13.233.120.45`):
Open your web browser and navigate to:
```
http://<YOUR_EC2_PUBLIC_IP>
```
or
```
http://<YOUR_EC2_PUBLIC_IP>/CineSphere/index.html
```

🎉 **Your CineSphere application is now live on the cloud!**

---

# 📌 OPTION B: Windows Server (If you prefer Remote Desktop & XAMPP)

If you specifically want a Windows interface with XAMPP:

### Step 1: Launch the Instance in AWS Console
1. In EC2 Dashboard, click **Launch Instance**.
2. Name: `CineSphere-Windows`.
3. OS: Select **Microsoft Windows** (Choose **Microsoft Windows Server 2022 Base**, Free tier eligible).
4. Instance Type: Select **`t2.micro`** (Free Tier, *note: will be sluggish*) or **`t3.medium`** (smoother, paid).
5. Key Pair: **Required!** Click **Create new key pair**, name it `win-key`, download `win-key.pem`.
6. Security Group:
   - Check **Allow RDP traffic from Anywhere** (Port 3389).
   - Check **Allow HTTP traffic from the internet** (Port 80).
7. Storage: Set to **30 GiB** (maximum Free Tier allowed).
8. Click **Launch Instance**.

### Step 2: Retrieve Windows Administrator Password
1. Wait 4–5 minutes until the instance reaches **2/2 checks passed**.
2. Select the instance -> click **Connect** -> tab **RDP client**.
3. Click **Get password**.
4. Upload your downloaded `win-key.pem` file and click **Decrypt Password**.
5. Copy the displayed password and Public DNS.

### Step 3: Connect via Remote Desktop (RDP) on your PC
1. Press <kbd>Windows Key</kbd> + <kbd>R</kbd>, type `mstsc` and press Enter.
2. In **Computer**, paste your EC2 **Public IPv4 Address**.
3. Username: `Administrator`.
4. Password: Paste the decrypted password from Step 2.
5. Click **Connect**. You will see the Windows Server desktop.

### Step 4: Commands & Setup inside Windows Server
Open **PowerShell as Administrator** on the Windows Server:

1. **Allow Port 80 through Windows Firewall**:
   ```powershell
   New-NetFirewallRule -DisplayName "HTTP Port 80" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow
   ```

2. **Download and Install XAMPP for Windows**:
   In Edge browser on the server, download XAMPP from [apachefriends.org](https://www.apachefriends.org) and install Apache and MySQL.

3. **Install Git & Clone Code**:
   In PowerShell:
   ```powershell
   cd C:\xampp\htdocs
   git clone https://github.com/vigneshwaran21-vicky/CineSphere_project-SW-metrics.git CineSphere
   ```

4. **Import Database**:
   Open XAMPP Control Panel, Start Apache & MySQL, open `http://localhost/phpmyadmin`, create database `cinesphere_db`, and import `database.sql`.

---

## 🛠️ Summary Checklist & Troubleshooting

- **Page Not Loading?** Ensure your EC2 Security Group has an Inbound Rule for **HTTP (Port 80)** with Source `0.0.0.0/0`.
- **Database Error?** Check `/var/www/html/CineSphere/backend/db.php` to ensure credentials match your MySQL setup.
- **Pulling Updates**: Whenever you push new code to GitHub, simply run in the AWS terminal:
  ```bash
  cd /var/www/html/CineSphere
  sudo git pull origin main
  sudo bash deploy.sh
  ```
