import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as LegalLayout } from "./LegalLayout-OA-mmw9I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hipaa-6c56ThLC.js
var import_jsx_runtime = require_jsx_runtime();
function HIPAACompliance() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalLayout, {
		title: "HIPAA Compliance",
		lastUpdated: "October 12, 2026",
		sections: [
			{
				id: "overview",
				title: "Compliance Overview"
			},
			{
				id: "baa",
				title: "Business Associate Agreements"
			},
			{
				id: "phi-handling",
				title: "Handling of PHI"
			},
			{
				id: "security-measures",
				title: "Security Measures"
			},
			{
				id: "auditing",
				title: "Auditing & Logging"
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "overview",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "1. Compliance Overview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Protecting Protected Health Information (PHI) is a fundamental part of the Solara platform. We have built our architecture from the ground up to comply with the Health Insurance Portability and Accountability Act (HIPAA) and the Health Information Technology for Economic and Clinical Health (HITECH) Act." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "baa",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "2. Business Associate Agreements (BAA)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "As a technology provider handling PHI on behalf of covered entities (dental practices), Solara acts as a Business Associate. We require all dental practices utilizing our platform to sign our standard Business Associate Agreement (BAA) prior to onboarding. This BAA contractually guarantees our adherence to HIPAA Security and Privacy Rules." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "phi-handling",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "3. Handling of PHI" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When our AI Voice Bot speaks with patients, or when our Automated Intake system processes forms, we strictly control how PHI is accessed:" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Minimal Necessary:" }), " Our AI models only process the data required to complete the specific task (e.g. verifying a specific insurance policy)."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Anonymization:" }), " Where possible, conversational data used for training aggregate AI models is scrubbed of identifying PHI."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Data Residency:" }), " All data is stored within certified cloud regions physically located in the United States."] })
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "security-measures",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "4. Security Measures" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Solara implements strict physical, technical, and administrative safeguards to ensure the confidentiality and integrity of electronic PHI (ePHI):" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Encryption:" }), " All ePHI is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Access Controls:" }), " Our staff operates on a strict zero-trust model. No engineer can access production databases without explicit, temporary clearance for troubleshooting."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Vulnerability Scanning:" }), " We conduct continuous vulnerability scanning and annual third-party penetration testing."] })
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "auditing",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "5. Auditing & Logging" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Solara platform maintains comprehensive, immutable audit logs of all system activity. Whenever PHI is accessed, modified, or deleted—whether by a human operator or an AI agent—the action is logged with strict timestamps and identity attribution to support compliance audits." })]
				})
			]
		})
	});
}
//#endregion
export { HIPAACompliance as component };
