
export interface Currency {
    code: string;
    symbol: string;
    name: string;
    taxLabel: string;
    flag?: string;
}

export interface CountryCode {
    code: string;
    name: string;
    dialCode: string;
    flag: string;
}

export interface PartyInfo {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    logo?: string;
    country?: string;
    state?: string;
    // Dynamic fields for extra details (GSTIN, PAN, etc)
    customDetails?: { label: string; value: string }[];
}

export interface CompanyInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    logo: string;
    country: string;
    state?: string;
    pan: string;
    gstin: string;
    // GST Invoice additions
    bankDetails?: {
        accountName: string;
        bankName: string;
        accountNumber: string;
        ifsc: string;
        upiId: string;
    };
}

export interface ClientInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    gstin: string;
    state?: string; // Added for GST
}

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    discount: number; // in percentage
    tax: number; // in percentage
    hsnSac?: string;
}
