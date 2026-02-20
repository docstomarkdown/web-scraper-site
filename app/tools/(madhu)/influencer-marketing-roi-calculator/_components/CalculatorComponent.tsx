"use client"

import React, { useState } from "react"
// Using relative paths to bypass potential alias resolution issues in this route group
import { Card, CardContent } from "../../../../../components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../../components/ui/tooltip"
import { HelpCircle, Info, TrendingUp, TrendingDown, Users, Target, BarChart3, PieChart, Calculator, Gift, Truck, Camera, Share2, Heart, CheckCircle2 } from "lucide-react"
import { ActionButtons, InputCardHeader } from "../../ToolTemplate"
import { ResultFeedbackCard, Counter, CurrencyCombobox, FadeIn } from "../../../_shared/components"
import { cn } from "../../../../../lib/utils"
import { Input } from "../../../../../components/ui/input"
import { Label } from "../../../../../components/ui/label"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"

function InfluencerInput({
    label,
    value,
    onChange,
    placeholder,
    tooltip
}: {
    label: string,
    value: number | "",
    onChange: (v: number | "") => void,
    placeholder: string,
    tooltip: string
}) {
    return (
        <div className="flex items-center justify-between gap-4 w-full group/input">
            <div className="flex items-center gap-2 w-[170px] shrink-0">
                <Label className="text-base font-semibold text-slate-700 whitespace-nowrap">
                    {label}
                </Label>
                {tooltip && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" tabIndex={-1} className="text-slate-500 hover:text-blue-600 transition-colors">
                                    <Info className="h-3.5 w-3.5" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                {tooltip}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
            <Input
                type="number"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value === "" ? "" : parseFloat(e.target.value))}
                placeholder={placeholder}
                className="h-10 w-[160px] text-right text-base font-medium border-slate-200 bg-white shadow-sm placeholder:text-slate-300 placeholder:font-normal placeholder:italic hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
            />
        </div>
    )
}

export function InfluencerROICalculator() {
    const [currency, setCurrency] = useState("USD")


    // Investment States
    const [influencerFee, setInfluencerFee] = useState<number | "">("")
    const [productCogs, setProductCogs] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [managementFee, setManagementFee] = useState<number | "">("")
    const [contentRightsFee, setContentRightsFee] = useState<number | "">("")
    const [boostingSpend, setBoostingSpend] = useState<number | "">("")

    // Performance States
    const [totalSales, setTotalSales] = useState<number | "">("")
    const [conversions, setConversions] = useState<number | "">("")
    const [impressions, setImpressions] = useState<number | "">("")
    const [engagements, setEngagements] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {

        setInfluencerFee("")
        setProductCogs("")
        setShippingCost("")
        setManagementFee("")
        setContentRightsFee("")
        setBoostingSpend("")
        setTotalSales("")
        setConversions("")
        setImpressions("")
        setEngagements("")
    }

    // Calculations
    const fee = val(influencerFee)
    const pCogs = val(productCogs)
    const ship = val(shippingCost)
    const mgmt = val(managementFee)
    const rights = val(contentRightsFee)
    const boost = val(boostingSpend)

    const sales = val(totalSales)
    const convs = val(conversions)
    const imps = val(impressions)
    const engs = val(engagements)

    const totalInvestment = fee + pCogs + ship + mgmt + rights + boost
    const hasAnyData = totalInvestment > 0 || sales > 0 || convs > 0 || imps > 0 || engs > 0
    const netProfit = sales - totalInvestment
    const roi = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0
    const roas = totalInvestment > 0 ? sales / totalInvestment : 0

    const cpa = convs > 0 ? totalInvestment / convs : 0
    const cpm = imps > 0 ? (totalInvestment / imps) * 1000 : 0
    const cpe = engs > 0 ? totalInvestment / engs : 0

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        const text = `Influencer Marketing ROI Results:\n\n` +
            `Investment Details:\n` +
            `- Influencer Fee: ${formatCurrency(fee)}\n` +
            `- Product & Shipping: ${formatCurrency(pCogs + ship)}\n` +
            `- Management & Rights: ${formatCurrency(mgmt + rights)}\n` +
            `- Boosting Spend: ${formatCurrency(boost)}\n` +
            `Total Investment: ${formatCurrency(totalInvestment)}\n\n` +
            `Performance Results:\n` +
            `- Total Sales: ${formatCurrency(sales)}\n` +
            `- Net Profit: ${formatCurrency(netProfit)}\n` +
            `- ROI: ${roi.toFixed(2)}%\n` +
            `- ROAS: ${roas.toFixed(2)}x\n` +
            `- CPA: ${formatCurrency(cpa)}\n` +
            `- CPM: ${formatCurrency(cpm)}\n` +
            `- CPE: ${formatCurrency(cpe)}`

        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        })
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }

    // Breakdown Percentages
    const getPercent = (amount: number) => {
        return totalInvestment > 0 ? Math.min(Math.max((amount / totalInvestment) * 100, 0), 100) : 0
    }

    const feePct = getPercent(fee)
    const productPct = getPercent(pCogs + ship)
    const managementPct = getPercent(mgmt + rights)
    const boostPct = getPercent(boost)

    return (
        <FadeIn className="w-full max-w-7xl mx-auto py-4 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-8 space-y-4">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl overflow-hidden h-full">
                        <div className="flex flex-row items-center justify-between border-b border-slate-100 pr-6">
                            <InputCardHeader
                                title="Campaign Budget"
                                subtitle="Log every dollar invested into the campaign."
                                scrollId="how-to-use"
                            />
                            <div className="w-[145px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </div>

                        <CardContent className="p-4 space-y-3">


                            {/* Primary Investment */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-bold text-slate-400 tracking-tight">
                                        Direct costs
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <InfluencerInput
                                        label="Influencer Fee"
                                        value={influencerFee}
                                        onChange={setInfluencerFee}
                                        placeholder="Ex: 1000.00"
                                        tooltip="The flat fee paid directly to the creator."
                                    />
                                    <InfluencerInput
                                        label="Boosting / Ad Spend"
                                        value={boostingSpend}
                                        onChange={setBoostingSpend}
                                        placeholder="Ex: 500.00"
                                        tooltip="Amount spent on Meta/TikTok ads to boost the creator's post."
                                    />
                                </div>
                            </div>

                            {/* Logistics & Product */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-bold text-slate-400 tracking-tight">
                                        Fulfillment & logistics
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <InfluencerInput
                                        label="Product COGS"
                                        value={productCogs}
                                        onChange={setProductCogs}
                                        placeholder="Ex: 50.00"
                                        tooltip="The manufacturing cost or wholesale price of gifted products."
                                    />
                                    <InfluencerInput
                                        label="Shipping & Packaging"
                                        value={shippingCost}
                                        onChange={setShippingCost}
                                        placeholder="Ex: 15.00"
                                        tooltip="Costs to ship the units to the influencer."
                                    />
                                </div>
                            </div>

                            {/* Overhead */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-bold text-slate-400 tracking-tight">
                                        Management & rights
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <InfluencerInput
                                        label="Agency/Mgmt Fee"
                                        value={managementFee}
                                        onChange={setManagementFee}
                                        placeholder="Ex: 250.00"
                                        tooltip="Any commission or fee paid to an agency or manager."
                                    />
                                    <InfluencerInput
                                        label="Content Rights Fee"
                                        value={contentRightsFee}
                                        onChange={setContentRightsFee}
                                        placeholder="Ex: 100.00"
                                        tooltip="Additional cost for whitelisting or spark ad rights."
                                    />
                                </div>
                            </div>

                            {/* Performance Data */}
                            <div className="space-y-2 pt-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-bold text-blue-600 tracking-tight">
                                        Performance metrics
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <InfluencerInput
                                        label="Total Sales Revenue"
                                        value={totalSales}
                                        onChange={setTotalSales}
                                        placeholder="Ex: 8500.00"
                                        tooltip="The total gross revenue generated from tracking links/codes."
                                    />
                                    <InfluencerInput
                                        label="Total Conversions"
                                        value={conversions}
                                        onChange={setConversions}
                                        placeholder="Ex: 125"
                                        tooltip="Number of successful orders or leads generated."
                                    />
                                    <InfluencerInput
                                        label="Total Impressions"
                                        value={impressions}
                                        onChange={setImpressions}
                                        placeholder="Ex: 50000"
                                        tooltip="Number of times the content was viewed."
                                    />
                                    <InfluencerInput
                                        label="Total Engagements"
                                        value={engagements}
                                        onChange={setEngagements}
                                        placeholder="Ex: 2500"
                                        tooltip="Total likes, comments, and shares."
                                    />
                                </div>
                            </div>

                            <ActionButtons
                                onReset={handleReset}
                                onCopy={handleCopy}
                                isCopied={isCopied}
                                className="pt-2"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-full flex flex-col gap-3">

                    {/* Primary Result: ROI */}
                    <ResultFeedbackCard
                        title="ROI (Return on Investment)"
                        titleLabel={!hasAnyData ? "AWAITING DATA" : netProfit >= 0 ? "PROFIT" : "LOSS"}
                        labelClassName={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded-md transition-colors",
                            !hasAnyData ? "bg-slate-500/20 text-slate-300" :
                                netProfit >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-200"
                        )}
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <Counter
                                        value={roi}
                                        formatter={(v: number) => `${v.toFixed(2)}%`}
                                        className={cn("text-white", hasAnyData && netProfit < 0 && "text-red-200 font-black")}
                                    />
                                    <span className="text-white/60 text-lg font-medium">Return</span>
                                </div>
                            </div>
                        }
                    >
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5 group/metric">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400">ROAS</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300 hover:text-emerald-400 transition-colors">
                                                        <Info className="h-3 w-3" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Revenue generated for every $1 spent. (Sales / Investment)
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-xl font-bold text-emerald-400">
                                        <Counter value={roas} formatter={(v: number) => `${v.toFixed(2)}x`} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5 group/metric">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400">CPA (Cost/Sale)</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300 hover:text-blue-400 transition-colors">
                                                        <Info className="h-3 w-3" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    How much it costs to acquire one customer. (Investment / Sales)
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-xl font-bold text-blue-400">
                                        <Counter value={cpa} formatter={(v: number) => formatCurrency(v)} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5 group/metric">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400">CPM (1k Views)</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300 hover:text-purple-400 transition-colors">
                                                        <Info className="h-3 w-3" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Cost per 1,000 impressions. ((Investment / Impressions) * 1000)
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-xl font-bold text-purple-400">
                                        <Counter value={cpm} formatter={(v: number) => formatCurrency(v)} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5 group/metric">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400">CPE (Engage)</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300 hover:text-amber-400 transition-colors">
                                                        <Info className="h-3 w-3" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Cost for every like, comment, or share. (Investment / Engagements)
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-xl font-bold text-amber-400">
                                        <Counter value={cpe} formatter={(v: number) => formatCurrency(v)} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>

                    {/* Investment Breakdown */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden p-4 flex-1 flex flex-col">
                        <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-blue-500" />
                            Budget Allocation
                        </h4>

                        <div className="flex items-center gap-4 flex-1 min-h-0">
                            {/* Left: Chart */}
                            <div className="h-[140px] w-[140px] relative shrink-0">
                                {totalInvestment > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RechartsPie>
                                            <Pie
                                                data={[
                                                    { name: "Influencer Fee", value: fee, color: "#3b82f6" },
                                                    { name: "Ad Boosting", value: boost, color: "#10b981" },
                                                    { name: "Product & Logistics", value: pCogs + ship, color: "#f59e0b" },
                                                    { name: "Management & Rights", value: mgmt + rights, color: "#a855f7" },
                                                ].filter(i => i.value > 0)}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={60}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {/* @ts-ignore */}
                                                {[
                                                    { name: "Influencer Fee", value: fee, color: "#3b82f6" },
                                                    { name: "Ad Boosting", value: boost, color: "#10b981" },
                                                    { name: "Product & Logistics", value: pCogs + ship, color: "#f59e0b" },
                                                    { name: "Management & Rights", value: mgmt + rights, color: "#a855f7" },
                                                ].filter(i => i.value > 0).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                formatter={(value: number) => formatCurrency(value)}
                                                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                        </RechartsPie>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-sm border-2 border-dashed border-slate-100 rounded-full">
                                        No data
                                    </div>
                                )}
                                {/* Center Label */}
                                {totalInvestment > 0 && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-[10px] font-medium text-slate-400">Total</span>
                                        <span className="text-xs font-bold text-slate-900">{formatCurrency(totalInvestment)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Right: Legend */}
                            <div className="flex-1 grid grid-cols-1 gap-2">
                                <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                        <span className="text-slate-600 font-medium truncate">Influencer Fees</span>
                                    </div>
                                    <span className="font-bold text-slate-900 ml-1">{feePct.toFixed(0)}%</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                        <span className="text-slate-600 font-medium truncate">Ad Boosting</span>
                                    </div>
                                    <span className="font-bold text-slate-900 ml-1">{boostPct.toFixed(0)}%</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                        <span className="text-slate-600 font-medium truncate">Product & Logistics</span>
                                    </div>
                                    <span className="font-bold text-slate-900 ml-1">{productPct.toFixed(0)}%</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                                        <span className="text-slate-600 font-medium truncate">Management & Rights</span>
                                    </div>
                                    <span className="font-bold text-slate-900 ml-1">{managementPct.toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>




                    </Card>

                </div>
            </div >
        </FadeIn >
    )
}
