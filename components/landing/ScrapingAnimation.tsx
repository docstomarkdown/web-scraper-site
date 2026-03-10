"use client";

import React from "react";
import { motion } from "framer-motion";

// Data rows that will be "scraped" and animated
const dataRows = [
  { id: 1, fields: ["Name", "Email", "Company"] },
  { id: 2, fields: ["John Doe", "john@acme.com", "Acme Inc"] },
  { id: 3, fields: ["Jane Smith", "jane@corp.io", "Corp.io"] },
  { id: 4, fields: ["Mike Chen", "mike@startup.co", "Startup"] },
];

export function ScrapingAnimation() {
  // Animation duration for one complete cycle
  const cycleDuration = 6;

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main Container - Light theme */}
      <div className="relative bg-slate-50 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200">

        {/* Terminal Header - Light */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-slate-100">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-slate-500 font-mono">Web Scraper.do</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm bg-white">
          {/* Command Line */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-green-600">$</span>
            <motion.span
              className="text-slate-700"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: cycleDuration, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
            >
              webscraper extract --url &quot;https://example.com/users&quot;
            </motion.span>
            <motion.span
              className="w-2 h-4 bg-blue-500"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>

          {/* Status Messages */}
          <motion.div
            className="space-y-2 mb-6"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: cycleDuration, repeat: Infinity, times: [0.1, 0.2, 0.9, 1] }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              <span className="text-slate-500">Connecting to target...</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-blue-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
              <span className="text-slate-500">Extracting data...</span>
            </div>
          </motion.div>

          {/* Data Table - The main visual */}
          <motion.div
            className="rounded-lg border border-slate-200 overflow-hidden bg-slate-50"
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
            transition={{ duration: cycleDuration, repeat: Infinity, times: [0.15, 0.25, 0.85, 1] }}
          >
            {dataRows.map((row, rowIndex) => (
              <motion.div
                key={row.id}
                className={`grid grid-cols-3 gap-4 px-4 py-2.5 ${rowIndex === 0
                  ? "bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200 font-semibold"
                  : "text-slate-700 border-b border-slate-100 last:border-0 bg-white"
                  }`}
                animate={{ opacity: [0, 1, 1, 0], x: [-20, 0, 0, 0] }}
                transition={{
                  duration: cycleDuration,
                  repeat: Infinity,
                  times: [0.2 + rowIndex * 0.05, 0.3 + rowIndex * 0.05, 0.85, 1],
                  delay: rowIndex * 0.1
                }}
              >
                {row.fields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className="truncate"
                  >
                    {rowIndex === 0 ? (
                      field
                    ) : (
                      <span className={fieldIndex === 1 ? "text-blue-600" : ""}>
                        {field}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="mt-6 space-y-2"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: cycleDuration, repeat: Infinity, times: [0.35, 0.4, 0.9, 1] }}
          >
            <div className="flex justify-between text-xs text-slate-500">
              <span>Extracting records...</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                4 rows found
              </motion.span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                animate={{ width: ["0%", "100%", "100%", "0%"] }}
                transition={{ duration: cycleDuration, repeat: Infinity, times: [0.4, 0.8, 0.9, 1], ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements for visual flair - Light theme */}
      <motion.div
        className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/40 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-200/40 rounded-full blur-2xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.4, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}