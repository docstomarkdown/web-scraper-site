"use client";

import { cn } from "@/lib/utils";

interface SectionDividerProps {
    color?: "primary" | "blue";
    className?: string;
}

export function SectionDivider({ 
    color = "blue",
    className 
}: SectionDividerProps) {
    const bgColor = color === "primary" ? "bg-primary/20" : "bg-[#2772ed]/20";
    
    return (
        <div className={cn("flex items-center justify-center mb-5", className)}>
            <div className={cn("w-1.5 h-1.5 rounded-full", bgColor)}></div>
        </div>
    );
}
