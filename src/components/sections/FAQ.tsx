import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";

const faqs = [
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

export function FAQ() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIdx]);

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF0DC] relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FF6A55]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-12 max-w-[1920px] relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight"
          >
            Questions Dental Teams Ask Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Short answers to the questions that come up before clinics go live.
          </motion.p>
        </div>

        {/* Clean, static Grid of Questions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {faqs.map((faq, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              onClick={() => setSelectedIdx(idx)}
              className="group flex flex-col text-left justify-between bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 h-full min-h-[140px] transition-all duration-300 hover:border-[#FF6A55]/40 hover:shadow-lg hover:shadow-[#FF6A55]/5 hover:-translate-y-1"
            >
              <h3 className="text-[15px] sm:text-[17px] font-bold text-slate-800 leading-snug group-hover:text-[#FF6A55] transition-colors pr-4">
                {faq.question}
              </h3>
              
              <div className="mt-6 flex items-center text-[#FF6A55] text-sm font-bold gap-1.5 transition-all">
                Read more <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Pop-up Modal overlay */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedIdx(null)}
              className="absolute inset-0 bg-[#0A1A1F]/60 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 shadow-2xl overflow-hidden cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FFB23E] font-bold mb-6 mt-2">
                Answer
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-6 leading-tight pr-8">
                {faqs[selectedIdx].question}
              </h3>
              
              <div className="w-12 h-1 bg-[#FF6A55]/30 rounded-full mb-8" />
              
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                {faqs[selectedIdx].answer}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
