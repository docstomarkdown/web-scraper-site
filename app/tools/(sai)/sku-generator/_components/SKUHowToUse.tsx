"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Tag, Blocks, Sliders, Copy } from "lucide-react";
export function SKUHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Class Info",
                    description: "Enter tightly mapped standardized core internal branding categories explicitly tied referencing unique specialized individual colors.",
                    icon: Tag
                },
                {
                    title: "Set Pattern",
                    description: "Define structured uniform universal separating string characters forcing absolutely consistent scalable physical packaging labels.",
                    icon: Blocks
                },
                {
                    title: "Get Value",
                    description: "Instantly map perfectly organized deeply structured clean scannable distinct global alphanumeric warehouse tracking inventory outputs.",
                    icon: Sliders
                }
            ]}
        />
    );
}