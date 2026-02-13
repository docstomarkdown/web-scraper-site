import { Metadata } from "next"
import { CubicFeetCalculatorContent } from "@/app/tools/(madhu)/cubic-feet-calculator/_components/CubicFeetCalculatorContent"

export const metadata: Metadata = {
    title: "Cubic Feet Calculator - Freight & Storage Cost Estimator",
    description: "Calculate cubic feet (CFT) from dimensions for freight and storage cost estimation. Support for Inches, Feet, CM, and Meters with instant shipping volume calculations.",
}

export default function CubicFeetCalculatorPage() {
    return <CubicFeetCalculatorContent />
}
