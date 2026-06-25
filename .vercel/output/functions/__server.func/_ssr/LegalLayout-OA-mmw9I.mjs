import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { N as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as Footer } from "./Footer-CGFPiWwz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LegalLayout-OA-mmw9I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LegalLayout({ title, lastUpdated, children, sections = [] }) {
	(0, import_react.useEffect)(() => {
		window.scrollTo(0, 0);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF0DC] selection:bg-[#FF6A55]/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 z-0 pointer-events-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#FFB23E]/20 to-[#FF6A55]/5 blur-[120px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-bl from-[#16C4B3]/10 to-transparent blur-[120px]" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid lg:grid-cols-12 gap-12 lg:gap-24 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-3 hidden lg:block sticky top-32",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pr-8 border-r border-slate-200/60 pb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold uppercase tracking-widest text-[#FF6A55] mb-6",
									children: "Contents"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
									className: "space-y-4",
									children: sections.map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `#${sec.id}`,
										className: "block text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors",
										children: sec.title
									}, sec.id))
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-9 max-w-[900px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								className: "mb-16",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 text-sm font-medium text-[#FF6A55] mb-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Legal" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-500",
												children: title
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-6",
										children: title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-lg text-slate-500 font-medium",
										children: ["Last Updated: ", lastUpdated]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "prose prose-slate prose-lg lg:prose-xl prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:text-slate-900 prose-h2:mt-16 prose-h2:mb-6 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-[#FF6A55] hover:prose-a:text-[#E55A45] prose-li:text-slate-600 prose-strong:text-slate-900 max-w-none",
								children
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { LegalLayout as t };
