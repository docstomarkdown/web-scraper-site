import { useState, RefObject, useCallback, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

// PDF Margin Configuration
// Change this value to adjust the margin on all PDFs generated across all tools
// Format: "12mm" (millimeters) or "0.5in" (inches)
const DEFAULT_PDF_MARGIN = "0";

interface UsePdfExportOptions {
    previewRef: RefObject<HTMLDivElement>;
    filename?: string;
    scale?: number;
    backgroundColor?: string;
    addPageNumbers?: boolean;
    pdfMargin?: string; // Margin for PDF (e.g., "12mm")
}

export const usePdfExport = ({
    previewRef,
    filename = "document.pdf",
    scale = 2,
    backgroundColor = "#ffffff",
    addPageNumbers = true,
    pdfMargin = DEFAULT_PDF_MARGIN, // Default margin - change DEFAULT_PDF_MARGIN constant above to adjust globally
}: UsePdfExportOptions) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const generateDoc = useCallback(async (removePlaceholders: boolean = false) => {
        if (!previewRef.current) return null;

        // Use the element directly from the ref
        const element = previewRef.current;

        try {
            // A small delay to ensure any pending renders are complete
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(element, {
                scale,
                useCORS: true,
                logging: false,
                backgroundColor,
                scrollX: 0,
                scrollY: 0,
                // These are critical for avoiding scrambled content on scroll
                width: element.offsetWidth || 794,
                height: element.offsetHeight || 1123,
                windowWidth: 1200,
                windowHeight: 1600,
                onclone: (clonedDoc, clonedElement) => {
                    if (clonedElement instanceof HTMLElement) {
                        // Reset positioning for clean capture
                        clonedElement.style.position = "fixed";
                        clonedElement.style.top = "0";
                        clonedElement.style.left = "0";
                        clonedElement.style.margin = "0";
                        clonedElement.style.transform = "none";
                        clonedElement.style.visibility = "visible";
                        clonedElement.style.display = "block";

                        // Find the 210mm container (A4 page size)
                        // It could be the element itself, a parent, or a child
                        const find210mmContainer = (el: HTMLElement): HTMLElement | null => {
                            // Check if this element is 210mm
                            const styleWidth = el.style.width;
                            const has210mmClass = el.className && el.className.toString().includes('w-[210mm]');
                            const is210mm = styleWidth === '210mm' ||
                                (styleWidth && styleWidth.includes('210mm')) ||
                                has210mmClass ||
                                (el.offsetWidth >= 790 && el.offsetWidth <= 800); // ~794px = 210mm

                            if (is210mm) {
                                return el;
                            }

                            // Check parent
                            if (el.parentElement) {
                                const parent = find210mmContainer(el.parentElement);
                                if (parent) return parent;
                            }

                            // Check children
                            for (const child of Array.from(el.children)) {
                                if (child instanceof HTMLElement) {
                                    const found = find210mmContainer(child);
                                    if (found) return found;
                                }
                            }

                            return null;
                        };

                        // Find the 210mm container
                        const container = find210mmContainer(clonedElement);

                        if (container) {
                            // CHECK FOR MANUAL MARGIN OVERRIDE
                            // If the container (e.g. PreviewShell) handles its own margins, propery 'data-manual-margin' will be true.
                            const hasManualMargin = container.getAttribute("data-manual-margin") === "true";

                            if (!hasManualMargin && pdfMargin !== "0") {
                                // Apply consistent margins to the 210mm container
                                container.style.paddingLeft = pdfMargin;
                                container.style.paddingRight = pdfMargin;
                                container.style.paddingTop = pdfMargin;
                                container.style.paddingBottom = pdfMargin;
                            }

                            // Always ensure no external margins interfere
                            container.style.margin = "0";
                            container.style.marginLeft = "0";
                            container.style.marginRight = "0";
                        } else {
                            // Fallback: apply padding directly to the captured element
                            clonedElement.style.paddingLeft = pdfMargin;
                            clonedElement.style.paddingRight = pdfMargin;
                            clonedElement.style.paddingTop = pdfMargin;
                            clonedElement.style.paddingBottom = pdfMargin;
                        }

                        // === REMOVE PLACEHOLDERS FOR CLEAN PDF (DOWNLOAD ONLY) ===
                        // Only filled fields appear in download; placeholders are for preview guidance only
                        if (removePlaceholders) {
                            // Remove all placeholder text (styled with text-slate-400)
                            const placeholders = clonedElement.querySelectorAll('.text-slate-400');
                            placeholders.forEach(el => el.remove());

                            // Remove empty logo placeholder boxes (dashed border boxes)
                            const logoPlaceholders = clonedElement.querySelectorAll('[class*="border-dashed"]');
                            logoPlaceholders.forEach(el => el.remove());
                        }
                    }
                }
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
                compress: true
            });

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;
            let pageNum = 1;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
            if (addPageNumbers) {
                pdf.setFontSize(10);
                pdf.setTextColor(150, 150, 150);
                pdf.text(`Page ${pageNum}`, 190, 290, { align: "right" });
            }

            heightLeft -= pageHeight;

            // Page break logic with a 5mm tolerance to avoid accidental blank pages
            while (heightLeft > 5) {
                pageNum++;
                pdf.addPage();
                const nextPosition = -(pageHeight * (pageNum - 1));
                pdf.addImage(imgData, "PNG", 0, nextPosition, imgWidth, imgHeight, undefined, 'FAST');
                if (addPageNumbers) {
                    pdf.setFontSize(10);
                    pdf.setTextColor(150, 150, 150);
                    pdf.text(`Page ${pageNum}`, 190, 290, { align: "right" });
                }
                heightLeft -= pageHeight;
            }

            return pdf;
        } catch (error) {
            console.error("Capture failed:", error);
            return null;
        }
    }, [previewRef, scale, backgroundColor, pdfMargin, addPageNumbers]);

    const downloadPDF = async () => {
        setIsGenerating(true);
        const toastId = toast.loading("Generating PDF...");
        try {
            const pdf = await generateDoc(true); // Remove placeholders for download
            if (pdf) {
                pdf.save(filename);
                toast.success("PDF downloaded successfully!", { id: toastId });
            } else {
                toast.error("Failed to capture document.", { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to generate PDF.", { id: toastId });
        } finally {
            setIsGenerating(false);
        }
    };

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updatePreview = useCallback(async () => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set loading state immediately to show feedback while typing
        setIsUpdating(true);

        // Set new timeout for the actual generation
        timeoutRef.current = setTimeout(async () => {
            try {
                const pdf = await generateDoc(true); // Also remove placeholders for preview (unified with download)
                if (pdf) {
                    const blob = pdf.output("blob");
                    const url = URL.createObjectURL(blob);
                    setPdfUrl(prevUrl => {
                        if (prevUrl) URL.revokeObjectURL(prevUrl);
                        return url;
                    });
                }
            } catch (e) {
                // Background update fail is ignored
            } finally {
                setIsUpdating(false);
            }
        }, 700); // 0.7s debounce for faster updates
    }, [generateDoc]); // Dependencies for the callback

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return { downloadPDF, isGenerating, pdfUrl, updatePreview, isUpdating };
};
