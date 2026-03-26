"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function AbandonmentOverview() {
    return (
        <div className="space-y-8" id="overview">
            <ToolOverview
                heading="Why Use the Cart Abandonment Calculator?"
                headingAccent="Cart Abandonment Calculator"
                definition="The primary purpose of the Cart Abandonment Rate Calculator is to measure exactly how many potential buyers are leaving your store without completing their purchase. Built for e-commerce store owners, growth marketers, and UX designers, this tool instantly highlights the friction in your checkout flow. It is your essential tool for understanding lost revenue, setting up email recovery campaigns, and improving your overall conversion rate."
                facts={[
                    {
                        stat: "Lost",
                        label: "Revenue",
                        detail: "Identify exactly how many interested shoppers didn't cross the finish line, representing direct lost revenue."
                    },
                    {
                        stat: "Health",
                        label: "Check",
                        detail: "Compare your store's abandonment rate against the global industry average of around 70%."
                    },
                    {
                        stat: "Optimize",
                        label: "Funnels",
                        detail: "Use this baseline metric to test new checkout flows, remove hidden fees, and optimize the buying experience."
                    }
                ]}
            />
        </div>
    )
}
