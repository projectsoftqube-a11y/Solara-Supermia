import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { G as Sparkles, S as Mail, W as Activity, c as Shield, h as Phone, z as ArrowUpRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-CGFPiWwz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		label: "Features",
		href: "#platform"
	},
	{
		label: "How It Works",
		href: "#automation"
	},
	{
		label: "Pricing",
		href: "#pricing"
	},
	{
		label: "FAQ",
		href: "#faq"
	}
];
function SiteHeader() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
		initial: {
			y: -24,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			duration: .6,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		className: "fixed left-1/2 top-4 z-50 -translate-x-1/2 px-4 md:top-6",
		style: { width: "min(1100px, calc(100% - 24px))" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between rounded-full border border-[color:var(--border)] px-4 transition-all duration-300 md:px-6",
			style: {
				height: scrolled ? 60 : 68,
				background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.78)",
				backdropFilter: "blur(14px)",
				boxShadow: scrolled ? "0 8px 28px rgba(15,23,42,.08)" : "0 4px 16px rgba(15,23,42,.04)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "flex items-center gap-2.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/logo.svg",
						alt: "Solara Logo",
						className: "h-8 w-auto object-contain"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: item.href,
						className: "group relative rounded-full px-4 py-2 text-[14px] font-medium text-[color:var(--secondary-foreground)] transition-colors hover:text-[color:var(--foreground)]",
						children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-[color:var(--primary)] transition-transform duration-200 group-hover:scale-x-100" })]
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://app.solara.supermia.ai/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hidden rounded-full border border-slate-200/80 bg-white/50 px-5 py-2.5 text-[14px] font-medium text-slate-700 backdrop-blur-sm transition-all hover:bg-slate-50 hover:text-slate-900 sm:inline-flex",
							children: "Log in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#demo",
							className: "hidden rounded-full bg-[color:var(--foreground)] px-5 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[color:var(--surface-dark-2)] sm:inline-flex",
							children: "Book a Demo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Menu",
							onClick: () => setOpen((o) => !o),
							className: "grid h-9 w-9 place-items-center rounded-full border border-[color:var(--border)] md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-4 bg-[color:var(--foreground)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-4 bg-[color:var(--foreground)]" })]
							})
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: -8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "mt-2 rounded-3xl border border-[color:var(--border)] bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,.08)] md:hidden",
			children: [
				NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: item.href,
					onClick: () => setOpen(false),
					className: "block rounded-2xl px-4 py-3 text-[15px] font-medium text-[color:var(--foreground)] hover:bg-[color:var(--muted)]",
					children: item.label
				}, item.href)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://app.solara.supermia.ai/",
					target: "_blank",
					rel: "noopener noreferrer",
					onClick: () => setOpen(false),
					className: "mt-2 block rounded-2xl px-4 py-3 text-center text-[15px] font-medium text-[color:var(--secondary-foreground)] hover:bg-[color:var(--muted)]",
					children: "Log in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#demo",
					onClick: () => setOpen(false),
					className: "mt-1 block rounded-2xl bg-[color:var(--foreground)] px-4 py-3 text-center text-[15px] font-medium text-white",
					children: "Book a Demo"
				})
			]
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative bg-[#02060A] text-[#FFF9F2] overflow-hidden pt-24 pb-8 sm:pt-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF6A55]/20 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF6A55]/5 blur-[120px] pointer-events-none rounded-t-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[100px] pointer-events-none rounded-br-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-12 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/",
									className: "relative mb-8 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55] rounded-sm ring-offset-4 ring-offset-[#02060A]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/images/logo-white.svg",
										alt: "Solara Dental AI",
										className: "relative z-10 h-10 sm:h-12 w-auto hover:opacity-90 transition-opacity"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base sm:text-lg text-slate-400 leading-relaxed max-w-sm font-light",
									children: "The complete AI front office, built specifically for dental clinics. Insurance, intake, booking, recall, and paperwork—handled automatically."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col lg:pl-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-bold uppercase tracking-[0.2em] text-[#FFB23E] mb-6 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), " Product"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-4 text-slate-400",
									children: [[
										{
											label: "Pricing",
											href: "#pricing"
										},
										{
											label: "Everything it does",
											href: "#platform"
										},
										{
											label: "FAQ",
											href: "#faq"
										}
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: item.href,
										className: "group inline-flex items-center gap-2 text-sm sm:text-base hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55] rounded-md ring-offset-2 ring-offset-[#02060A]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "group-hover:translate-x-1 transition-transform",
											children: item.label
										})
									}) }, item.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://app.solara.supermia.ai/",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "group inline-flex items-center gap-2 text-sm sm:text-base hover:text-[#FF6A55] transition-colors mt-2 font-medium",
										children: [
											"Log in",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" })
										]
									}) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-bold uppercase tracking-[0.2em] text-[#FFB23E] mb-6 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3.5 h-3.5" }), " Get in touch"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-5 text-slate-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "mailto:hello@supermia.ai",
										className: "group inline-flex items-start gap-3 text-sm sm:text-base hover:text-white transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 p-1.5 rounded-md bg-white/5 group-hover:bg-[#FF6A55]/20 group-hover:text-[#FF6A55] transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-4 h-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-white mb-0.5",
											children: "Email Support"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-slate-500 text-sm",
											children: "hello@supermia.ai"
										})] })]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "tel:+15127333085",
										className: "group inline-flex items-start gap-3 text-sm sm:text-base hover:text-white transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 p-1.5 rounded-md bg-white/5 group-hover:bg-[#FF6A55]/20 group-hover:text-[#FF6A55] transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-white mb-0.5",
											children: "Call Us"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-slate-500 text-sm",
											children: "+1 (512) 733-3085"
										})] })]
									}) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-bold uppercase tracking-[0.2em] text-[#FFB23E] mb-6 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-3.5 h-3.5" }), " Legal"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-4 text-slate-400",
									children: [
										{
											label: "Privacy Policy",
											href: "/privacy"
										},
										{
											label: "Terms of Service",
											href: "/terms"
										},
										{
											label: "HIPAA Compliance",
											href: "/hipaa"
										}
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: item.href,
										className: "group inline-flex items-center gap-2 text-sm sm:text-base hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55] rounded-md ring-offset-2 ring-offset-[#02060A]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "group-hover:translate-x-1 transition-transform",
											children: item.label
										})
									}) }, item.label))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative w-full select-none flex justify-center pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[13vw] sm:text-[15vw] leading-normal p-[4vw] -my-[4vw] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white/15 to-white/5 tracking-widest text-center",
							children: "SOLARA"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-8 border-t border-white/10 flex flex-col md:flex-row gap-6 md:items-center justify-between text-slate-500 text-xs sm:text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-2 sm:gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"© ",
									(/* @__PURE__ */ new Date()).getFullYear(),
									" Solara Dental AI"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hidden sm:block text-white/20",
									children: "|"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"by",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://supermia.ai/",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "text-slate-300 font-bold hover:text-[#FF6A55] transition-colors",
										children: "SuperMIA"
									}),
									" ",
									"· Botfinity Inc."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hidden sm:block text-white/20",
									children: "|"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All rights reserved." })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5",
							children: [
								"Made with",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/images/secondary-logo.svg",
									alt: "Solara",
									className: "h-4 w-auto drop-shadow-sm"
								}),
								" ",
								"for dental teams."
							]
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { SiteHeader as n, Footer as t };
