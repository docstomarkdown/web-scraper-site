"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, HelpCircle, LucideIcon, ArrowRight, CheckCircle2 } from "lucide-react";

export type WizardCardState = "active" | "reachable" | "upcoming";

interface WizardCardProps {
    id?: string;
    icon?: LucideIcon;
    number: number;
    title: string;
    isOpen: boolean;
    state: WizardCardState;
    onToggle?: () => void;
    onHelpClick?: (e: React.MouseEvent) => void;
    showHelp?: boolean;
    children: ReactNode;
    className?: string;
    /** If true, shows "Next" button at the bottom of the card content */
    showNextButton?: boolean;
    /** Callback when Next button is clicked */
    onNext?: () => void;
    /** If true, shows completion message instead of Next button (for last card) */
    isLastCard?: boolean;
    /** Custom completion message title */
    completionTitle?: string;
    /** Custom completion message subtitle */
    completionSubtitle?: string;
}

/**
 * WizardCard - Common wizard-style card component for all tool editors.
 * 
 * States:
 * - active: Currently expanded, blue highlighted
 * - reachable: Can be clicked to expand, grey with hover effects
 * - upcoming: Locked, cannot be clicked, subdued appearance
 */
export const WizardCard = ({
    id,
    icon: Icon,
    number,
    title,
    isOpen,
    state,
    onToggle,
    onHelpClick,
    showHelp = true,
    children,
    className,
    showNextButton = true,
    onNext,
    isLastCard = false,
    completionTitle = "Your document is ready.",
    completionSubtitle = "Please review the preview panel to download your PDF.",
}: WizardCardProps) => {
    // Generate classes based on state
    let cardClasses = "";
    let headerClasses = "";
    let numberClasses = "";
    let titleClasses = "";
    let chevronContainerClasses = "";
    let chevronIconClasses = "";

    if (state === "active") {
        // Blue Active State - Highlighted
        cardClasses = "ring-2 ring-[#2772ed]/20 shadow-md bg-white border border-slate-200 border-l-4 border-l-[#2772ed]";
        headerClasses = "bg-blue-100 hover:bg-blue-100 cursor-pointer border-b border-blue-200";
        numberClasses = "bg-[#2772ed] border-[#2772ed] text-white";
        titleClasses = "text-slate-900 font-semibold";
        chevronContainerClasses = "bg-blue-100 w-7 h-7 flex items-center justify-center rounded-full ring-2 ring-blue-200/50";
        chevronIconClasses = "text-[#2772ed] w-4 h-4";
    } else if (state === "reachable") {
        // Inactive but Visited/Reachable - Visible Card with Header Highlight
        cardClasses = "bg-white shadow-sm border border-slate-200 border-l-4 border-l-[#2772ed] hover:shadow-md transition-all";
        headerClasses = "bg-slate-100 hover:bg-slate-200/80 cursor-pointer group border-b border-slate-200";
        numberClasses = "bg-white border-slate-300 text-slate-500 scale-90 group-hover:border-[#2772ed] group-hover:text-[#2772ed] transition-colors";
        titleClasses = "text-slate-700 font-medium group-hover:text-slate-900 transition-colors";
        chevronContainerClasses = "bg-white w-8 h-8 flex items-center justify-center rounded-full ring-1 ring-slate-200 group-hover:bg-[#2772ed]/10 group-hover:text-[#2772ed] group-hover:ring-blue-200 transition-all shadow-sm";
        chevronIconClasses = "text-slate-500 w-4 h-4";
    } else {
        // Locked/Upcoming - Visible but Subdued
        cardClasses = "bg-white shadow-sm border border-slate-200 border-l-4 border-l-slate-300";
        headerClasses = "bg-slate-100 cursor-not-allowed border-b border-slate-200";
        numberClasses = "bg-slate-100 border-slate-200 text-slate-400 scale-90";
        titleClasses = "text-slate-500";
        chevronContainerClasses = "w-8 h-8 flex items-center justify-center";
        chevronIconClasses = "text-slate-300 w-4 h-4";
    }

    const handleClick = () => {
        if (state !== "upcoming" && onToggle) {
            onToggle();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Handle Enter key - DISABLED as per user request
        /*
        if (e.key === 'Enter' && !e.shiftKey && showNextButton && onNext && !isLastCard) {
            const target = e.target as HTMLElement;
            // Only trigger if not in a textarea or multi-line input
            if (target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                onNext();
            }
        }
        */
    };

    return (
        <Card
            id={id}
            className={cn(
                "border-none transition-all duration-300 overflow-hidden",
                cardClasses,
                className
            )}
            onKeyDown={handleKeyDown}
        >
            <CardHeader
                className={cn(
                    "py-3 px-4 md:px-[18px] flex flex-row items-center justify-between transition-colors",
                    headerClasses
                )}
                onClick={handleClick}
            >
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors",
                        numberClasses
                    )}>
                        {number}
                    </div>
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
                        <CardTitle className={cn(
                            "text-base font-bold transition-colors",
                            titleClasses
                        )}>
                            {title}
                        </CardTitle>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {showHelp && onHelpClick && (
                        <button
                            onClick={onHelpClick}
                            className="p-1 hover:bg-slate-100 rounded transition-colors"
                            title="View guide"
                        >
                            <HelpCircle className="w-4 h-4 text-slate-400 hover:text-[#2772ed]" />
                        </button>
                    )}
                    <div className={cn("transition-all duration-300", chevronContainerClasses)}>
                        {isOpen ? (
                            <ChevronUp className={chevronIconClasses} />
                        ) : (
                            <ChevronDown className={chevronIconClasses} />
                        )}
                    </div>
                </div>
            </CardHeader>

            {/* Section Content */}
            {isOpen && (
                <CardContent className="p-4 md:p-6 animate-in slide-in-from-top-2 duration-200">
                    {children}

                    {/* Next Button or Completion Message */}
                    {isLastCard ? (
                        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                <p className="text-base font-semibold text-slate-800">{completionTitle}</p>
                                <p className="text-sm text-[#2772ed]">{completionSubtitle}</p>
                            </div>
                        </div>
                    ) : showNextButton && onNext ? (
                        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                            <Button
                                onClick={onNext}
                                className="bg-[#2772ed] hover:bg-[#1e5fd1] text-white px-6 gap-2"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : null}
                </CardContent>
            )}
        </Card>
    );
};

export default WizardCard;
