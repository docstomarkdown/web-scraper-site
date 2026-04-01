"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    HelpCircle, ShoppingBag, Package, TrendingUp, AlertTriangle,
    CheckCircle2, DollarSign, Percent, Tag, Hash
} from "lucide-react";
import {
    FadeIn, CalculatorInput, CalculatorCardHeader, ResultSummaryCard
} from "@/app/tools/_shared/components";
import { MercariFeeBreakdown } from "./MercariFeeBreakdown";

export function MercariFeeCalculator() {
    const [salePrice, setSalePrice] = useState<number | "">("")
    const [itemCost, setItemCost] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [otherCosts, setOtherCosts] = useState<number | "">("")
    const [soldQuantity, setSoldQuantity] = useState<number | "">(1)

    const handleReset = () => {
        setSalePrice("")
        setItemCost("")
        setShippingCost("")
        setOtherCosts("")
        setSoldQuantity(1)
    }

    const val = (v: number | "") => (v === "" ? 0 : v);

    const price = val(salePrice);
    const cost = val(itemCost);
    const ship = val(shippingCost);
    const other = val(otherCosts);
    const quantity = Math.max(val(soldQuantity) || 1, 1);

    // Mercari Fees: 10% selling fee + 2.9% + $0.50 processing fee
    const sellingFee = price * 0.10;
    const processingFee = price > 0 ? (price * 0.029) + 0.50 : 0;
    const totalFees = sellingFee + processingFee;
    const totalExpenses = cost + ship + other + totalFees;
    const netProfit = price - totalExpenses;
    const margin = price > 0 ? (netProfit / price) * 100 : 0;
    const batchProfit = netProfit * quantity;

    const isCalculated = salePrice !== "";

    const formatCurrency = (v: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(v);

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 lg:sticky lg:top-8">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CalculatorCardHeader
                                title="Listing Details"
                                description="Enter your sale price and cost breakdown to calculate net profit."
                                onReset={handleReset}
                            />
                            <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                                <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                    <div className="space-y-4">
                                        <CalculatorInput
                                            label="Sale Price"
                                            value={salePrice}
                                            onChange={setSalePrice}
                                            placeholder="50.00"
                                            isCurrency
                                            currency="USD"
                                            autoFocus
                                            tooltip="The amount the buyer pays for your item. Mercari's 10% fee and the payment processing fee are both calculated from this number."
                                            groupingTitle="Revenue"
                                            groupingIcon={Tag}
                                            hideSeparator={true}
                                        />
                                        <CalculatorInput
                                            label="Items Sold (Qty)"
                                            value={soldQuantity}
                                            onChange={setSoldQuantity}
                                            placeholder="1"
                                            min={1}
                                            max={10000}
                                            tooltip="Number of identical units sold. Used to project total batch profit."
                                            ignoreChecklist={true}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <CalculatorInput
                                            label="Item Cost"
                                            value={itemCost}
                                            onChange={setItemCost}
                                            placeholder="20.00"
                                            isCurrency
                                            currency="USD"
                                            tooltip="What you paid to acquire the item — purchase price, sourcing, or manufacturing cost."
                                            groupingTitle="Your Costs"
                                            groupingIcon={Package}
                                        />
                                        <CalculatorInput
                                            label="Shipping Cost"
                                            value={shippingCost}
                                            onChange={setShippingCost}
                                            placeholder="0.00"
                                            isCurrency
                                            currency="USD"
                                            tooltip="Only enter this if YOU are paying for the shipping label. Leave blank if the buyer pays shipping."
                                        />
                                        <CalculatorInput
                                            label="Other Expenses"
                                            value={otherCosts}
                                            onChange={setOtherCosts}
                                            placeholder="0.00"
                                            isCurrency
                                            currency="USD"
                                            tooltip="Any extra costs such as packaging materials, bubble wrap, or tape."
                                            isOptional
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-4">
                    <FadeIn delay={0.4} direction="left" className="space-y-4">
                        <ResultSummaryCard
                            panelTitle="Mercari Calculator"
                            isCalculated={isCalculated}
                            currency="USD"
                            emptyMessage="Net Profit"
                            showLiveBadge={true}
                            liveBadgeText={isCalculated ? (netProfit >= 0 ? "Profitable" : "Loss") : "Live"}
                            liveBadgeColor={isCalculated ? (netProfit >= 0 ? "emerald" : "rose") : "blue"}
                            description={
                                isCalculated
                                    ? quantity > 1
                                        ? `Your per-unit profit after all fees. Multiply ×${quantity.toLocaleString()} for batch total.`
                                        : "Your take-home profit after Mercari fees and your costs."
                                    : undefined
                            }
                            primaryResult={{
                                value: netProfit,
                                label: "Net Profit",
                                isCurrency: true,
                                key: "netProfit"
                            }}
                            secondaryResults={[
                                {
                                    key: "totalFees",
                                    label: "Total Fees",
                                    value: totalFees,
                                    isCurrency: true,
                                    icon: DollarSign,
                                    tooltip: `Mercari's 10% selling fee (${formatCurrency(sellingFee)}) plus payment processing of 2.9% + $0.50 (${formatCurrency(processingFee)}).`
                                },
                                {
                                    key: "margin",
                                    label: "Profit Margin",
                                    value: margin.toFixed(1),
                                    unit: "%",
                                    icon: Percent,
                                    tooltip: `(Net Profit ÷ Sale Price) × 100. A margin of ${margin.toFixed(1)}% means you keep ${formatCurrency(netProfit)} for every ${formatCurrency(price)} sold.`
                                },
                                ...(quantity > 1 ? [{
                                    key: "batchProfit",
                                    label: `Batch Profit (×${quantity.toLocaleString()})`,
                                    value: batchProfit,
                                    isCurrency: true,
                                    icon: ShoppingBag,
                                    tooltip: `Total profit if you sell ${quantity.toLocaleString()} identical items at this price.`
                                }] : [])
                            ]}
                            checklistItems={[
                                { key: "price", label: "Sale Price", isComplete: salePrice !== "" },
                                { key: "cost", label: "Item Cost", isComplete: itemCost !== "" },
                            ]}
                        />

                        <MercariFeeBreakdown
                            price={price}
                            cost={cost}
                            ship={ship}
                            other={other}
                            sellingFee={sellingFee}
                            processingFee={processingFee}
                            netProfit={netProfit}
                            currency="USD"
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}