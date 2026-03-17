import { Metadata } from "next";
export const metadata: Metadata = {
    title: "All Tools - Free Business Tools",
    description: "Explore our collection of 20+ free business tools. From GST invoice generators to inventory management, streamline your workflow with professional-grade tools.",
    keywords: [
        "free business tools",
        "invoice generator",
        "GST invoice",
        "quotation generator",
        "salary slip generator",
        "barcode generator",
        "purchase order generator",
        "inventory management",
        "expense report",
        "business productivity",
        "free tools",
        "online tools"
    ],
    openGraph: {
        title: "All Tools - Free Business Tools | Web Scraper",
        description: "Explore our collection of 20+ free business tools. From GST invoice generators to inventory management, streamline your workflow.",
        type: "website",
    },
};
export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
