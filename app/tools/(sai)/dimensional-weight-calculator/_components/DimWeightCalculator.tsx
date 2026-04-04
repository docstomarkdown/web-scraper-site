"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Box, Scale, Ruler, Receipt } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculatorCardHeader, CalculatorInput, Counter, FadeIn } from "@/app/tools/_shared/components"
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard"
import { DimWeightBreakdown } from "./DimWeightBreakdown"
export function DimWeightCalculator() {
    const [length, setLength] = useState<number | "">("");
    const [width, setWidth] = useState<number | "">("");
    const [height, setHeight] = useState<number | "">("");
    const [divisor, setDivisor] = useState<string>("139");
    const [actualWeight, setActualWeight] = useState<number | "">("");
    const [dimWeight, setDimWeight] = useState<number>(0);
    const [billableWeight, setBillableWeight] = useState<number>(0);
    const [dimUnit, setDimUnit] = useState<"in" | "cm">("in");
    const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb");
    const handleReset = () => {
        setLength("");
        setWidth("");
        setHeight("");
        setActualWeight("");
        setDimUnit("in");
        setWeightUnit("lb");
        setDivisor("139");
    }
    const calculate = useCallback(() => {
        const l = length === "" ? 0 : length;
        const w = width === "" ? 0 : width;
        const h = height === "" ? 0 : height;
        const div = parseFloat(divisor);
        const weight = actualWeight === "" ? 0 : actualWeight;
        if (div > 0) {
            let calculatedDimWeight = (l * w * h) / div;
            // Round up to the next whole number (standard carrier practice)
            calculatedDimWeight = Math.ceil(calculatedDimWeight);
            setDimWeight(calculatedDimWeight);
            setBillableWeight(Math.max(calculatedDimWeight, Math.ceil(weight)));
        } else {
            setDimWeight(0);
            setBillableWeight(0);
        }
    }, [length, width, height, divisor, actualWeight]);
    useEffect(() => {
        calculate();
    }, [calculate]);
    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use'); // Ideally ID matches ToolSteps wrapper
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            const guide = document.querySelector('.max-w-4xl');
            if (guide) guide.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 lg:sticky lg:top-8 z-10">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CalculatorCardHeader
                                title="Package Details"
                                description="Enter dimensions and weight."
                                onReset={handleReset}
                            />
                            <CardContent className="space-y-3 pt-6">
                                <CalculatorInput
                                    label="Length"
                                    suffix={dimUnit}
                                    value={length}
                                    onChange={setLength}
                                    placeholder="0"
                                    tooltip="Longest side of your package."
                                />
                                <CalculatorInput
                                    label="Width"
                                    suffix={dimUnit}
                                    value={width}
                                    onChange={setWidth}
                                    placeholder="0"
                                    tooltip="Width of your package."
                                />
                                <CalculatorInput
                                    label="Height"
                                    suffix={dimUnit}
                                    value={height}
                                    onChange={setHeight}
                                    placeholder="0"
                                    tooltip="Height of your package."
                                />
                                {/* DIM Divisor — full-width select */}
                                <div className="w-full space-y-2 pt-1">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-[14.5px] font-medium text-slate-600/90">DIM Divisor</Label>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" tabIndex={-1} className="text-slate-400 hover:text-blue-600 transition-colors cursor-help">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-[13px] font-normal bg-slate-900 text-white border-slate-800">
                                                    The factor used by carriers to determine dimensional weight. 139 is standard for UPS/FedEx Daily Rates.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select value={divisor} onValueChange={setDivisor}>
                                        <SelectTrigger className="h-11 w-full border-2 border-slate-200 bg-white shadow-sm text-[14px] font-semibold text-slate-700 rounded-xl hover:border-blue-300 hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200">
                                            <SelectValue placeholder="Select a divisor" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-200 shadow-lg">
                                            {dimUnit === "in" ? (
                                                <SelectGroup>
                                                    <SelectLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 bg-slate-50">Imperial — Inches / Lbs</SelectLabel>
                                                    <SelectItem value="139" className="py-3 px-3 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-6">
                                                            <span className="font-medium text-slate-700">UPS / FedEx Daily Rates</span>
                                                            <span className="ml-auto bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-lg font-mono font-bold">139</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="166" className="py-3 px-3 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-6">
                                                            <span className="font-medium text-slate-700">Retail / USPS</span>
                                                            <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-lg font-mono font-bold">166</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="194" className="py-3 px-3 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-6">
                                                            <span className="font-medium text-slate-700">Domestic Ground</span>
                                                            <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-lg font-mono font-bold">194</span>
                                                        </div>
                                                    </SelectItem>
                                                </SelectGroup>
                                            ) : (
                                                <SelectGroup>
                                                    <SelectLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 bg-slate-50">Metric — Cm / Kg</SelectLabel>
                                                    <SelectItem value="5000" className="py-3 px-3 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-6">
                                                            <span className="font-medium text-slate-700">International Standard</span>
                                                            <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-lg font-mono font-bold">5000</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="6000" className="py-3 px-3 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-6">
                                                            <span className="font-medium text-slate-700">Legacy Metric</span>
                                                            <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-lg font-mono font-bold">6000</span>
                                                        </div>
                                                    </SelectItem>
                                                </SelectGroup>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <CalculatorInput
                                    label="Actual Weight"
                                    suffix={weightUnit}
                                    value={actualWeight}
                                    onChange={setActualWeight}
                                    placeholder="0"
                                    tooltip="Physical weight on a scale."
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        primaryResult={{
                            value: billableWeight,
                            unit: weightUnit === "lb" ? "lbs" : "kg",
                            label: "Billable Weight",
                            key: "billableWeight",
                        }}
                        secondaryResults={[
                            {
                                key: "actualWeight",
                                label: "Actual Weight",
                                value: actualWeight || 0,
                                unit: weightUnit === "lb" ? "lbs" : "kg",
                                tooltip: "The physical weight of the package on a scale.",
                                icon: Scale
                            },
                            {
                                key: "dimWeight",
                                label: "Dimensional Weight",
                                value: dimWeight,
                                unit: weightUnit === "lb" ? "lbs" : "kg",
                                tooltip: "Calculated based on volume ÷ DIM Divisor.",
                                icon: Box
                            }
                        ]}
                        isCalculated={dimWeight > 0 || actualWeight !== ""}
                        emptyMessage="Billable Weight"
                        liveBadgeText={
                            dimWeight > Number(actualWeight || 0)
                                ? "DIM Billed"
                                : "Actual Billed"
                        }
                        liveBadgeColor={
                            dimWeight > Number(actualWeight || 0)
                                ? "amber"
                                : "blue"
                        }
                    >
                        {/* Billing Summary inner card */}
                        <div className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Receipt className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <span className="text-[13px] sm:text-[14px] font-bold text-slate-500">Billing Summary</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed pl-6">
                                Carriers charge based on the <strong>greater</strong> of Actual Weight or Dimensional Weight.
                                You will be billed for <strong>{billableWeight} {weightUnit === "lb" ? "lbs" : "kg"}</strong>.
                            </p>
                        </div>
                    </ResultSummaryCard>

                    {/* Breakdown Chart */}
                    <FadeIn delay={0.1}>
                        <DimWeightBreakdown
                            actualWeight={Number(actualWeight) || 0}
                            dimWeight={dimWeight}
                            billableWeight={billableWeight}
                            weightUnit={weightUnit === "lb" ? "lbs" : "kg"}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}
