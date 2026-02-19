"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Package, DollarSign, Ship, Percent } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function LandedCostCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [productCost, setProductCost] = useState<number | "">("")
    const [units, setUnits] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [dutyRate, setDutyRate] = useState<number | "">("")
    const [insuranceCost, setInsuranceCost] = useState<number | "">("")
    const [otherFees, setOtherFees] = useState<number | "">("")

    const handleReset = () => {
        setProductCost("")
        setUnits("")
        setShippingCost("")
        setDutyRate("")
        setInsuranceCost("")
        setOtherFees("")
    }

    const val = (v: number | "") => (v === "" ? 0 : v)

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"



    // Calculations
    const unitCost = val(productCost)
    const unitCount = val(units)
    const shipping = val(shippingCost)
    const duty = val(dutyRate)
    const insurance = val(insuranceCost)
    const fees = val(otherFees)

    const totalProductCost = unitCost * unitCount
    const dutyAmount = (totalProductCost * duty) / 100
    const totalLandedCost = totalProductCost + shipping + dutyAmount + insurance + fees
    const landedCostPerUnit = unitCount > 0 ? totalLandedCost / unitCount : 0
    const costUplift = unitCost > 0 ? ((landedCostPerUnit - unitCost) / unitCost) * 100 : 0

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            description="Enter product and import cost details."
                            onReset={handleReset}
                            guideId="landed-cost-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Product Cost Per Unit (${symbol})`}
                                value={productCost}
                                onChange={setProductCost}
                                placeholder="25.00"
                                max={1000000}
                                tooltip="The cost of a single unit from your supplier, before any shipping or import fees."
                            />
                            <CalculatorInput
                                label="Units Ordered"
                                value={units}
                                onChange={setUnits}
                                placeholder="100"
                                max={1000000}
                                suffix="units"
                                tooltip="Total number of units in this shipment or order."
                            />
                            <CalculatorInput
                                label={`International Shipping (${symbol})`}
                                value={shippingCost}
                                onChange={setShippingCost}
                                placeholder="150.00"
                                max={1000000}
                                tooltip="Total freight and shipping cost for the entire shipment (sea, air, or express)."
                            />
                            <CalculatorInput
                                label="Customs Duty Rate"
                                value={dutyRate}
                                onChange={setDutyRate}
                                placeholder="5"
                                max={100}
                                suffix="%"
                                tooltip="The import duty percentage based on your product's HS (Harmonized System) code. Check your country's customs schedule."
                            />
                            <CalculatorInput
                                label={`Insurance Cost (${symbol})`}
                                value={insuranceCost}
                                onChange={setInsuranceCost}
                                placeholder="50.00"
                                max={1000000}
                                tooltip="Cargo insurance premium to protect your shipment during transit."
                            />
                            <CalculatorInput
                                label={`Other Fees (${symbol})`}
                                value={otherFees}
                                onChange={setOtherFees}
                                placeholder="25.00"
                                max={1000000}
                                tooltip="Any additional costs like customs brokerage, port handling, warehousing, or inspection fees."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    {/* Main Landed Cost Card */}
                    <ResultFeedbackCard
                        title="Landed Cost Per Unit"
                        mainValue={
                            <Counter value={landedCostPerUnit} formatter={formatCurrency} key={`lc-${currency}`} />
                        }
                        valueColor={
                            landedCostPerUnit > 0 && costUplift <= 50
                                ? "text-emerald-400"
                                : (costUplift > 100 ? "text-red-400" : "text-amber-400")
                        }
                    />

                    {/* Cost Breakdown Card */}
                    {unitCount > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Landed Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Total Product Cost</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(totalProductCost)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Freight & Insurance</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(shipping + insurance)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Import Taxes & Fees</span>
                                    <span className="text-sm font-semibold text-amber-600">{formatCurrency(dutyAmount + fees)}</span>
                                </div>

                                {costUplift > 0 && (
                                    <div className="flex justify-between items-center px-5 py-3.5 bg-slate-50/50">
                                        <span className="text-sm font-medium text-slate-500">Cost Uplift</span>
                                        <span className="text-sm font-bold text-slate-700">+{costUplift.toFixed(1)}%</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center px-5 py-4 bg-blue-50/30">
                                    <span className="text-sm font-bold text-slate-900">Total Landed Investment</span>
                                    <span className={cn("text-base font-bold text-blue-700")}>
                                        {formatCurrency(totalLandedCost)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter order details to calculate landed cost.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}


