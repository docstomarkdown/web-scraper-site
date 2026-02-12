"use client"

import { MousePointerClick, TrendingUp, DollarSign, BarChart3 } from "lucide-react"
import { ToolSectionHeader } from "@/app/tools/_shared/components"

export function HowToUse() {
    return (
        <section id="how-to-use" className="relative">
            <ToolSectionHeader icon={MousePointerClick} title="How to Use This Calculator" />

            <div className="relative max-w-2xl mx-auto pl-4 sm:pl-8">
                {/* Vertical Connector Line */}
                <div className="absolute left-[34px] sm:left-[54px] top-8 bottom-8 w-0.5 bg-blue-100 -z-10" />

                <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 01</span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Enter Ad Spend</h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Input the total amount you spent on your advertising campaigns.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 02</span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Enter Revenue or Target</h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Enter your generated revenue to see ROAS, or your Target ROAS to see the revenue needed.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 03</span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Get Your Results</h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Instantly see your ROAS performance or the revenue target you need to hit to be profitable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
