import { Info } from "lucide-react";
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components";

export function SafetyStockOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader
                icon={Info}
                title="Tool Essential"
            />
            <ToolOverview
                heading="What is the "
                headingAccent="Safety Stock Calculator?"
                definition={
                    <>
                        The Safety Stock Calculator is a free tool that helps you find how much extra inventory you need to avoid stockouts during demand spikes or supplier delays. Enter your daily sales and lead-time data, and it instantly calculates your ideal safety buffer and demand estimates. Used by eCommerce sellers, inventory planners, and supply-chain teams, it helps you maintain healthy stock levels, set accurate reorder points, and keep operations running without interruption.
                    </>
                }
                facts={[
                    {
                        stat: "Zero Stockouts",
                        label: "Never Miss a Sale",
                        detail: "Protect your top-selling products from suddenly selling out during holidays, ad promotions, or unexpected viral demand spikes."
                    },
                    {
                        stat: "Cash Flow",
                        label: "Avoid Overstocking",
                        detail: "Holding too much emergency stock ties up your cash unnecessarily. This tool calculates the exact minimum buffer you need to stay lean."
                    },
                    {
                        stat: "Delay Defense",
                        label: "Beat Supply Delays",
                        detail: "Supplier backlogs and shipping delays happen frequently. A proper safety buffer ensures your store stays open even when incoming inventory is late."
                    }
                ]}
                accent="blue"
            />
        </div>
    );
}
