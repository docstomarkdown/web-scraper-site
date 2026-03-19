"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Wallet, Package, RefreshCw } from "lucide-react"

export function InventoryTurnoverHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter COGS",
                    description: "Choose your preferred currency and input the 'Cost of Goods Sold' for your chosen period.",
                    icon: Wallet
                },
                {
                    title: "Inventory Values",
                    description: "Enter your 'Opening Inventory' and 'Closing Inventory' values to analyze stock flow.",
                    icon: Package
                },
                {
                    title: "Analyze Your Metrics",
                    description: "Set your analysis period and instantly see your turnover ratio, Days to Sell Inventory, and Average Value.",
                    icon: RefreshCw
                }
            ]}
        />
    )
}
