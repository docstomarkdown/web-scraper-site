"use client"
import { useState } from "react"
import { MessagesSquare, ChevronDown, MessageCircleQuestion } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface FAQItem {
    question: string
    answer: string
}

interface PremiumToolFAQProps {
    title?: string
    faqs: FAQItem[]
}

export function PremiumToolFAQ({ title = "Frequently Asked Questions", faqs }: PremiumToolFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section id="faq">
            <div className="mb-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-sky-400/20 rounded-xl blur-md" />
                        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
                            <MessagesSquare className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h2 className="text-[24px] sm:text-[28px] font-bold text-slate-800 tracking-tight">{title}</h2>
                </div>
            </div>

            <div className="space-y-3">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: index * 0.06 }}
                        >
                            <div
                                className={cn(
                                    "relative bg-white rounded-2xl border overflow-hidden transition-all duration-300",
                                    isOpen
                                        ? "border-blue-200/80 shadow-[0_4px_24px_-8px_rgba(59,130,246,0.15)]"
                                        : "border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_-6px_rgba(0,0,0,0.08)] hover:border-slate-300/60"
                                )}
                            >
                                {/* Question trigger */}
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className={cn(
                                        "w-full flex items-center gap-4 px-6 py-4.5 text-left transition-colors duration-200",
                                        isOpen ? "bg-gradient-to-r from-blue-50/60 to-indigo-50/40" : "hover:bg-slate-50/60"
                                    )}
                                >
                                    {/* Number badge */}
                                    <div className={cn(
                                        "flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                                        isOpen
                                            ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/25"
                                            : "bg-slate-100 border border-slate-200/60"
                                    )}>
                                        {isOpen ? (
                                            <MessageCircleQuestion className="w-4 h-4 text-white" />
                                        ) : (
                                            <span className="text-[11px] font-black text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                                        )}
                                    </div>

                                    {/* Question */}
                                    <h3 className={cn(
                                        "flex-1 text-[14.5px] font-semibold leading-snug transition-colors duration-200",
                                        isOpen ? "text-blue-700" : "text-slate-700"
                                    )}>
                                        {faq.question}
                                    </h3>

                                    {/* Chevron */}
                                    <div className={cn(
                                        "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
                                        isOpen ? "bg-blue-100 rotate-180" : "bg-slate-100"
                                    )}>
                                        <ChevronDown className={cn(
                                            "w-3.5 h-3.5 transition-colors duration-200",
                                            isOpen ? "text-blue-600" : "text-slate-400"
                                        )} />
                                    </div>
                                </button>

                                {/* Answer */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5">
                                                <div className="ml-12 pt-1 border-t border-blue-100/60">
                                                    <p
                                                        className="text-[13.5px] text-slate-500 leading-relaxed font-medium pt-3.5 [&_strong]:font-semibold [&_strong]:text-slate-600"
                                                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
