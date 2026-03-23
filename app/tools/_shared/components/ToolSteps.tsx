"use client"
import { ToolSectionHeader } from "./ToolSectionHeader"
import { LucideIcon, HelpCircle } from "lucide-react"
export interface StepItem {
    title: string
    description: string
    icon: LucideIcon
}
interface ToolStepsProps {
    steps: StepItem[]
    title?: string
    icon?: LucideIcon
    goal?: StepItem
}
export function ToolSteps({ steps, title = "How to Use This Calculator", icon = HelpCircle, goal }: ToolStepsProps) {
    const allSteps = goal ? [...steps, goal] : steps
    return (
        <section id="how-to-use" className="relative">
            <ToolSectionHeader icon={icon} title={title} />
            {/* ── Desktop: Horizontal Timeline Cards ── */}
            <div className="hidden md:block w-full py-4">
                <div className="relative">
                    <div className="grid gap-8 lg:gap-12 relative z-10" style={{ gridTemplateColumns: `repeat(${allSteps.length}, minmax(0, 1fr))` }}>
                        {allSteps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <div key={index} className="relative w-full group">
                                    {/* Filled blue step number badge overlapping card top */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-blue-500 shadow-sm flex items-center justify-center z-30 transition-all duration-300 group-hover:scale-110 ring-4 ring-white">
                                        <span className="text-sm font-black text-white leading-none">
                                            {index + 1}
                                        </span>
                                    </div>
                                    {/* Card Content */}
                                    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 p-6 pt-10 pb-8 w-full h-full flex flex-col text-left font-sans overflow-hidden">
                                        {/* Icon box */}
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50/80 ring-1 ring-inset ring-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-110 origin-center">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-[14.5px] lg:text-[16px] font-bold text-slate-600 mb-2 leading-tight tracking-tight transition-colors duration-300 min-h-0 md:min-h-[2.25rem] flex items-center">
                                            <span>Step {index + 1}: {step.title}</span>
                                        </h3>
                                        <p
                                            className="text-[14.5px] text-slate-500 leading-relaxed font-medium line-clamp-6 [&_em]:not-italic [&_em]:font-semibold [&_em]:text-slate-500"
                                            dangerouslySetInnerHTML={{ __html: step.description.replace(/<strong>(.*?)<\/strong>/gi, '$1') }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* ── Mobile: Vertical Stacked Timeline ── */}
            <div className="md:hidden space-y-5 pt-3">
                {allSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                        <div key={index} className="relative flex items-start gap-4 group cursor-default">
                            {/* Mobile filled step circle */}
                            <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full bg-blue-500 shadow-sm flex items-center justify-center mt-1 ring-[3px] ring-white transition-all duration-300 group-hover:scale-110">
                                <span className="text-sm font-black text-white leading-none">{index + 1}</span>
                            </div>
                            {/* Card */}
                            <div className="flex-1 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] group-hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-3 mb-2.5">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50/80 ring-1 ring-inset ring-blue-500/10 flex items-center justify-center text-blue-600 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 origin-center">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-[16px] font-bold text-slate-600 leading-snug transition-colors duration-300">
                                        Step {index + 1}: {step.title}
                                    </h3>
                                </div>
                                <p className="text-[14.5px] text-slate-500 leading-relaxed font-medium pl-11 [&_em]:not-italic [&_em]:font-semibold [&_em]:text-slate-500" dangerouslySetInnerHTML={{ __html: step.description.replace(/<strong>(.*?)<\/strong>/gi, '$1') }} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
