"use client";

import { motion } from "framer-motion";
import { staggerContainer, listItemVariant } from "@/lib/framer-animations";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    questions: FAQItem[];
    heading?: string;
    subheading?: string;
    className?: string;
    id?: string;
}

export function FAQ({ 
    questions, 
    heading = "Frequently Asked Questions",
    subheading,
    className,
    id = "faq-section"
}: FAQProps) {
    return (
        <div id={id} className={cn("w-full max-w-5xl mx-auto mt-16 mb-16 px-4 scroll-mt-24", className)}>
            <SectionHeading 
                title={heading}
                description={subheading}
            />
            
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {questions.map((item, index) => (
                    <motion.div 
                        key={index} 
                        variants={listItemVariant}
                        className="p-6 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300/80 hover:shadow-sm transition-all duration-200"
                    >
                        <h3 className="font-semibold text-lg text-slate-700 mb-3 leading-[1.2] pb-3 border-b border-slate-200/60">
                            {item.question}
                        </h3>
                        <p className="text-base text-slate-600 font-normal leading-[1.6] pt-2">
                            {item.answer}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
