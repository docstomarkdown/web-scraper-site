"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorInput } from "@/app/tools/_shared/components/CalculatorInput";
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard";
import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { AlertTriangle, Tag, Truck, TrendingUp, Package, Calculator } from "lucide-react";
import { CalculatorCardHeader } from "@/app/tools/_shared/components/CalculatorCardHeader";
import { MOQBreakdown } from "./MOQBreakdown";

export function MOQCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [unitPrice, setUnitPrice] = useState<number | "">("");
    const [moq, setMoq] = useState<number | "">("");
    const [shippingCost, setShippingCost] = useState<number | "">("");
    const [miscCost, setMiscCost] = useState<number | "">("");
    const [monthlySales, setMonthlySales] = useState<number | "">("");

    const handleReset = () => {
        setUnitPrice("");
        setMoq("");
        setShippingCost("");
        setMiscCost("");
        setMonthlySales("");
    }

    const val = (v: number | "") => (v === "" ? 0 : v);

    const [totalInvestment, setTotalInvestment] = useState<number>(0);
    const [effectiveCostPerUnit, setEffectiveCostPerUnit] = useState<number>(0);
    const [monthsInventory, setMonthsInventory] = useState<number>(0);
    const [riskAssessment, setRiskAssessment] = useState<{
        level: "good" | "bad" | "neutral";
        text: string;
        color: string;
    }>({ level: "neutral", text: "Enter details", color: "text-slate-400" });

    useEffect(() => {
        const p = val(unitPrice);
        const m = val(moq);
        const s = val(shippingCost);
        const c = val(miscCost);
        const v = val(monthlySales);

        // 1. Total Investment
        const investment = (p * m) + s + c;
        setTotalInvestment(investment);

        // 2. Effective Cost Per Unit
        if (m > 0) {
            setEffectiveCostPerUnit(investment / m);
        } else {
            setEffectiveCostPerUnit(0);
        }

        // 3. Months of Inventory & Risk
        if (v > 0 && m > 0) {
            const months = m / v;
            setMonthsInventory(months);
            if (months <= 3) {
                setRiskAssessment({ level: "good", text: "Low Risk", color: "text-blue-500" });
            } else if (months <= 6) {
                setRiskAssessment({ level: "neutral", text: "Moderate Risk", color: "text-amber-500" });
            } else {
                setRiskAssessment({ level: "bad", text: "High Risk", color: "text-rose-500" });
            }
        } else {
            setMonthsInventory(0);
            setRiskAssessment({ level: "neutral", text: "Enter Sales", color: "text-slate-400" });
        }
    }, [unitPrice, moq, shippingCost, miscCost, monthlySales]);

    const isCalculated = val(unitPrice) > 0 && val(moq) > 0;

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader
                            title="MOQ Details"
                            description="Enter your supplier pricing, shipping, and sales data."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Supplier Details"
                                    groupingIcon={Tag}
                                    label="Cost per Unit"
                                    value={unitPrice}
                                    isCurrency
                                    currency={currency}
                                    onChange={setUnitPrice}
                                    placeholder="10.00"
                                    tooltip="Price of one product from your supplier"
                                />
                                <CalculatorInput
                                    label="Minimum Order Quantity (MOQ)"
                                    value={moq}
                                    onChange={setMoq}
                                    placeholder="500"
                                    tooltip="Minimum number of units you must buy"
                                />
                            </div>
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Additional Costs"
                                    groupingIcon={Truck}
                                    label="Shipping Cost"
                                    isOptional
                                    isCurrency
                                    currency={currency}
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="0.00"
                                    tooltip="Total shipping cost for the order"
                                />
                                <CalculatorInput
                                    label="Other Costs"
                                    isOptional
                                    isCurrency
                                    currency={currency}
                                    value={miscCost}
                                    onChange={setMiscCost}
                                    placeholder="0.00"
                                    tooltip="Extra costs like customs, packaging, or fees"
                                />
                            </div>
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Sales Velocity"
                                    groupingIcon={TrendingUp}
                                    label="Monthly Sales (Units)"
                                    value={monthlySales}
                                    onChange={setMonthlySales}
                                    isOptional
                                    placeholder="150"
                                    tooltip="Number of units you expect to sell per month"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        primaryResult={{
                            value: totalInvestment,
                            isCurrency: true,
                            label: "Total Investment",
                            key: "totalInvestment",
                        }}
                        secondaryResults={[
                            {
                                key: "effectiveCostPerUnit",
                                label: "Landed Cost per Unit",
                                value: effectiveCostPerUnit,
                                isCurrency: true,
                                icon: Calculator,
                                tooltip: "Real cost per product including shipping and extra charges"
                            },
                            {
                                key: "inventoryCoverage",
                                label: "Inventory Coverage (Months)",
                                value: `${monthsInventory.toFixed(1)} Months`,
                                icon: Package,
                                tooltip: "How long your stock will last based on your monthly sales"
                            }
                        ]}
                        currency={currency}
                        isCalculated={isCalculated}
                        emptyMessage="Total Investment"
                        liveBadgeText={riskAssessment.level === "good" ? "Low Risk" : riskAssessment.level === "bad" ? "High Risk" : riskAssessment.level === "neutral" && isCalculated ? "Moderate Risk" : "Review Inputs"}
                        liveBadgeColor={riskAssessment.level === "good" ? "blue" : riskAssessment.level === "bad" ? "rose" : riskAssessment.level === "neutral" && isCalculated ? "amber" : "amber"}
                    >
                        <FadeIn delay={0.1}>
                            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] space-y-3 mt-4">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${riskAssessment.level === "bad" ? "text-rose-500" : riskAssessment.level === "good" ? "text-blue-500" : "text-amber-500"}`} />
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-1">
                                            Investment Insight
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {isCalculated && val(monthlySales) > 0 ? (
                                                riskAssessment.level === "bad"
                                                    ? <><strong>{moq} units</strong> covers <strong>{monthsInventory.toFixed(1)} months</strong> of stock — too long. Cash is locked up; negotiate a lower MOQ.</>
                                                    : riskAssessment.level === "good"
                                                        ? <><strong>{moq} units</strong> covers <strong>{monthsInventory.toFixed(1)} months</strong> of stock — healthy range. Cash flow looks efficient.</>
                                                        : <><strong>{moq} units</strong> covers <strong>{monthsInventory.toFixed(1)} months</strong> of stock — moderate. Monitor sales to avoid tying up capital.</>
                                            ) : <>Enter your costs and monthly sales to see an investment risk summary.</>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </ResultSummaryCard>

                    {/* Breakdown Card */}
                    <FadeIn delay={0.2}>
                        <MOQBreakdown
                            unitPrice={val(unitPrice)}
                            moq={val(moq)}
                            shippingCost={val(shippingCost)}
                            miscCost={val(miscCost)}
                            totalInvestment={totalInvestment}
                            currency={currency}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}