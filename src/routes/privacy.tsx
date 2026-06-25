import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '../components/layouts/LegalLayout'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  const sections = [
    { id: "information-collection", title: "Information Collection" },
    { id: "use-of-data", title: "Use of Data" },
    { id: "data-security", title: "Data Security" },
    { id: "hipaa-compliance", title: "HIPAA & Patient Data" },
    { id: "your-rights", title: "Your Rights" },
    { id: "contact", title: "Contact Us" },
  ]

  return (
    <LegalLayout 
      title="Privacy Policy" 
      lastUpdated="October 15, 2026"
      sections={sections}
    >
      <div className="space-y-12">
        <section id="information-collection">
          <h2>1. Information Collection</h2>
          <p>
            At Solara, we understand that trust is the foundation of every successful dental practice. This Privacy Policy outlines the types of information we collect, how we handle patient data, and our strict adherence to healthcare privacy standards.
          </p>
          <p>
            We may collect the following types of data:
          </p>
          <ul>
            <li><strong>Clinic Information:</strong> Practice names, billing details, and staff credentials.</li>
            <li><strong>Patient Information:</strong> Demographics, appointment histories, and insurance verification data required to run AI automations.</li>
            <li><strong>Usage Data:</strong> System logs, API requests, and interaction metrics to improve the AI's accuracy and performance.</li>
          </ul>
        </section>

        <section id="use-of-data">
          <h2>2. Use of Data</h2>
          <p>
            The data we collect is strictly used to provide, maintain, and improve the Solara AI Front Office OS. This includes automating insurance verifications, handling patient intake, and managing recall campaigns. We do not sell, rent, or lease any practice or patient data to third parties.
          </p>
        </section>

        <section id="data-security">
          <h2>3. Data Security</h2>
          <p>
            We employ enterprise-grade security protocols, including AES-256 encryption at rest and TLS 1.3 in transit. Access to production data is strictly monitored and gated by multi-factor authentication and role-based access controls. 
          </p>
        </section>

        <section id="hipaa-compliance">
          <h2>4. HIPAA & Patient Data</h2>
          <p>
            Solara is fully HIPAA compliant. All Protected Health Information (PHI) processed by our AI models is anonymized where appropriate and securely stored in certified, dedicated cloud environments. We execute Business Associate Agreements (BAAs) with all of our dental partners before handling any live patient data.
          </p>
        </section>

        <section id="your-rights">
          <h2>5. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your practice's data. If you wish to exercise any of these rights, or if you need to report a data privacy concern, please submit a formal request via your Solara dashboard or contact our privacy officer.
          </p>
        </section>

        <section id="contact">
          <h2>6. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, please email us at <strong>privacy@supermia.ai</strong> or write to our compliance team at the address listed in your partnership agreement.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
