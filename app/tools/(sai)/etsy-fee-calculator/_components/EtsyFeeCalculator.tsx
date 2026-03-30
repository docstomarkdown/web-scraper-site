"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tag, DollarSign, Percent, ChevronDown, ChevronUp, Settings2, CreditCard, Megaphone } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
import { EtsyFeeBreakdown } from "./EtsyFeeBreakdown"

export function EtsyFeeCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [showAdvanced, setShowAdvanced] = useState(false)

    // Revenue
    const [price, setPrice] = useState<number | "">("") // Item Price
    const [shippingCharged, setShippingCharged] = useState<number | "">("") // Shipping Charged to Customer

    // Costs
    const [itemCost, setItemCost] = useState<number | "">("") // Product Cost
    const [shippingCost, setShippingCost] = useState<number | "">("") // Shipping Cost

    // Fees (Advanced – defaults set on mount)
    const [listingFee, setListingFee] = useState<number | "">("") // $0.20
    const [transactionFeeVar, setTransactionFeeVar] = useState<number | "">("") // 6.5%
    const [paymentFeeVar, setPaymentFeeVar] = useState<number | "">("") // 3%
    const [paymentFeeFixed, setPaymentFeeFixed] = useState<number | "">("") // $0.25
    const [offsiteAdsFee, setOffsiteAdsFee] = useState<number | "">("") // 0 / 12 / 15%

    // Results
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalFees, setTotalFees] = useState(0)
    const [netProfit, setNetProfit] = useState(0)
    const [margin, setMargin] = useState(0)
    // Breakdown sub-fees
    const [calcListingFee, setCalcListingFee] = useState(0)
    const [calcTransFee, setCalcTransFee] = useState(0)
    const [calcPayFee, setCalcPayFee] = useState(0)
    const [calcAdFee, setCalcAdFee] = useState(0)

    useEffect(() => {
        if (listingFee === "") setListingFee(0.20)
        if (transactionFeeVar === "") setTransactionFeeVar(6.5)
        if (paymentFeeVar === "") setPaymentFeeVar(3.0)
        if (paymentFeeFixed === "") setPaymentFeeFixed(0.25)
    }, [])

    const handleReset = () => {
        setPrice("")
        setShippingCharged("")
        setItemCost("")
        setShippingCost("")
        setListingFee(0.20)
        setTransactionFeeVar(6.5)
        setPaymentFeeVar(3.0)
        setPaymentFeeFixed(0.25)
        setOffsiteAdsFee("")
    }

    useEffect(() => {
        const p = Number(price) || 0
        const sc = Number(shippingCharged) || 0
        const cost = Number(itemCost) || 0
        const shipCost = Number(shippingCost) || 0
        const lFee = Number(listingFee) || 0
        const tRate = Number(transactionFeeVar) || 0
        const payRate = Number(paymentFeeVar) || 0
        const payFixed = Number(paymentFeeFixed) >= 0 && paymentFeeFixed !== "" ? Number(paymentFeeFixed) : 0
        const adRate = Number(offsiteAdsFee) || 0

        const revenue = p + sc

        if (revenue === 0) {
            setTotalRevenue(0)
            setTotalFees(0)
            setNetProfit(0)
            setMargin(0)
            setCalcListingFee(0)
            setCalcTransFee(0)
            setCalcPayFee(0)
            setCalcAdFee(0)
            return
        }

        const transFee = revenue * (tRate / 100)
        const payFee = (revenue * (payRate / 100)) + payFixed
        const adFee = revenue * (adRate / 100)
        const fees = lFee + transFee + payFee + adFee

        const totalCost = cost + shipCost + fees
        const profit = revenue - totalCost
        const calcMarginVal = (profit / revenue) * 100

        setTotalRevenue(revenue)
        setTotalFees(fees)
        setNetProfit(profit)
        setMargin(calcMarginVal)
        setCalcListingFee(lFee)
        setCalcTransFee(transFee)
        setCalcPayFee(payFee)
        setCalcAdFee(adFee)
    }, [price, shippingCharged, itemCost, shippingCost, listingFee, transactionFeeVar, paymentFeeVar, paymentFeeFixed, offsiteAdsFee])

    const isValid =
        price !== "" &&
        itemCost !== "" &&
        transactionFeeVar !== "" &&
        paymentFeeVar !== "" &&
        paymentFeeFixed !== "" && Number(paymentFeeFixed) >= 0

    const isLive = totalRevenue > 0

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            title="Sale & Fee Details"
                            description="Enter your item price, costs, and Etsy fee settings."
                            onReset={handleReset}
                            guideId="etsy-fee-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">

                                {/* 💰 Revenue */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        groupingTitle="Revenue"
                                        groupingIcon={Tag}
                                        label="Item Price"
                                        value={price}
                                        onChange={setPrice}
                                        placeholder="50.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="The listed selling price of your item on Etsy, before any fees are deducted."
                                        isCurrency
                                        currency={currency}
                                        autoFocus
                                    />
                                    <CalculatorInput
                                        label="Shipping Charged to Customer"
                                        value={shippingCharged}
                                        onChange={setShippingCharged}
                                        placeholder="0.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="The shipping fee you charge the buyer at checkout. Etsy applies transaction fees to this amount too."
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                    />
                                </div>

                                {/* 📦 Costs */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Costs"
                                        groupingIcon={DollarSign}
                                        label="Product Cost"
                                        value={itemCost}
                                        onChange={setItemCost}
                                        placeholder="15.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="What you paid to make or source the item — materials, labor, or wholesale cost."
                                        isCurrency
                                        currency={currency}
                                    />
                                    <CalculatorInput
                                        label="Shipping Cost"
                                        value={shippingCost}
                                        onChange={setShippingCost}
                                        placeholder="4.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="Your out-of-pocket cost to ship the item — postage, packaging, and supplies."
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                    />
                                </div>

                                {/* ⚙️ Fees (Advanced – optional) — Collapsible */}
                                <div className="space-y-3">
                                    {/* Toggle row */}
                                    <div
                                        className="w-full relative calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5"
                                        data-has-title="false"
                                    >
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                        <button
                                            onClick={() => setShowAdvanced(!showAdvanced)}
                                            className="flex items-center gap-2 w-full group -ml-[33px] relative z-10"
                                        >
                                            <div className="w-7 h-7 rounded-lg bg-white ring-[6px] ring-white border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200 shadow-sm">
                                                <Settings2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            </div>
                                            <span className="text-[15px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors flex-1 text-left tracking-tight">
                                                Fees
                                                <span className="ml-1.5 font-normal italic text-[12px] text-slate-400 lowercase tracking-normal group-hover:text-blue-400/80 transition-colors">(advanced – optional)</span>
                                            </span>
                                            {showAdvanced
                                                ? <ChevronUp className="w-4 h-4 text-slate-400" />
                                                : <ChevronDown className="w-4 h-4 text-slate-400" />
                                            }
                                        </button>
                                    </div>

                                    {/* Collapsible content */}
                                    {showAdvanced && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {/* Unified Advanced Fees Group */}
                                            <div className="w-full relative calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5">
                                                <div className="relative w-full">
                                                    {/* Vertical line */}
                                                    <div className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0" style={{ top: "14px", bottom: "10px" }} />
                                                    
                                                    {/* Header */}
                                                    <div className="flex items-center gap-2 -ml-[33px] mb-3 relative h-7">
                                                        <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                                            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                                                        </div>
                                                        <span className="text-[15px] font-bold text-slate-600 z-10 tracking-tight">Marketplace Fees</span>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <CalculatorInput
                                                            hideSeparator={true}
                                                            label="Listing Fee"
                                                            value={listingFee}
                                                            onChange={setListingFee}
                                                            placeholder="0.20"
                                                            step={0.01}
                                                            min={0}
                                                            max={10000}
                                                            tooltip="Etsy charges $0.20 each time you publish or renew a listing — paid upfront, not per sale."
                                                            isCurrency
                                                            currency={currency}
                                                            hint={listingFee === 0.20 ? "Standard rate: $0.20 per listing" : undefined}
                                                        />
                                                        <CalculatorInput
                                                            label="Transaction Fee (%)"
                                                            value={transactionFeeVar}
                                                            onChange={setTransactionFeeVar}
                                                            placeholder="6.5"
                                                            suffix="%"
                                                            step={0.01}
                                                            min={0}
                                                            max={100}
                                                            tooltip="Etsy's cut of every completed sale, applied to the item price + shipping charged. Standard rate is 6.5%."
                                                            hint={transactionFeeVar === 6.5 ? "Standard rate: 6.5% of total sale" : undefined}
                                                        />
                                                        <CalculatorInput
                                                            label="Payment Processing (%)"
                                                            value={paymentFeeVar}
                                                            onChange={setPaymentFeeVar}
                                                            placeholder="3.0"
                                                            suffix="%"
                                                            step={0.01}
                                                            min={0}
                                                            max={100}
                                                            tooltip="The percentage Etsy Payments charges per transaction. In the US the standard rate is 3%."
                                                            hint={paymentFeeVar === 3.0 ? "US standard: 3% + $0.25" : undefined}
                                                        />
                                                        <CalculatorInput
                                                            label="Fixed Processing Fee"
                                                            value={paymentFeeFixed}
                                                            onChange={setPaymentFeeFixed}
                                                            placeholder="0.25"
                                                            step={0.01}
                                                            min={0}
                                                            max={10000}
                                                            tooltip="The flat per-transaction fee charged by Etsy Payments. In the US this is $0.25 per order."
                                                            isCurrency
                                                            currency={currency}
                                                            hint={paymentFeeFixed === 0.25 ? "US standard: $0.25 per order" : undefined}
                                                        />
                                                        <CalculatorInput
                                                            label="Offsite Ads (%)"
                                                            value={offsiteAdsFee}
                                                            onChange={setOffsiteAdsFee}
                                                            placeholder="0"
                                                            suffix="%"
                                                            step={0.01}
                                                            min={0}
                                                            max={100}
                                                            tooltip="Only applies if a buyer found you through an Etsy Offsite Ad. Use 15% if under $10k/year sales, or 12% if over."
                                                            isOptional
                                                            hint={!offsiteAdsFee || Number(offsiteAdsFee) === 0 ? "Typical: 15% (opt-in) or 12% (>$10k sales)" : undefined}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="Etsy fees & payout"
                        profitLossKey="netProfit"
                        liveBadgeText={
                            isValid
                                ? netProfit > 0 ? "Profitable Sale"
                                : netProfit === 0 ? "Break Even"
                                : "Unprofitable Sale"
                                : "Draft"
                        }
                        liveBadgeColor={
                            isValid
                                ? netProfit > 0 ? "emerald"
                                : netProfit === 0 ? "amber"
                                : "rose"
                                : "slate"
                        }
                        dynamicMessages={{
                            positive: `You keep ${margin.toFixed(1)}% of the sale price as net profit after all Etsy fees and costs.`,
                            negative: `Your costs exceed your revenue. Consider raising your price or reducing fees.`,
                            neutral: "You broke even on this sale. No profit, no loss."
                        }}
                        primaryResult={{
                            value: netProfit,
                            label: "Net Profit (You Earn)",
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
                                tooltip: "The combined total of the Etsy listing fee, transaction fee, payment processing fee, and any Offsite Ads fee."
                            },
                            {
                                key: "margin",
                                label: "Profit Margin",
                                value: margin.toFixed(1),
                                unit: "%",
                                icon: Percent,
                                tooltip: "Your net profit shown as a percentage of your total gross revenue (item price + shipping charged)."
                            }
                        ]}
                        checklistItems={[
                            { key: "price", label: "Item Price", isComplete: price !== "" },
                            { key: "cost", label: "Product Cost", isComplete: itemCost !== "" },
                            { key: "transactionFee", label: "Transaction Fee", isComplete: transactionFeeVar !== "" },
                            { key: "paymentFee", label: "Payment Processing", isComplete: paymentFeeVar !== "" && paymentFeeFixed !== "" && Number(paymentFeeFixed) >= 0 }
                        ]}
                    >
                    </ResultSummaryCard>

                    <div className="mt-4">
                        <EtsyFeeBreakdown
                            isDetailed={showAdvanced}
                            netProfit={netProfit}
                            listingFee={calcListingFee}
                            transFee={calcTransFee}
                            payFee={calcPayFee}
                            adFee={calcAdFee}
                            productCost={Number(itemCost) || 0}
                            shippingCost={Number(shippingCost) || 0}
                            totalRevenue={totalRevenue}
                            currency={currency}
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}