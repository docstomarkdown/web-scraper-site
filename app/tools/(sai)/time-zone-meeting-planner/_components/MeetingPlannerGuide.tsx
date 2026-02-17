"use client";

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { Sun, Moon } from "lucide-react";

export function MeetingPlannerGuide() {
    return (
        <ToolGuide
            title="Tips for International Meetings"
            icon={Sun}
            items={[
                {
                    title: "The Golden Overlap",
                    description: "For US-China logistics, 8PM-10PM EST often overlaps with Beijing morning (8AM-10AM), making it the best slot.",
                    icon: Sun,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    stat: "8PM - 10PM",
                    statLabel: "US-China Sync"
                },
                {
                    title: "Respect Off-Hours",
                    description: "Try to avoid scheduling meetings when your supplier is in 'Off Hours' (Late night) to ensure better communication quality.",
                    icon: Moon,
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    stat: "9AM - 5PM",
                    statLabel: "Target Local Time"
                },
            ]}
        />
    );
}
