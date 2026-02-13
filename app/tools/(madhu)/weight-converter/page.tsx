import { Metadata } from "next"
import { WeightConverterContent } from "./_components/WeightConverterContent"

export const metadata: Metadata = {
    title: "Product Weight Converter - E-commerce Shipping Cost Estimator",
    description: "Convert weights between oz, lbs, g, and kg. Estimate shipping cost impacts and discover margin-saving weight tiers for Amazon, Shopify, and eBay sellers.",
}

export default function WeightConverterPage() {
    return <WeightConverterContent />
}
