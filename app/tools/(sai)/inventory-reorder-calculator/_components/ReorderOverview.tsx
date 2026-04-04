import React from "react"
import { Box, Timer, ShieldAlert, BarChart3 } from "lucide-react"

export function ReorderOverview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Timer className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Lead Time Demand</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                    Units sold while waiting for your new inventory shipment.
                </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Safety Buffer</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                    Extra units to protect against supply delays or sales spikes.
                </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Box className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Stock Health</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                    Real-time analysis of your current inventory runway.
                </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">ROP Analysis</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                    Calculates the exact unit count to trigger a reorder.
                </p>
            </div>
        </div>
    )
}
