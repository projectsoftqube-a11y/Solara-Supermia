import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, type LegalSection } from "../components/layouts/LegalLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Solara AI Front Office OS" },
      {
        name: "description",
        content:
          "How Solara collects, uses, and protects practice and patient data across our AI front office platform for dental practices.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

const sections: LegalSection[] = [
  {
    id: "information-collection",
    title: "Information Collection",
    content: (
      <>
        <p>
          At Solara, we understand that trust is the foundation of every successful dental practice.
          This Privacy Policy outlines the types of information we collect, how we handle patient
          data, and our strict adherence to healthcare privacy standards.
        </p>
        <p>We may collect the following types of data:</p>
        <ul>
          <li>
            <strong>Clinic Information:</strong> Practice names, billing details, and staff
            credentials.
          </li>
          <li>
            <strong>Patient Information:</strong> Demographics, appointment histories, and insurance
            verification data required to run AI automations.
          </li>
          <li>
            <strong>Usage Data:</strong> System logs, API requests, and interaction metrics used to
            improve the AI's accuracy and performance.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "use-of-data",
    title: "Use of Data",
    content: (
      <p>
        The data we collect is used strictly to provide, maintain, and improve the Solara AI Front
        Office OS. This includes automating insurance verifications, handling patient intake, and
        managing recall campaigns. We do not sell, rent, or lease any practice or patient data to
        third parties.
      </p>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <p>
        We employ enterprise-grade security protocols, including AES-256 encryption at rest and TLS
        1.3 in transit. Access to production data is strictly monitored and gated by multi-factor
        authentication and role-based access controls.
      </p>
    ),
  },
  {
    id: "hipaa-and-patient-data",
    title: "HIPAA & Patient Data",
    content: (
      <p>
        Solara is fully HIPAA compliant. All Protected Health Information (PHI) processed by our AI
        models is anonymized where appropriate and securely stored in certified, dedicated cloud
        environments. We execute Business Associate Agreements (BAAs) with all of our dental
        partners before handling any live patient data.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <p>
        You have the right to request access to, correction of, or deletion of your practice's data.
        If you wish to exercise any of these rights, or if you need to report a data privacy
        concern, please submit a formal request via your Solara dashboard or contact our privacy
        officer.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <p>
        If you have questions regarding this Privacy Policy, please email us at{" "}
        <a href="mailto:privacy@supermia.ai">privacy@supermia.ai</a> or write to our compliance team
        at the address listed in your partnership agreement.
      </p>
    ),
  },
];

function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="How we collect, use, and safeguard the information your practice and your patients trust us with."
      lastUpdated="October 15, 2026"
      sections={sections}
      contactEmail="privacy@supermia.ai"
    />
  );
}
