"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function CubicFeetInfo() {
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
                
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="Why Use a Cubic Feet Calculator?"
                headingAccent="Cubic Feet Calculator?"
                definition="Used by Amazon FBA sellers, freight forwarders, and warehouse planners to accurately estimate storage fees and plan container loads. The Cubic Feet Calculator takes your item's physical dimensions and instantly converts them into total volume, allowing you to quickly budget for freight routing and warehouse storage."
                facts={[
                    {
                        stat: "4 Units",
                        label: "Supported",
                        detail: "Enter dimensions in Feet, Inches, Centimeters, or Meters. The tool converts everything instantly to CFT, CBM, and cubic inches simultaneously.",
                    },
                    {
                        stat: "Real-Time",
                        label: "Results",
                        detail: "Volume figures update as you type — no submit button needed. Supports multi-unit batches so you can calculate total volume for any quantity of identical items.",
                    },
                    {
                        stat: "Cost Est.",
                        label: "Included",
                        detail: "Enter a cost-per-cubic-foot rate (optional) to get an instant Estimated Total Cost — useful for storage fee projections and freight budgeting.",
                    },
                ]}
            />
        </div>
    )
}
