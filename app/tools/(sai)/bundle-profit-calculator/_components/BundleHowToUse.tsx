"use client";

import { ToolSteps } from "@/app/tools/_shared/components";
import { Calculator, PackagePlus, TrendingUp } from "lucide-react";

export function BundleHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Product Details",
                    description: "Input the cost and selling price for each product you plan to bundle together (Product A and Product B).",
                    icon: Calculator,
                },
                {
                    title: "Define Bundle Strategy",
                    description: "Choose between offering a percentage discount or setting a fixed total price for the bundle.",
                    icon: PackagePlus,
                },
                {
                    title: "Analyze Profitability",
                    description: "Review your net profit margins and see how much the customer saves, ensuring a win-win scenario.",
                    icon: TrendingUp,
                },
            ]}
        />
    );
}
