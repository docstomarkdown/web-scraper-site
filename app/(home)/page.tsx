import React from "react";
import HeroV2 from "@/components/landing-v2/HeroV2";
import FeaturesV2 from "@/components/landing-v2/FeaturesV2";
import UseCasesV2 from "@/components/landing-v2/UseCasesV2";
import HowItWorksV2 from "@/components/landing-v2/HowItWorksV2";
import FAQV2 from "@/components/landing-v2/FAQV2";
import CTAV2 from "@/components/landing-v2/CTAV2";
import FooterV2 from "@/components/landing-v2/FooterV2";

export const metadata = {
    title: "Web Scraper.do — Extract Data from Any Website",
    description:
        "Extract data from any website without code. Point, click, and export to CSV, JSON, or Google Sheets using the Web Scraper Chrome extension.",
};

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-1">
                <HeroV2 />
                <FeaturesV2 />
                <UseCasesV2 />
                <HowItWorksV2 />
                <FAQV2 />
                <CTAV2 />
            </main>
            <FooterV2 />
        </div>
    );
}
