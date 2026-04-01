import { Metadata } from "next";
import { CLVCalculator } from "./_components/CLVCalculator";
import { CLVHowToUse } from "./_components/CLVHowToUse";
import { CLVGuide } from "./_components/CLVGuide";
import { CLVOverview } from "./_components/CLVOverview";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Customer Lifetime Value (CLV) Calculator",
    description: "Calculate the total profit a single customer generates for your business over their entire relationship — including gross margin, acquisition costs, and LTV/CAC ratio.",
};

export default function CLVPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-[42px] mb-4">
                            Customer Lifetime Value Calculator
                        </h1>
                    </FadeIn>
                </div>

                <CLVCalculator />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">

                    {/* Tool Overview */}
                    <FadeIn delay={0.1}>
                        <CLVOverview />
                    </FadeIn>

                    {/* How to Use */}
                    <div id="how-to-use">
                        <FadeIn delay={0.15}>
                            <CLVHowToUse />
                        </FadeIn>
                    </div>

                    {/* Strategy Guide */}
                    <FadeIn delay={0.2}>
                        <CLVGuide />
                    </FadeIn>

                    {/* FAQ — Ordered from foundational → strategic → advanced */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is Customer Lifetime Value (CLV)?",
                                    answer: "Customer Lifetime Value (CLV) is the total revenue your business expects to earn from a single customer over the entire duration of their relationship with you. It is calculated using three inputs: Average Order Value, Annual Purchase Frequency, and Customer Lifespan in years. CLV tells you how much each customer is worth — beyond just a single sale."
                                },
                                {
                                    question: "What is the CLV formula this calculator uses?",
                                    answer: "The primary formula is: CLV = AOV × Annual Frequency × Lifespan (years). This gives you Total Lifetime Revenue. If you add Gross Margin %, the tool also calculates Lifetime Profit = CLV × Gross Margin% − CAC. The tool separates revenue from profit so you can clearly see both."
                                },
                                {
                                    question: "Why does Lifetime Profit only appear when I enter Gross Margin?",
                                    answer: "Without Gross Margin, the tool can only show revenue — not what you actually keep. Gross Margin converts raw CLV into real profit by removing product and shipping costs. Since many users just want a quick revenue estimate, Lifetime Profit is shown as a conditional unlock when you provide the margin percentage."
                                },
                                {
                                    question: "What is the LTV/CAC ratio and why does it matter?",
                                    answer: "The LTV/CAC ratio compares the lifetime profit of a customer to what you spent to acquire them. A ratio of 1:1 means you break even on acquisition. 3:1 is considered healthy for most eCommerce businesses. 5:1 or higher is elite. If your ratio is below 1, you are losing money on every customer you acquire — which means scaling ads will accelerate losses, not growth."
                                },
                                {
                                    question: "How much should I spend to acquire a customer (CAC)?",
                                    answer: "A practical benchmark: your maximum safe CAC = Lifetime Profit ÷ 3. This maintains a healthy 3:1 LTV/CAC ratio. For example, if a customer generates $300 in lifetime profit, spending up to $100 on ads to acquire them is financially sustainable. Enter your CAC in the calculator to instantly see where you stand."
                                },
                                {
                                    question: "How do I increase my Customer Lifetime Value?",
                                    answer: "There are three main levers: 1) Raise Average Order Value through upsells, bundles, and premium tiers. 2) Increase Purchase Frequency using email marketing, loyalty programs, and re-engagement campaigns. 3) Extend Customer Lifespan with better support, subscriptions, and community building. Even small improvements in each area compound significantly in the CLV formula."
                                },
                                {
                                    question: "What does the Lifetime Value Breakdown chart show?",
                                    answer: "The breakdown chart visually splits your Total Lifetime Revenue into its components: Product Costs (COGS), Acquisition Cost (CAC, if entered), and Net Profit. Each segment is shown as a percentage of total revenue so you can immediately see whether most of your CLV is going toward costs or profit — and where to focus to improve margins."
                                },
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}