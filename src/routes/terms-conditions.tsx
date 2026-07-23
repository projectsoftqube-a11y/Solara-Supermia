import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, type LegalSection } from "../components/layouts/LegalLayout";

export const Route = createFileRoute("/terms-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Solara AI Front Office OS" },
      {
        name: "description",
        content:
          "The terms governing your practice's use of the Solara AI Front Office OS platform, including services, responsibilities, and liability.",
      },
    ],
  }),
  component: TermsConditions,
});

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing or using the Solara AI Front Office OS platform ("Platform"), you agree to be
        bound by these Terms & Conditions. If you are entering into this agreement on behalf of a
        dental practice, corporation, or other legal entity, you represent that you have the
        authority to bind such entity to these terms.
      </p>
    ),
  },
  {
    id: "services",
    title: "Description of Services",
    content: (
      <>
        <p>
          Solara provides an AI-powered operating system for dental front offices. The Services
          include, but are not limited to, automated insurance verification, AI-driven phone
          reception, patient intake processing, schedule optimization, and recall campaign
          management.
        </p>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of the Services at any
          time with or without notice, though we will make reasonable efforts to communicate
          significant changes in advance.
        </p>
      </>
    ),
  },
  {
    id: "responsibilities",
    title: "Practice Responsibilities",
    content: (
      <>
        <p>As a user of the Platform, your practice agrees to:</p>
        <ul>
          <li>Maintain accurate and up-to-date account information.</li>
          <li>
            Ensure that your use of the AI communication tools complies with local regulations,
            including the TCPA (Telephone Consumer Protection Act) and equivalent telemarketing
            laws.
          </li>
          <li>
            Promptly notify us of any suspected security breaches or unauthorized access to your
            account.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <p>
        All intellectual property rights in the Platform, including but not limited to AI models,
        source code, UI designs, and proprietary algorithms, are owned exclusively by Solara. You are
        granted a limited, non-exclusive, non-transferable license to use the Platform during your
        subscription term.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <p>
        While our AI achieves high accuracy, Solara is not a replacement for clinical judgment or
        licensed dental professionals. Solara shall not be held liable for any indirect, incidental,
        special, consequential, or punitive damages resulting from your use of the Platform,
        including missed appointments or denied insurance claims.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <p>
        Either party may terminate this agreement at any time with 30 days' written notice. Upon
        termination, all rights to use the Platform cease immediately, and we will securely delete or
        return your practice data in accordance with our HIPAA policies.
      </p>
    ),
  },
];

function TermsConditions() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      intro="The agreement that governs your practice's access to and use of the Solara platform."
      lastUpdated="October 10, 2026"
      sections={sections}
      contactEmail="legal@supermia.ai"
    />
  );
}
