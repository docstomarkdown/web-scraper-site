"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { TrendingUp, Clock, ShieldCheck, Timer, CheckCircle2 } from "lucide-react"
export function ReorderPointHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Daily Sales",
                    description: "Enter how many products you typically sell in a day. If you sell 20 to 30 items, use an average of 25 to keep things simple.",
                    icon: TrendingUp
                },
                {
                    title: "Delivery Time",
                    description: "Enter the number of days your supplier usually takes to deliver products to your warehouse, including a few days for processing.",
                    icon: Clock
                },
                {
                    title: "Add a Safety Buffer",
                    description: "Optionally, enter extra units to keep as emergency backup. This helps prevent stockouts if sales increase or shipments are delayed.",
                    icon: ShieldCheck
                }
            ]}
        />
    )
}
