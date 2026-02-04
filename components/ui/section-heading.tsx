"use client";

import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/framer-animations";
import { cn } from "@/lib/utils";
import { SectionDivider } from "./section-divider";

interface SectionHeadingProps {
    title: string;
    description?: string;
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    dividerColor?: "primary" | "blue";
}

export function SectionHeading({
    title,
    description,
    className,
    titleClassName,
    descriptionClassName,
    dividerColor = "blue"
}: SectionHeadingProps) {
    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={cn("text-center max-w-2xl mx-auto mb-12", className)}
        >
            <motion.h2 
                variants={fadeUpVariant}
                className={cn(
                    "font-heading text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.2] mb-5 text-slate-700",
                    titleClassName
                )}
            >
                {title}
            </motion.h2>
            <SectionDivider color={dividerColor} />
            {description && (
                <motion.p 
                    variants={fadeUpVariant}
                    className={cn(
                        "text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-[1.6]",
                        descriptionClassName
                    )}
                >
                    {description}
                </motion.p>
            )}
        </motion.div>
    );
}
