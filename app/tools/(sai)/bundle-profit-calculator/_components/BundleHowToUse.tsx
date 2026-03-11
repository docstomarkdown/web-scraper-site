"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Calculator, PackagePlus, TrendingUp } from "lucide-react";
export function BundleHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Item Costs",
                    description: "Add the individual specific cost rules for every single included bundle item.",
                    icon: Calculator
                },
                {
                    title: "Bundle Price",
                    description: "Enter the final discounted combined sales price offered to the shopper.",
                    icon: PackagePlus
                },
                {
                    title: "Check Margins",
                    description: "Instantly benchmark the total bundle profit against selling parts individually.",
                    icon: TrendingUp
                }
            ]}
        />
    );
}