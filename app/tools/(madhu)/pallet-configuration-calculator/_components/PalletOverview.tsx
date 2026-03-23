"use client"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"

export function PalletOverview() {
    return (
        <ToolOverview
            heading="Why Use the Pallet"
            headingAccent="Configuration Calculator?"
            definition="The primary purpose of the Pallet Configuration Calculator is to help warehouse managers, eCommerce sellers, and logistics teams instantly find the optimal way to load boxes onto a pallet — maximizing units per pallet while staying within height and weight limits. Simply enter your box dimensions and pallet type (Standard US, Euro, or Custom), and the tool automatically tests 6 box orientations to show you the best arrangement, total boxes, layers, space efficiency, and a live visual preview. Even a small improvement in pallet utilization can save thousands in annual freight costs."
            facts={[
                {
                    stat: "Live",
                    label: "Instant Results",
                    detail: "Get your optimal pallet layout the moment you enter box length and width — no button clicks needed."
                },
                {
                    stat: "6×",
                    label: "Orientation Testing",
                    detail: "Automatically tests 6 box orientations (Standard, Rotated, On Side, On End) to find the maximum fit."
                },
                {
                    stat: "Pallet",
                    label: "Visual Preview",
                    detail: "See a live isometric pallet visualization that updates in real time as you adjust dimensions."
                }
            ]}
            accent="blue"
        />
    )
}
