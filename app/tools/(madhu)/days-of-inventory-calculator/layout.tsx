import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Days of Inventory Calculator | Stock Runway Forecast Tool",
    description: "Calculate how many days of inventory you have left based on current stock and sales velocity. Forecast your stock-out date and plan your next restock efficiently.",
}

export default function DaysOfInventoryCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
