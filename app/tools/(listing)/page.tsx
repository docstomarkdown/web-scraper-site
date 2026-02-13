"use client";

import Link from "next/link";
import { toolsGroups } from "@/config/site";
import {
    Receipt, ShoppingCart, Package, Calculator,
    Banknote, Users, CheckSquare, ArrowRight, Sparkles
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    "receipt": Receipt,
    "shopping-cart": ShoppingCart,
    "box": Package,
    "calculator": Calculator,
    "banknote": Banknote,
    "users": Users,
    "check-square": CheckSquare,
};

// Full descriptions for tools
const toolDescriptions: Record<string, string> = {

    "Dimension Converter": "Convert product dimensions between inches, cm, and mm with volume and dimensional weight calculations.",
    "Amazon FBA Fee Calculator": "Estimate Amazon FBA fees, referral fees, and net profit based on product size and weight.",
    "Dropshipping Profit Calculator": "Calculate your net profit margins with precision, accounting for ads, RTO, and shipping costs.",
    "Profit Margin Calculator": "Instantly calculate gross margin, markup percentage, and profit per unit for any product.",
    "ROI Calculator": "Calculate return on investment for any product to measure profitability and make smarter sourcing decisions.",
    "Discount Percentage Calculator": "Quickly calculate original price, discount percentage, or final price with this easy-to-use tool.",
    "CPA Calculator": "Determine your cost to acquire a customer. Calculate from campaign data or estimate based on CPC and conversion rate.",
    "Product Weight Converter": "Convert weights between oz, lbs, g, and kg with real-time shipping cost impact analysis for e-commerce.",
    "Cubic Feet Calculator": "Calculate cubic feet (CFT) and cubic meters (CBM) from dimensions for freight and storage cost estimation.",
};

export default function ToolsPage() {
    const groups = toolsGroups || [];



    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2772ed]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#2772ed]/5 rounded-full blur-3xl" />
            </div>

            {/* Hero Section */}
            <div className="relative w-full max-w-[1180px] mx-auto pt-20 pb-16 px-4 md:px-0 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm mb-6">
                    <Sparkles className="w-4 h-4 text-[#2772ed]" />
                    <span className="text-sm font-medium text-slate-600">Free E-commerce Tools</span>
                </div>

                <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                    <span className="text-slate-900">Essential Tools for </span>
                    <span className="text-[#2772ed]">Online Sellers</span>
                </h1>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    From FBA fee estimation to dropshipping profitability — streamline your e-commerce workflow with our suite of premium, completely free tools.
                </p>

                {/* Quick Stats */}
                <div className="flex items-center justify-center gap-8 md:gap-16">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#2772ed]">3+</div>
                        <div className="text-sm text-slate-500 mt-1">Free Tools</div>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#2772ed]">24/7</div>
                        <div className="text-sm text-slate-500 mt-1">Available</div>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#2772ed]">100%</div>
                        <div className="text-sm text-slate-500 mt-1">Free Forever</div>
                    </div>
                </div>
            </div>



            {/* All Tools Grid */}
            <div className="relative w-full max-w-[1180px] mx-auto px-4 md:px-0 pb-24">
                {groups.map((group, groupIndex) => {
                    const IconComponent = iconMap[group.icon] || Receipt;
                    return (
                        <div key={groupIndex} className="mb-12">
                            {/* Group Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-slate-200 flex items-center justify-center text-[#2772ed] shadow-sm">
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {group.title.replace(/^[A-Z]\.\s*/, "")}
                                    </h2>
                                    <p className="text-sm text-slate-500">{group.items.length} tools</p>
                                </div>
                            </div>

                            {/* Tools Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {group.items.map((tool, toolIndex) => (
                                    <Link
                                        key={toolIndex}
                                        href={tool.href}
                                        className="group relative p-5 bg-white rounded-xl border border-slate-200 hover:border-[#2772ed]/40 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-800 group-hover:text-[#2772ed] transition-colors mb-1">
                                                    {tool.title}
                                                </h3>
                                                <p className="text-xs text-slate-500">
                                                    {toolDescriptions[tool.title] || "Powerful tool for your workflow"}
                                                </p>
                                            </div>
                                            <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-[#2772ed] flex items-center justify-center transition-all duration-300">
                                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
