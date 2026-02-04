import Link from "next/link"
import Image from "next/image"
import { productConfig } from "@/config/product"
import { navigationConfig, siteConfig } from "@/config/site"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/ui/icons"

export default function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              {/* Favicon */}
              <Link href="/" className="flex items-center space-x-3">
                <Icons.logo className="w-8 h-8 flex-shrink-0" />
                <span className="text-2xl mt-2 font-heading text-slate-700">{productConfig.product.logoText}</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{productConfig.product.description}</p>
            <div className="flex space-x-4">
              {siteConfig.links.twitter && (
                <Link
                  href={siteConfig.links.twitter}
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              )}
              {siteConfig.links.youtube && (
                <Link
                  href={siteConfig.links.youtube}
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-youtube"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                  </svg>
                  <span className="sr-only">Youtube</span>
                </Link>
              )}
              {siteConfig.links.linkedin && (
                <Link
                  href={siteConfig.links.linkedin}
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-heading mb-4">Product</h3>
            <ul className="space-y-2">
              {navigationConfig.footerNav.product.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-heading mb-4 text-slate-700">Free Tools</h3>
            <ul className="space-y-2">
              {/* @ts-ignore */}
              {navigationConfig.footerNav.freeTools?.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              For more tools
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-heading mb-4">Legal</h3>
            <ul className="space-y-2">
              {navigationConfig.footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-sm text-muted-foreground text-center">
          Site owned and maintained by{""}
          <a
            href="https://www.thinksolv.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm underline underline-offset-4 text-primary px-2"
          >
            Thinksolv Technologies Private Limited.
          </a>
        </div>
      </div>
    </footer>
  )
}
