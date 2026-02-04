import React from "react";
import { Download, MousePointer, FileJson } from "lucide-react";

const steps = [
    {
        id: 1,
        icon: <Download className="w-5 h-5" />,
        title: "Install Extension",
        desc: "Add to Chrome in seconds."
    },
    {
        id: 2,
        icon: <MousePointer className="w-5 h-5" />,
        title: "Select Data",
        desc: "Point and click to train."
    },
    {
        id: 3,
        icon: <FileJson className="w-5 h-5" />,
        title: "Export Data",
        desc: "Download JSON/CSV instantly."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    <div className="max-w-md text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">How it works</h2>
                        <p className="text-slate-600 mb-8">
                            Three simple steps to turn any website into a spreadsheet. No complex setup required.
                        </p>
                        <button className="hidden lg:inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                            Read the full documentation →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full lg:max-w-3xl">
                        {steps.map((step, i) => (
                            <div key={i} className="relative flex flex-col items-center p-6 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-blue-500/20">
                                    {step.id}
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                                <p className="text-sm text-slate-500">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
