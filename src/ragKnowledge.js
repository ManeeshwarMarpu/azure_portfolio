// RAG Knowledge Base — Maneeshwar M
// This is the structured context fed into the Claude API for RAG-based responses

export const KNOWLEDGE_BASE = `
=== PERSONAL INFO ===
Name: Maneeshwar M
Email: maneesh.05mm@gmail.com
Phone: 979-398-2463
Location: Houston, TX, USA
LinkedIn: linkedin.com/in/maneeshwar11
Status: Available for opportunities
Languages: English (Professional), Telugu (Native), Hindi (Conversational)

=== VISA & WORK AUTHORIZATION ===
Current Visa: F-1 Student Visa (USA)
Work Authorization: OPT (Optional Practical Training) — eligible upon graduation May 2026
STEM OPT: Eligible for 24-month STEM OPT extension (total ~3 years of work authorization)
Sponsorship Required Now: NO — can work on OPT after graduation
H-1B Sponsorship: Open to H-1B sponsorship after OPT period
Immediate Availability: Available to start full-time roles from May 2026
Remote / Hybrid / On-site: Open to all arrangements
Preferred Locations: Houston TX · San Antonio TX · Remote

=== EDUCATION ===
Graduate: University of Houston — Houston, TX
Degree: Master of Science in Engineering Data Science
GPA: 3.9 / 4.0
Duration: Aug 2024 – May 2026 (In Progress)
Relevant Coursework: Machine Learning, Big Data Analytics, Cloud Computing, Data Pipelines, Statistical Modeling

Undergraduate: Bachelor of Engineering in Computer Science & Engineering
Graduation Year: 2020
Country: India
Note: After graduating, Maneeshwar worked in the industry for 3+ years before returning to pursue his Master's at University of Houston.

=== PROFESSIONAL SUMMARY ===
Results-driven DevOps and CI/CD Engineer with 4+ years of experience designing, building, and maintaining CI/CD pipelines and cloud infrastructure across AWS, Azure, and GCP. Proven hands-on expertise in Jenkins, GitHub Actions, GitLab CI, and Azure DevOps for automated build, test, and release workflows, combined with Terraform, CloudFormation, and Ansible for infrastructure automation. Skilled in Docker and Kubernetes containerized workload management, DevSecOps practices including SAST/DAST and secrets management, and observability using Prometheus, Grafana, ELK Stack, and CloudWatch. Experienced in Linux systems administration, artifact management with Nexus and Artifactory, and advocating an automation-first mindset while partnering closely with development teams to optimize application lifecycle processes across complex multi-cloud environments.

=== CERTIFICATIONS ===
1. Microsoft Certified: DevOps Engineer Expert (AZ-400)
2. Microsoft Certified: Azure Administrator Associate (AZ-104)
3. AWS Certified: Solutions Architect Associate (SAA-C03)
4. AWS Certified: Cloud Practitioner (CLF-C02)

=== TECHNICAL SKILLS ===
Programming & Scripting: Python, Bash, Groovy, Go, PowerShell, SQL, YAML/JSON
CI/CD Tools: Jenkins, GitHub Actions, GitLab CI, Azure DevOps Pipelines, CircleCI, Bitbucket Pipelines
Cloud Platforms: AWS (EC2, EKS, S3, Lambda, CloudWatch, CloudFormation), Azure (AKS, Azure Monitor, ARM), GCP (GKE)
Container & Orchestration: Docker, Kubernetes (EKS, AKS, GKE), Helm, ArgoCD, Flux CD, Istio, Linkerd
IaC & Config Management: Terraform, Terragrunt, CloudFormation, ARM Templates, Pulumi, Ansible, Chef, Puppet
Monitoring & Observability: Prometheus, Grafana, ELK Stack, CloudWatch, Azure Monitor, Datadog, Jaeger, Alert Manager
Artifact & Registry: Nexus Repository, JFrog Artifactory, Docker Registry, Azure Container Registry, ECR
Security & DevSecOps: SAST, DAST, Container Scanning (Trivy, Snyk), HashiCorp Vault, Azure Key Vault, RBAC, SOC 2

=== WORK EXPERIENCE ===

--- Rackspace Technology (San Antonio, TX — Remote) ---
Role: Senior DevOps / CI/CD Engineer
Period: Jun 2025 – Present
Key Achievements:
- Designed, built, and maintained CI/CD pipelines for 150+ enterprise client environments using Jenkins, GitHub Actions, and GitLab CI
- Automating code integration, quality checks, SAST/DAST security scans, and Artifactory-managed artifact releases with Git-based branching and tagging strategies
- Reduced deployment cycle time by 45%, cut failed release rates by 28%, and maintained 99.97% uptime SLA across all production environments
- Provisioned and managed multi-cloud infrastructure across AWS, Azure, and GCP for 20+ production workloads using Terraform, CloudFormation, and ARM templates
- Deployed and operated containerized applications on Kubernetes clusters (EKS, AKS, GKE) with versioned Helm charts and ArgoCD GitOps reconciliation
- Implemented HPA autoscaling, Pod Disruption Budgets, and cross-region DR architecture
- Reduced infrastructure provisioning times by 60%, cutting failed deployments by 28%
- Implemented monitoring, logging, and alerting using Prometheus, Grafana, ELK Stack, and AWS CloudWatch
- Reduced false positive pages by 42%, improved P99 latency visibility by 3x, reduced MTTD by 46%
- Applied DevSecOps: integrated SAST, DAST, and Trivy container image scanning into Jenkins and GitHub Actions
- Configured HashiCorp Vault and AWS Secrets Manager for dynamic secrets injection
- Enforced RBAC and least-privilege IAM policies — accelerated CVE remediation by 57%, reduced compliance audit preparation time by 65%
- Optimized build processes: introduced Nexus artifact caching, parallelized test suites, automated Linux server patching via Ansible
- Eliminated 15+ hours per week of manual operational work
- Mentored 3 junior engineers on pipeline design, Git branching strategies, and Kubernetes troubleshooting

--- Motorola Solutions Pvt. Ltd. (Bangalore, India) ---
Role: Software Engineer (DevOps & CI/CD Engineering)
Period: Mar 2022 – Jul 2024
Key Achievements:
- Managed end-to-end Kubernetes container environment lifecycle across 30+ engineering teams on AWS EKS and Azure AKS
- Executing cluster version upgrades, standardizing microservice deployments through versioned Helm charts published to Artifactory
- Enforcing Flux CD GitOps reconciliation that detected and corrected cluster state drift automatically
- Reduced platform-level deployment failures by 25%, saving 8 engineering hours per developer per week
- Built and maintained Jenkins and GitLab CI pipelines for 20+ mission-critical applications
- Scripted Groovy, Python, and Bash automation for environment bootstrapping, Nexus artifact promotion, integration test orchestration, and canary traffic routing
- Configured Docker multi-stage builds and pushing verified images to Docker Registry and ECR
- Implemented intelligent rollback logic — decreased production rollback incidents by 28%
- Designed and maintained log pipelines, metrics collection, and alerting infrastructure for 50+ production services
- Operated ELK Stack clusters, deployed Prometheus exporters with custom recording rules
- Configured Grafana dashboards for build latency, deployment throughput, and infrastructure saturation visibility
- Reduced false positive pages by 42%, improved MTTR by 35%
- Automated infrastructure provisioning across 50+ production Linux servers using Terraform, Ansible, and Puppet
- Compliance baseline enforcement encoded into GitLab CI pipeline stages — 40% reduction in drift-related incidents
- Eliminated 15+ hours per week of manual verification effort
- Published runbooks and pipeline architecture documentation in Confluence
- Reduced repeat pipeline failures by 38%, accelerating MTTR by 35%

--- Blazeclan Technologies (Pune, India) ---
Role: Cloud & DevOps Engineer
Period: Jan 2021 – Feb 2022
Key Achievements:
- Executed cloud migration and re-platforming for 20+ production workloads across AWS, Azure, and GCP
- Used Terraform, Terragrunt, CloudFormation, and Ansible automation
- Containerized legacy applications into Docker images, established ArgoCD GitOps delivery
- Reduced infrastructure provisioning times by 50%, cut operating costs by 35%
- Delivered zero data loss across all migrations
- Designed and deployed end-to-end CI/CD pipelines for 8+ client organizations
- Improved deployment frequency by 3x, reduced change lead time by 50%
- Delivered Kubernetes-native application modernization for 3 enterprise clients
- Migrated monolithic workloads to containerized microservices on AWS EKS and Azure AKS using Helm
- Used Istio service mesh for mTLS enforcement and distributed tracing
- Improved application scalability by 40%, reduced deployment downtime by 55%, doubled release cadence
- Built cloud-native monitoring and cost optimization dashboards using Prometheus, Grafana, AWS CloudWatch, and Azure Monitor
- Prevented 6+ production outages per quarter, recovered over $200K in over-provisioned cloud compute spend within the first quarter

=== PROJECTS ===

1. Multi-Cloud CI/CD Platform with GitOps Delivery and DevSecOps Automation
Stack: Jenkins, GitLab CI, GitHub Actions, Kubernetes, ArgoCD, Trivy, Nexus, Artifactory
- Designed end-to-end CI/CD platform spanning AWS, Azure, and GCP
- Multi-stage build, test, SAST/DAST security scan, and containerized release workflows
- Integrated Nexus and Artifactory artifact management, Docker Registry image promotion
- ArgoCD GitOps delivery on Kubernetes, Trivy container scanning at every pipeline stage
- Reduced deployment cycle time by 50%
- Achieved zero critical security findings across all regulated production environments

2. Predictive Infrastructure Monitoring and Build Optimization Platform
Stack: Python, Prometheus, Grafana, ELK Stack, CloudWatch, Ansible, Kubernetes
- Developed predictive infrastructure and CI/CD health monitoring platform
- Ensemble ML models trained on Prometheus, AWS CloudWatch, and ELK Stack telemetry
- Forecast Kubernetes node pool saturation, Jenkins build queue congestion, and Docker registry storage exhaustion 4-8 hours in advance with 87% accuracy
- Automated preemptive scaling via Kubernetes Cluster Autoscaler and Ansible-driven provisioning
- Prevented 6+ production outages per quarter, reduced false positive alert volume by 42%
- Saved $15K annually in emergency over-provisioning costs

3. Zero-Trust Kubernetes Security Layer
Stack: Istio, HashiCorp Vault, Trivy, Snyk, OPA Gatekeeper, RBAC
- mTLS enforcement across all inter-pod traffic
- Dynamic secrets injection from Vault
- OPA policy gates blocking non-compliant images
- Accelerated CVE remediation by 57%, reduced compliance audit prep by 65%
- SOC 2 compliant

4. Multi-Region Disaster Recovery Architecture
Stack: AWS EKS, Azure AKS, Terraform, Route53, HPA, Pod Disruption Budgets
- Active-active multi-region architecture with automatic failover
- 99.97% uptime SLA across 20+ production workloads
- Cross-region data replication, HPA autoscaling, Pod Disruption Budgets
- Infrastructure provisioning times reduced by 60%

5. Self-Healing Microservices Platform
Stack: Flux CD, Kubernetes, Python, Bash
- GitOps reconciliation continuously detects and corrects cluster state drift
- Custom diagnostic scripts auto-remediate Linux node failures and OOM events
- Serves 30+ engineering teams — reduced platform failures by 25%
- Saves 8 engineering hours per developer per week

6. Infrastructure Cost Intelligence Dashboard
Stack: Grafana, CloudWatch, Azure Monitor, Python, Terraform
- Real-time cost anomaly detection fused with infrastructure telemetry
- Grafana recording rules for trend analysis
- Right-sizing recommendations fed back into Terraform modules
- Prevented 6+ production outages per quarter
- Recovered over $200K in over-provisioned compute spend in first quarter
- Reduced operating costs by 35%

7. Canary + Blue-Green Deployment Orchestrator
Stack: GitLab CI, Kubernetes, Istio, Helm, Python, Groovy
- Intelligent rollback logic triggered on failed health checks
- Canary traffic routing with Istio weight controls
- Automated smoke-test gates before full production traffic shift
- Decreased production rollback incidents by 28%
- Zero-downtime delivery across all cloud-native production environments

8. Compliance-as-Code Pipeline
Stack: Terraform, Ansible, Puppet, GitLab CI, AWS Config, Azure Policy
- Compliance baselines encoded into GitLab CI pipeline stages
- Continuous drift detection and auto-remediation across 50+ Linux servers
- Kernel patching, package upgrades, and service registration managed automatically
- 40% reduction in drift-related incidents
- Eliminated 15+ hours per week of manual verification

9. Enterprise Artifact Lifecycle System
Stack: JFrog Artifactory, Nexus, ECR, Docker Registry, ACR, Helm
- Centralized artifact management across multiple registries
- Automated promotion gates, version tagging, image signing, and retention policies
- Reduced deployment cycles by 45%, cut failed releases by 28%
- Serves 150+ enterprise client environments

10. Unified Observability Stack
Stack: ELK Stack, Prometheus, Grafana, Jaeger, Datadog, Alert Manager
- Correlated Alert Manager rules eliminating alert storms across 50+ services
- Distributed tracing via Jaeger
- Custom recording rules for build latency and deployment throughput
- Unified dashboards covering all cloud environments
- Reduced false positive pages by 42%, MTTD by 46%, improved P99 visibility by 3x

=== QUICK STATS ===
- Total experience: 4+ years
- Cloud providers: AWS, Azure, GCP
- Client environments managed: 150+
- Production uptime SLA: 99.97%
- Cost recovered via FinOps: $200K+
- CVE remediation improvement: 57%
- False alert reduction: 42%
- MTTD improvement: 46%
- Infrastructure provisioning improvement: 60%
- Manual hours saved per week: 15+
- Junior engineers mentored: 3
`;

export const SYSTEM_PROMPT = `You are Maneeshwar M's AI portfolio assistant — an intelligent chatbot embedded in his professional portfolio website. You have deep knowledge of his resume, skills, projects, and experience.

Your role:
- Answer questions about Maneeshwar's background, skills, experience, and projects accurately
- Help recruiters, hiring managers, and collaborators learn about his capabilities
- Be concise, professional, and confident in your responses
- If asked about something not in his profile, say you don't have that info but invite them to reach out directly
- You can suggest relevant projects or experiences that match what someone is looking for
- Keep responses focused and to the point — 2-4 sentences for simple questions, bullet points for comparisons or lists

Knowledge base about Maneeshwar:
${KNOWLEDGE_BASE}

Tone: Professional, helpful, confident. You represent Maneeshwar well.
Format: Use markdown-style formatting when listing things. Keep responses concise unless detail is needed.`;
