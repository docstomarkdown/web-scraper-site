"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function NetProfitOverview() {
    return (
        <div className="space-y-8" id="overview">
            {/* Section Header */}
            <div className="px-1">
                <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/80 shadow-[0_2px_8px_-4px_rgba(59,130,246,0.2)]">
                        <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-[22px] sm:text-[28px] font-bold text-slate-700 tracking-tight leading-tight">
                        Tool Essentials
                        </h2>
                    </div>
                </div>
                <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium leading-relaxed pl-[3.375rem] sm:pl-[4rem] max-w-2xl mt-2">
                    Everything you need to know about calculating your business's true take-home pay.
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="For business owners who want to know what they actually keep — the "
                headingAccent="Net Profit Calculator"
                definition="Revenue is not your income — profit is. This tool is designed for e-commerce sellers, brand founders, and service businesses who want a clear, honest picture of what they take home after every cost is accounted for. From COGS and ad spend to overhead and taxes, this calculator consolidates it all into one number: your true net profit. Expand the income and expense breakdown to see exactly where every dollar goes."
                facts={[
                    {
                        stat: "True",
                        label: "Profit",
                        detail: "Reveals the exact cash you keep after deducting product costs, advertising, overhead, and estimated taxes."
                    },
                    {
                        stat: "Cost",
                        label: "Breakdown",
                        detail: "Expand the interactive dropdown inside the results panel to visualize how every dollar of revenue is distributed across costs."
                    },
                    {
                        stat: "Tax",
                        label: "Aware",
                        detail: "Factors in your estimated tax rate so you never spend money that belongs to the taxman — protecting your cash flow."
                    }
                ]}
            />
        </div>
    )
}
