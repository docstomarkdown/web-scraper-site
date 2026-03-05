"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Calendar, Globe, Clock } from "lucide-react";
export function MeetingPlannerHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Home Clock",
                    description: "Enter entirely specific localized home city environments combined directly setting acceptable workable morning to afternoon constraints.",
                    icon: Calendar
                },
                {
                    title: "Away Zones",
                    description: "Add globally explicit target coordinate locations ensuring absolute accurate geographic distribution matching client requirements globally.",
                    icon: Globe
                },
                {
                    title: "Check Block",
                    description: "Instantly overlay absolute synchronized cross global explicit available timezone hours successfully securing maximum active available participant connectivity.",
                    icon: Clock
                }
            ]}
        />
    );
}