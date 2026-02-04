import { Metadata } from "next"
import ContactSection from "@/components/sections/contact-section"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team. We're here to help with any questions about our product.",
  keywords: ['contact', 'support', 'inquiries', 'help', 'customer service']
}

export default function ContactPage() {
  return (
    <div className="py-5">
    {/* //   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="max-w-3xl mx-auto text-center mb-16">
    //       <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
    //       <p className="mt-4 text-lg text-muted-foreground">
    //         Have questions or need assistance? Get in touch with our team and we'll be happy to help.
    //       </p>
    //     </div>
    //   </div> */}
      
      <ContactSection />
    </div>
  )
}