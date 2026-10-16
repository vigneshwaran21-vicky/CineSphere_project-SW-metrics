import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, hex_color):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def add_callout(doc, text, speaker=True):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell = table.cell(0, 0)
    cell.width = Inches(6.5)
    
    # Left border blue/orange, light background
    bg_color = "F0F9FF" if speaker else "FEF3C7"
    border_color = "0284C7" if speaker else "D97706"
    
    set_cell_background(cell, bg_color)
    set_cell_margins(cell, top=120, bottom=120, left=180, right=180)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="none"/><w:left w:val="single" w:sz="36" w:space="0" w:color="{border_color}"/><w:bottom w:val="none"/><w:right w:val="none"/></w:tcBorders>')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(text)
    run.font.name = "Segoe UI"
    run.font.size = Pt(10)
    run.font.italic = True
    run.font.color.rgb = RGBColor(15, 23, 42)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def add_code_block(doc, code_text):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell = table.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, "F1F5F9")
    set_cell_margins(cell, top=100, bottom=100, left=150, right=150)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:left w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:right w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/></w:tcBorders>')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.05
    run = p.add_run(code_text.strip())
    run.font.name = "Consolas"
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(30, 41, 59)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def build_docx():
    doc = docx.Document()
    
    # Page Setup - Margins 0.8 in
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
    
    # Document Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    p_title.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_title = p_title.add_run("CineSphere: Automated CI/CD & DevSecOps Pipeline")
    r_title.font.name = "Arial"
    r_title.font.size = Pt(22)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(30, 58, 138) # Deep Blue
    
    # Subtitle
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(14)
    p_sub.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run("Comprehensive Seminar Presentation & Technical Reference Guide")
    r_sub.font.name = "Arial"
    r_sub.font.size = Pt(13)
    r_sub.font.italic = True
    r_sub.font.color.rgb = RGBColor(71, 85, 105) # Slate
    
    # Metadata Table
    meta_table = doc.add_table(rows=6, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_table.autofit = False
    
    meta_data = [
        ("Project Name", "CineSphere — AI-Powered Movie Recommendation & Review Platform"),
        ("Author / Presenter", "Vigneshwaran T"),
        ("CI/CD Orchestration", "Jenkins Automation Server (v2.400+)"),
        ("Cloud Infrastructure", "Amazon Web Services (AWS) EC2 Ubuntu 22.04 LTS (15.252.137.249)"),
        ("Version Control", "GitHub (vigneshwaran21-vicky/CineSphere_project-SW-metrics)"),
        ("Pipeline Status", "BUILD SUCCESS ✓ (Build #3 — 100% Passed)")
    ]
    
    for idx, (label, val) in enumerate(meta_data):
        row = meta_table.rows[idx]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.0)
        c1.width = Inches(4.5)
        
        set_cell_background(c0, "F8FAFC")
        set_cell_background(c1, "FFFFFF" if idx % 2 == 0 else "F8FAFC")
        set_cell_margins(c0, top=60, bottom=60, left=100, right=100)
        set_cell_margins(c1, top=60, bottom=60, left=100, right=100)
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_before = Pt(0)
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(label)
        r0.font.name = "Arial"
        r0.font.size = Pt(9.5)
        r0.font.bold = True
        r0.font.color.rgb = RGBColor(30, 41, 59)
        
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_before = Pt(0)
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(val)
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        if "SUCCESS" in val:
            r1.font.bold = True
            r1.font.color.rgb = RGBColor(22, 101, 52) # Emerald green
        else:
            r1.font.color.rgb = RGBColor(51, 65, 85)
            
    doc.add_paragraph().paragraph_format.space_after = Pt(12)
    
    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(16)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(15)
        r.font.bold = True
        r.font.color.rgb = RGBColor(30, 58, 138)
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(12)
        r.font.bold = True
        r.font.color.rgb = RGBColor(37, 99, 235)
        return p

    def add_body(text, bold_prefix=None):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            rb = p.add_run(bold_prefix)
            rb.font.name = "Arial"
            rb.font.size = Pt(10)
            rb.font.bold = True
            rb.font.color.rgb = RGBColor(30, 41, 59)
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(51, 65, 85)
        return p

    def add_bullet(text, bold_prefix=None):
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            rb = p.add_run(bold_prefix)
            rb.font.name = "Arial"
            rb.font.size = Pt(10)
            rb.font.bold = True
            rb.font.color.rgb = RGBColor(30, 41, 59)
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(51, 65, 85)
        return p

    # 1. Executive Summary
    add_h1("1. Executive Summary")
    add_body("Modern software engineering demands continuous software delivery without compromising code quality, performance, or system security. This project implements an enterprise-grade DevSecOps Continuous Integration and Continuous Deployment (CI/CD) pipeline built on Jenkins for the CineSphere platform.")
    add_body("Every code change pushed by a developer automatically triggers a 10-stage automated pipeline that clones and verifies code from GitHub, computes software size metrics, evaluates cyclomatic complexity, executes static security scans (SAST), enforces PHP code standards, validates syntax, passes automated unit tests (100% pass), and deploys to AWS EC2 with automated health verification.")

    # 2. Pipeline Architecture
    add_h1("2. Pipeline Architecture & Workflow Sequence")
    add_body("The pipeline bridges Developer Workflow (GitHub), Continuous Integration & Security Scanning (Jenkins Server), and Continuous Cloud Deployment (AWS EC2):")
    add_bullet(" Developers commit and push changes to GitHub branch 'main'.", "1. Source Control: ")
    add_bullet(" Jenkins detects commit and executes Stages 1 through 8 (Checkout, Metrics, Complexity, SAST Security, Code Quality, Syntax Lint, PHPUnit Testing).", "2. Quality & Security Gates: ")
    add_bullet(" Upon 100% pass, Jenkins connects over encrypted SSH to AWS EC2 (15.252.137.249), executes deploy.sh, sets Apache permissions, and verifies HTTP 200 OK.", "3. Cloud Deployment: ")

    # 3. In-Depth Technical Breakdown of Each Stage
    add_h1("3. In-Depth Technical Breakdown of All Pipeline Stages")

    # Stage 1
    add_h2("Stage 1: Checkout Source Code")
    add_bullet("Retrieves the authoritative snapshot of the application source code from GitHub into an isolated, clean workspace on the Jenkins build server, establishing full version traceability.", "Purpose: ")
    add_bullet("Git SCM Plugin. Command: git branch: 'main', url: 'https://github.com/vigneshwaran21-vicky/CineSphere_project-SW-metrics.git'", "Tooling: ")
    add_bullet("Jenkins executes git.exe init, fetches upstream tags/commits, and checks out the specific commit hash (8659eb5 in Build #3). This guarantees that every build starts from a known, immutable version of the codebase.", "Mechanism: ")
    add_bullet("If GitHub is unreachable or credentials fail, the pipeline aborts immediately before consuming any build resources.", "Quality Gate: ")
    add_callout(doc, "🗣️ Seminar Speaking Tip: 'Stage 1 provides traceability. We never build or deploy ad-hoc local files; every single release is linked to an exact Git commit hash in GitHub.'")

    # Stage 2
    add_h2("Stage 2: Software Metrics Analysis")
    add_bullet("Automatically quantifies the scale, file composition, and technological growth of the project over time.", "Purpose: ")
    add_bullet("Windows PowerShell recursion script: $files = Get-ChildItem -Path .\\* -Recurse -Include *.php,*.js,*.html,*.css", "Tooling: ")
    add_bullet("Recursively scans the workspace, counts physical lines of code, and categorizes files by language.", "Mechanism: ")
    add_code_block(doc, "============================================\n          SOFTWARE METRICS SUMMARY          \n============================================\nTotal Files         : 122\nTotal Lines of Code : 2,920\nPHP Files (Backend) : 18\nJavaScript Files    : 22\nHTML Files (Views)  : 11\nCSS Files (Styles)  : 6\n============================================")
    add_callout(doc, "🗣️ Seminar Speaking Tip: 'In Stage 2, our metrics engine tracks code volume. Our application stands at approximately 2,920 lines of code across 122 files, with balanced separation between backend PHP APIs and frontend JavaScript interaction layers.'")

    # Stage 3
    add_h2("Stage 3: Python Environment & Dependency Setup")
    add_bullet("Verifies Python runtime availability and dynamically installs the specialized static analysis and security tools required by subsequent pipeline stages.", "Purpose: ")
    add_bullet("Python 3.13, pip package manager. Command: pip install bandit safety lizard -q", "Tooling: ")
    add_bullet("Verifies python.exe on the system PATH and silently ensures that lizard (complexity analyzer), bandit (SAST scanner), and safety (CVE vulnerability scanner) are present and ready.", "Mechanism: ")

    # Stage 4
    add_h2("Stage 4: Cyclomatic Complexity Analysis (Lizard)")
    add_bullet("Identifies overly complex, deeply nested, or unmaintainable functions before they create technical debt or introduce logical bugs.", "Purpose: ")
    add_bullet("Lizard Code Complexity Analyzer. Command: python -m lizard backend/ frontend/", "Tooling: ")
    add_bullet("Calculates Cyclomatic Complexity Number (CCN = E - N + 2P), Non-Commented Lines of Code (NLOC), and token counts. Functions exceeding CCN > 15 are flagged for review.", "Mechanism: ")
    add_code_block(doc, "Warnings (cyclomatic_complexity > 15):\nNLOC  CCN  Location\n20    16   isSafeMovie() in backend/movies.php\n26    19   mapTmdbMovie() in backend/movies.php\n207   119  $localFiltered in backend/movies.php\n54    21   SmtpMailer::send() in backend/SmtpMailer.php\n---------------------------------------------------------\nAverage NLOC: 12.1 | Average CCN: 3.5 | Total Functions: 122")
    add_callout(doc, "🗣️ Seminar Speaking Tip: 'Stage 4 measures Cyclomatic Complexity. Our average system complexity is 3.5, indicating modular and readable code. High complexity functions (>15) are automatically isolated for code review.'")

    # Stage 5
    add_h2("Stage 5: Static Application Security Testing (SAST)")
    add_bullet("Implements the 'Shift-Left Security' philosophy by detecting code vulnerabilities, unsafe library versions, and injection vectors during early CI rather than in production.", "Purpose: ")
    add_bullet("Bandit Security Scanner (python -m bandit -r . -f txt -q) and Safety Dependency Scanner (safety check).", "Tooling: ")
    add_bullet("Bandit parsed 947 lines of Python backend scraping code and flagged 3 B310/CWE-22 URL scheme audit notices (ensuring only http/https schemes are accepted). Safety checked 48 installed packages against national CVE databases.", "Mechanism: ")
    add_callout(doc, "🗣️ Seminar Speaking Tip: 'In Stage 5, SAST scanners Bandit and Safety inspect our source code and package dependencies for known CVE vulnerabilities and insecure network calls without running the code.'")

    # Stage 6
    add_h2("Stage 6: Advanced PHP Code Quality Suite")
    add_bullet("Enforces uniform coding standards, static type safety, and measures software maintainability across the entire PHP backend.", "Purpose: ")
    add_bullet("PHPCPD (Copy/Paste Detector), PHPCS (PHP CodeSniffer PSR-12), PHPStan (Static Analysis Level 1), PhpMetrics (Maintainability Index).", "Tooling: ")
    add_bullet("PHPCPD found only 1 clone with 22 duplicate lines (1.20% duplication rate across 1,826 lines). PHPCS verified PSR-12 formatting. PHPStan statically checked all 18 PHP backend modules for variable scopes and type safety.", "Mechanism: ")
    add_callout(doc, "🗣️ Seminar Speaking Tip: 'Stage 6 enforces enterprise standards: PHPCPD proved our code duplication is exceptionally low at 1.2%, while PHPCS and PHPStan guarantee clean, consistent backend architecture.'")

    # Stage 7
    add_h2("Stage 7: PHP Syntax Check (PHP Lint)")
    add_bullet("A strict zero-tolerance gatekeeper that executes native compiler linting on every PHP file to ensure zero parse errors exist before testing.", "Purpose: ")
    add_bullet("PHP CLI compiler (php -l). Loops through every .php file in the workspace.", "Tooling: ")
    add_bullet("Catches missing semicolons, unmatched braces, or parse errors. Result: 'All PHP files passed syntax check successfully!'", "Mechanism: ")

    # Stage 8
    add_h2("Stage 8: Automated Unit Testing (PHPUnit 10)")
    add_bullet("Programmatically verifies that core algorithms, sanitization routines, and API endpoints behave exactly as specified.", "Purpose: ")
    add_bullet("PHPUnit 10.5.66 running on PHP 8.2.12. Command: php tools\\phpunit.phar tests\\CineSphereTest.php", "Tooling: ")
    add_code_block(doc, "Runtime:       PHP 8.2.12\nTests Run:     .....                               5 / 5 (100%)\nAssertions:    11\nTime Taken:    0.007 seconds\nResult:        OK (5 tests, 11 assertions passed)")
    add_bullet("Search query string cleaner, regional Tamil movie title prioritization (e.g. 'Hi' / 'Hi Nanna'), recommendation scoring weight distribution, preference filtering, and watchlist schema integrity.", "Test Coverage: ")
    add_callout(doc, "🗣️ Seminar Speaking Tip: 'Stage 8 is our automated safety net. 5 test suites containing 11 assertions executed in just 7 milliseconds with a 100% pass rate, proving core search and recommendation logic work as intended.'")

    # Stage 9
    add_h2("Stage 9: Automated Cloud Deployment to AWS EC2")
    add_bullet("Packages, transfers, and deploys the verified build onto our live AWS EC2 cloud production server with zero downtime and automated configuration.", "Purpose: ")
    add_bullet("AWS EC2 Ubuntu 22.04 LTS (15.252.137.249), Jenkins SSH Credentials (aws-ec2_1), deploy.sh.", "Tooling: ")
    add_bullet("1. Grants full permissions to SSH key on Windows via icacls. 2. Connects via SSH. 3. Executes idempotent reset (git reset --hard origin/main && git clean -fd). 4. Syncs Apache DocumentRoot to /var/www/html/CineSphere. 5. Recursively applies www-data permissions (755 dir, 644 files). 6. Gracefully restarts Apache. 7. Validates local Movies API responds with HTTP 200.", "Mechanism: ")
    add_callout(doc, "🗣️ Seminar Speaking Tip: 'Stage 9 executes continuous deployment. Using encrypted SSH keys, Jenkins pushes the code to our AWS EC2 instance, sets Linux permissions, reloads the Apache web server, and verifies the API in under 6 seconds.'")

    # Stage 10
    add_h2("Stage 10: Website Health Check & Dynamic Security (DAST)")
    add_bullet("Verifies that the newly deployed production website is globally reachable and conducts external dynamic security testing.", "Purpose: ")
    add_bullet("cURL external GET request and OWASP ZAP Baseline Dynamic Container.", "Tooling: ")
    add_bullet("cURL query to http://15.252.137.249 returned 'HTTP Status: 200 OK'. OWASP ZAP dynamic engine probes for Cross-Site Scripting (XSS) and missing security headers.", "Mechanism: ")

    # Post Build
    add_h2("Post-Build Actions: Summary & Archiving")
    add_bullet("Archives build artifacts and outputs the final execution summary banner: BUILD STATUS: SUCCESS ✓", "Purpose: ")

    # 4. Quick Summary Matrix
    add_h1("4. Quick Summary Matrix of All Stages")
    
    table_stages = doc.add_table(rows=11, cols=4)
    table_stages.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_stages.autofit = False
    
    headers = ["Stage #", "Stage Name", "Tool Used", "Key Metric / Result"]
    hdr_cells = table_stages.rows[0].cells
    col_widths = [Inches(0.8), Inches(1.8), Inches(1.8), Inches(2.1)]
    
    for i, h_text in enumerate(headers):
        hdr_cells[i].width = col_widths[i]
        set_cell_background(hdr_cells[i], "1E3A8A")
        set_cell_margins(hdr_cells[i], top=80, bottom=80, left=100, right=100)
        p = hdr_cells[i].paragraphs[0]
        r = p.add_run(h_text)
        r.font.name = "Arial"
        r.font.size = Pt(9.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        
    stages_data = [
        ("1", "Source Checkout", "Git SCM", "Commit 8659eb5 fetched cleanly"),
        ("2", "Software Metrics", "PowerShell", "2,920 LOC across 122 files"),
        ("3", "Python Setup", "Python / Pip", "Python 3.13 dependencies ready"),
        ("4", "Code Complexity", "Lizard Analyzer", "Average CCN = 3.5 (Healthy)"),
        ("5", "Security Scan (SAST)", "Bandit & Safety", "947 LOC scanned, CVEs checked"),
        ("6", "PHP Quality Suite", "PHPCPD/PHPCS/PHPStan", "1.2% duplication, PSR-12 check"),
        ("7", "PHP Linting", "php -l", "100% syntax passed"),
        ("8", "Unit Testing", "PHPUnit 10.5", "5/5 tests passed (100%) in 0.007s"),
        ("9", "AWS EC2 Deployment", "SSH / deploy.sh", "Live deployment to 15.252.137.249"),
        ("10", "Live Health Check", "cURL", "HTTP Status: 200 OK")
    ]
    
    for row_idx, data in enumerate(stages_data):
        row_cells = table_stages.rows[row_idx + 1].cells
        for col_idx, cell_value in enumerate(data):
            row_cells[col_idx].width = col_widths[col_idx]
            bg = "FFFFFF" if row_idx % 2 == 0 else "F8FAFC"
            set_cell_background(row_cells[col_idx], bg)
            set_cell_margins(row_cells[col_idx], top=60, bottom=60, left=100, right=100)
            p = row_cells[col_idx].paragraphs[0]
            r = p.add_run(cell_value)
            r.font.name = "Arial"
            r.font.size = Pt(9)
            if col_idx == 0:
                r.font.bold = True
            if "200 OK" in cell_value or "100%" in cell_value:
                r.font.bold = True
                r.font.color.rgb = RGBColor(22, 101, 52)
            else:
                r.font.color.rgb = RGBColor(51, 65, 85)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # 5. Real-World Engineering Problem Solved
    add_h1("5. Real-World Engineering Problem Solved in This Build")
    add_body("In Build #2, the pipeline encountered a critical deployment obstacle during Stage 9:")
    add_code_block(doc, "error: Your local changes to the following files would be overwritten by merge:\n    Jenkinsfile\nPlease commit your changes or stash them before you merge.\nAborting")
    add_body("Root Cause Analysis: When deploy.sh previously invoked standard 'git pull origin main', Git detected uncommitted file permission differences on the EC2 server and aborted the merge to protect local data.", "Root Cause: ")
    add_body("Enterprise Solution Implemented: Replaced standard git pull with an idempotent force-reset strategy: git reset --hard HEAD && git clean -fd && git fetch origin main -q && git reset --hard origin/main -q && git clean -fd. Created .gitattributes to enforce Linux LF line endings. In Build #3, the deployment completed seamlessly with zero errors.", "Solution: ")

    # 6. Presentation Speech Notes
    add_h1("6. Seminar Presentation Speech Notes (Slide-by-Slide)")
    slides = [
        ("Slide 1: Title & Introduction", "Respected teachers and fellow classmates, today I present the CI/CD and DevSecOps automated deployment pipeline for CineSphere. Our project is not just a web application; it is an end-to-end continuous delivery pipeline connecting local development to the AWS cloud."),
        ("Slide 2: The Problem We Solved", "In traditional software deployment, developers write code, test manually, and copy files to servers using FTP. This leads to human error, missed security bugs, and server downtime. DevSecOps integrates automated security and quality testing right into the deployment flow."),
        ("Slide 3: Software Metrics & Complexity", "Our pipeline first analyzes the code structure using Lizard and custom PowerShell scripts. We track Lines of Code, token volume, and Cyclomatic Complexity. Functions with too many execution branches are flagged so our code remains modular and maintainable."),
        ("Slide 4: Static Security (SAST)", "Before running the code, we scan for vulnerabilities using Bandit and Safety. This catches insecure URL handling, path traversal risks, and outdated third-party packages before any hacker can exploit them in production."),
        ("Slide 5: Quality Assurance & Automated Testing", "We apply PSR-12 coding standards with PHPCS and type-safety analysis with PHPStan. Most importantly, our automated PHPUnit test suite ran 5 test cases covering 11 assertions and passed with 100% accuracy in just 7 milliseconds."),
        ("Slide 6: Automated AWS Cloud Deployment", "Once all tests pass, Jenkins securely connects to our AWS EC2 Ubuntu instance using encrypted SSH private keys. It deploys the code, applies web permissions, restarts the Apache web server, and verifies the backend API."),
        ("Slide 7: Live Verification & Conclusion", "The live website responded with HTTP 200 OK, completing the full build with zero errors. Thank you! I am now ready for questions.")
    ]
    for title, speech in slides:
        add_h2(title)
        add_callout(doc, f"\"{speech}\"", speaker=True)

    # 7. Viva Q&A Guide
    add_h1("7. Viva & Examiner Q&A Guide")
    qa_list = [
        ("Q1: What is the main difference between Continuous Integration (CI) and Continuous Deployment (CD)?",
         "Answer: Continuous Integration (CI) automatically builds, checks code quality, and runs unit tests on every code commit. Continuous Deployment (CD) automatically releases passing builds directly to the production cloud server (AWS EC2) without manual human intervention."),
        ("Q2: What is the difference between SAST and DAST in your pipeline?",
         "Answer: SAST (Static Application Security Testing) analyzes the raw source code without executing it (Bandit & Safety). DAST (Dynamic Application Security Testing) tests the running web application externally from an attacker's perspective (OWASP ZAP)."),
        ("Q3: Why is Cyclomatic Complexity important?",
         "Answer: Cyclomatic Complexity measures the number of decision paths (if, while, case) inside a function. High complexity (> 15) indicates code that is difficult to understand, hard to test, and prone to hidden bugs."),
        ("Q4: How did you protect sensitive credentials like AWS SSH keys?",
         "Answer: We used Jenkins' built-in encrypted Credentials Store (withCredentials block) with SSH user private keys. The credentials are masked (****) in all console logs so secrets are never leaked."),
        ("Q5: What happens if a developer pushes code with a syntax error?",
         "Answer: The PHP Syntax Check (php -l) or PHPUnit stage fails immediately. Jenkins stops the pipeline, marks the build as FAILED, sends an alert, and aborts deployment. The broken code never touches the AWS EC2 production server.")
    ]
    for q, a in qa_list:
        add_body(q, bold_prefix=None)
        p_q = doc.paragraphs[-1]
        p_q.runs[0].font.bold = True
        p_q.runs[0].font.color.rgb = RGBColor(30, 58, 138)
        add_body(a)

    output_path = "CineSphere_Jenkins_CICD_Seminar_Documentation.docx"
    doc.save(output_path)
    print(f"Document successfully created at: {output_path}")

if __name__ == "__main__":
    build_docx()
