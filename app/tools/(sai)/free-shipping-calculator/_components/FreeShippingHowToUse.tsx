"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Calculator, ShoppingCart, TrendingUp } from "lucide-react";
export function FreeShippingHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Carrier Fees",
                    description: "Enter basic logistics costs along with your average shipping weight distribution.",
                    icon: Calculator
                },
                {
                    title: "Order Metrics",
                    description: "Input standard customer cart values and typical corporate baseline profit bounds.",
                    icon: ShoppingCart
                },
                {
                    title: "Set Balance",
                    description: "Discover exactly the lowest break-even free shipping minimum target to enforce.",
                    icon: TrendingUp
                }
            ]}
        />
    );
}