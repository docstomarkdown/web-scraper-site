"use client"
import { HelpCircle, Wallet, ShoppingCart, Box, LucideIcon } from "lucide-react"
import { motion } from "motion/react"

interface StepItem {
    title: string
    description: string
    icon: string // Changed to string (icon name)
    accent: string
}

// Icon map to resolve icon names to components
const iconMap: Record<string, LucideIcon> = {
    Wallet,
    ShoppingCart,
    Box,
}

interface PremiumToolStepsProps {
    steps: StepItem[]
    title?: string
}

// Single blue color scheme matching other tools
const blueColors = { bg: "bg-blue-50", border: "border-blue-200/60", text: "text-blue-600", glow: "shadow-blue-200/40", badge: "bg-blue-600", line: "from-blue-400 to-blue-200" }

export function PremiumToolSteps({ steps, title = "How to Use This Calculator" }: PremiumToolStepsProps) {
    return (
        <section id="how-to-use">
            <div className="mb-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-md" />
                        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h2 className="text-[24px] sm:text-[28px] font-bold text-slate-800 tracking-tight">{title}</h2>
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
                <div className="relative">
                    {/* Connecting line */}
                    <div className="absolute top-[42px] left-0 right-0 h-[2px] z-0">
                        <div className="w-full h-full bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded-full opacity-60" />
                    </div>

                    <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
                        {steps.map((step, index) => {
                            const Icon = iconMap[step.icon] || Wallet
                            const colors = blueColors
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                                    className="relative group"
                                >
                                    {/* Step number badge */}
                                    <div className="flex justify-center mb-5 relative z-10">
                                        <div className={`w-[52px] h-[52px] rounded-2xl ${colors.badge} shadow-lg ${colors.glow} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 ring-4 ring-white`}>
                                            <span className="text-[18px] font-black text-white">{index + 1}</span>
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <div className={`relative bg-white rounded-2xl border ${colors.border} p-6 pt-5 h-full transition-all duration-300 group-hover:shadow-xl ${colors.glow} group-hover:-translate-y-1 group-hover:border-opacity-100 overflow-hidden`}>
                                        <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]`}>
                                            <Icon className={`w-5 h-5 ${colors.text}`} />
                                        </div>

                                        <h3 className="text-[15px] font-bold text-slate-700 mb-2 leading-snug">
                                            {step.title}
                                        </h3>
                                        <p
                                            className="text-[13.5px] text-slate-500 leading-relaxed font-medium [&_strong]:font-semibold [&_strong]:text-slate-600"
                                            dangerouslySetInnerHTML={{ __html: step.description }}
                                        />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-4">
                {steps.map((step, index) => {
                    const Icon = iconMap[step.icon] || Wallet
                    const colors = blueColors
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex gap-4 group"
                        >
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-xl ${colors.badge} shadow-md ${colors.glow} flex items-center justify-center shrink-0 ring-2 ring-white`}>
                                    <span className="text-sm font-black text-white">{index + 1}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="w-[2px] flex-1 mt-2 bg-gradient-to-b from-slate-200 to-transparent rounded-full" />
                                )}
                            </div>
                            <div className={`flex-1 bg-white rounded-2xl border ${colors.border} p-5 shadow-sm group-hover:shadow-md transition-all duration-300 overflow-hidden relative`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                                        <Icon className={`w-4 h-4 ${colors.text}`} />
                                    </div>
                                    <h3 className="text-[15px] font-bold text-slate-700">{step.title}</h3>
                                </div>
                                <p
                                    className="text-[13.5px] text-slate-500 leading-relaxed font-medium pl-11 [&_strong]:font-semibold [&_strong]:text-slate-600"
                                    dangerouslySetInnerHTML={{ __html: step.description }}
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
