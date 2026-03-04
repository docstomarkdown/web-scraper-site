"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { Box, Calculator, Zap, BookOpen } from "lucide-react";
export function DimWeightGuide() {
    const items = [
        {
            title: "What is Dimensional Weight?",
            description: (
                <>
                    <p className="mb-2">
                        Dimensional weight (DIM weight) is a pricing technique used by commercial freight transport companies. It reflects the package density—the amount of space a package occupies in relation to its actual weight.
                    </p>
                    <p>
                        Carriers charge based on the greater of the <strong>Actual Weight</strong> or the <strong>Dimensional Weight</strong>.
                    </p>
                </>
            ),
            icon: Box,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            stat: "Density",
            statColor: "text-blue-600",
            statLabel: "Pricing Factor",
        },
        {
            title: "The Calculation Formula",
            description: (
                <>
                    <p className="mb-2">
                        The formula is: <code>(Length × Width × Height) / Divisor</code>.
                    </p>
                    <p>
                        Common divisors are <strong>139</strong> for daily rates (UPS/FedEx) and <strong>166</strong> for retail rates. Always round up dimensions to the nearest inch.
                    </p>
                </>
            ),
            icon: Calculator,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            stat: "139",
            statColor: "text-green-600",
            statLabel: "Common Divisor",
        },
        {
            title: "Optimization Strategies",
            description: (
                <>
                    <p className="mb-2">
                        To reduce costs, use the smallest box possible. Avoid &quot;shipping air&quot; by using custom-sized boxes or poly mailers for non-fragile items.
                    </p>
                    <p>
                        Negotiating a higher DIM divisor (e.g., 166 instead of 139) with your carrier can also significantly reduce billable weight.
                    </p>
                </>
            ),
            icon: Zap,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            stat: "Save %",
            statColor: "text-amber-600",
            statLabel: "Optimize Packaging",
        },
    ];
    return <ToolGuide title="Understanding Dimensional Weight" icon={BookOpen} items={items} />;
}