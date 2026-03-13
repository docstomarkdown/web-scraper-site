"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Image, List, ShoppingBag, Tags, FileSpreadsheet, FileJson, FileText, Table2, ScanLine } from "lucide-react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { fadeUpVariant } from "@/lib/framer-animations"
import React from "react"

export default function ContactSection() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [hasMounted, setHasMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage("")
    setErrorMessage("")

    if (!formState.name || !formState.email || !formState.message) {
      setErrorMessage("Please fill in your name, email, and message.")
      return
    }

    if (!executeRecaptcha) {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      if (!siteKey) {
        setErrorMessage("reCAPTCHA is not configured. Please contact support.")
      } else {
        setErrorMessage("reCAPTCHA is not ready yet. Please refresh and try again.")
      }
      return
    }

    setIsSubmitting(true)

    try {
      const captchaToken = await executeRecaptcha("contact_form_submit")

      if (!captchaToken) {
        setErrorMessage("CAPTCHA verification failed. Please try again.")
        return
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          subject: formState.subject || "Inquiry via Website",
          captcha: captchaToken,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send your message.")
      }

      setSuccessMessage("Thanks for reaching out. We usually respond within 12 hours.")
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send your message."
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  };

  const decorativeIcons = [
    { Icon: List, position: "left-[6%] top-[16%]", color: "text-blue-600", bg: "bg-blue-100/70", delay: 0.1, duration: 6.2, drift: -5 },
    { Icon: Image, position: "left-[14%] top-[38%]", color: "text-indigo-600", bg: "bg-indigo-100/70", delay: 0.5, duration: 6.8, drift: 6 },
    { Icon: Tags, position: "left-[9%] bottom-[20%]", color: "text-emerald-600", bg: "bg-emerald-100/70", delay: 0.9, duration: 7.1, drift: -4 },
    { Icon: FileSpreadsheet, position: "left-[18%] bottom-[32%]", color: "text-cyan-600", bg: "bg-cyan-100/70", delay: 0.3, duration: 6.6, drift: 5 },
    { Icon: ShoppingBag, position: "right-[8%] top-[18%]", color: "text-orange-600", bg: "bg-orange-100/70", delay: 0.4, duration: 6.4, drift: 5 },
    { Icon: Table2, position: "right-[14%] top-[38%]", color: "text-violet-600", bg: "bg-violet-100/70", delay: 0.8, duration: 7.0, drift: -6 },
    { Icon: FileJson, position: "right-[10%] bottom-[18%]", color: "text-rose-600", bg: "bg-rose-100/70", delay: 1.1, duration: 6.9, drift: 4 },
    { Icon: FileText, position: "right-[20%] bottom-[30%]", color: "text-slate-600", bg: "bg-slate-100/70", delay: 0.6, duration: 6.5, drift: -5 },
    { Icon: ScanLine, position: "left-[24%] top-[10%]", color: "text-teal-600", bg: "bg-teal-100/70", delay: 0.2, duration: 7.3, drift: 4 },
    { Icon: Image, position: "right-[24%] top-[10%]", color: "text-fuchsia-600", bg: "bg-fuchsia-100/70", delay: 1.0, duration: 7.2, drift: -4 },
  ] as const

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.6) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="hidden md:block absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl" />
        <div className="hidden md:block absolute -right-20 bottom-16 h-64 w-64 rounded-full bg-indigo-200/25 blur-3xl" />
        {decorativeIcons.map(({ Icon, position, color, bg, delay, duration, drift }, idx) => (
          <motion.div
            key={idx}
            className={`hidden lg:flex absolute ${position} h-10 w-10 items-center justify-center rounded-xl border border-slate-200/60 ${bg} ${color} shadow-sm backdrop-blur-sm`}
            initial={{ opacity: 0.32, y: 0 }}
            animate={{ opacity: [0.24, 0.42, 0.24], y: [0, drift, 0] }}
            transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon className="h-4 w-4" />
          </motion.div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="text-center mb-7"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Contact Web Scraper
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Questions about setup, exports, billing, or scraping issues? Send us a message and we&apos;ll help you quickly.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="relative bg-white/95 p-8 md:p-10 rounded-3xl shadow-[0_20px_55px_-18px_rgba(30,41,59,0.22)] border border-slate-100 ring-1 ring-white/70"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-slate-700">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Issue, question, or feedback"
                    value={formState.subject}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-700">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what you need help with..."
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    We usually respond within 12 hours.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {successMessage ? (
                    <p className="max-w-[85%] leading-normal text-emerald-700 text-sm sm:text-base">
                      {successMessage}
                    </p>
                  ) : null}
                  {errorMessage ? (
                    <p className="max-w-[85%] leading-normal text-red-600 text-sm sm:text-base">
                      {errorMessage}
                    </p>
                  ) : null}
                </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}