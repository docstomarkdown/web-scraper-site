import { Metadata } from "next"
import { NetProfitPageContent } from "./_components/NetProfitPageContent"

export const metadata: Metadata = {
    title: 'Net Profit Calculator - Calculate True Business Profit | Web Scraper Pro',
    description: 'Calculate your net profit after expenses, ads, overhead, and taxes. Get a clear view of your business bottom line with our free calculator.',
}

export default function NetProfitCalculatorPage() {
    return <NetProfitPageContent />
}
