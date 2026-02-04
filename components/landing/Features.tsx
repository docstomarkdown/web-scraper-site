import React from "react";
import { MousePointer2, Layers, Cloud, Clock } from "lucide-react";

const features = [
    {
        icon: <MousePointer2 className="w-6 h-6 text-blue-600" />,
        title: "Visual Point & Click",
        description: "No coding needed. Just click on the data elements you want to extract, and our AI handles the selectors."
    },
    {
        icon: <Layers className="w-6 h-6 text-purple-600" />,
        title: "Smart Pagination",
        description: "Automatically detects 'Next' buttons and infinite scrolling to scrape thousands of pages in one run."
    },
    {
        icon: <Cloud className="w-6 h-6 text-sky-600" />,
        title: "Cloud Export",
        description: "Send data directly to Google Sheets, Airtable, or your API via webhooks. No manual file uploads."
    },
    {
        icon: <Clock className="w-6 h-6 text-amber-600" />,
        title: "Scheduled Jobs",
        description: "Set it and forget it. Schedule scrapers to run hourly, daily, or weekly to keep your data fresh."
    }
];

export default function Features() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to scrape at scale</h2>
                    <p className="text-slate-600">Built for developers and non-coders alike. Powerful enough for enterprise, simple enough for everyone.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
