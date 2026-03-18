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
                            Tool Essentials
                        </h2>
                    </div>
                </div>
                <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium leading-relaxed pl-[3.375rem] sm:pl-[4rem] max-w-2xl mt-2">
                    Key information about cubic feet and shipping volume you need to know
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="What is a Cubic Feet Calculator?"
                headingAccent="Cubic Feet Calculator"
                definition="A Cubic Feet Calculator converts a product's Length × Width × Height dimensions into volume — expressed in cubic feet (CFT), cubic meters (CBM), and cubic inches. It is the essential first step for freight quoting, Amazon FBA storage fee estimation, and container load planning."
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
