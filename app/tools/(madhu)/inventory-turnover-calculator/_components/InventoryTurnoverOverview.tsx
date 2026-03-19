"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function InventoryTurnoverOverview() {
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
                    Understand how quickly your business is selling and replacing its inventory, and how many days it takes to turn stock into cash.
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="For sellers who want to know if their stock is working for them — the "
                headingAccent="Inventory Turnover Calculator"
                definition="Slow-moving inventory is one of the silent killers of e-commerce profitability. This tool is used by warehouse managers, Amazon sellers, and retail buyers to measure how efficiently their stock is being sold and replenished. Enter your COGS and inventory values to instantly see your turnover ratio and exactly how many days your capital is tied up in unsold stock."
                facts={[
                    {
                        stat: "Turnover",
                        label: "Ratio",
                        detail: "A higher ratio means your stock is selling fast. A low ratio signals overstocking or slow-moving products that need attention."
                    },
                    {
                        stat: "Days",
                        label: "to Sell",
                        detail: "See the exact number of days your cash is locked inside inventory before it converts to a completed sale."
                    },
                    {
                        stat: "Avg",
                        label: "Inventory",
                        detail: "Calculates the average stock value you carried during your selected period, helping you assess capital exposure."
                    }
                ]}
            />
        </div>
    )
}
