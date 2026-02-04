
interface StandardPreviewFooterProps {
    notes: string;
    paymentTerms: string;
}

export const StandardPreviewFooter = ({
    notes,
    paymentTerms
}: StandardPreviewFooterProps) => {
    return (
        <div className="mt-auto space-y-6 w-full">
            <div className="grid grid-cols-1 gap-4">
                {(notes || (!notes && !paymentTerms)) && (
                    <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Notes</h4>
                        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${!notes ? 'text-slate-400 italic' : 'text-slate-500'}`}>
                            {notes || "Add notes like 'Thank you for your business!'"}
                        </p>
                    </div>
                )}
                {paymentTerms && (
                    <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Terms & Conditions</h4>
                        <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap">{paymentTerms}</p>
                    </div>
                )}
            </div>

            <div className="border-t border-slate-200 pt-6 text-center space-y-1">
                <p className="text-sm text-slate-600 font-medium italic">Thank you for your business.</p>
            </div>
        </div>
    );
};
