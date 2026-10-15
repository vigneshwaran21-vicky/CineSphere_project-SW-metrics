# CineMatch — End-to-End DevOps & Software Metrics Architecture Diagram Prompts

This guide provides **Mermaid.js code diagrams**, **PlantUML scripts**, **Draw.io import XML**, and **AI Prompts (ChatGPT / Midjourney / Eraser.io)** to generate presentation-grade architecture diagrams for your **Software Metrics Course Presentations**.

---

## 1. 📊 Renderable Mermaid.js Diagram Code
*Copy and paste this code directly into Markdown, Notion, GitHub, or [Mermaid Live Editor](https://mermaid.live)*

```mermaid
flowchart TD
    %% -------------------------------------------------------------
    %% STAGE 1: LOCAL DEVELOPMENT WORKSTATION
    %% -------------------------------------------------------------
    subgraph STAGE1["1. Local Developer Workstation (VS Code)"]
        DEV["👨‍💻 Developer Environment<br/>VS Code"]
        CODE["📂 Source Code Base<br/>• Frontend: HTML5 / CSS3 / JS<br/>• Backend: PHP 8.1 APIs<br/>• Database: MySQL Scripts"]
        LOCAL_TEST["🧪 Local Validation<br/>• Syntax Checking<br/>• Preliminary Unit Tests"]
        
        DEV --> CODE --> LOCAL_TEST
    end

    %% -------------------------------------------------------------
    %% STAGE 2: SOURCE CODE MANAGEMENT & VERSION CONTROL
    %% -------------------------------------------------------------
    subgraph STAGE2["2. Source Code Management (GitHub / Azure DevOps)"]
        GIT_REPO["🐙 GitHub Repository<br/>cinematics / CineMatch"]
        BRANCH["🔀 Branching Strategy<br/>main / feature-branches"]
        WEBHOOK["🔔 GitHub Webhook Trigger<br/>POST to Jenkins Listener"]
        
        GIT_REPO --> BRANCH --> WEBHOOK
    end

    %% -------------------------------------------------------------
    %% STAGE 3: AUTOMATED JENKINS CI/CD PIPELINE & METRICS ENGINE
    %% -------------------------------------------------------------
    subgraph STAGE3["3. Jenkins CI/CD Automation & Software Metrics Engine"]
        CHECKOUT["📥 1. Git Checkout"]
        
        subgraph METRICS_ENGINE["Automated Metrics Collection Engine"]
            M_LOC["📏 PHPLOC<br/>Lines of Code (LOC / LLOC)"]
            M_CC["🌀 PHP_CodeSniffer / PHPMD<br/>Cyclomatic Complexity V(G)"]
            M_MI["📉 PHP Metrics / Radon<br/>Maintainability Index (MI)"]
            M_COV["🛡️ PHPUnit + Xdebug<br/>Code Coverage (% Line Coverage)"]
            M_DEFECT["🐛 Bug Tracker Integration<br/>Defect Density (Bugs / KLOC)"]
        end
        
        QGATE{"⚖️ Quality Gate Evaluation<br/>• V(G) <= 10<br/>• MI > 80<br/>• Coverage > 70%"}
        
        CHECKOUT --> METRICS_ENGINE --> QGATE
    end

    %% -------------------------------------------------------------
    %% STAGE 4: CLOUD INFRASTRUCTURE & AWS EC2 DEPLOYMENT
    %% -------------------------------------------------------------
    subgraph STAGE4["4. AWS Cloud Infrastructure (EC2 Deployment)"]
        AWS_EC2["☁️ AWS EC2 Instance<br/>Ubuntu 22.04 LTS (t2.micro)"]
        APACHE["🌐 Apache2 Web Server<br/>Port 80 (HTTP) / Port 443 (HTTPS)"]
        PHP_ENGINE["⚙️ PHP 8.1 FPM Runtime<br/>API Controllers (auth, movies, reviews)"]
        MYSQL_DB["🗄️ MySQL Relational DB<br/>Users, Movies, Reviews, Watchlist"]
        
        AWS_EC2 --> APACHE --> PHP_ENGINE --> MYSQL_DB
    end

    %% -------------------------------------------------------------
    %% STAGE 5: LIVE WEBSITE PERFORMANCE & PROFILING
    %% -------------------------------------------------------------
    subgraph STAGE5["5. Live Web Application Metrics Profiling"]
        USER["🌐 End Users & Evaluators"]
        AB_TEST["⚡ ApacheBench (ab)<br/>Stress Load & Throughput (req/s)"]
        LIGHTHOUSE["🚦 Google Lighthouse<br/>Page Load Speed, TTFB & FCP"]
        DB_EXPLAIN["🔍 MySQL EXPLAIN / Perf Schema<br/>Query Execution Latency & Index Hit Ratio"]
        
        USER --> LIGHTHOUSE
        USER --> AB_TEST
        MYSQL_DB --> DB_EXPLAIN
    end

    %% Flow Connections Between Stages
    STAGE1 -->|git push origin main| STAGE2
    WEBHOOK -->|Trigger Build| STAGE3
    QGATE -->|PASS: Deploy Artifact| STAGE4
    QGATE -.->|FAIL: Send Alert| DEV
    STAGE4 --> STAGE5
```

---

## 2. 🎨 AI Image Generation Prompts (Midjourney / DALL-E 3 / ChatGPT)

### Prompt A: For Photorealistic / Vector Software Architecture Infographic
> **Copy & Paste into Midjourney, ChatGPT, or DALL-E 3:**
>
> `"A modern, sleek, high-tech software architecture flowchart diagram for an Agile Movie Recommendation System named CineMatch. Dark blue background with neon cyan, gold, and white accents. Clean vector design showing 5 connected stages: 
> 1) Developer Coding in VS Code (HTML, PHP, MySQL), 
> 2) GitHub Repository with Webhook push trigger, 
> 3) Jenkins CI/CD Pipeline executing 7 Software Metrics (Lines of Code, Cyclomatic Complexity V(G), Maintainability Index, Code Coverage, Defect Density), 
> 4) AWS EC2 Cloud Infrastructure hosting Apache Web Server and MySQL Database, 
> 5) Real-time Website Performance Benchmarking (ApacheBench, Google Lighthouse, Query Speed). Professional technical infographic layout, readable typography, flat design style, highly detailed, 16:9 aspect ratio."`

---

### Prompt B: For Eraser.io / Structurizr / Diagram AI Generators
> **Copy & Paste into Eraser.io or DiagramGPT:**
>
> `"Create an end-to-end DevOps CI/CD pipeline and Software Metrics evaluation architecture diagram for 'CineMatch' with 5 sequential columns:
> Column 1: VS Code IDE (Local Development with HTML, CSS, JS, PHP 8.1, MySQL scripts).
> Column 2: Version Control System (GitHub Repository with Branching and Webhook triggers).
> Column 3: Jenkins CI/CD Metrics Server (PHPLOC for LOC, PHP_CodeSniffer for Cyclomatic Complexity, PHP Metrics for Maintainability Index, PHPUnit/Xdebug for Code Coverage, Quality Gate check).
> Column 4: AWS EC2 Cloud Host (Ubuntu 22.04 LTS, Apache Web Server, MySQL Database with B-Tree indexes).
> Column 5: Live Website Metrics Profiling (Google Lighthouse Page Speed, ApacheBench Load Throughput, MySQL EXPLAIN Query Latency).
> Use dark slate background, bright sky blue connection arrows, icon badges for each tool, and clean labels."`

---

## 3. 📄 PlantUML Diagram Script
*For VS Code PlantUML Extension or [PlantText.com](https://www.planttext.com)*

```plantuml
@startuml CineMatch_DevOps_Metrics_Architecture
skinparam backgroundColor #0f172a
skinparam activityBackgroundColor #1e293b
skinparam activityBorderColor #0ea5e9
skinparam activityFontColor #ffffff
skinparam ArrowColor #0ea5e9

title CineMatch: End-to-End DevOps & Software Metrics Pipeline

partition "1. Local Development (VS Code)" {
  :Developer writes HTML5, CSS3, JS;
  :Implements PHP 8.1 Backend APIs;
  :Designs MySQL Database Schema;
  :Runs local syntax verification;
}

partition "2. Version Control (GitHub)" {
  :Git Commit & Push to GitHub Repo;
  :Triggers GitHub Webhook Event;
}

partition "3. Jenkins CI/CD & Software Metrics Engine" {
  :Jenkins pulls latest code;
  :1. Measure Lines of Code (PHPLOC);
  :2. Calculate Cyclomatic Complexity V(G) (PHP_CodeSniffer);
  :3. Compute Maintainability Index MI (PHP Metrics);
  :4. Run Unit Tests & Code Coverage (PHPUnit + Xdebug);
  :5. Check Defect Density (GitHub Bug Tracker);
  if (Quality Gate Met? V(G)<=10 & MI>80) then (Yes)
    :Approve for Cloud Deployment;
  else (No)
    :Build Failed - Alert Developer;
    stop
  endif
}

partition "4. Cloud Deployment (AWS EC2)" {
  :Deploy code to AWS EC2 Instance;
  :Serve via Apache2 Web Server;
  :Execute MySQL DB queries;
}

partition "5. Live Performance Profiling" {
  :Measure Page Load Time (Lighthouse < 1.5s);
  :Measure Load Throughput (ApacheBench > 200 req/s);
  :Measure Query Execution Latency (MySQL EXPLAIN < 30ms);
}

stop
@enduml
```
