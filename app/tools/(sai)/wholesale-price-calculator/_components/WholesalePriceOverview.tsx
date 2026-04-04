import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function WholesalePriceOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader
                icon={Info}
                title="Tool Essential"
            />
            <ToolOverview
                heading="What is the "
                headingAccent="Wholesale Price Calculator?"
                definition={
                    <>
                        The Wholesale Price Calculator is a free tool that helps you find the right price to sell your product in bulk while still making a profit. By entering your cost per unit, desired profit margin, and optional tax or duty, it instantly calculates your wholesale price and shows how much you earn on each product. Designed for manufacturers, suppliers, and eCommerce sellers, it is used when selling to retailers, resellers, or distributors—helping you set competitive bulk prices, avoid underpricing, and protect your profit on every sale.
                    </>
                }
                facts={[
                    {
                        stat: "Profit-Lock",
                        label: "Guaranteed",
                        detail: "Never guess your price again—automatically calculate the exact amount you keep after every unit sold."
                    },
                    {
                        stat: "Zero Waste",
                        label: "Accurate",
                        detail: "Factor in import duties and taxes so your actual cost is always accurate and your profits stay safe."
                    },
                    {
                        stat: "B2B Pro",
                        label: "Competitive",
                        detail: "Designed for selling to retailers and distributors, helping you set prices that win more deals."
                    }
                ]}
                accent="blue"
            />
        </div>
    )
}
