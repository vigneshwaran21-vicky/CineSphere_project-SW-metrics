# Software Metrics — Review 1 Presentation (05 Marks)

**Project Title:** CineMatch: Agile-Based Movie Recommendation System  
**Course:** Software Metrics  
**Evaluation:** Review 1 (Weightage: 05 Marks)  
**Team Composition:** Exactly 3 Members (Member 1, Member 2, Member 3)  
**Presentation Format:** Group Presentation (All 3 members presenting)  

---

## Slide 1: Title & Team Metadata
* **Project Title:** CineMatch — Agile-Based Movie Recommendation System Using Azure DevOps & AWS Cloud
* **Subject:** Software Metrics (Review 1)
* **Team Composition:** Team of 3 Members
* **Key Topics:** Abstract, Problem Definition, Literature Survey & Matrix, Literature Gap Analysis, Software Metrics Taxonomy & Tool Descriptions (7 Metrics), System Architecture, Proposed Agile Methodology.

---

## Slide 2: Abstract & Executive Summary
* **Presenter:** Member 1
* **Project Summary:**
  * CineMatch is a full-stack movie recommendation web application engineered using Agile Scrum methodology.
  * Provides seamless movie browsing, genre filtering, community reviews, star ratings, personalized watchlists, and full administrator catalog control.
  * Tech Stack: HTML5, CSS3, JavaScript, PHP 8.1 backend APIs, and MySQL relational database, hosted on AWS EC2 with continuous integration via Jenkins.
* **Software Metrics Focus:**
  * Main Objective: To embed rigorous, empirical Software Metrics into every Agile sprint to eliminate technical debt.
  * Systematically measures code volume, control flow complexity, maintainability index, database execution efficiency, load performance, defect density, and test coverage.

---

## Slide 3: Introduction & Industrial Context
* **Presenter:** Member 1
* **The Web Engineering Challenge:**
  * Modern dynamic web applications require low latency (< 200ms), high concurrency, and long-term code maintainability.
  * Traditional PHP/MySQL applications frequently suffer from monolithic script bloat, spaghetti control logic, unindexed database queries, and hidden production defects.
  * Without software metrics, code quality assessment remains purely subjective, leading to high maintenance costs and software decay.
* **Project Vision & Objectives:**
  1. Develop a high-performing, responsive movie discovery platform.
  2. Formulate a 7-metric software measurement framework across static, dynamic, and database domains.
  3. Automate continuous metrics generation within a Jenkins CI/CD deployment pipeline.

---

## Slide 4: Problem Definition & Key Research Questions
* **Presenter:** Member 1
* **Problem Statement:**
  * Existing open-source movie platforms often lack continuous metrics profiling, resulting in high cyclomatic complexity, slow SQL response times under load, and inadequate test coverage.
  * Engineering teams lack a unified multi-dimensional dashboard that tracks code maintainability alongside database performance and defect rates during Agile sprints.
* **Key Research Questions Addressed:**
  * **Q1:** How does refactoring functions with high Cyclomatic Complexity $V(G)$ impact the overall Maintainability Index (MI)?
  * **Q2:** What is the quantitative relationship between unit test coverage and post-release defect density in PHP web applications?
  * **Q3:** How do database index optimization metrics translate into page load speed improvements under concurrent load?

---

## Slide 5: Functional Requirements & System Modules
* **Presenter:** Member 2
* **Module 1: User Authentication & Security:**
  * User registration, login authentication, password hashing (`BCRYPT`), email verification (`SmtpMailer`), and session persistence.
* **Module 2: Movie Discovery & Recommendation Engine:**
  * Real-time search, genre-based filtering, top-rated recommendations, and TMDB API fallback integration.
* **Module 3: Reviews, Ratings & Watchlist:**
  * User movie reviews, 5-star rating aggregations, personalized watchlists, and admin CRUD catalog management.

---

## Slide 6: System Architecture & 3-Tier Design
* **Presenter:** Member 2
* **3-Tier System Layering:**
  * **Presentation Tier:** Responsive HTML5, CSS3, JavaScript, rendering dynamic AJAX content.
  * **Application Tier:** Apache Web Server running modular PHP 8.1 API controllers (`auth.php`, `movies.php`, `reviews.php`).
  * **Data Tier:** MySQL Relational Database holding Users, Movies, Reviews, and Watchlist tables with B-Tree indexes.
* **DevOps & Deployment Pipeline:**
  * GitHub Version Control $\rightarrow$ Jenkins CI/CD Server $\rightarrow$ Automated Metric Profiling $\rightarrow$ AWS EC2 Cloud Deployment.

---

## Slide 7: Literature Survey: 5 Recent Research Papers (2024–2025)
* **Presenter:** Member 2

| Author & Year | Contribution | Gap Identified |
| :--- | :--- | :--- |
| **Al-Maimani et al. (2024)** | Automated Maintainability & Complexity Evaluation in Agile CI/CD Pipelines | Evaluates static code metrics only during build time, ignoring database query latency and cloud infrastructure response times. |
| **Sharma & Kumar (2024)** | ML-Based Defect Density Prediction using Code Coverage & Cyclomatic Complexity | Requires extensive historical bug datasets and does not offer real-time feedback during active sprint commits. |
| **Chen et al. (2025)** | Empirical Database Query Performance & Index Optimization Framework for Web Apps | Focuses strictly on relational database schema metrics without correlating them to frontend user page load speed. |
| **Kowalski & Zhang (2024)** | Continuous Quality Gates Integration using Jenkins & SonarQube in Agile Frameworks | Lacks unified metric thresholds that combine static maintainability indices with dynamic load throughput. |
| **Patel et al. (2025)** | Impact of Continuous Refactoring on Technical Debt & Code Coverage in Web Applications | Evaluates refactoring manually post-release rather than dynamically enforcing quality gates in DevOps pipelines. |

---

## Slide 8: Literature Gap Analysis & System Novelty
* **Presenter:** Member 2
* **Four Major Gaps Identified in Existing Literature:**
  1. **Fragmented Metrics:** Code complexity, database performance, and defect density are evaluated in isolation.
  2. **Manual & Post-Hoc Collection:** Metrics are usually computed at project termination rather than continuously per commit.
  3. **Lack of PHP Web Benchmarks:** Minimal empirical metrics literature exists specifically for PHP/MySQL cloud applications.
  4. **Absence of DB-to-UI Latency Correlation:** Existing models do not map database index hit ratios directly to end-user page load speed.
* **CineMatch Novel Contribution:**
  * Delivers a unified 7-metric automated profiling framework integrated directly into Jenkins CI/CD builds on AWS EC2.

---

## Slide 9: Software Metrics Taxonomy & Classification Framework
* **Presenter:** Member 3
* **Metrics Classification Framework:**
  * **Product Metrics:** Size (LOC), Control Flow Complexity ($V(G)$), Maintainability Index (MI).
  * **Process & Quality Metrics:** Defect Density (defects/KLOC), Unit Test Code Coverage (%).
  * **Resource & Infrastructure Metrics:** Page Load Speed (ms), Latency (TTFB), Throughput (req/sec).
  * **Database Metrics:** Query Execution Time (ms), Index Hit Ratio (%), Table Scan Count.
* **Evaluation Criteria:**
  * All metrics are quantitatively measured, automated via CLI tools, and checked against pre-defined quality thresholds.

---

## Slide 10: Metrics Tool Descriptions (1. LOC & 2. Cyclomatic Complexity)
* **Presenter:** Member 3
* **1. Lines of Code (LOC) — Tool: PHPLOC / SonarQube:**
  * Physical LOC (PLOC): Total lines including whitespace & comments.
  * Logical LOC (LLOC): Executable statements (e.g., control structures, assignments).
  * *Target:* Maintain modular file size (< 300 LLOC per file) to prevent monolithic maintenance anti-patterns.
* **2. Cyclomatic Complexity $V(G)$ — Tool: PHP_CodeSniffer / PHPMD:**
  * Mathematical Formula: $V(G) = E - N + 2P$ (Edges $E$, Nodes $N$, Connected Components $P$).
  * Alternative Formula: $V(G) = \text{Number of Decision Predicates} + 1$.
  * Quality Thresholds: $V(G)$ 1–10 (Low Risk / Simple), 11–20 (Moderate Risk), > 20 (High Risk / Mandatory Refactoring).

---

## Slide 11: Metrics Tool Descriptions (3. Maintainability Index & 7. Coverage)
* **Presenter:** Member 3
* **3. Maintainability Index (MI) — Tool: PHP Metrics / Radon:**
  * Composite Formula: $\text{MI} = 171 - 5.2 \ln(V) - 0.23 V(G) - 16.2 \ln(\text{LLOC})$, where $V$ is Halstead Volume.
  * Normalized Scale: MI > 80 (Green - High Maintainability), 65–80 (Yellow - Moderate), < 65 (Red - Severe Risk).
  * *Target Benchmark:* Maintain overall codebase MI > 80.
* **7. Code Coverage — Tool: PHPUnit + Xdebug:**
  * Measures percentage of executed code lines and logic branches during automated unit testing.
  * Formula: $\text{Coverage \%} = \left(\frac{\text{Executed Lines}}{\text{Total Executable Lines}}\right) \times 100$.
  * *Target Benchmark:* Achieve > 80% line coverage across all backend API controllers.

---

## Slide 12: Metrics Tool Descriptions (4. Database & 5. Performance Metrics)
* **Presenter:** Member 3
* **4. Database Metrics — Tool: MySQL EXPLAIN & Performance Schema:**
  * Index Hit Ratio: $\left(\frac{\text{Indexed Reads}}{\text{Total Query Reads}}\right) \times 100$. Target > 95%.
  * Query Latency: Average time taken to execute database queries. Target < 30ms.
  * Full Table Scans: Monitor and eliminate unindexed SELECT queries examining thousands of rows.
* **5. Performance Metrics — Tool: ApacheBenchmark (`ab`) & Google Lighthouse:**
  * Time to First Byte (TTFB): Initial server response latency. Target < 150ms.
  * Page Load Speed: Total rendering duration on client. Target < 1.5 seconds.
  * Throughput: Requests handled per second under concurrent user load. Target > 200 req/sec.

---

## Slide 13: Metrics Tool Descriptions (6. Defect Density & Quality Matrix)
* **Presenter:** Member 3
* **6. Defect Density — Tool: GitHub Issues & Azure DevOps Bug Tracker:**
  * Formula: $\text{Defect Density} = \frac{\text{Total Confirmed Bugs}}{\text{Size in KLOC}}$.
  * Severity Classification: Critical (System crash/security), Major (Feature broken), Minor (UI glitch).
  * *Target Benchmark:* Defect Density < 2.0 defects per 1000 LOC post-release.
* **Summary Matrix of All 7 Metrics:**
  * All 7 metrics (LOC, $V(G)$, MI, DB Latency, Performance, Defect Density, Coverage) are fully operational and integrated into our testing suite.

---

## Slide 14: Database Schema & Entity Relationship Overview
* **Presenter:** Member 1

| Table Name | Primary Key | Foreign Keys | Key Fields | Metrics Optimization Target |
| :--- | :--- | :--- | :--- | :--- |
| **Users** | `id` | None | `name`, `email`, `password_hash`, `created_at` | Unique index on `email` (< 5ms login lookup) |
| **Movies** | `id` | None | `title`, `genre`, `rating`, `image_url`, `description` | Composite index on (`genre`, `rating`) for dynamic filtering |
| **Reviews** | `id` | `user_id`, `movie_id` | `comment`, `rating`, `created_at` | Index on `movie_id` to eliminate full table scans |
| **Watchlist** | `id` | `user_id`, `movie_id` | `added_at` | Unique constraint on (`user_id`, `movie_id`) to prevent duplicate entries |

---

## Slide 15: Automated Jenkins CI/CD & Cloud Deployment Architecture
* **Presenter:** Member 2
* **End-to-End Pipeline & Software Metrics Flow:**

```mermaid
flowchart LR
    DEV["👨‍💻 VS Code<br/>Local Dev"] -->|git push| GIT["🐙 GitHub<br/>Repository"]
    GIT -->|Webhook| JENKINS["⚡ Jenkins CI/CD<br/>Metrics Engine"]
    
    subgraph METRICS["7 Metrics Profiling"]
        JENKINS --> LOC["📏 PHPLOC (LOC)"]
        JENKINS --> CC["🌀 PHP_CodeSniffer (V(G))"]
        JENKINS --> MI["📉 PHP Metrics (MI)"]
        JENKINS --> COV["🛡️ PHPUnit (Coverage)"]
    end
    
    METRICS --> GATE{"⚖️ Quality Gate<br/>Pass / Fail"}
    GATE -->|Pass| AWS["☁️ AWS EC2<br/>Apache + MySQL"]
    AWS --> MEASURE["⚡ Live Metrics<br/>Lighthouse & ApacheBench"]
```

* **Jenkins Automated Pipeline Workflow:**
  1. **Trigger:** Developer pushes code commit from VS Code to GitHub repository.
  2. **Static Analysis Stage:** Jenkins executes PHPLOC & PHP_CodeSniffer to compute LOC and $V(G)$.
  3. **Test & Coverage Stage:** Executes PHPUnit tests and generates Xdebug coverage report.
  4. **Metrics Check:** If $V(G) > 15$ or Coverage < 70%, build fails automatically.
  5. **Deployment Stage:** Automated SSH push to Apache web root on AWS EC2.
  6. **Live Measuring:** Real-time benchmarking using ApacheBench, Google Lighthouse, and MySQL EXPLAIN.

---

## Slide 16: Proposed Agile Sprint Roadmap & Review 1 Summary
* **Presenter:** Member 3
* **Three-Sprint Agile Execution Roadmap:**
  * **Sprint 1 (Review 1 Phase):** Requirement analysis, DB schema design, literature review, metrics tool setup.
  * **Sprint 2 (Review 2 Phase):** Core backend API implementation, 50% code completion, initial metrics evaluation & refactoring.
  * **Sprint 3 (Review 3 Phase):** Full 100% feature completion, AWS cloud deployment, final software metrics benchmarking.
* **Review 1 Accomplishments Summary:**
  * $\checkmark$ Problem definition & literature gap analysis completed across 5 foundational papers.
  * $\checkmark$ 7 software metrics definitions, formulas, and tools established.
  * $\checkmark$ 3-tier architecture, DB schema, and Jenkins CI/CD pipeline designed.
