import { Metadata } from "next"
import { COGSCalculatorClient } from "./_components/COGSCalculatorClient"

export const metadata: Metadata = {
    title: 'COGS Calculator - Calculate Cost of Goods Sold & Fulfillment | Web Scraper Pro',
    description: 'Free Cost of Goods Sold (COGS) calculator for e-commerce. Calculate true product cost including manufacturing, freight, customs, packaging, and fulfillment fees.',
}

export default function COGSCalculatorPage() {
    return <COGSCalculatorClient />
}
