import Link from "next/link";
import { navigationConfig, siteConfig } from "@/config/site";
import { Icons } from "@/components/ui/icons";
import { Twitter, Linkedin, ArrowRight } from "lucide-react";

const popularTools = [
    { title: "Dropshipping Profit Calculator", href: "/tools/dropshipping-profit-calculator" },
    { title: "Amazon FBA Fee Calculator", href: "/tools/amazon-fba-fee-calculator" },
    { title: "Profit Margin Calculator", href: "/tools/profit-margin-calculator" },
    { title: "Net Profit Calculator", href: "/tools/net-profit-calculator" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 text-slate-500 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
                    <div className="lg:col-span-4 space-y-5">
                        <Link href="/" className="inline-flex items-center gap-2.5 group">
                            <Icons.logo className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
                            <span className="text-lg font-bold text-slate-800 tracking-tight">
                                Web Scraper Do
                            </span>
                        </Link>

                        <p className="text-base text-slate-500 leading-relaxed max-w-xs">
                            Extract data from any website visually. Point, click, and export — no code required. Works across ecommerce sites and any page you visit.
                        </p>

                        <div className="flex gap-2">
                            {siteConfig.links.twitter && (
                                <Link href={siteConfig.links.twitter} target="_blank" aria-label="Twitter"
                                    className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all">
                                    <Twitter className="w-4 h-4" />
                                </Link>
                            )}
                            {siteConfig.links.linkedin && (
                                <Link href={siteConfig.links.linkedin} target="_blank" aria-label="LinkedIn"
                                    className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </Link>
                            )}
                        </div>

                        <img
                            src="/badge.png"
                            alt="Chrome Web Store badge"
                            className="h-11 w-auto"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-base font-semibold text-slate-800 normal-case tracking-normal mb-5" style={{ textTransform: "none" }}>Product</h3>
                        <ul className="space-y-3">
                            {navigationConfig.footerNav.product.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}
                                        className="text-[15px] text-slate-500 hover:text-blue-600 transition-colors hover:translate-x-0.5 inline-block">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="text-base font-semibold text-slate-800 normal-case tracking-normal mb-5" style={{ textTransform: "none" }}>Free Tools</h3>
                        <ul className="space-y-3">
                            {popularTools.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}
                                        className="text-[15px] text-slate-500 hover:text-blue-600 transition-colors hover:translate-x-0.5 inline-block">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/tools"
                                    className="inline-flex items-center gap-1 text-[15px] text-blue-600 hover:text-blue-700 font-medium transition-colors group">
                                    View all tools
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-base font-semibold text-slate-800 normal-case tracking-normal mb-5" style={{ textTransform: "none" }}>Legal</h3>
                        <ul className="space-y-3">
                            {navigationConfig.footerNav.legal.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}
                                        className="text-[15px] text-slate-500 hover:text-blue-600 transition-colors hover:translate-x-0.5 inline-block">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                    <p>© {year} Web Scraper Do. All rights reserved.</p>
                    <p className="text-slate-400">
                        Built thoughtfully by{" "}
                        <Link
                            href="https://thinksolv.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-[#2772ED] transition-colors"
                        >
                            Thinksolv Technologies
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
