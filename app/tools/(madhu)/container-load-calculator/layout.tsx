import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Container Load Calculator - Optimize Shipping & Cargo Space",
    description: "Calculate how many boxes fit in a 20ft or 40ft container. Optimize pallet loading, cubic volume, and weight limits to maximize your shipping ROI.",
    keywords: ["container load calculator", "cargo space optimizer", "shipping calculator", "pallet loading", "20ft container capacity", "40ft container capacity"],
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
