"use client";

import { ToolSteps } from "@/app/tools/_shared/components/ToolSteps";
import { Box, Scale, Calculator } from "lucide-react";

export function DimWeightHowToUse() {
    const steps = [
        {
            title: "Measure Package",
            description: "Measure the length, width, and height of your package in inches. Always round up to the nearest whole inch.",
            icon: Box,
        },
        {
            title: "Select Divisor",
            description: "Choose the appropriate DIM divisor. Use 139 for UPS/FedEx daily rates, or 166 for retail rates if unsure.",
            icon: Scale,
        },
        {
            title: "Calculate Billable Weight",
            description: "Enter the dimensions to see the dimensional weight. Carriers charge the greater of the actual vs. dimensional weight.",
            icon: Calculator,
        },
    ];

    return <ToolSteps steps={steps} />;
}
