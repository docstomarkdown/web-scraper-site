"use client"

import React, { useState, useEffect } from "react"
import { MadhuToolTemplate, InputCardHeader, MadhuSubHeader, ActionButtons } from "../ToolTemplate"
import { ResultFeedbackCard, Counter, FadeIn, CalculatorInput } from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    Users,
    Mail,
    MousePointer,
    DollarSign,
    TrendingUp,
    Target,
    BarChart3,
    Percent,
    PieChart,
    Info
} from "lucide-react"
import { cn } from "@/lib/utils"


export default function EmailROICalculator() {
    // Inputs
    const [listSize, setListSize] = useState<number | "">("")
    const [campaignCost, setCampaignCost] = useState<number | "">("")
    const [openRate, setOpenRate] = useState<number | "">("")
    const [clickThroughRate, setClickThroughRate] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")
    const [averageOrderValue, setAverageOrderValue] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setListSize("")
        setCampaignCost("")
        setOpenRate("")
        setClickThroughRate("")
        setConversionRate("")
        setAverageOrderValue("")
    }

    // Calculations
    const size = val(listSize)
    const cost = val(campaignCost)
    const openPct = val(openRate)
    const ctrPct = val(clickThroughRate)
    const convPct = val(conversionRate)
    const aov = val(averageOrderValue)

    const opens = Math.round(size * (openPct / 100))
    const clicks = Math.round(size * (ctrPct / 100))
    const conversions = Math.round(clicks * (convPct / 100))
    const revenue = conversions * aov
    const netProfit = revenue - cost
    const roi = cost > 0 ? (netProfit / cost) * 100 : 0
    const roas = cost > 0 ? revenue / cost : 0
    const cpa = conversions > 0 ? cost / conversions : 0
    const revenuePerSubscriber = size > 0 ? revenue / size : 0

    const hasAnyData = size > 0 || cost > 0

    // Funnel bar percentages
    const maxFunnelVal = size
    const openPctBar = maxFunnelVal > 0 ? Math.min((opens / maxFunnelVal) * 100, 100) : 0
    const clickPctBar = maxFunnelVal > 0 ? Math.min((clicks / maxFunnelVal) * 100, 100) : 0
    const convPctBar = maxFunnelVal > 0 ? Math.min((conversions / maxFunnelVal) * 100, 100) : 0

    const formatCurrency = (v: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(v)

    const formatNumber = (v: number) => new Intl.NumberFormat("en-US").format(Math.round(v))

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        const text =
            `Email Marketing ROI Results:\n\n` +
            `Campaign Data:\n` +
            `- List Size: ${formatNumber(size)}\n` +
            `- Campaign Cost: ${formatCurrency(cost)}\n` +
            `- Open Rate: ${openPct}%\n` +
            `- Click-Through Rate: ${ctrPct}%\n` +
            `- Conversion Rate: ${convPct}%\n` +
            `- Average Order Value: ${formatCurrency(aov)}\n\n` +
            `Results:\n` +
            `- Total Revenue: ${formatCurrency(revenue)}\n` +
            `- Net Profit: ${formatCurrency(netProfit)}\n` +
            `- ROI: ${roi.toFixed(2)}%\n` +
            `- ROAS: ${roas.toFixed(2)}x\n` +
            `- CPA: ${formatCurrency(cpa)}\n` +
            `- Est. Opens: ${formatNumber(opens)}\n` +
            `- Est. Clicks: ${formatNumber(clicks)}\n` +
            `- Est. Conversions: ${formatNumber(conversions)}`

        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        })
    }

    const toolComponent = (
        <FadeIn className="w-full max-w-7xl mx-auto py-2 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* Left Column: Inputs */}
                <div className="lg:col-start-2 lg:col-span-6 flex flex-col h-full space-y-4">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl overflow-hidden h-full flex flex-col">
                        <InputCardHeader
                            title="Campaign Data"
                            subtitle="Enter your list size, costs, and performance rates."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-6 md:p-8 space-y-8 flex-1 flex flex-col">
                            {/* List & Cost */}
                            <div className="space-y-3">
                                <MadhuSubHeader title="Campaign setup" icon={Mail} withDot={false} className="mb-2" />
                                <div className="flex flex-col gap-2.5">
                                    <CalculatorInput
                                        label="List Size"
                                        value={listSize}
                                        onChange={setListSize}
                                        placeholder="10000"
                                        tooltip="Total number of subscribers receiving this campaign."
                                    />
                                    <CalculatorInput
                                        label="Campaign Cost"
                                        value={campaignCost}
                                        onChange={setCampaignCost}
                                        placeholder="500.00"
                                        tooltip="All-in cost: ESP fees, design, copywriting, and your time."
                                        prefix="$"
                                    />
                                </div>
                            </div>

                            {/* Engagement Rates */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className="space-y-3">
                                <MadhuSubHeader title="Engagement metrics" icon={MousePointer} withDot={false} className="mb-2" />
                                <div className="flex flex-col gap-2.5">
                                    <CalculatorInput
                                        label="Open Rate"
                                        value={openRate}
                                        onChange={setOpenRate}
                                        placeholder="20"
                                        tooltip="Percentage of subscribers who open the email. Industry avg: ~20–25%."
                                        suffix="%"
                                    />
                                    <CalculatorInput
                                        label="Click-Through Rate"
                                        value={clickThroughRate}
                                        onChange={setClickThroughRate}
                                        placeholder="3.0"
                                        tooltip="Percentage of total emails delivered that resulted in at least one click."
                                        suffix="%"
                                    />
                                </div>
                            </div>

                            {/* Conversion */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className="space-y-3">
                                <MadhuSubHeader title="Conversion metrics" icon={Target} withDot={false} className="mb-2" />
                                <div className="flex flex-col gap-2.5">
                                    <CalculatorInput
                                        label="Conversion Rate"
                                        value={conversionRate}
                                        onChange={setConversionRate}
                                        placeholder="5.0"
                                        tooltip="Percentage of clickers who complete a purchase."
                                        suffix="%"
                                    />
                                    <CalculatorInput
                                        label="Avg. Order Value"
                                        value={averageOrderValue}
                                        onChange={setAverageOrderValue}
                                        placeholder="50.00"
                                        tooltip="The average value of each order generated from this campaign."
                                        prefix="$"
                                    />
                                </div>
                            </div>

                            <ActionButtons
                                onReset={handleReset}
                                onCopy={handleCopy}
                                isCopied={isCopied}
                                className="pt-2 mt-auto"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-32">

                    {/* Primary Result Card */}
                    <ResultFeedbackCard
                        title="ROI (Return on Investment)"
                        titleLabel={!hasAnyData ? "AWAITING DATA" : netProfit >= 0 ? "PROFIT" : "LOSS"}
                        labelClassName={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded-md transition-colors",
                            !hasAnyData ? "bg-slate-500/20 text-slate-300" :
                                netProfit >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-200"
                        )}
                        mainValue={
                            <div className="flex items-baseline gap-2">
                                <Counter
                                    value={roi}
                                    formatter={(v: number) => `${v.toFixed(2)}%`}
                                    className={cn("text-white", hasAnyData && netProfit < 0 && "text-red-200 font-black")}
                                />
                                <span className="text-white/60 text-lg font-medium">Return</span>
                            </div>
                        }
                    >
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-300">ROAS</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Revenue generated for every $1 spent. (Revenue / Cost)
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-lg font-bold text-blue-400">
                                        <Counter value={roas} formatter={(v: number) => `${v.toFixed(2)}x`} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-300">Net Profit</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Total Revenue minus Campaign Cost.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className={cn("text-lg font-bold", netProfit >= 0 ? "text-blue-400" : "text-red-300")}>
                                        <Counter value={netProfit} formatter={(v: number) => formatCurrency(v)} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-300">CPA</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Cost Per Acquisition — how much each conversion costs you.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-lg font-bold text-blue-400">
                                        <Counter value={cpa} formatter={(v: number) => formatCurrency(v)} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-300">Rev / Sub</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Revenue generated per subscriber on your list.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-lg font-bold text-blue-400">
                                        <Counter value={revenuePerSubscriber} formatter={(v: number) => formatCurrency(v)} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>

                    {/* Funnel Breakdown */}
                    {/* Funnel Breakdown - Budget Allocation Style */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden p-3">
                        <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <PieChart className="w-3.5 h-3.5 text-blue-500" />
                            Subscriber Funnel
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Step 1: Opens */}
                            <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100 flex flex-col justify-between h-full relative group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded-full">
                                        {openPct}%
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500 mb-0.5">Opens</p>
                                    <p className="text-lg font-bold text-blue-400">{formatNumber(opens)}</p>
                                </div>
                                {/* Connector Line (Desktop) */}
                                <div className="hidden sm:block absolute top-1/2 -right-4 w-4 h-[2px] bg-slate-200 z-10" />
                            </div>

                            {/* Step 2: Clicks */}
                            <div className="bg-purple-50/50 rounded-xl p-3 border border-purple-100 flex flex-col justify-between h-full relative group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                                        <MousePointer className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-purple-600 bg-purple-100/50 px-2 py-0.5 rounded-full">
                                        {ctrPct}%
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500 mb-0.5">Clicks</p>
                                    <p className="text-lg font-bold text-blue-400">{formatNumber(clicks)}</p>
                                </div>
                                {/* Connector Line (Desktop) */}
                                <div className="hidden sm:block absolute top-1/2 -right-4 w-4 h-[2px] bg-slate-200 z-10" />
                            </div>

                            {/* Step 3: Conversions */}
                            <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100 flex flex-col justify-between h-full relative group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                                        <Target className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-full">
                                        {convPct}%
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500 mb-0.5">Sales</p>
                                    <p className="text-lg font-bold text-blue-400">{formatNumber(conversions)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Total Revenue</span>
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                                <Info className="h-3.5 w-3.5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                            Calculated as: Conversions × Average Order Value (AOV)
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <span className="text-lg font-black text-slate-900">{formatCurrency(revenue)}</span>
                        </div>
                    </Card>

                </div>
            </div>
        </FadeIn>
    )

    return (
        <MadhuToolTemplate
            title="Email Marketing ROI Calculator"
            toolComponent={toolComponent}
            howToUseSteps={[
                {
                    title: "Set Your Baseline",
                    description: "Enter your total <strong>List Size</strong> and total <strong>Campaign Cost</strong>. This establishes your potential reach and the break-even point you need to surpass.",
                    icon: Users
                },
                {
                    title: "Model the Funnel",
                    description: "Input your estimated <strong>Open Rate</strong>, <strong>Click-Through Rate (CTR)</strong>, and <strong>Conversion Rate</strong>. The tool will instantly visualize your 'Subscriber Funnel' to show exactly where you are losing potential customers.",
                    icon: BarChart3
                },
                {
                    title: "Calculate Financials",
                    description: "Add your <strong>Average Order Value (AOV)</strong> to unlock key profitability metrics like <strong>ROI</strong>, <strong>ROAS</strong>, and <strong>Net Profit</strong>.",
                    icon: DollarSign
                }
            ]}
            howToUseGoal={{
                title: "Maximize Campaign Profitability",
                description: "Use this tool to forecast email campaign profitability before you send, or to analyse past performance to optimize future spend and fix under-performing campaigns.",
                icon: TrendingUp
            }}
            hiddenTruthInsights={[
                {
                    title: "The 'Vanity Metric' Trap",
                    description: "High open rates feel good, but they don't pay the bills. A campaign with 15% opens and 5% clicks is often far more profitable than 30% opens and 1% clicks. Always optimize for the action closest to the sale.",
                    icon: Target,
                    stat: "Profit",
                    statLabel: "Over Popularity",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Don't optimize for opens at the expense of clearer, sales-focused subject lines."
                },
                {
                    title: "The $1 Subscriber Rule",
                    description: "A healthy, engaged email list should generate roughly $1 per subscriber per month. If your <strong>Revenue per Subscriber</strong> is significantly lower (e.g., $0.10), your list may be 'cold' or your offers aren't resonating.",
                    icon: DollarSign,
                    stat: "$1.00",
                    statLabel: "Target Rev/Sub",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Revenue per Subscriber is a key health metric for your email program."
                },
                {
                    title: "CPA vs. LTV Context",
                    description: "Don't panic if your Cost Per Acquisition (CPA) seems high on a single email. If your Customer Lifetime Value (LTV) is high, you can afford to pay more to acquire a customer because they will buy again later without ad spend.",
                    icon: TrendingUp,
                    stat: "LTV",
                    statLabel: "Wins Long Term",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Consider the long-term value of a customer, not just the first sale."
                }
            ]}
            faqs={[
                {
                    question: "How is 'Total Revenue' calculated?",
                    answer: "It is the simple product of your estimated <strong>Conversions</strong> (Sales) multiplied by your **Average Order Value (AOV)**. This represents the gross sales generated by the campaign before any costs are subtracted."
                },
                {
                    question: "Why does my 'Subscriber Funnel' show 0 conversions?",
                    answer: "If your list size or conversion rate is very small (e.g., 100 subscribers with a 1% conversion rate), the mathematical result might be less than 1 conversion (0.01). The tool rounds to the nearest whole number, showing 0 sales. Try increasing your list size to see projected results."
                },
                {
                    question: "What is a 'good' Click-Through Rate (CTR)?",
                    answer: "Across most industries, a <strong>2–5% CTR</strong> is considered average. Anything above 5% indicates highly relevant content or a very engaged list. If you are below 1%, consider testing new subject lines or clearer calls-to-action (CTAs)."
                },
                {
                    question: "Should I include my own time in 'Campaign Cost'?",
                    answer: "Yes! For an accurate ROI, you should assign a dollar value to the hours you spent writing, designing, and setting up the campaign. This helps you understand if your time is being invested profitably."
                }
            ]}
        />
    )
}
