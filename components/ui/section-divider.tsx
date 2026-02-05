"use client";

import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/framer-animations";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
    color?: "primary" | "blue";
    className?: string;
}

export function SectionDivider({ color = "blue", className }: SectionDividerProps) {
    return (
        <motion.div
            variants={fadeUpVariant}
            className={cn(
                "w-20 h-1.5 rounded-full mx-auto mb-6",
                color === "primary" ? "bg-primary" : "bg-blue-600",
                className
            )}
        />
    );
}
