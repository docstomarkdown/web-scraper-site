import { FadeIn } from "./FadeIn"

interface ToolPageTitleProps {
    title: string
    direction?: "up" | "down" | "left" | "right"
    duration?: number
}

export function ToolPageTitle({ title, direction, duration }: ToolPageTitleProps) {
    return (
        <div className="text-center mb-12">
            <FadeIn direction={direction} duration={duration}>
                <h1 className="text-4xl md:text-[42px] font-semibold text-slate-600 mb-4 tracking-tight">
                    {title}
                </h1>
            </FadeIn>
        </div>
    )
}
