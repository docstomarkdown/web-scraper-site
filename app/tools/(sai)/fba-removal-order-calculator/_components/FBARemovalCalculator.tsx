"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, DollarSign, HandCoins, AlertTriangle, CheckCircle2, } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard, getCurrencySymbol } from "@/app/tools/_shared/components"

export function FBARemovalCalculator() {
    const [currency, setCurrency] = useState("USD")

    // Input States
    const [numberOfUnits, setNumberOfUnits] = useState<number | "">("")
    
    // Amazon Fees
    const [removalFee, setRemovalFee] = useState<number | "">("")
    const [disposalFee, setDisposalFee] = useState<number | "">("")
    
    // Recovery Value
    const [expectedSellingPrice, setExpectedSellingPrice] = useState<number | "">("")
    const [otherCosts, setOtherCosts] = useState<number | "">("")

    // Result States
    const [profitRemoval, setProfitRemoval] = useState(0)
    const [lossDisposal, setLossDisposal] = useState(0)
    const [netDifference, setNetDifference] = useState(0)
    const [bestOption, setBestOption] = useState<"REMOVE" | "DISPOSE" | "HOLD" | null>(null)

    const handleReset = () => {
        setNumberOfUnits("")
        setRemovalFee("")
        setDisposalFee("")
        setExpectedSellingPrice("")
        setOtherCosts("")
        setBestOption(null)
    }

    useEffect(() => {
        const units = Number(numberOfUnits) || 0
        const rFee = Number(removalFee) || 0
        const dFee = Number(disposalFee) || 0
        const price = Number(expectedSellingPrice) || 0
        const costs = Number(otherCosts) || 0

        // Incomplete Data
        if (units === 0 || (rFee === 0 && dFee === 0 && price === 0)) {
            setProfitRemoval(0)
            setLossDisposal(0)
            setNetDifference(0)
            setBestOption(null)
            return
        }

        const profitRem = (price - rFee - costs) * units
        const lossDisp = dFee * units

        setProfitRemoval(profitRem)
        setLossDisposal(lossDisp) // Keeping this positive per user example "Loss if Disposed: 800"

        if (profitRem > 0) {
            setBestOption("REMOVE")
            setNetDifference(profitRem - (-lossDisp)) // e.g. 1200 - (-800) = 2000
        } else if (profitRem <= -lossDisp && profitRem <= 0) {
            // Both bad, but disposal might be less bad (e.g., profitRem=-1000, lossDisp=800 => -1000 <= -800)
            // Or both are equal
            if (profitRem === -lossDisp && lossDisp > 0) {
                // If they are exactly the same loss
                setBestOption("HOLD")
                setNetDifference(0)
            } else if (profitRem < -lossDisp) {
                setBestOption("DISPOSE")
                setNetDifference(-lossDisp - profitRem) // e.g. -800 - (-1000) = 200
            } else {
                setBestOption("HOLD")
                setNetDifference(0)
            }
        } else {
            // Both bad, but removal is less of a loss, wait, "HOLD -> When both options are bad Both removing and disposing result in a loss."
            setBestOption("HOLD")
            setNetDifference(profitRem - (-lossDisp))
        }
    }, [numberOfUnits, removalFee, disposalFee, expectedSellingPrice, otherCosts])

    const isValid = numberOfUnits !== "" && removalFee !== "" && disposalFee !== "" && expectedSellingPrice !== ""

    // Formatters
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(val)
    }

    // Dynamic result primary message
    let primaryMessage = ""
    if (isValid && bestOption) {
        if (bestOption === "REMOVE") primaryMessage = `You gain ${formatCurrency(netDifference)} more by removing instead of disposing.`
        else if (bestOption === "DISPOSE") primaryMessage = `You save ${formatCurrency(netDifference)} by disposing instead of removing.`
        else if (bestOption === "HOLD") primaryMessage = `Both choices result in a loss.`
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left side inputs */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            title="Removal vs Disposal Details"
                            description="Enter your inventory and fee details to determine the most profitable action."
                            onReset={handleReset}
                            guideId="fba-removal-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* 1. Inventory */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        groupingTitle="Inventory"
                                        groupingIcon={Package}
                                        label="Number of Units"
                                        value={numberOfUnits}
                                        onChange={setNumberOfUnits}
                                        placeholder="100"
                                        suffix="units"
                                        step={1}
                                        min={1}
                                        max={1000000}
                                        tooltip="Total items you want to remove or dispose."
                                        autoFocus
                                    />
                                </div>

                                {/* 2. Amazon Fees */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Amazon Fees"
                                        groupingIcon={DollarSign}
                                        label="Removal Fee"
                                        value={removalFee}
                                        onChange={setRemovalFee}
                                        placeholder="1.50"
                                        prefix={getCurrencySymbol(currency)}
                                        step={0.01}
                                        min={0}
                                        tooltip="Fee charged by Amazon to return one item to you."
                                    />
                                    <CalculatorInput
                                        label="Disposal Fee"
                                        value={disposalFee}
                                        onChange={setDisposalFee}
                                        placeholder="1.00"
                                        prefix={getCurrencySymbol(currency)}
                                        step={0.01}
                                        min={0}
                                        tooltip="Fee charged by Amazon to discard one item."
                                    />
                                </div>

                                {/* 3. Recovery Value */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Recovery Value"
                                        groupingIcon={HandCoins}
                                        label="Expected Selling Price"
                                        value={expectedSellingPrice}
                                        onChange={setExpectedSellingPrice}
                                        placeholder="15.00"
                                        prefix={getCurrencySymbol(currency)}
                                        step={0.01}
                                        min={0}
                                        tooltip="Price you expect to sell each item for after removal."
                                    />
                                    <CalculatorInput
                                        label="Other Costs"
                                        value={otherCosts}
                                        onChange={setOtherCosts}
                                        placeholder="2.00"
                                        prefix={getCurrencySymbol(currency)}
                                        step={0.01}
                                        min={0}
                                        tooltip="Additional costs like shipping, repair, or packaging after removal."
                                        isOptional={true}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right side results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="removal comparison"
                        liveBadgeText={
                            isValid
                                ? bestOption === "REMOVE" ? "Remove Recommended"
                                  : bestOption === "DISPOSE" ? "Dispose Recommended"
                                  : "Hold Recommended"
                                : "Draft"
                        }
                        liveBadgeColor={
                            isValid
                                ? bestOption === "REMOVE" ? "emerald"
                                  : bestOption === "DISPOSE" ? "blue"
                                  : "amber"
                                : "slate"
                        }
                        dynamicMessages={{
                            positive: primaryMessage,
                            negative: primaryMessage,
                            neutral: primaryMessage
                        }}
                        primaryResult={{
                            value: bestOption || "—",
                            label: "Best Option",
                            isCurrency: false,
                            key: "bestOption"
                        }}
                        secondaryResults={[
                            {
                                key: "profitAfterRemoval",
                                label: "Profit After Removal",
                                value: profitRemoval,
                                isCurrency: true,
                                icon: HandCoins,
                                tooltip: "Your total profit after paying removal and other costs."
                            },
                            {
                                key: "lossIfDisposed",
                                label: "Loss if Disposed",
                                value: lossDisposal,
                                isCurrency: true,
                                icon: AlertTriangle,
                                tooltip: "Total amount you lose if you choose to dispose the items."
                            },
                            {
                                key: "netDifference",
                                label: "Net Difference",
                                value: netDifference,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "How much more you gain or lose between removal and disposal."
                            }
                        ]}
                        checklistItems={[
                            { key: "inv", label: "Inventory", isComplete: numberOfUnits !== "" },
                            { key: "rf", label: "Removal Fee", isComplete: removalFee !== "" },
                            { key: "df", label: "Disposal Fee", isComplete: disposalFee !== "" },
                            { key: "sp", label: "Selling Price", isComplete: expectedSellingPrice !== "" },
                        ]}
                    >
                    </ResultSummaryCard>

                    {/* Result Callout Context */}
                    {isValid && bestOption && (
                        <div className={cn(
                            "flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 shadow-sm",
                            bestOption === "REMOVE" ? "bg-emerald-50/50 border-emerald-100" :
                            bestOption === "DISPOSE" ? "bg-blue-50/50 border-blue-100" :
                            "bg-amber-50/50 border-amber-100"
                        )}>
                            <div className={cn(
                                "p-2.5 rounded-xl bg-white shadow-sm ring-1 shrink-0 mt-0.5",
                                bestOption === "REMOVE" ? "text-emerald-600 ring-emerald-100" :
                                bestOption === "DISPOSE" ? "text-blue-600 ring-blue-100" :
                                "text-amber-600 ring-amber-100"
                            )}>
                                {bestOption === "REMOVE" ? <CheckCircle2 className="w-5 h-5" /> :
                                 bestOption === "DISPOSE" ? <Truck className="w-5 h-5" /> :
                                 <AlertTriangle className="w-5 h-5" />}
                            </div>
                            <div className="space-y-1">
                                <h4 className={cn(
                                    "text-sm font-semibold",
                                    bestOption === "REMOVE" ? "text-emerald-900" :
                                    bestOption === "DISPOSE" ? "text-blue-900" :
                                    "text-amber-900"
                                )}>
                                    {bestOption === "REMOVE" ? "Action: REMOVE ✅" :
                                     bestOption === "DISPOSE" ? "Action: DISPOSE ❌" :
                                     "Action: HOLD ⚠️"}
                                </h4>
                                <p className={cn(
                                    "text-sm leading-relaxed",
                                    bestOption === "REMOVE" ? "text-emerald-700" :
                                    bestOption === "DISPOSE" ? "text-blue-700" :
                                    "text-amber-700"
                                )}>
                                    {bestOption === "REMOVE" && `The net difference is ${formatCurrency(netDifference)} better if you REMOVE. When profit after removal is positive, removal is the ideal choice.`}
                                    {bestOption === "DISPOSE" && `The net difference is ${formatCurrency(netDifference)} better if you DISPOSE. Removal gives more loss than disposal in this scenario.`}
                                    {bestOption === "HOLD" && `Both removing and disposing result in a loss. Consider keeping inventory, holding off, or re-evaluating pricing.`}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}