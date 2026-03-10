import React from "react";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import FAQ from "@/components/landing/FAQ";
import { CTA } from "@/components/sections/CTA";

export const metadata = {
    title: "Landing (v1) — Web Scraper.do",
};

export default function LandingV1() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <Features />
            <HowItWorks />
            <UseCases />
            <FAQ />
            <CTA />
        </main>
    );
}
