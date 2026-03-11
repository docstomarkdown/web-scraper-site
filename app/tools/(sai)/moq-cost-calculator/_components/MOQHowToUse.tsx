"use client";
import { ToolSteps } from "@/app/tools/_shared/components/ToolSteps";
import { Calculator, DollarSign, PackageSearch } from "lucide-react";
export function MOQHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "MOQ Target",
                    description: "Enter the required vendor Minimum Order Quantity plus single piece discount cost.",
                    icon: Calculator
                },
                {
                    title: "Holding Debt",
                    description: "Input variable cumulative storage operational costs generated holding vast capacity.",
                    icon: DollarSign
                },
                {
                    title: "Check Reality",
                    description: "Analyze mathematically if the specific volume price cut beats massive storage drains.",
                    icon: PackageSearch
                }
            ]}
        />
    );
}