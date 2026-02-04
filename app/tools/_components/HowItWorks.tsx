"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { staggerContainer, listItemVariant } from "@/lib/framer-animations";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export interface HowItWorksStep {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

interface HowItWorksProps {
    title: string;
    steps: HowItWorksStep[];
    id?: string;
    className?: string;
}

export function HowItWorks({ title, steps, id = "how-it-works", className }: HowItWorksProps) {
    return (
        <div id={id} className={cn("w-full max-w-[1180px] mx-auto mt-20 mb-20 px-4 md:px-0 scroll-mt-24", className)}>
            <SectionHeading 
                title={title}
                className="mb-16"
            />

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
            >
                {/* Connecting Line (Desktop Only) */}
                <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#2772ed]/0 via-[#2772ed]/20 to-[#2772ed]/0 -z-10"></div>

                {steps.map((step, index) => (
                    <motion.div 
                        key={step.id} 
                        variants={listItemVariant}
                        className="relative group"
                    >
                        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#2772ed]/30 transition-all duration-200 h-full flex flex-col items-center text-center">
                            {/* Icon Circle */}
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50/50 group-hover:border-[#2772ed]/20 transition-all duration-300 relative">
                                <step.icon className="w-7 h-7 text-slate-600 group-hover:text-[#2772ed] transition-colors duration-300" />
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#2772ed] text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-sm">
                                    {step.id}
                                </div>
                            </div>

                            <h3 className="font-semibold text-lg text-slate-700 mb-3 leading-[1.2] group-hover:text-[#2772ed] transition-colors">
                                {step.title}
                            </h3>

                            <p className="text-base text-slate-600 font-normal leading-[1.6] text-balance">
                                {step.description}
                            </p>
                        </div>

                        {/* Mobile/Tablet Arrow (hidden on last item) */}
                        {index < steps.length - 1 && (
                            <div className="lg:hidden flex justify-center py-4">
                                <ArrowRight className="w-5 h-5 text-slate-300 rotate-90 md:rotate-0" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
