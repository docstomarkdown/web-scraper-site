"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, RotateCcw, AlertTriangle, CheckCircle2, Clock, Package } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function ReorderCalculator() {
    const [dailySales, setDailySales] = useState<number | "">("")
    const [leadTime, setLeadTime] = useState<number | "">("")
    const [safetyStockDays, setSafetyStockDays] = useState<number | "">("")
    const [currentStock, setCurrentStock] = useState<number | "">("")

    const handleReset = () => {
        setDailySales("")
        setLeadTime("")
        setSafetyStockDays("")
        setCurrentStock("")
    }

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const val = (v: number | "") => (v === "" ? 0 : v)

    // --- Calculations ---
    const sales = val(dailySales)
    const lead = val(leadTime)
    const safetyDays = val(safetyStockDays)
    const stock = val(currentStock)

    const leadTimeDemand = sales * lead
    const safetyStockUnits = sales * safetyDays
    const reorderPoint = Math.ceil(leadTimeDemand + safetyStockUnits)

    const isReorderNeeded = stock <= reorderPoint

    // Days until reorder point is reached
    // If stock > reorderPoint, we have (stock - reorderPoint) surplus units.
    // Days = Surplus / DailySales
    let daysUntilReorder = 0
    if (sales > 0 && stock > reorderPoint) {
        daysUntilReorder = Math.floor((stock - reorderPoint) / sales)
    } else if (stock <= reorderPoint) {
        daysUntilReorder = 0 // Already there
    }

    const titleLabel = isReorderNeeded ? "Order Now" : "Stock Healthy"

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-blue-600">
                                        Inventory Metrics
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-blue-600 hover:bg-slate-100 h-6 w-6 rounded-full"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </Button>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={handleReset}
                                                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 h-6 w-6 rounded-full"
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                Reset Calculator
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <CardDescription>Enter your sales velocity and lead times.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label="Average Daily Sales (Units)"
                                value={dailySales}
                                onChange={setDailySales}
                                placeholder="10"
                                tooltip="The average number of units you sell per day."
                            />
                            <CalculatorInput
                                label="Lead Time (Days)"
                                value={leadTime}
                                onChange={setLeadTime}
                                placeholder="14"
                                tooltip="Number of days from placing an order to receiving it."
                            />
                            <CalculatorInput
                                label="Safety Stock Buffer (Days)"
                                value={safetyStockDays}
                                onChange={setSafetyStockDays}
                                placeholder="7"
                                tooltip="Extra days of stock to hold for emergencies/delays."
                            />
                            <CalculatorInput
                                label="Current Stock Level (Units)"
                                value={currentStock}
                                onChange={setCurrentStock}
                                placeholder="200"
                                tooltip="Total units currently in your warehouse."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Reorder Point"
                        titleLabel={titleLabel}
                        labelClassName={!isReorderNeeded ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <Counter value={reorderPoint} />
                                <span className="text-2xl font-normal opacity-80">Units</span>
                            </div>
                        }
                        valueColor={!isReorderNeeded ? "text-emerald-400" : "text-red-400"}
                        mainMetricLabel="Status"
                        mainMetricValue={isReorderNeeded ? "Place Order" : `~${daysUntilReorder} Days Left`}
                        secondaryMetrics={[
                            {
                                label: "Lead Time Demand",
                                value: <><Counter value={leadTimeDemand} /> Units</>,
                                color: "text-slate-400"
                            },
                            {
                                label: "Safety Stock",
                                value: <><Counter value={safetyStockUnits} /> Units</>,
                                color: "text-blue-300"
                            }
                        ]}
                    />

                    {/* Analysis Card */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-start gap-3">
                            {isReorderNeeded ?
                                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" /> :
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                            }
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-1">
                                    {isReorderNeeded ? "Reorder Action Needed" : "Inventory Healthy"}
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {isReorderNeeded ? (
                                        <>
                                            Your current stock ({stock}) is below the Reorder Point ({reorderPoint}).
                                            You should place an order immediately to avoid a stockout during the <strong>{lead} day</strong> lead time.
                                        </>
                                    ) : (
                                        <>
                                            You have sufficient stock. Based on your daily sales, you won&apos;t need to reorder for approximately <strong>{daysUntilReorder} days</strong>.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
