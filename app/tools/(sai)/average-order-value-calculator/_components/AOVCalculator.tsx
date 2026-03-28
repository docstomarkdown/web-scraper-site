"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, ShoppingCart } from "lucide-react"
import { FadeIn, CalculatorInput, ResultSummaryCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function AOVCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [revenue, setRevenue] = useState<number | "">("")
    const [orders, setOrders] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }

    const symbol = currencySymbols[currency] || "$"

    const handleReset = () => {
        setRevenue("")
        setOrders("")
    }

    // Calculation
    const revenueVal = val(revenue)
    const ordersVal = val(orders)
    let aov = 0
    let isValid = false

    if (revenueVal > 0 && ordersVal > 0) {
        aov = revenueVal / ordersVal
        isValid = true
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            title="Revenue & Order Metrics"
                            description="Enter your gross revenue and total order count."
                            onReset={handleReset}
                            guideId="aov-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="space-y-3 pt-6">
                            <CalculatorInput
                                label={`Total Revenue`}
                                value={revenue}
                                onChange={setRevenue}
                                placeholder="50000.00"
                                max={100000000}
                                tooltip="Total gross sales revenue for the period."
                            />
                            
                            <CalculatorInput
                                label="Total Number of Orders"
                                value={orders}
                                onChange={setOrders}
                                placeholder="850"
                                max={1000000}
                                tooltip="The total count of individual orders placed."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="AOV"
                        liveBadgeText={
                            isValid 
                                ? aov > 150 ? "High Average Order" 
                                : aov > 40 ? "Standard Average Order" 
                                : "Low Average Order"
                                : "Enter Data"
                        }
                        liveBadgeColor={
                            isValid 
                                ? aov > 150 ? "emerald" 
                                : aov > 40 ? "blue" 
                                : "amber"
                                : "slate"
                        }
                        primaryResult={{
                            value: aov,
                            label: "Average Order Value",
                            isCurrency: true,
                            key: "aov"
                        }}
                        secondaryResults={[
                            {
                                key: "revenue",
                                label: "Total Revenue",
                                value: revenueVal,
                                isCurrency: true,
                                icon: DollarSign
                            },
                            {
                                key: "orders",
                                label: "Total Orders",
                                value: ordersVal,
                                isCurrency: false,
                                icon: ShoppingCart
                            }
                        ]}
                    />
                </div>
            </div>
        </FadeIn>
    )
}