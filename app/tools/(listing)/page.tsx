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
    // 1. Dropshipping Profit Calculator
    "Dropshipping Profit Calculator": "Calculate your net profit margins with precision, accounting for ads, purchase costs, and shipping fees.",

    // 2. Amazon FBA Fee Calculator
    "Amazon FBA Fee Calculator": "Estimate Amazon FBA fees, referral fees, and net profit based on product size and weight.",

    // 3. Profit Margin Calculator
    "Profit Margin Calculator": "Instantly determine your gross margin, markup percentage, and profit per unit for any product.",

    // 4. Discount Percentage Calculator
    "Discount Percentage Calculator": "Quickly calculate the original price, discount percentage, or final sale price with ease.",

    // 5. ROI Calculator
    "Return on Investment (ROI) Calculator": "Measure the profitability of your investments and make smarter sourcing decisions.",

    // 6. ROAS Calculator
    "Return on Ad Spend (ROAS) Calculator": "Evaluate the effectiveness of your digital advertising campaigns by calculating Return on Ad Spend.",

    // 7. CPA Calculator
    "Cost Per Acquisition (CPA) Calculator": "Determine the true cost to acquire a customer and optimize your marketing budget.",

    // 8. Dimensional Weight Calculator
    "Dimensional Weight Calculator": "Calculate the dimensional weight of your packages to accurately estimate shipping costs.",

    // 9. Free Shipping Calculator
    "Free Shipping Calculator": "Determine the minimum order value required to offer free shipping without hurting your profits.",

    // 10. Inventory Reorder Calculator
    "Inventory Reorder Calculator": "Calculate the optimal reorder point and quantity to prevent stockouts while minimizing holding costs.",

    // 11. Safety Stock Calculator
    "Safety Stock Calculator": "Determine the right amount of buffer stock to hold to protect against demand spikes and supply delays.",

    // 12. Sales Velocity Calculator
    "Sales Velocity Calculator": "Track how fast your products are selling to optimize inventory levels and forecast future demand.",

    // 13. Promo Code Generator
    "Promo Code Generator": "Generate unique, random promo codes for your marketing campaigns, sales, and special offers.",

    // 14. Price Elasticity Calculator
    "Price Elasticity Calculator": "Analyze how changes in price affect customer demand to find the optimal price point for revenue.",

    // 15. Bundle Profit Calculator
    "Bundle Profit Calculator": "Calculate the profitability of product bundles to increase average order value and clear inventory.",

    // 16. MOQ Cost Calculator
    "Minimum Order Quantity (MOQ) Cost Calculator": "Calculate total investment and per-unit costs when purchasing Minimum Order Quantities.",

    // 17. Landed Cost Calculator
    "Landed Cost Calculator": "Determine the true cost of a product including manufacturing, shipping, customs, insurance, and other fees.",

    // 18. Break-Even Calculator
    "Break-Even Calculator": "Determine the exact sales volume needed to cover all fixed and variable costs and start generating profit.",

    // 19. Wholesale Price Calculator
    "Wholesale Price Calculator": "Calculate the optimal wholesale price to offer retailers while maintaining your target profit margin.",

    // 20. SKU Generator
    "SKU Generator": "Generate consistent, meaningful, and organized Stock Keeping Units (SKUs) for your entire inventory.",

    // 21. PPC Bid Calculator
    "Pay-Per-Click (PPC) Bid Calculator": "Calculate the maximum PPC bid you can afford to pay to achieve your target Advertising Cost of Sales.",

    // 22. ACoS Calculator
    "Advertising Cost of Sales (ACoS) Calculator": "Measure the efficiency and profitability of your Amazon PPC campaigns with ACoS calculations.",

    // 23. TACoS Calculator
    "Total Advertising Cost of Sales (TACoS) Calculator": "Understand the holistic impact of advertising spend on your total revenue with TACoS.",

    // 24. Ad Spend Budget Planner
    "Ad Spend Budget Planner": "Plan your advertising budget effectively based on your revenue goals and target ROAS.",

    // 25. Return Rate Calculator
    "Return Rate Calculator": "Calculate your product return rate to identify quality issues and improve customer satisfaction.",

    // 26. CLV Calculator
    "Customer Lifetime Value (CLV) Calculator": "Calculate the total worth of a customer to your business over the entirety of their relationship.",

    // 27. Time Zone Meeting Planner
    "Time Zone Meeting Planner": "Plan international meetings effortlessly by finding the best overlapping times across time zones.",

    // 28. Mercari Fee Calculator
    "Mercari Fee Calculator": "Calculate selling fees and estimated profit for items sold on the Mercari marketplace.",

    // 29. Packaging Cost Calculator
    "Packaging Cost Calculator": "Estimate the cost of packaging materials per unit to accurately price your products.",

    // 30. PayPal Fee Calculator
    "PayPal Fee Calculator": "Calculate PayPal transaction fees and the net amount you will receive for domestic and international payments.",

    // 31. FBA Removal Order Cost Calculator
    "FBA Removal Order Cost Calculator": "Estimate the fees associated with removing or disposing of inventory from Amazon FBA centers.",

    // 32. Coupon ROI Calculator
    "Coupon ROI Calculator": "Measure the Return on Investment of your coupon campaigns to ensure they are driving profitable sales.",

    // 33. POD Profit Calculator
    "Print on Demand Profit Calculator": "Calculate profits for print-on-demand products by accounting for base costs, platform fees, and shipping.",

    // 34. Etsy Fee Calculator
    "Etsy Fee Calculator": "Estimate Etsy listing fees, transaction fees, and payment processing fees to determine your net profit.",

    // 35. eBay Fee Calculator
    "eBay Fee Calculator": "Calculate eBay final value fees, insertion fees, and estimated profit for your listings.",

    // 36. Poshmark Fee Calculator
    "Poshmark Fee Calculator": "Calculate Poshmark selling fees and your net earnings to price your fashion items correctly.",

    // 37. CAC Calculator
    "Customer Acquisition Cost (CAC) Calculator": "Calculate the average cost to acquire a new customer to ensure your marketing is sustainable.",

    // 38. Conversion Rate Calculator
    "Conversion Rate Calculator": "Measure the percentage of visitors who complete a desired action to gauge website performance.",

    // 39. AOV Calculator
    "Average Order Value (AOV) Calculator": "Calculate the average amount spent each time a customer places an order.",

    // 40. Cart Abandonment Rate Calculator
    "Cart Abandonment Rate Calculator": "Identify the percentage of users who add items to their cart but leave without purchasing.",

    // 41. A/B Test Duration Calculator
    "A/B Test Duration Calculator": "Estimate how long to run an A/B test to achieve statistically significant results.",

    // 42. Amazon Storage Fee Calculator
    "Amazon Storage Fee Calculator": "Estimate monthly inventory storage fees for Amazon FBA based on product size and seasonality.",

    "Pallet Configuration Calculator": "Optimize pallet packing by calculating the best way to stack boxes on a pallet.",
    "Lead Time Calculator": "Calculate total supply chain lead time from order to delivery, including production, shipping, and customs.",
    "Reorder Point Calculator": "Calculate when to reorder your products based on lead time, daily sales velocity, and safety stock levels.",
    "Economic Order Quantity (EOQ) Calculator": "Identify the optimal order size that minimizes the total annual cost of ordering and holding inventory.",
    "Days of Inventory Calculator": "Forecast how many days your current stock will last based on your sales velocity to prevent stockouts and optimize turnover.",
    "Inventory Turnover Calculator": "Calculate your inventory turnover ratio to assess operational efficiency, identify slow-moving stock, and optimize your supply chain.",
    "Cost of Goods Sold (COGS) Calculator": "Calculate your true product cost including manufacturing, shipping, customs, packaging, and fulfillment costs.",
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
