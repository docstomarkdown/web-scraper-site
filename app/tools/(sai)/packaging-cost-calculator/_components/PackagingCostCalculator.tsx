"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Scissors, Clock, Hash, DollarSign, Percent } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
import { PackagingCostBreakdown } from "./PackagingCostBreakdown"

export function PackagingCostCalculator() {
    const [currency, setCurrency] = useState("USD")

    // Core inputs
    const [boxCost, setBoxCost] = useState<number | "">("")
    const [laborTime, setLaborTime] = useState<number | "">("")
    const [hourlyWage, setHourlyWage] = useState<number | "">("")
    const [orderQuantity, setOrderQuantity] = useState<number | "">(1)

    // Advanced / optional inputs
    const [paddingCost, setPaddingCost] = useState<number | "">("")
    const [tapeCost, setTapeCost] = useState<number | "">("")
    const [labelCost, setLabelCost] = useState<number | "">("")
    const [brandingCost, setBrandingCost] = useState<number | "">("")

    // Computed results
    const [totalMaterialCost, setTotalMaterialCost] = useState(0)
    const [laborCostPerUnit, setLaborCostPerUnit] = useState(0)
    const [totalPackagingCost, setTotalPackagingCost] = useState(0)
    const [batchTotal, setBatchTotal] = useState(0)
    const [materialPct, setMaterialPct] = useState(0)
    const [laborPct, setLaborPct] = useState(0)

    const handleReset = () => {
        setBoxCost("")
        setPaddingCost("")
        setTapeCost("")
        setLabelCost("")
        setBrandingCost("")
        setLaborTime("")
        setHourlyWage("")
        setOrderQuantity(1)
    }

    useEffect(() => {
        const box = Number(boxCost) || 0
        const padding = Number(paddingCost) || 0
        const tape = Number(tapeCost) || 0
        const label = Number(labelCost) || 0
        const branding = Number(brandingCost) || 0
        const time = Number(laborTime) || 0
        const wage = Number(hourlyWage) || 0
        const qty = Math.max(Number(orderQuantity) || 1, 1)

        const materials = box + padding + tape + label + branding
        const labor = time > 0 && wage > 0 ? (time / 60) * wage : 0
        const total = materials + labor
        const batch = total * qty

        setTotalMaterialCost(materials)
        setLaborCostPerUnit(labor)
        setTotalPackagingCost(total)
        setBatchTotal(batch)
        setMaterialPct(total > 0 ? (materials / total) * 100 : 0)
        setLaborPct(total > 0 ? (labor / total) * 100 : 0)
    }, [boxCost, paddingCost, tapeCost, labelCost, brandingCost, laborTime, hourlyWage, orderQuantity])

    const isValid = boxCost !== "" && laborTime !== "" && hourlyWage !== ""
    const qty = Math.max(Number(orderQuantity) || 1, 1)

    const [showAdvanced, setShowAdvanced] = useState(false)

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* ── Inputs Column ── */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            title="Packaging Details"
                            description="Enter your per-unit material costs, packing time, and order quantity."
                            onReset={handleReset}
                            guideId="tool-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">

                                {/* Unified Inputs Group */}
                                <div className="space-y-4">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        groupingTitle="Packaging & Fulfillment"
                                        groupingIcon={Package}
                                        label="Box / Mailer Cost"
                                        value={boxCost}
                                        onChange={setBoxCost}
                                        placeholder="0.85"
                                        max={500}
                                        step={0.01}
                                        tooltip="The cost of each shipping box or poly mailer you use per order."
                                        isCurrency
                                        currency={currency}
                                        autoFocus
                                    />
                                    
                                    <CalculatorInput
                                        label="Time to Pack (Minutes)"
                                        value={laborTime}
                                        onChange={setLaborTime}
                                        placeholder="3"
                                        max={120}
                                        step={0.5}
                                        tooltip="How long it takes to pack one order from start to finish."
                                        suffix="min"
                                    />
                                    
                                    <CalculatorInput
                                        label="Hourly Wage"
                                        value={hourlyWage}
                                        onChange={setHourlyWage}
                                        placeholder="15.00"
                                        max={500}
                                        step={0.5}
                                        tooltip="Your hourly pay rate (or your own time valued at a fair market rate)."
                                        isCurrency
                                        currency={currency}
                                    />

                                    <CalculatorInput
                                        label="Order Quantity"
                                        value={orderQuantity}
                                        onChange={setOrderQuantity}
                                        placeholder="1"
                                        min={1}
                                        max={1000000}
                                        step={1}
                                        tooltip="Number of units to scale the Batch Total. Does not affect the per-unit cost."
                                        ignoreChecklist={true}
                                    />
                                </div>

                                {/* Advanced Settings Toggle */}
                                <div className="pt-2">
                                    <div
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 group select-none ml-0",
                                            showAdvanced
                                                ? "bg-blue-50/50 border-blue-200 shadow-sm"
                                                : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-slate-100"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                                showAdvanced ? "bg-blue-100 text-blue-600" : "bg-white text-slate-400 group-hover:text-blue-500"
                                            )}>
                                                <Scissors className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn("text-sm font-semibold transition-colors", showAdvanced ? "text-blue-700" : "text-slate-700")}>
                                                    Advanced Settings
                                                </span>
                                                <span className="text-[11px] text-slate-400 font-medium">
                                                    Tape, Label & Branding details
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase transition-colors",
                                                showAdvanced ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-500"
                                            )}>
                                                Optional
                                            </span>
                                            {showAdvanced ? <Percent className="w-4 h-4 text-blue-500" /> : <Package className="w-4 h-4 text-slate-400 opacity-50" />}
                                        </div>
                                    </div>

                                    {showAdvanced && (
                                        <FadeIn className="mt-4 p-5 bg-slate-50/20 rounded-xl border border-slate-200/60 space-y-4">
                                            <CalculatorInput
                                                label="Padding / Infill"
                                                value={paddingCost}
                                                onChange={setPaddingCost}
                                                placeholder="0.25"
                                                max={100}
                                                step={0.01}
                                                tooltip="Cost of protective filler per order — bubble wrap, kraft paper, or foam."
                                                isCurrency
                                                currency={currency}
                                                isOptional
                                            />
                                            <CalculatorInput
                                                label="Tape"
                                                value={tapeCost}
                                                onChange={setTapeCost}
                                                placeholder="0.05"
                                                max={50}
                                                step={0.01}
                                                tooltip="Your estimated tape cost per package (a roll divided by uses)."
                                                isCurrency
                                                currency={currency}
                                                isOptional
                                            />
                                            <CalculatorInput
                                                label="Shipping Label"
                                                value={labelCost}
                                                onChange={setLabelCost}
                                                placeholder="0.03"
                                                max={20}
                                                step={0.01}
                                                tooltip="Cost per label — thermal labels or printed paper, including ink."
                                                isCurrency
                                                currency={currency}
                                                isOptional
                                            />
                                            <CalculatorInput
                                                label="Branding / Inserts"
                                                value={brandingCost}
                                                onChange={setBrandingCost}
                                                placeholder="0.15"
                                                max={100}
                                                step={0.01}
                                                tooltip="Extra items inside the package — stickers, thank-you cards, or tissue paper."
                                                isCurrency
                                                currency={currency}
                                                isOptional
                                            />
                                        </FadeIn>
                                    )}
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ── Results Column ── */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="Total Packaging Cost"
                        showLiveBadge={true}
                        liveBadgeText="Live"
                        liveBadgeColor="blue"
                        description={
                            isValid
                                ? qty > 1
                                    ? `Your total per-unit packaging cost. Multiply × ${qty.toLocaleString()} for a batch total.`
                                    : "Your total per-unit packaging cost including materials and labor."
                                : undefined
                        }
                        primaryResult={{
                            value: totalPackagingCost,
                            label: "Cost Per Unit",
                            isCurrency: true,
                            key: "costPerUnit"
                        }}
                        secondaryResults={[
                            {
                                key: "batchTotal",
                                label: qty > 1 ? `Batch Total (×${qty.toLocaleString()})` : "Batch Total",
                                value: batchTotal,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: `Your total packaging spend across all ${qty.toLocaleString()} unit${qty > 1 ? "s" : ""} in this order run.`
                            },
                            {
                                key: "totalMaterials",
                                label: "Material Cost",
                                value: totalMaterialCost,
                                isCurrency: true,
                                icon: Package,
                                tooltip: "Sum of all physical packaging materials: box, padding, tape, label, and branding inserts."
                            },
                            {
                                key: "laborCost",
                                label: "Labor Cost",
                                value: laborCostPerUnit,
                                isCurrency: true,
                                icon: Clock,
                                tooltip: `Calculated as (${Number(laborTime) || 0} min ÷ 60) × ${currency} ${Number(hourlyWage) || 0}/hr wage.`
                            },
                            {
                                key: "materialPct",
                                label: "Material Share",
                                value: materialPct.toFixed(1),
                                unit: "%",
                                icon: Percent,
                                tooltip: "The percentage of total per-unit cost accounted for by physical materials."
                            }
                        ]}
                        checklistItems={[
                            { key: "box", label: "Box / Mailer Cost", isComplete: boxCost !== "" },
                            { key: "time", label: "Time to Pack", isComplete: laborTime !== "" },
                            { key: "wage", label: "Hourly Wage", isComplete: hourlyWage !== "" }
                        ]}
                    />

                    <div className="mt-4">
                        <PackagingCostBreakdown
                            totalMaterialCost={totalMaterialCost}
                            laborCostPerUnit={laborCostPerUnit}
                            boxCost={Number(boxCost) || 0}
                            paddingCost={Number(paddingCost) || 0}
                            tapeCost={Number(tapeCost) || 0}
                            labelCost={Number(labelCost) || 0}
                            brandingCost={Number(brandingCost) || 0}
                            totalPackagingCost={totalPackagingCost}
                            currency={currency}
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
