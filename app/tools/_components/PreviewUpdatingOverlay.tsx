"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

interface PreviewUpdatingOverlayProps {
    isUpdating: boolean;
}

export function PreviewUpdatingOverlay({ isUpdating }: PreviewUpdatingOverlayProps) {
    return (
        <AnimatePresence>
            {isUpdating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 z-[60] bg-white/60 backdrop-blur-[2px] flex items-center justify-center p-4 border border-white/20"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 10, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 10, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="flex items-center gap-3 bg-white/90 shadow-xl rounded-full px-5 py-3 border border-slate-200/50 backdrop-blur-md"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-4 h-4 text-blue-600" />
                        </motion.div>
                        <span className="text-sm font-medium text-slate-700">Updating Preview...</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
