"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Container, Box, CheckCircle2, Truck } from "lucide-react"

export function ContainerLoadHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Select Container",
                    description: "Choose between standard <strong>20ft</strong>, <strong>40ft</strong>, or <strong>High Cube</strong> containers to match your shipping plan.",
                    icon: Container
                },
                {
                    title: "Enter Dimensions",
                    description: "Input your unit's L/W/H and Weight. If using pallets, toggle to <strong>Pallet</strong> mode and provide pallet details.",
                    icon: Box
                },
                {
                    title: "Check Capacity",
                    description: "We calculate the maximum units that fit, accounting for <b>volume</b> and <b>weight limits</b> automatically.",
                    icon: CheckCircle2
                }
            ]}
        />
    )
}
