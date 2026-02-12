"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, MessageSquare, ArrowRight } from "lucide-react"
import { productConfig } from "@/config/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { fadeUpVariant } from "@/lib/framer-animations"
import { cn } from "@/lib/utils"
import React from "react"

export default function ContactSection() {
  const [hasMounted, setHasMounted] = useState(false);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Construct mailto link
    const subject = formState.subject || "Inquiry via Website";
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
    const mailtoLink = `mailto:${productConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-16">

          {/* Left Column: Heading & Info */}
          <div className="md:w-5/12 pt-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4" />
                <span>Contact Us</span>
              </div>

              <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Let&apos;s start a conversation
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed mb-12">
                Have questions about enterprise plans, custom scraping needs, or just want to say hello? We&apos;re ready to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                    <p className="text-slate-500 text-sm mb-2">Typically replies in 2 hours</p>
                    <a href={`mailto:${productConfig.contact.email}`} className="text-blue-600 font-medium hover:underline">
                      {productConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office</h3>
                    <p className="text-slate-500 text-sm">
                      {productConfig.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="md:w-7/12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
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
                    placeholder="How can we help?"
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
                    placeholder="Tell us about your project..."
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Have a question or need a custom solution? We&apos;re here to help.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}