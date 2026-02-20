'use client';

import * as React from 'react';
import Image from "next/image";
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export const currencies = [
    { code: 'AFN', symbol: '؋', name: "Afghan Afghani", flag: 'af' },
    { code: 'ALL', symbol: 'L', name: "Albanian Lek", flag: 'al' },
    { code: 'DZD', symbol: 'د.ج', name: "Algerian Dinar", flag: 'dz' },
    { code: 'AOA', symbol: 'Kz', name: "Angolan Kwanza", flag: 'ao' },
    { code: 'ARS', symbol: '$', name: "Argentine Peso", flag: 'ar' },
    { code: 'AMD', symbol: '֏', name: "Armenian Dram", flag: 'am' },
    { code: 'AWG', symbol: 'ƒ', name: "Aruban Florin", flag: 'aw' },
    { code: 'AUD', symbol: '$', name: "Australian Dollar", flag: 'au' },
    { code: 'AZN', symbol: '₼', name: "Azerbaijani Manat", flag: 'az' },
    { code: 'BSD', symbol: '$', name: "Bahamian Dollar", flag: 'bs' },
    { code: 'BHD', symbol: '.د.ب', name: "Bahraini Dinar", flag: 'bh' },
    { code: 'BDT', symbol: '৳', name: "Bangladeshi Taka", flag: 'bd' },
    { code: 'BBD', symbol: '$', name: "Barbadian Dollar", flag: 'bb' },
    { code: 'BYN', symbol: 'Br', name: "Belarusian Ruble", flag: 'by' },
    { code: 'BZD', symbol: '$', name: "Belize Dollar", flag: 'bz' },
    { code: 'BMD', symbol: '$', name: "Bermudian Dollar", flag: 'bm' },
    { code: 'BTN', symbol: 'Nu.', name: "Bhutanese Ngultrum", flag: 'bt' },
    { code: 'BOB', symbol: 'Bs.', name: "Bolivian Boliviano", flag: 'bo' },
    { code: 'BAM', symbol: 'KM', name: "Bosnia and Herzegovina Convertible Mark", flag: 'ba' },
    { code: 'BWP', symbol: 'P', name: "Botswana Pula", flag: 'bw' },
    { code: 'BRL', symbol: 'R$', name: "Brazilian Real", flag: 'br' },
    { code: 'GBP', symbol: '£', name: "British Pound", flag: 'gb' },
    { code: 'BND', symbol: '$', name: "Brunei Dollar", flag: 'bn' },
    { code: 'BGN', symbol: 'лв', name: "Bulgarian Lev", flag: 'bg' },
    { code: 'BIF', symbol: 'FBu', name: "Burundian Franc", flag: 'bi' },
    { code: 'KHR', symbol: '៛', name: "Cambodian Riel", flag: 'kh' },
    { code: 'CAD', symbol: '$', name: "Canadian Dollar", flag: 'ca' },
    { code: 'CVE', symbol: '$', name: "Cape Verdean Escudo", flag: 'cv' },
    { code: 'KYD', symbol: '$', name: "Cayman Islands Dollar", flag: 'ky' },
    { code: 'XAF', symbol: 'FCFA', name: "Central African CFA Franc", flag: 'cf' },
    { code: 'CLP', symbol: '$', name: "Chilean Peso", flag: 'cl' },
    { code: 'CNY', symbol: '¥', name: "Chinese Yuan", flag: 'cn' },
    { code: 'COP', symbol: '$', name: "Colombian Peso", flag: 'co' },
    { code: 'KMF', symbol: 'CF', name: "Comorian Franc", flag: 'km' },
    { code: 'CDF', symbol: 'FC', name: "Congolese Franc", flag: 'cd' },
    { code: 'CRC', symbol: '₡', name: "Costa Rican Colón", flag: 'cr' },
    { code: 'HRK', symbol: 'kn', name: "Croatian Kuna", flag: 'hr' },
    { code: 'CUP', symbol: '$', name: "Cuban Peso", flag: 'cu' },
    { code: 'CZK', symbol: 'Kč', name: "Czech Koruna", flag: 'cz' },
    { code: 'DKK', symbol: 'kr', name: "Danish Krone", flag: 'dk' },
    { code: 'DJF', symbol: 'Fdj', name: "Djiboutian Franc", flag: 'dj' },
    { code: 'DOP', symbol: '$', name: "Dominican Peso", flag: 'do' },
    { code: 'XCD', symbol: '$', name: "East Caribbean Dollar", flag: 'ag' },
    { code: 'EGP', symbol: '£', name: "Egyptian Pound", flag: 'eg' },
    { code: 'ERN', symbol: 'Nfk', name: "Eritrean Nakfa", flag: 'er' },
    { code: 'SZL', symbol: 'L', name: "Eswatini Lilangeni", flag: 'sz' },
    { code: 'ETB', symbol: 'Br', name: "Ethiopian Birr", flag: 'et' },
    { code: 'EUR', symbol: '€', name: "Euro", flag: 'eu' },
    { code: 'FKP', symbol: '£', name: "Falkland Islands Pound", flag: 'fk' },
    { code: 'FJD', symbol: '$', name: "Fijian Dollar", flag: 'fj' },
    { code: 'GMD', symbol: 'D', name: "Gambian Dalasi", flag: 'gm' },
    { code: 'GEL', symbol: '₾', name: "Georgian Lari", flag: 'ge' },
    { code: 'GHS', symbol: '₵', name: "Ghanaian Cedi", flag: 'gh' },
    { code: 'GIP', symbol: '£', name: "Gibraltar Pound", flag: 'gi' },
    { code: 'GTQ', symbol: 'Q', name: "Guatemalan Quetzal", flag: 'gt' },
    { code: 'GGP', symbol: '£', name: "Guernsey Pound", flag: 'gg' },
    { code: 'GNF', symbol: 'FG', name: "Guinean Franc", flag: 'gn' },
    { code: 'GYD', symbol: '$', name: "Guyanese Dollar", flag: 'gy' },
    { code: 'HTG', symbol: 'G', name: "Haitian Gourde", flag: 'ht' },
    { code: 'HNL', symbol: 'L', name: "Honduran Lempira", flag: 'hn' },
    { code: 'HKD', symbol: '$', name: "Hong Kong Dollar", flag: 'hk' },
    { code: 'HUF', symbol: 'Ft', name: "Hungarian Forint", flag: 'hu' },
    { code: 'ISK', symbol: 'kr', name: "Icelandic Króna", flag: 'is' },
    { code: 'INR', symbol: '₹', name: "Indian Rupee", flag: 'in' },
    { code: 'IDR', symbol: 'Rp', name: "Indonesian Rupiah", flag: 'id' },
    { code: 'IRR', symbol: '﷼', name: "Iranian Rial", flag: 'ir' },
    { code: 'IQD', symbol: 'ع.د', name: "Iraqi Dinar", flag: 'iq' },
    { code: 'ILS', symbol: '₪', name: "Israeli New Shekel", flag: 'il' },
    { code: 'JMD', symbol: '$', name: "Jamaican Dollar", flag: 'jm' },
    { code: 'JPY', symbol: '¥', name: "Japanese Yen", flag: 'jp' },
    { code: 'JEP', symbol: '£', name: "Jersey Pound", flag: 'je' },
    { code: 'JOD', symbol: 'د.ا', name: "Jordanian Dinar", flag: 'jo' },
    { code: 'KZT', symbol: '₸', name: "Kazakhstani Tenge", flag: 'kz' },
    { code: 'KES', symbol: 'KSh', name: "Kenyan Shilling", flag: 'ke' },
    { code: 'KWD', symbol: 'د.ك', name: "Kuwaiti Dinar", flag: 'kw' },
    { code: 'KGS', symbol: 'с', name: "Kyrgyzstani Som", flag: 'kg' },
    { code: 'LAK', symbol: '₭', name: "Lao Kip", flag: 'la' },
    { code: 'LBP', symbol: 'ل.ل', name: "Lebanese Pound", flag: 'lb' },
    { code: 'LSL', symbol: 'L', name: "Lesotho Loti", flag: 'ls' },
    { code: 'LRD', symbol: '$', name: "Liberian Dollar", flag: 'lr' },
    { code: 'LYD', symbol: 'ل.د', name: "Libyan Dinar", flag: 'ly' },
    { code: 'MOP', symbol: 'P', name: "Macanese Pataca", flag: 'mo' },
    { code: 'MKD', symbol: 'ден', name: "Macedonian Denar", flag: 'mk' },
    { code: 'MGA', symbol: 'Ar', name: "Malagasy Ariary", flag: 'mg' },
    { code: 'MWK', symbol: 'MK', name: "Malawian Kwacha", flag: 'mw' },
    { code: 'MYR', symbol: 'RM', name: "Malaysian Ringgit", flag: 'my' },
    { code: 'MVR', symbol: 'Rf', name: "Maldivian Rufiyaa", flag: 'mv' },
    { code: 'MRU', symbol: 'UM', name: "Mauritanian Ouguiya", flag: 'mr' },
    { code: 'MUR', symbol: '₨', name: "Mauritian Rupee", flag: 'mu' },
    { code: 'MXN', symbol: '$', name: "Mexican Peso", flag: 'mx' },
    { code: 'MDL', symbol: 'L', name: "Moldovan Leu", flag: 'md' },
    { code: 'MNT', symbol: '₮', name: "Mongolian Tögrög", flag: 'mn' },
    { code: 'MAD', symbol: 'د.م.', name: "Moroccan Dirham", flag: 'ma' },
    { code: 'MZN', symbol: 'MT', name: "Mozambican Metical", flag: 'mz' },
    { code: 'MMK', symbol: 'Ks', name: "Myanmar Kyat", flag: 'mm' },
    { code: 'NAD', symbol: '$', name: "Namibian Dollar", flag: 'na' },
    { code: 'NPR', symbol: '₨', name: "Nepalese Rupee", flag: 'np' },
    { code: 'ANG', symbol: 'NAƒ', name: "Netherlands Antillean Guilder", flag: 'cw' },
    { code: 'TWD', symbol: 'NT$', name: "New Taiwan Dollar", flag: 'tw' },
    { code: 'NZD', symbol: '$', name: "New Zealand Dollar", flag: 'nz' },
    { code: 'NIO', symbol: 'C$', name: "Nicaraguan Córdoba", flag: 'ni' },
    { code: 'NGN', symbol: '₦', name: "Nigerian Naira", flag: 'ng' },
    { code: 'KPW', symbol: '₩', name: "North Korean Won", flag: 'kp' },
    { code: 'NOK', symbol: 'kr', name: "Norwegian Krone", flag: 'no' },
    { code: 'OMR', symbol: 'ر.ع.', name: "Omani Rial", flag: 'om' },
    { code: 'PKR', symbol: '₨', name: "Pakistani Rupee", flag: 'pk' },
    { code: 'PAB', symbol: 'B/.', name: "Panamanian Balboa", flag: 'pa' },
    { code: 'PGK', symbol: 'K', name: "Papua New Guinean Kina", flag: 'pg' },
    { code: 'PYG', symbol: '₲', name: "Paraguayan Guaraní", flag: 'py' },
    { code: 'PEN', symbol: 'S/', name: "Peruvian Sol", flag: 'pe' },
    { code: 'PHP', symbol: '₱', name: "Philippine Peso", flag: 'ph' },
    { code: 'PLN', symbol: 'zł', name: "Polish Zloty", flag: 'pl' },
    { code: 'QAR', symbol: 'ر.ق', name: "Qatari Riyal", flag: 'qa' },
    { code: 'RON', symbol: 'lei', name: "Romanian Leu", flag: 'ro' },
    { code: 'RUB', symbol: '₽', name: "Russian Ruble", flag: 'ru' },
    { code: 'RWF', symbol: 'FRw', name: "Rwandan Franc", flag: 'rw' },
    { code: 'SHP', symbol: '£', name: "Saint Helena Pound", flag: 'sh' },
    { code: 'SVC', symbol: '₡', name: "Salvadoran Colón", flag: 'sv' },
    { code: 'WST', symbol: 'T', name: "Samoan Tala", flag: 'ws' },
    { code: 'STN', symbol: 'Db', name: "Sao Tome and Principe Dobra", flag: 'st' },
    { code: 'SAR', symbol: 'ر.س', name: "Saudi Riyal", flag: 'sa' },
    { code: 'RSD', symbol: 'дин.', name: "Serbian Dinar", flag: 'rs' },
    { code: 'SCR', symbol: '₨', name: "Seychellois Rupee", flag: 'sc' },
    { code: 'SLL', symbol: 'Le', name: "Sierra Leonean Leone", flag: 'sl' },
    { code: 'SGD', symbol: '$', name: "Singapore Dollar", flag: 'sg' },
    { code: 'SBD', symbol: '$', name: "Solomon Islands Dollar", flag: 'sb' },
    { code: 'SOS', symbol: 'Sh.', name: "Somali Shilling", flag: 'so' },
    { code: 'ZAR', symbol: 'R', name: "South African Rand", flag: 'za' },
    { code: 'KRW', symbol: '₩', name: "South Korean Won", flag: 'kr' },
    { code: 'SSP', symbol: '£', name: "South Sudanese Pound", flag: 'ss' },
    { code: 'LKR', symbol: '₨', name: "Sri Lankan Rupee", flag: 'lk' },
    { code: 'SDG', symbol: 'ج.س.', name: "Sudanese Pound", flag: 'sd' },
    { code: 'SRD', symbol: '$', name: "Surinamese Dollar", flag: 'sr' },
    { code: 'SEK', symbol: 'kr', name: "Swedish Krona", flag: 'se' },
    { code: 'CHF', symbol: 'Fr', name: "Swiss Franc", flag: 'ch' },
    { code: 'SYP', symbol: '£', name: "Syrian Pound", flag: 'sy' },
    { code: 'TJS', symbol: 'SM', name: "Tajikistani Somoni", flag: 'tj' },
    { code: 'TZS', symbol: 'Sh', name: "Tanzanian Shilling", flag: 'tz' },
    { code: 'THB', symbol: '฿', name: "Thai Baht", flag: 'th' },
    { code: 'TOP', symbol: 'T$', name: "Tongan Pa'anga", flag: 'to' },
    { code: 'TTD', symbol: '$', name: "Trinidad and Tobago Dollar", flag: 'tt' },
    { code: 'TND', symbol: 'د.ت', name: "Tunisian Dinar", flag: 'tn' },
    { code: 'TRY', symbol: '₺', name: "Turkish Lira", flag: 'tr' },
    { code: 'TMT', symbol: 'm', name: "Turkmenistani Manat", flag: 'tm' },
    { code: 'UGX', symbol: 'Ush', name: "Ugandan Shilling", flag: 'ug' },
    { code: 'UAH', symbol: '₴', name: "Ukrainian Hryvnia", flag: 'ua' },
    { code: 'AED', symbol: 'د.إ', name: "United Arab Emirates Dirham", flag: 'ae' },
    { code: 'UYU', symbol: '$', name: "Uruguayan Peso", flag: 'uy' },
    { code: 'USD', symbol: '$', name: "US Dollar", flag: 'us' },
    { code: 'UZS', symbol: 'so\'m', name: "Uzbekistani Som", flag: 'uz' },
    { code: 'VUV', symbol: 'Vt', name: "Vanuatu Vatu", flag: 'vu' },
    { code: 'VES', symbol: 'Bs.', name: "Venezuelan Bolívar", flag: 've' },
    { code: 'VND', symbol: '₫', name: "Vietnamese Dong", flag: 'vn' },
    { code: 'XOF', symbol: 'CFA', name: "West African CFA Franc", flag: 'sn' },
    { code: 'YER', symbol: '﷼', name: "Yemeni Rial", flag: 'ye' },
    { code: 'ZMW', symbol: 'K', name: "Zambian Kwacha", flag: 'zm' },
    { code: 'ZWL', symbol: '$', name: "Zimbabwean Dollar", flag: 'zw' },
];

interface CurrencyComboboxProps {
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
}

export function CurrencyCombobox({ value, onValueChange, className }: CurrencyComboboxProps) {
    const [open, setOpen] = React.useState(false);

    const selectedCurrency = currencies.find((c) => c.code === value);

    const filterCurrency = (value: string, search: string) => {
        if (!search) return 1;
        const normalizedValue = value.toLowerCase();
        const normalizedSearch = search.toLowerCase();

        // The value format is "Name Code" (e.g., "Indian Rupee INR")
        const parts = normalizedValue.split(" ");
        const code = parts[parts.length - 1];

        // Priority 1: Exact code match
        if (code === normalizedSearch) return 1;

        // Priority 2: Code starts with search (e.g., "U" -> "USD")
        if (code.startsWith(normalizedSearch)) return 0.9;

        // Priority 3: Name starts with search
        if (normalizedValue.startsWith(normalizedSearch)) return 0.8;

        // Priority 4: Contains search term
        if (normalizedValue.includes(normalizedSearch)) return 0.7;

        return 0;
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'w-full justify-between h-9 text-sm font-normal',
                        !value && 'text-muted-foreground',
                        className
                    )}
                >
                    {selectedCurrency ? (
                        <div className="flex items-center gap-2 flex-grow overflow-hidden pr-1 text-left">
                            <Image
                                src={`https://flagcdn.com/w20/${selectedCurrency.flag.toLowerCase()}.png`}
                                width={18}
                                height={14}
                                alt={selectedCurrency.name}
                                className="object-contain flex-shrink-0"
                            />
                            <span className="whitespace-nowrap flex-shrink-0">{selectedCurrency.code} ({selectedCurrency.symbol})</span>
                        </div>
                    ) : (
                        <span className="flex-grow text-left">Select currency</span>
                    )}
                    <ChevronDown className={cn(
                        "h-3 w-3 shrink-0 opacity-40 transition-transform duration-200",
                        open && "rotate-180"
                    )} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
                <Command filter={filterCurrency}>
                    <CommandInput placeholder="Search currency..." />
                    <CommandList>
                        <CommandEmpty>No currency found.</CommandEmpty>
                        <CommandGroup>
                            {currencies.map((currency) => (
                                <CommandItem
                                    key={currency.code}
                                    value={currency.name + " " + currency.code}
                                    onSelect={() => {
                                        onValueChange(currency.code);
                                        setOpen(false);
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={`https://flagcdn.com/w20/${currency.flag.toLowerCase()}.png`}
                                            width={20}
                                            height={15}
                                            alt={currency.name}
                                            className="object-contain"
                                        />
                                        <span>{currency.code}</span>
                                        <span className="text-muted-foreground text-xs">({currency.symbol})</span>
                                        <span className="text-muted-foreground text-xs ml-auto truncate max-w-[80px]">{currency.name}</span>
                                    </div>
                                    <Check
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            value === currency.code ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
