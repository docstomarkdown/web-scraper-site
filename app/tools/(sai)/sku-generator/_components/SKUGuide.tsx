"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Hash, Search, Zap, ListChecks } from "lucide-react";

export function SKUGuide() {
    return (
        <div id="sku-guide">
            <ToolGuide
                title="Understanding SKUs & Best Practices"
                icon={BookOpen}
                items={[
                    {
                        title: "What is a SKU?",
                        description: "A Stock Keeping Unit (SKU) is a unique internal code used to track inventory. Unlike UPCs, SKUs are custom-designed by you to prioritize the information your team needs most.",
                        icon: Hash,
                        iconBg: "bg-blue-50",
                        iconColor: "text-blue-500",
                        stat: "Unique",
                        statColor: "text-blue-600",
                        statLabel: "Internal ID",
                        tooltip: "Your store's DNA."
                    },
                    {
                        title: "Internal Hierarchy",
                        description: "Organize SKU components from broad to narrow: [Brand] > [Category] > [Model] > [Attribute]. This makes sorting and filtering much easier in your warehouse or store.",
                        icon: ListChecks,
                        iconBg: "bg-emerald-50",
                        iconColor: "text-emerald-500",
                        stat: "Logic",
                        statColor: "text-emerald-600",
                        statLabel: "Hierarchy",
                        tooltip: "Sort from broad to narrow."
                    },
                    {
                        title: "Keep it Simple",
                        description: "Avoid 'meaningless' numbers or overly long descriptions. A good SKU should be 'readable' by a human at a glance without looking up a manual.",
                        icon: Zap,
                        iconBg: "bg-amber-50",
                        iconColor: "text-amber-500",
                        stat: "Readable",
                        statColor: "text-amber-600",
                        statLabel: "Human First",
                        tooltip: "Don't overcomplicate it."
                    },
                    {
                        title: "Universal Uniqueness",
                        description: "Ensure no two products share a SKU. Even if a product is discontinued, its SKU should never be reused to avoid historical data conflicts in your sales reports.",
                        icon: Search,
                        iconBg: "bg-purple-50",
                        iconColor: "text-purple-500",
                        stat: "Conflict",
                        statColor: "text-purple-600",
                        statLabel: "Risk Free",
                        tooltip: "One code, one product."
                    }
                ]}
            />
        </div>
    );
}
