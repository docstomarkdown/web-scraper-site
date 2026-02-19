import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Affiliate Commission Calculator - Free Payout & Profit Tool",
    description: "Calculate affiliate commission payouts, net revenue, break-even rates, and profitability at different commission structures. Free tool for e-commerce sellers and affiliate program managers.",
}

export default function AffiliateCommissionCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
