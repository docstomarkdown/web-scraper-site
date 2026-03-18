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
                            Inventory Strategy
                        </h2>
                    </div>
                </div>
                <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium leading-relaxed pl-[3.375rem] sm:pl-[4rem] max-w-2xl mt-2">
                    Optimize your stock levels and prevent stockouts with data-driven reordering
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="What is a Reorder Point Calculator?"
                headingAccent="Reorder Point Calculator"
                definition="A Reorder Point (ROP) Calculator determines the inventory level that triggers a restock. By analyzing your daily sales velocity and supplier lead times, it tells you exactly when to order more stock to ensure you never go out of stock or miss a sale while waiting for a delivery."
                facts={[
                    {
                        stat: "Sales",
                        label: "Velocity",
                        detail: "Uses your Average Daily Units Sold to calculate how much stock you consume while waiting for your next shipment.",
                    },
                    {
                        stat: "Lead",
                        label: "Time",
                        detail: "Factor in the total time from order placement to delivery. Accurate lead times are critical for preventing backorders.",
                    },
                    {
                        stat: "Safety",
                        label: "Optional",
                        detail: "Optionally add an emergency buffer (Safety Stock) to protect your business against unexpected demand spikes or supplier delays.",
                    },
                ]}
            />
        </div>
    )
}
