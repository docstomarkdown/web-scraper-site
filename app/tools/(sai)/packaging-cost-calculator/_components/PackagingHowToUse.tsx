"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Package, Timer, CreditCard } from "lucide-react";
export function PackagingHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Supply Total",
                    description: "Enter completely the absolute cost of outer boxes, solid tape, filler, and inserts.",
                    icon: Package
                },
                {
                    title: "Labor Rate",
                    description: "Input fulfillment warehouse wages and the exact precise time spent taping one box.",
                    icon: Timer
                },
                {
                    title: "View Total",
                    description: "Instantly calculate the heavy actual bottom-line cost processing a shipped catalog item.",
                    icon: CreditCard
                }
            ]}
        />
    );
}