"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Calculator, ShoppingCart, TrendingUp } from "lucide-react";

export function FreeShippingHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Current Metrics",
                    description: "Input your Average Order Value (AOV), Gross Margin percentage, and average Shipping Cost.",
                    icon: Calculator
                },
                {
                    title: "Set a Threshold",
                    description: "Propose a minimum order amount for customers to qualify for free shipping (e.g., $75).",
                    icon: ShoppingCart
                },
                {
                    title: "Analyze & Adjust",
                    description: "Check the 'Required Sales Increase'. If the percentage is too high, try increasing the threshold or improving product margins.",
                    icon: TrendingUp
                }
            ]}
        />
    );
}
