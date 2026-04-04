import { Info } from "lucide-react";
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components";

export function LandedCostOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader
                icon={Info}
                title="Tool Essential"
            />
            <ToolOverview
                heading="What is the "
                headingAccent="Landed Cost Calculator?"
                definition={
                    <>
                        The Landed Cost Calculator is a free tool that helps you find the real cost of a product after adding all extra expenses like shipping, import duties, taxes, and fees. Instead of relying only on the supplier price, it shows the actual cost per unit and total investment required to get your products ready for sale. Used by eCommerce sellers, importers, and small business owners, it helps you plan purchases, set accurate selling prices, and avoid unexpected costs—so you can make better buying decisions before placing an order.
                    </>
                }
                facts={[
                    {
                        stat: "Full Visibility",
                        label: "Find Hidden Fees",
                        detail: "Supplier quotes don't include shipping or import taxes. This tool reveals your actual costs so you never lose money on unexpected charges."
                    },
                    {
                        stat: "Margin Protection",
                        label: "Protect Your Profits",
                        detail: "If you sell products without calculating customs and handling, your profit disappears. Use your landed cost to set retail prices that actually make money."
                    },
                    {
                        stat: "Smart Sourcing",
                        label: "Compare Suppliers",
                        detail: "Easily compare different factory quotes or shipping methods (like sea vs. air freight) to find the most cost-effective option for your business."
                    }
                ]}
                accent="blue"
            />
        </div>
    );
}
