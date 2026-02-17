"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { toolsGroups } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Sparkles,
    ArrowRight,
    Calculator,
    ArrowLeftRight,
    Box,
    Tag,
    BarChart3,
    Clock,
    Truck,
    CreditCard,
    Globe,
    Zap
} from "lucide-react";

// Full descriptions for tools
const toolDescriptions: Record<string, string> = {
    "Dimension Converter": "Convert product dimensions between inches, cm, and mm with volume and dimensional weight calculations.",
    "Amazon Fulfillment by Amazon (FBA) Fee Calculator": "Estimate Amazon Fulfillment by Amazon (FBA) fees, referral fees, and net profit based on product size and weight.",
    "Dropshipping Profit Calculator": "Calculate your net profit margins with precision, accounting for ads, RTO, and shipping costs.",
    "Profit Margin Calculator": "Instantly calculate gross margin, markup percentage, and profit per unit for any product.",
    "Return on Investment (ROI) Calculator": "Calculate Return on Investment (ROI) for any product to measure profitability and make smarter sourcing decisions.",
    "Discount Percentage Calculator": "Quickly calculate original price, discount percentage, or final price with this easy-to-use tool.",
    "Cost Per Acquisition (CPA) Calculator": "Determine your Cost Per Acquisition (CPA). Calculate from campaign data or estimate based on Cost Per Click (CPC) and conversion rate.",
    "Product Weight Converter": "Convert weights between oz, lbs, g, and kg with real-time shipping cost impact analysis for e-commerce.",
    "Cubic Feet Calculator": "Calculate cubic feet (CFT) and cubic meters (CBM) from dimensions for freight and storage cost estimation.",
    "Universal Product Code (UPC) / European Article Number (EAN) Validator": "Validate Universal Product Code (UPC), European Article Number (EAN), and ISBN barcodes to ensure product compliance and data accuracy.",
    "Global Trade Item Number (GTIN) Converter": "Convert between Global Trade Item Number (GTIN-8, GTIN-12, GTIN-13, and GTIN-14) formats for global compatibility.",
    "Break-Even Calculator": "Determine the sales volume needed to cover costs and start generating profit.",
    "Return on Ad Spend (ROAS) Calculator": "Calculate Return on Ad Spend (ROAS) to measure the effectiveness of your digital advertising campaigns.",
    "Dimensional Weight Calculator": "Calculate the dimensional weight of your packages for accurately checking shipping costs.",
    "Free Shipping Calculator": "Determine the minimum order value required to offer free shipping without losing profit.",
    "Inventory Reorder Calculator": "Calculate the optimal reorder point and quantity to prevent stockouts and overstocking.",
    "Safety Stock Calculator": "Determine the right amount of buffer stock to hold to protect against supply chain fluctuations.",
    "Sales Velocity Calculator": "Track how fast your products are selling to optimize inventory and marketing strategies.",
    "Promo Code Generator": "Generate unique, random promo codes for your marketing campaigns and sales.",
    "Price Elasticity Calculator": "Analyze how changes in price affect the demand for your products to find the sweet spot.",
    "Bundle Profit Calculator": "Calculate the profitability of product bundles to increase average order value.",
    "Minimum Order Quantity (MOQ) Cost Calculator": "Calculate the total cost and per-unit cost when purchasing Minimum Order Quantities (MOQ).",
    "Landed Cost Calculator": "Determine the true cost of a product including shipping, customs, and other fees.",
    "Wholesale Price Calculator": "Calculate the optimal wholesale price to offer retailers while maintaining your target margin.",
    "SKU Generator": "Generate consistent and meaningful Stock Keeping Units (SKUs) for your inventory.",
    "Pay-Per-Click (PPC) Bid Calculator": "Calculate the maximum Pay-Per-Click (PPC) bid you should pay to achieve your target Advertising Cost of Sales (ACoS).",
    "Advertising Cost of Sales (ACoS) Calculator": "Calculate Advertising Cost of Sales (ACoS) to measure the efficiency of your Amazon Pay-Per-Click (PPC) campaigns.",
    "Total Advertising Cost of Sales (TACoS) Calculator": "Calculate Total Advertising Cost of Sales (TACoS) to see the holistic impact of ads on your business.",
    "Ad Spend Budget Planner": "Plan your advertising budget based on your revenue goals and target Return on Ad Spend (ROAS).",
    "Return Rate Calculator": "Calculate your product return rate to identify quality issues and improve customer satisfaction.",
    "Customer Lifetime Value (CLV) Calculator": "Calculate Customer Lifetime Value (CLV) to understand how much a customer is worth to your business over time.",
    "PayPal Fee Calculator": "Calculate PayPal transaction fees and the net amount you will receive.",
    "Time Zone Meeting Planner": "Plan meetings across multiple time zones without the confusion.",
    "Mercari Fee Calculator": "Calculate fees and profits for selling items on Mercari.",
    "Pallet Configuration Calculator": "Optimize pallet packing by calculating the best way to stack boxes on a pallet.",
    "Lead Time Calculator": "Calculate total supply chain lead time from order to delivery, including production, shipping, and customs.",
    "Reorder Point Calculator": "Calculate when to reorder your products based on lead time, daily sales velocity, and safety stock levels.",
    "Economic Order Quantity (EOQ) Calculator": "Identify the optimal order size that minimizes the total annual cost of ordering and holding inventory.",
    "Days of Inventory Calculator": "Forecast how many days your current stock will last based on your sales velocity to prevent stockouts and optimize turnover.",
};

// Helper to determine category and icon
const getToolCategoryAndIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("calculator")) return { category: "Calculators", icon: Calculator };
    if (lowerTitle.includes("converter")) return { category: "Converters", icon: ArrowLeftRight };
    if (lowerTitle.includes("generator")) return { category: "Generators", icon: Zap };
    if (lowerTitle.includes("planner")) return { category: "Planning", icon: Clock };
    if (lowerTitle.includes("fee")) return { category: "Fees", icon: CreditCard };
    if (lowerTitle.includes("weight") || lowerTitle.includes("dimension") || lowerTitle.includes("cubic")) return { category: "Logistics", icon: Box };
    return { category: "Other", icon: Sparkles };
};

export default function ToolsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    // Flatten and enrich tools data
    const allTools = useMemo(() => {
        const tools = toolsGroups.flatMap(group => group.items.map(item => {
            const { category, icon } = getToolCategoryAndIcon(item.title);
            return {
                ...item,
                description: toolDescriptions[item.title] || "Powerful tool to streamline your workflow.",
                category,
                icon
            };
        }));
        return tools;
    }, []);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(allTools.map(t => t.category))).sort();
        return ["All", ...cats];
    }, [allTools]);

    // Filter tools
    const filteredTools = useMemo(() => {
        return allTools.filter(tool => {
            const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [allTools, searchQuery, activeCategory]);

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob" />
                <div className="absolute top-0 right-1/4 w-[1000px] h-[600px] bg-purple-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-1/3 w-[1000px] h-[600px] bg-pink-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">Premium E-commerce Tools</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
                    >
                        Everything you need to <span className="text-blue-600">grow faster</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-slate-600 leading-relaxed"
                    >
                        A complete suite of 30+ powerful calculators, converters, and generators designed for modern e-commerce sellers.
                    </motion.p>
                </div>

                {/* Search and Filter Section */}
                <div className="sticky top-20 z-30 bg-slate-50/90 backdrop-blur-md py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 rounded-2xl">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-5xl mx-auto">

                        {/* Search Bar */}
                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 shadow-sm"
                                placeholder="Search tools (e.g. 'profit', 'weight')..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar mask-gradient">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`
                                        whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                                        ${activeCategory === category
                                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"}
                                    `}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tools Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredTools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={tool.title}
                                >
                                    <Link href={tool.href} className="block h-full">
                                        <div className="group h-full bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">

                                            {/* Hover Gradient Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            <div className="relative flex flex-col h-full">
                                                {/* Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                                        {tool.category}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                                                        {tool.title}
                                                    </h3>
                                                    <p className="text-slate-500 text-sm leading-relaxed">
                                                        {tool.description}
                                                    </p>
                                                </div>

                                                {/* Footer / Action */}
                                                <div className="mt-6 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                                                    Try Tool <ArrowRight className="w-4 h-4 ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredTools.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24"
                    >
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No tools found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters.</p>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
