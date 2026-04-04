"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function AbandonmentOverview() {
    return (
        <div className="space-y-8" id="overview">
            <ToolOverview
                heading="What is the Cart Abandonment Rate?"
                headingAccent="Cart Abandonment Rate"
                definition="The Cart Abandonment Rate Calculator is a free, simple tool that tells you how many shoppers add items to their cart but leave without buying. By entering your total carts created and completed checkouts, it instantly shows your abandonment percentage so you can spot checkout issues and improve conversions. It's used by eCommerce sellers, digital marketers, D2C brands, and online store owners across platforms like Shopify, WooCommerce, Magento, and Amazon to understand shopper behavior and reduce lost sales."
                facts={[
                    {
                        stat: "Spot",
                        label: "Drop-Off Points",
                        detail: "See what percentage of customers add items to their cart but don't complete the purchase, helping you quickly identify checkout issues."
                    },
                    {
                        stat: "Boost",
                        label: "Conversion Rate",
                        detail: "Use the abandonment rate to spot friction points, fix checkout steps, and increase the number of shoppers who complete their purchase."
                    },
                    {
                        stat: "Make",
                        label: "Smarter Decisions",
                        detail: "Know exactly where your store is losing revenue so you can optimize your pricing, UX, payment flow, and remarketing efforts."
                    }
                ]}
            />
        </div>
    )
}
