import { Metadata } from "next";
import { TimeZonePlanner } from "./_components/TimeZonePlanner";
import { MeetingPlannerHowToUse } from "./_components/MeetingPlannerHowToUse";
import { MeetingPlannerGuide } from "./_components/MeetingPlannerGuide";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Time Zone Meeting Planner - E-commerce Logistics",
    description: "Coordinate meetings with international suppliers, VAs, and teams. Find the perfect overlap time between EST, CST (Beijing), GMT, and more.",
};

export default function TimeZonePlannerPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                            Time Zone Meeting Planner
                        </h1>
                    </FadeIn>
                </div>

                <TimeZonePlanner />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <FadeIn delay={0.1}>
                        <MeetingPlannerHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <MeetingPlannerGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Does this adjust for Daylight Savings?",
                                    answer: "This tool uses standard offsets. For critical recurring meetings, always double-check local daylight savings changes, as dates vary by country."
                                },
                                {
                                    question: "What is CST?",
                                    answer: "In e-commerce context, CST often refers to 'China Standard Time' (UTC+8), not to be confused with US Central Standard Time."
                                }
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
