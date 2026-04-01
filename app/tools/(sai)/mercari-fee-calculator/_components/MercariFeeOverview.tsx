"use client";
import React from "react";
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview";

export function MercariFeeOverview() {
    return (
        <ToolOverview
            heading="What is the Mercari Fee Calculator?"
            headingAccent="Mercari Fee Calculator"
            definition="The Mercari Fee Calculator is a free tool that shows how much money you will actually earn when selling an item on Mercari, a popular online marketplace for buying and selling new or used products.The tool calculates your total fees, shipping costs, expenses, and final profit, so you instantly know your real earnings before listing an item.It is used by individual sellers, resellers, side-hustlers, and small businesses who want a quick and accurate profit estimate. This tool is helpful for anyone selling online, even if they have never used Mercari before."
            accent="blue"
            facts={[
                {
                    stat: "10%",
                    label: "Selling Fee",
                    detail: "Mercari's flat selling fee is applied to every transaction. It's deducted automatically from your payout after the item sells."
                },
                {
                    stat: "2.9% + $0.50",
                    label: "Processing Fee",
                    detail: "A separate payment processing fee charged on the total amount the buyer pays, covering card and transaction costs."
                },
                {
                    stat: "Revealed",
                    label: "Hidden Costs",
                    detail: "Shipping, packaging, and processing fees stack up invisibly. This tool calculates all of them to show your accurate take-home profit."
                }
            ]}
        />
    );
}
