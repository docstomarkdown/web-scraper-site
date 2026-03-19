"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function COGSOverview() {
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
                    Key information about Cost of Goods Sold and profitability you need to know.
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="For every seller who needs to know their true cost — the "
                headingAccent="COGS Calculator"
                definition="Whether you're an Amazon FBA seller, a direct-to-consumer brand, or a wholesale buyer, understanding your exact cost per unit is non-negotiable for staying profitable. This calculator is built for sellers who source, manufacture, or bundle products and need a single, accurate number that covers everything — product cost, shipping to warehouse, packaging, and fulfillment — so pricing decisions are based on facts, not guesses."
                facts={[
                    {
                        stat: "Full",
                        label: "Cost Picture",
                        detail: "Consolidates product cost, freight, packaging, and fulfillment into one clear cost-per-unit figure."
                    },
                    {
                        stat: "Hidden",
                        label: "Cost Finder",
                        detail: "Surfaces fees you might have overlooked — the ones quietly chipping away at your gross margin every day."
                    },
                    {
                        stat: "Batch",
                        label: "Valuation",
                        detail: "Instantly calculates the total capital locked inside your inventory, which is essential for funding and cash flow planning."
                    }
                ]}
            />
        </div>
    )
}

