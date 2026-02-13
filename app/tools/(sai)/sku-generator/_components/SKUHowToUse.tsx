"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Tag, Blocks, Sliders, Copy } from "lucide-react";

export function SKUHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Define Your Codes",
                    description: "Enter short, consistent codes for your Brand, Category, and Model (e.g., NK for Nike, SHO for Shoes).",
                    icon: Tag
                },
                {
                    title: "Add Attributes",
                    description: "Include specific variations like Color (WHT) and Size (10) to make each SKU unique.",
                    icon: Blocks
                },
                {
                    title: "Customize Format",
                    description: "Choose your preferred separator (dash, underscore) and letter casing to match your inventory system.",
                    icon: Sliders
                },
                {
                    title: "Generate & Copy",
                    description: "Review the real-time preview and click 'Copy SKU' to use it in your store or spreadsheet.",
                    icon: Copy
                }
            ]}
        />
    );
}
