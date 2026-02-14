import React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface ScannerModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    error: string | null
    readerId?: string
}

export function ScannerModal({ isOpen, onOpenChange, error, readerId = "reader" }: ScannerModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Scan Barcode</DialogTitle>
                    <DialogDescription>Point your camera at a UPC or EAN barcode.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center min-h-[300px] bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                    <div id={readerId} className="w-full"></div>
                    {error && <p className="text-red-500 text-sm p-4">{error}</p>}
                </div>
            </DialogContent>
        </Dialog>
    )
}
