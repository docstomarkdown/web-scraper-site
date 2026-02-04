"use client";

import { useEffect, useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, RotateCw, Download, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export interface PDFViewerProps {
    url: string | null;
    className?: string;
    onDownload?: () => void;
    onPrint?: () => void;
    isGenerating?: boolean;
}

export function PDFViewer({ url, className, onDownload, onPrint, isGenerating = false }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [rotation, setRotation] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setIsLoading(false);
        setPageNumber(1);
    }

    function onDocumentLoadError(error: Error) {
        console.error('Error loading PDF:', error);
        setIsLoading(false);
    }

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
    const handleRotate = () => setRotation(prev => (prev + 90) % 360);

    const handlePrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || 1));

    const handleDownload = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDownload) {
            onDownload();
        }
    };

    // Auto-fit width on load
    useEffect(() => {
        if (containerRef.current && !isLoading) {
            // Simple auto-fit logic, can be enhanced
            // const width = containerRef.current.clientWidth;
            // setScale(width / 800); // approx page width
        }
    }, [isLoading]);

    return (
        <div className={cn("flex flex-col h-full bg-[#525659]", className)}>

            {/* Custom Toolbar */}
            <div className="flex items-center justify-center gap-4 p-2 bg-[#323639] border-b border-white/10 text-white shadow-md z-10 shrink-0 select-none">

                {/* Page Navigation */}
                <div className="flex items-center gap-1 bg-black/20 rounded p-0.5 border border-white/10">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={handlePrevPage}
                        disabled={pageNumber <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-mono min-w-[3rem] text-center text-white/90">
                        {pageNumber} / {numPages || '-'}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={handleNextPage}
                        disabled={pageNumber >= (numPages || 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="w-px h-4 bg-white/10 mx-1" />

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-black/20 rounded p-0.5 border border-white/10">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={handleZoomOut}
                        title="Zoom Out"
                    >
                        <ZoomOut className="h-3.5 w-3.5" />
                    </Button>
                    <span className="text-xs font-mono min-w-[3rem] text-center text-white/90">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={handleZoomIn}
                        title="Zoom In"
                    >
                        <ZoomIn className="h-3.5 w-3.5" />
                    </Button>
                </div>

                <div className="w-px h-4 bg-white/10 mx-1" />

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                    onClick={handleRotate}
                    title="Rotate"
                >
                    <RotateCw className="h-3.5 w-3.5" />
                </Button>

                {(onDownload || onPrint) && <div className="w-px h-4 bg-white/10 mx-1" />}

                {onPrint && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={onPrint}
                        title="Print"
                    >
                        <Printer className="h-3.5 w-3.5" />
                    </Button>
                )}

                {onDownload && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={(e) => { e.preventDefault(); handleDownload(e); }}
                        disabled={isGenerating}
                        title="Download"
                        type="button"
                    >
                        {isGenerating ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Download className="h-3.5 w-3.5" />
                        )}
                    </Button>
                )}

            </div>

            {/* Viewer Area */}
            <div
                ref={containerRef}
                className="flex-1 overflow-auto w-full relative bg-[#525659] flex justify-center p-8"
            >
                {!url ? (
                    <div className="flex flex-col items-center justify-center text-white/50 h-full">
                        <span className="text-sm">No PDF URL provided</span>
                    </div>
                ) : (
                    <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-white/50" />
                            </div>
                        }
                        className="shadow-2xl"
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            rotate={rotation}
                            className="bg-white shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                )}
            </div>
        </div>
    );
}
