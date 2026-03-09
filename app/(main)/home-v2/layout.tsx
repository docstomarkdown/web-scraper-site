import React from "react";

// This layout suppresses ONLY the shared root Footer for /home-v2
// so FooterV2 renders instead — the root Header is kept as-is.
export default function HomeV2Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Hide only the root layout's injected Footer, keep the Header */}
            <style>{`
                body > div > div.print\\:hidden:last-child {
                    display: none !important;
                }
            `}</style>
            {children}
        </>
    );
}
