import { MessagesSquare } from "lucide-react"
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
            <ToolSectionHeader icon={MessagesSquare} title={title} />
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="group bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
                    >
                        <div className="p-6 sm:p-7">
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                                {faq.question}
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-[15px] font-medium" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
