import { Metadata } from "next"
import { InfluencerROIPageContent as ROIPage } from "./_components/ROIPage"

export const metadata: Metadata = {
    title: 'Influencer Marketing ROI Calculator - Track Campaign Performance | Web Scraper Pro',
    description: 'Calculate the true return on investment for your influencer marketing campaigns. Track fees, gifting costs, and sales to measure campaign success.',
}

export default function InfluencerROICalculatorPage() {
    return <ROIPage />
}
