import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function DimWeightOverview() {
    return (
        <div className="w-full mb-16">
            <ToolSectionHeader
                icon={Info}
                title="What is the Dimensional Weight Calculator?"
                subtitle="Calculate how much your package actually costs to ship based on its size."
            />
            <ToolOverview
                heading="What is the "
                headingAccent="Dimensional Weight Calculator?"
                definition={
                    <>
                        The Dimensional Weight Calculator quickly shows whether your shipment will be charged based on actual weight or dimensional (volume-based) weight. By entering your package dimensions and weight, you instantly see the carrier-billed weight so you can avoid unexpected shipping costs. This tool is used by e-commerce sellers, Amazon/Flipkart merchants, D2C brands, logistics teams, and anyone shipping products who needs a simple, accurate, and user-friendly way to understand shipping charges and choose the most cost-efficient packaging.
                    </>
                }
                facts={[
                    {
                        stat: "Know Your",
                        label: "Chargeable Weight",
                        detail: "Instantly see whether carriers like UPS, FedEx, or Amazon will bill you based on Actual Weight or Dimensional Weight."
                    },
                    {
                        stat: "Calculate",
                        label: "DIM Weight in Seconds",
                        detail: "Just enter Length, Width, Height, and the tool automatically computes your Dimensional Weight using the correct carrier DIM divisor."
                    },
                    {
                        stat: "Avoid",
                        label: "Unexpected Shipping Costs",
                        detail: "Understand the true cost of shipping before you send a package, helping you choose smarter packaging and prevent overspending."
                    }
                ]}
                accent="blue"
            />
        </div>
    )
}
