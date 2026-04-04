"use client";

import { Info } from "lucide-react";
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components";

export function TACoSOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader 
                icon={Info}
                title="Tool Essential"
            />
            <ToolOverview
                heading="Why track your "
                headingAccent="TACoS?"
                definition="The TACoS (Total Advertising Cost of Sale) Calculator is a free tool that shows how much of your total revenue is spent on advertising, including both paid and organic sales. Enter your total revenue, ad spend, and profit margin to instantly calculate TACoS, see your profit or loss, and know whether your ads are profitable, break-even, or unprofitable. Designed for Amazon sellers, eCommerce brands, and marketers, it gives a clear view of real ad efficiency across platforms like Amazon PPC, Shopify, Google, and Meta—helping you control spend, protect margins, and scale confidently."
                accent="blue"
                facts={[
                    {
                        stat: "Real Profit",
                        label: "Check",
                        detail: "Stop guessing. Instantly see how your advertising is impacting your actual take-home profit."
                    },
                    {
                        stat: "Organic",
                        label: "Boost",
                        detail: "Track how your paid ads are actively helping you get more free, organic sales over time."
                    },
                    {
                        stat: "Margin",
                        label: "Safety",
                        detail: "Keep your business healthy by making sure your ad costs aren't secretly eating all your hard-earned margins."
                    }
                ]}
            />
        </div>
    );
}
