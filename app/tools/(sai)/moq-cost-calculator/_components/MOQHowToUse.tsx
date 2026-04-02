"use client";
import { ToolSteps } from "@/app/tools/_shared/components/ToolSteps";
import { Tag, Truck, ShieldAlert } from "lucide-react";

export function MOQHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Supplier Details",
                    description: "Input the cost per unit and the Minimum Order Quantity required by the manufacturer.",
                    icon: Tag
                },
                {
                    title: "Add Logistics Costs",
                    description: "Include shipping cost, duties, and any other costs for an accurate landed cost.",
                    icon: Truck
                },
                {
                    title: "Review Investment Risk",
                    description: "Analyze your total upfront investment and inventory coverage duration based on expected sales.",
                    icon: ShieldAlert
                }
            ]}
        />
    );
}