"use client"
import { MessagesSquare, ChevronRight, LucideIcon } from "lucide-react"
import { ToolSectionHeader } from "./ToolSectionHeader"
import { cn } from "@/lib/utils"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
    question: string
    answer: string
}

interface ToolFAQProps {
    title?: string
    icon?: LucideIcon
    faqs: FAQItem[]
}

export function ToolFAQ({ title = "Frequently Asked Questions", icon = MessagesSquare, faqs }: ToolFAQProps) {
    return (
        <section id="faq">
            <ToolSectionHeader icon={icon} title={title} />

            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <Accordion key={index} type="single" collapsible>
                        <AccordionItem
                            value={`faq-${index}`}
                            className="group bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] data-[state=open]:border-blue-200/80 data-[state=open]:shadow-[0_4px_20px_rgba(59,130,246,0.08)] transition-all duration-300 border-b-0"
                        >
                            <AccordionTrigger className="w-full px-5 py-4 hover:no-underline gap-4 [&>svg]:hidden hover:bg-slate-50/60 data-[state=open]:bg-blue-50/40 transition-all duration-300 rounded-2xl">
                                <div className="flex items-center gap-3.5 text-left flex-1 min-w-0">
                                    {/* Q badge */}
                                    <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 border border-blue-100/80 group-data-[state=open]:bg-blue-600 group-data-[state=open]:border-blue-600 transition-all duration-300">
                                        <span className="text-[10px] font-black text-blue-600 group-data-[state=open]:text-white leading-none transition-colors duration-300">
                                            Q{index + 1}
                                        </span>
                                    </div>
                                    {/* Question text */}
                                    <h3 className="text-[14.5px] font-semibold text-slate-700 group-data-[state=open]:text-blue-700 transition-colors duration-300 leading-snug flex-1 min-w-0">
                                        {faq.question}
                                    </h3>
                                </div>
                                {/* Chevron */}
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 group-data-[state=open]:bg-blue-100 flex items-center justify-center transition-all duration-300">
                                    <ChevronRight className="w-3 h-3 text-slate-400 group-data-[state=open]:text-blue-600 transition-all duration-300 group-data-[state=open]:rotate-90" />
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="px-5 pb-5 pt-0">
                                {/* Answer indented to align with question text */}
                                <div className="pl-[calc(1.75rem+14px)] border-t border-blue-100/60 pt-3.5 mt-0.5">
                                    <p
                                        className="text-[13.5px] text-slate-500 leading-relaxed font-medium [&_strong]:font-bold [&_strong]:text-slate-600 [&_em]:not-italic [&_em]:font-semibold [&_em]:text-blue-600"
                                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </section>
    )
}
