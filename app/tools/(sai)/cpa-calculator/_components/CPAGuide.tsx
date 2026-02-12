"use client"

import { ToolGuide } from "@/app/tools/_shared/components"
import { Calculator, Target, TrendingDown } from "lucide-react"

export function CPAGuide() {
    return (
        <ToolGuide
            title="Understanding CPA (Cost Per Acquisition)"
            items={[
                {
                    title: "What is CPA?",
                    icon: Target,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Cost",
                    statColor: "text-blue-600",
                    statLabel: "Cost to acquire a customer",
                    tooltip: "The total cost of a campaign divided by the number of conversions.",
                    description: "CPA (Cost Per Acquisition) measures the aggregate cost to acquire one paying customer. Unlike CPC (which is just for a click), CPA tells you the actual price of a result."
                },
                {
                    title: "How is it calculated?",
                    icon: Calculator,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "Math",
                    statColor: "text-emerald-600",
                    statLabel: "Spend ÷ Conversions",
                    description: (
                        <div className="space-y-3">
                            <p>There are two main ways to calculate CPA depending on your data:</p>
                            <div>
                                <p className="mb-1 font-medium text-slate-700 text-xs uppercase tracking-wider">Campaign Data</p>
                                <div className="bg-slate-50 border border-slate-200/60 px-3 py-2 rounded-lg text-slate-800 font-mono text-sm inline-block">
                                    CPA = Total Ad Spend / Conversions
                                </div>
                            </div>
                            <div>
                                <p className="mb-1 font-medium text-slate-700 text-xs uppercase tracking-wider">Estimation</p>
                                <div className="bg-slate-50 border border-slate-200/60 px-3 py-2 rounded-lg text-slate-800 font-mono text-sm inline-block">
                                    CPA = CPC / (Conversion Rate / 100)
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    title: "Good vs. Bad CPA",
                    icon: TrendingDown,
                    iconBg: "bg-violet-50",
                    iconColor: "text-violet-500",
                    stat: "< LTV",
                    statColor: "text-violet-600",
                    statLabel: "Target = Less than Lifetime Value",
                    tooltip: "Your CPA must be lower than your customer's value to be profitable.",
                    description: "A \"good\" CPA is simply one that is lower than your Customer Lifetime Value (LTV) or Average Order Value (AOV), leaving enough margin for profit. If your CPA is higher than your LTV, you are losing money on every customer."
                }
            ]}
        />
    )
}
