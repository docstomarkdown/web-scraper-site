"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { CalculatorInput } from "@/app/tools/_shared/components/CalculatorInput";
import { ResultFeedbackCard } from "@/app/tools/_shared/components/ResultFeedbackCard";
import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { CurrencyCombobox } from "@/app/tools/_shared/components";
import { HelpCircle, AlertTriangle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function MOQCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [unitPrice, setUnitPrice] = useState<number | "">("");
    const [moq, setMoq] = useState<number | "">("");
    const [shippingCost, setShippingCost] = useState<number | "">("");
    const [miscCost, setMiscCost] = useState<number | "">("");
    const [monthlySales, setMonthlySales] = useState<number | "">("");

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    };
    const symbol = currencySymbols[currency] || "$";

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val);
    };

    const [totalInvestment, setTotalInvestment] = useState<number>(0);
    const [effectiveCostPerUnit, setEffectiveCostPerUnit] = useState<number>(0);
    const [monthsInventory, setMonthsInventory] = useState<number>(0);
    const [riskAssessment, setRiskAssessment] = useState<{
        level: "good" | "bad" | "neutral";
        text: string;
        color: string;
    }>({ level: "neutral", text: "Enter details", color: "text-slate-400" });

    useEffect(() => {
        const p = unitPrice === "" ? 0 : unitPrice;
        const m = moq === "" ? 0 : moq;
        const s = shippingCost === "" ? 0 : shippingCost;
        const c = miscCost === "" ? 0 : miscCost;
        const v = monthlySales === "" ? 0 : monthlySales;

        // 1. Total Investment
        const investment = (p * m) + s + c;
        setTotalInvestment(investment);

        // 2. Effective Cost Per Unit
        if (m > 0) {
            setEffectiveCostPerUnit(investment / m);
        } else {
            setEffectiveCostPerUnit(0);
        }

        // 3. Months of Inventory & Risk
        if (v > 0 && m > 0) {
            const months = m / v;
            setMonthsInventory(months);

            if (months <= 3) {
                setRiskAssessment({ level: "good", text: "Low Risk", color: "text-emerald-400" });
            } else if (months <= 6) {
                setRiskAssessment({ level: "neutral", text: "Moderate Risk", color: "text-yellow-400" });
            } else {
                setRiskAssessment({ level: "bad", text: "High Risk", color: "text-rose-400" });
            }
        } else {
            setMonthsInventory(0);
            setRiskAssessment({ level: "neutral", text: "Enter Sales", color: "text-slate-400" });
        }
    }, [unitPrice, moq, shippingCost, miscCost, monthlySales]);

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
                                        Cost & MOQ Details
                                    </CardTitle>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-6 w-6 rounded-full inline-flex items-center justify-center"
                                                >
                                                    <HelpCircle className="w-4 h-4" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Enter your supplier&apos;s Minimum Order Quantity and costs.
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <CardDescription>Enter your supplier pricing, shipping, and sales data.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Unit Price (${symbol})`}
                                value={unitPrice}
                                onChange={setUnitPrice}
                                placeholder="0.00"
                                tooltip="The cost per single unit from your supplier."
                            />
                            <CalculatorInput
                                label="Minimum Order Quantity (MOQ)"
                                value={moq}
                                onChange={setMoq}
                                placeholder="0"
                                tooltip="The minimum number of units you must purchase."
                            />
                            <CalculatorInput
                                label={`Total Shipping Cost (${symbol})`}
                                value={shippingCost}
                                onChange={setShippingCost}
                                placeholder="0.00"
                                tooltip="Freight, sea shipping, or air courier costs for the entire batch."
                            />
                            <CalculatorInput
                                label={`Miscellaneous Costs (${symbol})`}
                                value={miscCost}
                                onChange={setMiscCost}
                                placeholder="0.00"
                                tooltip="Customs duties, inspection fees, or other one-time batch costs."
                            />
                            <CalculatorInput
                                label="Est. Monthly Sales Velocity"
                                value={monthlySales}
                                onChange={setMonthlySales}
                                placeholder="0"
                                tooltip="How many units you expect to sell per month."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Total Upfront Investment"
                        titleLabel="Landed Cost"
                        labelClassName="bg-blue-500/10 text-blue-400"
                        mainValue={formatCurrency(totalInvestment)}
                        valueColor="text-white"
                        mainMetricLabel="Effective Cost Per Unit"
                        mainMetricValue={formatCurrency(effectiveCostPerUnit)}
                        mainMetricColor="text-blue-400"
                        secondaryMetrics={[
                            {
                                label: "Inventory Coverage",
                                value: `${monthsInventory.toFixed(1)} Months`,
                                color: riskAssessment.color,
                            },
                            {
                                label: "Risk Level",
                                value: riskAssessment.text,
                                color: riskAssessment.color,
                            },
                        ]}
                    />

                    {/* Analysis Card */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className={`w-5 h-5 mt-0.5 ${riskAssessment.level === "bad" ? "text-rose-500" : riskAssessment.level === "good" ? "text-emerald-500" : "text-amber-500"}`} />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-1">
                                    Investment Insight
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {riskAssessment.level === "bad"
                                        ? <>This Minimum Order Quantity (MOQ) of <strong>{moq} units</strong> covers <strong>{monthsInventory.toFixed(1)} months</strong> of sales. This ties up cash and increases storage fees. Consider negotiating a lower Minimum Order Quantity (MOQ).</>
                                        : riskAssessment.level === "good"
                                            ? <>This Minimum Order Quantity (MOQ) of <strong>{moq || 0} units</strong> is a healthy order size at <strong>{monthsInventory.toFixed(1)} months</strong> of coverage. Your cash flow turnover looks efficient.</>
                                            : <>Enter your supplier costs and estimated monthly sales to see a full investment risk analysis.</>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
