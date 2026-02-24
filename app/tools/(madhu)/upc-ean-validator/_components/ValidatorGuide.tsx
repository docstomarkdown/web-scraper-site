"use client"

import { BookOpen, Calculator, Globe2, AlertTriangle, ShieldCheck } from "lucide-react"

const insights = [
    {
        icon: Calculator,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "The Check Digit Logic",
        stat: "Mod 10",
        statLabel: "Mathematical Assurance",
        description: "The last digit isn't random. It's calculated using a precise Modulo 10 algorithm. If this digit is wrong, the barcode essentially 'breaks' and won't scan at any POS terminal."
    },
    {
        icon: Globe2,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "UPC & EAN Compatibility",
        stat: "0",
        statLabel: "The Invisible Prefix",
        description: "A 12-digit UPC-A is mathematically identical to a 13-digit EAN-13 with a leading zero. Most modern scanners and systems treat them as the same GTIN structure."
    },
    {
        icon: AlertTriangle,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        statColor: "text-amber-600",
        title: "Prefixes Aren't Origins",
        stat: "GS1",
        statLabel: "Brand ≠ Factory",
        description: "A barcode prefix (e.g., 690 for China) indicates where the company is registered, not necessarily where the product was manufactured. It tracks brand ownership, not factory location."
    },
    {
        icon: ShieldCheck,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        statColor: "text-rose-600",
        title: "The Cost of Bad Data",
        stat: "$$$",
        statLabel: "Retailer Penalties",
        description: "Using an invalid, unverified, or duplicate barcode on platforms like Amazon can lead to immediate listing suspension or costly inventory relabeling fees. Always validate before printing."
    }
]

export function ValidatorGuide() {
    return (
        <section id="validator-guide" className="relative">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-200">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">The Hidden Truth About Barcode Validation</h2>
            </div>

            <div className="relative">
                {/* Connector Line (optional visual flair for lists) */}
                <div className="space-y-6">
                    {insights.map((insight, index) => {
                        const Icon = insight.icon
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Left: Content */}
                                    <div className="flex-1 p-6 order-2 md:order-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-9 h-9 rounded-xl ${insight.iconBg} ${insight.iconColor} flex items-center justify-center border border-slate-100/50`}>
                                                <Icon className="w-4.5 h-4.5" />
                                            </div>
                                            <h3 className="text-base font-bold text-slate-900">{insight.title}</h3>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {insight.description}
                                        </p>
                                    </div>

                                    {/* Right: Takeaway Stat Panel */}
                                    <div className="flex md:flex-col items-center justify-center gap-1.5 p-6 md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2">
                                        <div className={`text-3xl font-bold ${insight.statColor} tracking-tight`}>{insight.stat}</div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300 bg-slate-100/50 px-2 py-0.5 rounded-full">
                                            Takeaway
                                        </div>
                                        <div className="text-[11px] font-medium text-slate-500 text-center leading-tight mt-1 max-w-[120px]">
                                            {insight.statLabel}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
