"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Package, Clock, BarChart2 } from "lucide-react";

export function PackagingHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Your Material Costs",
                    description: "Input the per-unit cost of your box or mailer. Add optional materials like padding, tape, labels, and branding inserts if you use them.",
                    icon: Package
                },
                {
                    title: "Add Your Labor Rate",
                    description: "Enter how many minutes it takes to pack one order and your hourly wage (or the rate you'd pay someone else). This calculates a precise labor cost per package.",
                    icon: Clock
                },
                {
                    title: "Review Your True Cost",
                    description: "See your total packaging cost per unit, your material vs. labor split, and the full batch total — so you can price products and scale with confidence.",
                    icon: BarChart2
                }
            ]}
        />
    );
}