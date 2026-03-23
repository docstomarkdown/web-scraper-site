"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Building2, Route, ShieldAlert, BookOpen } from "lucide-react"
export function LeadTimeGuide() {
    return (
        <ToolGuide
            title="What Does This Tool Calculate For You?"
            icon={BookOpen}
            items={[
                {
                    title: "Total Production Days",
                    description: "The calculator adds up the exact number of days your supplier takes to source materials, manufacture the product, and complete quality checks. You can see how any delays here will impact your final arrival date.",
                    icon: Building2,
                    stat: "Factory",
                    statLabel: "Manufacturing",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                },
                {
                    title: "Door-to-Door Shipping Time",
                    description: "Enter your freight duration (whether air or sea) and the calculator aggregates it with port and customs delays. You instantly see how fast shipping methods could save you from stockouts.",
                    icon: Route,
                    stat: "Transit",
                    statLabel: "Logistics",
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    statColor: "text-indigo-600"
                },
                {
                    title: "Safety Buffer Timeline",
                    description: "Never miss a restock deadline again! By easily adding an exact buffer to the tool (like a 10-day safety net), the calculator guarantees your 'Estimated Delivery Date' accounts for the expected supply chain chaos.",
                    icon: ShieldAlert,
                    stat: "Delay",
                    statLabel: "Protection",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600"
                }
            ]}
        />
    )
}
