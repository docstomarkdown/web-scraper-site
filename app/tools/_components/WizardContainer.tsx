"use client";

import React, { createContext, useContext, useState, ReactNode, Children, isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, HelpCircle, LucideIcon, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

// ============================================================================
// WIZARD CONTEXT
// ============================================================================
interface WizardContextType {
    activeStep: number;
    furthestStep: number;
    totalSteps: number;
    goToStep: (step: number) => void;
    goToNextStep: () => void;
    isStepActive: (step: number) => boolean;
    isStepReachable: (step: number) => boolean;
    isStepUpcoming: (step: number) => boolean;
    isLastStep: (step: number) => boolean;
    scrollToGuide: () => void;
}

const WizardContext = createContext<WizardContextType | null>(null);

const useWizard = () => {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error("WizardStep must be used within a WizardContainer");
    }
    return context;
};

// ============================================================================
// WIZARD CONTAINER
// ============================================================================
interface WizardContainerProps {
    children: ReactNode;
    /** Custom completion title for the last step */
    completionTitle?: string;
    /** Custom completion subtitle for the last step */
    completionSubtitle?: string;
    /** ID of the guide section to scroll to */
    guideId?: string;
    className?: string;
}

export const WizardContainer = ({
    children,
    completionTitle = "Your document is ready.",
    completionSubtitle = "Please review the preview panel to download your PDF.",
    guideId = "how-it-works",
    className,
}: WizardContainerProps) => {
    const [activeStep, setActiveStep] = useState(1);
    const [furthestStep, setFurthestStep] = useState(1);

    // Count the number of WizardStep children
    const stepChildren = Children.toArray(children).filter(
        (child) => isValidElement(child) && child.type === WizardStep
    );
    const totalSteps = stepChildren.length;

    const goToStep = (step: number) => {
        if (step >= 1 && step <= totalSteps) {
            setActiveStep(step);
        }
    };

    const goToNextStep = () => {
        if (activeStep < totalSteps) {
            const nextStep = activeStep + 1;
            setFurthestStep(Math.max(furthestStep, nextStep));
            setActiveStep(nextStep);
        }
    };

    const isStepActive = (step: number) => step === activeStep;
    const isStepReachable = (step: number) => step !== activeStep;
    // We keep this distinguishing "upcoming" steps if needed for other logic, 
    // but with the new isStepReachable logic, they will be considered reachable regardless.
    const isStepUpcoming = (step: number) => step > furthestStep;
    const isLastStep = (step: number) => step === totalSteps;

    const scrollToGuide = () => {
        document.getElementById(guideId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const contextValue: WizardContextType = {
        activeStep,
        furthestStep,
        totalSteps,
        goToStep,
        goToNextStep,
        isStepActive,
        isStepReachable,
        isStepUpcoming,
        isLastStep,
        scrollToGuide,
    };

    // Clone children to pass the completionTitle/completionSubtitle to the last step
    const enhancedChildren = Children.map(children, (child) => {
        if (isValidElement(child) && child.type === WizardStep) {
            const stepNumber = (child.props as WizardStepProps).number;
            if (stepNumber === totalSteps) {
                return cloneElement(child as React.ReactElement<any>, {
                    _completionTitle: completionTitle,
                    _completionSubtitle: completionSubtitle,
                });
            }
        }
        return child;
    });

    return (
        <WizardContext.Provider value={contextValue}>
            <div className={cn("flex flex-col gap-4 mx-auto w-full max-w-[1180px]", className)}>
                <style jsx global>{`
                    input:focus, select:focus, textarea:focus {
                      transform: translateY(-1px);
                      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                `}</style>
                {enhancedChildren}
            </div>
        </WizardContext.Provider>
    );
};

// ============================================================================
// WIZARD STEP
// ============================================================================
interface WizardStepProps {
    number: number;
    title: string;
    icon?: LucideIcon;
    id?: string;
    showHelp?: boolean;
    children: ReactNode;
    className?: string;
    /** Internal: passed by WizardContainer to last step */
    _completionTitle?: string;
    /** Internal: passed by WizardContainer to last step */
    _completionSubtitle?: string;
}

export const WizardStep = ({
    number,
    title,
    icon: Icon,
    id,
    showHelp = true,
    children,
    className,
    _completionTitle,
    _completionSubtitle,
}: WizardStepProps) => {
    const wizard = useWizard();

    const isActive = wizard.isStepActive(number);
    const isReachable = wizard.isStepReachable(number);
    const isUpcoming = wizard.isStepUpcoming(number);
    const isLast = wizard.isLastStep(number);
    const isOpen = isActive;

    // Generate classes based on state
    let cardClasses = "";
    let headerClasses = "";
    let numberClasses = "";
    let titleClasses = "";
    let chevronContainerClasses = "";
    let chevronIconClasses = "";

    if (isActive) {
        // Blue Active State - Highlighted
        cardClasses = "ring-2 ring-[#2772ed]/20 shadow-md bg-white border border-slate-200 border-l-4 border-l-[#2772ed]";
        headerClasses = "bg-blue-100 hover:bg-blue-100 cursor-pointer border-b border-blue-200";
        numberClasses = "bg-[#2772ed] border-[#2772ed] text-white";
        titleClasses = "text-slate-900 font-semibold";
        chevronContainerClasses = "bg-blue-100 w-7 h-7 flex items-center justify-center rounded-full ring-2 ring-blue-200/50";
        chevronIconClasses = "text-[#2772ed] w-4 h-4";
    } else if (isReachable) {
        // Inactive but Visited/Reachable
        cardClasses = "bg-white shadow-sm border border-slate-200 border-l-4 border-l-[#2772ed] hover:shadow-md transition-all";
        headerClasses = "bg-slate-100 hover:bg-slate-200/80 cursor-pointer group border-b border-slate-200";
        numberClasses = "bg-white border-slate-300 text-slate-500 scale-90 group-hover:border-[#2772ed] group-hover:text-[#2772ed] transition-colors";
        titleClasses = "text-slate-700 font-medium group-hover:text-slate-900 transition-colors";
        chevronContainerClasses = "bg-white w-8 h-8 flex items-center justify-center rounded-full ring-1 ring-slate-200 group-hover:bg-[#2772ed]/10 group-hover:text-[#2772ed] group-hover:ring-blue-200 transition-all shadow-sm";
        chevronIconClasses = "text-slate-500 w-4 h-4";
    } else {
        // Locked/Upcoming
        cardClasses = "bg-white shadow-sm border border-slate-200 border-l-4 border-l-slate-300";
        headerClasses = "bg-slate-100 cursor-not-allowed border-b border-slate-200";
        numberClasses = "bg-slate-100 border-slate-200 text-slate-400 scale-90";
        titleClasses = "text-slate-500";
        chevronContainerClasses = "w-8 h-8 flex items-center justify-center";
        chevronIconClasses = "text-slate-300 w-4 h-4";
    }

    const handleClick = () => {
        wizard.goToStep(number);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Handle Enter key - DISABLED as per user request (allow default behavior/stay in current cell)
        /*
        if (e.key === 'Enter' && !e.shiftKey && !isLast) {
            const target = e.target as HTMLElement;
            // Only trigger if not in a textarea
            if (target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                wizard.goToNextStep();
            }
        }
        */
    };

    const handleHelpClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        wizard.scrollToGuide();
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
                    {showHelp && (
                        <button
                            onClick={handleHelpClick}
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
                    {isLast ? (
                        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                <p className="text-base font-semibold text-slate-800">
                                    {_completionTitle || "Your document is ready."}
                                </p>
                                <p className="text-sm text-[#2772ed]">
                                    {_completionSubtitle || "Please review the preview panel to download your PDF."}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3">
                            {number > 1 && (
                                <Button
                                    variant="outline"
                                    onClick={() => wizard.goToStep(number - 1)}
                                    className="px-4"
                                    title="Go Back"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                            )}
                            <Button
                                onClick={wizard.goToNextStep}
                                className="bg-[#2772ed] hover:bg-[#1e5fd1] text-white px-6 gap-2"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            )
            }
        </Card >
    );
};

// Re-export from the same file for convenience
export { useWizard };
export type { WizardContextType, WizardContainerProps, WizardStepProps };
