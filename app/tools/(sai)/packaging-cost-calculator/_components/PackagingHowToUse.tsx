"use client";

import { ToolSteps } from "@/app/tools/_shared/components";
import { Package, Timer, CreditCard } from "lucide-react";

export function PackagingHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Step 1: Enter Material Costs",
                    description: "Input the individual cost for each packaging component (box, tape, padding, etc.).",
                    icon: Package
                },
                {
                    title: "Step 2: Add Labor Details",
                    description: "Estimate how long it takes to pack one order and set the hourly wage for that labor.",
                    icon: Timer
                },
                {
                    title: "Step 3: Review Total Cost",
                    description: "See the true cost per package. Use this to ensure your shipping prices cover your expenses.",
                    icon: CreditCard
                },
            ]}
        />
    );
}
