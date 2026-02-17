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

// --- Constants ---
const PRIORITY_ZONES = [
    "America/New_York", "America/Los_Angeles", "America/Chicago",
    "Europe/London", "Europe/Berlin", "Asia/Shanghai",
    "Asia/Kolkata", "Asia/Dubai", "Australia/Sydney", "Asia/Singapore"
];

const COUNTRY_MAP: Record<string, string> = {
    "America/New_York": "United States", "America/Los_Angeles": "United States", "America/Chicago": "United States", "America/Denver": "United States", "America/Phoenix": "United States", "America/Anchorage": "United States", "Pacific/Honolulu": "United States",
    "Europe/London": "United Kingdom",
    "Asia/Shanghai": "China", "Asia/Urumqi": "China",
    "Asia/Kolkata": "India",
    "America/Toronto": "Canada", "America/Vancouver": "Canada", "America/Edmonton": "Canada", "America/Winnipeg": "Canada", "America/Halifax": "Canada",
    "Australia/Sydney": "Australia", "Australia/Melbourne": "Australia", "Australia/Brisbane": "Australia", "Australia/Adelaide": "Australia", "Australia/Perth": "Australia",
    "Europe/Berlin": "Germany",
    "Europe/Paris": "France",
    "Asia/Tokyo": "Japan",
    "Asia/Singapore": "Singapore",
    "Asia/Dubai": "United Arab Emirates",
    "Europe/Moscow": "Russia",
    "America/Sao_Paulo": "Brazil",
    "Asia/Seoul": "South Korea",
    "Asia/Calcutta": "India", // Important: Many systems still use Calcutta
    "Asia/Colombo": "Sri Lanka",
    "Asia/Dhaka": "Bangladesh",
    "Asia/Karachi": "Pakistan",
    "Asia/Kathmandu": "Nepal",
    "Asia/Thimphu": "Bhutan",
    "Asia/Rangoon": "Myanmar",
    "Asia/Bangkok": "Thailand",
    "Asia/Ho_Chi_Minh": "Vietnam",
    "Asia/Jakarta": "Indonesia",
    "Asia/Kuala_Lumpur": "Malaysia",
    "Asia/Manila": "Philippines",
    "Asia/Taipei": "Taiwan",
    "Europe/Amsterdam": "Netherlands",
    "Europe/Brussels": "Belgium",
    "Europe/Madrid": "Spain",
    "Europe/Rome": "Italy",
    "Europe/Zurich": "Switzerland",
    "Europe/Warsaw": "Poland",
    "Europe/Vienna": "Austria",
    "Europe/Stockholm": "Sweden",
    "Europe/Oslo": "Norway",
    "Europe/Copenhagen": "Denmark",
    "Europe/Helsinki": "Finland",
    "Europe/Dublin": "Ireland",
    "Europe/Lisbon": "Portugal",
    "Europe/Athens": "Greece",
    "Europe/Istanbul": "Turkey",
    "Africa/Cairo": "Egypt",
    "Africa/Johannesburg": "South Africa",
    "Africa/Lagos": "Nigeria",
    "Africa/Nairobi": "Kenya",
    "Pacific/Auckland": "New Zealand",
    "America/Mexico_City": "Mexico",
    "America/Bogota": "Colombia",
    "America/Lima": "Peru",
    "America/Santiago": "Chile",
    "America/Buenos_Aires": "Argentina"
};

const getCountryName = (id: string, region: string): string => {
    if (COUNTRY_MAP[id]) return COUNTRY_MAP[id];
    if (id.startsWith("US/") || id.startsWith("America/Indiana/") || id.startsWith("America/Kentucky/") || id.startsWith("America/North_Dakota/")) return "United States";
    if (id.startsWith("Canada/")) return "Canada";
    if (id.startsWith("Australia/")) return "Australia";
    if (id.startsWith("Brazil/")) return "Brazil";
    if (id.startsWith("Mexico/")) return "Mexico";
    return region; // Fallback to continent if specific country not found
};

const getCountryFlag = (countryName: string): string => {
    const flags: Record<string, string> = {
        "United States": "🇺🇸", "United Kingdom": "🇬🇧", "China": "🇨🇳", "India": "🇮🇳",
        "Canada": "🇨🇦", "Australia": "🇦🇺", "Germany": "🇩🇪", "France": "🇫🇷",
        "Japan": "🇯🇵", "Singapore": "🇸🇬", "United Arab Emirates": "🇦🇪", "Russia": "🇷🇺",
        "Brazil": "🇧🇷", "South Korea": "🇰🇷", "Mexico": "🇲🇽", "Spain": "🇪🇸",
        "Italy": "🇮🇹", "Netherlands": "🇳🇱", "Switzerland": "🇨🇭", "Sweden": "🇸🇪",
        "Poland": "🇵🇱", "Turkey": "🇹🇷", "Thailand": "🇹🇭", "Vietnam": "🇻🇳",
        "Indonesia": "🇮🇩", "Malaysia": "🇲🇾", "Philippines": "🇵🇭", "Taiwan": "🇹🇼",
        "South Africa": "🇿🇦", "Egypt": "🇪🇬", "Nigeria": "🇳🇬", "Kenya": "🇰🇪",
        "Argentina": "🇦🇷", "Chile": "🇨🇱", "Colombia": "🇨🇴", "Peru": "🇵🇪",
        "New Zealand": "🇳🇿", "Ireland": "🇮🇪", "Pakistan": "🇵🇰", "Bangladesh": "🇧🇩",
        "Sri Lanka": "🇱🇰", "Nepal": "🇳🇵", "Saudi Arabia": "🇸🇦", "Israel": "🇮🇱"
    };
    return flags[countryName] || "🌐";
};

// --- Types ---
type TimeZoneInfo = {
    id: string; // IANA ID: e.g. "America/New_York"
    name: string; // Display name: e.g. "New York"
    region: string; // Continent/Region
    country: string; // New field for grouping
    flag: string; // New: Emoji Flag
    isPriority?: boolean;
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
        const region = parts[0];
        const city = parts[parts.length - 1].replace(/_/g, " ");
        const country = getCountryName(id, region);
        const flag = getCountryFlag(country);

        const tzDate = new Date(now.toLocaleString("en-US", { timeZone: id }));
        const utcDate = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
        const offsetMinutes = (tzDate.getTime() - utcDate.getTime()) / 60000;

        const h = Math.floor(Math.abs(offsetMinutes) / 60);
        const m = Math.abs(offsetMinutes) % 60;
        const sign = offsetMinutes >= 0 ? "+" : "-";
        const offsetStr = `UTC${sign}${h}${m ? ":" + m : ""}`;

        return {
            id,
            name: city,
            region,
            country,
            flag,
            isPriority: PRIORITY_ZONES.includes(id),
            offset: offsetMinutes,
            offsetStr,
            label: `${flag} ${country} - ${city} (${offsetStr})`
        };
    }).sort((a, b) => {
        // 1. Priority first
        if (a.isPriority && !b.isPriority) return -1;
        if (!a.isPriority && b.isPriority) return 1;

        // 2. Country alphabetical
        const countryCompare = a.country.localeCompare(b.country);
        if (countryCompare !== 0) return countryCompare;

        // 3. City alphabetical
        return a.name.localeCompare(b.name);
    });
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
                <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="bg-slate-900 text-white p-6 border-b-0 space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-bold">Time Zone Planner</CardTitle>
                                <CardDescription className="text-slate-400 text-sm">Coordinate across borders with ease.</CardDescription>
                            </div>
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
                                    className="h-12 bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-lg font-bold text-slate-800"
                                />
                            </div>

                            {/* Base Time */}
                            <div className="space-y-3">
                                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                    <Clock className="h-3 w-3" /> Start Time
                                </Label>
                                <Input
                                    type="time"
                                    value={baseTime}
                                    onChange={(e) => setBaseTime(e.target.value)}
                                    className="h-12 bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-lg font-bold text-slate-800"
                                />
                            </div>

                            {/* Base Zone Search */}
                            <div className="space-y-3">
                                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                    <MapPin className="h-3 w-3" /> My Location
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" className="w-full h-12 justify-between bg-white border-slate-200 hover:bg-slate-50 rounded-lg px-4 font-bold text-slate-800 shadow-sm border-b-2">
                                            {baseZone ? baseZone.label : "Select Zone..."}
                                            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50 text-blue-500" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0 shadow-2xl border-none">
                                        <Command className="border border-slate-200">
                                            <CommandInput placeholder="Search country or city..." className="h-12" />
                                            <CommandList>
                                                <CommandEmpty>No location found.</CommandEmpty>
                                                <CommandGroup heading="E-commerce Hubs">
                                                    {allZones.filter(z => z.isPriority).map((zone) => (
                                                        <CommandItem
                                                            key={zone.id}
                                                            value={zone.label}
                                                            onSelect={() => setBaseZoneId(zone.id)}
                                                            className="py-3 px-4 aria-selected:bg-blue-50"
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4 text-blue-600", baseZoneId === zone.id ? "opacity-100" : "opacity-0")} />
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-slate-900">{zone.flag} {zone.country}</span>
                                                                <span className="text-xs text-slate-400 font-medium">{zone.name} • {zone.offsetStr}</span>
                                                            </div>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                                {Array.from(new Set(allZones.filter(z => !z.isPriority).map(z => z.country))).sort().map(country => (
                                                    <CommandGroup key={country} heading={country}>
                                                        {allZones.filter(z => !z.isPriority && z.country === country).map((zone) => (
                                                            <CommandItem
                                                                key={zone.id}
                                                                value={zone.label}
                                                                onSelect={() => setBaseZoneId(zone.id)}
                                                                className="py-3 px-4 aria-selected:bg-blue-50"
                                                            >
                                                                <Check className={cn("mr-2 h-4 w-4 text-blue-600", baseZoneId === zone.id ? "opacity-100" : "opacity-0")} />
                                                                <div className="flex flex-col">
                                                                    <span className="font-bold text-slate-900">{zone.flag} {zone.country}</span>
                                                                    <span className="text-xs text-slate-400 font-medium">{zone.name} • {zone.offsetStr}</span>
                                                                </div>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Add Location Search Bar */}
                        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-slate-400 font-medium text-sm italic">
                                💡 Tip: Add your supplier or VA's location to check their local status.
                            </div>
                            <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                <PopoverTrigger asChild>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200/50 px-8 h-12 rounded-xl font-bold flex gap-2 transition-all hover:scale-105 active:scale-95">
                                        <Plus className="h-4 w-4" /> Add City / Region
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0 shadow-2xl border border-slate-100">
                                    <Command>
                                        <CommandInput placeholder="Search country or city..." className="h-12" />
                                        <CommandList className="max-h-[300px] overflow-y-auto">
                                            <CommandEmpty>No location found.</CommandEmpty>
                                            <CommandGroup heading="E-commerce Hubs">
                                                {allZones.filter(z => z.isPriority && z.id !== baseZoneId && !compareZoneIds.includes(z.id)).map((zone) => (
                                                    <CommandItem
                                                        key={zone.id}
                                                        value={zone.label}
                                                        onSelect={() => addZone(zone.id)}
                                                        className="py-3 px-4 aria-selected:bg-blue-50 cursor-pointer"
                                                    >
                                                        <Plus className="mr-2 h-4 w-4 text-slate-300" />
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-slate-900">{zone.flag} {zone.country}</span>
                                                            <span className="text-xs text-slate-400 font-medium">{zone.name} • {zone.offsetStr}</span>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                            {Array.from(new Set(allZones.filter(z => !z.isPriority && z.id !== baseZoneId && !compareZoneIds.includes(z.id)).map(z => z.country))).sort().map(country => (
                                                <CommandGroup key={country} heading={country}>
                                                    {allZones.filter(z => !z.isPriority && z.country === country && z.id !== baseZoneId && !compareZoneIds.includes(z.id)).map((zone) => (
                                                        <CommandItem
                                                            key={zone.id}
                                                            value={zone.label}
                                                            onSelect={() => addZone(zone.id)}
                                                            className="py-3 px-4 aria-selected:bg-blue-50 cursor-pointer"
                                                        >
                                                            <Plus className="mr-2 h-4 w-4 text-slate-300" />
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-slate-900">{zone.flag} {zone.country}</span>
                                                                <span className="text-xs text-slate-400 font-medium">{zone.name} • {zone.offsetStr}</span>
                                                            </div>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>


                {/* Attendee Grid */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                                Availability Dashboard
                            </h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Status Tracking</p>
                        </div>
                        {compareZoneIds.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCompareZoneIds([])}
                                className="text-xs font-bold text-slate-500 hover:text-red-500 border-slate-200 bg-white"
                            >
                                Reset View
                            </Button>
                        )}
                    </div>

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
                                                <StatusIcon className="h-3.5 w-3.5" />
                                                {result.status.label}
                                            </>
                                        }
                                        labelClassName={cn(
                                            "flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider",
                                            result.status.bg,
                                            result.status.color,
                                            "border",
                                            result.status.border
                                        )}
                                        className={cn(
                                            "group transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl relative border-b-4 overflow-hidden",
                                            result.status.bg + "/30", // Lighter tint
                                            result.status.border
                                        )}
                                        mainValue={
                                            <div className="space-y-4">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-black tracking-tighter text-4xl text-slate-900">{result.time}</span>
                                                    {result.dayOffset !== 0 && (
                                                        <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-lg align-middle ml-2 shadow-sm border",
                                                            result.dayOffset > 0 ? "bg-amber-100 text-amber-600 border-amber-200" : "bg-blue-100 text-blue-600 border-blue-200"
                                                        )}>
                                                            {result.dayOffset > 0 ? "+1 DAY" : "-1 DAY"}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* 24h Timeline Visualizer */}
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                        <span>00:00</span>
                                                        <span>12:00</span>
                                                        <span>23:59</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-200/50 rounded-full flex overflow-hidden border border-slate-100/50">
                                                        {/* Morning (0-9) */}
                                                        <div className="h-full bg-slate-300/30 w-[37.5%]" />
                                                        {/* Business (9-17) */}
                                                        <div className="h-full bg-emerald-400/80 w-[33.3%]" />
                                                        {/* Night (17-24) */}
                                                        <div className="h-full bg-slate-400/50 w-[29.2%]" />
                                                    </div>
                                                    {/* Current Indicator Dot */}
                                                    <div className="relative w-full h-1">
                                                        {(() => {
                                                            const [h, m] = result.time.split(' ')[0].split(':').map(Number);
                                                            const ampm = result.time.split(' ')[1];
                                                            const hour24 = ampm === 'PM' ? (h === 12 ? 12 : h + 12) : (h === 12 ? 0 : h);
                                                            const pos = ((hour24 * 60 + m) / 1440) * 100;
                                                            return (
                                                                <div
                                                                    className="absolute top-[-8px] w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white shadow-md z-10 transition-all duration-1000"
                                                                    style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
                                                                />
                                                            );
                                                        })()}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <button
                                            onClick={() => removeZone(zoneId)}
                                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all p-2 bg-white/90 hover:bg-red-500 hover:text-white shadow-md rounded-xl text-slate-400 z-20 hover:scale-110 active:scale-90"
                                            title="Remove Time Zone"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>

                                        {/* Metadata */}
                                        <div className="mt-8 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-black text-slate-400">
                                                <MapPin className="h-3.5 w-3.5 opacity-40 text-blue-500" />
                                                <span className="uppercase tracking-widest">{result.zone.id.split('/')[0]}</span>
                                            </div>
                                            <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-200/60 font-black text-blue-600 text-[10px] shadow-sm tracking-tighter">
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

