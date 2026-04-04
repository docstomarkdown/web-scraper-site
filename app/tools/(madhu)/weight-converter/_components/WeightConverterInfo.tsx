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
                            Tool Essential
                        </h2>
                    </div>
                </div>
                
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="Why Use a Product Weight Converter?"
                headingAccent="Product Weight Converter?"
                definition="Used by e-commerce sellers, logistics managers, and fulfillment teams to accurately prepare catalog listings and estimate shipping fees. The Product Weight Converter instantly translates a product's weight between pounds, ounces, kilograms, and grams while automatically identifying exactly which pricing tier your package falls into for major shipping carriers."
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
