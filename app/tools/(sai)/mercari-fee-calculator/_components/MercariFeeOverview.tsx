"use client";
import React from "react";
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview";
import { Calculator, DollarSign, EyeOff } from "lucide-react";

export function MercariFeeOverview() {
    return (
        <ToolOverview
            title="Mercari Fee Calculator"
            description="Our advanced Mercari Fee Calculator empowers sellers to precisely understand their margins. By accounting for the 10% selling fee, the 2.9% + $0.50 payment processing fee, and your raw item and shipping costs, this tool reveals the absolute true net profit—preventing hidden losses and optimizing your pricing strategy before you ever hit list."
            metrics={[
                {
                    label: "Selling Fee",
                    value: "10%",
                    icon: Calculator,
                    color: "text-blue-600",
                    bg: "bg-blue-100",
                },
                {
                    label: "Processing",
                    value: "2.9%",
                    icon: DollarSign,
                    color: "text-emerald-600",
                    bg: "bg-emerald-100",
                },
                {
                    label: "Hidden Costs",
                    value: "Calculated",
                    icon: EyeOff,
                    color: "text-rose-600",
                    bg: "bg-rose-100",
                },
            ]}
        />
    );
}
