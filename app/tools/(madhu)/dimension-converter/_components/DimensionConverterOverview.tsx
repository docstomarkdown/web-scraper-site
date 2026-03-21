"use client"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"

export function DimensionConverterOverview() {
    return (
        <ToolOverview
            heading="Why Use Dimension Converter?"
            headingAccent="Dimension Converter"
            definition="The primary purpose of the Dimension Converter is to provide instant, bidirectional unit conversions for global e-commerce. Built for brands, freight teams, and manufacturers, this tool eliminates manual formulas by converting your Length, Width, and Height between Inches and Centimeters in real-time. It is your essential tool for ensuring product listings and shipping labels are accurate for any international marketplace."
            facts={[
                {
                    stat: "Instant Results",
                    label: "Both Directions",
                    detail: "Toggle between Inches and Centimeters seamlessly. Values for all three dimensions update the moment you type."
                },
                {
                    stat: "3 Fields",
                    label: "L × W × H Together",
                    detail: "Enter all three dimensions at once. The converter processes the entire package size simultaneously to save you time."
                },
                {
                    stat: "Global Standards",
                    label: "1 in = 2.54 cm",
                    detail: "Every calculation follows industry-standard formulas to guarantee your product specs meet international requirements."
                }
            ]}
            accent="blue"
        />
    )
}
