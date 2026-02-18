import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Inventory Turnover Calculator | Measure Inventory Efficiency",
    description: "Calculate your inventory turnover ratio and Days Sales in Inventory (DSI). Optimize your stock levels, improve cash flow, and analyze operational efficiency with our professional calculator.",
}

export default function InventoryTurnoverCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
