"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"


export function DropshippingCalculator() {
    // State for inputs - initialized as empty for placeholder effect
    const [currency, setCurrency] = useState("USD")
    const [purchasePrice, setPurchasePrice] = useState<number | "">("")
    const [salesPrice, setSalesPrice] = useState<number | "">("")
    const [ordersReceived, setOrdersReceived] = useState<number | "">("")
    const [cancelledQty, setCancelledQty] = useState<number | "">("")
    const [rtoPercentage, setRtoPercentage] = useState<number | "">("")
    const [adsCostPerProduct, setAdsCostPerProduct] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [otherCosts, setOtherCosts] = useState<number | "">("")

    // Helper to safely get number for calculation
    const val = (v: number | "") => (v === "" ? 0 : v)

    // Currency symbols map
    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const getSymbol = () => currencySymbols[currency] || "$"
    const handleReset = () => {
        setPurchasePrice("")
        setSalesPrice("")
        setOrdersReceived("")
        setCancelledQty("")
        setRtoPercentage("")
        setAdsCostPerProduct("")
        setShippingCost("")
        setOtherCosts("")
    }

    // Calculations
    const purchasePriceVal = val(purchasePrice)
    const salesPriceVal = val(salesPrice)
    const ordersReceivedVal = val(ordersReceived)
    const cancelledQtyVal = val(cancelledQty)
    const rtoPercentageVal = val(rtoPercentage)
    const adsCostPerProductVal = val(adsCostPerProduct)
    const shippingCostVal = val(shippingCost)
    const otherCostsVal = val(otherCosts)

    const marginPerOrder = salesPriceVal - purchasePriceVal
    const totalOrderValue = salesPriceVal * ordersReceivedVal

    const rtoQty = Math.floor(ordersReceivedVal * (rtoPercentageVal / 100))
    const deliveredOrders = Math.max(0, ordersReceivedVal - cancelledQtyVal - rtoQty)

    const totalRtoCost = rtoQty * shippingCostVal
    const totalAdsCost = ordersReceivedVal * adsCostPerProductVal
    const totalOtherCosts = ordersReceivedVal * otherCostsVal
    const totalPurchaseCost = deliveredOrders * purchasePriceVal
    const revenueGenerated = deliveredOrders * salesPriceVal

    const totalExpenses = totalPurchaseCost + totalAdsCost + totalRtoCost + (deliveredOrders * shippingCostVal) + totalOtherCosts
    const netProfit = revenueGenerated - totalExpenses

    // Currency formatter
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(val)
    }

    const symbol = getSymbol()

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs (Col Span 7) */}
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CalculatorCardHeader

                                description="Calculate your dropshipping net profit."

                                onReset={handleReset}

                                currency={currency}

                                onCurrencyChange={setCurrency}

                            />
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label={`Purchase Price (${symbol})`}
                                    value={purchasePrice}
                                    onChange={setPurchasePrice}
                                    placeholder="50"
                                    max={10000}
                                    tooltip="The cost to buy the product from your supplier."
                                />
                                <CalculatorInput
                                    label={`Selling Price (${symbol})`}
                                    value={salesPrice}
                                    onChange={setSalesPrice}
                                    placeholder="150"
                                    max={20000}
                                    tooltip="The price you sell the product for on your store."
                                />
                                <CalculatorInput
                                    label="Orders Received"
                                    value={ordersReceived}
                                    onChange={setOrdersReceived}
                                    placeholder="100"
                                    max={10000}
                                    tooltip="Total number of orders you received from customers."
                                />
                                <CalculatorInput
                                    label={`Shipping Cost (${symbol})`}
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="8"
                                    max={500}
                                    tooltip="Average shipping cost per order. Applied to all delivered orders."
                                />
                                <CalculatorInput
                                    label={`Ads Cost per Product (CPA) (${symbol})`}
                                    value={adsCostPerProduct}
                                    onChange={setAdsCostPerProduct}
                                    placeholder="20"
                                    max={5000}
                                    tooltip="CPA (Cost Per Acquisition): The average amount you spend on ads to get just one successfully placed order."
                                />
                                <CalculatorInput
                                    label="Return to Origin (RTO %)"
                                    value={rtoPercentage}
                                    onChange={setRtoPercentage}
                                    placeholder="15"
                                    max={100}
                                    tooltip="RTO (Return to Origin): The percentage of orders that are sent back to you because they couldn't be delivered."
                                />
                                <CalculatorInput
                                    label="Cancelled Qty (Before Shipping)"
                                    value={cancelledQty}
                                    onChange={setCancelledQty}
                                    placeholder="5"
                                    max={ordersReceivedVal}
                                    tooltip="Orders cancelled by customers before you shipped them."
                                />
                                <CalculatorInput
                                    label={`Other Cost per Product (${symbol})`}
                                    value={otherCosts}
                                    onChange={setOtherCosts}
                                    placeholder="2"
                                    max={1000}
                                    tooltip="Other: Additional expenses per order like packaging, gateway fees, or handling."
                                />

                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results (Col Span 5) - Sticky & Dark Theme */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">

                        <ResultFeedbackCard
                            title="Net Profit / Loss"
                            titleLabel="Live"
                            labelClassName="text-blue-400 bg-slate-800/50 border-slate-700/50"
                            mainValue={
                                <Counter value={netProfit} formatter={formatCurrency} key={currency} />
                            }
                            valueColor={netProfit > 0 ? "text-blue-400" : (netProfit < 0 ? "text-red-400" : "text-white")}
                            mainMetricLabel="Status"
                            mainMetricValue={deliveredOrders > 0 ? (netProfit >= 0 ? "PROFIT" : "LOSS") : "Waiting for Data"}
                            mainMetricColor={deliveredOrders > 0 ? (netProfit >= 0 ? "text-blue-400" : "text-red-400") : "text-slate-500"}
                            secondaryMetrics={[
                                {
                                    label: "Revenue",
                                    value: <Counter value={revenueGenerated} formatter={formatCurrency} key={currency} />,
                                    color: "text-slate-100"
                                }
                            ]}
                        />

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <ResultFeedbackCard
                                variant="compact"
                                title="Margin per Sale"
                                mainValue={<Counter value={marginPerOrder} formatter={formatCurrency} key={currency} />}
                                tooltip="The profit you make on each sale before advertising and RTO costs. Calculated as: Selling Price - Product Cost."
                            />
                            <ResultFeedbackCard
                                variant="compact"
                                title="ROAS"
                                mainValue={<><Counter value={totalAdsCost > 0 ? (revenueGenerated / totalAdsCost) : 0} formatter={(v) => v.toFixed(2)} />X</>}
                                tooltip="ROAS (Return on Ad Spend): The money you make for every $1 spent on ads. Aim for 4X or more."
                            />
                            <ResultFeedbackCard
                                variant="compact"
                                title="Delivered"
                                mainValue={<Counter value={deliveredOrders} />}
                                tooltip="Delivered Orders: Total orders that successfully reached your customers."
                            />
                            <ResultFeedbackCard
                                variant="compact"
                                title="RTO Orders"
                                mainValue={<Counter value={rtoQty} />}
                                valueColor="text-orange-600"
                                tooltip="RTO (Return to Origin): Orders sent back to you. This costs you double shipping plus wasted ad money."
                            />
                        </div>

                        {/* Breakdown Card */}
                        {deliveredOrders > 0 ? (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                                <div className="px-5 py-3.5 border-b border-slate-100">
                                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">P&L Breakdown</p>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    <div className="flex justify-between items-center px-5 py-3.5">
                                        <span className="text-sm text-slate-600">Total Product Cost</span>
                                        <span className="text-sm font-semibold text-slate-800">{formatCurrency(totalPurchaseCost)}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-3.5">
                                        <span className="text-sm text-slate-600">Total Ad Spend</span>
                                        <span className="text-sm font-semibold text-slate-800">{formatCurrency(totalAdsCost)}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-3.5">
                                        <span className="text-sm text-slate-600">Total Shipping</span>
                                        <span className="text-sm font-semibold text-slate-800">{formatCurrency(deliveredOrders * shippingCostVal)}</span>
                                    </div>
                                    {(totalRtoCost > 0 || totalOtherCosts > 0) && (
                                        <div className="flex justify-between items-center px-5 py-3.5">
                                            <span className="text-sm text-slate-600">RTO & Other Costs</span>
                                            <span className="text-sm font-semibold text-slate-800">{formatCurrency(totalRtoCost + totalOtherCosts)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center px-5 py-4 bg-slate-50">
                                        <span className="text-sm font-bold text-blue-600">Net Profit</span>
                                        <span className={cn("text-base font-bold", netProfit >= 0 ? "text-blue-600" : "text-red-600")}>
                                            {formatCurrency(netProfit)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                                <p className="text-sm text-slate-400">Enter order details to calculate profit.</p>
                            </div>
                        )}
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}


