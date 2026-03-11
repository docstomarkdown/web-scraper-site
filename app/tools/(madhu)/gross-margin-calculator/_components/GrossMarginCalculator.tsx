"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Percent, Target, Wallet } from "lucide-react"
import {
    CalculatorInput,
    ResultSummaryCard,
    FadeIn,
    CalculatorCardHeader,
} from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { GrossMarginRevenueBreakdown } from "./GrossMarginRevenueBreakdown"

export function GrossMarginCalculator() {
    const [mode, setMode] = useState<"margin" | "revenue" | "cogs">("margin")
    const [currency, setCurrency] = useState("USD")
    const [revenue, setRevenue] = useState<number | "">("")
    const [cogs, setCogs] = useState<number | "">("")
    const [targetMargin, setTargetMargin] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setRevenue("")
        setCogs("")
        setTargetMargin("")
    }

    const handleModeChange = (newMode: "margin" | "revenue" | "cogs") => {
        setMode(newMode)
        handleReset()
    }

    // ── Derived values ──────────────────────────────────────────
    let derivedMargin = 0
    let derivedProfit = 0
    let derivedRevenue = 0
    let derivedCogs = 0
    let derivedMarkup = 0

    if (mode === "margin") {
        const r = val(revenue)
        const c = val(cogs)
        derivedRevenue = r
        derivedCogs = c
        derivedProfit = r - c
        derivedMargin = r > 0 ? (derivedProfit / r) * 100 : 0
        derivedMarkup = c > 0 ? (derivedProfit / c) * 100 : 0
    } else if (mode === "revenue") {
        const c = val(cogs)
        const m = val(targetMargin)
        const dec = m / 100
        if (dec < 1) {
            derivedRevenue = c / (1 - dec)
            derivedCogs = c
            derivedProfit = derivedRevenue - c
            derivedMargin = m
            derivedMarkup = c > 0 ? (derivedProfit / c) * 100 : 0
        }
    } else {
        const r = val(revenue)
        const m = val(targetMargin)
        const dec = m / 100
        derivedRevenue = r
        derivedCogs = r * (1 - dec)
        derivedProfit = r - derivedCogs
        derivedMargin = m
        derivedMarkup = derivedCogs > 0 ? (derivedProfit / derivedCogs) * 100 : 0
    }

    // ── isCalculated ────────────────────────────────────────────
    const isCalculated =
        mode === "margin"
            ? revenue !== "" && cogs !== "" && val(revenue) > 0 && val(cogs) > 0
            : mode === "revenue"
                ? cogs !== "" && targetMargin !== "" && val(cogs) > 0 && val(targetMargin) > 0
                : revenue !== "" && targetMargin !== "" && val(revenue) > 0 && val(targetMargin) > 0

    // ── ResultSummaryCard props (dynamic per mode) ───────────────
    const resultTitle =
        mode === "margin" ? "Gross Margin" : mode === "revenue" ? "Required Revenue" : "Max COGS Limit"

    const primaryResult =
        mode === "margin"
            ? { value: parseFloat(derivedMargin.toFixed(2)), unit: "%", label: "Your Gross Margin", key: "margin" }
            : mode === "revenue"
                ? { value: derivedRevenue, isCurrency: true as const, label: "Minimum Selling Price", key: "revenue" }
                : { value: derivedCogs, isCurrency: true as const, label: "Maximum Allowable Cost", key: "cogs" }

    const secondaryResults =
        mode === "margin"
            ? [
                {
                    key: "profit",
                    label: "Gross Profit",
                    value: derivedProfit,
                    isCurrency: true as const,
                    tooltip: "Actual cash profit after subtracting COGS from Revenue.",
                },
                {
                    key: "markup",
                    label: "Markup %",
                    value: parseFloat(derivedMarkup.toFixed(2)),
                    unit: "%",
                    tooltip: "The % added on top of cost to reach the selling price — always higher than the equivalent margin.",
                },
            ]
            : mode === "revenue"
                ? [
                    {
                        key: "profit",
                        label: "Gross Profit",
                        value: derivedProfit,
                        isCurrency: true as const,
                        tooltip: "Profit earned at this selling price.",
                    },
                    {
                        key: "margin",
                        label: "Target Margin",
                        value: parseFloat(derivedMargin.toFixed(2)),
                        unit: "%",
                        tooltip: "The gross margin % you set as your target.",
                    },
                ]
                : [
                    {
                        key: "profit",
                        label: "Gross Profit",
                        value: derivedProfit,
                        isCurrency: true as const,
                        tooltip: "Profit earned if COGS stays at or below this limit.",
                    },
                    {
                        key: "markup",
                        label: "Markup %",
                        value: parseFloat(derivedMarkup.toFixed(2)),
                        unit: "%",
                        tooltip: "Equivalent markup at your target margin.",
                    },
                ]

    const checklistItems =
        mode === "margin"
            ? [
                { label: "Total Revenue", isComplete: revenue !== "" && val(revenue) > 0 },
                { label: "Cost of Goods Sold", isComplete: cogs !== "" && val(cogs) > 0 },
            ]
            : mode === "revenue"
                ? [
                    { label: "Cost of Goods Sold", isComplete: cogs !== "" && val(cogs) > 0 },
                    { label: "Target Gross Margin", isComplete: targetMargin !== "" && val(targetMargin) > 0 },
                ]
                : [
                    { label: "Target Revenue", isComplete: revenue !== "" && val(revenue) > 0 },
                    { label: "Target Gross Margin", isComplete: targetMargin !== "" && val(targetMargin) > 0 },
                ]

    const description =
        mode === "margin"
            ? "Your profit kept from each dollar of revenue."
            : mode === "revenue"
                ? "Minimum price to charge to hit your target margin."
                : "Spend no more than this on COGS to protect your margin."

    const emptyResultLabel =
        mode === "margin" ? "Gross Margin %" : mode === "revenue" ? "Required Revenue" : "Max COGS"

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Inputs */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl overflow-hidden">
                        <CalculatorCardHeader
                            title="Margin Calculator"
                            description="Choose a mode and enter your values to calculate instantly."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            onReset={handleReset}
                            guideId="how-to-use"
                            tooltip="See step-by-step instructions below"
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8">
                            {/* Mode Selector */}
                            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
                                <ModeButton active={mode === "margin"} onClick={() => handleModeChange("margin")} icon={Percent} label="Find Margin" />
                                <ModeButton active={mode === "revenue"} onClick={() => handleModeChange("revenue")} icon={Target} label="Find Revenue" />
                                <ModeButton active={mode === "cogs"} onClick={() => handleModeChange("cogs")} icon={Wallet} label="Find COGS" />
                            </div>
                            {/* Dynamic Inputs */}
                            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {mode === "margin" && (
                                    <>
                                        <CalculatorInput label="Total Revenue" value={revenue} onChange={setRevenue} placeholder="10000.00" tooltip="The total sales revenue before any deductions." currency={currency} />
                                        <CalculatorInput label="Cost of Goods Sold (COGS)" value={cogs} onChange={setCogs} placeholder="6000.00" tooltip="Direct cost to produce or acquire the goods sold." currency={currency} />
                                    </>
                                )}
                                {mode === "revenue" && (
                                    <>
                                        <CalculatorInput label="Cost of Goods Sold (COGS)" value={cogs} onChange={setCogs} placeholder="6000.00" tooltip="Your cost to produce or acquire the product." currency={currency} />
                                        <CalculatorInput label="Target Gross Margin (%)" value={targetMargin} onChange={setTargetMargin} placeholder="40.0" max={99.99} tooltip="The gross margin percentage you want to achieve." suffix="%" />
                                    </>
                                )}
                                {mode === "cogs" && (
                                    <>
                                        <CalculatorInput label="Target Revenue" value={revenue} onChange={setRevenue} placeholder="10000.00" tooltip="The sales revenue you expect or aim for." currency={currency} />
                                        <CalculatorInput label="Target Gross Margin (%)" value={targetMargin} onChange={setTargetMargin} placeholder="40.0" max={99.99} tooltip="The gross margin percentage you need to maintain." suffix="%" />
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-32">
                    <ResultSummaryCard
                        title={resultTitle}
                        primaryResult={primaryResult}
                        secondaryResults={secondaryResults}
                        currency={currency}
                        isCalculated={isCalculated}
                        description={description}
                        emptyResultLabel={emptyResultLabel}
                        checklistItems={checklistItems}
                    />
                    {/* Revenue Breakdown — standalone component */}
                    <GrossMarginRevenueBreakdown
                        derivedRevenue={derivedRevenue}
                        derivedCogs={derivedCogs}
                        derivedProfit={derivedProfit}
                    />
                </div>
            </div>
        </FadeIn>
    )
}

function ModeButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl transition-all duration-300 border",
                active
                    ? "bg-white border-blue-200 shadow-sm text-blue-600 ring-2 ring-blue-100"
                    : "border-transparent text-slate-500 hover:bg-white hover:text-slate-700 hover:shadow-sm"
            )}
        >
            <Icon className={cn("w-4 h-4", active ? "stroke-[2.5px]" : "stroke-2")} />
            <span className="text-[11px] font-bold tracking-tight">{label}</span>
        </button>
    )
}
