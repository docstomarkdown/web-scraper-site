import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function SalesVelocityOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader
                icon={Info}
                title="What is the Sales Velocity Calculator?"
                subtitle="Uncover your true sales rate by removing stockout days from your average."
            />
            <ToolOverview
                heading="What is the "
                headingAccent="Sales Velocity Calculator?"
                definition={
                    <>
                        The Sales Velocity Calculator is a quick, user-friendly tool that shows how fast your product sells each day. Simply enter your total units sold, time period, and any stockout days, and the tool instantly provides your true sales velocity, daily average, monthly run rate, and projected revenue. Designed for online sellers, Amazon/Flipkart merchants, D2C brands, small businesses, and inventory teams, it offers an easy way to track product performance and prevent stockouts. It helps you understand your real selling speed, identify demand trends, and make smarter restocking decisions — all through a clean and intuitive interface.
                    </>
                }
                facts={[
                    {
                        stat: "True",
                        label: "Selling Speed",
                        detail: "Get an accurate daily sales rate that adjusts for stockouts, so you instantly understand how fast your product is really moving."
                    },
                    {
                        stat: "Future",
                        label: "Sales",
                        detail: "See your weekly velocity, monthly run rate, and projected revenue to plan inventory and avoid running out of stock."
                    },
                    {
                        stat: "Smarter",
                        label: "Decisions",
                        detail: "Spot demand trends, prevent stockouts, and restock at the right time — all with one quick, easy-to-use calculation."
                    }
                ]}
                accent="blue"
            />
        </div>
    )
}
