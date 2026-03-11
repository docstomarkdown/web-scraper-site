"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, RotateCcw, AlertTriangle, DollarSign, Calculator } from "lucide-react";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
export function ReturnRateCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [unitsSold, setUnitsSold] = useState<number | "">("")
    const [unitsReturned, setUnitsReturned] = useState<number | "">("")
    // New Financial Inputs
    const [sellingPrice, setSellingPrice] = useState<number | "">("")
    const [returnCost, setReturnCost] = useState<number | "">("")
    const [returnRate, setReturnRate] = useState<number>(0);
    const [lostRevenue, setLostRevenue] = useState<number>(0);
    const [totalReturnCost, setTotalReturnCost] = useState<number>(0);
    const [profitLeakage, setProfitLeakage] = useState<number>(0);
    const val = (v: number | "") => (v === "" ? 0 : v);
    const sold = val(unitsSold);
    const returned = val(unitsReturned);
    const price = val(sellingPrice);
    const cost = val(returnCost);
    useEffect(() => {
        if (sold > 0) {
            const calculatedRate = (returned / sold) * 100;
            setReturnRate(calculatedRate);
            // Financial Impact
            const revenueLost = returned * price;
            const processingFees = returned * cost;
            setLostRevenue(revenueLost);
            setTotalReturnCost(processingFees);
            setProfitLeakage(revenueLost + processingFees); // Total financial hit (Revenue Lost + Fees)
            // Note: "Profit Leakage" definition can vary. 
            // Often it's (Refund Amount + Return Cost) - (Salvage Value). 
            // Simplified here as: Revenue Refunded + Processing Cost.
        } else {
            setReturnRate(0);
            setLostRevenue(0);
            setTotalReturnCost(0);
            setProfitLeakage(0);
        }
    }, [sold, returned, price, cost]);
    const handleReset = () => {
        setUnitsSold("");
        setUnitsReturned("");
        setSellingPrice("");
        setReturnCost("");
    };
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: currency, maximumFractionDigits: 0
        }).format(val);
    };
    // Determine Status
    let status = "Calculate";
    let statusColor = "text-slate-400";
    let statusBg = "bg-slate-100";
    if (sold > 0) {
        if (returnRate < 5) { status = "Excellent"; statusColor = "text-blue-600"; statusBg = "bg-blue-100"; }
        else if (returnRate < 10) { status = "Healthy"; statusColor = "text-blue-600"; statusBg = "bg-blue-100"; }
        else if (returnRate < 15) { status = "Warning"; statusColor = "text-amber-600"; statusBg = "bg-amber-100"; }
        else { status = "High Risk"; statusColor = "text-red-600"; statusBg = "bg-red-100"; }
    }
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader
                            description="Enter sales, returns, and item values."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Volume Data */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Package className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Volume Data</h3>
                                </div>
                                <CalculatorInput
                                    label="Total Units Sold"
                                    value={unitsSold}
                                    onChange={setUnitsSold}
                                    placeholder="1000"
                                    tooltip="Total items shipped in the period."
                                />
                                <CalculatorInput
                                    label="Total Units Returned"
                                    value={unitsReturned}
                                    onChange={setUnitsReturned}
                                    placeholder="50"
                                    tooltip="Total items sent back by customers."
                                />
                            </div>
                            {/* Group 2: Financial Impact */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Financial Impact</h3>
                                </div>
                                <CalculatorInput
                                    label={`Avg. Selling Price (${currency})`}
                                    value={sellingPrice}
                                    onChange={setSellingPrice}
                                    placeholder="25.00"
                                    tooltip="The average revenue lost per return."
                                />
                                <CalculatorInput
                                    label={`Est. Cost per Return (${currency})`}
                                    value={returnCost}
                                    onChange={setReturnCost}
                                    placeholder="5.00"
                                    tooltip="Shipping labels, restocking fees, and processing costs per item."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    {/* Logic Highlight */}
                    <FadeIn delay={0.2}>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-red-600 shrink-0 shadow-sm">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-800 mb-1 leading-tight">Profit Leakage Alert</h4>
                                <p className={cn(
                                    "text-[15px] leading-relaxed max-w-lg transition-colors duration-300 font-medium",
                                    returned > 0 ? "text-slate-600" : "text-slate-400"
                                )}>
                                    Returns aren't just lost sales. Combined with processing costs, these {returned} returns have drained <span className="font-bold text-red-600">{formatCurrency(profitLeakage)}</span> from your bottom line this period.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Return Rate"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <Counter
                                    value={returnRate}
                                    formatter={(val) => val.toFixed(2)}
                                    className="text-5xl font-bold"
                                />
                                <span className="text-3xl font-bold text-slate-400">%</span>
                            </div>
                        }
                        secondaryMetrics={[
                            { label: "Lost Revenue", value: formatCurrency(lostRevenue), color: "text-red-400" },
                            { label: "Processing Costs", value: formatCurrency(totalReturnCost), color: "text-orange-400" }
                        ]}
                    />
                    {/* Breakdown Card */}
                    {sold > 0 && (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-red-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Financial Impact Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Lost Revenue</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(lostRevenue)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Processing Costs</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(totalReturnCost)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5 bg-red-50/20">
                                    <span className="text-sm font-bold text-slate-900">Total Profit Leakage</span>
                                    <span className="text-base font-bold text-red-600">{formatCurrency(profitLeakage)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Insight Card */}
                    <Card className="border border-slate-200 shadow-sm p-6 space-y-3 bg-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <RotateCcw className="w-5 h-5 text-blue-600" />
                                Return Health
                            </h3>
                            {sold > 0 && (
                                <span className={cn("text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full", statusBg, statusColor)}>
                                    {status}
                                </span>
                            )}
                        </div>
                        <div className="space-y-3">
                            <InsightItem
                                label="Total Profit Leakage"
                                value={formatCurrency(profitLeakage)}
                                description="Total financial impact (Refunds + Costs)."
                                icon={DollarSign}
                                color="text-red-600"
                                bg="bg-red-50"
                            />
                            <InsightItem
                                label="Units Returned"
                                value={returned.toString()}
                                description={`Out of ${sold} units sold.`}
                                icon={Package}
                                color="text-slate-600"
                                bg="bg-slate-50"
                            />
                        </div>
                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Rate Benchmarks</p>
                                {sold > 0 && (
                                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md border",
                                        returnRate < 5 ? "text-blue-600 bg-blue-50 border-blue-100" :
                                            returnRate < 10 ? "text-blue-600 bg-blue-50 border-blue-100" :
                                                "text-red-600 bg-red-50 border-red-100"
                                    )}>
                                        {returnRate.toFixed(1)}% Rate
                                    </span>
                                )}
                            </div>
                            <div className="relative pt-2 pb-1">
                                {/* Visual Scale: Green -> Blue -> Red */}
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-blue-400" style={{ width: '25%' }} /> {/* < 5% */}
                                    <div className="h-full bg-blue-400" style={{ width: '25%' }} /> {/* < 10% */}
                                    <div className="h-full bg-amber-400" style={{ width: '25%' }} /> {/* < 15% */}
                                    <div className="h-full bg-red-400" style={{ width: '25%' }} /> {/* > 15% */}
                                </div>
                                {/* Dynamic Pointer */}
                                {sold > 0 && (
                                    <motion.div
                                        initial={{ left: 0 }}
                                        animate={{
                                            // Scale: 0% to 20% Rate. If Rate > 20%, caps at 100%.
                                            left: `${Math.min((returnRate / 20) * 100, 100)}%`
                                        }}
                                        className="absolute top-0 -mt-0.5 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow-md z-10 -ml-2 transition-all"
                                    />
                                )}
                            </div>
                            <div className="flex justify-between mt-2 text-[11px] font-bold text-slate-500 italic">
                                <span>Excellent</span>
                                <span>Healthy</span>
                                <span>High Risk</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    );
}
function InsightItem({ label, value, description, icon: Icon, color, bg }: { label: string, value: string, description: string, icon: any, color: string, bg: string }) {
    return (
        <div className="flex gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="flex items-baseline gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{label}</h4>
                    <span className={cn("text-sm font-bold", color)}>{value}</span>
                </div>
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{description}</p>
            </div>
        </div>
    )
}