"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function ValidatorInfo() {
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
                    Key information about UPC and EAN barcodes you need to know
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="What is UPC / EAN?"
                headingAccent="UPC / EAN"
                definition="UPC (Universal Product Code) and EAN (European Article Number) are the numeric barcodes printed on product packaging to uniquely identify items — used at checkout, in warehouses, and across online marketplaces worldwide."
                facts={[
                    {
                        stat: "3 Formats",
                        label: "Accepted",
                        detail: "UPC-A (12 digits), EAN-13 (13 digits), and EAN-8 (8 digits) — covers virtually every retail barcode globally.",
                    },
                    {
                        stat: "Instant",
                        label: "Validation",
                        detail: "Paste or scan any barcode and get immediate format checks, check-digit verification, and error correction.",
                    },
                    {
                        stat: "GS1",
                        label: "Standard",
                        detail: "Uses the official Modulo 10 algorithm — the same standard Amazon, Walmart, and every POS system relies on.",
                    },
                ]}
            />
        </div>
    )
}
