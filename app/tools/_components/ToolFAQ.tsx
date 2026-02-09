import { HelpCircle } from "lucide-react"
import { ToolSectionHeader } from "./ToolSectionHeader"

interface FAQItem {
    question: string
    answer: string
}

interface ToolFAQProps {
    title?: string
    faqs: FAQItem[]
}

export function ToolFAQ({ title = "Frequently Asked Questions", faqs }: ToolFAQProps) {
    return (
        <section>
            <ToolSectionHeader icon={HelpCircle} title={title} />
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-medium ring-1 ring-slate-200">
                                {index + 1}
                            </span>
                            <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
                        </div>
                        <div className="bg-slate-50 px-6 py-4">
                            <p className="text-slate-600 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
