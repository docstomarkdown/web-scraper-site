"use client";
import { ToolSteps } from "@/app/tools/_shared/components/ToolSteps";
import { Package, Ship, TrendingDown } from "lucide-react";

export function LandedCostHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Order Details",
                    description: "Input your supplier's cost per unit and the total number of units in your shipment. These two values form the base of the calculation.",
                    icon: Package
                },
                {
                    title: "Add Shipping Costs",
                    description: "Include international freight, cargo insurance, your customs duty rate, and any extra fees like brokerage or port handling. Every cost counts.",
                    icon: Ship
                },
                {
                    title: "Review True Cost",
                    description: "The calculator divides all costs evenly across your order to show the real landed cost per unit — the only price to use when setting margins.",
                    icon: TrendingDown
                }
            ]}
        />
    );
}