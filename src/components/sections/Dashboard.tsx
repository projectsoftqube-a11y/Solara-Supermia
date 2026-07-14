import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDownRight, LayoutDashboard } from "lucide-react";

function Stat({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const out = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  useEffect(() => {
    if (inView) return animate(mv, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] }).stop;
  }, [inView, mv, value]);
  return <motion.span ref={ref}>{out}</motion.span>;
}

const bars = [12, 22, 38, 50, 62, 70, 55, 42, 32, 48, 60, 38];

export function Dashboard() {
  return (
    <section id="dashboard" className="py-20 md:py-28 bg-[#FAF0DC] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6A55]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px] relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6A55]/10 border border-[#FF6A55]/20 mb-6 shadow-sm"
          >
            <LayoutDashboard className="w-4 h-4 text-[#FF6A55]" />
            <span className="text-sm font-bold text-[#FF6A55] uppercase tracking-wider">Dashboard</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight"
          >
            One dashboard for appointments, patients, revenue, and <span className="text-[#FF6A55]">insurance</span>.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium"
          >
            Across every location - switch between Calls, Bookings, and Revenue and change the range. Real dashboard preview data.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Ambient Glow behind Dashboard */}
          <div className="absolute inset-0 bg-[#FF6A55]/15 blur-[100px] rounded-[40px] pointer-events-none" />

          {/* Minimalist Dashboard Widget */}
          <div className="relative mt-16 rounded-[32px] p-[1px] overflow-hidden bg-[color:var(--border)] shadow-[0_32px_80px_rgba(15,23,42,0.10)]">
            {/* Rotating Border Effect */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_340deg,#FF6A55_360deg)] opacity-70"
            />
            
            <div className="relative h-full w-full overflow-hidden rounded-[31px] bg-[color:var(--card)]">
              {/* Shine Effect */}
              <motion.div
                initial={{ x: "-200%" }}
                animate={{ x: "400%" }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  repeatDelay: 5, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 z-50 w-[30%] bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[20deg] pointer-events-none mix-blend-overlay"
              />

              <div className="relative flex items-center justify-between border-b border-[color:var(--divider)] px-6 py-4 flex-wrap gap-4 z-10">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-[color:var(--primary)] text-white text-mono text-[12px] font-bold grid place-items-center">S</div>
                <span className="text-[13px] font-medium text-[color:var(--foreground)]">Solara Console</span>
                <span className="text-mono text-[11px] text-[color:var(--muted-foreground)] hidden sm:inline">· Northside Family Dental</span>
              </div>
              <div className="flex gap-2">
                {["7 days", "30 days", "90 days"].map((t, i) => (
                  <button key={t} className={`rounded-lg px-4 py-1.5 text-[12px] ${i === 1 ? "bg-[color:var(--foreground)] text-white" : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-px bg-[color:var(--divider)] md:grid-cols-4">
              {[
                { k: "Appointments booked", v: 142, delta: "+22% vs prev. 30 days", up: true },
                { k: "Insurance verified", v: 231, delta: "+26% vs prev. 30 days", up: true },
                { k: "Forms completed", v: 188, delta: "+31% vs prev. 30 days", up: true },
                { k: "Revenue impact", v: 47, suffix: "k", prefix: "$", delta: "+27% vs prev. 30 days", up: true },
              ].map((s) => (
                <div key={s.k} className="bg-[color:var(--card)] p-6">
                  <div className="text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">{s.k}</div>
                  <div className="text-display mt-2 text-[32px] text-[color:var(--foreground)]">
                    <Stat value={s.v} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className={`mt-2 inline-flex items-center gap-1 text-[12px] ${s.up ? "text-[color:var(--success)]" : "text-[color:var(--destructive)]"}`}>
                    {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {s.delta}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-px bg-[color:var(--divider)] lg:grid-cols-[2fr_1fr]">
              <div className="bg-[color:var(--card)] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-medium text-[color:var(--foreground)]">Bookings by hour</div>
                    <div className="text-[12px] text-[color:var(--muted-foreground)]">30 days</div>
                  </div>
                  <span className="text-mono text-[11px] text-[color:var(--primary)]">+34% trend</span>
                </div>
                <div className="mt-8 flex h-40 items-end gap-2">
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: `${h}%`, transformOrigin: "bottom" }}
                      className={`flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-[color:var(--primary)]" : "bg-[color:var(--muted)]"}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-mono text-[10px] text-[color:var(--muted-foreground)]">
                  <span>8 AM</span><span>10 AM</span><span>12 PM</span><span>2 PM</span><span>4 PM</span><span>6 PM</span>
                </div>
              </div>
              <div className="bg-[color:var(--card)] p-6">
                <div className="text-[14px] font-medium text-[color:var(--foreground)]">By provider</div>
                <ul className="mt-5 space-y-4">
                  {[
                    { k: "Dr. Lee", v: 39, c: "var(--primary)" },
                    { k: "Dr. Lin", v: 34, c: "#0f172a" },
                    { k: "Dr. Carter", v: 27, c: "#9ca3af" },
                  ].map((r) => (
                    <li key={r.k}>
                      <div className="flex justify-between text-[12px] text-[color:var(--foreground)]">
                        <span>{r.k}</span>
                        <span className="text-mono text-[color:var(--muted-foreground)]">{r.v}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[color:var(--muted)]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${r.v}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          style={{ background: r.c }}
                          className="h-full"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium italic mt-4 text-center">
            Interactive demo with preview data. Real numbers from your clinic after you go live.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
