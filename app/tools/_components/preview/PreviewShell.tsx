
import React, { ReactNode } from "react";

interface PreviewShellProps {
    children: ReactNode;
    id?: string;
    ref?: React.RefObject<HTMLDivElement>;
}

export const PreviewShell = React.forwardRef<HTMLDivElement, PreviewShellProps>(({ children, id = "preview-shell" }, ref) => {
    return (
        /* PAGE WRAPPER: Represents the A4 page (210mm x 297mm).
           Using 'block' display instead of flex to rely on standard margin autos for centering.
           overflow-hidden ensures no spillover.
        */
        <div
            ref={ref}
            id={id}
            data-manual-margin="true"
            className="bg-white w-[210mm] h-[297mm] overflow-hidden shadow-lg font-sans text-slate-800 relative"
            style={{ margin: '0 auto' }}
        >
            {/* DOCUMENT CONTENT CONTAINER: 
                - Width: 180mm
                - Margins: mx-auto ensures strict horizontal centering (15mm on each side implied).
                - Padding: 15mm vertical padding for top/bottom margins.
                - box-border: keeps dimensions sane.
            */}
            <div
                className="w-[180mm] mx-auto h-full flex flex-col bg-white box-border"
                style={{ paddingTop: '15mm', paddingBottom: '15mm' }}
            >
                {children}
            </div>
        </div>
    );
});

PreviewShell.displayName = "PreviewShell";
