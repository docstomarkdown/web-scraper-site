"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Shield, FileText, Mail, ArrowLeft, ChevronUp } from "lucide-react";

interface Section {
    id: string;
    title: string;
}

interface LegalPageProps {
    type: "privacy" | "terms";
    content: string;
    sections: Section[];
}

const icons = {
    privacy: Shield,
    terms: FileText,
};

const headings = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
};

const subheadings = {
    privacy: "Your privacy matters. Here's how we handle your data with care and transparency.",
    terms: "Clear and fair terms that govern how you use Web Scraper Pro.",
};

const badges = {
    privacy: { label: "Data Protection", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    terms: { label: "Legal Agreement", color: "bg-blue-50 text-blue-600 border-blue-200" },
};

export default function LegalPage({ type, content, sections }: LegalPageProps) {
    const Icon = icons[type];
    const badge = badges[type];
    const [activeId, setActiveId] = useState<string>("");
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Track which section is in view
    useEffect(() => {
        const handleScroll = () => {
            const headingElements = sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

            let newActiveId = "";
            for (const el of headingElements) {
                const rect = el.getBoundingClientRect();
                // 150px to account for sticky header and spacing
                if (rect.top <= 160) {
                    newActiveId = el.id;
                }
            }

            // If above the first section, highlight the first one
            if (!newActiveId && headingElements.length > 0) {
                newActiveId = headingElements[0].id;
            }

            setActiveId((prev) => prev !== newActiveId && newActiveId !== "" ? newActiveId : prev);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        setTimeout(handleScroll, 100); // Initialize after render
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    // Show/hide scroll-to-top button
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50">

            {/* ── Hero header ── */}
            <div className="relative bg-white border-b border-slate-200 overflow-hidden">
                {/* Subtle decorative background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-50/60 blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-indigo-50/40 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12 md:pt-[110px] md:pb-14">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to home
                    </Link>

                    <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                            <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <div className="mb-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                                    {badge.label}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-700 tracking-tight">
                                {headings[type]}
                            </h1>
                            <p className="mt-3 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
                                {subheadings[type]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-12">
                <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10 items-start">

                    {/* Sidebar TOC */}
                    {sections.length > 0 && (
                        <aside className="hidden lg:block sticky top-24 self-start">
                            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                        On this page
                                    </p>
                                </div>
                                <nav className="p-3 space-y-0.5 max-h-[calc(100vh-180px)] overflow-y-auto">
                                    {sections.map((s) => (
                                        <a
                                            key={s.id}
                                            href={`#${s.id}`}
                                            className={`block text-[13px] px-3 py-2 rounded-lg transition-all duration-200 ${activeId === s.id
                                                ? "bg-blue-50 text-blue-600 font-semibold"
                                                : "text-slate-500 hover:text-blue-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            {s.title}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>
                    )}

                    {/* Main content */}
                    <main>
                        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                            <div className="px-8 py-10 md:px-12 md:py-12">
                                <ReactMarkdown
                                    rehypePlugins={[rehypeRaw]}
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ ...props }) => (
                                            <h1 className="text-2xl font-bold text-slate-700 mt-2 mb-5 tracking-tight" {...props} />
                                        ),
                                        h2: ({ children, ...props }) => {
                                            const text = Array.isArray(children)
                                                ? children.map((c) => (typeof c === "string" ? c : "")).join("")
                                                : typeof children === "string" ? children : "";
                                            const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                                            return (
                                                <h2
                                                    id={id}
                                                    className="group scroll-mt-28 text-lg font-bold text-slate-700 mt-12 mb-4 pb-3 border-b border-slate-100 tracking-tight flex items-center gap-3"
                                                    {...props}
                                                >
                                                    <span className="w-1 h-5 rounded-full bg-blue-500 shrink-0" />
                                                    {children}
                                                </h2>
                                            );
                                        },
                                        h3: ({ ...props }) => (
                                            <h3 className="text-[15px] font-semibold text-slate-600 mt-7 mb-2" {...props} />
                                        ),
                                        p: ({ ...props }) => (
                                            <p className="text-slate-500 leading-[1.8] mb-4 text-[15px]" {...props} />
                                        ),
                                        ul: ({ ...props }) => (
                                            <ul className="mb-5 space-y-2.5 pl-1" {...props} />
                                        ),
                                        ol: ({ ...props }) => (
                                            <ol className="list-decimal pl-5 mb-5 space-y-2.5 text-slate-500 text-[15px]" {...props} />
                                        ),
                                        li: ({ ...props }) => (
                                            <li className="flex items-start gap-3 text-slate-500 text-[15px] leading-[1.8]">
                                                <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                                <span {...props} />
                                            </li>
                                        ),
                                        strong: ({ ...props }) => (
                                            <strong className="font-semibold text-slate-700" {...props} />
                                        ),
                                        a: ({ href, ...props }) => {
                                            const isInternal = href?.startsWith("/");
                                            if (isInternal) {
                                                return (
                                                    <Link
                                                        href={href || "/"}
                                                        className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-200 hover:decoration-blue-500 transition-colors font-medium"
                                                        {...props}
                                                    />
                                                );
                                            }
                                            return (
                                                <a
                                                    href={href}
                                                    className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-200 hover:decoration-blue-500 transition-colors font-medium"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    {...props}
                                                />
                                            );
                                        },
                                        code: ({ ...props }) => (
                                            <code className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[13px] font-mono" {...props} />
                                        ),
                                        blockquote: ({ ...props }) => (
                                            <blockquote className="my-6 pl-5 border-l-4 border-blue-200 bg-blue-50/30 py-3 pr-4 rounded-r-xl text-slate-500 italic text-[15px]" {...props} />
                                        ),
                                        table: ({ ...props }) => (
                                            <div className="overflow-x-auto mb-6 rounded-xl border border-slate-200">
                                                <table className="min-w-full divide-y divide-slate-200 text-sm" {...props} />
                                            </div>
                                        ),
                                        thead: ({ ...props }) => (
                                            <thead className="bg-slate-50" {...props} />
                                        ),
                                        th: ({ ...props }) => (
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider" {...props} />
                                        ),
                                        tr: ({ ...props }) => (
                                            <tr className="even:bg-slate-50/50" {...props} />
                                        ),
                                        td: ({ ...props }) => (
                                            <td className="px-4 py-3 text-slate-500" {...props} />
                                        ),
                                        hr: () => (
                                            <hr className="my-10 border-slate-100" />
                                        ),
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                        </article>

                        {/* Contact card */}
                        <div className="mt-8 bg-gradient-to-br from-blue-50 via-indigo-50/80 to-blue-50 rounded-2xl border border-blue-100/80 p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-white border border-blue-100 shadow-sm flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-bold text-slate-700 mb-1">
                                    Have questions about this {headings[type]}?
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Our team is here to help. Reach out and we&apos;ll get back to you as soon as possible.
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 shrink-0"
                            >
                                <Mail className="w-4 h-4" />
                                Contact us
                            </Link>
                        </div>
                    </main>
                </div>
            </div>

            {/* Scroll to top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                aria-label="Scroll to top"
            >
                <ChevronUp className="w-5 h-5" />
            </button>
        </div>
    );
}
