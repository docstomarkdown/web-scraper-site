"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Truck, ChevronDown } from "lucide-react"

export function WeightConverterHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Enter Weight & Select Unit",
                    description: "Type your product weight, then tap one of the four unit buttons — lbs, oz, kg, or g — to set the input unit. The Target Unit selector below lets you pick your primary conversion target.",
                    icon: Scale
                },
                {
                    title: "Pick Carrier & Shipping Speed",
                    description: "Choose from 7+ global carriers (USPS, FedEx, UPS, DHL, Royal Mail, Canada Post, Australia Post) or select by shipping speed (Standard, Express, Next Day). The tool highlights your active cost tier immediately.",
                    icon: Truck
                },
                {
                    title: "Explore the Cost Breakdown",
                    description: "Click \"View Cost Breakdown\" to reveal every weight tier for your selected carrier — with your current tier highlighted. See exactly how many lbs separate you from the next (more expensive) band.",
                    icon: ChevronDown
                }
            ]}
        />
    )
}
