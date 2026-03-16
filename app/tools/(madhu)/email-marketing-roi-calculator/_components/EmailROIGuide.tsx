"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Users, MousePointerClick, DollarSign, BookOpen } from "lucide-react"

export function EmailROIGuide() {
    return (
        <ToolGuide
            title="Everything You Need to Know About Email ROI"
            icon={BookOpen}
            items={[
                {
                    title: "The 'Open Rate' Strategy",
                    description:
                        "A high <strong>Estimated Open Rate</strong> is great, but it's just step one. Modern email apps (like iOS Mail) can sometimes inflate this. Focus on keeping your <strong>subject lines</strong> relevant to ensure that those who open are actually interested in clicking through.",
                    icon: Users,
                    stat: "21.5%",
                    statLabel: "Avg Open Rate",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Industry average varies by niche, but 20–25% is a healthy baseline.",
                },
                {
                    title: "Email CTR (on Opens)",
                    description:
                        "This is the <strong>'Click-to-Open' (CTOR)</strong> equivalent. It measures the engagement of those who actually saw the email. If your <strong>Email CTR (on Opens)</strong> is below <strong>2%</strong>, your body copy or CTA button might not be persuasive enough.",
                    icon: MousePointerClick,
                    stat: "2.3%",
                    statLabel: "Target CTR",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Higher CTRs mean your content truly resonates with your audience.",
                },
                {
                    title: "The Conversion Gap",
                    description:
                        "Your <strong>Post-Click Conversion Rate</strong> happens on your website. If clicks are high but conversions are low, the problem isn't your email — it's your <strong>landing page</strong>. Ensure your email's promise matches the landing page's offer exactly.",
                    icon: DollarSign,
                    stat: "3-5%",
                    statLabel: "Healthy Conv.",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Don't confuse campaign clicks with actual sales.",
                },
            ]}
        />
    )
}
