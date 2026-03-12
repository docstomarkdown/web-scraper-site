import { LucideIcon } from "lucide-react"

interface ToolSectionHeaderProps {
    icon: LucideIcon
    title: string
    subtitle?: string
}

export function ToolSectionHeader({ icon: Icon, title, subtitle }: ToolSectionHeaderProps) {
    return (
        <div className="mb-8 md:mb-10 px-1">
            <div className={`flex items-center gap-3.5 sm:gap-4 ${subtitle ? "mb-3" : "mb-0"}`}>
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/80 shadow-[0_2px_8px_-4px_rgba(59,130,246,0.2)]">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <h2 className="text-[22px] sm:text-[28px] font-bold text-slate-700 tracking-tight leading-tight">
                    {title}
                </h2>
            </div>
            {subtitle && (
                <p className="text-[15px] sm:text-[16px] text-slate-500 font-medium leading-relaxed pl-[3.375rem] sm:pl-[4rem] max-w-2xl mt-1">
                    {subtitle}
                </p>
            )}
        </div>
    )
}
