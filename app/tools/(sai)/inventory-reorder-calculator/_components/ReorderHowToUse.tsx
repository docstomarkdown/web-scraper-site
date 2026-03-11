"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { ClipboardList, Clock, Truck } from "lucide-react";
export function ReorderHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Daily Sales",
                    description: "Enter average tested daily retail moves and the required supplier lead timeline.",
                    icon: ClipboardList
                },
                {
                    title: "Buffer Size",
                    description: "Input minimum necessary safety reserve levels against unforeseen sudden stockouts.",
                    icon: Truck
                },
                {
                    title: "Get Trigger",
                    description: "Instantly pinpoint the exact physical leftover count requiring immediate restock.",
                    icon: Clock
                }
            ]}
        />
    );
}