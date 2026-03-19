"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function EOQOverview() {
    return (
        <div className="space-y-8">
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
                    Optimize your spending and lower overall inventory costs with smart, mathematical purchasing.
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="For inventory buyers who are tired of guessing order sizes — the "
                headingAccent="EOQ Calculator"
                definition="If you've ever ordered too much stock and sat on dead inventory — or ordered too little and missed sales — this tool is your fix. The Economic Order Quantity Calculator is used by purchasing managers, Amazon sellers, and e-commerce operators to find the mathematically optimal order size. It balances what you spend on placing orders against what you spend on storing goods, so every restock is as cost-efficient as possible."
                facts={[
                    {
                        stat: "Optimal",
                        label: "Order Size",
                        detail: "Calculates the exact number of units to order each time to minimize your combined ordering and holding costs.",
                    },
                    {
                        stat: "Order",
                        label: "Frequency",
                        detail: "Tells you exactly how many times per year to reorder and how many days to wait between each purchase.",
                    },
                    {
                        stat: "Cost",
                        label: "Savings",
                        detail: "Prevents both overstocking (tying up cash) and understocking (losing sales) by hitting the mathematical sweet spot.",
                    },
                ]}
            />
        </div>
    )
}
