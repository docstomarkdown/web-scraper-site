"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { BookOpen, Lightbulb, ArrowRight } from "lucide-react"

const slides = [
    {
        number: 1,
        title: "The Illusion of High Margins",
        description: "You see a product at ₹500, sell it for ₹1,500. ₹1,000 profit! But this is gross margin—a dangerous illusion that ignores the real costs eating into your wallet.",
        content: (
            <div className="bg-slate-50 p-5 rounded-xl space-y-3 text-base border border-slate-100">
                <div className="flex justify-between"><span className="text-slate-500">Selling Price</span><span className="font-normal text-emerald-500">+₹1,500</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Product Cost</span><span className="font-normal text-red-400">–₹500</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Shipping</span><span className="font-normal text-red-400">–₹80</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Ad Cost (CPA)</span><span className="font-normal text-red-400">–₹200</span></div>
                <div className="flex justify-between pt-3 border-t border-slate-200 font-bold text-lg"><span>Real Profit</span><span className="text-emerald-500">₹720</span></div>
            </div>
        ),
        footer: (
            <p className="text-sm text-slate-500 mt-4 italic flex items-center gap-2">
                <ArrowRight className="h-4 w-4" /> But wait, there's more...
            </p>
        )
    },
    {
        number: 2,
        title: "The RTO Killer",
        subtitle: "Critical Pain Point",
        description: "In India's COD market, 15-30% of orders are rejected. Each RTO costs you:",
        content: (
            <>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-3 mb-4">
                    <div className="flex items-center justify-between text-base"><span className="text-slate-600">Forward Shipping</span><span className="font-normal text-red-400">–₹80</span></div>
                    <div className="flex items-center justify-between text-base"><span className="text-slate-600">Return Shipping</span><span className="font-normal text-red-400">–₹80</span></div>
                    <div className="flex items-center justify-between text-base"><span className="text-slate-600">Wasted Ad Spend</span><span className="font-normal text-red-400">–₹200</span></div>
                    <div className="flex items-center justify-between text-base"><span className="text-slate-600">Product Damage Risk</span><span className="font-normal text-red-400">–?</span></div>
                </div>
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
                    <p className="text-base font-semibold text-red-500">Total RTO Loss: –₹360+ per order</p>
                    <p className="text-sm text-slate-600 mt-1">2 RTOs in 10 orders = ₹720 gone before profit</p>
                </div>
            </>
        )
    },
    {
        number: 3,
        title: "ROAS vs. Reality",
        description: "Your ads show 3.5x ROAS. Sounds amazing! But ROAS ignores product costs, shipping, and RTOs—it only measures revenue versus ad spend.",
        content: (
            <>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">ROAS Shows</div>
                        <p className="text-base text-slate-700"><span className="text-blue-600 font-semibold">₹350</span> revenue per <span className="text-blue-600 font-semibold">₹100</span> ad spend</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Reality</div>
                        <p className="text-base text-slate-700">You keep only <span className="text-blue-600 font-semibold">₹50</span> of that <span className="text-blue-600 font-semibold">₹350</span></p>
                    </div>
                </div>
                <div className="flex items-start gap-3 bg-slate-100 p-4 rounded-xl">
                    <Lightbulb className="h-5 w-5 text-slate-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-600"><strong>Pro Tip:</strong> Aim for 4x+ ROAS after accounting for 20% RTO rate.</p>
                </div>
            </>
        )
    },
    {
        number: 4,
        title: "Your Break-Even Point",
        description: "Know the maximum CPA you can afford and still profit. This is your scaling limit.",
        content: (
            <>
                <div className="bg-slate-50 p-5 rounded-xl space-y-3 text-base border border-slate-100 mb-4">
                    <div className="flex justify-between"><span className="text-slate-500">Sales Price</span><span className="font-normal text-teal-500">+₹1,500</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">All Costs</span><span className="font-normal text-red-400">–₹612</span></div>
                    <div className="flex justify-between pt-3 border-t border-slate-200 font-bold text-lg"><span>Max CPA</span><span className="text-blue-600">₹888</span></div>
                </div>
                <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl text-center">
                    <p className="text-base text-slate-700">If your CPA is <span className="text-blue-600 font-semibold">₹200</span>, you have <span className="font-bold text-xl text-teal-600">₹688</span> profit margin to scale.</p>
                </div>
            </>
        )
    }
]

export function GuideCarousel() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <section>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
                <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700">
                    <BookOpen className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">The Hidden Truth About Dropshipping Profitability</h2>
                </div>
            </div>

            <Carousel className="w-full" opts={{ align: "center", loop: true }} setApi={setApi}>
                <CarouselContent className="-ml-2 md:-ml-4">
                    {slides.map((slide) => (
                        <CarouselItem key={slide.number} className="pl-2 md:pl-4 basis-[90%] md:basis-[85%]">
                            <Card className="border border-slate-200 shadow-sm bg-white h-full min-h-[420px]">
                                <CardContent className="p-8 md:p-10 h-full flex flex-col">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                                            {slide.number}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-slate-900">{slide.title}</h3>
                                            {slide.subtitle && (
                                                <span className="text-xs text-slate-500 font-normal uppercase tracking-wider">{slide.subtitle}</span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-base leading-relaxed mb-6">
                                        {slide.description}
                                    </p>
                                    {slide.content}
                                    {slide.footer}
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white border-0 shadow-lg h-12 w-12" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white border-0 shadow-lg h-12 w-12" />
                <div className="flex items-center justify-center gap-2 mt-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${current === index ? "bg-slate-800" : "bg-slate-300"
                                }`}
                            onClick={() => api?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    )
}
