"use client"

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

// NEXT_PUBLIC_ variables are embedded at build time in Next.js
// Make sure NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set in Vercel environment variables
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  if (!siteKey) {
    // Return children without reCAPTCHA provider if key is missing
    // This allows the app to still work, but reCAPTCHA won't function
    return <>{children}</>
  }
  
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
