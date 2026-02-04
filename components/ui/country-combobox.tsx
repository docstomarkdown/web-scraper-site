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
import { countryCodes } from '@/app/tools/_data/countryCodes';

interface CountryComboboxProps {
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
}

export function CountryCombobox({ value, onValueChange, className }: CountryComboboxProps) {
    const [open, setOpen] = React.useState(false);

    const selectedCountry = countryCodes.find((c) => c.name === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'w-full justify-between h-9 text-sm mt-1.5 font-normal',
                        !value && 'text-muted-foreground',
                        className
                    )}
                >
                    {selectedCountry ? (
                        <div className="flex items-center gap-2">
                            <img
                                src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                                width="20"
                                alt={selectedCountry.code}
                                className="object-contain"
                            />
                            <span>{selectedCountry.name}</span>
                        </div>
                    ) : (
                        'Select country'
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {countryCodes.map((country) => (
                                <CommandItem
                                    key={country.code}
                                    value={country.name}
                                    onSelect={(currentValue) => {
                                        onValueChange(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                            srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                            width="20"
                                            alt={country.code}
                                            className="object-contain"
                                        />
                                        <span>{country.name}</span>
                                    </div>
                                    <Check
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            value === country.name ? 'opacity-100' : 'opacity-0'
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
