import { Metadata } from "next"
import { GrossMarginPageContent } from "./_components/GrossMarginPageContent"

export const metadata: Metadata = {
    title: 'Gross Margin Calculator - Calculate Margin, Revenue & COGS | Web Scraper Pro',
    description: 'Free advanced Gross Margin Calculator. Calculate Gross Margin Percentage from Revenue and COGS. optimize pricing strategies and protect your bottom line.',
}

export default function GrossMarginCalculatorPage() {
    return <GrossMarginPageContent />
}
