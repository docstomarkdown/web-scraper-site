import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function BreakEvenOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader
                icon={Info}
                title="Tool Essential"
            />
            <ToolOverview
                heading="What is the "
                headingAccent="Break-Even Calculator?"
                definition={
                    <>
                        The Break-Even Calculator is a free tool that helps you find how many units you need to sell to cover all your costs so you don’t lose money. Enter your fixed costs, selling price, and cost per unit, and it instantly shows the minimum number of sales needed and how much you earn per product. Designed for business owners, eCommerce sellers, and entrepreneurs, it is used to set sales targets, plan pricing, and make better decisions—helping you understand exactly when your business stops losing money and starts making profit.
                    </>
                }
                facts={[
                    {
                        stat: "Sales Target",
                        label: "Zero Loss",
                        detail: "Find the exact amount of units you must sell to cover business overhead without losing money."
                    },
                    {
                        stat: "Unit Profit",
                        label: "Post-Cost",
                        detail: "See exactly how much money each product brings in after variable costs are deducted."
                    },
                    {
                        stat: "Smart Pricing",
                        label: "Strategy",
                        detail: "Test different prices and costs to see how they impact your profitability and business targets."
                    }
                ]}
                accent="blue"
            />
        </div>
    )
}
