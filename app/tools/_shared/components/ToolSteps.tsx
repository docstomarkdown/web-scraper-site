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
    // If goal exists, we append it to steps for the layout
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
                                    {/* Step number badge overlapping the top border (Premium blue border) */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white border-[2.5px] border-blue-500 shadow-sm flex items-center justify-center z-30 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                                        <span className="text-sm font-bold text-blue-600 leading-none">
                                            {index + 1}
                                        </span>
                                    </div>
                                    {/* Card Content */}
                                    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-blue-200/60 transition-all duration-300 p-6 pt-10 pb-8 w-full h-full flex flex-col text-left font-sans">
                                        {/* Light grayish-blue icon box at top left */}
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50/80 ring-1 ring-inset ring-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-[18px] font-bold text-slate-600 mb-2 leading-tight transition-colors duration-300">
                                            Step {index + 1}: {step.title}
                                        </h3>
                                        <p
                                            className="text-[14.5px] text-slate-500 leading-relaxed font-medium line-clamp-6"
                                            dangerouslySetInnerHTML={{ __html: step.description }}
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
                            {/* Mobile Step circle */}
                            <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full bg-white border-[2.5px] border-blue-500 shadow-sm flex items-center justify-center mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                                <span className="text-sm font-bold text-blue-600 leading-none">{index + 1}</span>
                            </div>
                            {/* Card */}
                            <div className="flex-1 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-blue-200/60 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-2.5">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50/80 ring-1 ring-inset ring-blue-500/10 flex items-center justify-center text-blue-600 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-[16.5px] font-bold text-slate-600 leading-snug transition-colors duration-300">
                                        Step {index + 1}: {step.title}
                                    </h3>
                                </div>
                                <p className="text-[14.5px] text-slate-500 leading-relaxed font-medium pl-11" dangerouslySetInnerHTML={{ __html: step.description }} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
