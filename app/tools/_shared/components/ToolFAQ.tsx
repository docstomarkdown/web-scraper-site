"use client"
import { MessagesSquare, ChevronRight, MessageCircleQuestion, LucideIcon } from "lucide-react"
import { ToolSectionHeader } from "./ToolSectionHeader"
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
                                    {/* Numbered badge → question icon when open */}
                                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 border border-slate-200/60 group-data-[state=open]:bg-gradient-to-br group-data-[state=open]:from-blue-500 group-data-[state=open]:to-blue-600 group-data-[state=open]:border-transparent group-data-[state=open]:shadow-md group-data-[state=open]:shadow-blue-500/25 transition-all duration-300">
                                        <span className="text-[11px] font-black text-slate-400 leading-none group-data-[state=open]:hidden">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <MessageCircleQuestion className="w-4 h-4 text-white hidden group-data-[state=open]:block" />
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
                                <div className="ml-[calc(2rem+14px)] border-t border-blue-100/60 pt-3.5 mt-0.5">
                                    <p
                                        className="text-[13.5px] text-slate-500 leading-relaxed font-medium [&_strong]:font-semibold [&_strong]:text-slate-600 [&_em]:not-italic [&_em]:font-semibold [&_em]:text-slate-500"
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
