import React from "react";

// Suppresses the shared root Footer for the home page only,
// so the landing footer can render instead. The shared Header is preserved.
export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <style>{`
                body > div > div.print\\:hidden:last-child {
                    display: none !important;
                }
            `}</style>
            {children}
        </>
    );
}
