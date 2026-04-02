import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function PPCBidOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader
                icon={Info}
                title="Tool Essential"
                subtitle="Find the exact maximum bid that hits your ACoS target without overspending."
            />
            <ToolOverview
                heading="What is the "
                headingAccent="PPC Bid Calculator?"
                definition={
                    <>
                        The PPC Bid Calculator is a free tool that helps you find the right amount to pay for each ad click so you don't lose money. Enter your product price, how many visitors turn into buyers, and your profit margin — and it instantly tells you the recommended bid per click, whether your bid is safe or risky, and what you should do next. Designed for online sellers and marketers, it works across Amazon, Google, and social media ads to help you set smarter bids, avoid overpaying for clicks, and run ads profitably while growing sales.
                    </>
                }
                facts={[
                    {
                        stat: "Every Click",
                        label: "Has a Cost Limit",
                        detail: "Paying too much per click means you lose money even when someone buys. This tool shows you the exact maximum you should bid so your ads always stay profitable."
                    },
                    {
                        stat: "Not Every Click",
                        label: "Becomes a Sale",
                        detail: "If 100 people click your ad and only 10 buy, your bid has to account for those 90 wasted clicks. The more buyers you get per click, the more you can afford to bid — this tool does that math instantly."
                    },
                    {
                        stat: "Ad Spend vs.",
                        label: "Your Profit",
                        detail: "If you spend more on ads than you earn in profit, you're losing money without realizing it. This tool warns you the moment your ad targets cross into unprofitable territory."
                    }
                ]}
                accent="blue"
            />
        </div>
    )
}
