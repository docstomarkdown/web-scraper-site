import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Reorder Point Calculator - Inventory Restock Estimator",
    description: "Calculate your optimal reorder point based on lead time, sales velocity, and safety stock. Never run out of stock or overstock again.",
}

export default function ReorderPointCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
