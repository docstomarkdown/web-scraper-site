"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function GrossMarginOverview() {
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
                    Key concepts on optimizing prices, revenue, and product costs.
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="For sellers who want to price smarter, not just cheaper — the "
                headingAccent="Gross Margin Calculator"
                definition="Pricing a product without knowing your gross margin is one of the most common mistakes in e-commerce. This tool is for online sellers, brand owners, and buyers who need to understand exactly how much of each sale they actually keep after covering product costs — and reverse-engineer the right price or maximum COGS from a target margin. Use it to protect your profitability before you list a single item."
                facts={[
                    {
                        stat: "Margin",
                        label: "Analysis",
                        detail: "Enter your revenue and COGS to instantly know your gross margin % and the exact dollar profit per sale."
                    },
                    {
                        stat: "Reverse",
                        label: "Pricing",
                        detail: "Set a target margin and your cost to instantly calculate the minimum selling price you must charge to hit that goal."
                    },
                    {
                        stat: "COGS",
                        label: "Ceiling",
                        detail: "Know the maximum you can afford to pay for a product at a given price and margin — ideal for negotiating with suppliers."
                    }
                ]}
            />
        </div>
    )
}
