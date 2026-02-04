import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    icon: LucideIcon;
    number?: number;
    title: string;
    className?: string;
    iconClassName?: string;
    numberClassName?: string;
    titleClassName?: string;
}

export function SectionHeader({
    icon: Icon,
    number,
    title,
    className,
    iconClassName,
    numberClassName,
    titleClassName,
}: SectionHeaderProps) {
    return (
        <div className={cn("flex items-center gap-2 text-slate-600", className)}>
            <Icon className={cn("w-4 h-4 text-[#2772ed] flex-shrink-0", iconClassName)} />
            {number !== undefined && (
                <div
                    className={cn(
                        "flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-[#2772ed] text-xs font-bold flex-shrink-0",
                        numberClassName
                    )}
                >
                    {number}
                </div>
            )}
            <span className={cn("text-base md:text-lg font-semibold", titleClassName)}>{title}</span>
        </div>
    );
}
