"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { RefreshCw, Truck, PackageOpen, Globe, BookOpen } from "lucide-react"

export function WeightConverterGuide() {
    return (
        <ToolGuide
            title="Weight & Shipping Optimization Essentials"
            icon={BookOpen}
            items={[
                {
                    title: "All 4 Units at Once",
                    description: "Enter a weight in any of the four units — lbs, oz, kg, or g — and every other unit updates in real-time in the \"Other Units\" card. No toggling, no re-entering. Your chosen target unit is always shown as the large hero value at the top of the results panel.",
                    icon: RefreshCw,
                    stat: "4 Units",
                    statLabel: "Simultaneously",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700",
                    tooltip: "lbs, oz, kg, and g are all calculated and shown at the same time."
                },
                {
                    title: "Live Carrier Tier Matching",
                    description: "The tool maps your product weight (converted to lbs internally) against the actual published weight tiers of 7+ carriers — USPS, FedEx, UPS, DHL, Royal Mail, Canada Post, and Australia Post. Your active tier is highlighted, and estimated cost ranges are shown as a badge.",
                    icon: Truck,
                    stat: "7+",
                    statLabel: "Carriers supported",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-700",
                    tooltip: "US domestic, global express, and regional carriers all included."
                },
                {
                    title: "Tier Boundary Awareness",
                    description: "Expand \"View Cost Breakdown\" to see every tier for your selected carrier on a single screen — from the lightest letter tier to freight. This makes it easy to spot if trimming a few ounces of packaging weight would drop you into a cheaper shipping band and save money at scale.",
                    icon: PackageOpen,
                    stat: "Full",
                    statLabel: "Tier breakdown",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-700",
                    tooltip: "See the full price ladder — not just your tier — so you can optimise packaging weight."
                },
                {
                    title: "Switch by Speed or Carrier",
                    description: "Not sure which carrier you'll use? Switch to the Shipping Speed tab (Standard, Express, Next Day) to get generic cross-carrier estimates instead. The shipping estimate card updates instantly when you change either the carrier or the speed — no page reload.",
                    icon: Globe,
                    stat: "3 Speeds",
                    statLabel: "Generic tiers",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-700",
                    tooltip: "Standard, Express, and Next Day tiers give carrier-agnostic shipping cost ranges."
                }
            ]}
        />
    )
}
