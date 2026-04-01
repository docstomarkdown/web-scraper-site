"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, ShoppingCart, Filter, Component } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface AdBudgetBreakdownProps {
    requiredAdSpend: number;
    estClicks: number;
    cpc: number;
    estOrders: number;
    conversionRate: number;
    currency: string;
    formatCurrency: (val: number) => string;
}

export function AdBudgetBreakdown({
    requiredAdSpend,
    estClicks,
    cpc,
    estOrders,
    conversionRate,
    currency,
    formatCurrency
}: AdBudgetBreakdownProps) {
    const hasData = requiredAdSpend > 0;

    return (
        <Card className="mt-4 bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden flex flex-col relative w-full">
            <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5">
                        <Filter className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-[15px] sm:text-[16px] font-bold text-slate-800 leading-none">
                        Campaign Funnel Breakdown
                    </span>
                </div>
            </div>

            <div className="relative p-6 flex flex-col justify-center min-h-[220px]">
                <AnimatePresence mode="wait">
                    {!hasData ? (
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50"
                        >
                            <div className="relative flex items-center justify-center mb-3">
                                <span className="absolute w-12 h-12 rounded-xl bg-slate-200/50 animate-ping" style={{ animationDuration: "3s" }} />
                                <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                                    <Component className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-[14px] font-bold text-slate-600 mb-1">Awaiting Data...</p>
                            <p className="text-[12px] text-slate-500 max-w-[220px] leading-relaxed">
                                Enter your revenue goals and metrics to visualize your campaign funnel.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full flex flex-col"
                        >
                            <div className="divide-y divide-slate-100/80">
                                <div className="flex justify-between items-center py-4 group">
                                    <span className="text-[14px] font-bold text-slate-600">Total Ad Spend</span>
                                    <span className="text-[16px] font-black text-slate-800 transition-colors">{formatCurrency(requiredAdSpend)}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 group">
                                    <span className="text-[14px] text-slate-500 flex items-center gap-2 font-bold">
                                        <MousePointer2 className="w-4 h-4 text-slate-400" />
                                        Est. Clicks
                                    </span>
                                    <div className="text-right">
                                        <div className="text-[16px] font-black text-slate-800">{Math.round(estClicks).toLocaleString()}</div>
                                        <div className="text-[11px] text-slate-400 uppercase font-extrabold tracking-wider mt-0.5" style={{ opacity: estClicks > 0 ? 1 : 0}}>@ {formatCurrency(cpc)} CPC</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-5 px-5 bg-blue-50/60 rounded-xl mt-3 border border-blue-100/50">
                                <span className="text-[14px] font-black text-blue-700 flex items-center gap-2">
                                    <ShoppingCart className="w-4.5 h-4.5" />
                                    Est. Orders
                                </span>
                                <div className="text-right">
                                    <div className="text-[18px] font-black text-blue-700">{Math.round(estOrders).toLocaleString()}</div>
                                    <div className="text-[11px] text-blue-500/80 uppercase font-extrabold tracking-wider mt-0.5" style={{ opacity: estOrders > 0 ? 1 : 0}}>@ {conversionRate}% CR</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Card>
    );
}
