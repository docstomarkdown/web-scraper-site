"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, RotateCcw, Info, Box, Scale, Ruler } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";

export function DimWeightCalculator() {
    const [length, setLength] = useState<number | "">("");
    const [width, setWidth] = useState<number | "">("");
    const [height, setHeight] = useState<number | "">("");
    const [divisor, setDivisor] = useState<string>("139");
    const [actualWeight, setActualWeight] = useState<number | "">("");

    const [dimWeight, setDimWeight] = useState<number>(0);
    const [billableWeight, setBillableWeight] = useState<number>(0);
    const [unit, setUnit] = useState<"imperial" | "metric">("imperial");

    const handleReset = () => {
        setLength("");
        setWidth("");
        setHeight("");
        setActualWeight("");
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
            // Fallback or specific ID for this tool? 
            // Let's assume the user will scroll down or we can target the section by a known ID if we add one.
            // The standard wrapper usually puts IDs on sections.
            // Let's try scrolling to 'tool-guide' as a fallback if 'how-to-use' isn't there, 
            // but 'how-to-use' is usually what we use. 
            // Re-checking DimWeightHowToUse... it uses ToolSteps. ToolSteps doesn't enforce an ID, but 
            // often we wrap it. Let's stick with the pattern.
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
                            <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-xl font-bold text-blue-600">
                                            Inputs
                                        </CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={scrollToGuide}
                                            className="text-slate-400 hover:text-blue-600 hover:bg-slate-100 h-6 w-6 rounded-full"
                                        >
                                            <HelpCircle className="w-4 h-4" />
                                        </Button>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={handleReset}
                                                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 h-6 w-6 rounded-full"
                                                    >
                                                        <RotateCcw className="w-3.5 h-3.5" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                    Reset Calculator
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <CardDescription>Enter dimensions and weight.</CardDescription>
                                </div>
                                <div className="w-[160px]">
                                    <Tabs value={unit} onValueChange={(v: string) => setUnit(v as "imperial" | "metric")}>
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="imperial">In / Lb</TabsTrigger>
                                            <TabsTrigger value="metric">Cm / Kg</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label={`Length (${unit === "imperial" ? "in" : "cm"})`}
                                    value={length}
                                    onChange={setLength}
                                    placeholder="0"
                                    tooltip="The longest side of the package."
                                />
                                <CalculatorInput
                                    label={`Width (${unit === "imperial" ? "in" : "cm"})`}
                                    value={width}
                                    onChange={setWidth}
                                    placeholder="0"
                                    tooltip="The width of the package."
                                />
                                <CalculatorInput
                                    label={`Height (${unit === "imperial" ? "in" : "cm"})`}
                                    value={height}
                                    onChange={setHeight}
                                    placeholder="0"
                                    tooltip="The height of the package."
                                />

                                {/* Custom Select for Divisor to match CalculatorInput style slightly */}
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-base font-semibold text-slate-700">DIM Divisor</Label>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" className="text-slate-500 hover:text-blue-600 transition-colors cursor-default">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    The factor used by carriers to determine dimensional weight. 139 is standard for UPS/FedEx Daily Rates.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="w-36 md:w-44">
                                        <Select value={divisor} onValueChange={setDivisor}>
                                            <SelectTrigger className="h-10 border-slate-300 bg-white shadow-sm focus:ring-blue-600/10 hover:border-blue-600 focus:border-blue-600 focus:ring-4 transition-all w-full">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="139">139 (Daily Rates)</SelectItem>
                                                <SelectItem value="166">166 (Retail/USPS)</SelectItem>
                                                <SelectItem value="194">194 (Domestic)</SelectItem>
                                                <SelectItem value="5000">5000 (Metric)</SelectItem>
                                                <SelectItem value="6000">6000 (Metric)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <CalculatorInput
                                    label={`Actual Weight (${unit === "imperial" ? "lb" : "kg"})`}
                                    value={actualWeight}
                                    onChange={setActualWeight}
                                    placeholder="0"
                                    tooltip="The actual physical weight of the package on a scale."
                                />

                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">
                        <ResultFeedbackCard
                            title="Billable Weight"
                            mainValue={
                                <div className="flex items-baseline gap-1">
                                    <Counter value={billableWeight} />
                                    <span className="text-2xl font-normal opacity-80">{unit === "imperial" ? "lbs" : "kg"}</span>
                                </div>
                            }
                            valueColor="text-white"
                            secondaryMetrics={[
                                {
                                    label: "Dimensional Weight",
                                    value: <><Counter value={dimWeight} /> {unit === "imperial" ? "lbs" : "kg"}</>,
                                    color: "text-blue-200"
                                }
                            ]}
                        />

                        {/* Breakdown Card */}
                        {(dimWeight > 0 || actualWeight !== "") ? (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="px-4 py-3 border-b border-slate-100">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Weight Analysis</p>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    <div className="flex justify-between items-center px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Scale className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm text-slate-500">Actual Weight</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">
                                            {actualWeight || 0} {unit === "imperial" ? "lbs" : "kg"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Ruler className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm text-slate-500">DIM Weight</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">
                                            {dimWeight} {unit === "imperial" ? "lbs" : "kg"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center px-4 py-3 bg-slate-50">
                                        <span className="text-sm font-semibold text-slate-900">Billable Weight</span>
                                        <span className="text-sm font-bold text-blue-600">
                                            {billableWeight} {unit === "imperial" ? "lbs" : "kg"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                                <p className="text-sm text-slate-400">Enter package details to see breakdown.</p>
                            </div>
                        )}

                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed">
                            Carriers charge based on the <strong>greater</strong> of Actual Weight or Dimensional Weight.
                            In this case, you will be billed for <strong>{billableWeight} {unit === "imperial" ? "lbs" : "kg"}</strong>.
                        </div>

                    </FadeIn>
                </div>

            </div>
        </FadeIn>
    );
}

function ResultCard({ title, value, icon: Icon, tooltip }: { title: string, value: React.ReactNode, icon: any, tooltip?: string }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs font-semibold text-slate-500">{title}</p>
                    {tooltip && (
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <Info className="h-3 w-3" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                    {tooltip}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
                <p className="text-lg font-bold text-slate-800">{value}</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    )
}
