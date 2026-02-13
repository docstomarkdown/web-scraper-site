import { Metadata } from "next"
import { PalletConfigurationCalculatorContent } from "./_components/PalletConfigurationCalculatorContent"

export const metadata: Metadata = {
    title: "Pallet Configuration Calculator - Optimize Product Loading & Shipping",
    description: "Calculate optimal product configuration per pallet based on box dimensions. Maximize pallet efficiency, reduce shipping costs, and optimize warehouse space utilization.",
}

export default function PalletConfigurationCalculatorPage() {
    return <PalletConfigurationCalculatorContent />
}
