import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Economic Order Quantity (EOQ) Calculator | Inventory Optimization Tool",
    description: "Calculate the optimal order quantity to minimize annual inventory costs. Find the perfect balance between ordering and holding costs with our free EOQ tool.",
}

export default function EOQCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
