import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Lead Time Calculator - Production to Delivery Estimator",
    description: "Calculate total inventory lead time including production, shipping, customs, and buffers. Plan your restock cycles with precision.",
}

export default function LeadTimeCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
