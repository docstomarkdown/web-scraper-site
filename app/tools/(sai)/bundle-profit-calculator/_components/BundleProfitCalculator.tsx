"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HelpCircle, DollarSign, Percent, Package, AlertCircle, Plus, Trash2 } from "lucide-react"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

type Product = {
    id: string
    name: string
    cost: number | ""
    price: number | ""
}

export function BundleProfitCalculator() {
    // State
    const [currency, setCurrency] = useState("USD")
    const [showAdvanced, setShowAdvanced] = useState(false)

    // Dynamic Products State
    const [products, setProducts] = useState<Product[]>([
        { id: "A", name: "Product A", cost: "", price: "" },
        { id: "B", name: "Product B", cost: "", price: "" }
    ])

    // Bundle Logic
    const [bundleMode, setBundleMode] = useState<"percentage" | "fixed">("percentage")
    const [bundleValue, setBundleValue] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    // Calculations
    const totalCost = products.reduce((sum, p) => sum + val(p.cost), 0)
    const originalPrice = products.reduce((sum, p) => sum + val(p.price), 0)

    let bundlePrice = 0
    let discountAmount = 0
    let discountPercent = 0

    if (showAdvanced) {
        if (bundleMode === "percentage") {
            discountPercent = val(bundleValue)
            discountAmount = originalPrice * (discountPercent / 100)
            bundlePrice = originalPrice - discountAmount
        } else {
            bundlePrice = val(bundleValue)
            discountAmount = originalPrice - bundlePrice
            discountPercent = originalPrice > 0 ? (discountAmount / originalPrice) * 100 : 0
        }
    } else {
        // Simple Mode: Bundle price is just the sum of items
        bundlePrice = originalPrice
        discountAmount = 0
        discountPercent = 0
    }

    const profit = bundlePrice - totalCost
    const margin = bundlePrice > 0 ? (profit / bundlePrice) * 100 : 0

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥',
        CNY: '¥', AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$',
        BRL: 'R$', KRW: '₩', RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr',
        PLN: 'zł', THB: '฿', IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺',
        SAR: '﷼', NZD: 'NZ$', EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"

    // Actions
    const addProduct = () => {
        const nextLetter = String.fromCharCode(65 + products.length) // A, B, C...
        const newProduct: Product = {
            id: Math.random().toString(36).substr(2, 9),
            name: `Product ${nextLetter}`,
            cost: "",
            price: ""
        }
        setProducts([...products, newProduct])
    }

    const removeProduct = (id: string) => {
        if (products.length <= 1) return // Prevent removing last product
        setProducts(products.filter(p => p.id !== id))
    }

    const updateProduct = (id: string, field: keyof Product, value: any) => {
        setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p))
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }

    // Helper to get color for product badge (cycling through some colors)
    const getBadgeColor = (index: number) => {
        const colors = [
            "bg-blue-100 text-blue-600",
            "bg-purple-100 text-purple-600",
            "bg-emerald-100 text-emerald-600",
            "bg-amber-100 text-amber-600",
            "bg-rose-100 text-rose-600",
            "bg-indigo-100 text-indigo-600",
        ]
        return colors[index % colors.length]
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div>
                                <CardTitle className="text-xl font-bold text-slate-800">
                                    Product Details
                                </CardTitle>
                                <CardDescription>Enter costs and selling prices for each item in the bundle.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">

                            {products.map((product, index) => (
                                <div key={product.id} className="relative group p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                            <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", getBadgeColor(index))}>
                                                {String.fromCharCode(65 + index)}
                                            </span>
                                            {index < 2 ? product.name : `Product ${String.fromCharCode(65 + index)}`}
                                        </h3>
                                        {products.length > 1 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeProduct(product.id)}
                                                className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <CalculatorInput
                                            label={`Cost (${symbol})`}
                                            value={product.cost}
                                            onChange={(v) => updateProduct(product.id, 'cost', v)}
                                            placeholder="0.00"
                                        />
                                        <CalculatorInput
                                            label={`Selling Price (${symbol})`}
                                            value={product.price}
                                            onChange={(v) => updateProduct(product.id, 'price', v)}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            ))}

                            <Button
                                variant="outline"
                                className="w-full border-dashed border-2 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                                onClick={addProduct}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Another Product
                            </Button>

                        </CardContent>
                    </Card>

                    {/* Advanced Toggle */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-semibold text-slate-800">Advanced Bundle Strategy</Label>
                            <p className="text-xs text-slate-500">Apply discounts or set a fixed custom bundle price.</p>
                        </div>
                        <Button
                            variant={showAdvanced ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className={cn(
                                "transition-all duration-200",
                                showAdvanced ? "bg-slate-800 hover:bg-slate-700" : ""
                            )}
                        >
                            {showAdvanced ? "Disable Advanced" : "Enable Advanced"}
                        </Button>
                    </div>

                    {showAdvanced && (
                        <FadeIn>
                            <Card className="border border-slate-200 shadow-sm bg-white">
                                <CardHeader className="pb-4 border-b border-slate-50">
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Bundle Strategy
                                    </CardTitle>
                                    <CardDescription>Define how you want to price your bundle.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    <div className="space-y-3">
                                        <Label>Discount Type</Label>
                                        <RadioGroup
                                            defaultValue="percentage"
                                            value={bundleMode}
                                            onValueChange={(v: string) => {
                                                setBundleMode(v as "percentage" | "fixed")
                                                setBundleValue("") // Reset value on mode switch
                                            }}
                                            className="flex gap-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="percentage" id="percentage" />
                                                <Label htmlFor="percentage">Percentage Discount (%)</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="fixed" id="fixed" />
                                                <Label htmlFor="fixed">Fixed Bundle Price ({symbol})</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <CalculatorInput
                                        label={bundleMode === "percentage" ? "Discount Percentage" : `Bundle Price (${symbol})`}
                                        value={bundleValue}
                                        onChange={setBundleValue}
                                        placeholder={bundleMode === "percentage" ? "15" : "0.00"}
                                        suffix={bundleMode === "percentage" ? "%" : undefined}
                                        tooltip={bundleMode === "percentage"
                                            ? "Percentage off the combined original prices."
                                            : "The final price you want to sell the bundle for."}
                                    />
                                </CardContent>
                            </Card>
                        </FadeIn>
                    )}
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Bundle Profit Margin"
                        titleLabel={margin >= 20 ? "Highly Profitable" : (margin > 0 ? "Profitable" : "Unprofitable")}
                        labelClassName={margin >= 20 ? "text-emerald-400" : (margin > 0 ? "text-yellow-400" : "text-red-400")}
                        mainValue={
                            <Counter value={margin} formatter={(v) => `${v.toFixed(2)}%`} />
                        }
                        valueColor={margin >= 20 ? "text-emerald-400" : (margin > 0 ? "text-yellow-400" : "text-red-400")}
                        secondaryMetrics={[
                            {
                                label: "Net Profit",
                                value: <Counter value={profit} formatter={formatCurrency} key={currency} />,
                                color: profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                            },
                            {
                                label: "Consumer Savings",
                                value: <Counter value={discountPercent} formatter={(v) => `${v.toFixed(1)}%`} />,
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ResultCard
                            title="Bundle Price"
                            value={<Counter value={bundlePrice} formatter={formatCurrency} key={`bp-${currency}`} />}
                            icon={Package}
                        />
                        <ResultCard
                            title="Total Cost"
                            value={<Counter value={totalCost} formatter={formatCurrency} key={`tc-${currency}`} />}
                            icon={DollarSign}
                            subtext="Combined costs"
                        />
                    </div>

                    <Card className="border border-slate-200 shadow-sm bg-slate-50">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-800">Breakdown</p>
                                    <p className="text-xs text-slate-500">
                                        Selling these <strong>{products.length} items</strong> separately would generate <strong>{formatCurrency(originalPrice)}</strong> in revenue with <strong>{formatCurrency(originalPrice - totalCost)}</strong> profit.
                                        By bundling, you sacrifice <strong>{formatCurrency(discountAmount)}</strong> in revenue to potentially increase sales volume.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </FadeIn>
    )
}

function ResultCard({ title, value, icon: Icon, subtext }: { title: string, value: React.ReactNode, icon: any, subtext?: string }) {
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-slate-300 transition-colors group">
            <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">{title}</p>
                <div className="text-xl font-bold text-slate-900">{value}</div>
                {subtext && <p className="text-[10px] text-slate-400 mt-1 font-medium">{subtext}</p>}
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    )
}
