"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin } from "lucide-react"
import { productConfig } from "@/config/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { staggerContainer, listItemVariant, fadeUpVariant } from "@/lib/framer-animations"
import { SectionHeading } from "@/components/ui/section-heading"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import React from "react"

export default function ContactSection() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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
    setIsSubmitting(true);
    setSubmitStatus(null); // Reset status on new submission

    try {
      // Execute reCAPTCHA v3
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded. Please refresh the page and try again.');
      }

      const recaptchaToken = await executeRecaptcha('contact_form');
      
      if (!recaptchaToken) {
        throw new Error('Failed to generate reCAPTCHA token. Please try again.');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || process.env.NEXT_PUBLIC_CONTACT_SUBJECT || "General Inquiry",
          message: formState.message,
          recaptchaToken: recaptchaToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      setSubmitStatus({
        success: true,
        message: "Request sent successfully! We'll get back to you soon."
      });
      
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error: any) {
      setSubmitStatus({
        success: false,
        message: error.message || "Failed to send message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
          <section id="contact" className="py-16 relative overflow-x-hidden overflow-y-visible">
      {/* Premium Grid Pattern - Similar to hero */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 100% 60% at 50% 50%, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 60% at 50% 50%, black 60%, transparent 100%)',
        }}
      />

      {/* Animated Gradient Orbs for Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/6 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Mesh Gradient Overlay */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/15 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(59, 130, 246, 0.08) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(99, 102, 241, 0.06) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(59, 130, 246, 0.04) 0px, transparent 50%)
          `,
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title={productConfig.contact.heading}
          description={productConfig.contact.subheading}
          dividerColor="primary"
          className="mb-16"
        />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject"
                  name="subject"
                  placeholder="General Inquiry"
                  value={formState.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button 
                type="submit" 
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
              
              {submitStatus && (
                <div className={`text-sm ${submitStatus.success ? 'text-green-600 font-semibold' : 'text-red-600'}`}>
                  {submitStatus.message}
                </div>
              )}
            </div>
          </form>
          
          {/* Contact Info Below Form */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600">
              <a 
                href={`mailto:${productConfig.contact.email}`} 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {productConfig.contact.email}
              </a>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{productConfig.contact.address}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}