"use client"

import React from "react"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import {
    ShieldCheck,
    ZapOff,
    SearchX,
    FileSearch,
    Fingerprint,
    BookOpen,
    Globe2,
    Calculator,
    Shield
} from "lucide-react"

const insights = [
    {
        icon: Calculator,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Why Check Digits Fail",
        stat: "Mod 10",
        statLabel: "Mathematical Law",
        description: "Most data entry errors happen at the final digit. Our converter uses the official GS1 Modulo 10 algorithm to detect if your code is physically valid before processing it."
    },
    {
        icon: Globe2,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "The &apos;Nested&apos; Zero Trap",
        stat: "0",
        statLabel: "Implicit Prefix",
        description: "A common mistake is treating UPC and EAN as separate systems. In reality, a GTIN-12 (UPC) is simply a GTIN-13 (EAN) with a leading zero. Our tool maps these perfectly."
    },
    {
        icon: Shield,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        statColor: "text-rose-600",
        title: "Compliance is Not Optional",
        stat: "GS1",
        statLabel: "Brand Authority",
        description: "Amazon and major retailers now cross-reference your GTINs against the GS1 GEPIR database. Using unvalidated or 'made-up' codes can lead to permanent account suspension."
    },
    {
        icon: Fingerprint,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        statColor: "text-amber-600",
        title: "Format Integrity",
        stat: "Fixed",
        statLabel: "Digit Count",
        description: "Calculated lengths (12, 13, or 14 digits) are rigid. If your code length doesn't match its format, fulfillment software will reject your inventory at the receiving dock."
    }
]

export default function Guide() {
    return (
        <div className="space-y-24">
            {/* The Hidden Truth About Barcode Validation */}
            <FadeIn delay={0.2} direction="up">
                <section id="hidden-truth">
                    <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-200">
                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">The Hidden Truth About Barcode Validation</h2>
                    </div>

                    <div className="space-y-6">
                        {insights.map((insight, index) => {
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
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-base font-bold text-slate-900">{insight.title}</h3>
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
        </div>
    )
}
