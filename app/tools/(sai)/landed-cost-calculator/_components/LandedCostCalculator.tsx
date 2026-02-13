"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Package, DollarSign, Ship, Percent } from "lucide-react"
import { CurrencyCombobox } from "@/components/ui/currency-combobox"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function LandedCostCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [productCost, setProductCost] = useState<number | "">("")
    const [units, setUnits] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [dutyRate, setDutyRate] = useState<number | "">("")
    const [insuranceCost, setInsuranceCost] = useState<number | "">("")
    const [otherFees, setOtherFees] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"

    const scrollToGuide = () => {
        const element = document.getElementById('landed-cost-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Inputs
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-6 w-6 rounded-full"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </Button>
                                </div>
                                <CardDescription>Enter product and import cost details.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
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
                        secondaryMetrics={[
                            {
                                label: "Total Landed Cost",
                                value: <Counter value={totalLandedCost} formatter={formatCurrency} key={`tlc-${currency}`} />,
                                color: "text-blue-400"
                            },
                            {
                                label: "Duty Amount",
                                value: <Counter value={dutyAmount} formatter={formatCurrency} key={`duty-${currency}`} />,
                                color: "text-amber-400"
                            }
                        ]}
                    />

                    {/* Breakdown Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard
                            title="Total Product Cost"
                            value={<Counter value={totalProductCost} formatter={formatCurrency} key={`tpc-${currency}`} />}
                            icon={DollarSign}
                        />
                        <ResultCard
                            title="Cost Uplift"
                            value={<Counter value={costUplift} formatter={(v) => `${v.toFixed(1)}%`} />}
                            icon={Percent}
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}

function ResultCard({ title, value, icon: Icon }: { title: string, value: React.ReactNode, icon: React.ComponentType<{ className?: string }> }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
                <p className="text-lg font-bold text-slate-800">{value}</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    )
}
