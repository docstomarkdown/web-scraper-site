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
                    description: "Enter your average daily baseline unit sales and worst-case max usage.",
                    icon: TrendingUp
                },
                {
                    title: "Lead Time",
                    description: "Input normal supplier delivery times and potential maximum delay days.",
                    icon: Clock
                },
                {
                    title: "Calculate ROP",
                    description: "Calculate your exact reorder point safety stock requirement automatically.",
                    icon: ShieldCheck
                }
            ]}
        />
    )
}