"use client";

import { ToolSteps } from "@/app/tools/_shared/components";
import { Calendar, Globe, Clock } from "lucide-react";

export function MeetingPlannerHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Set Your Time",
                    description: "Enter the date and time you want to host the meeting in your local time zone.",
                    icon: Calendar,
                },
                {
                    title: "Add Locations",
                    description: "Add the time zones of your teammates or suppliers (e.g., Beijing, London, New York).",
                    icon: Globe,
                },
                {
                    title: "Find Overlap",
                    description: "Look for the green 'Business Hours' cards to find a time that works for everyone.",
                    icon: Clock,
                },
            ]}
        />
    );
}
