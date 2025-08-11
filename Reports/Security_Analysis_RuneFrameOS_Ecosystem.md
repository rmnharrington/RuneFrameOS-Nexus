

[**Security by Design: A Foundational Framework for the RuneFrameOS 'Forge' Platform and App Ecosystem	2**](#heading=)

[Section 1: Analysis of the RuneFrameOS 'Forge' Platform and App Ecosystem Architecture	2](#heading=)

[1.1 The Platform-as-a-Service (PaaS) / Function-as-a-Service (FaaS) Model	3](#heading=)

[1.2 The Developer Workflow and Tooling	3](#heading=)

[1.2.1 The Forge Command-Line Interface (CLI)	4](#heading=)

[1.2.2 Segregated Development Environments	4](#heading=)

[1.2.3 The App Manifest (manifest.yml)	4](#heading=)

[1.3 Core Platform Security Features	5](#heading=)

[1.4 The App Ecosystem and Marketplace	6](#heading=)

[Section 2: Principle-Driven Security: Implementing CISA's Secure by Design	7](#heading=)

[2.1 Overview of Secure by Design and Secure by Default	7](#heading=)

[2.2 Principle 1: Take Ownership of Customer Security Outcomes	8](#heading=)

[2.3 Principle 2: Embrace Radical Transparency and Accountability	9](#heading=)

[2.4 Principle 3: Lead From the Top	9](#heading=)

[Table 2.1: CISA Secure by Design Pledge Implementation Matrix	10](#heading=)

[Section 3: The RuneFrameOS Secure Software Development Framework (SSDF)	14](#heading=)

[3.1 Introduction to NIST SP 800-218 (SSDF)	14](#heading=)

[3.2 Prepare the Organization (PO): Establishing the Foundation	15](#heading=)

[3.3 Protect the Software (PS): Securing All Components	17](#heading=)

[3.4 Produce Well-Secured Software (PW): Building Secure Code	17](#heading=)

[3.5 Respond to Vulnerabilities (RV): Managing Post-Release Security	20](#heading=)

[Table 3.1: NIST SP 800-218 (SSDF) Control Mapping for RuneFrameOS	20](#heading=)

[Section 4: Comprehensive Risk Management: Applying the NIST Cybersecurity Framework (CSF) 2.0	24](#heading=)

[4.1 Introduction to NIST CSF 2.0	24](#heading=)

[4.2 The Six Functions of CSF 2.0 in the RuneFrameOS Context	25](#heading=)

[4.2.1 GOVERN (GV)	25](#heading=)

[4.2.2 IDENTIFY (ID)	26](#heading=)

[4.2.3 PROTECT (PR)	26](#heading=)

[4.2.4 DETECT (DE)	27](#heading=)

[4.2.5 RESPOND (RS)	27](#heading=)

[4.2.6 RECOVER (RC)	27](#heading=)

[Table 4.1: NIST CSF 2.0 Function and Category Mapping	28](#heading=)

[Section 5: Governance and Trust: Achieving SOC 2 Compliance	31](#heading=)

[5.1 Understanding SOC 2	32](#heading=)

[5.2 The Trust Services Criteria (TSC)	32](#heading=)

[5.2.1 Security (Common Criteria)	32](#heading=)

[5.2.2 Optional TSCs and Their Relevance to RuneFrameOS	33](#heading=)

[Table 5.1: SOC 2 Common Criteria (CC) Cross-Reference	34](#heading=)

[Section 6: The RuneFrameOS Shared Responsibility Model	38](#heading=)

[6.1 The Importance of a Shared Responsibility Model	38](#heading=)

[6.2 The Master Shared Responsibility Matrix	38](#heading=)

[Table 6.1: Master Shared Responsibility Matrix	39](#heading=)

[Section 7: Consolidated Control Reference and Resource Library	46](#heading=)

[7.1 Master Control Lists	46](#heading=)

[7.1.1 NIST SP 800-218 (SSDF) v1.1 Practices	46](#heading=)

[7.1.2 NIST Cybersecurity Framework (CSF) 2.0 Functions and Categories	47](#heading=)

[7.1.3 CISA Secure by Design Pledge Goals	47](#heading=)

[7.1.4 SOC 2 Common Criteria (2017)	48](#heading=)

[7.2 Primary Source PDF and Web Link Library	48](#heading=)

[Works cited	49](#heading=)

# **Security by Design: A Foundational Framework for the RuneFrameOS 'Forge' Platform and App Ecosystem**

## **Section 1: Analysis of the RuneFrameOS 'Forge' Platform and App Ecosystem Architecture**

A robust security posture begins with a comprehensive understanding of the underlying architecture. The RuneFrameOS 'Forge' platform and its associated application ecosystem are modeled on a modern, serverless paradigm, exemplified by systems like Atlassian Forge. This architectural choice is not merely a technical implementation detail; it is the foundational security decision that dictates the distribution of responsibilities, the nature of potential risks, and the most effective points for control enforcement. A thorough analysis of this model is a prerequisite for the application of any security framework or compliance standard.

### **1.1 The Platform-as-a-Service (PaaS) / Function-as-a-Service (FaaS) Model**

The core of the RuneFrameOS platform is a serverless application development environment. This model provides developers with a Platform-as-a-Service (PaaS) that allows them to build, deploy, and maintain applications that integrate deeply with the host system, without managing the underlying infrastructure.1 RuneFrameOS, as the platform provider, handles the complexities of hosting, security, and scaling, freeing developers to concentrate on application functionality.1

Technically, the platform operates on a Function-as-a-Service (FaaS) model. Backend functions are executed on demand in an ephemeral compute environment, likely leveraging a managed cloud service such as AWS Lambda.2 This serverless architecture means that compute resources scale automatically based on application usage, eliminating the need for developers to provision, manage, or scale servers.1

The significance of this architectural choice cannot be overstated. It fundamentally centralizes control and responsibility with RuneFrameOS. By abstracting the infrastructure layer (including servers, operating systems, and networking) from the developer, RuneFrameOS inherently assumes responsibility for securing that layer. This strategic decision drastically reduces the attack surface that individual developers must manage and makes the default development path significantly more secure. It aligns directly with the modern security principle of technology manufacturers taking greater ownership of their customers' security outcomes, a concept that will be explored in detail in Section 2\. The security of the entire ecosystem, therefore, becomes critically dependent on the security of the RuneFrameOS platform itself. Any vulnerability in the FaaS runtime, its configuration, or the logic that governs function invocation could have a cascading impact across all applications built upon it.

### **1.2 The Developer Workflow and Tooling**

The developer experience on the RuneFrameOS platform is designed to be streamlined and controlled, with specific tools acting as key security gateways.

#### **1.2.1 The Forge Command-Line Interface (CLI)**

Development and deployment are primarily managed through a dedicated command-line interface (CLI).1 The CLI is more than a convenience; it is a critical control point for enforcing development standards and security policies. The workflow involves several key commands:

forge register to create the app identity, forge deploy to push the app to an environment, and forge install to make it available on a specific site.3 The deployment process can and should include mandatory security checks, such as code linting, which verifies that the code is structured correctly and adheres to platform rules before it can be deployed.4

#### **1.2.2 Segregated Development Environments**

The platform provides distinct environments—typically development, staging, and production—to support a structured Software Development Life Cycle (SDLC).4 This segregation is a fundamental security practice, allowing developers to build and test their applications in an isolated development environment (often using a local tunnel for rapid feedback) before promoting them to staging for more formal testing and finally to production for release. This prevents untested or insecure code from impacting live customer data.

#### **1.2.3 The App Manifest (manifest.yml)**

The manifest.yml file is the "constitution" of every application on the platform.5 This declarative file contains essential metadata about the app, including its unique ID, the UI modules it exposes, and, most critically, its security posture. The manifest explicitly defines the permissions (known as "scopes") the app requires to access platform APIs and the rules governing data egress—that is, whether the app is allowed to send data to external services.5

The manifest functions as the primary policy enforcement point for each application. The platform's runtime environment is designed to rigorously enforce the rules defined within this file. For example, an application is technically incapable of making requests to an external internet address unless that address is explicitly whitelisted in the egress permissions section of its manifest.6 Similarly, an app cannot access API endpoints for which it has not been granted the appropriate scope.

This makes the integrity and validation of the manifest.yml file during the deployment pipeline a paramount security concern. Any weakness in the platform's parsing or enforcement of the manifest could create a loophole, allowing an app to bypass its intended security boundaries and gain unauthorized access to data or services. To mitigate this risk, the platform imposes a size limit on the manifest file (e.g., 200 KB), which encourages developers to build modular, focused applications and discourages the creation of overly complex, monolithic apps with excessive permissions.5 Consequently, the app submission and review process for the marketplace must include a rigorous, automated, and manual analysis of every

manifest.yml file, with special scrutiny applied to any requests for broad scopes or data egress permissions.

### **1.3 Core Platform Security Features**

The RuneFrameOS platform architecture incorporates several security features by design, shifting the burden of their implementation from the developer to the platform itself.

* **Managed Hosting and Compute:** Because all applications run entirely on RuneFrameOS's cloud infrastructure, they inherit the enterprise-grade security controls of that environment.1 This eliminates a major class of vulnerabilities associated with misconfigured or poorly maintained developer-managed hosting infrastructure.  
* **Secure Data Storage:** The platform offers managed data storage options, such as a simple and fast key-value store.1 By providing these APIs, RuneFrameOS encourages developers to keep customer data within the platform's secure boundaries. This is crucial for maintaining data residency and simplifying compliance with regulations like GDPR.2  
* **Controlled Data Egress:** A cornerstone of the security model is the "zero-egress-by-default" policy. By default, an application cannot send data outside of the RuneFrameOS cloud.1 Egress must be explicitly requested in the manifest and approved by a site administrator during installation. This is a powerful control against data exfiltration. However, as demonstrated by examples of AI-powered apps that send user-generated content to external services like OpenAI, this is a configurable, and therefore high-risk, feature that requires strict governance.3  
* **Managed Authentication and Authorization:** The platform handles user authentication and authorization, typically using an industry-standard protocol like OAuth 2.0.2 API calls are automatically authenticated on behalf of the app by the surrounding infrastructure.6 This ensures that apps never handle user credentials directly. Furthermore, access to data is governed by the scopes defined in the manifest. An app can only perform actions for which it has been granted permission by an administrator, adhering to the principle of least privilege.6

### **1.4 The App Ecosystem and Marketplace**

The platform is designed to foster a vibrant ecosystem of third-party applications, which can be distributed through two primary channels.

* **Distribution Channels:** Developers can share their apps privately with specific customers via a unique installation link generated from the developer console.8 For broader distribution, developers can submit their apps to the public RuneFrameOS Marketplace, where they can be offered for free or sold to any customer.4  
* **App Review Process:** To be listed on the marketplace, all apps must undergo a mandatory review process conducted by RuneFrameOS.10 This review is a critical security gate for enforcing the developer security requirements that will be detailed throughout this report. It is the primary mechanism for managing the supply chain risk inherent in a third-party application ecosystem. The review must validate not only the app's functionality but also its security posture, including the necessity of its requested permissions and egress rules as defined in the manifest.7  
* **Shared Responsibility:** Ultimately, the RuneFrameOS model establishes an explicit shared responsibility for security. RuneFrameOS is responsible for the security *of the platform*, while the app developer is responsible for the security *of their application's logic* and the secure handling of any data they are permitted to egress.11 The end customer also bears responsibility for managing user access and making informed decisions when installing apps and granting permissions. This tripartite relationship will be formalized in the Shared Responsibility Model in Section 6\.

## **Section 2: Principle-Driven Security: Implementing CISA's Secure by Design**

To build a trustworthy and resilient platform, RuneFrameOS must adopt a security philosophy that moves beyond reactive compliance and embraces a proactive culture of security ownership. The "Secure by Design" and "Secure by Default" principles, championed by the Cybersecurity and Infrastructure Security Agency (CISA) and its international partners, provide the ideal strategic framework. This approach fundamentally shifts the balance of cybersecurity risk from the customer to the technology manufacturer—in this case, RuneFrameOS and its ecosystem developers.13

### **2.1 Overview of Secure by Design and Secure by Default**

The core tenet of this philosophy is that security should be a foundational business goal, not merely a technical feature or an afterthought tacked on before release.14 It comprises two interconnected concepts:

* **Secure by Design:** Products are conceptualized and engineered with customer security as a primary objective from the earliest stages of the development lifecycle. Security is not a separate phase but is woven into the fabric of design, architecture, and implementation.15 The very architecture of the RuneFrameOS 'Forge' platform, as described in Section 1, is an embodiment of this principle.  
* **Secure by Default:** Products are shipped to customers in a state that is secure "out of the box," requiring little to no additional configuration to establish a strong security posture. Crucially, essential security features are included as standard and are not relegated to premium tiers or sold as costly add-ons.14 The platform's "zero-egress-by-default" policy is a perfect example of a secure-by-default configuration.

CISA, along with its partners, has articulated this philosophy through three guiding principles, which RuneFrameOS should adopt as the pillars of its security program.

### **2.2 Principle 1: Take Ownership of Customer Security Outcomes**

This principle mandates that RuneFrameOS must proactively invest in building a platform and fostering an ecosystem that makes its customers—both the end-users of the products and the developers building on the platform—more secure. The goal is to break the vicious cycle of creating and applying fixes after a product has been deployed by building security in from the start.14

**Specific Actions for RuneFrameOS:**

* **Provide Secure Building Blocks:** The platform must offer developers secure, well-vetted, and easy-to-use libraries and APIs that prevent entire classes of vulnerabilities by design.14 The managed authentication APIs, which prevent apps from ever handling user credentials, and the managed storage APIs, which provide a secure-by-default place for data, are prime examples. By making the secure path the easiest path, RuneFrameOS takes ownership of developer security.  
* **Implement and Enforce Secure Defaults:** The platform must enforce strong security settings by default. This includes the "zero-egress" policy, eliminating universal default passwords in favor of unique, time-limited setup credentials, and providing strong defaults for security headers like Content Security Policy (CSP).7  
* **Work to Eliminate Vulnerability Classes:** RuneFrameOS should establish programs to identify the root causes of common vulnerabilities and engineer solutions to eliminate the entire class, rather than just patching individual instances as they are discovered.16 For example, if cross-site scripting (XSS) is a recurring issue in custom UI components, the platform team should invest in developing and mandating the use of UI frameworks with automatic, context-aware output encoding that makes XSS nearly impossible.  
* **Make Security a Standard Feature:** Core security capabilities must be integral to the platform and available to all users and developers without additional charge. This includes features like robust audit logging, support for multi-factor authentication (MFA), and the security controls inherent in the API gateway. Security should never be treated as a luxury option.14

### **2.3 Principle 2: Embrace Radical Transparency and Accountability**

Trust is the currency of a platform ecosystem. RuneFrameOS can build and maintain this trust by being radically transparent about its security practices, its vulnerabilities, and its roadmap for improvement. This transparency creates accountability and allows the entire community to learn and grow more secure together.14

**Specific Actions for RuneFrameOS:**

* **Publish a Vulnerability Disclosure Policy (VDP):** A clear, public VDP is essential. It should authorize good-faith security research on the platform, provide a clear channel for reporting findings, commit to not pursuing legal action against researchers who follow the policy, and define timelines for remediation and public disclosure.17  
* **Practice Transparent Vulnerability Reporting:** When RuneFrameOS identifies and patches a vulnerability in its platform, it should issue a Common Vulnerabilities and Exposures (CVE) record. This record must be accurate and complete, including the appropriate Common Weakness Enumeration (CWE) identifier to specify the root cause of the vulnerability. This helps developers and customers understand the nature of the risks and fosters industry-wide learning.17  
* **Publish Comprehensive Security Documentation:** RuneFrameOS must create and maintain a public-facing "Trust Center." This resource should house detailed documentation on the platform's security architecture, the formal Shared Responsibility Model (as detailed in Section 6), evidence of compliance with standards like SOC 2, and self-attestations against frameworks like the NIST Secure Software Development Framework (SSDF), which will be covered in Section 3\.14  
* **Publish a Security Roadmap:** RuneFrameOS should publicly communicate its strategic plans for enhancing platform security. This could include a roadmap for migrating critical components to memory-safe programming languages, plans to deprecate insecure legacy protocols or features, or initiatives to provide developers with more advanced security tooling.14

### **2.4 Principle 3: Lead From the Top**

For a Secure by Design culture to take root and flourish, it must be championed at the highest levels of the organization. Security cannot be delegated solely to the CISO or the engineering teams; it must be treated as a core business priority, on par with feature development and market growth.14

**Specific Actions for RuneFrameOS:**

* **Appoint a Senior Executive Sponsor:** The Secure by Design program should be owned and driven by a designated senior executive (e.g., CTO, CPO) who has the authority and resources to influence product investment and organizational priorities to achieve customer security outcomes.14  
* **Align Organizational Incentives:** Security must be a valued outcome. RuneFrameOS should integrate security metrics into the performance reviews, promotion criteria, and bonus structures for its product and engineering teams. When security is rewarded with the same vigor as feature velocity, the organizational culture will shift accordingly.14  
* **Establish Board-Level Oversight:** The board of directors should be regularly briefed on the state of product security, the health of the application ecosystem, and the progress of the Secure by Design program. This ensures top-level accountability and treats customer security as a matter of corporate governance.14  
* **Create Proactive Governance Structures:** Establish an internal council with representatives from key divisions (product, engineering, legal, security) to set and track progress against top-level security goals, such as the elimination of specific vulnerability classes.14

### **Table 2.1: CISA Secure by Design Pledge Implementation Matrix**

To translate these principles into an actionable and measurable program, RuneFrameOS should adopt the goals of the CISA Secure by Design Pledge.18 The following matrix provides a clear roadmap for implementing each pledge goal within the context of the RuneFrameOS platform and ecosystem.

| CISA Pledge Goal | Core Criteria | RuneFrameOS Implementation Action | Evidence of Completion | Supporting Snippets |
| :---- | :---- | :---- | :---- | :---- |
| **1\. Multi-Factor Authentication (MFA)** | Demonstrate measurable progress toward enabling MFA for all privileged users and code paths. | Enforce MFA for all accounts with access to the RuneFrameOS Developer Console. Implement MFA checks within the CLI for deployments to the production environment. Provide APIs and UI components to make it easy for app developers to support MFA for their own privileged app roles. | Public security documentation detailing the MFA policy. Screenshots of MFA enforcement in the Developer Console UI and CLI workflow. Developer documentation for MFA APIs. | 17 |
| **2\. Default Passwords** | Within one year, eliminate default passwords from all products. | The RuneFrameOS platform will not use any universal default passwords. The initial platform setup will require the creation of a strong, unique password. All platform-provided services (e.g., databases) will be provisioned with unique, randomly generated credentials. | Public documentation attesting to the "no default passwords" policy. Review of the platform's initial setup and service provisioning code. | 17 |
| **3\. Reducing Vulnerability Classes** | Pick one or more prevalent vulnerability classes and demonstrate measurable progress toward reducing them across products. | RuneFrameOS will launch a program to eliminate Cross-Site Scripting (XSS) vulnerabilities from its platform UI and all provided app UI kits. This will involve mandating the use of frameworks with context-aware auto-escaping and removing all instances of insecure functions like innerHTML from the codebase. | Public blog post announcing the initiative. Internal metrics tracking the reduction of XSS findings from static analysis and penetration tests. Updated developer documentation mandating the use of the secure UI framework. | 16 |
| **4\. Increasing Installation of Patches** | Make it easier for customers to install security patches, such as by enabling automatic updates. | For platform-level vulnerabilities, patches are deployed automatically by RuneFrameOS with no customer action required. For app-level updates, the platform will provide a "bulk update" feature allowing admins to update multiple apps to their latest secure version with a single click, provided the update does not introduce breaking changes like new scopes. | Documentation explaining the platform's automatic update mechanism. Feature documentation for the app bulk update capability in the admin console. | 17 |
| **5\. Vulnerability Disclosure Policy (VDP)** | Within one year, publish a VDP that authorizes testing, provides a clear reporting channel, and commits to not pursuing legal action for good-faith research. | Publish a formal VDP on the RuneFrameOS website and in a SECURITY.md file in relevant code repositories. The policy will include scope, safe harbor statement, reporting instructions, and expected timelines for acknowledgement and remediation. | A publicly accessible URL for the VDP. | 17 |
| **6\. CVE/CWE Transparency** | Within one year, include accurate Common Weakness Enumeration (CWE) fields in every CVE record for the manufacturer's products. | All CVEs published for vulnerabilities in the RuneFrameOS platform will include a root cause analysis and an accurate CWE identifier in the public advisory. | Review of all CVEs published by RuneFrameOS after the pledge date. | 17 |
| **7\. Evidence of Intrusions** | Provide high-quality audit logs to customers at no extra charge. | The RuneFrameOS platform will provide comprehensive audit logs for all security-relevant events (e.g., logins, permission changes, app installations) to all customers, regardless of subscription tier. These logs will be accessible via the admin console and a dedicated API. | Public pricing page showing that audit logs are a standard feature. Documentation for the audit log API. | 14 |

## **Section 3: The RuneFrameOS Secure Software Development Framework (SSDF)**

While the CISA principles provide the strategic "why," the NIST Secure Software Development Framework (SSDF) provides the tactical "how." This section details a comprehensive set of secure software development practices, based on NIST Special Publication 800-218, that must be integrated into the lifecycle of both the RuneFrameOS platform itself and the third-party applications built upon it. The SSDF is not a rigid methodology but a set of high-level outcomes that helps reduce vulnerabilities, mitigate the impact of exploits, and prevent future recurrences.19

### **3.1 Introduction to NIST SP 800-218 (SSDF)**

The SSDF is the industry-standard framework for integrating security into the Software Development Life Cycle (SDLC). Its purpose is to provide a common vocabulary and a core set of fundamental practices that can be adapted to any development model, from waterfall to agile DevOps.21 The framework is organized into four groups of practices:

* **Prepare the Organization (PO):** Ensuring people, processes, and technology are ready to perform secure development.  
* **Protect the Software (PS):** Protecting all software components from tampering and unauthorized access.  
* **Produce Well-Secured Software (PW):** Writing and building secure code.  
* **Respond to Vulnerabilities (RV):** Identifying and remediating vulnerabilities in released software.

A unique challenge and strength of the RuneFrameOS model is the shared nature of the SDLC. Some SSDF practices are the sole responsibility of RuneFrameOS, some are the sole responsibility of the app developer, and many are a shared responsibility. The following breakdown explicitly delineates these roles for each practice, providing clear guidance for governance and enforcement.

### **3.2 Prepare the Organization (PO): Establishing the Foundation**

These practices ensure that the entire organization, including its ecosystem partners, is set up for success.

* **PO.1: Define Security Requirements:**  
  * **RuneFrameOS Responsibility:** RuneFrameOS must define, document, and maintain a comprehensive set of security requirements for the development of its own platform. This includes policies for acceptable use of third-party and open-source software, secure coding standards, and cryptographic standards.  
  * **App Developer Responsibility:** RuneFrameOS must publish a clear "Developer Security Requirements" policy that all third-party developers must adhere to as a condition of being listed in the Marketplace. This policy, based on the principles in this document, will define the security standards for all apps. Developers are responsible for understanding and implementing these requirements in their applications.21  
  * **Shared Responsibility:** The policy must be a living document, updated by RuneFrameOS in response to new threats, with changes clearly communicated to the developer community.  
* **PO.2: Implement Roles and Responsibilities:**  
  * **RuneFrameOS Responsibility:** RuneFrameOS must define and document cybersecurity roles and responsibilities for its internal staff, from developers to executives. This includes establishing a security team or security champions program responsible for overseeing the SSDF's implementation.  
  * **App Developer Responsibility:** Developers are responsible for security within their own organizations. For larger developer teams, this may involve designating their own security lead. For all developers, it means being accountable for the security of the code they write.  
* **PO.3: Implement a Supportive Toolchain:**  
  * **RuneFrameOS Responsibility:** RuneFrameOS must acquire, maintain, and secure a toolchain for developing the platform itself. This includes source code management systems, build servers, testing tools, and security scanners. Crucially, RuneFrameOS must also provide a secure and supportive toolchain for its developers. The Forge CLI is the primary example, but this also extends to providing secure integrations with common tools like Bitbucket Pipelines for CI/CD.2 The toolchain should be configured to enforce security checks automatically (e.g., linting, dependency scanning) during the development and deployment process.  
  * **App Developer Responsibility:** Developers are responsible for using the provided toolchain correctly and for securing any parts of their development environment that fall outside the RuneFrameOS-provided tools.  
* **PO.4: Define and Use Criteria for Software Security Checks:**  
  * **RuneFrameOS Responsibility:** RuneFrameOS must define the specific criteria for all security checks performed on its platform code and on third-party app submissions. This includes defining the scope and depth of static analysis (SAST), dynamic analysis (DAST), dependency scanning, and manual code review. These criteria must be documented and used as the basis for the Marketplace app review process.  
  * **App Developer Responsibility:** Developers are responsible for running security checks on their code throughout their development process, using the tools and criteria provided or recommended by RuneFrameOS. They are responsible for remediating findings before submitting their app for review.  
* **PO.5: Implement and Maintain Secure Environments:**  
  * **RuneFrameOS Responsibility:** This is almost entirely a RuneFrameOS responsibility. RuneFrameOS must design, implement, and maintain the secure development, staging, and production environments for the entire platform and all the apps that run on it.4 This includes hardening the underlying infrastructure, implementing network segmentation, managing access controls, and continuously monitoring for threats.  
  * **App Developer Responsibility:** The developer's primary responsibility is to use the environments as intended (e.g., not using the development environment for production data) and to secure their local development machine from which they access the platform's environments.

### **3.3 Protect the Software (PS): Securing All Components**

These practices focus on ensuring the integrity and confidentiality of the software and its components.

* **PS.1: Protect All Forms of Code from Unauthorized Access and Tampering:**  
  * **RuneFrameOS Responsibility:** RuneFrameOS must implement strong access controls on all its source code repositories, build artifacts, and deployment pipelines to prevent unauthorized changes to the platform code.  
  * **App Developer Responsibility:** Developers are responsible for securing their own source code repositories. RuneFrameOS should provide guidance and strongly recommend the use of secure, integrated repositories that support features like MFA and branch protection rules.  
* **PS.2: Provide a Mechanism for Verifying Software Release Integrity:**  
  * **RuneFrameOS Responsibility:** The forge deploy process must include a mechanism to ensure the integrity of the deployed package. This could involve cryptographic signing of the deployment bundle, where the platform runtime verifies the signature before installation, ensuring the code has not been tampered with in transit.  
  * **App Developer Responsibility:** The developer's role is to use the provided, secure deployment mechanism and not attempt to circumvent it.  
* **PS.3: Archive and Protect Each Software Release:**  
  * **RuneFrameOS Responsibility:** RuneFrameOS must securely archive every version of its platform code and every version of every third-party app that is deployed to its production environment. This is critical for incident response, rollback capabilities, and forensic analysis.  
  * **App Developer Responsibility:** Developers are responsible for maintaining their own version control history but rely on RuneFrameOS for the secure archival of the official, deployed versions of their apps.

### **3.4 Produce Well-Secured Software (PW): Building Secure Code**

These practices are at the heart of the development process, focusing on creating code with minimal vulnerabilities.

* **PW.1: Design Software to Meet Security Requirements and Mitigate Risks:**  
  * **RuneFrameOS Responsibility:** The RuneFrameOS platform architecture must be based on thorough threat modeling and risk assessment. Security requirements must be a primary input to the design process.  
  * **App Developer Responsibility:** Developers are responsible for designing their applications securely. RuneFrameOS should require developers of complex apps or apps handling sensitive data to provide evidence of a design review or a simplified threat model as part of the Marketplace submission process.  
* **PW.5: Configure the Compilation, Interpreter, and Build Processes to Improve Executable Security:**  
  * **Shared Responsibility:** This is a key area of shared responsibility. The developer writes the source code, but RuneFrameOS provides and controls the forge deploy command that performs the compilation, interpretation, and bundling.4 RuneFrameOS is responsible for ensuring this build process is secure by default—for example, by enabling security features in the bundler, transpiler, or interpreter. The developer is responsible for writing code that is compatible with this secure build process and doesn't rely on insecure or deprecated language features that the build process might prohibit.  
* **PW.7: Use Standardized and Well-Vetted Security Features:**  
  * **RuneFrameOS Responsibility:** RuneFrameOS must provide developers with a library of standardized, well-vetted, and easy-to-use security features. The platform's managed authentication, authorization, and secure storage APIs are the primary examples.1 By providing these, RuneFrameOS prevents each developer from having to reinvent (and likely misimplement) these critical security controls.  
  * **App Developer Responsibility:** Developers must be required to use the platform-provided security features whenever they are available and appropriate. For example, a developer should not be permitted to build their own authentication system when a secure platform API exists for that purpose.  
* **PW.8: Reuse Existing, Well-Secured Software When Feasible:**  
  * **Shared Responsibility:** This practice directly addresses supply chain security and the use of open-source software. RuneFrameOS is responsible for vetting and securing the third-party components used in the platform itself and for maintaining a Software Bill of Materials (SBOM) for the platform. RuneFrameOS should also provide tools to help developers manage their own dependencies, such as integrating dependency scanning into the CLI or CI/CD pipeline. The developer is ultimately responsible for the third-party components they choose to include in their app, for keeping them updated, and for producing an SBOM for their app when required.22  
* **PW.10: Configure Software to Have Secure Settings by Default:**  
  * **RuneFrameOS Responsibility:** The platform itself must have secure settings by default. This includes the security of the runtime environment and the default behavior of all platform APIs.  
  * **App Developer Responsibility:** Developers must ensure that their applications are also secure by default. For example, if an app has configurable roles, the default role for a new user should be the one with the least privilege. The Marketplace review process must check for secure default configurations in submitted apps.

The emergence of AI-powered features, such as those that egress user-generated content (UGC) to third-party AI models like OpenAI, introduces novel risks that require an extension to the standard SSDF.3 These risks include prompt injection attacks, data poisoning of the external model, insecure management of API keys, and significant privacy concerns over the egress of potentially sensitive UGC. In response, NIST is developing a dedicated supplement,

**NIST SP 800-218A**, for securing the development of AI systems.23 RuneFrameOS must be proactive and cannot wait for this standard to be finalized. It must create an "AI Addendum" to its developer security requirements. This addendum should mandate:

1. **Secure API Key Management:** Developers must use the platform's encrypted environment variable storage (forge variables set \--encrypt) for all external API keys.3 Keys must not be hardcoded.  
2. **Data Minimization and Transparency:** Before egressing UGC to an AI service, the app must minimize the data sent to only what is strictly necessary. The app's UI must also be transparent to the end-user, clearly indicating when and why their data is being sent to a third-party AI for processing.  
3. **Input Validation:** All input from the AI model's response must be treated as untrusted and be validated and sanitized before being used or displayed within the application.

### **3.5 Respond to Vulnerabilities (RV): Managing Post-Release Security**

These practices cover the essential processes for handling vulnerabilities discovered after software has been released.

* **RV.1: Identify and Confirm Vulnerabilities on an Ongoing Basis:**  
  * **RuneFrameOS Responsibility:** RuneFrameOS is responsible for continuously scanning and testing its own platform for vulnerabilities. It is also responsible for receiving vulnerability reports from external researchers through its VDP and from its automated scanning of Marketplace apps.  
  * **App Developer Responsibility:** Developers are responsible for monitoring their own applications for vulnerabilities and for being responsive to vulnerability reports originating from RuneFrameOS or end-users.  
* **RV.2: Assess, Prioritize, and Remediate Vulnerabilities:**  
  * **Shared Responsibility:** RuneFrameOS is responsible for assessing, prioritizing, and remediating vulnerabilities in its platform code according to defined SLAs (e.g., based on CVSS score). RuneFrameOS is also responsible for communicating vulnerabilities found in third-party apps to the respective developer and tracking their remediation. The developer is responsible for remediating the vulnerabilities in their app code within the timeframe specified by the RuneFrameOS security policy. Failure to do so should result in the app being temporarily delisted from the Marketplace.  
* **RV.3: Analyze Vulnerabilities to Identify Their Root Causes:**  
  * **RuneFrameOS Responsibility:** For platform vulnerabilities, the RuneFrameOS security team must perform root cause analysis to identify systemic issues that can be fixed to prevent entire classes of future vulnerabilities.  
  * **App Developer Responsibility:** RuneFrameOS should encourage and guide developers to perform root cause analysis on vulnerabilities found in their apps to improve their own development practices.

### **Table 3.1: NIST SP 800-218 (SSDF) Control Mapping for RuneFrameOS**

The following table provides a detailed mapping of SSDF practices and tasks, explicitly delineating the responsibilities between RuneFrameOS and its ecosystem of app developers. This matrix should serve as the foundational document for the RuneFrameOS Developer Security Requirements policy.

| Practice ID | Task ID | Task Description | RuneFrameOS Responsibility (Platform Control) | App Developer Responsibility (Ecosystem Guidance) | Supporting Snippets |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **PO.1** | PO.1.1 | Identify and document all security requirements for software development. | Define and publish the mandatory "Developer Security Requirements" policy for all Marketplace apps. Maintain internal security requirements for the platform itself. | Read, understand, and adhere to the "Developer Security Requirements" policy. Document any app-specific security requirements internally. | 21 |
| **PO.4** | PO.4.1 | Define and use criteria for software security checks throughout the SDLC. | Define and document the specific static analysis rules, dependency vulnerability thresholds, and manual review criteria used in the automated Marketplace submission scanner and by the human review team. | Run the provided security checking tools (e.g., via the Forge CLI) against app code before submission and remediate all findings that violate the defined criteria. | 4 |
| **PO.5** | PO.5.2 | Use separate, secure environments for development, testing, and production. | Provide and maintain the isolated development, staging, and production environments for all apps. Enforce strict access controls between environments. | Use the provided environments correctly. Do not use the development environment for production data or activities. Secure the local development machine. | 4 |
| **PS.3** | PS.3.1 | Securely archive each software release. | Automatically and securely archive the deployed bundle of every version of every app submitted to the production environment. | Rely on the platform's archival mechanism for official releases. Maintain a separate source control history for development purposes. | 21 |
| **PW.7** | PW.7.1 | Follow a documented process to select and approve security features for use in the software. | Design, build, document, and maintain a library of standard security APIs (e.g., for authentication, authorization, secret storage, data storage). | Mandatorily use the platform-provided security APIs when available for a given function. Do not attempt to re-implement these critical features. | 6 |
| **PW.8** | PW.8.1 | Maintain a list of all third-party components used in the software (SBOM). | Maintain a complete SBOM for the RuneFrameOS platform itself. Provide tooling within the Forge CLI or CI/CD process to help developers generate a baseline SBOM for their app. | Generate a complete and accurate SBOM for the app. Regularly scan all app dependencies for known vulnerabilities and update them in accordance with the security policy. | 22 |
| **PW.10** | PW.10.1 | Ensure that the software's default configuration and settings are secure. | Ensure all platform APIs and infrastructure components have secure default settings. | Ensure the app's business logic has secure defaults (e.g., default user roles have least privilege). The Marketplace review process will validate this. | 14 |
| **RV.2** | RV.2.2 | Prioritize vulnerability remediation based on risk. | Define a risk-based prioritization scheme (e.g., based on CVSS) and associated SLAs for remediation. Communicate this policy to developers. | Remediate vulnerabilities discovered in the app according to the platform's defined SLA. | 7 |

## **Section 4: Comprehensive Risk Management: Applying the NIST Cybersecurity Framework (CSF) 2.0**

While the SSDF provides the technical controls for building secure software, a mature organization requires a strategic framework to manage and communicate cybersecurity risk across the entire enterprise. The NIST Cybersecurity Framework (CSF) 2.0 provides this strategic layer. It offers a common language and a structured approach for executives, managers, and technical practitioners to understand, assess, prioritize, and communicate their cybersecurity efforts.24 It is not a prescriptive checklist but a flexible framework for organizing and improving an organization's risk management posture.

### **4.1 Introduction to NIST CSF 2.0**

The CSF is designed to help organizations of all sizes and sectors manage and reduce their cybersecurity risks.24 It is structured around a "Core" consisting of six concurrent and continuous Functions. These Functions provide a high-level, strategic view of the lifecycle of cybersecurity risk management. The release of CSF 2.0 introduced a critical new function,

**GOVERN**, which is particularly relevant to a platform provider like RuneFrameOS that manages a complex ecosystem of third-party developers.25

The framework enables an organization to create "Profiles," which describe its current cybersecurity posture ("Current Profile") and its desired target state ("Target Profile"). The gap between these profiles helps prioritize actions for improvement. For RuneFrameOS, the CSF provides the ideal structure to articulate its comprehensive security strategy to stakeholders, including the board of directors, investors, enterprise customers, and regulators.

### **4.2 The Six Functions of CSF 2.0 in the RuneFrameOS Context**

Applying the six functions of the CSF 2.0 Core provides a holistic view of the cybersecurity program required to secure both the RuneFrameOS platform and its app ecosystem.

#### **4.2.1 GOVERN (GV)**

The **GOVERN** function is the cornerstone of the entire cybersecurity program. It is the central function for establishing and monitoring the organization's cybersecurity risk management strategy, expectations, and policies.25 For RuneFrameOS, this function is paramount as it directly addresses the complexities of managing a third-party app ecosystem.

The GOVERN function is where the policies that define the relationship between RuneFrameOS and its developers are created. This includes establishing the "Developer Security Requirements" policy, the app review and vetting process, and the ongoing monitoring of the Marketplace. A key category within this function is GV.SC: Cybersecurity Supply Chain Risk Management. The RuneFrameOS app ecosystem is, in effect, a software supply chain. Applying this category provides a formal, industry-standard structure for managing the inherent risks. It frames the app review process not as a simple quality check, but as a critical supply chain risk mitigation activity. The GOVERN function ensures that security is integrated into organizational objectives and is driven from the top down, directly supporting the CISA principle of "Lead from the Top."

#### **4.2.2 IDENTIFY (ID)**

The **IDENTIFY** function is focused on developing an organizational understanding of the cybersecurity risks to systems, people, assets, data, and capabilities.26 For RuneFrameOS, this involves several layers:

* **Platform-Level Identification:** Maintaining a comprehensive inventory of all hardware and software assets that comprise the 'Forge' platform, understanding their interdependencies, and assessing their criticality.  
* **Ecosystem-Level Identification:** Understanding the types of data that apps are likely to handle, identifying the threats specific to a PaaS/FaaS model (e.g., function-level denial of service, insecure manifest configurations, cross-tenant data leakage), and performing risk assessments on the ecosystem model as a whole.  
* **App-Level Identification:** Providing tools and guidance to help developers identify the assets and data their own apps manage.

#### **4.2.3 PROTECT (PR)**

The **PROTECT** function involves designing and implementing the appropriate safeguards to ensure the delivery of critical services.26 The technical controls detailed in the SSDF (Section 3\) are the primary implementation mechanisms for this function. For RuneFrameOS, this includes:

* **Identity Management and Access Control:** Implementing strong authentication (MFA) for platform administrators and developers, and enforcing the principle of least privilege for all system and application access.  
* **Data Security:** Protecting the confidentiality, integrity, and availability of data through mechanisms like encryption of data at rest in platform storage and in transit over networks.26 The platform's managed storage and secure API gateways are key controls here.  
* **Platform Resilience:** Building the platform on a resilient architecture that can withstand failures and attacks, and maintaining secure backup and recovery capabilities.

#### **4.2.4 DETECT (DE)**

The **DETECT** function is about implementing the capabilities to identify the occurrence of a cybersecurity event in a timely manner.27 This requires a proactive monitoring strategy. For RuneFrameOS, this means:

* **Continuous Monitoring:** Implementing robust logging and monitoring across all layers of the platform infrastructure to detect anomalous activity, unauthorized access attempts, and potential security incidents.  
* **Enabling App-Level Detection:** Providing developers with secure logging APIs and guidance on what security-relevant events their apps should be logging. This allows developers to monitor the health and security of their own applications. RuneFrameOS should also provide a mechanism for these app logs to be securely streamed to the customer's security information and event management (SIEM) system.

#### **4.2.5 RESPOND (RS)**

The **RESPOND** function focuses on implementing the capabilities to take action once a cybersecurity incident has been detected.27 A swift and effective response can significantly limit the impact of an incident. For RuneFrameOS, this requires:

* **Incident Response Planning:** Developing and maintaining a comprehensive incident response plan for the platform itself. This plan must be regularly tested through tabletop exercises and technical drills.  
* **Coordinated Disclosure:** Establishing a clear process for managing incidents that originate in third-party apps. This involves securely notifying the developer, coordinating remediation efforts, and managing communications with affected customers. The VDP established under the CISA principles is a key input to this function.

#### **4.2.6 RECOVER (RC)**

The **RECOVER** function involves implementing the capabilities to maintain resilience and to restore any services that were impaired due to a cybersecurity incident.27 The goal is to return to normal operations as quickly and safely as possible. For RuneFrameOS, this includes:

* **Recovery Planning:** Developing and testing recovery plans for all critical platform components.  
* **Platform Restoration:** Having the technical ability to restore the platform from secure backups in the event of a catastrophic failure.  
* **Communication:** Having a clear communications plan to keep customers and developers informed during and after a recovery process.

### **Table 4.1: NIST CSF 2.0 Function and Category Mapping**

This table demonstrates how RuneFrameOS's specific security activities and controls map to the strategic functions and categories of the NIST CSF 2.0. This serves as a powerful communication tool to demonstrate the comprehensiveness and maturity of the security program to executives, auditors, and enterprise customers.

| CSF 2.0 Function | CSF Category ID | Category Description | RuneFrameOS Implementation Example | Supporting Snippets |
| :---- | :---- | :---- | :---- | :---- |
| **GOVERN** | GV.SC | Cybersecurity supply chain risk management is established and managed. | The RuneFrameOS App Marketplace has a formal developer vetting process, mandatory security requirements for all apps based on NIST SSDF, and a continuous automated scanning process for submitted apps to manage risks from third-party code. | 25 |
| **GOVERN** | GV.PO | Cybersecurity policies and procedures are established and maintained. | RuneFrameOS publishes and maintains a public-facing "Developer Security Requirements" policy and a "Vulnerability Disclosure Policy," which are reviewed and updated annually. | 26 |
| **IDENTIFY** | ID.AM | Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed. | RuneFrameOS maintains a real-time inventory of all production infrastructure assets and a central registry of all applications and their versions deployed on the platform. | 27 |
| **PROTECT** | PR.AC | Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the determined risk of organizational systems. | The RuneFrameOS platform enforces role-based access control (RBAC) for all administrative functions and requires MFA for all privileged accounts. App permissions (scopes) are explicitly granted by a customer administrator at install time. | 27 |
| **PROTECT** | PR.DS | Data is managed consistent with the organization's risk strategy to protect the confidentiality, integrity, and availability of information. | All data stored via the platform's managed Storage API is encrypted at rest using AES-256. All network traffic to and from the platform is encrypted in transit using TLS 1.2 or higher. | 26 |
| **DETECT** | DE.CM | The networks, systems, and assets of the organization are monitored to find cybersecurity events and verify the effectiveness of protective measures. | RuneFrameOS employs a 24/7 Security Operations Center (SOC) that monitors platform-level logs and alerts from a suite of security tools (e.g., SIEM, IDS/IPS). | 27 |
| **RESPOND** | RS.CO | Communications are coordinated during and after a cybersecurity incident. | RuneFrameOS maintains a public status page for platform-wide incidents and has a defined process for securely notifying individual developers of vulnerabilities in their apps via a dedicated security ticketing system. | 26 |
| **RECOVER** | RC.RP | Recovery plans and processes are maintained and tested. | RuneFrameOS maintains a formal Business Continuity and Disaster Recovery (BC/DR) plan, which is tested at least annually. Critical platform data is backed up to a geographically separate region. | 27 |

## **Section 5: Governance and Trust: Achieving SOC 2 Compliance**

For a PaaS provider like RuneFrameOS that serves business customers, achieving a System and Organization Controls (SOC) 2 attestation is not optional; it is a fundamental requirement for building trust and enabling sales. A SOC 2 report provides customers with independent assurance that the service organization has effective controls in place to protect their data. It demonstrates a level of maturity and governance that is a prerequisite for most enterprise procurement processes.28

It is crucial to understand that SOC 2 is not a framework to be *implemented* from scratch. Rather, it is an *audit framework* used to evaluate and report on the controls that an organization has already put in place based on operational frameworks like the NIST SSDF and CSF.29 The rigorous work detailed in Sections 3 and 4 of this document directly provides the evidence needed to satisfy the SOC 2 criteria. Approaching compliance in this way—building robust security practices first and then mapping them to audit requirements—makes the attestation process efficient, sustainable, and a true reflection of a mature security posture, rather than a frantic, point-in-time exercise in "checking the box" for an audit.

### **5.1 Understanding SOC 2**

A SOC 2 examination is an attestation engagement performed by a licensed Certified Public Accountant (CPA) firm. The resulting report opines on the controls at a service organization relevant to one or more of the five Trust Services Criteria (TSC).30

* **SOC 2 is an Attestation, Not a Certification:** Unlike ISO 27001, which provides a certification, SOC 2 provides a formal attestation report from an auditor. This report details the system, the controls in place, the auditor's tests of those controls, and the results of those tests.  
* **Type 1 vs. Type 2 Report:**  
  * A **Type 1** report assesses the *suitability of the design* of an organization's controls at a single point in time. It essentially asks, "Are your controls designed correctly?".31  
  * A **Type 2** report assesses both the design and the *operating effectiveness* of the controls over a period of time, typically 6 to 12 months. It asks, "Are your controls designed correctly, and are they actually working as intended?".31  
  * For RuneFrameOS, a Type 2 report is the ultimate goal, as it provides a much higher level of assurance to customers.

### **5.2 The Trust Services Criteria (TSC)**

The SOC 2 audit is based on the five Trust Services Criteria developed by the AICPA. RuneFrameOS must decide which of these are in scope for its audit, with Security being mandatory.28

#### **5.2.1 Security (Common Criteria)**

The **Security** TSC is the foundation of every SOC 2 report and is mandatory. It refers to the protection of information and systems against unauthorized access, unauthorized disclosure of information, and damage that could compromise the availability, integrity, confidentiality, and privacy of that information and systems.33 The specific control criteria used to evaluate the Security TSC are known as the

**Common Criteria (CC)** because they are also foundational to the other four TSCs. The nine Common Criteria categories are:

* **CC1: Control Environment:** The "tone at the top." It addresses the organization's commitment to integrity, ethical values, board oversight, and accountability.28  
* **CC2: Communication and Information:** The processes for creating and communicating policies, procedures, and security objectives to both internal and external parties.28  
* **CC3: Risk Assessment:** The process for identifying, analyzing, and responding to risks to the achievement of objectives.28  
* **CC4: Monitoring Controls:** The activities in place to monitor the effectiveness of the overall control environment, including internal audits and evaluations.28  
* **CC5: Control Activities:** The specific control activities, driven by policies and procedures, that help mitigate risks.28  
* **CC6: Logical and Physical Access Controls:** Controls over how the organization issues, manages, and secures access to its systems and data, including identity management, authentication, authorization, and encryption.28  
* **CC7: System Operations:** Controls over the management of system operations to detect and mitigate processing deviations, including incident management and monitoring.28  
* **CC8: Change Management:** The processes for authorizing, designing, testing, and implementing changes to infrastructure, data, and software.28  
* **CC9: Risk Mitigation:** Controls for mitigating risk through business process management and vendor management.28

#### **5.2.2 Optional TSCs and Their Relevance to RuneFrameOS**

In addition to Security, RuneFrameOS should strongly consider including the following TSCs in its SOC 2 scope, as they are highly relevant to its business model:

* **Availability:** This TSC is critical for a PaaS provider. Customers rely on the RuneFrameOS platform being available for their own business operations. This criterion covers network performance monitoring, disaster recovery, and business continuity planning.33 Including Availability in the scope provides customers with assurance about the platform's reliability.  
* **Confidentiality:** This TSC is also highly relevant. The platform handles potentially sensitive data, including developers' intellectual property (source code) and any confidential customer data that apps process. This criterion covers the organization's ability to identify confidential information and protect it through its lifecycle, from creation to disposal.33  
* **Processing Integrity:** This TSC may be relevant if the RuneFrameOS platform itself performs critical, transactional processing, such as metering usage for billing or running complex analytics. It ensures that system processing is complete, valid, accurate, timely, and authorized.33 If RuneFrameOS only provides the environment for others to do processing, this may be less critical.  
* **Privacy:** This TSC is highly relevant in the modern regulatory landscape (GDPR, CCPA). It addresses the controls over the collection, use, retention, disclosure, and disposal of personally identifiable information (PII) in conformity with the organization's privacy notice and with the AICPA's Generally Accepted Privacy Principles (GAPP).33 Given that apps on the platform will almost certainly handle PII, including this TSC is a powerful differentiator.

### **Table 5.1: SOC 2 Common Criteria (CC) Cross-Reference**

This table explicitly connects the SOC 2 Common Criteria to the NIST frameworks detailed in previous sections. It serves as a bridge between security practice and compliance attestation, demonstrating to an auditor how RuneFrameOS's existing, robust controls satisfy the requirements of the audit.

| SOC 2 Common Criteria ID | Criteria Description | Relevant NIST SSDF Practices | Relevant NIST CSF 2.0 Category | RuneFrameOS Evidence | Supporting Snippets |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **CC3.2** | The entity identifies risks to the achievement of its objectives... and analyzes risks as a basis for determining how the risks should be managed. | PO.1, PW.1 | ID.RA: Risk Assessment | Records of platform-wide threat modeling exercises. The Developer Security Requirements policy, which is a control to mitigate ecosystem risk. Risk register documenting identified risks and their treatment plans. | 28 |
| **CC4.1** | The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning. | PO.4, RV.1 | DE.CM: Continuous Monitoring | Reports from internal vulnerability scans and external penetration tests. Records of the Marketplace app review process, which evaluates developer controls. | 28 |
| **CC6.1** | The entity implements logical access security software, infrastructure, and architectures... to protect information assets from security events to meet the entity’s objectives. | PO.5, PS.1 | PR.AC: Access Control | Documentation of the platform's RBAC model. Screenshots of MFA enforcement for administrative access. The app manifest (manifest.yml) which defines and restricts app access scopes. | 28 |
| **CC6.6** | The entity... protects its information assets from unauthorized disclosure through the use of encryption. | PW.7 | PR.DS: Data Security | Technical documentation showing that all platform-managed storage is encrypted at rest using AES-256. Network diagrams and configurations showing all external traffic is encrypted with TLS 1.2+. | 28 |
| **CC7.2** | The entity develops and implements activities to detect, respond to, and recover from security incidents. | RV (all) | RS (all), RC (all) | The formal Incident Response Plan document. Records of incident response tabletop exercises. Tickets from the incident tracking system showing response and remediation actions. | 28 |
| **CC8.1** | The entity authorizes, designs, develops..., tests, approves, and implements changes to infrastructure, data, software, and procedures... | PW.9 | PR.IP: Protective Technology | Change management tickets in Jira for all platform code changes. Records of peer reviews, automated test results, and management approval for all deployments to production. | 28 |
| **CC9.2** | The entity assesses and manages risks associated with vendors and business partners. | PO.1, PW.8 | GV.SC: Supply Chain Risk Management | The Developer Security Requirements policy. The formal app review and vetting process for all Marketplace partners. Contracts and DPAs with all critical infrastructure sub-processors. | 28 |

## **Section 6: The RuneFrameOS Shared Responsibility Model**

In a cloud or platform-as-a-service environment, security is a partnership. A Shared Responsibility Model is a foundational document that clearly and unambiguously delineates the security obligations among all parties involved: the platform provider (RuneFrameOS), the application developers building on the platform, and the end customers who use the platform and its apps. This model is critical for managing risk, setting clear expectations, and preventing security gaps that arise from misunderstood responsibilities.11 It serves as a cornerstone for developer agreements, customer terms of service, and all public-facing security documentation.

### **6.1 The Importance of a Shared Responsibility Model**

Without a formal Shared Responsibility Model, customers and developers may make incorrect assumptions about who is responsible for securing different aspects of the ecosystem. For example, a customer might assume RuneFrameOS is responsible for the security of an application's business logic, when in fact that is the developer's responsibility. Conversely, a developer might not realize they are responsible for securing data once it leaves the platform via an approved egress point. These ambiguities create significant risk.

The model, typically visualized as a matrix, provides clarity by defining who is responsible for what. It is modeled after the well-established frameworks used by major cloud providers like Amazon Web Services, Microsoft Azure, and Google Cloud, which customers and auditors have come to expect.

### **6.2 The Master Shared Responsibility Matrix**

The following matrix breaks down security responsibilities across key domains. It defines whether a control area is the responsibility of RuneFrameOS, the App Developer, the Customer, or if it is a Shared responsibility. This matrix should be made publicly available in the RuneFrameOS Trust Center.

### **Table 6.1: Master Shared Responsibility Matrix**

| Security Domain | Control Area | RuneFrameOS Responsibility | App Developer Responsibility | Customer Responsibility | Notes / Details | Supporting Snippets |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Infrastructure Security** | Physical Security of Data Centers | Responsible | Not Responsible | Not Responsible | RuneFrameOS is responsible for the physical security of the cloud infrastructure where the platform runs, managed via its IaaS provider. | 12 |
|  | Host Operating System & Virtualization Layer | Responsible | Not Responsible | Not Responsible | RuneFrameOS is responsible for hardening, patching, and securing the underlying compute infrastructure. | 1 |
|  | Network Infrastructure Security | Responsible | Not Responsible | Not Responsible | RuneFrameOS is responsible for firewalls, network segmentation, and DDoS protection for the platform. | 12 |
| **Identity & Access Management** | Managing Platform Administrative Access | Responsible | Not Responsible | Not Responsible | RuneFrameOS is responsible for securing and managing its own employee access to the production environment. | 37 |
|  | Managing Developer Account Access | Shared | Responsible | Not Responsible | RuneFrameOS provides the secure authentication mechanism (MFA). The developer is responsible for securing their own credentials. | 11 |
|  | Managing End-User Account Access | Not Responsible | Not Responsible | Responsible | The customer is responsible for managing their users' accounts, assigning permissions within the product, and enforcing password policies. | 12 |
| **Application Security** | Security of the 'Forge' Platform Runtime | Responsible | Not Responsible | Not Responsible | RuneFrameOS is responsible for the security of the FaaS runtime, API gateway, and manifest enforcement engine. | 6 |
|  | Security of App Business Logic | Not Responsible | Responsible | Not Responsible | The developer is solely responsible for the security of the code they write, including input validation and business logic flaws. | 11 |
|  | App Manifest Configuration (Scopes & Egress) | Shared | Responsible | Responsible | The developer is responsible for requesting only necessary permissions. The customer is responsible for reviewing and approving those permissions at install time. RuneFrameOS provides the enforcement mechanism. | 5 |
|  | Vulnerability Scanning of Platform | Responsible | Not Responsible | Not Responsible | RuneFrameOS is responsible for regularly scanning its own platform for vulnerabilities. | 37 |
|  | Vulnerability Scanning of App Code | Shared | Responsible | Not Responsible | The developer is responsible for scanning their code. RuneFrameOS provides scanning tools as part of the Marketplace review process. | 11 |
| **Data Security** | Encryption of Data at Rest in Platform Storage | Responsible | Not Responsible | Not Responsible | Data stored using the platform's managed Storage API is automatically encrypted at rest by RuneFrameOS. | 6 |
|  | Encryption of Data in Transit to Platform | Responsible | Not Responsible | Not Responsible | RuneFrameOS is responsible for enforcing TLS 1.2+ for all connections to the platform. | 7 |
|  | Encryption of Data in Transit to Egress Endpoints | Not Responsible | Responsible | Not Responsible | If an app egresses data to an external service, the developer is responsible for ensuring that connection is secure (e.g., uses TLS). | 3 |
|  | Data Classification and Handling within App | Not Responsible | Responsible | Shared | The developer is responsible for handling data according to its sensitivity. The customer is responsible for the data they input into the app. | 11 |
| **Compliance & Governance** | Platform-Level Compliance (SOC 2, ISO 27001\) | Responsible | Not Responsible | Not Responsible | RuneFrameOS is responsible for achieving and maintaining compliance certifications for the platform itself. | 37 |
|  | App-Level Compliance (e.g., HIPAA, PCI) | Not Responsible | Responsible | Shared | The developer is responsible for ensuring their app meets any industry-specific compliance requirements. The customer is responsible for selecting apps that meet their compliance needs. | 6 |
|  | Responding to Data Subject Requests (GDPR) | Shared | Responsible | Not Responsible | RuneFrameOS provides APIs to help find user data. The developer is responsible for using these APIs to service requests for their app. | 37 |

## **Section 7: Consolidated Control Reference and Resource Library**

This section provides a practical, consolidated reference of the key frameworks, standards, and source materials discussed throughout this report. It is designed to serve as a lasting resource for the RuneFrameOS governance, risk, compliance, and engineering teams.

### **7.1 Master Control Lists**

#### **7.1.1 NIST SP 800-218 (SSDF) v1.1 Practices**

A complete list of the high-level practices within the Secure Software Development Framework.

* **Prepare the Organization (PO)**  
  * PO.1: Define Security Requirements for Software Development  
  * PO.2: Implement Roles and Responsibilities for Software Development  
  * PO.3: Implement a Supportive Toolchain for Software Development  
  * PO.4: Define and Use Criteria for Software Security Checks  
  * PO.5: Implement and Maintain Secure Environments for Software Development  
* **Protect the Software (PS)**  
  * PS.1: Protect All Forms of Code from Unauthorized Access and Tampering  
  * PS.2: Provide a Mechanism for Verifying Software Release Integrity  
  * PS.3: Archive and Protect Each Software Release  
* **Produce Well-Secured Software (PW)**  
  * PW.1: Design Software to Meet Security Requirements and Mitigate Risks  
  * PW.2: Review the Software Design to Ensure It Meets Security Requirements and Mitigate Risks  
  * PW.3: Reuse Existing, Well-Secured Software When Feasible Instead of Duplicating Functionality  
  * ...[source](https://www.iriusrisk.com/resources-blog/nist-ssdf-and-iriusrisk-threat-modeling) Settings by Default  
  * PW.9: Use Standardized and Well-Vetted Security Features  
  * PW.10: Collect and Analyze Security-Related Data  
* **Respond to Vulnerabilities (RV)**  
  * RV.1: Identify and Confirm Vulnerabilities on an Ongoing Basis  
  * RV.2: Assess, Prioritize, and Remediate Vulnerabilities  
  * RV.3: Analyze Vulnerabilities to Identify Their Root Causes

#### **7.1.2 NIST Cybersecurity Framework (CSF) 2.0 Functions and Categories**

A complete list of the Functions and Categories within the NIST CSF 2.0 Core.

* **GOVERN (GV)**: GV.PO, GV.RP, GV.RO, GV.SC  
* **IDENTIFY (ID)**: ID.AM, ID.BE, ID.RA, ID.RM, ID.SC  
* **PROTECT (PR)**: PR.AA, PR.AC, PR.AT, PR.DS, PR.IR, PR.PS, PR.VM  
* **DETECT (DE)**: DE.AE, DE.CM, DE.DP  
* **RESPOND (RS)**: RS.AN, RS.CO, RS.ER, RS.IM, RS.MI  
* **RECOVER (RC)**: RC.CO, RC.IM, RC.RP

#### **7.1.3 CISA Secure by Design Pledge Goals**

A list of the seven core goals from the CISA Secure by Design Pledge.

1. Take ownership of customer security outcomes by prioritizing **Multi-Factor Authentication (MFA)**.  
2. Take ownership of customer security outcomes by eliminating **Default Passwords**.  
3. Take ownership of customer security outcomes by **Reducing Entire Classes of Vulnerability**.  
4. Take ownership of customer security outcomes by **Increasing Installation of Patches**.  
5. Embrace radical transparency and accountability by publishing a **Vulnerability Disclosure Policy (VDP)**.  
6. Embrace radical transparency and accountability by demonstrating **CVE/CWE Transparency**.  
7. Lead from the top by providing customers with **Evidence of Intrusions** (via logging) at no additional charge.

#### **7.1.4 SOC 2 Common Criteria (2017)**

A list of the nine Common Criteria (CC) categories from the AICPA Trust Services Criteria.

* **CC1 Series:** Control Environment  
* **CC2 Series:** Communication and Information  
* **CC3 Series:** Risk Assessment  
* **CC4 Series:** Monitoring Activities  
* **CC5 Series:** Control Activities  
* **CC6 Series:** Logical and Physical Access Controls  
* **CC7 Series:** System Operations  
* **CC8 Series:** Change Management  
* **CC9 Series:** Risk Mitigation

### **7.2 Primary Source PDF and Web Link Library**

This library provides direct, persistent links to the official versions of the standards, frameworks, and key reference documents cited in this report.

* **NIST Cybersecurity Framework (CSF) 2.0:**  
  * PDF: https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf 24  
  * Web Resource Center: https://www.nist.gov/cyberframework 38  
* **NIST SP 800-218, Secure Software Development Framework (SSDF) v1.1:**  
  * PDF: https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-218.pdf 21  
  * Web Resource Page: https://csrc.nist.gov/pubs/sp/800/218/final 19  
* **CISA Secure by Design Principles:**  
  * PDF: https://www.cisa.gov/sites/default/files/2023-10/SecureByDesign\_1025\_508c.pdf 14  
  * Web Resource Page: https://www.cisa.gov/resources-tools/resources/secure-by-design 13  
* **CISA Secure by Design Pledge:**  
  * PDF: https://www.cisa.gov/sites/default/files/2024-05/CISA%20Secure%20by%20Design%20Pledge\_508c.pdf 18  
* **AICPA Trust Services Criteria (2017, for SOC 2):**  
  * PDF (Requires AICPA Login): https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022 39  
  * Web Resource Page: https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2 30  
* **Atlassian Forge and Cloud Security Documentation:**  
  * Forge Security Overview: https://developer.atlassian.com/platform/forge/security/ 6  
  * Security Requirements for Cloud Apps: https://go.atlassian.com/security-requirements-for-cloud-apps 7  
  * Forge Privacy and Security FAQ: https://developer.atlassian.com/platform/forge/faq-privacy-security/ 37  
  * Atlassian Shared Responsibility Model Whitepaper: https://wac-cdn.atlassian.com/dam/jcr:810e52d6-c4cf-49e2-b5ad-182bce372fec/Shared-Responsibility-Whitepaper-052622.pdf?cdnVersion=2599 12

#### **Works cited**

1. Why Use Atlassian Forge? Benefits, Pricing & Use Cases \- Titanapps, accessed August 7, 2025, [https://titanapps.io/blog/atlassian-forge/](https://titanapps.io/blog/atlassian-forge/)  
2. Introducing Atlassian Forge \- For a Better App Development Experience | \- DevSamurai, accessed August 7, 2025, [https://www.devsamurai.com/en/introducing-atlassian-forge-for-a-better-app-development-experience/](https://www.devsamurai.com/en/introducing-atlassian-forge-for-a-better-app-development-experience/)  
3. The basics of creating a Forge AI app \- Work Life by Atlassian, accessed August 7, 2025, [https://www.atlassian.com/blog/developer/forge-ai-basics](https://www.atlassian.com/blog/developer/forge-ai-basics)  
4. Developing a Jira App: Getting Started with Atlassian Forge \- Moser Consulting, accessed August 7, 2025, [https://www.moserit.com/blog/getting-started-with-atlassian-forge](https://www.moserit.com/blog/getting-started-with-atlassian-forge)  
5. Manifest – Forge apps \- developer Atlassian., accessed August 7, 2025, [https://developer.atlassian.com/platform/forge/manifest-reference/](https://developer.atlassian.com/platform/forge/manifest-reference/)  
6. Security for Forge apps on the Atlassian Marketplace, accessed August 7, 2025, [https://developer.atlassian.com/platform/forge/security/](https://developer.atlassian.com/platform/forge/security/)  
7. Security requirements for cloud apps \- Atlassian, accessed August 7, 2025, [https://go.atlassian.com/security-requirements-for-cloud-apps](https://go.atlassian.com/security-requirements-for-cloud-apps)  
8. Distribute your apps \- developer Atlassian., accessed August 7, 2025, [https://developer.atlassian.com/platform/forge/distribute-your-apps/](https://developer.atlassian.com/platform/forge/distribute-your-apps/)  
9. Guidance Needed on Submitting New App to Atlassian Marketplace can I submit, accessed August 7, 2025, [https://community.developer.atlassian.com/t/guidance-needed-on-submitting-new-app-to-atlassian-marketplace-can-i-submit/92347](https://community.developer.atlassian.com/t/guidance-needed-on-submitting-new-app-to-atlassian-marketplace-can-i-submit/92347)  
10. Listing your Forge successor app on Marketplace \- developer Atlassian., accessed August 7, 2025, [https://developer.atlassian.com/platform/adopting-forge-from-connect/listing-your-app-on-marketplace/](https://developer.atlassian.com/platform/adopting-forge-from-connect/listing-your-app-on-marketplace/)  
11. Atlassian Cloud Security Shared Responsibility \- Elegance Group, accessed August 7, 2025, [https://elegancegroup.io/uploads/Whitepapers/Atlassian-Cloud-Security-Shared-Responsibility.pdf](https://elegancegroup.io/uploads/Whitepapers/Atlassian-Cloud-Security-Shared-Responsibility.pdf)  
12. Atlassian Cloud security shared responsibilities, accessed August 7, 2025, [https://wac-cdn.atlassian.com/dam/jcr:810e52d6-c4cf-49e2-b5ad-182bce372fec/Shared-Responsibility-Whitepaper-052622.pdf?cdnVersion=2599](https://wac-cdn.atlassian.com/dam/jcr:810e52d6-c4cf-49e2-b5ad-182bce372fec/Shared-Responsibility-Whitepaper-052622.pdf?cdnVersion=2599)  
13. Secure-by-Design \- CISA, accessed August 7, 2025, [https://www.cisa.gov/resources-tools/resources/secure-by-design](https://www.cisa.gov/resources-tools/resources/secure-by-design)  
14. Secure By Design \- CISA, accessed August 7, 2025, [https://www.cisa.gov/sites/default/files/2023-10/SecureByDesign\_1025\_508c.pdf](https://www.cisa.gov/sites/default/files/2023-10/SecureByDesign_1025_508c.pdf)  
15. Secure by Demand Guide: How Software Customers Can Drive a Secure Technology Ecosystem \- CISA, accessed August 7, 2025, [https://www.cisa.gov/sites/default/files/2024-08/SecureByDemandGuide\_080624\_508c.pdf](https://www.cisa.gov/sites/default/files/2024-08/SecureByDemandGuide_080624_508c.pdf)  
16. Secure by Design Alert: Eliminating Cross-Site Scripting Vulnerabilities, accessed August 7, 2025, [https://www.ic3.gov/CSA/2024/240917.pdf](https://www.ic3.gov/CSA/2024/240917.pdf)  
17. CISA Secure by Design Pledge \- Object First, accessed August 7, 2025, [https://objectfirst.com/pdf/CISA\_Secure\_by\_Design\_Pledge.pdf](https://objectfirst.com/pdf/CISA_Secure_by_Design_Pledge.pdf)  
18. Secure By Design Pledge \- CISA, accessed August 7, 2025, [https://www.cisa.gov/sites/default/files/2024-05/CISA%20Secure%20by%20Design%20Pledge\_508c.pdf](https://www.cisa.gov/sites/default/files/2024-05/CISA%20Secure%20by%20Design%20Pledge_508c.pdf)  
19. SP 800-218, Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities \- NIST Computer Security Resource Center \- National Institute of Standards and Technology, accessed August 7, 2025, [https://csrc.nist.gov/pubs/sp/800/218/final](https://csrc.nist.gov/pubs/sp/800/218/final)  
20. SP 800-218, Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities \- NIST Computer Security Resource Center \- National Institute of Standards and Technology, accessed August 7, 2025, [https://csrc.nist.gov/pubs/sp/800/218/ipd](https://csrc.nist.gov/pubs/sp/800/218/ipd)  
21. Secure Software Development Framework (SSDF) Version 1.1 ..., accessed August 7, 2025, [https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-218.pdf](https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-218.pdf)  
22. NIST SP 800-218, Secure Software Development Framework V1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities | CISA, accessed August 7, 2025, [https://www.cisa.gov/resources-tools/resources/nist-sp-800-218-secure-software-development-framework-v11-recommendations-mitigating-risk-software](https://www.cisa.gov/resources-tools/resources/nist-sp-800-218-secure-software-development-framework-v11-recommendations-mitigating-risk-software)  
23. in SP 800-218, Secure Software Development Framework (SSDF) Version 1.1 \- Regulations.gov, accessed August 7, 2025, [https://downloads.regulations.gov/NIST-2024-0001-0006/attachment\_1.pdf](https://downloads.regulations.gov/NIST-2024-0001-0006/attachment_1.pdf)  
24. The NIST Cybersecurity Framework (CSF) 2.0 \- NIST Technical ..., accessed August 7, 2025, [https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf)  
25. NIST Cybersecurity Framework 2.0: Resource & Overview Guide, accessed August 7, 2025, [https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1299.pdf](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1299.pdf)  
26. Getting Started with the NIST Cybersecurity Framework: A Quick Start Guide, accessed August 7, 2025, [https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1271.pdf](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1271.pdf)  
27. NIST Cybersecurity Framework, accessed August 7, 2025, [https://www.ftc.gov/system/files/attachments/understanding-nist-cybersecurity-framework/cybersecurity\_sb\_nist-cyber-framework.pdf](https://www.ftc.gov/system/files/attachments/understanding-nist-cybersecurity-framework/cybersecurity_sb_nist-cyber-framework.pdf)  
28. SOC 2 Common Criteria \- Secureframe, accessed August 7, 2025, [https://secureframe.com/hub/soc-2/common-criteria](https://secureframe.com/hub/soc-2/common-criteria)  
29. Soc 2 Compliance Checklist With Free PDF Download \- Security Compass, accessed August 7, 2025, [https://www.securitycompass.com/blog/understanding-soc-2-compliance/](https://www.securitycompass.com/blog/understanding-soc-2-compliance/)  
30. SOC 2® \- SOC for Service Organizations: Trust Services Criteria | AICPA & CIMA, accessed August 7, 2025, [https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)  
31. SOC 2 Compliance: 2025 Complete Guide \- StrongDM, accessed August 7, 2025, [https://www.strongdm.com/soc2/compliance](https://www.strongdm.com/soc2/compliance)  
32. SOC 2 complete guide: Steps, checklist & best practices \- TrustCloud, accessed August 7, 2025, [https://www.trustcloud.ai/soc-2/how-to-pass-the-soc2-audit/](https://www.trustcloud.ai/soc-2/how-to-pass-the-soc2-audit/)  
33. 2025 Trust Services Criteria for SOC 2 | Secureframe, accessed August 7, 2025, [https://secureframe.com/hub/soc-2/trust-services-criteria](https://secureframe.com/hub/soc-2/trust-services-criteria)  
34. The 5 SOC 2 Trust Services Criteria Explained | CSA \- Cloud Security Alliance, accessed August 7, 2025, [https://cloudsecurityalliance.org/blog/2023/10/05/the-5-soc-2-trust-services-criteria-explained](https://cloudsecurityalliance.org/blog/2023/10/05/the-5-soc-2-trust-services-criteria-explained)  
35. SOC 2 Trust Services Criteria \- Vanta, accessed August 7, 2025, [https://www.vanta.com/collection/soc-2/soc-2-trust-service-criteria](https://www.vanta.com/collection/soc-2/soc-2-trust-service-criteria)  
36. Guide to the SOC 2 Confidentiality Trust Services Criteria | \- Fractional CISO, accessed August 7, 2025, [https://fractionalciso.com/guide-to-the-soc-2-confidentiality-trust-services-criteria/](https://fractionalciso.com/guide-to-the-soc-2-confidentiality-trust-services-criteria/)  
37. Forge privacy and security FAQ \- developer Atlassian., accessed August 7, 2025, [https://developer.atlassian.com/platform/forge/faq-privacy-security/](https://developer.atlassian.com/platform/forge/faq-privacy-security/)  
38. Cybersecurity Framework | NIST, accessed August 7, 2025, [https://www.nist.gov/cyberframework](https://www.nist.gov/cyberframework)  
39. 2017 Trust Services Criteria (With Revised Points of Focus – 2022 ..., accessed August 7, 2025, [https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022](https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022)