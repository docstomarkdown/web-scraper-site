"use client"

import React from "react"
import { HelpCircle, BookOpen, LucideIcon, Info } from "lucide-react"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
                {toolComponent}

                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    {/* How to Use Section */}
                    <FadeIn delay={0.1}>
                        <section id="how-to-use" className="relative">
                            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-200">
                                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                    <HelpCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">{howToUseTitle}</h2>
                            </div>

                            <div className="relative max-w-2xl mx-auto pl-4 sm:pl-8">
                                {/* Vertical Connector Line */}
                                <div className="absolute left-[34px] sm:left-[54px] top-8 bottom-8 w-0.5 bg-blue-100 -z-10" />

                                <div className="space-y-6">
                                    {howToUseSteps.map((step, index) => {
                                        const Icon = step.icon
                                        const stepNumber = (index + 1).toString().padStart(2, '0')

                                        return (
                                            <div key={index} className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                                <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                            Step {stepNumber}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                                                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.description }} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    {/* Hidden Truth Section */}
                    <FadeIn delay={0.2}>
                        <section id="insights">
                            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-100">
                                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">{hiddenTruthTitle}</h2>
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
                    <FadeIn delay={0.2}>
                        <ToolFAQ faqs={faqs} />
                    </FadeIn>
                </div>

                {/* CTA Section */}
                <FadeIn delay={0.2} className="mt-24">
                    <CTA />
                </FadeIn>
            </div>
        </div>
    )
}
