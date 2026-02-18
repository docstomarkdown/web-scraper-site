// create a  new tool under the folder madhu ------- withput using API .
// the tool should created in a format with thecomponents  following the tooltemplate
// Update the contents according to my tool ,it should have the optimized version to the other avialble same tools in the website

// update the components according to the current updation of the tool 
// 1.How to Use This Tool.
// 2.The Hidden Truth About This Process
// 3.Frequently Asked Questions


"use client"

import React from "react"
import { HelpCircle, BookOpen, LucideIcon, Info, RefreshCw, Copy, Check } from "lucide-react"
import { FadeIn, ToolFAQ, Counter } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { CTA } from "@/components/sections/CTA"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"

export { Counter, FadeIn }

export interface MadhuSubHeaderProps {
    title: string
    icon?: LucideIcon | React.ElementType
    className?: string
    withDot?: boolean
}

export function MadhuSubHeader({ title, icon: Icon, className, withDot = true }: MadhuSubHeaderProps) {
    return (
        <div className={cn("flex items-center gap-2 mb-4", className)}>
            {withDot && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
            <h3 className="text-base font-bold text-slate-400 tracking-tight">{title}</h3>
        </div>
    )
}

export interface InputCardHeaderProps {
    title: string
    subtitle?: string
    icon?: LucideIcon | React.ElementType
    onHelpClick?: () => void
    scrollId?: string
    tooltip?: string
}

export function InputCardHeader({ title, subtitle, icon: Icon, onHelpClick, scrollId, tooltip }: InputCardHeaderProps) {
    const handleHelp = () => {
        if (onHelpClick) {
            onHelpClick()
        } else if (scrollId) {
            const element = document.getElementById(scrollId)
            if (element) {
                const offset = 100 // Adjust this value for desired top spacing
                const elementPosition = element.getBoundingClientRect().top + window.scrollY
                const offsetPosition = elementPosition - offset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                })
            }
        }
    }

    const showHelp = !!onHelpClick || !!scrollId

    return (
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
                        <Icon className="w-6 h-6" />
                    </div>
                )}
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-blue-600 tracking-tight">{title}</h2>
                        {showHelp && (
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={handleHelp}
                                            className="text-slate-400 hover:text-blue-600 transition-colors"
                                        >
                                            <HelpCircle className="h-5 w-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                        {tooltip || "How to use this tool"}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    {subtitle && <p className="text-sm text-slate-500 font-medium">{subtitle}</p>}
                </div>
            </div>
        </div>
    )
}

interface ActionButtonsProps {
    onReset: () => void
    onCopy: () => void
    copyDisabled?: boolean
    isCopied?: boolean
    className?: string
}

export function ActionButtons({ onReset, onCopy, copyDisabled, isCopied, className }: ActionButtonsProps) {
    return (
        <div className={cn("flex gap-3", className)}>
            <Button
                variant="outline"
                className="flex-[2] h-11 border-dashed border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all font-medium rounded-xl"
                onClick={onReset}
            >
                <RefreshCw className="w-4 h-4 mr-2" /> Reset Input
            </Button>
            <Button
                onClick={onCopy}
                variant="outline"
                disabled={copyDisabled}
                className={cn(
                    "flex-[3] h-11 px-6 shadow-sm border-slate-200 transition-all font-bold text-slate-950 disabled:opacity-30 rounded-xl",
                    isCopied ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100" : "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                )}
            >
                {isCopied ? (
                    <>
                        <Check className="w-4 h-4 mr-2" /> Copied!
                    </>
                ) : (
                    <>
                        <Copy className="w-4 h-4 mr-2" /> Copy Results
                    </>
                )}
            </Button>
        </div>
    )
}

export interface Step {
    title: string
    description: string
    icon: LucideIcon | React.ElementType
}

export interface Insight {
    title: string
    description: string
    icon: LucideIcon | React.ElementType
    stat: string
    statLabel: string
    iconBg: string
    iconColor: string
    statColor: string
    tooltip?: string
}

export interface FAQ {
    question: string
    answer: string
}

interface MadhuToolTemplateProps {
    title: string
    toolComponent: React.ReactNode

    // How to Use Section
    howToUseTitle?: string
    howToUseSteps: Step[]
    howToUseGoal?: {
        title: string
        description: string
        icon: LucideIcon | React.ElementType
    }

    // Hidden Truth Section
    hiddenTruthTitle?: string
    hiddenTruthInsights: Insight[]

    // FAQ Section
    faqs: FAQ[]
}

export function MadhuToolTemplate({
    title,
    toolComponent,
    howToUseTitle = "How to Use This Tool",
    howToUseSteps,
    howToUseGoal,
    hiddenTruthTitle = "The Hidden Truth About This Process",
    hiddenTruthInsights,
    faqs
}: MadhuToolTemplateProps) {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            {title}
                        </h1>
                    </FadeIn>
                </div>

                {/* Main Tool Component */}
                <div className="space-y-24">
                    {toolComponent}

                    {/* How to Use Section */}
                    <FadeIn delay={0.1}>
                        <section id="how-to-use" className="relative max-w-4xl mx-auto">
                            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                                <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                    <HelpCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{howToUseTitle}</h2>
                            </div>

                            <div className="max-w-3xl mx-auto space-y-6">
                                {howToUseSteps.map((step, index) => {
                                    const Icon = step.icon
                                    const stepNumber = (index + 1).toString().padStart(2, '0')

                                    return (
                                        <div key={index} className="group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                            <div className="flex items-start gap-4 sm:gap-6">
                                                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 transition-transform duration-300 group-hover:scale-110">
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="mb-1">
                                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                            Step {stepNumber}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                                                    <p className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.description }} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                {/* Goal Step */}
                                {howToUseGoal && (
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-blue-50/50 p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-sm transition-all duration-300">
                                        <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white z-10 shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-110">
                                            {(() => {
                                                const GoalIcon = howToUseGoal.icon
                                                return <GoalIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                                            })()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[10px] font-bold text-white bg-blue-600 px-3 py-1 rounded-full uppercase tracking-wider shadow-md">The Goal</span>
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-tight">{howToUseGoal.title}</h3>
                                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium opacity-90" dangerouslySetInnerHTML={{ __html: howToUseGoal.description }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </FadeIn>

                    {/* Hidden Truth Section */}
                    <FadeIn delay={0.2}>
                        <section id="insights" className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                                <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-blue-600 tracking-tight">{hiddenTruthTitle}</h2>
                            </div>

                            <div className="space-y-6">
                                {hiddenTruthInsights.map((insight, index) => {
                                    const Icon = insight.icon
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                {/* Left: Content */}
                                                <div className="flex-1 p-6 order-2 md:order-1">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className={`w-9 h-9 rounded-xl ${insight.iconBg} ${insight.iconColor} flex items-center justify-center border border-slate-100/50`}>
                                                            <Icon className="w-4.5 h-4.5" />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-base font-bold text-slate-900">{insight.title}</h3>
                                                            {insight.tooltip && (
                                                                <TooltipProvider delayDuration={100}>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                                                                <Info className="h-3.5 w-3.5" />
                                                                            </button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800 p-2 rounded-lg">
                                                                            {insight.tooltip}
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-slate-600 leading-relaxed">
                                                        {insight.description}
                                                    </p>
                                                </div>

                                                {/* Right: Takeaway Stat Panel */}
                                                <div className="flex md:flex-col items-center justify-center gap-1.5 p-6 md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2">
                                                    <div className={`text-3xl font-bold ${insight.statColor} tracking-tight`}>{insight.stat}</div>
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100/50 px-2 py-0.5 rounded-full">
                                                        Takeaway
                                                    </div>
                                                    <div className="text-[11px] font-medium text-slate-500 text-center leading-tight mt-1 max-w-[120px]">
                                                        {insight.statLabel}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2} className="max-w-4xl mx-auto">
                        <ToolFAQ faqs={faqs} />
                    </FadeIn>

                    {/* CTA Section */}
                    <FadeIn delay={0.2} className="mt-24 max-w-7xl mx-auto">
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
