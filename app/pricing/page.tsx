import PricingSection from "@/components/sections/pricing-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Explore our flexible pricing plans designed to fit your needs. Whether you're an individual or a business, we have options for everyone.",
  keywords: ["pricing", "plans", "subscription", "cost", "affordable", "business", "individual","pro","personal"],
}
export default function Pricing() {
  return (
    <PricingSection />
  )
};  