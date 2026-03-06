"use client"
import { MessagesSquare, ChevronDown, LucideIcon } from "lucide-react"
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
            {/* Single container card */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`faq-${index}`}
                            className={cn(
                                "group border-b-0",
                                index < faqs.length - 1 && "border-b border-slate-100"
                            )}
                        >
                            <AccordionTrigger className="w-full px-6 sm:px-8 py-5 hover:no-underline gap-4 [&>svg]:hidden hover:bg-slate-50/50 transition-all duration-300">
                                <div className="flex items-center gap-4 text-left flex-1 min-w-0">
                                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 font-bold text-xs ring-1 ring-inset ring-blue-500/5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                                        Q{index + 1}
                                    </div>
                                    <h3 className="text-[18px] font-bold text-slate-600 group-data-[state=open]:text-blue-700 transition-colors leading-snug flex-1 min-w-0">
                                        {faq.question}
                                    </h3>
                                </div>
                                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-50 group-data-[state=open]:bg-blue-50 flex items-center justify-center transition-all duration-300">
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-data-[state=open]:text-blue-500 transition-all duration-300 group-data-[state=open]:rotate-180" />
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 sm:px-8 pb-6 pt-0">
                                <div className="pl-12">
                                    <p
                                        className="text-[14.5px] text-slate-500 leading-relaxed font-medium [&_strong]:font-bold [&_strong]:text-slate-500 [&_em]:not-italic [&_em]:font-semibold [&_em]:text-blue-600"
                                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
