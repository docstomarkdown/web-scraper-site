"use client";

import React, { ReactNode, useState, useRef, useEffect, forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Download,
    Printer,
    ZoomIn,
    ZoomOut,
    Maximize2,
    Loader2,
    X,
    Maximize,
    ChevronDown
} from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { PDFViewerProps } from './PDFViewer';

const PDFViewer = dynamic<PDFViewerProps>(() => import('./PDFViewer').then(mod => mod.PDFViewer), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-full w-full bg-[#525659] text-white/50">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
});
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PreviewUpdatingOverlay } from "./PreviewUpdatingOverlay";

interface PdfPreviewPanelProps {
    title?: string;
    children?: ReactNode;
    onDownload: () => void;
    isGenerating?: boolean;
    disabled?: boolean;
    downloadLabel?: string;
    className?: string;
    previewClassName?: string;
    pdfUrl?: string | null;
    isUpdating?: boolean;
}

export const PdfPreviewPanel = forwardRef<HTMLDivElement, PdfPreviewPanelProps>(({
    title = "Live Preview",
    children,
    onDownload,
    isGenerating = false,
    disabled = false,
    downloadLabel = "Download PDF",
    className,
    previewClassName,
    pdfUrl = null,
    isUpdating = false,
}, ref) => {
    const [zoom, setZoom] = useState(0.65);
    const [modalZoom, setModalZoom] = useState(0.8);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const modalContainerRef = useRef<HTMLDivElement>(null);

    // Zoom handlers
    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.2));

    const handleModalZoomIn = () => setModalZoom(prev => Math.min(prev + 0.1, 3));
    const handleModalZoomOut = () => setModalZoom(prev => Math.max(prev - 0.1, 0.2));

    const handleFitToWidth = (isModal: boolean) => {
        const container = isModal ? modalContainerRef.current : document.querySelector('.preview-container');
        if (container) {
            const containerWidth = container.clientWidth - 64;
            const pageInMm = 210;
            const pxPerMm = 3.7795275591;
            const pageWidthPx = pageInMm * pxPerMm;
            const calculatedZoom = containerWidth / pageWidthPx;
            if (isModal) {
                setModalZoom(Number(calculatedZoom.toFixed(2)));
            } else {
                setZoom(Number(calculatedZoom.toFixed(2)));
            }
        }
    };

    useEffect(() => {
        if (isFullscreen) {
            setTimeout(() => handleFitToWidth(true), 100);
        }
    }, [isFullscreen]);

    const handlePrint = () => {
        if (pdfUrl) {
            // Create a hidden iframe to print the PDF blob
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = pdfUrl;
            document.body.appendChild(iframe);

            iframe.onload = () => {
                try {
                    iframe.contentWindow?.print();
                } catch (e) {
                    console.error("Print failed", e);
                }
                // Cleanup after a delay (printing is async)
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 2000);
            };
        } else {
            window.print();
        }
    };

    const RenderPage = ({ currentZoom, isCaptureSource = false }: { currentZoom: number, isCaptureSource?: boolean }) => (
        <div
            className={cn(
                "transition-transform duration-200 origin-top bg-white border border-black/5",
                !isCaptureSource && "shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            )}
            style={{
                transform: isCaptureSource ? "none" : `scale(${currentZoom})`,
                width: '210mm',
                height: '297mm',
                marginBottom: isCaptureSource ? "0" : `calc(297mm * (${currentZoom} - 1) + 2rem)`,
                flexShrink: 0
            }}
        >
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    );

    return (
        <div className={cn("lg:sticky lg:top-4 h-fit", className)}>
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl bg-[#525659] overflow-hidden flex flex-col h-[700px] lg:h-[calc(100vh-120px)] border border-slate-200/50 transition-all duration-300">
                {/* 
                    CLEAN TOOLBAR: 
                    Only show our branding. Print/Download/Zoom are handled 
                    by the native viewer inside the iframe (#toolbar=1).
                */}
                <div className="h-16 bg-[#323639] flex items-center justify-between px-6 shrink-0 text-white shadow-md z-20">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 shadow-sm px-2 py-0.5 rounded text-[10px] font-bold leading-none tracking-tighter border border-white/10 select-none">
                            PDF
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium opacity-90 truncate max-w-[120px] md:max-w-[200px] leading-tight">
                                {title}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-[9px] font-medium text-emerald-400/90 tracking-wide uppercase select-none">
                                    Live
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Zoom Controls */}
                        <div className="flex items-center bg-black/20 rounded-lg mr-2 border border-white/10">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => { e.preventDefault(); handleZoomOut(); }}
                                className="h-7 w-7 rounded-none rounded-l-lg hover:bg-white/10 text-white/70 hover:text-white"
                                title="Zoom Out"
                                type="button"
                            >
                                <ZoomOut className="w-3.5 h-3.5" />
                            </Button>
                            <span className="text-[11px] font-medium px-2 min-w-[3rem] text-center font-mono">
                                {Math.round(zoom * 100)}%
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => { e.preventDefault(); handleZoomIn(); }}
                                className="h-7 w-7 rounded-none rounded-r-lg hover:bg-white/10 text-white/70 hover:text-white"
                                title="Zoom In"
                                type="button"
                            >
                                <ZoomIn className="w-3.5 h-3.5" />
                            </Button>
                        </div>

                        {/* Print Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.preventDefault(); handlePrint(); }}
                            className="h-8 w-8 hover:bg-white/10 text-white/70 hover:text-white"
                            title="Print"
                            type="button"
                        >
                            <Printer className="w-4 h-4" />
                        </Button>

                        {/* Download Button */}
                        <Button
                            onClick={(e) => { e.preventDefault(); onDownload(); }}
                            disabled={isGenerating}
                            className={cn(
                                "h-8 px-3 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-all shadow-sm",
                                isGenerating && "animate-pulse cursor-not-allowed opacity-80"
                            )}
                            title={downloadLabel}
                            type="button"
                            variant="default" // Using explicit variant
                        >
                            {isGenerating ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                            ) : (
                                <Download className="w-3.5 h-3.5 mr-2" />
                            )}
                            <span className="hidden sm:inline">{downloadLabel}</span>
                        </Button>

                        {/* Fullscreen Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.preventDefault(); setIsFullscreen(true); }}
                            className="h-8 w-8 hover:bg-white/10 text-white/70 hover:text-white"
                            title="Full screen"
                            type="button"
                        >
                            <Maximize className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                <CardContent className="p-0 flex-1 relative bg-[#525659] overflow-hidden flex flex-col">

                    {/* 
                        HIDDEN CAPTURE SOURCE:
                        Targeted directly for capture. NEVER SCALED.
                        We attach the forwarded 'ref' here and add a data attribute 
                        for usePdfExport to find it reliably.
                    */}
                    <div
                        data-pdf-capture-source="true"
                        style={{
                            position: 'absolute',
                            left: '-9999px',
                            top: '-9999px',
                            width: '210mm',
                            height: '297mm',
                            zIndex: -99999,
                            overflow: 'hidden',
                            opacity: 0,
                            pointerEvents: 'none',
                        }}
                        aria-hidden="true"
                    >
                        <div ref={ref}>
                            {children}
                        </div>
                    </div>

                    {/* LIVE HTML PREVIEW */}
                    <div className="flex-1 overflow-auto flex items-start justify-center p-8 preview-container custom-scrollbar">
                        <RenderPage currentZoom={zoom} />
                    </div>
                </CardContent>

                {/* Clarification Note */}
                <div className="bg-[#323639] border-t border-white/10 p-2 text-center shrink-0 z-20">
                    <p className="text-[11px] text-white/50 font-medium">
                        Note: This preview shows only the fields you&apos;ve filled in. What you see is what you&apos;ll get in the download.
                    </p>
                </div>
            </Card>

            {/* Modal - Unified for both HTML and PDF */}
            <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 gap-0 overflow-hidden flex flex-col bg-[#525659] border-none text-white [&>button]:hidden">
                    <DialogHeader className="h-12 bg-[#323639] flex flex-row items-center justify-between px-6 shrink-0 shadow-md z-20">
                        <div className="flex items-center gap-4">
                            <DialogTitle className="text-sm font-medium opacity-90">{title}</DialogTitle>
                        </div>
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </DialogHeader>

                    <div className="flex-1 relative bg-[#525659] overflow-hidden flex flex-col">
                        {pdfUrl ? (
                            <PDFViewer
                                url={pdfUrl}
                                className="w-full h-full border-none bg-[#525659]"
                                onDownload={onDownload}
                                onPrint={handlePrint}
                                isGenerating={isGenerating}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#525659]">
                                <div className="flex flex-col items-center gap-3 text-white/50">
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    <span className="text-sm font-medium">Preparing PDF...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
});

PdfPreviewPanel.displayName = "PdfPreviewPanel";

