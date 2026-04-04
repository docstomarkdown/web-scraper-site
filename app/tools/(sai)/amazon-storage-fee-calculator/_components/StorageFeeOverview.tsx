"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function StorageFeeOverview() {
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
                            Tool Essential
                        </h2>
                    </div>
                </div>
                <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium leading-relaxed pl-[3.375rem] sm:pl-[4rem] max-w-2xl mt-2">
                    Plan your FBA inventory costs by estimating monthly and long-term storage charges before you ship.
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="Why Use the Storage Fee Calculator?"
                headingAccent="Storage Fee Calculator"
                definition="If you sell on Amazon FBA, your inventory sits in Amazon's warehouses — and Amazon charges you rent for that space every single month. The Amazon Storage Fee Calculator is a simple, accurate tool that shows how much Amazon will charge to store your products in FBA warehouses. Built for FBA sellers, private-label brands, and wholesale distributors, it helps you estimate storage costs before sending inventory in. Just enter your product dimensions, units, and storage duration, and the tool instantly calculates your monthly storage fees — plus any long-term charges for slow-moving stock."
                facts={[
                    {
                        stat: "Always",
                        label: "Stay In Stock",
                        detail: "Instantly calculate the extra units you need to avoid stockouts during demand spikes or supplier delays — so your operations never stop."
                    },
                    {
                        stat: "Accurate",
                        label: "Demand Coverage",
                        detail: "See your expected demand during lead time and understand how much buffer inventory you truly need to stay safe."
                    },
                    {
                        stat: "Restock",
                        label: "With Confidence",
                        detail: "Plan smarter reorder points, reduce lost sales, and maintain healthy inventory levels — all with one simple calculation."
                    }
                ]}
            />
        </div>
    )
}
