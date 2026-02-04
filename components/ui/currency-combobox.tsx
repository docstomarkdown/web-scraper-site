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
import { currencies } from '@/app/tools/_data/currencies';

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
