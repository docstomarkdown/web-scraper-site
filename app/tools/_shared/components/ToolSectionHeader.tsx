import { LucideIcon } from "lucide-react"

interface ToolSectionHeaderProps {
    icon: LucideIcon
    title: string
}

export function ToolSectionHeader({ icon: Icon, title }: ToolSectionHeaderProps) {
    return (
        <div
            className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg group"
            tabIndex={0}
        >
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600 transition-transform group-focus-visible:scale-110">
                <Icon className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        </div>
    )
}
