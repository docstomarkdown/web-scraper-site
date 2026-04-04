"use client";
import React from "react";
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components";
import { Info } from "lucide-react";

export function CLVOverview() {
    return (
    <div className="space-y-6">
            <ToolSectionHeader
                icon={Info}
                title="Tool Essential"
            />
            <ToolOverview
                heading="What is the Customer Lifetime Value Calculator?"
                headingAccent="Customer Lifetime Value Calculator"
                definition="The Customer Lifetime Value (CLV) Calculator estimates how much revenue a single customer generates for your business over their entire relationship with you. Using three simple inputs — Average Order Value, purchase frequency, and customer lifespan — you can instantly see long-term customer value. Built for business owners, marketers, e-commerce sellers, and startup founders, this tool helps you plan smarter marketing budgets, improve retention strategy, and understand true customer profitability — no financial expertise required."
                accent="blue"
                facts={[
                    {
                        stat: "AOV × Freq × Years",
                        label: "Your CLV Formula",
                        detail: "Multiply your Average Order Value × purchase frequency × years active. These 3 inputs give you your complete Customer Lifetime Value instantly."
                    },
                    {
                        stat: "+ Margin %",
                        label: "Unlock Lifetime Profit",
                        detail: "Add your Gross Margin % to unlock real profit figures. See exactly what each customer is worth after product costs — not just raw revenue."
                    },
                    {
                        stat: "CLV ÷ CAC",
                        label: "Know Your Max Ad Spend",
                        detail: "Enter your CAC to see your LTV:CAC ratio. A healthy score is 3:1 or higher — the sweet spot for sustainable, profitable growth."
                    }
                ]}
            />
        </div>
    );
}
