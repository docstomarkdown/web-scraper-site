"use client"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"

export function ContainerLoadOverview() {
    return (
        <ToolOverview
            heading="Why Use Container Load Calculator?"
            headingAccent="Container Load Calculator"
            definition="The primary purpose of the Container Load Calculator is to find the most efficient way to fit your cargo inside standard sea containers. Built for exporters and freight managers, this tool eliminates shipping guesswork by instantly calculating exactly how many boxes will fit—whether loose-loaded or on pallets. It is your essential tool for maximizing space, reducing costs per unit, and planning your cargo before booking a shipment."
            facts={[
                {
                    stat: "7 Types",
                    label: "Container Sizes",
                    detail: "From 20ft Standard to 45ft High Cube Reefers — all pre-loaded with accurate interior dimensions and payload limits."
                },
                {
                    stat: "2 Modes",
                    label: "Loose & Pallet Loading",
                    detail: "Switch between direct loose loading and palletized loading to compare space efficiency and choose the smarter packing strategy."
                },
                {
                    stat: "Instant",
                    label: "Arrangement & Utilization",
                    detail: "See exactly how boxes are arranged (e.g. 14L × 4W × 6H) and what % of container volume is actually being used — live as you type."
                }
            ]}
            accent="blue"
        />
    )
}
