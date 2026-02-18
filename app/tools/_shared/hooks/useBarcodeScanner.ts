import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

// We use dynamic imports for html5-qrcode in the components to avoid SSR issues
// checking if window is defined is also a good practice

export interface BarcodeScannerOptions {
    onScan: (decodedText: string) => void
    onError?: (errorMessage: string) => void
    formatsToSupport?: any[] // Html5QrcodeSupportedFormats[]
}

export function useBarcodeScanner({ onScan, onError, formatsToSupport }: BarcodeScannerOptions) {
    const [isScanning, setIsScanning] = useState(false)
    const [scannerError, setScannerError] = useState<string | null>(null)

    // Handle Camera Scan
    useEffect(() => {
        let textScanner: any = null

        if (isScanning) {
            import("html5-qrcode").then(({ Html5QrcodeScanner, Html5QrcodeSupportedFormats }) => {
                const formats = formatsToSupport || [
                    Html5QrcodeSupportedFormats.UPC_A,
                    Html5QrcodeSupportedFormats.EAN_13,
                    Html5QrcodeSupportedFormats.EAN_8,
                ]

                textScanner = new Html5QrcodeScanner(
                    "reader",
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 150 },
                        aspectRatio: 1.0,
                        formatsToSupport: formats
                    },
                    /* verbose= */ false
                )

                textScanner.render(
                    (decodedText: string) => {
                        onScan(decodedText)
                        setIsScanning(false)
                        toast.success(`Barcode Scanned: ${decodedText}`)
                        textScanner.clear()
                    },
                    (errorMessage: string) => {
                        // ignore frame errors or pass to onError if critical
                        if (onError) onError(errorMessage)
                    }
                )
            }).catch(err => {
                console.error("Failed to load scanner", err)
                setScannerError("Failed to load camera scanner.")
            })
        }

        return () => {
            if (textScanner) {
                textScanner.clear().catch((error: any) => {
                    console.error("Failed to clear html5-qrcode scanner. ", error)
                })
            }
        }
    }, [isScanning, onScan, onError, formatsToSupport])

    // Handle File Upload Scan
    const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            const { Html5Qrcode } = await import("html5-qrcode")

            // Ensure the placeholder element exists for Html5Qrcode to attach to
            const placeholderId = "file-reader-placeholder-hook"
            if (!document.getElementById(placeholderId)) {
                const elem = document.createElement("div")
                elem.id = placeholderId
                elem.style.display = "none"
                document.body.appendChild(elem)
            }

            const html5QrCode = new Html5Qrcode(placeholderId, false)

            const response = await html5QrCode.scanFileV2(file, true)
            if (response && response.decodedText) {
                onScan(response.decodedText)
                toast.success(`Image Scanned: ${response.decodedText}`)
            }
        } catch (err) {
            console.error("Error scanning file", err)
            toast.error("Scan Failed: Could not detect a valid barcode in this image.")
        } finally {
            // reset input
            e.target.value = ''
        }
    }, [onScan])

    return {
        isScanning,
        setIsScanning,
        scannerError,
        handleFileUpload
    }
}
