'use client';

export interface Currency {
    code: string;
    symbol: string;
    name: string;
    taxLabel: string;
    flag: string;
}

export const currencies: Currency[] = [
    { code: "AED", symbol: "د.إ", name: "UAE Dirham", taxLabel: "VAT", flag: "ae" },
    { code: "ARS", symbol: "$", name: "Argentine Peso", taxLabel: "IVA", flag: "ar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar", taxLabel: "GST", flag: "au" },
    { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", taxLabel: "VAT", flag: "bd" },
    { code: "BGN", symbol: "лв", name: "Bulgarian Lev", taxLabel: "VAT", flag: "bg" },
    { code: "BRL", symbol: "R$", name: "Brazilian Real", taxLabel: "Tax", flag: "br" },
    { code: "CAD", symbol: "CA$", name: "Canadian Dollar", taxLabel: "HST", flag: "ca" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc", taxLabel: "VAT", flag: "ch" },
    { code: "CLP", symbol: "$", name: "Chilean Peso", taxLabel: "IVA", flag: "cl" },
    { code: "CNY", symbol: "CN¥", name: "Chinese Yuan", taxLabel: "Tax", flag: "cn" },
    { code: "COP", symbol: "$", name: "Colombian Peso", taxLabel: "IVA", flag: "co" },
    { code: "CZK", symbol: "Kč", name: "Czech Koruna", taxLabel: "DPH", flag: "cz" },
    { code: "DKK", symbol: "kr", name: "Danish Krone", taxLabel: "Moms", flag: "dk" },
    { code: "EGP", symbol: "£", name: "Egyptian Pound", taxLabel: "VAT", flag: "eg" },
    { code: "EUR", symbol: "€", name: "Euro", taxLabel: "VAT", flag: "eu" },
    { code: "GBP", symbol: "£", name: "British Pound", taxLabel: "VAT", flag: "gb" },
    { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", taxLabel: "Tax", flag: "hk" },
    { code: "HUF", symbol: "Ft", name: "Hungarian Forint", taxLabel: "ÁFA", flag: "hu" },
    { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", taxLabel: "PPN", flag: "id" },
    { code: "ILS", symbol: "₪", name: "Israeli New Shekel", taxLabel: "VAT", flag: "il" },
    { code: "INR", symbol: "₹", name: "Indian Rupee", taxLabel: "GST", flag: "in" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen", taxLabel: "Tax", flag: "jp" },
    { code: "KES", symbol: "KSh", name: "Kenyan Shilling", taxLabel: "VAT", flag: "ke" },
    { code: "KRW", symbol: "₩", name: "South Korean Won", taxLabel: "Tax", flag: "kr" },
    { code: "KWD", symbol: "د.ك", name: "Kuwaiti Dinar", taxLabel: "Tax", flag: "kw" },
    { code: "MXN", symbol: "Mex$", name: "Mexican Peso", taxLabel: "IVA", flag: "mx" },
    { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", taxLabel: "SST", flag: "my" },
    { code: "NGN", symbol: "₦", name: "Nigerian Naira", taxLabel: "VAT", flag: "ng" },
    { code: "NOK", symbol: "kr", name: "Norwegian Krone", taxLabel: "MVA", flag: "no" },
    { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", taxLabel: "GST", flag: "nz" },
    { code: "PEN", symbol: "S/", name: "Peruvian Sol", taxLabel: "IGV", flag: "pe" },
    { code: "PHP", symbol: "₱", name: "Philippine Peso", taxLabel: "VAT", flag: "ph" },
    { code: "PKR", symbol: "₨", name: "Pakistani Rupee", taxLabel: "GST", flag: "pk" },
    { code: "PLN", symbol: "zł", name: "Polish Zloty", taxLabel: "VAT", flag: "pl" },
    { code: "QAR", symbol: "ر.ق", name: "Qatari Riyal", taxLabel: "VAT", flag: "qa" },
    { code: "RON", symbol: "lei", name: "Romanian Leu", taxLabel: "TVA", flag: "ro" },
    { code: "RUB", symbol: "₽", name: "Russian Ruble", taxLabel: "Tax", flag: "ru" },
    { code: "SAR", symbol: "ر.س", name: "Saudi Riyal", taxLabel: "VAT", flag: "sa" },
    { code: "SEK", symbol: "kr", name: "Swedish Krona", taxLabel: "Moms", flag: "se" },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar", taxLabel: "GST", flag: "sg" },
    { code: "THB", symbol: "฿", name: "Thai Baht", taxLabel: "VAT", flag: "th" },
    { code: "TRY", symbol: "₺", name: "Turkish Lira", taxLabel: "KDV", flag: "tr" },
    { code: "TWD", symbol: "NT$", name: "New Taiwan Dollar", taxLabel: "VAT", flag: "tw" },
    { code: "TZS", symbol: "Sh", name: "Tanzanian Shilling", taxLabel: "VAT", flag: "tz" },
    { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia", taxLabel: "VAT", flag: "ua" },
    { code: "USD", symbol: "$", name: "US Dollar", taxLabel: "Tax", flag: "us" },
    { code: "VND", symbol: "₫", name: "Vietnamese Dong", taxLabel: "VAT", flag: "vn" },
    { code: "ZAR", symbol: "R", name: "South African Rand", taxLabel: "VAT", flag: "za" },
];

/**
 * Get currency by code
 */
export function getCurrencyByCode(code: string): Currency | undefined {
    return currencies.find(c => c.code === code);
}

/**
 * Get currency symbol by code
 */
export function getCurrencySymbol(code: string): string {
    return getCurrencyByCode(code)?.symbol || code;
}
