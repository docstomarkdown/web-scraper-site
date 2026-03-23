"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function ReorderPointOverview() {
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
                            Tool Essential
                        </h2>
                    </div>
                </div>
                <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium leading-relaxed pl-[3.375rem] sm:pl-[4rem] max-w-2xl mt-2">
                    Optimize your stock levels and prevent stockouts with data-driven reordering
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="Why Use Reorder Point Calculator?"
                headingAccent="Reorder Point Calculator"
                definition="The primary purpose of the Reorder Point Calculator is to find the exact inventory level at which you must place a new order to avoid stockouts. Built for e-commerce operators, Amazon FBA sellers, and warehouse managers, this tool eliminates guesswork by factoring in your daily sales rate and supplier lead time. It is your essential tool for optimizing stock levels, maintaining cash flow, and ensuring you never lose a sale due to empty shelves."
                facts={[
                    {
                        stat: "Sales",
                        label: "Velocity",
                        detail: "Uses your average daily units sold to calculate stock consumption during your supplier's lead time."
                    },
                    {
                        stat: "Lead",
                        label: "Time",
                        detail: "Factors in the full time from placing an order to receiving it — so your reorder point is never too late."
                    },
                    {
                        stat: "Safety",
                        label: "Buffer",
                        detail: "Optionally add a safety stock buffer to protect against unexpected demand spikes or delayed supplier shipments."
                    }
                ]}
            />
        </div>
    )
}
