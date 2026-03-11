"use client"
import React from "react"
import { FadeIn, ToolSectionHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Truck } from "lucide-react"

interface RestockJourneyProps {
    hasInputs: boolean
    reorderPoint: number
    leadTime: number | string
}

export function RestockJourney({ hasInputs, reorderPoint, leadTime }: RestockJourneyProps) {
    return (
        <FadeIn delay={0.1}>
            <div className="relative group/journey overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 bg-white/40 backdrop-blur-md">
                {/* Card Content - Visible as skeleton when no inputs */}
                <div className={cn(
                    "p-7 transition-all duration-700 min-h-[220px] flex flex-col",
                    !hasInputs && "opacity-40 pointer-events-none"
                )}>
                    <div className="mb-10 flex items-center justify-between">
                        <ToolSectionHeader
                            title="Restock Journey"
                            icon={Truck}
                        />
                    </div>
                    <div className="px-2">
                        <div className={cn(
                            "relative h-1 rounded-full mb-10 transition-colors duration-500",
                            !hasInputs ? "bg-slate-200/50 border border-dashed border-slate-300 h-[3px]" : "bg-slate-100 h-1"
                        )}>
                            {/* Progress Bar (Visible only when has inputs) */}
                            <div
                                className={cn(
                                    "absolute left-0 h-full bg-blue-600 rounded-full transition-all duration-1000",
                                    !hasInputs ? "w-0 opacity-0" : "w-[70%] opacity-100"
                                )}
                            />
                            {/* Start Node */}
                            <div className={cn(
                                "absolute left-0 -top-1.5 w-4 h-4 bg-white border-2 rounded-full transition-all",
                                !hasInputs ? "border-slate-300 shadow-sm" : "border-slate-200"
                            )}>
                                <div className="absolute top-7 left-0 -translate-x-1/2 flex flex-col items-center">
                                    <span className="text-[10px] font-bold text-slate-300 tracking-tighter whitespace-nowrap">Order sent</span>
                                    <span className="text-[8px] font-medium text-slate-500 whitespace-nowrap">Day 0</span>
                                </div>
                            </div>
                            {/* Reorder Point Hub */}
                            <div
                                className={cn(
                                    "absolute -top-2 w-5 h-5 bg-white border-4 rounded-full shadow-sm z-10 transition-all duration-700",
                                    !hasInputs
                                        ? "left-1/2 -translate-x-1/2 border-slate-300 opacity-60"
                                        : "left-[70%] border-blue-600"
                                )}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <div className={cn(
                                        "px-2 py-0.5 rounded text-[9px] font-black whitespace-nowrap mb-1 transition-all duration-500",
                                        !hasInputs ? "bg-slate-100 text-slate-400 border border-slate-200" : "bg-blue-600 text-white"
                                    )}>
                                        {hasInputs ? `${reorderPoint} Units` : "Restock Point"}
                                    </div>
                                    <div className={cn("w-px h-3 transition-colors", !hasInputs ? "bg-slate-300" : "bg-blue-600/30")} />
                                </div>
                                <div className="absolute top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <span className={cn(
                                        "text-[10px] font-bold tracking-tighter whitespace-nowrap transition-colors",
                                        !hasInputs ? "text-blue-400" : "text-blue-600"
                                    )}>Order point</span>
                                </div>
                            </div>
                            {/* Arrival Node */}
                            <div className={cn(
                                "absolute right-0 -top-1.5 w-4 h-4 bg-white border-2 rounded-full transition-all",
                                !hasInputs ? "border-slate-300 shadow-sm" : "border-slate-200"
                            )}>
                                <div className="absolute top-7 right-0 translate-x-1/2 flex flex-col items-center">
                                    <span className="text-[10px] font-bold text-slate-300 tracking-tighter whitespace-nowrap">Delivery</span>
                                    <span className="text-[8px] font-medium text-slate-500 whitespace-nowrap">Day {hasInputs ? leadTime : "—"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Floating Overlay for Empty State - Transparent Background */}
                {!hasInputs && (
                    <div className="absolute inset-0 z-20 flex items-start justify-end p-7 pointer-events-none">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-white shadow-xl shadow-blue-500/10 px-3 py-1.5 rounded-full border border-blue-100 animate-in fade-in zoom-in duration-500 pointer-events-auto">
                            Awaiting Data
                        </span>
                    </div>
                )}
            </div>
        </FadeIn>
    )
}
