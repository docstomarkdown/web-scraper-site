import React from "react";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import UseCases from "@/components/landing/UseCases";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export const metadata = {
    title: "Web Scraper.do — Extract Data from Any Website",
    description:
        "Extract data from any website without code. Point, click, and export to CSV, JSON, or Google Sheets using the Web Scraper Chrome extension.",
};

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-1">
                <Hero />
                <Features />
                <UseCases />
                <HowItWorks />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
