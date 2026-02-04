import { format } from "date-fns";
import { PartyInfo } from "../../types";

// Generic Meta Field for right-side data (e.g., "Invoice Date: 12/12/2024" or "Relieving Date: ...")
export interface MetaField {
    label: string;
    value: string | Date | undefined;
    isDate?: boolean;
}

interface StandardPreviewHeaderProps {
    // The "From" entity (Company, Employer, Candidate)
    sender: PartyInfo;

    // The "To" entity (Client, Employee, Recipient) - Optional (e.g. for Resume)
    recipient?: PartyInfo & {
        label?: string; // "Bill To", "To", "Candidate Details"
    };

    // Document styling and metadata
    title: string;
    documentNumber?: string; // Invoice #, Ref #
    documentNumberLabel?: string; // "Invoice #", "Ref. ID"

    // Dynamic list of meta fields (Dates, Statuses, etc)
    metaFields?: MetaField[];

    // Layout options
    showLogo?: boolean;
}

export const StandardPreviewHeader = ({
    sender,
    recipient,
    title,
    documentNumber,
    documentNumberLabel = "Document #",
    metaFields = [],
    showLogo = true,
}: StandardPreviewHeaderProps) => {
    return (
        <div className="w-full">
            {/* 1. Top Section: Logo/Sender & Title */}
            <div className="flex justify-between items-start mb-8 w-full">
                <div className="w-1/2">
                    {showLogo && (
                        sender.logo ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={sender.logo} alt="Logo" className="h-20 w-auto object-contain mb-2 rounded-md" />
                        ) : (
                            <div className="h-20 w-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-md flex items-center justify-center">
                                <span className="text-xs text-slate-400 font-medium">Logo</span>
                            </div>
                        )
                    )}
                </div>
                <div className="w-1/2 text-right">
                    <h1 className="text-3xl font-light text-slate-800 tracking-wide uppercase">
                        {title || "DOCUMENT"}
                    </h1>
                </div>
            </div>

            {/* 2. Sender Details (Company / Employer / Personal) */}
            <div className="mb-8 w-full">
                <h2 className={`text-base font-bold mb-1 ${!sender.name ? 'text-slate-400' : 'text-slate-900'}`}>
                    {sender.name || 'Sender Name'}
                </h2>
                <div className="text-sm text-slate-500 leading-snug space-y-0.5">
                    {!sender.email && !sender.address && !sender.phone ? (
                        <>
                            <p className="text-slate-400">Email Address</p>
                            <p className="text-slate-400">Physical Address</p>
                            <p className="text-slate-400">City, Country, Zip</p>
                            <p className="text-slate-400">Phone Number</p>
                        </>
                    ) : (
                        <>
                            {sender.email && <p>{sender.email}</p>}
                            {sender.address && <p>{sender.address}</p>}
                            {sender.country && <p>{sender.country}</p>}
                            {sender.phone && <p>{sender.phone}</p>}
                            {/* Render Custom Details if any (e.g. GSTIN) */}
                            {sender.customDetails?.map((detail, idx) => (
                                <p key={idx}>{detail.label}: {detail.value}</p>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* 3. Recipient & Meta Data Grid */}
            <div className="flex justify-between items-start mb-8 w-full">
                {/* Left Side: Recipient (Optional) */}
                <div className="w-1/2 pr-4">
                    {recipient && (
                        <>
                            <p className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
                                {recipient.label || "To:"}
                            </p>
                            <h3 className={`text-base font-medium mb-1 ${!recipient.name ? 'text-slate-400' : 'text-slate-800'}`}>
                                {recipient.name || 'Recipient Name'}
                            </h3>
                            <div className="text-sm text-slate-500 leading-snug space-y-0.5">
                                {!recipient.email && !recipient.address && !recipient.phone ? (
                                    <>
                                        <p className="text-slate-400">Recipient Email</p>
                                        <p className="text-slate-400">Recipient Address</p>
                                        <p className="text-slate-400">City, Country</p>
                                        <p className="text-slate-400">Phone Number</p>
                                    </>
                                ) : (
                                    <>
                                        {recipient.email && <p>{recipient.email}</p>}
                                        {recipient.address && <p>{recipient.address}</p>}
                                        {recipient.country && <p>{recipient.country}</p>}
                                        {recipient.phone && <p>{recipient.phone}</p>}
                                        {recipient.customDetails?.map((detail, idx) => (
                                            <p key={idx}>{detail.label}: {detail.value}</p>
                                        ))}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Right Side: Meta Data (Dates, Numbers) */}
                <div className="w-auto text-right space-y-2">
                    {/* Primary Document Number */}
                    <div className="flex items-center justify-end gap-6">
                        <span className="text-sm font-semibold text-slate-600 w-24 text-right">
                            {documentNumberLabel}
                        </span>
                        <span className={`text-sm font-bold w-32 text-left ${!documentNumber ? 'text-slate-400' : 'text-slate-900'}`}>
                            {documentNumber || '000000'}
                        </span>
                    </div>

                    {/* Dynamic Meta Fields */}
                    {metaFields.map((field, index) => (
                        <div key={index} className="flex items-center justify-end gap-6">
                            <span className="text-sm font-semibold text-slate-600 w-24 text-right">
                                {field.label}
                            </span>
                            <span className="text-sm text-slate-800 w-32 text-left">
                                {field.value ? (
                                    field.isDate && field.value instanceof Date
                                        ? format(field.value, 'PP')
                                        : field.value.toString()
                                ) : (
                                    <span className="text-slate-400 text-sm">-</span>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
