import Link from "next/link";
import { productConfig } from "@/config/product";
import { navigationConfig, siteConfig } from "@/config/site";
import { Icons } from "@/components/ui/icons";
import { Twitter, Youtube, Linkedin } from "lucide-react";

export default function FooterV2() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200 text-slate-500">
            {/* Main footer grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

                    {/* Brand — spans 2 cols on lg */}
                    <div className="lg:col-span-2 space-y-5">
                        <Link href="/" className="flex items-center space-x-2 group w-fit">
                            <Icons.logo className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
                            <span className="text-lg font-bold text-slate-800 tracking-tight">
                                {productConfig.product.logoText}
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                            Extract data from any website visually. Point, click, and export — no code required. Works on Amazon, Flipkart, eBay, and every site you visit.
                        </p>
                        {/* Social links */}
                        <div className="flex gap-2.5">
                            {siteConfig.links.twitter && (
                                <Link href={siteConfig.links.twitter} target="_blank"
                                    className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50 transition-all">
                                    <Twitter className="w-4 h-4" />
                                </Link>
                            )}
                            {siteConfig.links.youtube && (
                                <Link href={siteConfig.links.youtube} target="_blank"
                                    className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all">
                                    <Youtube className="w-4 h-4" />
                                </Link>
                            )}
                            {siteConfig.links.linkedin && (
                                <Link href={siteConfig.links.linkedin} target="_blank"
                                    className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Product links */}
                    <div>
                        <h3 className="text-slate-800 font-semibold text-xs uppercase tracking-widest mb-5">Product</h3>
                        <ul className="space-y-3 text-sm">
                            {navigationConfig.footerNav.product.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}
                                        className="text-slate-500 hover:text-blue-600 transition-colors hover:translate-x-0.5 inline-block">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Free Tools */}
                    <div>
                        <h3 className="text-slate-800 font-semibold text-xs uppercase tracking-widest mb-5">Free Tools</h3>
                        <ul className="space-y-3 text-sm">
                            {navigationConfig.footerNav.freeTools.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}
                                        className="text-slate-500 hover:text-blue-600 transition-colors hover:translate-x-0.5 inline-block">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-slate-800 font-semibold text-xs uppercase tracking-widest mb-5">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            {navigationConfig.footerNav.legal.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}
                                        className="text-slate-500 hover:text-blue-600 transition-colors hover:translate-x-0.5 inline-block">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200" />

                {/* Bottom bar */}
                <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                    <p>© {year} {productConfig.product.logoText}. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy-policy" className="hover:text-blue-500 transition-colors">
                            Privacy Policy
                        </Link>
                        <span className="text-slate-300">|</span>
                        <Link href="/terms-of-service" className="hover:text-blue-500 transition-colors">
                            Terms of Service
                        </Link>
                    </div>

                    <p className="text-slate-400">Made with ♥ for data people</p>
                </div>
            </div>
        </footer>
    );
}
