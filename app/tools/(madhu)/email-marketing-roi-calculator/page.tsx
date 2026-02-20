"use client"

import React, { useState, useEffect } from "react"
import { MadhuToolTemplate, InputCardHeader, MadhuSubHeader, ActionButtons } from "../ToolTemplate"
import { ResultFeedbackCard, Counter, FadeIn } from "@/app/tools/_shared/components"
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

function EmailInput({
    label,
    value,
    onChange,
    placeholder,
    tooltip,
    prefix,
    suffix
}: {
    label: string
    value: number | ""
    onChange: (v: number | "") => void
    placeholder: string
    tooltip: string
    prefix?: string
    suffix?: string
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
            <div className="relative w-[160px]">
                {prefix && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">{prefix}</span>
                )}
                <Input
                    type="number"
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(e.target.value === "" ? "" : parseFloat(e.target.value))
                    }
                    placeholder={placeholder}
                    className={cn(
                        "h-10 w-full text-right text-base font-medium border-slate-200 bg-white shadow-sm placeholder:text-slate-400 placeholder:italic hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all",
                        prefix && "pl-7"
                    )}
                />
                {suffix && (
                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">{suffix}</span>
                )}
            </div>
        </div>
    )
}

export default function EmailROICalculator() {
    // Inputs
    const [listSize, setListSize] = useState<number | "">(10000)
    const [campaignCost, setCampaignCost] = useState<number | "">(500)
    const [openRate, setOpenRate] = useState<number | "">(20)
    const [clickThroughRate, setClickThroughRate] = useState<number | "">(3)
    const [conversionRate, setConversionRate] = useState<number | "">(5)
    const [averageOrderValue, setAverageOrderValue] = useState<number | "">(50)

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setListSize(10000)
        setCampaignCost(500)
        setOpenRate(20)
        setClickThroughRate(3)
        setConversionRate(5)
        setAverageOrderValue(50)
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
        <FadeIn className="w-full max-w-7xl mx-auto py-4 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-8 space-y-4">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl overflow-hidden">
                        <InputCardHeader
                            title="Campaign Data"
                            subtitle="Enter your list size, costs, and performance rates."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-4 md:p-6 space-y-5">
                            {/* List & Cost */}
                            <div className="space-y-2">
                                <MadhuSubHeader title="Campaign setup" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <EmailInput
                                        label="List Size"
                                        value={listSize}
                                        onChange={setListSize}
                                        placeholder="Ex: 10000"
                                        tooltip="Total number of subscribers receiving this campaign."
                                    />
                                    <EmailInput
                                        label="Campaign Cost"
                                        value={campaignCost}
                                        onChange={setCampaignCost}
                                        placeholder="Ex: 500.00"
                                        tooltip="All-in cost: ESP fees, design, copywriting, and your time."
                                        prefix="$"
                                    />
                                </div>
                            </div>

                            {/* Engagement Rates */}
                            <div className="space-y-2">
                                <MadhuSubHeader title="Engagement metrics" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <EmailInput
                                        label="Open Rate"
                                        value={openRate}
                                        onChange={setOpenRate}
                                        placeholder="Ex: 20"
                                        tooltip="Percentage of subscribers who open the email. Industry avg: ~20–25%."
                                        suffix="%"
                                    />
                                    <EmailInput
                                        label="Click-Through Rate"
                                        value={clickThroughRate}
                                        onChange={setClickThroughRate}
                                        placeholder="Ex: 3.0"
                                        tooltip="Percentage of total emails delivered that resulted in at least one click."
                                        suffix="%"
                                    />
                                </div>
                            </div>

                            {/* Conversion */}
                            <div className="space-y-2">
                                <MadhuSubHeader title="Conversion metrics" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <EmailInput
                                        label="Conversion Rate"
                                        value={conversionRate}
                                        onChange={setConversionRate}
                                        placeholder="Ex: 5.0"
                                        tooltip="Percentage of clickers who complete a purchase."
                                        suffix="%"
                                    />
                                    <EmailInput
                                        label="Avg. Order Value"
                                        value={averageOrderValue}
                                        onChange={setAverageOrderValue}
                                        placeholder="Ex: 50.00"
                                        tooltip="The average value of each order generated from this campaign."
                                        prefix="$"
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
                <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32">

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
                                        <p className="text-xs font-bold text-slate-400">ROAS</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300 hover:text-emerald-400 transition-colors">
                                                        <Info className="h-3 w-3" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Revenue generated for every $1 spent. (Revenue / Cost)
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-xl font-bold text-emerald-400">
                                        <Counter value={roas} formatter={(v: number) => `${v.toFixed(2)}x`} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400">Net Profit</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300 hover:text-blue-400 transition-colors">
                                                        <Info className="h-3 w-3" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Total Revenue minus Campaign Cost.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className={cn("text-xl font-bold", netProfit >= 0 ? "text-blue-400" : "text-red-300")}>
                                        <Counter value={netProfit} formatter={(v: number) => formatCurrency(v)} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400">CPA</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300 hover:text-purple-400 transition-colors">
                                                        <Info className="h-3 w-3" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Cost Per Acquisition — how much each conversion costs you.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-xl font-bold text-purple-400">
                                        <Counter value={cpa} formatter={(v: number) => formatCurrency(v)} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400">Rev / Sub</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-300 hover:text-amber-400 transition-colors">
                                                        <Info className="h-3 w-3" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Revenue generated per subscriber on your list.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-xl font-bold text-amber-400">
                                        <Counter value={revenuePerSubscriber} formatter={(v: number) => formatCurrency(v)} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>

                    {/* Funnel Breakdown */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden p-4">
                        <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-blue-500" />
                            Subscriber Funnel
                        </h4>

                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                                        <Mail className="w-3 h-3 text-indigo-500" /> Opens
                                    </span>
                                    <span className="font-bold text-slate-900">{formatNumber(opens)}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div style={{ width: `${openPctBar}%` }} className="h-full bg-indigo-400 rounded-full transition-all duration-500" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                                        <MousePointer className="w-3 h-3 text-purple-500" /> Clicks
                                    </span>
                                    <span className="font-bold text-slate-900">{formatNumber(clicks)}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div style={{ width: `${clickPctBar}%` }} className="h-full bg-purple-400 rounded-full transition-all duration-500" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                                        <Target className="w-3 h-3 text-emerald-500" /> Conversions
                                    </span>
                                    <span className="font-bold text-slate-900">{formatNumber(conversions)}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div style={{ width: `${convPctBar}%` }} className="h-full bg-emerald-400 rounded-full transition-all duration-500" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
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
                    title: "Input Campaign Data",
                    description: "Enter your total <strong>List Size</strong> and the complete <strong>Campaign Cost</strong> (including ESP software, design, and copywriting fees).",
                    icon: Users
                },
                {
                    title: "Set Engagement Metrics",
                    description: "Add your estimated <strong>Open Rate</strong> and <strong>Click-Through Rate (CTR)</strong> based on historical performance or industry benchmarks.",
                    icon: MousePointer
                },
                {
                    title: "Define Conversion Values",
                    description: "Input your <strong>Conversion Rate</strong> (click to sale) and the <strong>Average Order Value (AOV)</strong> to calculate total campaign revenue and profit.",
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
                    title: "Open Rates Are Vanity",
                    description: "While high open rates look good in reports, they don't pay the bills. A campaign with lower opens but higher CTR and conversion rates will almost always generate more profit. Focus on the bottom of the funnel.",
                    icon: Mail,
                    stat: "Volume",
                    statLabel: "Isn't Value",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Don't optimize for opens at the expense of clearer, sales-focused subject lines."
                },
                {
                    title: "The Power of Segmentation",
                    description: "Blanket emails to your full list rarely perform as well as targeted segments. Sending only to engaged users often increases total ROI by improving deliverability and conversions — even if list size decreases.",
                    icon: Target,
                    stat: "760%",
                    statLabel: "Revenue Uplift",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Segmented campaigns drive significantly higher revenue than non-segmented campaigns."
                },
                {
                    title: "Lifetime Value Matters More",
                    description: "This calculator measures immediate campaign ROI. But email acquires customers who may buy again. Real long-term ROI is often 3–4x higher than a single campaign's return when you factor in repeat purchases.",
                    icon: TrendingUp,
                    stat: "3–4x",
                    statLabel: "LTV Multiplier",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Consider the Lifetime Value (LTV) of a customer, not just the revenue from their first order."
                }
            ]}
            faqs={[
                {
                    question: "What is a good ROI for email marketing?",
                    answer: "According to the Data & Marketing Association (DMA), the average ROI for email marketing is around $36 for every $1 spent (3,600%). However, this varies by industry. A 5:1 (500%) ROI is generally considered a strong starting benchmark for most e-commerce brands."
                },
                {
                    question: "Is CTR measured from 'Sent' or 'Opened'?",
                    answer: "Most Email Service Providers (ESPs) report CTR as a percentage of total emails delivered or sent. This calculator follows that standard. 'Click-to-Open Rate' (CTOR) is a different metric — the percentage of openers who clicked — used to measure content effectiveness separately."
                },
                {
                    question: "How do I calculate my total Campaign Cost?",
                    answer: "Include all associated costs: your monthly ESP bill (Klaviyo, Mailchimp, etc.) prorated for the campaign, freelance design or copywriting fees, and the estimated value of your own internal time if you created it yourself."
                },
                {
                    question: "Why is my Cost Per Acquisition (CPA) so high?",
                    answer: "A high CPA typically signals a mismatch between the email offer and the landing page experience, or a stale list with too many inactive subscribers. Ensure your email promise matches the destination, and remove cold subscribers to stop paying to send to dead leads."
                }
            ]}
        />
    )
}
