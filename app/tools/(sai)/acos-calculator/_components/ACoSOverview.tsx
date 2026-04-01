import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function ACoSOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader 
                icon={Info}
                title="What is the ACoS Calculator?"
                subtitle="Instantly see how efficiently your ads are turning into actual profit."
            />
            <ToolOverview
                heading="Why track your "
                headingAccent="ACoS?"
                definition={
                    <>
                        The ACoS (Advertising Cost of Sale) Calculator is a free tool that shows how efficiently your ads generate revenue by calculating how much you spend to earn each dollar of ad sales. Enter your ad spend, ad revenue, and profit margin to instantly get ACoS, profit or loss, and see if your campaigns are profitable, break-even, or unprofitable. Designed for Amazon sellers, eCommerce brands, and marketers, it helps you track ad performance across Amazon PPC, Google, Shopify, and Meta—so you can control costs and optimize campaigns effectively.
                    </>
                }
                facts={[
                    {
                        stat: "Campaign Check",
                        label: "Efficiency",
                        detail: "Instantly see if your ad campaigns are making you money or actively draining your wallet."
                    },
                    {
                        stat: "Breakeven",
                        label: "Target",
                        detail: "Find out exactly how high your ad costs can go before you start losing money on a sale."
                    },
                    {
                        stat: "Net Return",
                        label: "Clarity",
                        detail: "Stop looking at just revenue. Get a clear view of your actual take-home profit after ad costs are paid."
                    }
                ]}
                accent="blue"
            />
        </div>
    )
}
