import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function MOQOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader
                icon={Info}
                title="What is the MOQ Cost Calculator?"
                subtitle="Calculate landed costs and evaluate inventory investment risks."
            />
            <ToolOverview
                heading="What is the "
                headingAccent="MOQ Cost Calculator?"
                definition={
                    <>
                        The MOQ Cost Calculator is a free tool that helps you find how much money you need to place a bulk order with a supplier. Suppliers often require you to buy a minimum number of products—this is called Minimum Order Quantity (MOQ). By entering the cost per unit, MOQ, and any extra costs like shipping or taxes, the tool instantly calculates your total investment and real cost per product. Used by eCommerce sellers, small business owners, and product sourcers, it helps you plan inventory purchases, manage budgets, and decide whether a bulk order is affordable—so you can avoid unexpected costs and make smarter buying decisions before placing an order.
                    </>
                }
                facts={[
                    {
                        stat: "Hidden Costs",
                        label: "Real Price",
                        detail: "Supplier prices can be misleading. Always factor in shipping and taxes to find your true landed cost per product."
                    },
                    {
                        stat: "Dead Stock",
                        label: "Inventory Risk",
                        detail: "Buying too much means paying a lot in storage. Measuring inventory coverage helps you avoid tying up critical business capital."
                    },
                    {
                        stat: "Actionable Data",
                        label: "Negotiate",
                        detail: "If the calculation shows high risk, use these clear numbers to confidently ask your supplier for a smaller, safer initial order."
                    }
                ]}
                accent="blue"
            />
        </div>
    )
}
