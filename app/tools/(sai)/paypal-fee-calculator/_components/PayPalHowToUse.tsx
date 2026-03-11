"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Calculator, Globe, Heart } from "lucide-react";
export function PayPalHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Sale Target",
                    description: "Enter the specific monetary checkout charge currently being digitally processed via gateway.",
                    icon: Calculator
                },
                {
                    title: "Route Rules",
                    description: "Select tightly enforced domestic, international transfer, or digital micro-transaction sets.",
                    icon: Globe
                },
                {
                    title: "Check Yield",
                    description: "Instantly map overall required exact PayPal network deductions and your real raw payout.",
                    icon: Heart
                }
            ]}
        />
    );
}