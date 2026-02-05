"use client";

import { Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { productConfig } from "@/config/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { staggerContainer, staggerItem, fadeUpVariant } from "@/lib/framer-animations";
import { SectionHeading } from "@/components/ui/section-heading";

const priceTransition = {
  type: "tween",
  duration: 0.20,
  ease: "easeOut",
};

const pricingData = {
  heading: "Simple Pricing for Any Scale",
  subheading: "Start for free on your local machine. Upgrade for cloud power and scale.",
  yearlyDiscount: "20%",
  image: null,
  plans: [
    {
      name: "Free",
      description: "For individuals and hobbyists",
      monthly: {
        price: "Free",
        ctaurl: "/install",
      },
      yearly: {
        price: "Free",
        ctaurl: "/install",
      },
      features: [
        "1,000 credits / month",
        "Local Browser Scraping",
        "CSV & JSON Export",
        "Community Support",
      ],
      ctaText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "For power users and small teams",
      monthly: {
        price: "$29",
        ctaurl: "#",
      },
      yearly: {
        price: "$290",
        ctaurl: "#",
      },
      features: [
        "50,000 credits / month",
        "Cloud Scraper & Scheduling",
        "Advanced Exports",
        "Premium Proxy Rotation",
      ],
      ctaText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      description: "For high volume extraction",
      monthly: {
        price: "$99",
        ctaurl: "/contact",
      },
      yearly: {
        price: "$990",
        ctaurl: "/contact",
      },
      features: [
        "500,000 credits / month",
        "API Access & Webhooks",
        "Priority Email Support",
        "Custom Retries & JS Rendering",
      ],
      ctaText: "Contact Sales",
      popular: false,
    },
  ],
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const { product } = productConfig;
  const hasImage = Boolean(pricingData.image);

  return (
    <section id="pricing" className="py-16 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <SectionHeading
          title={pricingData.heading}
          description={pricingData.subheading}
          dividerColor="primary"
          className="mb-16"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex items-center space-x-4 bg-muted p-1 rounded-lg mb-3 relative">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  !isYearly
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all relative",
                  isYearly
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Yearly
                <span className="absolute -top-7 right-0 sm:-right-4 bg-green-600 text-white text-xs font-medium px-2 py-1.5 rounded-full shadow-md transform rotate-10 whitespace-nowrap">
                  {pricingData.yearlyDiscount} OFF
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pricingData.plans.map((plan, index) => {
            const planData = isYearly ? plan.yearly : plan.monthly;

            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex"
              >
                <Card
                  className={cn(
                    "flex flex-col w-full transition-all duration-300 relative bg-white overflow-hidden",
                    plan.popular
                      ? "border-blue-200 shadow-xl shadow-blue-900/5 scale-105 z-10"
                      : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
                  )}

                  {plan.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold border border-blue-100">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader className="pb-4 pt-8">
                    <CardTitle className="font-heading text-xl font-bold leading-tight mb-2 text-slate-900">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500 font-normal mb-6 min-h-[40px]">
                      {plan.description}
                    </CardDescription>

                    <div className="h-14 flex items-end">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${plan.name}-${isYearly ? "yearly" : "monthly"}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={priceTransition}
                          className="flex items-baseline gap-1"
                        >
                          <span className="text-4xl font-bold text-slate-900 tracking-tight">
                            {planData.price}
                          </span>
                          {planData.price !== "Free" &&
                            planData.price !== "Custom" && (
                              <span className="text-slate-500 font-medium text-sm">
                                /{isYearly ? "year" : "month"}
                              </span>
                            )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow py-6">
                    <div className="w-full h-px bg-slate-100 mb-6" />
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className={cn(
                            "rounded-full p-1 mr-3 shrink-0 mt-0.5",
                            plan.popular ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
                          )}>
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </div>
                          <span className="text-sm text-slate-700 font-medium leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-2 pb-8">
                    <Button
                      asChild
                      size="lg"
                      variant={plan.popular ? "default" : "outline"}
                      className={cn(
                        "w-full h-12 rounded-xl font-semibold text-sm transition-all duration-300",
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
                          : "border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 hover:bg-white"
                      )}
                    >
                      <Link href={planData.ctaurl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        {plan.ctaText}
                        {plan.popular && <ArrowRight className="w-4 h-4" />}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
