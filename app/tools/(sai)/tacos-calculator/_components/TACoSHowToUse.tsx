"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { DollarSign, BarChart3, Percent } from "lucide-react";
export function TACoSHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "All Ad Cash",
                    description: "Enter total raw holistic digital financial expenditures strictly funding targeted explicit broad PPC marketing retail campaigns.",
                    icon: DollarSign
                },
                {
                    title: "All Impact",
                    description: "Input universal cross channel entire gross retail sales encompassing directly attributed revenue alongside all completely organic sales.",
                    icon: BarChart3
                },
                {
                    title: "Check Scale",
                    description: "Instantly derive exact Total Advertising Cost metrics outlining precisely broader digital spending impact heavily manipulating base bottomlines.",
                    icon: Percent
                }
            ]}
        />
    );
}