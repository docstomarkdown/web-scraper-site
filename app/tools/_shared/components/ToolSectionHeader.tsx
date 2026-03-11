import { LucideIcon } from "lucide-react"
interface ToolSectionHeaderProps {
    icon: LucideIcon
    title: string
}
export function ToolSectionHeader({ icon: Icon, title }: ToolSectionHeaderProps) {
    return (
        <div
            className="flex items-center gap-3 mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg group px-6 sm:px-8"
            tabIndex={0}
        >
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600 transition-transform group-focus-visible:scale-110">
                <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-[22px] font-bold text-slate-600 tracking-tight">{title}</h2>
        </div>
    )
}
