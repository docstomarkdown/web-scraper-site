"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { staggerContainer, listItemVariant } from "@/lib/framer-animations";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export interface KeyElement {
    icon?: LucideIcon;
    number?: number;
    title: string;
    description: string;
}

interface KeyElementsProps {
    title: string;
    description?: string;
    elements: KeyElement[];
    id?: string;
    className?: string;
    gridCols?: "2" | "3";
}

export function KeyElements({ 
    title, 
    description, 
    elements, 
    id, 
    className,
    gridCols = "2"
}: KeyElementsProps) {
    const gridClass = gridCols === "3" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        : "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10";

    return (
        <div id={id} className={cn("w-full max-w-[1180px] mx-auto mt-20 mb-16 px-4 md:px-0", className)}>
            <SectionHeading 
                title={title}
                description={description}
                className="mb-16"
            />

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className={gridClass}
            >
                {elements.map((element, index) => (
                    <motion.div 
                        key={index} 
                        variants={listItemVariant}
                        className="flex gap-5 items-start group"
                    >
                        {element.icon ? (
                            <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#2772ed] group-hover:bg-[#2772ed] group-hover:text-white transition-colors duration-300">
                                <element.icon className="w-6 h-6" />
                            </div>
                        ) : element.number !== undefined ? (
                            <div className="shrink-0 relative">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-xl font-bold text-[#2772ed]">{element.number}</span>
                                </div>
                                <div className="absolute inset-0 bg-blue-100 rounded-xl -z-10 translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
                            </div>
                        ) : null}
                        <div>
                            <h3 className="font-semibold text-lg text-slate-700 mb-2 leading-[1.2] group-hover:text-[#2772ed] transition-colors">
                                {element.title}
                            </h3>
                            <p className="text-base text-slate-600 font-normal leading-[1.6]">
                                {element.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
