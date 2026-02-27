"use client"

import React from "react"
import { ResultSummaryCard } from "@/app/tools/_shared/components"

export default function TestResultCardPage() {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-12 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Refined ResultSummaryCard Preview</h1>
                    <p className="text-slate-500">Testing smart unit positioning and color accuracy</p>
                </div>

                {/* Scenario 1: Currency symbols (Front) */}
                <div className="space-y-4">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">1. Currency Logic ($ Front)</h2>
                    <ResultSummaryCard
                        title="Projected Earnings"
                        primaryResult={{
                            value: "2,450.00",
                            unit: "$",
                            label: "Total"
                        }}
                        secondaryResults={[
                            { key: "profit", label: "Monthly Profit", value: "850", unit: "$", tooltip: "Symbol at front" },
                            { key: "revenue", label: "Revenue", value: "3,300", unit: "₹", tooltip: "Symbol at front" }
                        ]}
                        isCalculated={true}
                        showLiveBadge={true}
                        liveBadgeText="LIVE"
                    />
                </div>

                {/* Scenario 2: Measurement Units (Back) */}
                <div className="space-y-4">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">2. Measurement Logic (% / cm / m Back)</h2>
                    <ResultSummaryCard
                        title="Package Dimensions"
                        primaryResult={{
                            value: "145",
                            unit: "cm",
                            label: "Height"
                        }}
                        secondaryResults={[
                            { key: "width", label: "Width", value: "65", unit: "cm", tooltip: "Unit at back" },
                            { key: "efficiency", label: "Efficiency", value: "98.4", unit: "%", tooltip: "Unit at back" }
                        ]}
                        isCalculated={true}
                        showLiveBadge={true}
                        liveBadgeText="LIVE"
                    />
                </div>

                {/* Scenario 3: Profit/Loss with Mixed Units */}
                <div className="space-y-4">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">3. Profit/Loss & mixed symbols</h2>
                    <ResultSummaryCard
                        title="Inventory ROI"
                        primaryResult={{
                            value: "124.5",
                            unit: "%",
                            label: "Total ROI"
                        }}
                        secondaryResults={[
                            { key: "profit", label: "Net Profit", value: "1,500.00", unit: "$", tooltip: "Profit state detected" },
                            { key: "volume", label: "Stock Volume", value: "450", unit: "m³", tooltip: "Unit at back" }
                        ]}
                        isCalculated={true}
                        profitLossKey="profit"
                        showLiveBadge={true}
                    />
                </div>
            </div>
        </div>
    )
}
