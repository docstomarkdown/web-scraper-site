"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { TrendingUp, Clock, ShieldCheck, Timer, CheckCircle2 } from "lucide-react"

export function ReorderPointHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Enter Daily Sales Velocity",
                    description: "Input the average number of units you sell per day. Use your last 30 days of data for the most accurate 'normal' velocity.",
                    icon: TrendingUp
                },
                {
                    title: "Input Lead Time",
                    description: "Enter the total days it takes from placing an order to receiving stock. This includes production, shipping, and customs clearance.",
                    icon: Clock
                },
                {
                    title: "Set Safety Stock",
                    description: "Add a buffer to handle unexpected sales spikes. A common rule of thumb is keeping 14 days of 'backup' demand.",
                    icon: ShieldCheck
                },
                {
                    title: "Analyze the Journey",
                    description: "Watch the 'Restock Journey' timeline to visualize your order point. This represents the 'danger zone' where you must act to prevent stockouts.",
                    icon: Timer
                }
            ]}
        />
    )
}
