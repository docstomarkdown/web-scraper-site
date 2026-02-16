"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components";
import { Clock, Plus, Trash2, Calendar as CalendarIcon, Search, Check, Sun, Moon, MapPin, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type TimeZoneInfo = {
    id: string; // IANA ID: e.g. "America/New_York"
    name: string; // Display name: e.g. "New York"
    offset: number; // Current offset in minutes
    offsetStr: string; // e.g. "UTC-5"
    label: string; // Full label for search
};

// --- Helpers ---

// Get all supported IANA time zones and their details
const getTimeZones = (): TimeZoneInfo[] => {
    const ids = (Intl as any).supportedValuesOf("timeZone") as string[];
    const now = new Date();

    return ids.map(id => {
        const parts = id.split("/");
        const name = parts[parts.length - 1].replace(/_/g, " ");

        // Calculate offset
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: id,
            timeZoneName: "shortOffset"
        });
        const formatted = formatter.format(now);
        // Extract offset from something like "2/13/2026, GMT-5"
        // This is a bit flaky depending on locale, let's use a better way for offset

        const tzDate = new Date(now.toLocaleString("en-US", { timeZone: id }));
        const utcDate = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
        const offsetMinutes = (tzDate.getTime() - utcDate.getTime()) / 60000;

        const h = Math.floor(Math.abs(offsetMinutes) / 60);
        const m = Math.abs(offsetMinutes) % 60;
        const sign = offsetMinutes >= 0 ? "+" : "-";
        const offsetStr = `UTC${sign}${h}${m ? ":" + m : ""}`;

        return {
            id,
            name,
            offset: offsetMinutes,
            offsetStr,
            label: `${name} (${offsetStr}) ${id}`
        };
    }).sort((a, b) => a.name.localeCompare(b.name));
};

const formatTime = (minutesSinceMidnight: number) => {
    let h = Math.floor(minutesSinceMidnight / 60) % 24;
    let m = Math.floor(minutesSinceMidnight % 60);
    if (h < 0) h += 24;

    const ampm = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 || 12;
    const displayM = m.toString().padStart(2, "0");

    return `${displayH}:${displayM} ${ampm}`;
};

const getTimeOfDayStatus = (hour: number) => {
    if (hour >= 9 && hour < 17) return { label: "Business Hours", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", icon: Sun };
    if (hour >= 6 && hour < 9) return { label: "Morning", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", icon: Sun };
    if (hour >= 17 && hour < 22) return { label: "Evening", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", icon: Moon };
    return { label: "Off Hours", color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-200", icon: Moon };
};

export function TimeZonePlanner() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [baseTime, setBaseTime] = useState("09:00");
    const [baseZoneId, setBaseZoneId] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [compareZoneIds, setCompareZoneIds] = useState<string[]>(["UTC", "America/London", "Asia/Tokyo"]);

    const [allZones, setAllZones] = useState<TimeZoneInfo[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setAllZones(getTimeZones());
    }, []);

    const baseZone = useMemo(() => allZones.find(z => z.id === baseZoneId), [allZones, baseZoneId]);

    const calculateTargetTime = (targetId: string) => {
        if (!baseZone) return null;
        const targetZone = allZones.find(z => z.id === targetId);
        if (!targetZone) return null;

        const [h, m] = baseTime.split(":").map(Number);
        const baseTotalMinutes = h * 60 + m;

        // Offset difference
        const diff = targetZone.offset - baseZone.offset;
        const targetTotalMinutes = baseTotalMinutes + diff;

        // Day offset
        let dayOffset = 0;
        let normalizedMinutes = targetTotalMinutes;

        if (targetTotalMinutes >= 1440) {
            dayOffset = 1;
            normalizedMinutes = targetTotalMinutes % 1440;
        } else if (targetTotalMinutes < 0) {
            dayOffset = -1;
            normalizedMinutes = 1440 + (targetTotalMinutes % 1440);
        }

        const targetHour = (Math.floor(normalizedMinutes / 60)) % 24;
        const status = getTimeOfDayStatus(targetHour);

        return {
            time: formatTime(normalizedMinutes),
            dayOffset,
            status,
            zone: targetZone
        };
    };

    const addZone = (id: string) => {
        if (!compareZoneIds.includes(id) && id !== baseZoneId) {
            setCompareZoneIds(prev => [...prev, id]);
        }
        setIsMenuOpen(false);
    };

    const removeZone = (id: string) => {
        setCompareZoneIds(prev => prev.filter(zid => zid !== id));
    };

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4">
            <div className="space-y-8">
                {/* Main Controls Card */}
                <Card className="border-none shadow-2xl bg-white overflow-visible">
                    <CardHeader className="bg-slate-900 text-white rounded-t-xl py-6">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-blue-400" />
                            <CardTitle className="text-lg font-bold">Base Meeting Details</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Date Picker */}
                            <div className="space-y-3">
                                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                    <CalendarIcon className="h-3 w-3" /> Selected Date
                                </Label>
                                <Input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="h-12 bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-lg font-medium"
                                />
                            </div>

                            {/* Base Time */}
                            <div className="space-y-3">
                                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                    <Clock className="h-3 w-3" /> Your Time
                                </Label>
                                <Input
                                    type="time"
                                    value={baseTime}
                                    onChange={(e) => setBaseTime(e.target.value)}
                                    className="h-12 bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-lg font-medium"
                                />
                            </div>

                            {/* Base Zone Search */}
                            <div className="space-y-3">
                                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                    <MapPin className="h-3 w-3" /> Your Location
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" className="w-full h-12 justify-between bg-slate-50 border-slate-200 hover:bg-slate-100 rounded-lg px-4 font-medium">
                                            {baseZone ? baseZone.name : "Select Zone..."}
                                            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0 shadow-2xl border-none">
                                        <Command>
                                            <CommandInput placeholder="Search city or country..." />
                                            <CommandList>
                                                <CommandEmpty>No location found.</CommandEmpty>
                                                <CommandGroup>
                                                    {allZones.map((zone) => (
                                                        <CommandItem
                                                            key={zone.id}
                                                            value={zone.label}
                                                            onSelect={() => setBaseZoneId(zone.id)}
                                                            className="py-3 px-4"
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4 text-blue-600", baseZoneId === zone.id ? "opacity-100" : "opacity-0")} />
                                                            <div className="flex flex-col">
                                                                <span className="font-bold">{zone.name}</span>
                                                                <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{zone.id} • {zone.offsetStr}</span>
                                                            </div>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Add Location Search Bar */}
                        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-slate-400 italic text-sm">
                                <Plus className="h-4 w-4" /> Add guests from other time zones to compare
                            </div>
                            <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                <PopoverTrigger asChild>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 px-8 h-12 rounded-full font-bold flex gap-2">
                                        <Globe className="h-4 w-4" /> Add Attendee Location
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0 shadow-2xl border-none">
                                    <Command>
                                        <CommandInput placeholder="Search city or country..." />
                                        <CommandList>
                                            <CommandEmpty>No location found.</CommandEmpty>
                                            <CommandGroup>
                                                {allZones.filter(z => z.id !== baseZoneId && !compareZoneIds.includes(z.id)).map((zone) => (
                                                    <CommandItem
                                                        key={zone.id}
                                                        value={zone.label}
                                                        onSelect={() => addZone(zone.id)}
                                                        className="py-3 px-4"
                                                    >
                                                        <Plus className="mr-2 h-4 w-4 text-slate-300" />
                                                        <div className="flex flex-col">
                                                            <span className="font-bold">{zone.name}</span>
                                                            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{zone.id} • {zone.offsetStr}</span>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>

                {/* Attendee Grid */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <ArrowRight className="h-5 w-5 text-blue-500" /> Attendee Times
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {compareZoneIds.map((zoneId) => {
                            const result = calculateTargetTime(zoneId);
                            if (!result) return null;

                            const StatusIcon = result.status.icon as React.ElementType;

                            return (
                                <FadeIn key={zoneId}>
                                    <ResultFeedbackCard
                                        variant="compact"
                                        title={result.zone.name}
                                        titleLabel={
                                            <>
                                                <StatusIcon className="h-3 w-3" />
                                                {result.status.label}
                                            </>
                                        }
                                        labelClassName={cn(
                                            "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide",
                                            result.status.bg,
                                            result.status.color,
                                            "border",
                                            result.status.border
                                        )}
                                        className={cn(
                                            "group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl",
                                            result.status.bg, // Apply background tint to whole card
                                            result.status.border
                                        )}
                                        mainValue={
                                            <div className="flex items-baseline gap-2">
                                                <span>{result.time}</span>
                                                {result.dayOffset !== 0 && (
                                                    <span className={cn("text-sm font-bold px-2 py-0.5 rounded-full align-middle ml-2",
                                                        result.dayOffset > 0 ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                                                    )}>
                                                        {result.dayOffset > 0 ? "+1d" : "-1d"}
                                                    </span>
                                                )}
                                            </div>
                                        }
                                    >
                                        <button
                                            onClick={() => removeZone(zoneId)}
                                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/80 hover:text-red-500 rounded-full text-slate-400"
                                            title="Remove Time Zone"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>

                                        {/* Metadata */}
                                        <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <Globe className="h-3.5 w-3.5 opacity-50" />
                                                <span>{result.zone.id.split('/')[0]}</span>
                                            </div>
                                            <div className="bg-white/50 px-2 py-1 rounded border border-slate-200/50 font-mono text-[10px]">
                                                {result.zone.offsetStr}
                                            </div>
                                        </div>
                                    </ResultFeedbackCard>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

