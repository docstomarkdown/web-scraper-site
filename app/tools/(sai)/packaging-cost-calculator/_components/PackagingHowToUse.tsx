"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Package, Clock, BarChart2 } from "lucide-react";

export function PackagingHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Base Costs",
                    description: "Input the unit cost of your packaging (box/mailer) plus the manual packing time and hourly labor rate.",
                    icon: Package
                },
                {
                    title: "Add Optional Extras",
                    description: "Include extra materials like padding, tape, labels, and branding inserts for a precise per-order cost.",
                    icon: Clock
                },
                {
                    title: "View Cost Breakdown",
                    description: "Instantly see the true total cost per unit, with a visual split between materials, labor, and extras.",
                    icon: BarChart2
                }
            ]}
        />
    );
}