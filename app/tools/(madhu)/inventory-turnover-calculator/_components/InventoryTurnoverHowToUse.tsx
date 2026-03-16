"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Wallet, Package, RefreshCw } from "lucide-react"
export function InventoryTurnoverHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Your Total Costs (COGS)",
                    description: "Input the total 'Cost of Goods Sold' for your chosen period. This reflects the direct costs of the products you've successfully sold.",
                    icon: Wallet
                },
                {
                    title: "Check Your Stock Value",
                    description: "Enter the total amount you paid for the products currently ready for sale, including items on your shelves or in your warehouse.",
                    icon: Package
                },
                {
                    title: "Analyze Your Metrics",
                    description: "Instantly see your turnover ratio and Days Sales in Inventory (DSI) to measure performance.",
                    icon: RefreshCw
                }
            ]}
        />
    )
}
