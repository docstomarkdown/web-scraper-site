"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Ruler, Maximize, Target, Warehouse } from "lucide-react"

export function CubicFeetHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Enter package dimensions",
                    description: "Input the <b>Length, Width, and Height</b> of your package or storage unit. Accurate measurements are critical for freight quotes.",
                    icon: Ruler
                },
                {
                    title: "Choose your measurement unit",
                    description: "Switch between <b>Inches, Centimeters, Feet, or Meters</b>. The tool automatically converts all inputs to the selected scale for precise calculation.",
                    icon: Maximize
                },
                {
                    title: "Review volume metrics",
                    description: "View your results in <b>Cubic Feet (CFT)</b> and <b>Cubic Meters (CBM)</b>. Use these values to estimate LTL (Less Than Truckload) or FCL (Full Container Load) costs.",
                    icon: Target
                }
            ]}
            goal={{
                title: "Optimize storage & freight costs",
                description: "By knowing your exact cubic volume, you can accurately predict Amazon FBA storage fees and negotiate better rates with freight forwarders based on CBM.",
                icon: Warehouse
            }}
        />
    )
}
