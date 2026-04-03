"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Box, Scale, Ruler } from "lucide-react"
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
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CalculatorCardHeader
                                description="Enter dimensions and weight."
                                onReset={handleReset}
                            />
                            <CardContent className="space-y-3 pt-6">
                                <CalculatorInput
                                    label={`Length (${dimUnit})`}
                                    value={length}
                                    onChange={setLength}
                                    placeholder="0"
                                    tooltip="Longest side of your package."
                                />
                                <CalculatorInput
                                    label={`Width (${dimUnit})`}
                                    value={width}
                                    onChange={setWidth}
                                    placeholder="0"
                                    tooltip="Width of your package."
                                />
                                <CalculatorInput
                                    label={`Height (${dimUnit})`}
                                    value={height}
                                    onChange={setHeight}
                                    placeholder="0"
                                    tooltip="Height of your package."
                                />
                                {/* Custom Select for Divisor to match CalculatorInput style slightly */}
                                {/* DIM Divisor Selection - Optimized Design */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium text-slate-700">DIM Divisor</Label>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors cursor-default">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    The factor used by carriers to determine dimensional weight. 139 is standard for UPS/FedEx Daily Rates.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select value={divisor} onValueChange={setDivisor}>
                                        <SelectTrigger className="h-11 border-slate-200 bg-white shadow-sm focus:ring-blue-500/10 hover:border-blue-500 focus:border-blue-500 focus:ring-4 transition-all w-full text-slate-700">
                                            <SelectValue placeholder="Select divisor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dimUnit === "in" ? (
                                                <SelectGroup>
                                                    <SelectLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1.5 bg-slate-50/50">Imperial (Inches / Lbs)</SelectLabel>
                                                    <SelectItem value="139" className="py-2.5 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-4">
                                                            <span className="font-medium">UPS / FedEx Daily Rates</span>
                                                            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-mono font-semibold">139</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="166" className="py-2.5 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-4">
                                                            <span className="font-medium">Retail / USPS</span>
                                                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono font-semibold">166</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="194" className="py-2.5 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-4">
                                                            <span className="font-medium">Domestic Ground</span>
                                                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono font-semibold">194</span>
                                                        </div>
                                                    </SelectItem>
                                                </SelectGroup>
                                            ) : (
                                                <SelectGroup>
                                                    <SelectLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1.5 bg-slate-50/50">Metric (Cm / Kg)</SelectLabel>
                                                    <SelectItem value="5000" className="py-2.5 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-4">
                                                            <span className="font-medium">International Standard</span>
                                                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono font-semibold">5000</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="6000" className="py-2.5 cursor-pointer">
                                                        <div className="flex items-center justify-between w-full gap-4">
                                                            <span className="font-medium">Legacy Metric</span>
                                                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono font-semibold">6000</span>
                                                        </div>
                                                    </SelectItem>
                                                </SelectGroup>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <CalculatorInput
                                    label={`Actual Weight (${weightUnit})`}
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
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
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
                                tooltip: "The physical weight of the package on a scale."
                            },
                            {
                                key: "dimWeight",
                                label: "Dimensional Weight",
                                value: dimWeight,
                                unit: weightUnit === "lb" ? "lbs" : "kg",
                                tooltip: "Calculated based on volume ÷ DIM Divisor."
                            }
                        ]}
                        isCalculated={dimWeight > 0 || actualWeight !== ""}
                        emptyMessage="Billable Weight"
                        validationBadgeText={{ valid: "Calculated", invalid: "Pending" }}
                    >
                        {/* Information inside the card */}
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed mt-2 mx-5 mb-5">
                            Carriers charge based on the <strong>greater</strong> of Actual Weight or Dimensional Weight.
                            In this case, you will be billed for <strong>{billableWeight} {weightUnit === "lb" ? "lbs" : "kg"}</strong>.
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
