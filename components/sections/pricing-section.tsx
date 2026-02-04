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
        "Google Sheets Sync",
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
                    "flex flex-col w-full border border-slate-200 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md relative bg-white",
                    plan.popular && "border-primary/40"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="font-heading text-lg font-semibold leading-[1.2] mb-2 text-slate-700">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600 font-normal leading-[1.5] mb-4">
                      {plan.description}
                    </CardDescription>
                    <div className="h-14 flex items-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${plan.name}-${isYearly ? "yearly" : "monthly"}`}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={priceTransition}
                          className="flex items-baseline"
                        >
                          <span className="text-4xl text-primary font-heading">
                            {planData.price}
                          </span>
                          {planData.price !== "Free" &&
                            planData.price !== "Custom" && (
                              <span className="text-sm text-slate-500 ml-1">
                                /{isYearly ? "year" : "month"}
                              </span>
                            )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {/* {isYearly &&
                      plan.yearly.price !== "Free" &&
                      plan.yearly.price !== "Custom" &&
                      plan.monthly.price !== "Free" &&
                      plan.monthly.price !== "Custom" && (
                        <div className="mt-1 text-sm text-muted-foreground">
                          $
                          {Math.round(
                            Number(plan.yearly.price.replace("$", "")) / 12
                          )}{" "}
                          per month
                        </div>
                      )} */}
                  </CardHeader>
                  <CardContent className="flex-grow py-4">
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-600 font-normal leading-[1.5]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    {plan.popular ? (
                      <Button
                        asChild
                        size="lg"
                        className="relative group w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 border-0 rounded-xl overflow-hidden"
                      >
                        <Link href={planData.ctaurl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <span className="relative z-10">{plan.ctaText}</span>
                          <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className={cn(
                          "w-full h-12 border-2 border-slate-300 hover:border-blue-400 bg-white hover:bg-blue-50/50 text-slate-700 hover:text-blue-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300",
                          plan.ctaText === "Contact Sales" && "hover:border-slate-400 hover:bg-slate-50/50 hover:text-slate-800"
                        )}
                      >
                        <Link href={planData.ctaurl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          {plan.ctaText}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    )}
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
