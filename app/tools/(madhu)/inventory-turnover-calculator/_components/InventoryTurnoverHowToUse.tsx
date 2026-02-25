"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Target, Timer, RotateCw } from "lucide-react"

export function InventoryTurnoverHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Define Financial Context",
                    description: "Input your <b>Cost of Goods Sold (COGS)</b> for the period. For Amazon/Shopify sellers, use your 'Landed Cost' for the most accurate ratio.",
                    icon: Target
                },
                {
                    title: "Set Analysis Window",
                    description: "Choose your period (30, 90, or 365 days). Use the <b>quick-presets</b> to instantly toggle between monthly and annual reports.",
                    icon: Timer
                },
                {
                    title: "Optimize Stock Velocity",
                    description: "Review your <b>DSI (Runway)</b>. If DSI exceeds 90 days, you likely have capital trapped in slow-moving inventory.",
                    icon: RotateCw
                }
            ]}
        />
    )
}
