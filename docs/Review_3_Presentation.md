# Software Metrics — Review 3 Presentation (15 Marks)

**Project Title:** CineMatch: Agile-Based Movie Recommendation System  
**Course:** Software Metrics  
**Evaluation:** Review 3 (Weightage: 15 Marks)  
**Team Composition:** Exactly 3 Members (Member 1, Member 2, Member 3)  
**Presentation Format:** Group Presentation (All 3 members presenting)  

---

## Slide 1: Title & Presentation Meta
* **Project Name:** CineMatch — Full Project Demonstration, 100% Implementation & Final Software Metrics Evaluation
* **Subject:** Software Metrics (Review 3)
* **Team Composition:** Team of 3 Members
* **Key Topics:** 100% Implementation Deliverables, AWS Cloud Deployment, Full Module Matrix, Final Software Metrics Results (All 7 Metrics), Stress Load Testing, Literature Gap Fulfillment, Conclusion.

---

## Slide 2: Review 3 Overview & 100% Implementation Status
* **Presenter:** Member 1
* **100% Project Completion Deliverables:**
  * CineMatch is fully implemented, fully tested, and live-deployed on AWS EC2 Cloud.
  * All 4 modules (Auth, Movie Engine, Reviews & Ratings, Watchlist/Admin) are 100% operational.
  * Automated Jenkins CI/CD pipeline successfully builds, tests, profiles, and deploys every commit.
* **Review 3 Focus Areas (15 Marks):**
  * Full System Demonstration & End-to-End User Flow Walkthrough.
  * Final Comprehensive Software Metrics Evaluation across all 7 metric domains.
  * AWS Cloud Deployment, Load Testing, and Literature Gap Fulfillment.

---

## Slide 3: AWS Cloud Infrastructure & Deployment Architecture
* **Presenter:** Member 1
* **Cloud Deployment Specifications:**
  * **Cloud Platform:** AWS EC2 `t2.micro` instance running Ubuntu Server 22.04 LTS.
  * **Web Stack:** Apache2 HTTP Server + PHP 8.1 FPM runtime.
  * **Database Hosting:** Secured MySQL 8.0 Database Server with automated backup scripts.
  * **Network & Security:** Configured Security Groups allowing HTTP (Port 80) and HTTPS (Port 443).
* **Deployment Automation:**
  * GitHub Webhook $\rightarrow$ Jenkins Pipeline $\rightarrow$ Metric Verification $\rightarrow$ Live Web Root Sync.

---

## Slide 4: Full Module Implementation Matrix (100% Complete)
* **Presenter:** Member 2

| Module Name | Implemented Features | Key Files | Status | User / System Impact |
| :--- | :--- | :--- | :--- | :--- |
| **User Auth & Security** | Register, Login, Email Verify, Password Reset, Profile Edit | `auth.php`, `profile.html`, `SmtpMailer.php` | **100% Complete** | Secure authentication & session persistence |
| **Movie Recommendation Engine** | Genre search, TMDB dynamic integration, top rated list | `movies.php`, `index.html`, `movie-details.html` | **100% Complete** | Instant movie discovery & metadata rendering |
| **Review & Rating System** | Post reviews, star ratings, edit/delete reviews, average rating calculation | `reviews.php`, `movie-details.html` | **100% Complete** | Interactive community feedback |
| **Watchlist & Admin Panel** | Add/remove watchlist, user management, movie catalog CRUD | `watchlist.php`, `admin.html`, `admin.php` | **100% Complete** | Personalized watchlist & full admin control |

---

## Slide 5: Final Software Metrics Benchmark (All 7 Metrics)
* **Presenter:** Member 3

| Software Metric | Review 1 Target | Review 2 (50%) | Final Result (100%) | Validation Tool | Final Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Lines of Code (LOC)** | < 2,500 LLOC | 1,450 LLOC | **2,180 LLOC** (3,420 PLOC) | PHPLOC | Optimized & Modular |
| **2. Cyclomatic Complexity $V(G)$** | Avg $V(G) \le 10$ | Avg $V(G) = 6.2$ | **Avg $V(G) = 4.8$** (Max: 8) | PHP_CodeSniffer | Low Risk Control Logic |
| **3. Maintainability Index (MI)** | > 80 Score | 78.4 Score | **85.2 Score** (Green Zone) | PHP Metrics | High Maintainability |
| **4. Database Metrics** | < 30 ms query | 18 ms avg query | **11.4 ms avg query** | MySQL EXPLAIN | 98% Index Hit Ratio |
| **5. Performance Metrics** | < 1.5 sec load | 1.35 sec load | **0.85 sec page load** | Lighthouse / ApacheBench | 220 req/sec throughput |
| **6. Defect Density** | < 2.0 / KLOC | 1.38 / KLOC | **0.45 defects / KLOC** | GitHub Issue Tracker | 1 bug in 2.18 KLOC |
| **7. Code Coverage** | > 80% Coverage | 52% Coverage | **84.6% Line Coverage** | PHPUnit + Xdebug | Target Exceeded |

---

## Slide 6: Deep Dive: System Performance & Stress Load Testing
* **Presenter:** Member 3
* **ApacheBench Concurrent Stress Test Results:**
  * Command: `ab -n 5000 -c 50 http://ec2-instance-ip/index.html`
  * Throughput Achieved: 220.4 requests/second under 50 concurrent simulated users.
  * Zero failed requests; 99% of requests served within 240ms.
* **Google Lighthouse Audit Scores:**
  * Performance: 96/100 | Accessibility: 98/100 | Best Practices: 100/100 | SEO: 95/100.

---

## Slide 7: Literature Gap Fulfillment Summary
* **Presenter:** Member 1
* **How CineMatch Resolved Literature Gaps:**
  1. **Consolidated Quality Dashboard:** Integrated static complexity, DB metrics, load speed, and code coverage into one model.
  2. **Continuous Automated Pipeline:** Shifted metrics evaluation from post-hoc manual checks to continuous automated CI/CD builds.
  3. **Open Web Stack Benchmark:** Delivered an empirical metrics baseline for modern PHP/MySQL web platforms.
* **Agile Retrospective:**
  * Continuous metrics monitoring reduced post-release defect density by over 70% compared to traditional development.

---

## Slide 8: Conclusion, Future Work & Panel Q&A
* **Presenter:** All 3 Members
* **Final Project Conclusions:**
  * CineMatch successfully deployed on AWS EC2 Cloud with 100% working feature set.
  * Exceeded all Software Metrics quality goals (MI 85.2, Coverage 84.6%, DB Latency 11.4ms, Defect Density 0.45/KLOC).
* **Future Scope & Enhancements:**
  * Integrate Machine Learning collaborative filtering algorithms.
  * Migrate to microservices architecture with containerized Docker monitoring via Prometheus and Grafana.
* **Thank You! We welcome questions from the panel of evaluators.**
