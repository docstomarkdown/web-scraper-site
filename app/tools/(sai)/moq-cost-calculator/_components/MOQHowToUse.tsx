"use client";

import { ToolSteps } from "@/app/tools/_shared/components/ToolSteps";
import { Calculator, DollarSign, PackageSearch } from "lucide-react";

export function MOQHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Input Supplier Costs",
                    description:
                        "Enter the Unit Price and the Minimum Order Quantity (MOQ) required by your supplier. These are the base figures for your calculation.",
                    icon: Calculator,
                },
                {
                    title: "Add Logistics Fees",
                    description:
                        "Include your estimated total shipping costs and any miscellaneous fees (like customs or inspection) to get the true 'landed' cost.",
                    icon: DollarSign,
                },
                {
                    title: "Assess Inventory Risk",
                    description:
                        "Enter your estimated monthly sales. The tool will calculate how many months of inventory this MOQ represents, warning you if it's too high.",
                    icon: PackageSearch,
                },
            ]}
        />
    );
}
