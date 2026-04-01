"use client";
import React from "react";
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components";
import { Info } from "lucide-react";

export function CLVOverview() {
    return (
        <div className="space-y-6">
            <ToolSectionHeader
                icon={Info}
                title="Tool Overview"
                subtitle="Understanding the economics of customer retention and lifetime profit."
            />
            <ToolOverview
                heading="What is the Customer Lifetime Value Calculator?"
                headingAccent="Customer Lifetime Value Calculator"
                definition="The Customer Lifetime Value (CLV) Calculator helps you estimate how much money a customer will bring to your business over time. By using basic inputs like average order value, how often they purchase, and how long they stay with your brand, the tool shows the long-term value of each customer.This tool is designed for business owners, marketers, e-commerce sellers, and startup founders who want to understand customer value, plan marketing budgets, and improve retention. It is easy to use, accurate, and doesn’t require any financial knowledge."
                accent="blue"
                facts={[
                    {
                        stat: "AOV × Freq × Years",
                        label: "Your CLV Formula",
                        detail: "CLV is calculated by multiplying your Average Order Value, how often a customer buys per year, and how long they stay. Enter these 3 values to instantly see your Customer Lifetime Value."
                    },
                    {
                        stat: "+ Margin %",
                        label: "Unlock Lifetime Profit",
                        detail: "Add your Gross Margin % to go beyond revenue — the tool will calculate your actual Lifetime Profit per customer after product costs, giving you a true picture of customer profitability."
                    },
                    {
                        stat: "CLV ÷ CAC",
                        label: "Know Your Max Ad Spend",
                        detail: "Add your Customer Acquisition Cost (CAC) to calculate the LTV:CAC ratio. Aim for 3:1 or higher — this tells you exactly how much you can afford to spend to acquire each customer profitably."
                    }
                ]}
            />
        </div>
    );
}
