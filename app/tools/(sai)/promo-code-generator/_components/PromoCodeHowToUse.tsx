"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Settings, Sparkles, Copy } from "lucide-react"
export function PromoCodeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Code Specs",
                    description: "Enter short branding text strings, numerical limits, and explicit desired output string sizing constraints.",
                    icon: Settings
                },
                {
                    title: "Set Format",
                    description: "Choose randomized combinations, structured readable phrases, and uppercase syntax preferences strictly.",
                    icon: Sparkles
                },
                {
                    title: "Get Output",
                    description: "Instantly build out endless hundreds of absolutely unique compliance valid discount codes ready for export.",
                    icon: Copy
                }
            ]}
        />
    )
}