'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

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

const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: 'us' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: 'eu' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: 'gb' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: 'in' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: 'au' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: 'ca' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: 'jp' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: 'cn' },
    { code: 'AED', symbol: 'AED', name: 'UAE Dirham', flag: 'ae' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: 'sg' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', flag: 'hk' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', flag: 'ch' },
    { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', flag: 'mx' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: 'br' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won', flag: 'kr' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble', flag: 'ru' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: 'za' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', flag: 'se' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', flag: 'no' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone', flag: 'dk' },
    { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', flag: 'pl' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht', flag: 'th' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', flag: 'id' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', flag: 'my' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso', flag: 'ph' },
    { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', flag: 'vn' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira', flag: 'tr' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', flag: 'sa' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', flag: 'nz' },
    { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', flag: 'eg' },
    { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', flag: 'pk' },
    { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', flag: 'bd' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: 'ng' },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', flag: 'ke' },
];

interface CurrencyComboboxProps {
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
}

export function CurrencyCombobox({ value, onValueChange, className }: CurrencyComboboxProps) {
    const [open, setOpen] = React.useState(false);

    const selectedCurrency = currencies.find((c) => c.code === value);

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
                        <div className="flex items-center gap-2">
                            <img
                                src={`https://flagcdn.com/w20/${selectedCurrency.flag.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${selectedCurrency.flag.toLowerCase()}.png 2x`}
                                width="20"
                                alt={selectedCurrency.name}
                                className="object-contain"
                            />
                            <span>{selectedCurrency.code} ({selectedCurrency.symbol})</span>
                        </div>
                    ) : (
                        'Select currency'
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
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
                                        <img
                                            src={`https://flagcdn.com/w20/${currency.flag.toLowerCase()}.png`}
                                            srcSet={`https://flagcdn.com/w40/${currency.flag.toLowerCase()}.png 2x`}
                                            width="20"
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
