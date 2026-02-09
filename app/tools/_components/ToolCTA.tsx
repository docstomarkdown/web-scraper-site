interface ToolCTAProps {
    tagline?: string
    title: string
    highlightedText?: string
    description: string
    buttonText?: string
    buttonHref?: string
}

export function ToolCTA({
    tagline = "Recommended for Web Scraping & E-commerce Users",
    title = "Ready to find",
    highlightedText = "winning products?",
    description = "Scrape any website in seconds with our powerful Chrome extension.",
    buttonText = "Install Free Extension",
    buttonHref = "#",
}: ToolCTAProps) {
    return (
        <section className="relative">
            <div className="relative bg-white rounded-xl px-8 py-8 md:px-10 md:py-8 border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-600">
                {/* Subtle background accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 rounded-full blur-3xl" />

                {/* Content - Horizontal Layout */}
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Left: Text Content */}
                    <div className="flex-1">
                        <p className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-2">
                            {tagline}
                        </p>
                        <h3 className="text-xl md:text-2xl lg:text-[1.75rem] font-bold text-slate-800 mb-2">
                            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{highlightedText}</span>
                        </h3>
                        <p className="text-base md:text-lg text-slate-500 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Right: CTA Button + Badge */}
                    <div className="flex flex-col items-center gap-2.5">
                        {/* Primary Button */}
                        <a
                            href={buttonHref}
                            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            {buttonText}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>

                        {/* Chrome Badge - Trust Element */}
                        <img
                            src="/Chromeweb store badge.png"
                            alt="Chrome Web Store"
                            className="h-[48px] w-auto contrast-[1.1] saturate-[1.1] drop-shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
