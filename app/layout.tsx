import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { ReCaptchaProvider } from '@/components/recaptcha-provider'
import { ClarityProvider } from '@/components/clarity-provider'

const fontHeading = localFont({
  src: '../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s`,//| ${siteConfig.name}
  },
  description: siteConfig.metaDescription,
  keywords: ['software', 'product', 'business', 'solution', ...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@webscraperpro',
    site: '@webscraperpro',
  },
  // SEO SAFETY LOCK: This product must remain non-indexable by default.
  // Do not remove or relax noindex/nofollow unless the project owner explicitly asks for it.
  robots: {
    index: false,
    follow: false,
    /*googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },*/
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Force light theme before any rendering */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var root = document.documentElement;
                  root.classList.remove('dark');
                  root.style.colorScheme = 'light';
                  localStorage.setItem('theme', 'light');
                  if (window.matchMedia) {
                    window.matchMedia('(prefers-color-scheme: dark)').matches = false;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        {/* Microsoft Clarity — initialized via ClarityProvider in <body> */}
      </head>
      <body
        className={`${fontHeading.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ClarityProvider />
        <ThemeProvider>
          <ReCaptchaProvider>
            <TooltipProvider>
              <div className="relative flex min-h-screen flex-col">
                <div className="print:hidden">
                  <Header />
                </div>
                {children}
                <div className="print:hidden">
                  <Footer />
                </div>
              </div>
              <Toaster />
            </TooltipProvider>
          </ReCaptchaProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}