"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Users, BarChart3 } from "lucide-react"

export function CACHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Your Spend",
                    description: "Input your total fully loaded sales and marketing costs — including ad spend, salaries, commissions, tools, and overhead for the period.",
                    icon: DollarSign
                },
                {
                    title: "Add New Customers",
                    description: "Enter only the number of new customers acquired during that same period. Do not include returning or repeat buyers.",
                    icon: Users
                },
                {
                    title: "Review Your CAC",
                    description: "Instantly see your cost per customer with a dynamic performance badge, and compare it against the recommended 3:1 LTV:CAC benchmark.",
                    icon: BarChart3
                }
            ]}
        />
    )
}