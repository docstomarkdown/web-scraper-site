"use client"

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

// NEXT_PUBLIC_ variables are embedded at build time in Next.js
// Make sure NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set in Vercel environment variables
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

export function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  // Always wrap with provider so hook context is available.
  // If key is missing, submit handler will show a config error.
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
