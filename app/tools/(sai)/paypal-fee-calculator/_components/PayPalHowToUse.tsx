"use client";

import { ToolSteps } from "@/app/tools/_shared/components";
import { Calculator, Globe, Heart } from "lucide-react";

export function PayPalHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Amount",
                    description: "Input the total transaction amount you are invoicing or expecting to receive.",
                    icon: Calculator,
                },
                {
                    title: "Select Rate Type",
                    description: "Choose 'Standard' for domestic sales, 'International' for cross-border, or 'Non-Profit' if applicable.",
                    icon: Globe,
                },
                {
                    title: "See the Split",
                    description: "View exactly how much PayPal will take in fees and what lands in your bank account.",
                    icon: Heart,
                },
            ]}
        />
    );
}
