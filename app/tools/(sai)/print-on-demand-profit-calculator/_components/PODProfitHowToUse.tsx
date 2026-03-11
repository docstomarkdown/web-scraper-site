"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Package, Calculator } from "lucide-react"
export function PODProfitHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "POD Charge",
                    description: "Enter overall required printer base product charge, digital branding fees, and drop logistics.",
                    icon: Tag
                },
                {
                    title: "Sale Target",
                    description: "Add requested end consumer retail pricing minus any gateway digital checkout transaction cuts.",
                    icon: Package
                },
                {
                    title: "Check Yield",
                    description: "Instantly assess final exact dollar net return on specific customized apparel or items delivered.",
                    icon: Calculator
                }
            ]}
        />
    )
}