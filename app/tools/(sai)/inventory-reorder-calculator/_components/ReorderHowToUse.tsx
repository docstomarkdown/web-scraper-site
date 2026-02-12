"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { ClipboardList, Clock, Truck } from "lucide-react";

export function ReorderHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Estimate Daily Sales",
                    description: "Determine how many units you sell on an average day.",
                    icon: ClipboardList
                },
                {
                    title: "Know Your Lead Time",
                    description: "How many days does it take from placing an order to having it in stock?",
                    icon: Truck
                },
                {
                    title: "Plan Safety Stock",
                    description: "Decide how many days of 'buffer' stock you want to keep for emergencies.",
                    icon: Clock
                }
            ]}
        />
    );
}
