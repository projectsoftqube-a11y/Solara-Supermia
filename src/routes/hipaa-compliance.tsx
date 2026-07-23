import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, type LegalSection } from "../components/layouts/LegalLayout";

export const Route = createFileRoute("/hipaa-compliance")({
  head: () => ({
    meta: [
      { title: "HIPAA Compliance — Solara AI Front Office OS" },
      {
        name: "description",
        content:
          "How Solara safeguards Protected Health Information (PHI) through HIPAA and HITECH-compliant architecture, BAAs, encryption, and audit logging.",
      },
    ],
  }),
  component: HipaaCompliance,
});

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Compliance Overview",
    content: (
      <p>
        Protecting Protected Health Information (PHI) is a fundamental part of the Solara platform.
        We have built our architecture from the ground up to comply with the Health Insurance
        Portability and Accountability Act (HIPAA) and the Health Information Technology for
        Economic and Clinical Health (HITECH) Act.
      </p>
    ),
  },
  {
    id: "baa",
    title: "Business Associate Agreements",
    content: (
      <p>
        As a technology provider handling PHI on behalf of covered entities (dental practices),
        Solara acts as a Business Associate. We require all dental practices using our platform to
        sign our standard Business Associate Agreement (BAA) prior to onboarding. This BAA
        contractually guarantees our adherence to the HIPAA Security and Privacy Rules.
      </p>
    ),
  },
  {
    id: "phi-handling",
    title: "Handling of PHI",
    content: (
      <>
        <p>
          When our AI Voice Bot speaks with patients, or when our automated intake system processes
          forms, we strictly control how PHI is accessed:
        </p>
        <ul>
          <li>
            <strong>Minimum Necessary:</strong> Our AI models only process the data required to
            complete the specific task (for example, verifying a specific insurance policy).
          </li>
          <li>
            <strong>Anonymization:</strong> Where possible, conversational data used for training
            aggregate AI models is scrubbed of identifying PHI.
          </li>
          <li>
            <strong>Data Residency:</strong> All data is stored within certified cloud regions
            physically located in the United States.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security-measures",
    title: "Security Measures",
    content: (
      <>
        <p>
          Solara implements strict physical, technical, and administrative safeguards to ensure the
          confidentiality and integrity of electronic PHI (ePHI):
        </p>
        <ul>
          <li>
            <strong>Encryption:</strong> All ePHI is encrypted in transit using TLS 1.3 and at rest
            using AES-256 encryption.
          </li>
          <li>
            <strong>Access Controls:</strong> Our staff operates on a strict zero-trust model. No
            engineer can access production databases without explicit, temporary clearance for
            troubleshooting.
          </li>
          <li>
            <strong>Vulnerability Scanning:</strong> We conduct continuous vulnerability scanning
            and annual third-party penetration testing.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "auditing",
    title: "Auditing & Logging",
    content: (
      <p>
        The Solara platform maintains comprehensive, immutable audit logs of all system activity.
        Whenever PHI is accessed, modified, or deleted — whether by a human operator or an AI agent
        — the action is logged with precise timestamps and identity attribution to support
        compliance audits.
      </p>
    ),
  },
];

function HipaaCompliance() {
  return (
    <LegalLayout
      title="HIPAA Compliance"
      eyebrow="Compliance"
      intro="How we protect Protected Health Information across every AI workflow on the Solara platform."
      lastUpdated="October 12, 2026"
      sections={sections}
      contactEmail="compliance@supermia.ai"
    />
  );
}
