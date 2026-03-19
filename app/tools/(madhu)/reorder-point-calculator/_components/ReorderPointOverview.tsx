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
                            Tool Essentials
                        </h2>
                    </div>
                </div>
                <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium leading-relaxed pl-[3.375rem] sm:pl-[4rem] max-w-2xl mt-2">
                    Optimize your stock levels and prevent stockouts with data-driven reordering
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="For sellers who can't afford to run out of stock — the "
                headingAccent="Reorder Point Calculator"
                definition="Every stockout is a lost sale — and often a lost customer. This tool is built for e-commerce operators, Amazon FBA sellers, and inventory managers who need to know the precise inventory level at which they must place a new order to avoid running out of stock while waiting for their supplier to deliver. Input your daily sales rate and lead time to get an exact reorder trigger point, with optional safety stock for extra protection."
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
