import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '../components/layouts/LegalLayout'

export const Route = createFileRoute('/terms')({
  component: TermsOfService,
})

function TermsOfService() {
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "services", title: "Description of Services" },
    { id: "responsibilities", title: "Practice Responsibilities" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "termination", title: "Termination" },
  ]

  return (
    <LegalLayout 
      title="Terms of Service" 
      lastUpdated="October 10, 2026"
      sections={sections}
    >
      <div className="space-y-12">
        <section id="acceptance">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Solara AI Front Office OS platform ("Platform"), you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a dental practice, corporation, or other legal entity, you represent that you have the authority to bind such entity to these terms.
          </p>
        </section>

        <section id="services">
          <h2>2. Description of Services</h2>
          <p>
            Solara provides an AI-powered operating system for dental front offices. The Services include, but are not limited to, automated insurance verification, AI-driven phone reception, patient intake processing, schedule optimization, and recall campaign management.
          </p>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of the Services at any time with or without notice, though we will make reasonable efforts to communicate significant changes in advance.
          </p>
        </section>

        <section id="responsibilities">
          <h2>3. Practice Responsibilities</h2>
          <p>
            As a user of the Platform, your practice agrees to:
          </p>
          <ul>
            <li>Maintain accurate and up-to-date account information.</li>
            <li>Ensure that your use of the AI communication tools complies with local regulations, including the TCPA (Telephone Consumer Protection Act) and equivalent telemarketing laws.</li>
            <li>Promptly notify us of any suspected security breaches or unauthorized access to your account.</li>
          </ul>
        </section>

        <section id="intellectual-property">
          <h2>4. Intellectual Property</h2>
          <p>
            All intellectual property rights in the Platform, including but not AI models, source code, UI designs, and proprietary algorithms, are owned exclusively by Solara. You are granted a limited, non-exclusive, non-transferable license to use the Platform during your subscription term.
          </p>
        </section>

        <section id="liability">
          <h2>5. Limitation of Liability</h2>
          <p>
            While our AI achieves high accuracy, Solara is not a replacement for clinical judgment or licensed dental professionals. Solara shall not be held liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Platform, including missed appointments or denied insurance claims.
          </p>
        </section>

        <section id="termination">
          <h2>6. Termination</h2>
          <p>
            Either party may terminate this agreement at any time with 30 days written notice. Upon termination, all rights to use the Platform cease immediately, and we will securely delete or return your practice data in accordance with our HIPAA policies.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
