"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Package, Banknote } from "lucide-react"

export function FBAHowToUse() {
    return (
        <ToolSteps

            steps={[
                {
                    title: "Measure Your Product",
                    description: "Enter how big and heavy your package is. Amazon's fees change based on the size of the box, so accurate numbers are important.",
                    icon: Scale
                },
                {
                    title: "Set Your Selling Price",
                    description: "Enter the price you want to sell your item for. This helps calculate Amazon's commission (the fee they take for every sale).",
                    icon: Banknote
                },
                {
                    title: "See Your Total Fees",
                    description: "Look at the results to see exactly what Amazon will charge you. This tells you how much money you will keep after paying Amazon.",
                    icon: Package
                }
            ]}
        />
    )
}
