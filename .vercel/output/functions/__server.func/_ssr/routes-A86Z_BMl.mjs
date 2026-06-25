import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useMotionValue, n as animate, o as AnimatePresence, r as useTransform, t as useInView } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { A as ClipboardX, B as ArrowRight, C as LayoutDashboard, D as Database, E as FileText, F as Check, G as Sparkles, H as ArrowDownRight, I as Calendar, J as CircleCheck, K as FilePenLine, L as CalendarCheck, M as ClipboardCheck, O as Crown, P as ChevronDown, R as Building2, S as Mail, T as Gift, U as AlarmClock, V as ArrowRightLeft, W as Activity, X as ChartColumn, Y as ChartLine, _ as PhoneCall, a as UserCheck, b as MessageCircle, c as Shield, d as Send, f as Search, g as PhoneMissed, h as Phone, i as UserMinus, j as ClipboardList, k as Clock, l as ShieldCheck, m as Quote, n as X, o as TrendingUp, p as SearchX, q as CircleX, r as User, s as Star, t as Zap, u as ShieldAlert, v as Minus, w as Headphones, x as MapPin, y as MessageSquare, z as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as Footer } from "./Footer-CGFPiWwz.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-A86Z_BMl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SmoothScroll() {
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const lenis = new Lenis({
			duration: 1.1,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		});
		let rafId;
		const raf = (time) => {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		};
		rafId = requestAnimationFrame(raf);
		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, []);
	return null;
}
var CAROUSEL_ITEMS = [
	{
		id: "insurance",
		label: "Insurance",
		icon: ShieldCheck,
		title: "Coverage verified before they sit down",
		desc: "Eligibility and benefits checked automatically at intake.",
		previewType: "insurance",
		previewTitle: "Delta Dental PPO - active · cleaning covered 100% · 2 left this year"
	},
	{
		id: "automation",
		label: "Automation",
		icon: Activity,
		title: "Paperwork handles itself",
		desc: "Forms sent, signed, and saved to the patient file without lifting a finger.",
		previewType: "automation",
		previewTitle: "Intake forms completed — John Doe"
	},
	{
		id: "booking",
		label: "Booking",
		icon: CalendarCheck,
		title: "Fill your empty chairs",
		desc: "Patients book themselves 24/7. Solara automatically finds the right slot.",
		previewType: "booking",
		previewTitle: "New appointment booked: Tue 10:30 AM"
	},
	{
		id: "recall",
		label: "Recall",
		icon: PhoneCall,
		title: "Bring patients back",
		desc: "Smart follow-ups ensure your hygiene schedule stays completely full.",
		previewType: "recall",
		previewTitle: "Recall message sent to 45 overdue patients"
	},
	{
		id: "overflow",
		label: "Front-desk overflow",
		icon: Database,
		title: "Never miss a call",
		desc: "When lines are busy, Solara steps in to answer questions and book appointments.",
		previewType: "overflow",
		previewTitle: "Call handled: Answered FAQ about pricing"
	},
	{
		id: "growth",
		label: "Growth",
		icon: ChartLine,
		title: "Drive more revenue",
		desc: "Identify unscheduled treatment plans and reactivate dormant patients automatically.",
		previewType: "growth",
		previewTitle: "Identified $12k in unscheduled treatments"
	}
];
function Hero() {
	const [activeIdx, setActiveIdx] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setActiveIdx((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
		}, 4e3);
		return () => clearInterval(timer);
	}, []);
	const activeItem = CAROUSEL_ITEMS[activeIdx];
	const ActiveIcon = activeItem.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative overflow-hidden pt-32 md:pt-40 lg:pt-48 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 grid-bg opacity-60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 h-[600px]",
				style: { background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.06), transparent 60%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-wide relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .6 },
							className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--primary-soft)] border border-[color:var(--border)] mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-[color:var(--primary)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-[color:var(--foreground)]",
								children: "The complete AI front office for dental practices"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .7,
								delay: .05
							},
							className: "font-display font-bold text-[color:var(--foreground)] mb-4 leading-[1.08] text-4xl sm:text-5xl",
							children: ["One platform for everything your front desk does:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: "block min-h-[1.5em] sm:min-h-[1.15em] mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
										initial: {
											opacity: 0,
											y: 10
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											y: -10
										},
										transition: { duration: .3 },
										className: "inline-flex items-center gap-3 align-middle",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--primary-hover)] shadow-md shadow-[color:var(--primary)]/30",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveIcon, { className: "w-5 h-5 sm:w-6 sm:h-6 text-white" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary-hover)] bg-clip-text text-transparent",
											children: activeItem.id === "insurance" ? "insurance, verified" : activeItem.id === "automation" ? "paperwork, automated" : activeItem.id === "booking" ? "chairs, filled" : activeItem.id === "recall" ? "patients, recalled" : activeItem.id === "overflow" ? "calls, answered" : "revenue, driven"
										})]
									}, activeItem.id)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .7,
								delay: .15
							},
							className: "text-lg sm:text-xl text-[color:var(--secondary-foreground)] mb-8 leading-relaxed max-w-xl",
							children: "From insurance verification and patient intake to booking, recalls, paperwork, SEO, and Google Ads. Solara runs your entire front office automatically, 24/7. Not just a phone line. Your whole front desk, on autopilot."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .7,
								delay: .25
							},
							className: "flex flex-col sm:flex-row gap-4 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://app.solara.supermia.ai/",
								className: "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[color:var(--primary)] text-white font-semibold text-base hover:bg-[color:var(--primary-hover)] transition-colors shadow-lg shadow-[color:var(--primary)]/25",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-5 h-5" }),
									"Get Started",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#platform",
								className: "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--border)] text-[color:var(--foreground)] font-semibold text-base hover:border-[color:var(--primary)]/40 hover:shadow-md transition-all",
								children: ["See everything it does", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-5 h-5 text-[color:var(--primary)]" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .7,
								delay: .35
							},
							className: "inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-8 rounded-2xl bg-[color:var(--card)]/70 border border-[color:var(--border)] px-3 py-2 shadow-sm backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[color:var(--success)] to-[#0E8C80] text-white text-sm font-bold shadow-sm shadow-[color:var(--success)]/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-4 h-4" }), "First 2 months free"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[color:var(--secondary-foreground)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-[color:var(--success)]" }), " No setup fee"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-[color:var(--success)]" }), " Cancel anytime"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: {
								duration: .8,
								delay: .45
							},
							className: "border-t border-[color:var(--border)] pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wide text-[color:var(--muted-foreground)] mb-3",
								children: "Runs on the stack you already have"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-[color:var(--secondary-foreground)] flex flex-wrap items-center gap-x-3 gap-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-4 h-4 text-[color:var(--primary)]" }), "Syncs with OpenDental"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[color:var(--muted-foreground)]",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-[color:var(--primary)]" }), "Insurance verified at intake"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[color:var(--muted-foreground)]",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "w-4 h-4 text-[color:var(--primary)]" }), "Paperless intake & notes"]
									})
								]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: {
							duration: .8,
							delay: .2
						},
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-12 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-7 flex flex-col justify-between bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF9F2] border border-[#FF6A55]/15 rounded-[32px] p-6 sm:p-8 shadow-[0_24px_48px_rgba(249,115,22,0.06)] h-[440px] relative overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 mb-6 relative z-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: "/images/logo.svg",
												alt: "",
												className: "h-10 w-auto object-contain",
												onError: (e) => {
													e.currentTarget.style.display = "none";
												}
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-1.5",
											children: CAROUSEL_ITEMS.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setActiveIdx(idx),
												className: `h-1.5 rounded-full transition-all duration-300 ${idx === activeIdx ? "w-6 bg-[#FF6A55]" : "w-2 bg-slate-200"}`,
												"aria-label": `Show: ${item.label}`
											}, item.id))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 relative z-10 flex flex-col justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											mode: "wait",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													y: 15
												},
												animate: {
													opacity: 1,
													y: 0
												},
												exit: {
													opacity: 0,
													y: -15
												},
												transition: { duration: .3 },
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-[48px] h-[48px] rounded-2xl bg-[#FFDFD2] flex items-center justify-center mb-5 shadow-sm shadow-[#FF6A55]/10",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveIcon, {
															className: "w-6 h-6 text-[#FF6A55]",
															strokeWidth: 1.5
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-2xl font-display font-bold text-slate-800 leading-tight mb-2",
														children: activeItem.title
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm text-slate-500 leading-relaxed mb-6",
														children: activeItem.desc
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 px-5 py-4 shadow-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1",
															children: "What your team sees"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-sm font-medium text-slate-700 leading-snug",
															children: activeItem.previewTitle
														})]
													})
												]
											}, activeItem.id)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-tl from-[#FF6A55]/10 to-transparent rounded-full blur-3xl pointer-events-none" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-5 flex flex-col gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 bg-white border border-slate-100 rounded-[32px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col justify-center relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "w-4 h-4 text-[#16C4B3]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase tracking-widest font-bold text-slate-500",
												children: "Today's Impact"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4 relative z-10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[28px] font-display font-bold text-slate-800 leading-none mb-1",
												children: "94%"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-slate-500",
												children: "Insurance verified instantly"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[28px] font-display font-bold text-slate-800 leading-none mb-1",
												children: "14"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-slate-500",
												children: "Appointments booked"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-bl from-[#16C4B3]/10 to-transparent rounded-full blur-2xl pointer-events-none" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 bg-[#0F172A] rounded-[32px] p-7 shadow-[0_20px_40px_rgba(0,0,0,0.12)] flex flex-col justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold tracking-[0.15em] text-[#38BDF8] uppercase",
											children: "Live Feed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-[#16C4B3]" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative z-10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											mode: "wait",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													x: 10
												},
												animate: {
													opacity: 1,
													x: 0
												},
												exit: {
													opacity: 0,
													x: -10
												},
												transition: { duration: .3 },
												className: "flex items-center gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-[46px] h-[46px] rounded-full bg-[#1E293B] flex items-center justify-center flex-shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveIcon, {
														className: "w-5 h-5 text-slate-300",
														strokeWidth: 1.5
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[15px] font-bold text-white truncate mb-0.5",
														children: [activeItem.label, " Processing"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[13px] text-slate-400 truncate",
														children: "Via Solara Neural Net"
													})]
												})]
											}, activeItem.id)
										})
									})]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								scale: .8
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: {
								delay: 1,
								duration: .6
							},
							className: "absolute z-20 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5 text-[#FF6A55]" })
						})]
					})]
				})
			})
		]
	});
}
var CARDS = [
	{
		title: "Checks insurance",
		desc: "Coverage and eligibility verified before the patient sits down.",
		featured: true,
		colClass: "sm:col-span-2 lg:col-span-8",
		themeClass: "bg-[#FFF9F2] border border-[#FF6A55]/10 shadow-[0_16px_32px_rgba(255,106,85,0.04)] hover:shadow-[0_24px_48px_rgba(255,106,85,0.06)] text-slate-900",
		descClass: "text-slate-600",
		layoutClass: "flex-col sm:flex-row items-center gap-6 sm:gap-10",
		textWrapperClass: "sm:w-1/2",
		imageWrapperClass: "w-full sm:w-1/2 h-48 sm:h-64 shrink-0 rounded-2xl overflow-hidden order-first sm:order-last border border-slate-200/50 shadow-sm",
		imageSrc: "/images/cap_insurance.png"
	},
	{
		title: "Sends & fills forms",
		desc: "Intake completed on the patient's phone. No clipboards, no paper.",
		featured: true,
		colClass: "sm:col-span-1 lg:col-span-4",
		themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
		descClass: "text-slate-600",
		layoutClass: "flex-col",
		textWrapperClass: "",
		imageWrapperClass: "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
		imageSrc: "/images/cap_forms.png"
	},
	{
		title: "Answers every call",
		desc: "Picks up after hours, at lunch, and during overflow.",
		featured: false,
		colClass: "sm:col-span-1 lg:col-span-4",
		themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
		descClass: "text-slate-600",
		layoutClass: "flex-col",
		textWrapperClass: "",
		imageWrapperClass: "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
		imageSrc: "/images/cap_calls.png"
	},
	{
		title: "Books visits by text",
		desc: "Patients book, reschedule, or confirm with one simple message.",
		featured: false,
		colClass: "sm:col-span-1 lg:col-span-4",
		themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
		descClass: "text-slate-600",
		layoutClass: "flex-col",
		textWrapperClass: "",
		imageWrapperClass: "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
		imageSrc: "/images/cap_booking.png"
	},
	{
		title: "Website chat helper",
		desc: "A friendly chat helper that answers questions and books visits.",
		featured: false,
		colClass: "sm:col-span-1 lg:col-span-4",
		themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
		descClass: "text-slate-600",
		layoutClass: "flex-col",
		textWrapperClass: "",
		imageWrapperClass: "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
		imageSrc: "/images/cap_chat.png"
	},
	{
		title: "Fills empty chairs",
		desc: "Reactivates overdue patients and backfills open slots automatically.",
		featured: false,
		colClass: "sm:col-span-1 lg:col-span-4",
		themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
		descClass: "text-slate-600",
		layoutClass: "flex-col",
		textWrapperClass: "",
		imageWrapperClass: "w-full h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
		imageSrc: "/images/cap_chairs.png"
	},
	{
		title: "Writes visit notes",
		desc: "Notes generated automatically after every appointment.",
		featured: true,
		colClass: "sm:col-span-2 lg:col-span-8",
		themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
		descClass: "text-slate-600",
		layoutClass: "flex-col sm:flex-row items-center gap-6 sm:gap-10",
		textWrapperClass: "sm:w-1/2 order-last sm:order-first",
		imageWrapperClass: "w-full sm:w-1/2 h-48 sm:h-64 shrink-0 rounded-2xl overflow-hidden border border-slate-100 shadow-sm",
		imageSrc: "/images/cap_notes.png"
	},
	{
		title: "Shows your numbers",
		desc: "Appointments, patients, revenue, and insurance, at a glance.",
		featured: false,
		colClass: "sm:col-span-1 lg:col-span-6",
		themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
		descClass: "text-slate-600",
		layoutClass: "flex-col sm:flex-row items-center gap-6",
		textWrapperClass: "flex-1 order-last",
		imageWrapperClass: "w-full sm:w-48 h-40 sm:h-32 shrink-0 rounded-2xl overflow-hidden order-first border border-slate-100 shadow-sm",
		imageSrc: "/images/cap_analytics.png"
	},
	{
		title: "SEO + Google Ads",
		desc: "Search optimization and Google Ads support so new patients find your clinic first.",
		featured: false,
		colClass: "sm:col-span-1 lg:col-span-6",
		themeClass: "bg-white border border-slate-200/60 shadow-sm hover:shadow-md text-slate-900",
		descClass: "text-slate-600",
		layoutClass: "flex-col sm:flex-row items-center gap-6",
		textWrapperClass: "flex-1 order-last sm:order-first",
		imageWrapperClass: "w-full sm:w-48 h-40 sm:h-32 shrink-0 rounded-2xl overflow-hidden order-first sm:order-last border border-slate-100 shadow-sm",
		imageSrc: "/images/cap_seo.png"
	}
];
function Capabilities() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "platform",
		className: "py-20 md:py-28 relative overflow-hidden bg-[#FDFBF7]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-3xl mx-auto mb-16 sm:mb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6A55]/5 border border-[#FF6A55]/20 text-[#FF6A55] text-[11px] font-bold uppercase tracking-[0.18em] mb-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), "One platform, not nine tools"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight",
						children: ["Everything your front office needs, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400",
							children: "in one place"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium",
						children: "Nine jobs Solara does for you, every day, automatically."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6",
				children: CARDS.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-50px"
					},
					transition: {
						duration: .5,
						delay: i * .05
					},
					className: `group relative rounded-3xl p-6 sm:p-8 transition-all duration-300 overflow-hidden flex hover:-translate-y-1 ${item.themeClass} ${item.colClass} ${item.layoutClass}`,
					children: [
						item.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute top-6 sm:top-8 left-6 sm:left-8 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6A55] text-white text-[10px] font-bold uppercase tracking-wider shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }), " Featured"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${item.imageWrapperClass} relative z-0 transition-transform duration-500 group-hover:scale-[1.02]`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.imageSrc,
								alt: item.title,
								className: "absolute inset-0 h-full w-full object-cover"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `${item.textWrapperClass} relative z-10 flex flex-col`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: `font-display font-bold mb-2.5 ${item.featured ? "text-2xl sm:text-3xl" : "text-xl"}`,
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-[15px] leading-relaxed font-medium ${item.descClass}`,
								children: item.desc
							})]
						})
					]
				}, item.title))
			})]
		})
	});
}
var steps = [
	"Eligibility checked automatically",
	"“What's covered?” answered in the conversation",
	"Coverage confirmed before the visit",
	"Insurance captured at intake",
	"Repeat insurance questions off your team's plate"
];
function Insurance() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "insurance",
		className: "py-20 md:py-28 bg-[#FDFBF7]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px] grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FF6A55]/5 px-3 py-1.5 text-mono text-[11px] uppercase tracking-[0.18em] text-[#FF6A55] mb-6 font-bold shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), " Insurance, handled"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight",
					children: "We take care of your insurance."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[17px] text-slate-600 leading-relaxed mb-10 max-w-2xl font-medium space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The same insurance and coverage questions your team answers fifty times a day - handled right in the conversation. Solara checks eligibility, answers “what's covered,” and captures insurance at intake." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "So coverage is confirmed before the patient sits down - fewer billing surprises, faster check-ins, and a front desk that isn't stuck on hold with carriers." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-4 mb-4",
					children: steps.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
						initial: {
							opacity: 0,
							x: -16
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: {
							delay: i * .1,
							duration: .5
						},
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex shrink-0 items-center justify-center text-[#16C4B3]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								size: 20,
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[16px] sm:text-[17px] font-medium text-slate-700",
							children: label
						})]
					}, label))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 32
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: {
					duration: .8,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "relative rounded-[32px] border border-slate-200/60 bg-white p-4 sm:p-5 shadow-[0_32px_64px_rgba(0,0,0,0.06)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-[24px] h-72 sm:h-96 mb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/insurance_reception.png",
							alt: "Medical reception",
							className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-4 right-4 bottom-4 rounded-[20px] bg-white/95 backdrop-blur p-4 shadow-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-bold uppercase tracking-wider text-[#FF6A55]",
									children: "Delta Dental PPO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-[14px] sm:text-[15px] font-bold text-slate-900",
									children: "Active coverage confirmed"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-11 w-11 rounded-[14px] bg-[#16C4B3]/10 flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										className: "h-5 w-5 text-[#16C4B3]",
										strokeWidth: 2.5
									})
								})]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 px-3 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-12 h-12 rounded-[16px] bg-[#FFF9F2] border border-[#FF6A55]/10 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
							className: "w-6 h-6 text-[#FF6A55]",
							strokeWidth: 2.5
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[15px] sm:text-[16px] font-bold text-slate-900",
						children: "Coverage, before the chair"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[13px] font-medium text-slate-500",
						children: "Captured and confirmed at intake"
					})] })]
				})]
			})]
		})
	});
}
var blocks = [
	{
		icon: ShieldCheck,
		title: "Insurance ready",
		body: "Verified before the chair is set. No paperwork ambush at check-in.",
		image: "/images/automation_insurance.png"
	},
	{
		icon: FilePenLine,
		title: "Forms complete",
		body: "Intake, history, consents — signed digitally before arrival.",
		image: "/images/automation_forms.png"
	},
	{
		icon: CalendarCheck,
		title: "Schedule filled",
		body: "Recall and overflow handled by Solara, 24/7.",
		image: "/images/automation_schedule.png"
	}
];
var oldWayCards = [
	{
		icon: PhoneMissed,
		text: "Calls slip to voicemail after hours",
		rotate: "-rotate-2",
		margin: "-ml-2 sm:-ml-6 mr-2 sm:mr-6",
		delay: .1
	},
	{
		icon: ClipboardX,
		text: "Patients filling paper forms on clipboards",
		rotate: "rotate-1",
		margin: "ml-4 sm:ml-8 -mr-4 sm:-mr-8",
		delay: .2
	},
	{
		icon: ShieldAlert,
		text: "Staff stuck on hold checking insurance",
		rotate: "-rotate-1",
		margin: "-ml-1 sm:-ml-4 mr-1 sm:mr-4",
		delay: .3
	},
	{
		icon: UserMinus,
		text: "No-shows leave chairs sitting empty",
		rotate: "rotate-2",
		margin: "ml-2 sm:ml-6 -mr-2 sm:-mr-6",
		delay: .4
	},
	{
		icon: SearchX,
		text: "New patients cannot find you online",
		rotate: "-rotate-1",
		margin: "-ml-3 sm:-ml-8 mr-3 sm:mr-8",
		delay: .5
	}
];
var newWayCards = [
	{
		icon: PhoneCall,
		text: "Every call answered and booked, 24/7",
		delay: .1
	},
	{
		icon: ClipboardCheck,
		text: "Forms filled on the patient's phone, no paper",
		delay: .2
	},
	{
		icon: ShieldCheck,
		text: "Coverage verified before they sit down",
		delay: .3
	},
	{
		icon: UserCheck,
		text: "Open slots backfilled from your recall list",
		delay: .4
	},
	{
		icon: TrendingUp,
		text: "Found first on Google with SEO and Google Ads",
		delay: .5
	}
];
function Automation() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "automation",
		className: "py-20 md:py-28 bg-[#FDFBF7]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl text-center mb-16 sm:mb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6A55]/5 border border-[#FF6A55]/20 text-[#FF6A55] text-[11px] font-bold uppercase tracking-[0.18em] mb-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), " Automation"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight",
							children: [
								"No clipboards. No paper.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-500",
									children: "No chasing."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg sm:text-xl text-slate-600 leading-relaxed font-medium",
							children: "Solara doesn't help your team work harder — it removes the work entirely."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-3 w-full",
					children: blocks.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 28
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							margin: "-80px"
						},
						transition: {
							delay: i * .12,
							duration: .7,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "group relative h-64 sm:h-72 overflow-hidden rounded-[24px] border border-slate-200/50 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: b.image,
								alt: b.title,
								className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute left-5 right-5 bottom-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl sm:text-2xl font-bold leading-tight text-white mb-2",
									children: b.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[14px] leading-relaxed text-white/80 font-medium",
									children: b.body
								})]
							})
						]
					}, b.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full mx-auto mt-32 sm:mt-40 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-16 sm:mb-20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF0DC] border border-[#E8E5D8] text-[#FF6A55] text-[11px] font-bold uppercase tracking-[0.18em] mb-4 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), "Night and Day"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight",
									children: [
										"Your clinic today,",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "sm:hidden" }),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#FF6A55]",
											children: "vs. with Solara"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto",
									children: "Same front desk. Same patients. None of the chaos."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-100/50 border border-slate-200/80 rounded-[40px] p-8 sm:p-12 relative overflow-hidden shadow-inner",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1.5 bg-slate-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl sm:text-3xl font-display font-bold text-slate-400",
											children: "The old way"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-3 py-1 rounded-full bg-slate-200/80 text-slate-500 text-[10px] font-bold uppercase tracking-wider",
											children: "Chaotic"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-4 relative z-10 py-4",
										children: oldWayCards.map((card, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												x: -20,
												rotate: 0
											},
											whileInView: {
												opacity: 1,
												x: 0,
												rotate: card.rotate === "rotate-1" ? 1 : card.rotate === "-rotate-1" ? -1 : card.rotate === "rotate-2" ? 2 : -2
											},
											viewport: {
												once: true,
												margin: "-50px"
											},
											transition: {
												duration: .6,
												delay: card.delay,
												type: "spring",
												stiffness: 100
											},
											className: `bg-white border border-slate-200 shadow-md p-4 sm:p-5 rounded-2xl flex items-center gap-4 ${card.margin} transition-all hover:z-20 hover:scale-105 hover:shadow-xl cursor-default`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "w-5 h-5 text-slate-400" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] sm:text-[15px] font-medium text-slate-500 leading-snug",
												children: card.text
											})]
										}, i))
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-gradient-to-b from-white to-[#FFF4E8] border border-[#FF6A55]/20 rounded-[40px] p-8 sm:p-12 relative overflow-hidden shadow-[0_24px_64px_rgba(255,106,85,0.08)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6A55] opacity-[0.03] blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-10 relative z-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl sm:text-3xl font-display font-bold text-slate-900",
											children: "With Solara"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-3 py-1 rounded-full bg-[#FF6A55]/10 text-[#FF6A55] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }), " Calm"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-4 relative z-10",
										children: newWayCards.map((card, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												x: 20
											},
											whileInView: {
												opacity: 1,
												x: 0
											},
											viewport: {
												once: true,
												margin: "-50px"
											},
											transition: {
												duration: .5,
												delay: card.delay
											},
											className: "group bg-white border border-[#FF6A55]/10 shadow-[0_8px_24px_rgba(255,106,85,0.04)] hover:shadow-[0_16px_32px_rgba(255,106,85,0.08)] hover:border-[#FF6A55]/30 p-4 sm:p-5 rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-0.5 cursor-default",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "w-5 h-5 text-white" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] sm:text-[15px] font-bold text-slate-800 leading-snug",
												children: card.text
											})]
										}, i))
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "mt-16 sm:mt-24 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://app.solara.supermia.ai/",
								className: "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF6A55] text-white font-bold text-base hover:bg-[#FF8569] transition-all duration-300 shadow-xl shadow-[#FF6A55]/20 hover:shadow-2xl hover:shadow-[#FF6A55]/30 hover:-translate-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-5 h-5" }),
									"See it in action",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.04)] relative overflow-hidden group hover:border-[#FF6A55]/30 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FF6A55] to-[#FFB23E] group-hover:w-2 transition-all" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-[#FF6A55] font-black text-[11px] sm:text-[12px] uppercase tracking-[0.15em]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), " First 2 months free"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-2 text-slate-500 font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.15em]",
											children: "No setup fee"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-2 text-slate-500 font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.15em]",
											children: "Cancel anytime"
										})
									]
								})
							})]
						})
					]
				})
			]
		})
	});
}
var scenarios = [
	{
		id: "insurance",
		label: "Insurance check",
		icon: ShieldCheck,
		steps: [
			"Patient books online for next week",
			"Solara instantly queries clearinghouse",
			"Eligibility and benefits breakdown returned"
		],
		resultTitle: "Coverage verified",
		resultBadge: "No hold music",
		resultDesc: "Full breakdown saved to patient chart · Ready for check-in",
		image: "/images/walkthrough_insurance.png"
	},
	{
		id: "intake",
		label: "Intake form",
		icon: ClipboardList,
		steps: [
			"Visit booked for Tuesday",
			"Solara texts a secure intake link",
			"Patient fills it on their phone"
		],
		resultTitle: "Paperwork done",
		resultBadge: "No paper",
		resultDesc: "New-patient forms completed · saved to chart",
		image: "/images/walkthrough_intake.png"
	},
	{
		id: "after_hours",
		label: "After hours",
		icon: Phone,
		steps: [
			"Patient calls at 8:30 PM",
			"Solara answers and speaks naturally",
			"Patient books an emergency slot for tomorrow"
		],
		resultTitle: "Appointment booked",
		resultBadge: "24/7 Coverage",
		resultDesc: "Slot filled · Confirmation text sent to patient",
		image: "/images/walkthrough_afterhours.png"
	},
	{
		id: "recall",
		label: "Recall",
		icon: AlarmClock,
		steps: [
			"Solara identifies 40 overdue patients",
			"Personalized texts sent out silently",
			"8 patients book online via the link"
		],
		resultTitle: "Schedule full",
		resultBadge: "Zero effort",
		resultDesc: "8 reactivations · $2,400+ production added",
		image: "/images/walkthrough_recall.png"
	},
	{
		id: "google",
		label: "Found on Google",
		icon: Search,
		steps: [
			"Patient searches 'dentist near me'",
			"Your clinic appears #1 in Google Maps",
			"Patient clicks and books instantly"
		],
		resultTitle: "New patient won",
		resultBadge: "Top ranking",
		resultDesc: "SEO optimized · Google Business Profile managed",
		image: "/images/walkthrough_google.png"
	}
];
function VoiceBot() {
	const [activeTab, setActiveTab] = (0, import_react.useState)(scenarios[1]);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPaused) return;
		const timer = setTimeout(() => {
			setActiveTab(scenarios[(scenarios.findIndex((t) => t.id === activeTab.id) + 1) % scenarios.length]);
		}, 3e3);
		return () => clearTimeout(timer);
	}, [activeTab, isPaused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "walkthrough",
		className: "py-20 md:py-28 bg-[#FAF0DC] overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-3xl mx-auto mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E5D8] text-[#FF6A55] text-[11px] font-bold uppercase tracking-[0.18em] mb-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), " Live walkthrough"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight",
						children: [
							"A day at your front desk,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[#FF6A55] relative whitespace-nowrap",
								children: ["handled", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "absolute -bottom-2 left-0 w-full h-3 text-[#FFB23E]/30",
									viewBox: "0 0 100 10",
									preserveAspectRatio: "none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M0 5 Q 50 10 100 5",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "4",
										strokeLinecap: "round"
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg sm:text-xl text-slate-600 font-medium",
						children: "Watch it play through, or tap any moment to see exactly what Solara does."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start mt-8 sm:mt-12",
				onMouseEnter: () => setIsPaused(true),
				onMouseLeave: () => setIsPaused(false),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3 sticky top-32 z-20",
					children: scenarios.map((tab) => {
						const isActive = activeTab.id === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab(tab),
							className: `relative overflow-hidden flex items-center gap-3.5 px-5 sm:px-6 py-4 rounded-2xl text-[15px] font-bold transition-all duration-300 text-left w-full ${isActive ? "bg-[#FF6A55] text-white shadow-[0_16px_32px_rgba(255,106,85,0.25)] scale-105 sm:scale-[1.02] border border-[#FF6A55]" : "bg-white text-slate-500 border border-slate-200/60 hover:text-slate-800 hover:border-[#FF6A55]/30 hover:shadow-lg hover:bg-slate-50"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, {
									size: 20,
									className: isActive ? "text-white relative z-10" : "text-slate-400 relative z-10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative z-10",
									children: tab.label
								}),
								isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: { width: isPaused ? "100%" : "0%" },
									animate: { width: "100%" },
									transition: {
										duration: isPaused ? 0 : 3,
										ease: "linear"
									},
									className: "absolute bottom-0 left-0 h-1 bg-white/40"
								}, tab.id + (isPaused ? "-paused" : "-playing"))
							]
						}, tab.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full min-h-[500px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: 20,
								scale: .98
							},
							animate: {
								opacity: 1,
								x: 0,
								scale: 1
							},
							exit: {
								opacity: 0,
								x: -20,
								scale: .98
							},
							transition: {
								duration: .4,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "grid lg:grid-cols-[1.1fr_1fr] gap-6 sm:gap-8 items-stretch h-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative rounded-[32px] shadow-[0_24px_48px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col min-h-[400px] group order-2 lg:order-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: activeTab.image,
										alt: activeTab.label,
										className: "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10 pointer-events-none" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10 p-6 sm:p-8 flex flex-col h-full justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-lg",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
												size: 14,
												className: "text-[#FFB23E]"
											}), activeTab.resultBadge]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h3, {
											initial: {
												opacity: 0,
												y: 10
											},
											animate: {
												opacity: 1,
												y: 0
											},
											transition: { delay: .3 },
											className: "text-3xl sm:text-4xl font-display font-bold leading-[1.1] mb-5 tracking-tight text-white drop-shadow-lg",
											children: activeTab.resultTitle
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												y: 10
											},
											animate: {
												opacity: 1,
												y: 0
											},
											transition: { delay: .4 },
											className: "rounded-2xl bg-white/10 border border-white/20 p-4 sm:p-5 backdrop-blur-md transition-all duration-500 shadow-xl",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1.5 font-bold flex items-center gap-2",
												children: "What your team sees"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[14px] sm:text-[15px] font-bold leading-relaxed text-white",
												children: activeTab.resultDesc
											})]
										})]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-[32px] bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center order-1 lg:order-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3 sm:space-y-4 relative z-10",
									children: activeTab.steps.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 15
										},
										animate: {
											opacity: 1,
											y: 0
										},
										transition: {
											delay: .2 + idx * .1,
											type: "spring",
											stiffness: 100
										},
										className: "group/step relative bg-slate-50/80 hover:bg-white border border-slate-200/50 hover:border-[#FF6A55]/30 rounded-[20px] p-4 sm:p-5 transition-all duration-300 shadow-sm hover:shadow-[0_12px_32px_rgba(255,106,85,0.08)] flex items-center gap-4 sm:gap-5 hover:-translate-y-0.5 cursor-default",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "shrink-0 w-12 h-12 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.04)] flex items-center justify-center relative z-10 group-hover/step:scale-110 transition-transform duration-300 ring-1 ring-slate-100 group-hover/step:ring-[#FF6A55]/20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent font-display font-black text-xl group-hover/step:from-[#FF6A55] group-hover/step:to-[#FFB23E] transition-all",
												children: idx + 1
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1 group-hover/step:text-[#FF6A55] transition-colors",
												children: ["Step 0", idx + 1]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[14px] sm:text-[15px] font-bold text-slate-700 leading-snug group-hover/step:text-slate-900 transition-colors",
												children: step
											})]
										})]
									}, idx))
								})
							})]
						}, activeTab.id)
					})
				})]
			})]
		})
	});
}
var cases = [
	{
		id: "northgate",
		practice: "Northgate Family Dental",
		location: "Phoenix, AZ",
		category: "Recall & reactivation",
		quote: "Recall used to be the thing we always meant to do. Now it just runs in the background. It's completely transformed our revenue.",
		author: "Dr. E. Romero",
		role: "Owner",
		image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80",
		stats: [
			{
				value: "210",
				label: "Overdue patients re-engaged"
			},
			{
				value: "47%",
				label: "Of those rebooked"
			},
			{
				value: "+$94k",
				label: "Recall revenue / quarter",
				isHeadline: true
			},
			{
				value: "0 hrs",
				label: "Of staff time"
			}
		]
	},
	{
		id: "sunrise",
		practice: "Sunrise Dental",
		location: "Austin, TX",
		category: "Intake & Verification",
		quote: "Insurance verification and intake used to eat the morning. Now it's done before the patient walks in, freeing our team.",
		author: "Dr. R. Patel",
		role: "DDS",
		image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
		stats: [
			{
				value: "4 hrs",
				label: "Saved per day on insurance"
			},
			{
				value: "100%",
				label: "Forms completed prior to arrival"
			},
			{
				value: "Zero",
				label: "Morning bottlenecks",
				isHeadline: true
			},
			{
				value: "15m",
				label: "Wait time reduction"
			}
		]
	},
	{
		id: "maple",
		practice: "Maple Dental",
		location: "Toronto, ON",
		category: "24/7 Operations",
		quote: "It's not a phone line - it's the whole front desk. Forms, recall, notes, and booking all happen without lifting a finger.",
		author: "Dr. J. Kim",
		role: "DDS",
		image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80",
		stats: [
			{
				value: "24/7",
				label: "Booking availability"
			},
			{
				value: "3x",
				label: "Increase in after-hours bookings"
			},
			{
				value: "100%",
				label: "Accurate OpenDental sync",
				isHeadline: true
			},
			{
				value: "0",
				label: "Missed new patient calls"
			}
		]
	}
];
var testimonials = [
	{
		name: "Dr. R. Patel, DDS",
		practice: "Sunrise Dental",
		location: "Austin, TX",
		quote: "Insurance verification and intake used to eat the morning. Now it's done before the patient walks in, and the team is free to actually run the day.",
		avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop"
	},
	{
		name: "Dr. J. Kim, DDS",
		practice: "Maple Dental",
		location: "Toronto, ON",
		quote: "It's not a phone line - it's the whole front desk. Forms, recall, notes, and booking all happen without anyone lifting a finger.",
		avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop"
	},
	{
		name: "Dr. E. Romero, DDS",
		practice: "Northgate Family Dental",
		location: "Phoenix, AZ",
		quote: "The OpenDental sync is the part I trusted last and now rely on most. Booked, rescheduled, or transferred - everything shows up where it should.",
		avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80&auto=format&fit=crop"
	}
];
function CaseStudy() {
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const activeCase = cases[activeIndex];
	(0, import_react.useEffect)(() => {
		if (isPaused) return;
		const timer = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % cases.length);
		}, 1e4);
		return () => clearInterval(timer);
	}, [isPaused, activeIndex]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "results",
		className: "py-20 md:py-28 bg-white relative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-3xl mx-auto mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
						initial: {
							opacity: 0,
							y: 10
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[#FF6A55] text-[11px] font-bold uppercase tracking-[0.2em] mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 14 }), " Case results"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
						initial: {
							opacity: 0,
							y: 10
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .1 },
						className: "text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-slate-900 mb-6 leading-[1.05] tracking-tight",
						children: [
							"Same front desk.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-400",
								children: "Different results."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-[40px] sm:rounded-[64px] overflow-hidden bg-slate-900 shadow-2xl shadow-slate-900/20 mb-32 flex flex-col",
					onMouseEnter: () => setIsPaused(true),
					onMouseLeave: () => setIsPaused(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 z-0 bg-slate-900",
						children: [
							cases.map((c, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.image,
								alt: c.practice,
								className: `absolute inset-0 w-full h-full object-cover mix-blend-luminosity transition-opacity duration-1000 ${idx === activeIndex ? "opacity-40 lg:opacity-60" : "opacity-0"}`
							}, c.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent lg:w-3/4 pointer-events-none" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 p-8 sm:p-12 lg:p-20 flex flex-col justify-between flex-1 min-h-[750px] lg:min-h-[800px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-4 relative z-20",
							children: cases.map((c, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveIndex(idx),
								className: "group relative flex-1 max-w-[200px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-1.5 rounded-full overflow-hidden transition-colors ${idx === activeIndex ? "bg-white/20" : "bg-white/10 group-hover:bg-white/20"}`,
									children: idx === activeIndex && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: { width: isPaused ? "100%" : "0%" },
										animate: { width: "100%" },
										transition: {
											duration: isPaused ? 0 : 10,
											ease: "linear"
										},
										className: `h-full ${isPaused ? "bg-[#FF6A55]/50" : "bg-[#FF6A55]"}`
									}, `${activeIndex}-${isPaused ? "paused" : "playing"}`)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `mt-3 text-[11px] font-bold uppercase tracking-wider transition-colors text-left ${idx === activeIndex ? "text-white" : "text-white/40 group-hover:text-white/70"}`,
									children: c.practice
								})]
							}, c.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid lg:grid-cols-12 gap-12 lg:gap-20 items-end relative z-10 mt-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:col-span-6 xl:col-span-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 20
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											y: -20
										},
										transition: {
											duration: .6,
											ease: [
												.22,
												1,
												.36,
												1
											]
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-8",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
													size: 12,
													className: "text-[#FFB23E]"
												}), activeCase.location]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												className: "text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white leading-[1.2] mb-6",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "text-[#FF6A55] w-8 h-8 lg:w-10 lg:h-10 mb-4 opacity-50" }),
													"\"",
													activeCase.quote,
													"\""
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] p-[2px]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-full h-full bg-slate-900 rounded-full flex items-center justify-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-white font-bold text-sm",
															children: activeCase.author.charAt(4)
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-white font-bold text-lg",
													children: activeCase.author
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[#FFB23E] font-semibold text-sm",
													children: [
														activeCase.role,
														" · ",
														activeCase.practice
													]
												})] })]
											})
										]
									}, activeCase.id)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:col-span-6 xl:col-span-7",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											x: 20
										},
										animate: {
											opacity: 1,
											x: 0
										},
										exit: {
											opacity: 0,
											x: -20
										},
										transition: {
											duration: .6,
											delay: .2,
											ease: [
												.22,
												1,
												.36,
												1
											]
										},
										className: "grid sm:grid-cols-2 gap-4",
										children: activeCase.stats.map((stat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `rounded-[32px] p-6 sm:p-8 backdrop-blur-xl border transition-all ${stat.isHeadline ? "bg-white/10 border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.3)] sm:col-span-2 lg:col-span-1" : "bg-white/5 border-white/10"}`,
											children: [
												stat.isHeadline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFB23E] mb-3 flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 14 }), " Headline result"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `font-display font-bold leading-none mb-3 ${stat.isHeadline ? "text-5xl sm:text-6xl bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent" : "text-4xl sm:text-5xl text-white"}`,
													children: stat.value
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[15px] leading-snug font-medium text-white/60",
													children: stat.label
												})
											]
										}, idx))
									}, activeCase.id)
								})
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-32 sm:mb-40 pt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mb-20 sm:mb-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight",
							children: "Trusted by leading practices"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-3 gap-x-6 gap-y-16 sm:gap-y-20",
						children: testimonials.map((testimonial, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: idx === 1 ? 32 : 0
							},
							viewport: { once: true },
							transition: {
								delay: idx * .1,
								duration: .6,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: `relative bg-gradient-to-b from-white to-slate-50/50 rounded-[40px] p-8 sm:p-10 shadow-[0_8px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/5 hover:shadow-[0_30px_60px_rgba(255,106,85,0.08)] transition-all duration-500 flex flex-col h-full group ${idx === 1 ? "md:translate-y-8" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-4 right-8 font-display text-[140px] leading-none text-[#FF6A55] opacity-[0.03] pointer-events-none select-none z-0 group-hover:opacity-[0.06] transition-opacity duration-500",
									children: "\""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -top-10 left-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-tr from-[#FF6A55] to-[#FFB23E] rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: testimonial.avatar,
											alt: testimonial.name,
											className: "w-20 h-20 rounded-full object-cover relative z-10 border-4 border-white shadow-xl"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10 mt-12 flex-1 flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
										className: "text-[17px] text-slate-700 leading-relaxed font-medium flex-1 mb-8",
										children: [
											"\"",
											testimonial.quote,
											"\""
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-1 mb-4",
												children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
													size: 16,
													className: "text-[#FFB23E] fill-current"
												}, i))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-slate-900 text-[16px]",
												children: testimonial.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[14px] font-semibold text-[#FF6A55] mt-1",
												children: testimonial.practice
											})
										]
									})]
								})
							]
						}, idx))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
						initial: {
							opacity: 0,
							y: 10
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						href: "https://app.solara.supermia.ai/",
						className: "inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-[16px] hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group",
						children: ["See Solara in action", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							size: 20,
							className: "group-hover:translate-x-1.5 transition-transform text-[#FF6A55]"
						})]
					})
				})
			]
		})
	});
}
var features$1 = [
	"Books it in OpenDental for you - no double entry, not a parallel schedule",
	"Patients, providers, operatories, and appointments stay in OpenDental",
	"Procedure codes, insurance, and revenue follow through automatically"
];
function OpenDental() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "opendental",
		className: "py-20 md:py-28 bg-[#FAF0DC] overflow-hidden relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-white/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF6A55]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px] relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-2 gap-16 lg:gap-24 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6A55]/10 border border-[#FF6A55]/20 mb-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-4 h-4 text-[#FF6A55]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-[#FF6A55] uppercase tracking-wider",
								children: "OpenDental Integration"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .1 },
							className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight",
							children: [
								"Bookings that land straight in ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#FF6A55]",
									children: "OpenDental"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .2 },
							className: "text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 font-medium",
							children: "Works with OpenDental and your existing phone line. Solara checks provider and operatory availability, books the right service and duration, and writes back to OpenDental automatically. No double entry, no end-of-day reconciliation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-5 text-slate-700",
							children: features$1.map((feature, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
								initial: {
									opacity: 0,
									x: -20
								},
								whileInView: {
									opacity: 1,
									x: 0
								},
								viewport: { once: true },
								transition: { delay: .3 + i * .1 },
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-6 h-6 rounded-full bg-[#FF6A55]/10 flex items-center justify-center shrink-0 mt-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-[#FF6A55]" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[16px] leading-relaxed font-semibold text-slate-800",
									children: feature
								})]
							}, i))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .95,
							y: 30
						},
						whileInView: {
							opacity: 1,
							scale: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .7,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[#FF6A55]/10 blur-[80px] rounded-[40px] pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative bg-white rounded-[32px] border border-slate-200/60 shadow-[0_32px_64px_rgba(15,23,42,0.06)] overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-900 px-8 py-5 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-4 h-4 text-[#FFB23E]" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-white text-[15px] font-bold",
												children: "New appointment"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[13px] font-medium text-slate-300",
												children: "Op 2 · Dr. Lin"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-8 space-y-1",
										children: [
											{
												label: "Patient",
												value: "M. Alvarez (New)",
												highlight: true
											},
											{
												label: "Service",
												value: "New-patient cleaning · 60 min"
											},
											{
												label: "Provider / Op",
												value: "Dr. Lin · Op 2"
											},
											{
												label: "Date / Time",
												value: "Tue 12 May · 10:30 AM"
											},
											{
												label: "Insurance",
												value: "Delta Dental PPO · verified",
												verified: true
											}
										].map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-slate-100 py-4 last:border-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[13px] font-bold uppercase tracking-wider text-slate-400",
												children: row.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-[15px] font-bold ${row.highlight ? "text-slate-900" : "text-slate-700"} flex items-center gap-2`,
												children: [row.value, row.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-500" })]
											})]
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-emerald-50/80 border-t border-emerald-100 px-8 py-4 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "w-4 h-4 text-emerald-600" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] text-emerald-800 font-bold",
												children: "Synced to OpenDental"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[13px] font-medium text-emerald-600/80",
											children: "10:31 AM"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: {
									delay: .6,
									duration: .5
								},
								className: "absolute -right-6 -bottom-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full bg-[#FAF0DC] flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 text-[#FFB23E]" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-0.5",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[14px] font-bold text-slate-900",
									children: "Zero double entry"
								})] })]
							})
						]
					})]
				})
			})
		]
	});
}
function Stat({ value, suffix = "", prefix = "" }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, { once: true });
	const mv = useMotionValue(0);
	const out = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
	(0, import_react.useEffect)(() => {
		if (inView) return animate(mv, value, {
			duration: 1.6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}).stop;
	}, [
		inView,
		mv,
		value
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		ref,
		children: out
	});
}
var bars = [
	12,
	22,
	38,
	50,
	62,
	70,
	55,
	42,
	32,
	48,
	60,
	38
];
function Dashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "dashboard",
		className: "py-20 md:py-28 bg-[#FAF0DC] relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 to-transparent pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6A55]/5 rounded-full blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px] relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-3xl mx-auto mb-16 sm:mb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6A55]/10 border border-[#FF6A55]/20 mb-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-4 h-4 text-[#FF6A55]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-[#FF6A55] uppercase tracking-wider",
								children: "Dashboard"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .1 },
							className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight",
							children: [
								"One dashboard for appointments, patients, revenue, and ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#FF6A55]",
									children: "insurance"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .2 },
							className: "text-lg sm:text-xl text-slate-600 leading-relaxed font-medium",
							children: "Across every location - switch between Calls, Bookings, and Revenue and change the range. Real dashboard preview data."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 40
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .8,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "relative max-w-5xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[#FF6A55]/15 blur-[100px] rounded-[40px] pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-16 overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[0_32px_80px_rgba(15,23,42,0.10)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-[color:var(--divider)] px-6 py-4 flex-wrap gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-7 w-7 rounded-lg bg-[color:var(--primary)] text-white text-mono text-[12px] font-bold grid place-items-center",
												children: "S"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[13px] font-medium text-[color:var(--foreground)]",
												children: "Solara Console"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-mono text-[11px] text-[color:var(--muted-foreground)] hidden sm:inline",
												children: "· Northside Family Dental"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-2",
										children: [
											"7 days",
											"30 days",
											"90 days"
										].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: `rounded-lg px-4 py-1.5 text-[12px] ${i === 1 ? "bg-[color:var(--foreground)] text-white" : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)]"}`,
											children: t
										}, t))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-px bg-[color:var(--divider)] md:grid-cols-4",
									children: [
										{
											k: "Appointments booked",
											v: 412,
											delta: "+22% vs prev. 30 days",
											up: true
										},
										{
											k: "Insurance verified",
											v: 388,
											delta: "+26% vs prev. 30 days",
											up: true
										},
										{
											k: "Forms completed",
											v: 470,
											delta: "+31% vs prev. 30 days",
											up: true
										},
										{
											k: "Revenue impact",
											v: 112,
											suffix: "k",
											prefix: "$",
											delta: "+27% vs prev. 30 days",
											up: true
										}
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-[color:var(--card)] p-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]",
												children: s.k
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-display mt-2 text-[32px] text-[color:var(--foreground)]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
													value: s.v,
													prefix: s.prefix,
													suffix: s.suffix
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `mt-2 inline-flex items-center gap-1 text-[12px] ${s.up ? "text-[color:var(--success)]" : "text-[color:var(--destructive)]"}`,
												children: [
													s.up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { size: 12 }),
													" ",
													s.delta
												]
											})
										]
									}, s.k))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-px bg-[color:var(--divider)] lg:grid-cols-[2fr_1fr]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-[color:var(--card)] p-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[14px] font-medium text-[color:var(--foreground)]",
													children: "Bookings by hour"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[12px] text-[color:var(--muted-foreground)]",
													children: "30 days"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-mono text-[11px] text-[color:var(--primary)]",
													children: "+34% trend"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-8 flex h-40 items-end gap-2",
												children: bars.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
													initial: { scaleY: 0 },
													whileInView: { scaleY: 1 },
													viewport: { once: true },
													transition: {
														delay: i * .04,
														duration: .6,
														ease: [
															.22,
															1,
															.36,
															1
														]
													},
													style: {
														height: `${h}%`,
														transformOrigin: "bottom"
													},
													className: `flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-[color:var(--primary)]" : "bg-[color:var(--muted)]"}`
												}, i))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex justify-between text-mono text-[10px] text-[color:var(--muted-foreground)]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "8 AM" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "10 AM" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "12 PM" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2 PM" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4 PM" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "6 PM" })
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-[color:var(--card)] p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[14px] font-medium text-[color:var(--foreground)]",
											children: "By provider"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-5 space-y-4",
											children: [
												{
													k: "Dr. Patel",
													v: 39,
													c: "var(--primary)"
												},
												{
													k: "Dr. Lin",
													v: 34,
													c: "#0f172a"
												},
												{
													k: "Dr. Romero",
													v: 27,
													c: "#9ca3af"
												}
											].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-[12px] text-[color:var(--foreground)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.k }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-mono text-[color:var(--muted-foreground)]",
													children: [r.v, "%"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-[color:var(--muted)]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
													initial: { width: 0 },
													whileInView: { width: `${r.v}%` },
													viewport: { once: true },
													transition: {
														duration: 1,
														ease: [
															.22,
															1,
															.36,
															1
														]
													},
													style: { background: r.c },
													className: "h-full"
												})
											})] }, r.k))
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500 font-medium italic mt-4 text-center",
							children: "Interactive demo with preview data. Real numbers from your clinic after you go live."
						})
					]
				})]
			})
		]
	});
}
var features = [
	{
		name: "Verifies insurance",
		icon: ShieldCheck,
		fd: "limited",
		bot: "no",
		solara: "yes"
	},
	{
		name: "Answers every call 24/7",
		icon: Clock,
		fd: "no",
		bot: "limited",
		solara: "yes"
	},
	{
		name: "Books into OpenDental",
		icon: Database,
		fd: "limited",
		bot: "no",
		solara: "yes"
	},
	{
		name: "Sends & fills intake forms",
		icon: ClipboardList,
		fd: "limited",
		bot: "no",
		solara: "yes"
	},
	{
		name: "Writes visit notes",
		icon: FileText,
		fd: "limited",
		bot: "no",
		solara: "yes"
	},
	{
		name: "Recall & reactivation",
		icon: AlarmClock,
		fd: "limited",
		bot: "no",
		solara: "yes"
	},
	{
		name: "Fills cancellations & waitlist",
		icon: CalendarCheck,
		fd: "limited",
		bot: "no",
		solara: "yes"
	},
	{
		name: "Reminders & confirmations",
		icon: Mail,
		fd: "limited",
		bot: "limited",
		solara: "yes"
	},
	{
		name: "Website chat + text booking",
		icon: MessageCircle,
		fd: "no",
		bot: "limited",
		solara: "yes"
	},
	{
		name: "Smart scheduling by provider & op",
		icon: Calendar,
		fd: "limited",
		bot: "no",
		solara: "yes"
	},
	{
		name: "Analytics & reporting",
		icon: ChartColumn,
		fd: "limited",
		bot: "no",
		solara: "yes"
	},
	{
		name: "Gets you found on Google",
		icon: Search,
		fd: "no",
		bot: "no",
		solara: "SEO + Google Ads"
	},
	{
		name: "Works after hours & overflow",
		icon: Headphones,
		fd: "no",
		bot: "limited",
		solara: "yes"
	}
];
function Cell({ v }) {
	if (v === "yes") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center gap-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 text-[#16C4B3]" })
	});
	if (v === "SEO + Google Ads") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 text-[#16C4B3]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden lg:inline text-[11px] font-bold text-[#FF6A55] leading-tight",
			children: v
		})]
	});
	if (v === "no") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-5 h-5 text-rose-300" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 text-amber-600",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-medium hidden sm:inline",
				children: "Limited"
			})]
		})
	});
}
function Comparison() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "compare",
		className: "py-20 md:py-28 bg-gradient-to-b from-[#FFF9F2] via-[#FAF0DC]/40 to-[#FFF9F2] relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 -right-32 w-[32rem] h-[32rem] bg-[#FF6A55]/8 rounded-full blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-40 -left-32 w-[32rem] h-[32rem] bg-[#FFB23E]/8 rounded-full blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full px-4 sm:px-6 lg:px-12 relative z-10 max-w-[1920px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-4xl mx-auto mb-16 sm:mb-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6A55]/10 border border-[#FF6A55]/20 mb-6 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-4 h-4 text-[#FF6A55]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold text-[#FF6A55] uppercase tracking-wider",
									children: "Compare"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { delay: .1 },
								className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight",
								children: [
									"AI front office ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-300 font-medium italic px-2",
										children: "vs."
									}),
									" front desk ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-300 font-medium italic px-2",
										children: "vs."
									}),
									" basic chatbot"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { delay: .2 },
								className: "text-lg sm:text-xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto",
								children: "Where a complete AI front office fits next to the alternatives most clinics already use."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { duration: .6 },
						className: "hidden md:block w-full max-w-none mx-auto rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[1.7fr_1fr_1fr_1.2fr] bg-slate-900 text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-5 py-4 text-sm font-semibold",
									children: "Capability"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 py-4 text-center text-sm font-semibold",
									children: "Front desk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 py-4 text-center text-sm font-semibold",
									children: "Basic chatbot"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 py-4 text-center text-sm font-semibold bg-gradient-to-br from-[#FF6A55] to-[#143138]",
									children: "Solara"
								})
							]
						}), features.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `grid grid-cols-[1.7fr_1fr_1fr_1.2fr] items-stretch border-t border-slate-100 transition-colors hover:bg-[#FAF0DC]/40 ${i % 2 !== 0 ? "bg-slate-50/40" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-5 py-3.5 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-8 h-8 rounded-lg bg-slate-100 ring-1 ring-slate-200 flex items-center justify-center flex-shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(row.icon, { className: "w-4 h-4 text-slate-600" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-slate-900 leading-snug",
										children: row.name
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 py-3.5 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { v: row.fd })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 py-3.5 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { v: row.bot })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 py-3.5 flex items-center justify-center gap-2 bg-[#FF6A55]/5 border-l-2 border-[#FF6A55]/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { v: row.solara })
								})
							]
						}, row.name))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:hidden space-y-3 max-w-xl mx-auto mt-8",
						children: features.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-8 h-8 rounded-lg bg-slate-100 ring-1 ring-slate-200 flex items-center justify-center flex-shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(row.icon, { className: "w-4 h-4 text-slate-600" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold text-slate-900 leading-snug",
									children: row.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-slate-50 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-wider text-slate-400 mb-1",
											children: "Front desk"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { v: row.fd })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-slate-50 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-wider text-slate-400 mb-1",
											children: "Chatbot"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { v: row.bot })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-[#FF6A55]/10 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-wider text-[#FF6A55] font-bold mb-1",
											children: "Solara"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { v: row.solara })
										})]
									})
								]
							})]
						}, row.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .8,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "w-full max-w-none mx-auto mt-12 sm:mt-16 relative group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-[1px] bg-gradient-to-r from-[#FF6A55]/40 via-[#FFB23E]/40 to-[#FF6A55]/40 rounded-[34px] blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative rounded-[32px] overflow-hidden border border-white/10 bg-[#0B0F17] shadow-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FF6A55]/20 to-transparent rounded-full blur-[80px] pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FFB23E]/15 to-transparent rounded-full blur-[80px] pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 opacity-[0.03] pointer-events-none",
									style: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E\")" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative grid lg:grid-cols-[auto_1fr_auto] items-center gap-8 px-8 py-8 sm:px-10 sm:py-10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[#FF6A55] rounded-2xl blur-lg opacity-40 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-16 h-16 rounded-2xl bg-gradient-to-b from-[#FF6A55] to-[#E54830] flex items-center justify-center relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] ring-1 ring-white/10",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-8 h-8 text-white drop-shadow-md" })
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-baseline gap-1",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-4xl sm:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight leading-none",
													children: "13 / 13"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs sm:text-sm uppercase tracking-[0.15em] text-[#FFB23E] font-bold mt-2",
												children: "Capabilities, run by Solara Dental AI"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-base sm:text-lg text-slate-300 leading-relaxed text-left lg:text-center max-w-2xl mx-auto font-medium",
											children: [
												"The only solution that ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white",
													children: "verifies insurance"
												}),
												", ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white",
													children: "books into your real schedule"
												}),
												", and ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white",
													children: "runs the follow-up"
												}),
												" — without hiring a second receptionist."
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-start lg:justify-end",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												"data-cta": "book_demo",
												"data-position": "comparison",
												className: "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] overflow-hidden",
												href: "https://app.solara.supermia.ai/",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-5 h-5 text-[#FF6A55]" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "relative",
														children: "Get Started"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-transform group-hover:translate-x-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 text-slate-900" })
													})
												]
											})
										})
									]
								})
							]
						})]
					})
				]
			})
		]
	});
}
function FoundingOffer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "founding",
		className: "relative py-20 md:py-28 overflow-hidden bg-[#0A0A0A] text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.03] pointer-events-none",
				style: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E\")" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#FF6A55]/15 to-transparent blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#FFB23E]/10 to-transparent blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-content relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center mb-12 lg:mb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .9
							},
							whileInView: {
								opacity: 1,
								scale: 1
							},
							viewport: { once: true },
							className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-[#FFB23E]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300",
									children: "Founding Cohort"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1",
									children: "19 of 25 left"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .1 },
							className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-6",
							children: [
								"Your first ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden sm:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-transparent bg-clip-text bg-gradient-to-r from-[#FFB23E] via-[#FF6A55] to-[#E54830]",
									children: "2 months"
								}),
								" ",
								"are on us."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .2 },
							className: "text-base sm:text-lg text-slate-400 max-w-2xl font-medium leading-relaxed",
							children: "Join the founding cohort and run your whole front office free. Use the time to launch Solara, test it on real calls, and watch the schedule fill before a monthly bill ever starts."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-12 gap-5 max-w-5xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .3 },
						className: "lg:col-span-5 relative group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#FF6A55]/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-full flex flex-col p-8 rounded-3xl bg-[#111111] border border-white/10 overflow-hidden shadow-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -right-24 w-64 h-64 bg-[#FF6A55]/20 blur-[60px] rounded-full pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-3xl border-b border-l border-white/5 flex items-start justify-end p-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-6 h-6 text-[#FF6A55]" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-mono uppercase tracking-widest text-[#FFB23E] font-bold mb-4 mt-2",
									children: "Founding Offer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-none mb-2",
									children: "$0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg text-[#FF6A55] font-bold mb-8",
									children: "for your first 2 months"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto space-y-4 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-3 rounded-2xl bg-white/5 border border-white/5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-slate-400 font-medium leading-relaxed",
												children: [
													"Then your locked founding rate,",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													"confirmed at onboarding"
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											"data-cta": "book_demo",
											"data-position": "founding_section",
											href: "https://app.solara.supermia.ai/",
											className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-base hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]",
											children: ["Claim your spot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), " Cancel anytime · No setup fee"]
										})
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7 flex flex-col gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-3 gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 20
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: { delay: .4 },
									className: "p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-display font-bold text-white mb-1",
										children: "$0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-slate-400 font-medium leading-relaxed",
										children: "monthly fee while you onboard"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 20
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: { delay: .5 },
									className: "p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-display font-bold text-white mb-1",
										children: "$2,500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-slate-400 font-medium leading-relaxed",
										children: "white-glove setup included"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 20
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: { delay: .6 },
									className: "p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-display font-bold text-white mb-1",
										children: "90 days"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-slate-400 font-medium leading-relaxed",
										children: "to prove it works in clinic"
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .7 },
							className: "flex-1 p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-white/10 relative overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FFB23E]/5 blur-[80px] rounded-full pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid sm:grid-cols-2 gap-4 sm:gap-6 relative z-10 h-full content-center",
								children: [
									"Run insurance, intake, booking, recall, notes, SEO, and Google Ads from day one",
									"Founder-assisted setup tuned around your practice",
									"Keep your locked founding rate after onboarding confirms your plan",
									"No risk: 30-day money-back if it is not working"
								].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#16C4B3]/20 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 text-[#16C4B3]" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-slate-300 font-medium leading-relaxed",
										children: item
									})]
								}, i))
							})]
						})]
					})]
				})]
			})
		]
	});
}
var plans = [
	{
		id: "essentials",
		name: "Essentials",
		icon: User,
		tagline: "Solo practices",
		desc: "The always-on phone & chat agent. Stop losing after-hours calls.",
		monthlyPrice: 399,
		annualPrice: 339,
		savings: 720,
		cta: "Start a 30-day trial",
		features: [
			"Voice AI Agent — inbound only, 24/7",
			"Chat AI Agent — Web widget & SMS",
			"Appointment Confirmation & Reminders",
			"OpenDental sync — no double entry",
			"1,500 AI call minutes / month",
			"1 provider · 1 operatory",
			"HIPAA & GDPR · full audit trail",
			"Email support · 24-hour response"
		]
	},
	{
		id: "pro",
		name: "Pro",
		icon: Crown,
		tagline: "Growing groups",
		desc: "The complete always-on front office. Outbound, scheduling, intelligence & clinical.",
		monthlyPrice: 699,
		annualPrice: 599,
		savings: 1200,
		cta: "Get Started",
		popular: true,
		inheritLabel: "Everything in Essentials, plus",
		features: [
			"Outbound Voice AI — recall, reminders, waitlist",
			"Smart Scheduling — emergency priority, smart durations",
			"Campaign Generation — auto-fills cancelled slots",
			"Form Builder & paperless intake",
			"Visit notes written automatically",
			"360° Patient View & activity hub",
			"Insurance Verification — pre-arrival",
			"5,000 AI call minutes / month",
			"Up to 5 providers · 3 operatories",
			"Priority support · 4-hour response"
		]
	},
	{
		id: "enterprise",
		name: "Enterprise",
		icon: Building2,
		tagline: "Multi-location",
		desc: "For dental groups with multiple locations. Scale, centralize, and report.",
		monthlyPrice: 1499,
		annualPrice: 1299,
		priceSuffix: "/ location",
		savings: 2400,
		cta: "Talk to sales",
		inheritLabel: "Everything in Pro, plus",
		features: [
			"Multi-practice / multi-location roll-up",
			"Revenue Analytics — provider, procedure & carrier",
			"Centralized Activity across all locations",
			"Role-Based Team Access",
			"Unlimited providers & operatories",
			"Unlimited AI call minutes",
			"Dedicated Customer Success Manager",
			"White-glove onboarding ($2,500 value)",
			"Guaranteed uptime · 1-hour support",
			"Custom integrations for your tech stack"
		]
	}
];
function Pricing() {
	const [annual, setAnnual] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "pricing",
		className: "relative py-20 md:py-28 overflow-hidden bg-[#FAFAF8]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.015] pointer-events-none",
				style: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E\")" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6A55]/5 rounded-full blur-[150px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#FFB23E]/5 rounded-full blur-[150px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-content relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-3xl mx-auto mb-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A55]/10 border border-[#FF6A55]/20 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-3.5 h-3.5 text-[#FF6A55]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-[#FF6A55]",
									children: "Founding offer · first 2 months free"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { delay: .1 },
								className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-5 leading-[1.1] tracking-tight",
								children: [
									"Your whole front office -",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]",
										children: "three ways"
									}),
									" ",
									"to get it."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { delay: .2 },
								className: "text-lg text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto",
								children: "All plans include insurance verification, paperless intake, OpenDental integration, and unlimited concurrent calls."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									scale: .95
								},
								whileInView: {
									opacity: 1,
									scale: 1
								},
								viewport: { once: true },
								transition: { delay: .3 },
								className: "inline-flex items-center p-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 shadow-inner mt-4 mx-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setAnnual(false),
									className: `relative px-6 py-2.5 rounded-full text-[15px] font-bold transition-all duration-300 ease-out ${!annual ? "bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : "text-slate-500 hover:text-slate-700"}`,
									children: "Monthly"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setAnnual(true),
									className: `relative px-6 py-2.5 rounded-full text-[15px] font-bold transition-all duration-300 ease-out flex items-center gap-2.5 ${annual ? "bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : "text-slate-500 hover:text-slate-700"}`,
									children: ["Annual", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wide font-black transition-all duration-300 ${annual ? "bg-[#FF6A55]/10 text-[#FF6A55]" : "bg-slate-200/70 text-slate-500"}`,
										children: "Save 15%"
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid lg:grid-cols-12 gap-6 max-w-7xl mx-auto items-stretch",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: 30
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: {
									delay: .4,
									duration: .6
								},
								className: "lg:col-span-4 relative group",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-full rounded-[2rem] bg-white border border-slate-200/80 shadow-lg shadow-slate-200/40 p-8 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 overflow-hidden flex flex-col",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#16C4B3]/8 to-transparent pointer-events-none" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6A55] font-bold mb-4",
											children: "Tier 01"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-start justify-between mb-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-slate-500" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-display font-bold text-xl text-slate-900",
													children: "Essentials"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-slate-400 font-medium",
													children: "Solo practices"
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-slate-500 leading-relaxed mb-6",
											children: plans[0].desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-5xl font-display font-bold text-slate-900 tracking-tight",
													children: ["$", annual ? plans[0].annualPrice : plans[0].monthlyPrice]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm text-slate-400 font-medium",
													children: "/ month"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-5 mt-1",
												children: annual && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-bold text-[#16C4B3]",
													children: [
														"Billed annually · save $",
														plans[0].savings,
														"/yr"
													]
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#16C4B3]/10 text-[#0E8C80]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-3 h-3" }), " First 2 months free"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											"data-cta": "book_demo",
											"data-position": "pricing_essentials",
											href: "https://app.solara.supermia.ai/",
											className: "flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-[0.97] mb-8",
											children: ["Start a 30-day trial", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mb-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-0 flex items-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-slate-100" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative flex justify-start",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "pr-3 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-400",
													children: "What's included"
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-3.5",
											children: plans[0].features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full bg-[#16C4B3]/10 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 text-[#16C4B3]" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[13px] text-slate-600 font-medium leading-snug",
													children: f
												})]
											}, i))
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 30
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: {
									delay: .5,
									duration: .6
								},
								className: "lg:col-span-4 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-px rounded-[2.1rem] bg-gradient-to-b from-[#FF6A55]/60 via-[#FF6A55]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-[#FF6A55]/15 transition-all duration-500 hover:-translate-y-1 flex flex-col",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0F1923] via-[#0B1219] to-[#080D12]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 w-56 h-56 bg-[#FF6A55]/20 rounded-full blur-[80px] pointer-events-none" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-20 -left-20 w-56 h-56 bg-[#FFB23E]/10 rounded-full blur-[80px] pointer-events-none" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 opacity-[0.03] pointer-events-none",
											style: {
												backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
												backgroundSize: "40px 40px"
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute -top-0 left-1/2 -translate-x-1/2 translate-y-0 z-20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative px-5 py-2 rounded-b-2xl bg-gradient-to-r from-[#FF6A55] to-[#E54830] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#FF6A55]/40 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }), "Most Chosen"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative z-10 p-8 pt-12 flex flex-col flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] font-mono uppercase tracking-[0.3em] text-[#FFB23E] font-bold mb-4",
													children: "Tier 02"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3 mb-6",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-5 h-5 text-[#FFB23E]" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-display font-bold text-xl text-white",
														children: "Pro"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs text-white/40 font-medium",
														children: "Growing groups"
													})] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-white/50 leading-relaxed mb-6",
													children: plans[1].desc
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mb-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-baseline gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-5xl font-display font-bold text-white tracking-tight",
															children: ["$", annual ? plans[1].annualPrice : plans[1].monthlyPrice]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-sm text-white/30 font-medium",
															children: "/ month"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-5 mt-1",
														children: annual && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-bold text-[#FFB23E]",
															children: [
																"Billed annually · save $",
																plans[1].savings,
																"/yr"
															]
														})
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mb-6",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFB23E] text-[#0B1219]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-3 h-3" }), " First 2 months free"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													"data-cta": "book_demo",
													"data-position": "pricing_pro",
													href: "https://app.solara.supermia.ai/",
													className: "flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FF6A55] to-[#E54830] text-white hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-[#FF6A55]/30 mb-8",
													children: ["Get Started", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative mb-6",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute inset-0 flex items-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-white/10" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "relative flex justify-start",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "pr-3 bg-transparent text-[10px] font-bold uppercase tracking-widest text-white/30",
															style: {
																backgroundColor: "transparent",
																textShadow: "0 0 20px rgba(11,18,25,1), 0 0 40px rgba(11,18,25,1)"
															},
															children: "Everything in Essentials, plus"
														})
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "space-y-3.5",
													children: plans[1].features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-start gap-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full bg-[#16C4B3]/15 flex items-center justify-center",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 text-[#16C4B3]" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[13px] text-white/60 font-medium leading-snug",
															children: f
														})]
													}, i))
												})
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: 30
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: {
									delay: .6,
									duration: .6
								},
								className: "lg:col-span-4 relative group",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-full rounded-[2rem] bg-white border border-slate-200/80 shadow-lg shadow-slate-200/40 p-8 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 overflow-hidden flex flex-col",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FFB23E]/10 to-transparent pointer-events-none" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6A55] font-bold mb-4",
											children: "Tier 03"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-start justify-between mb-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-5 h-5 text-slate-500" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-display font-bold text-xl text-slate-900",
													children: "Enterprise"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-slate-400 font-medium",
													children: "Multi-location"
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-slate-500 leading-relaxed mb-6",
											children: plans[2].desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-5xl font-display font-bold text-slate-900 tracking-tight",
													children: ["$", annual ? plans[2].annualPrice : plans[2].monthlyPrice]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm text-slate-400 font-medium",
													children: "/ location / mo"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-5 mt-1",
												children: annual && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-bold text-[#FFB23E]",
													children: [
														"Billed annually · save $",
														plans[2].savings,
														"/yr"
													]
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#16C4B3]/10 text-[#0E8C80]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-3 h-3" }), " First 2 months free"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											"data-cta": "book_demo",
											"data-position": "pricing_enterprise",
											href: "https://app.solara.supermia.ai/",
											className: "flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-[0.97] mb-8",
											children: ["Talk to sales", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mb-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-0 flex items-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-slate-100" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative flex justify-start",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "pr-3 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-400",
													children: "Everything in Pro, plus"
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-3.5",
											children: plans[2].features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full bg-[#FFB23E]/10 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 text-[#FFB23E]" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[13px] text-slate-600 font-medium leading-snug",
													children: f
												})]
											}, i))
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .8 },
						className: "mt-16 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-8 py-4 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm",
							children: [
								{
									text: "No setup fee",
									icon: Zap
								},
								{
									text: "Cancel anytime",
									icon: Clock
								},
								{
									text: "30-day money-back guarantee",
									icon: Shield
								}
							].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 text-[14px] font-semibold text-slate-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-7 h-7 rounded-full bg-[#16C4B3]/15 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "w-4 h-4 text-[#0E8C80]" })
								}), item.text]
							}, i))
						})
					})
				]
			})
		]
	});
}
var faqs = [
	{
		question: "Is it really free for the first 2 months?",
		answer: "Yes. Founding clinics run the whole platform free for the first two months, with no setup fee and the option to cancel anytime. You use the time to launch Solara and see the schedule impact before any monthly bill starts."
	},
	{
		question: "Is this just a voice bot?",
		answer: "No. Voice is one part. Solara verifies insurance, sends intake forms, books and reschedules, runs recall, writes notes, shows your numbers, and helps with SEO and Google Ads so new patients find you. All automatically."
	},
	{
		question: "How does insurance verification work?",
		answer: "Solara checks eligibility and benefits with your configured carriers at intake, so the plan, copay, and remaining benefits are on the chart before the patient sits down. No more time on hold with carriers."
	},
	{
		question: "Do you really help with SEO and Google Ads?",
		answer: "Yes. Alongside the front office, Solara supports your search presence and Google Ads so nearby patients searching for a dentist find your clinic first, and that traffic is tracked through to real bookings."
	},
	{
		question: "Can an AI receptionist book dental appointments?",
		answer: "Yes. Solara Dental AI checks provider and operatory availability, matches the right service and duration, books the appointment, and confirms it - all in a single phone conversation."
	},
	{
		question: "Does Solara Dental AI work with OpenDental?",
		answer: "Yes. The OpenDental integration keeps patients, appointments, providers, operatories, procedure codes, insurance, and revenue in sync automatically - no double entry."
	},
	{
		question: "Can it transfer calls to my staff?",
		answer: "Yes. For sensitive or complex situations, the AI receptionist transfers the call to your team and passes along a summary of the conversation, so the patient never has to repeat themselves."
	},
	{
		question: "Will it answer insurance questions?",
		answer: "Yes. You configure your accepted carriers, plan types, and payment options in settings, and the AI answers patient questions from that - in your words, your hours, your rules."
	},
	{
		question: "Does it send appointment reminders?",
		answer: "Yes. Solara Dental AI sends automated reminders and confirmations by SMS - and WhatsApp where supported - to reduce no-shows without anyone on your team dialing."
	},
	{
		question: "Can I review call recordings and transcripts?",
		answer: "Yes. Every call is recorded and transcribed, so you can review quality and coach the AI any time."
	},
	{
		question: "How long does setup take?",
		answer: "We run a guided onboarding: connect your clinic phone number and OpenDental, set your hours, services, providers, and insurance, choose what the AI is allowed to do, then run a test in the preview sandbox and switch it on."
	},
	{
		question: "How is it different from a chatbot?",
		answer: "Solara includes a website chatbot - but it doesn't stop there. It answers the actual phone call, books into your real schedule, writes back to OpenDental, and follows up. It acts - it doesn't just reply."
	},
	{
		question: "Can I control what the AI is allowed to do?",
		answer: "Yes. In settings you choose the receptionist's name, voice, and greeting, and toggle capabilities like booking, rescheduling, FAQs, and insurance questions. The AI only does what you switch on."
	},
	{
		question: "What happens with emergencies or complex clinical questions?",
		answer: "The AI recognises when a call needs a person and transfers it to your team with a summary of what was discussed, so your staff can pick up the conversation without missing context."
	},
	{
		question: "Can patients book just by texting?",
		answer: "Yes. A patient can text your number and Solara books, reschedules, or confirms the visit right in the message thread - and writes it into OpenDental."
	},
	{
		question: "Does Solara verify insurance?",
		answer: "Yes. Solara checks the patient's coverage and eligibility before the visit, so your team sees the breakdown up front - fewer billing surprises and faster check-ins."
	},
	{
		question: "What SEO and Google Ads help is included?",
		answer: "Solara isn't only a front office. It also helps new patients find you. We support SEO and Google Ads so your clinic shows up when people nearby search for a dentist."
	}
];
function FAQ() {
	const [selectedIdx, setSelectedIdx] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (selectedIdx !== null) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [selectedIdx]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "faq",
		className: "py-20 md:py-28 bg-[#FAF0DC] relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FF6A55]/5 rounded-full blur-[100px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full px-4 sm:px-6 lg:px-12 max-w-[1920px] relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-16 max-w-3xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight",
						children: "Questions Dental Teams Ask Us"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .1 },
						className: "text-lg text-slate-600 leading-relaxed",
						children: "Short answers to the questions that come up before clinics go live."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto",
					children: faqs.map((faq, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: idx * .03 },
						onClick: () => setSelectedIdx(idx),
						className: "group flex flex-col text-left justify-between bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 h-full min-h-[140px] transition-all duration-300 hover:border-[#FF6A55]/40 hover:shadow-lg hover:shadow-[#FF6A55]/5 hover:-translate-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[15px] sm:text-[17px] font-bold text-slate-800 leading-snug group-hover:text-[#FF6A55] transition-colors pr-4",
							children: faq.question
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center text-[#FF6A55] text-sm font-bold gap-1.5 transition-all",
							children: ["Read more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" })]
						})]
					}, idx))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selectedIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					transition: { duration: .3 },
					onClick: () => setSelectedIdx(null),
					className: "absolute inset-0 bg-[#0A1A1F]/60 backdrop-blur-md cursor-pointer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95,
						y: 20
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						scale: .95,
						y: 20
					},
					transition: {
						duration: .4,
						type: "spring",
						bounce: .15
					},
					className: "relative w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 shadow-2xl overflow-hidden cursor-default",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedIdx(null),
							className: "absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-mono uppercase tracking-[0.2em] text-[#FFB23E] font-bold mb-6 mt-2",
							children: "Answer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-6 leading-tight pr-8",
							children: faqs[selectedIdx].question
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-1 bg-[#FF6A55]/30 rounded-full mb-8" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg sm:text-xl text-slate-600 leading-relaxed",
							children: faqs[selectedIdx].answer
						})
					]
				})]
			}) })
		]
	});
}
function ContactForm() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "demo",
		className: "pb-20 md:pb-28 bg-[#FAF0DC] relative overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2 gap-16 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF6A55]/20 text-[#FF6A55] text-sm font-bold tracking-wide uppercase mb-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-[#FF6A55] animate-pulse" }), "Book a Demo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-6",
						children: ["Ready to automate your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]",
							children: "front office?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-slate-600 mb-8 max-w-xl leading-relaxed font-medium",
						children: "Schedule a personalized walkthrough of Solara. See how our AI handles insurance verification, patient intake, and recall automatically."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4 text-slate-700 font-bold",
						children: [
							"Custom live demonstration of your workflow",
							"Pricing and ROI breakdown for your clinic",
							"Direct integration with your practice management software"
						].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-6 h-6 rounded-full bg-[#FF6A55]/10 flex items-center justify-center text-[#FF6A55] shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-4 h-4",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 3,
										d: "M5 13l4 4L19 7"
									})
								})
							}), item]
						}, i))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					className: "bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] rounded-b-full opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-6",
						onSubmit: (e) => e.preventDefault(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-bold text-slate-700 ml-1",
										children: "Full Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Dr. Sarah Smith",
											className: "w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A55]/20 focus:border-[#FF6A55] transition-all font-medium",
											required: true
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-bold text-slate-700 ml-1",
										children: "Clinic Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Smile Dental",
											className: "w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A55]/20 focus:border-[#FF6A55] transition-all font-medium",
											required: true
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-bold text-slate-700 ml-1",
									children: "Work Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										placeholder: "sarah@smiledental.com",
										className: "w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A55]/20 focus:border-[#FF6A55] transition-all font-medium",
										required: true
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-bold text-slate-700 ml-1",
									children: "Message (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "absolute left-4 top-4 w-5 h-5 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										placeholder: "Tell us about your current software setup...",
										rows: 4,
										className: "w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A55]/20 focus:border-[#FF6A55] transition-all resize-none font-medium"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "w-full py-4 bg-[#FF6A55] hover:bg-[#FF8569] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF6A55]/25 hover:shadow-xl hover:-translate-y-0.5",
								children: ["Request Demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-slate-500 font-bold",
								children: "By submitting, you agree to our Privacy Policy."
							})
						]
					})]
				})]
			})
		})
	});
}
function FinalCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-20 md:py-28 bg-[#060F14] overflow-hidden min-h-screen flex items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#173B42] via-[#0A1A1F] to-[#040A0C]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				animate: { opacity: [
					.15,
					.25,
					.15
				] },
				transition: {
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute top-1/2 left-0 w-[1000px] h-[1000px] bg-[#FF6A55] rounded-full blur-[200px] pointer-events-none -translate-y-1/2 -translate-x-1/2 mix-blend-screen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				animate: { opacity: [
					.1,
					.2,
					.1
				] },
				transition: {
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 2
				},
				className: "absolute top-1/2 right-0 w-[1000px] h-[1000px] bg-[#FFB23E] rounded-full blur-[200px] pointer-events-none -translate-y-1/2 translate-x-1/2 mix-blend-screen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.03] pointer-events-none",
				style: {
					backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
					backgroundSize: "80px 80px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full px-4 sm:px-6 lg:px-12 max-w-[1920px] relative z-10 flex flex-col items-center justify-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .9
						},
						whileInView: {
							opacity: 1,
							scale: 1
						},
						viewport: { once: true },
						className: "inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#FFB23E] text-sm sm:text-base font-bold uppercase tracking-[0.25em] mb-12 shadow-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5" }), "The complete AI front office"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							delay: .1,
							duration: .8,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "text-5xl sm:text-7xl lg:text-[7rem] font-display font-bold text-white mb-10 leading-[1.05] tracking-tight max-w-[1600px] mx-auto",
						children: [
							"Put your whole front desk on",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative inline-block mt-2 sm:mt-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]",
									children: "autopilot."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "absolute -bottom-4 left-0 w-full h-5 text-[#FF6A55]/60",
									viewBox: "0 0 100 10",
									preserveAspectRatio: "none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M0 5 Q 50 10 100 5",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "3"
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							delay: .2,
							duration: .8
						},
						className: "text-xl sm:text-2xl lg:text-3xl text-slate-300 leading-relaxed mb-16 max-w-4xl mx-auto font-light",
						children: ["See exactly how Solara runs your front office: insurance, intake, booking, recall, notes, SEO, and Google Ads automatically. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-white",
							children: "No commitment, no technical setup required."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							delay: .3,
							duration: .8
						},
						className: "flex flex-col items-center justify-center gap-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							"data-cta": "book_demo",
							"data-position": "final",
							href: "https://app.solara.supermia.ai/",
							className: "group relative inline-flex items-center justify-center gap-4 px-12 py-6 rounded-[2rem] bg-[#FF6A55] text-white font-bold text-xl lg:text-2xl transition-all hover:scale-105 hover:bg-[#ff7a68] shadow-[0_0_80px_rgba(255,106,85,0.4)] active:scale-95",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-7 h-7" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Get Started" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-7 h-7 group-hover:translate-x-2 transition-transform" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FFB23E]/10 border border-[#FFB23E]/20 text-[#FFB23E] font-bold text-base lg:text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-5 h-5" }), "First 2 months free for founding clinics"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center gap-3 text-slate-300 font-medium text-sm lg:text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-4 h-4 text-slate-400" }), " No setup fee"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-4 h-4 text-slate-400" }), " Cancel anytime"]
								})]
							})]
						})]
					})
				]
			})
		]
	});
}
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[color:var(--background)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmoothScroll, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capabilities, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insurance, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Automation, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceBot, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseStudy, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenDental, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comparison, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoundingOffer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			] })
		]
	});
}
//#endregion
export { Landing as component };
