"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
    value: Date | null | undefined;
    onChange: (date: Date) => void;
    label?: string;
    placeholder?: string;
    showTime?: boolean;
    className?: string;
    disabled?: boolean;
}

export function DatePicker({
    value,
    onChange,
    label,
    placeholder = "Pick a date",
    showTime = false,
    className,
    disabled = false,
}: DatePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
        value ? new Date(value) : undefined
    );
    const [selectedHour, setSelectedHour] = React.useState<string>(
        value ? value.getHours().toString().padStart(2, "0") : "00"
    );
    const [selectedMinute, setSelectedMinute] = React.useState<string>(
        value ? value.getMinutes().toString().padStart(2, "0") : "00"
    );

    // Update local state when value prop changes
    React.useEffect(() => {
        if (value) {
            const date = new Date(value);
            setSelectedDate(date);
            setSelectedHour(date.getHours().toString().padStart(2, "0"));
            setSelectedMinute(date.getMinutes().toString().padStart(2, "0"));
        } else {
            setSelectedDate(undefined);
            setSelectedHour("00");
            setSelectedMinute("00");
        }
    }, [value]);

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return;
        
        setSelectedDate(date);
        
        // If time is shown, preserve existing time or set to current time if not set
        if (showTime) {
            const newDate = new Date(date);
            // Use existing time if available, otherwise use current time
            if (selectedHour && selectedMinute) {
                newDate.setHours(parseInt(selectedHour, 10), parseInt(selectedMinute, 10));
            } else {
                const now = new Date();
                newDate.setHours(now.getHours(), now.getMinutes());
                setSelectedHour(now.getHours().toString().padStart(2, "0"));
                setSelectedMinute(now.getMinutes().toString().padStart(2, "0"));
            }
            onChange(newDate);
        } else {
            // For date-only, set time to start of day
            const newDate = new Date(date);
            newDate.setHours(0, 0, 0, 0);
            onChange(newDate);
        }
    };

    const handleTimeChange = (hour: string, minute: string) => {
        setSelectedHour(hour);
        setSelectedMinute(minute);
        
        if (selectedDate) {
            const newDate = new Date(selectedDate);
            newDate.setHours(parseInt(hour, 10), parseInt(minute, 10));
            onChange(newDate);
        }
    };

    const formatDisplayValue = () => {
        if (!value) return placeholder;
        
        if (showTime) {
            return format(value, "PPp"); // e.g., "Jan 15, 2024, 2:30 PM"
        } else {
            return format(value, "PP"); // e.g., "Jan 15, 2024"
        }
    };

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <Label className="text-[13px] font-semibold text-slate-700 mb-1">
                    {label}
                </Label>
            )}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "w-full h-10 justify-start text-left font-normal border-slate-200 hover:bg-slate-50 text-sm bg-white",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                        {formatDisplayValue()}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            initialFocus
                        />
                        
                        {showTime && selectedDate && (
                            <div className="border-t pt-3 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm font-medium text-slate-700">Time</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Select
                                        value={selectedHour}
                                        onValueChange={(val) => handleTimeChange(val, selectedMinute)}
                                    >
                                        <SelectTrigger className="w-20 h-9 text-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {hours.map((hour) => (
                                                <SelectItem key={hour} value={hour}>
                                                    {hour}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <span className="text-slate-400">:</span>
                                    <Select
                                        value={selectedMinute}
                                        onValueChange={(val) => handleTimeChange(selectedHour, val)}
                                    >
                                        <SelectTrigger className="w-20 h-9 text-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {minutes.map((minute) => (
                                                <SelectItem key={minute} value={minute}>
                                                    {minute}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
