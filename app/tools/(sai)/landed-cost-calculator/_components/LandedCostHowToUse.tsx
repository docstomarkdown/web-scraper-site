"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Ship, Calculator } from "lucide-react"
export function LandedCostHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Base Cost",
                    description: "Enter the absolute pure manufacturing or bulk factory invoice price per exact item.",
                    icon: Package
                },
                {
                    title: "Extra Debt",
                    description: "Input combined freight charges, global customs tariffs, cargo insurance, and tax.",
                    icon: Ship
                },
                {
                    title: "Check Price",
                    description: "Instantly formulate the actual true final monetary cost physically arriving dockside.",
                    icon: Calculator
                }
            ]}
        />
    )
}