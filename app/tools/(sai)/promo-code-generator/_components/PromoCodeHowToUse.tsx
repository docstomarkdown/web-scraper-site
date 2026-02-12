"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Settings, Sparkles, Copy } from "lucide-react"

export function PromoCodeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Define Your Format",
                    description: "Add an optional prefix (like 'SAVE-') or suffix (like '-2024') to match your brand's promotional campaign style.",
                    icon: Settings,
                },
                {
                    title: "Choose Complexity",
                    description: "Set the length of the random part and choose whether to include uppercase letters, numbers, or special symbols.",
                    icon: Sparkles,
                },
                {
                    title: "Generate & Export",
                    description: "Select how many codes you need, click generate, and then copy individual codes or the entire list for your store.",
                    icon: Copy,
                },
            ]}
        />
    )
}
