import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '../components/layouts/LegalLayout'

export const Route = createFileRoute('/hipaa')({
  component: HIPAACompliance,
})

function HIPAACompliance() {
  const sections = [
    { id: "overview", title: "Compliance Overview" },
    { id: "baa", title: "Business Associate Agreements" },
    { id: "phi-handling", title: "Handling of PHI" },
    { id: "security-measures", title: "Security Measures" },
    { id: "auditing", title: "Auditing & Logging" },
  ]

  return (
    <LegalLayout 
      title="HIPAA Compliance" 
      lastUpdated="October 12, 2026"
      sections={sections}
    >
      <div className="space-y-12">
        <section id="overview">
          <h2>1. Compliance Overview</h2>
          <p>
            Protecting Protected Health Information (PHI) is a fundamental part of the Solara platform. We have built our architecture from the ground up to comply with the Health Insurance Portability and Accountability Act (HIPAA) and the Health Information Technology for Economic and Clinical Health (HITECH) Act.
          </p>
        </section>

        <section id="baa">
          <h2>2. Business Associate Agreements (BAA)</h2>
          <p>
            As a technology provider handling PHI on behalf of covered entities (dental practices), Solara acts as a Business Associate. We require all dental practices utilizing our platform to sign our standard Business Associate Agreement (BAA) prior to onboarding. This BAA contractually guarantees our adherence to HIPAA Security and Privacy Rules.
          </p>
        </section>

        <section id="phi-handling">
          <h2>3. Handling of PHI</h2>
          <p>
            When our AI Voice Bot speaks with patients, or when our Automated Intake system processes forms, we strictly control how PHI is accessed:
          </p>
          <ul>
            <li><strong>Minimal Necessary:</strong> Our AI models only process the data required to complete the specific task (e.g. verifying a specific insurance policy).</li>
            <li><strong>Anonymization:</strong> Where possible, conversational data used for training aggregate AI models is scrubbed of identifying PHI.</li>
            <li><strong>Data Residency:</strong> All data is stored within certified cloud regions physically located in the United States.</li>
          </ul>
        </section>

        <section id="security-measures">
          <h2>4. Security Measures</h2>
          <p>
            Solara implements strict physical, technical, and administrative safeguards to ensure the confidentiality and integrity of electronic PHI (ePHI):
          </p>
          <ul>
            <li><strong>Encryption:</strong> All ePHI is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.</li>
            <li><strong>Access Controls:</strong> Our staff operates on a strict zero-trust model. No engineer can access production databases without explicit, temporary clearance for troubleshooting.</li>
            <li><strong>Vulnerability Scanning:</strong> We conduct continuous vulnerability scanning and annual third-party penetration testing.</li>
          </ul>
        </section>

        <section id="auditing">
          <h2>5. Auditing & Logging</h2>
          <p>
            The Solara platform maintains comprehensive, immutable audit logs of all system activity. Whenever PHI is accessed, modified, or deleted—whether by a human operator or an AI agent—the action is logged with strict timestamps and identity attribution to support compliance audits.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
