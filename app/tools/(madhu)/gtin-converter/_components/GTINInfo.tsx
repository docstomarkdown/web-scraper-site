"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function GTINInfo() {
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
                    Key information about GTIN formats and barcode conversion
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="What is a GTIN?"
                headingAccent="GTIN"
                definition="A Global Trade Item Number (GTIN) is a unique numeric identifier assigned to products by GS1. It is the universal key that links a physical product to its digital record — used in supply chains, retail checkout, and every major online marketplace."
                facts={[
                    {
                        stat: "4 Formats",
                        label: "Supported",
                        detail: "GTIN-12 (UPC-A), GTIN-13 (EAN-13), GTIN-8 (EAN-8), and GTIN-14 (case/pallet level) — all interconvertible.",
                    },
                    {
                        stat: "Instant",
                        label: "Conversion",
                        detail: "Enter any UPC, EAN, or GTIN and get all equivalent formats in one click — no manual padding or check-digit math required.",
                    },
                    {
                        stat: "GS1",
                        label: "Compliant",
                        detail: "Every conversion follows GS1 Modulo 10 check-digit rules — the same standard Amazon, Walmart, and global retailers require.",
                    },
                ]}
            />
        </div>
    )
}
