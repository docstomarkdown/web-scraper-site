"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function LeadTimeOverview() {
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
                    Predict exactly when your inventory will arrive at your warehouse, accounting for production, transit, and unexpected delays.
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="Why Use Lead Time Calculator?"
                headingAccent="Lead Time Calculator"
                definition="The primary purpose of the Lead Time Calculator is to accurately predict when your inventory will arrive and be ready to sell. Built for Amazon sellers, e-commerce brands, and supply chain managers, this tool eliminates the guesswork of overseas shipping by combining manufacturing, shipping, customs, and safety buffers into one exact delivery date. It is your essential tool for preventing costly stockouts, planning product launches, and coordinating seamless inventory replenishment."
                facts={[
                    {
                        stat: "Production",
                        label: "Manufacturing",
                        detail: "Track exactly how many days it takes for your supplier to build, inspect, and package your products."
                    },
                    {
                        stat: "Arrival Date",
                        label: "Accurate Forecasts",
                        detail: "Instantly calculate the exact date your products will arrive in your warehouse so you never run out of stock during critical sales periods."
                    },
                    {
                        stat: "Delays",
                        label: "Safety Buffer",
                        detail: "Easily add extra days to your timeline to protect your business against unexpected supply chain delays."
                    }
                ]}
            />
        </div>
    )
}
