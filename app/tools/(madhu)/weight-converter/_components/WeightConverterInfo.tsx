"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function WeightConverterInfo() {
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
                    Key information about product weight conversion and shipping tiers you need to know
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="What is a Product Weight Converter?"
                headingAccent="Product Weight Converter"
                definition="A Product Weight Converter instantly translates a product's weight between Pounds (lbs), Ounces (oz), Kilograms (kg), and Grams (g) — and maps that weight to a real carrier shipping tier so you can see exactly how much shipping will cost before you list or ship a product."
                facts={[
                    {
                        stat: "4 Units",
                        label: "At Once",
                        detail: "Enter a weight in any unit and instantly see all four conversions — lbs, oz, kg, and g — displayed simultaneously without toggling.",
                    },
                    {
                        stat: "7+ Carriers",
                        label: "Supported",
                        detail: "Get shipping tier estimates for USPS, FedEx, UPS, DHL, Royal Mail, Canada Post, and Australia Post — with a live highlight on your active tier.",
                    },
                    {
                        stat: "Tier Alert",
                        label: "Built-In",
                        detail: "The cost breakdown shows every weight tier for your selected carrier, so you can see how close your product is to crossing into a more expensive shipping band.",
                    },
                ]}
            />
        </div>
    )
}
