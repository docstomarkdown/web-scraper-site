"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Factory, Truck, CalendarCheck } from "lucide-react"
export function LeadTimeHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate Your Lead Time"
            steps={[
                {
                    title: "Manufacturing Time",
                    description: "Enter the number of days your supplier takes for production and processing.",
                    icon: Factory
                },
                {
                    title: "Transit & Buffer",
                    description: "Input estimated shipping days and an optional buffer for potential delays.",
                    icon: Truck
                },
                {
                    title: "Delivery Forecast",
                    description: "Fill in the production and shipping details to see your total lead time and estimated arrival date.",
                    icon: CalendarCheck
                }
            ]}
        />
    )
}