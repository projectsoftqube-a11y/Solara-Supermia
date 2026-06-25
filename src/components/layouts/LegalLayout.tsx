import { ReactNode, useEffect } from "react";
import { SiteHeader } from "../SiteHeader";
import { Footer } from "../sections/Footer";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
  sections?: { id: string; title: string }[];
}

export function LegalLayout({ title, lastUpdated, children, sections = [] }: LegalLayoutProps) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF0DC] selection:bg-[#FF6A55]/20">
      <SiteHeader />
      
      <main className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Abstract Premium Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#FFB23E]/20 to-[#FF6A55]/5 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-bl from-[#16C4B3]/10 to-transparent blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left Sidebar (Sticky) */}
            <div className="lg:col-span-3 hidden lg:block sticky top-32">
              <div className="pr-8 border-r border-slate-200/60 pb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF6A55] mb-6">Contents</h3>
                <nav className="space-y-4">
                  {sections.map((sec) => (
                    <a 
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 max-w-[900px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
              >
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#FF6A55] mb-6">
                  <span>Legal</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-slate-500">{title}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                  {title}
                </h1>
                <p className="text-lg text-slate-500 font-medium">
                  Last Updated: {lastUpdated}
                </p>
              </motion.div>

              {/* The prose content */}
              <div className="prose prose-slate prose-lg lg:prose-xl prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:text-slate-900 prose-h2:mt-16 prose-h2:mb-6 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-[#FF6A55] hover:prose-a:text-[#E55A45] prose-li:text-slate-600 prose-strong:text-slate-900 max-w-none">
                {children}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
