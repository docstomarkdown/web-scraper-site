import Link from "next/link"
import { productConfig } from "@/config/product"
import { navigationConfig, siteConfig } from "@/config/site"
import { Icons } from "@/components/ui/icons"
import { Twitter, Youtube, Linkedin, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 py-16 border-t border-slate-200">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <Icons.logo className="w-8 h-8" />
              <span className="text-xl font-bold text-slate-900 tracking-tight">{productConfig.product.logoText}</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {productConfig.product.description}
            </p>
            <div className="flex gap-4">
              {siteConfig.links.twitter && (
                <Link href={siteConfig.links.twitter} target="_blank" className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all">
                  <Twitter className="w-4 h-4" />
                </Link>
              )}
              {siteConfig.links.youtube && (
                <Link href={siteConfig.links.youtube} target="_blank" className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 transition-all">
                  <Youtube className="w-4 h-4" />
                </Link>
              )}
              {siteConfig.links.linkedin && (
                <Link href={siteConfig.links.linkedin} target="_blank" className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-200 transition-all">
                  <Linkedin className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-6">Product</h3>
            <ul className="space-y-3 text-sm">
              {navigationConfig.footerNav.product.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-500 hover:text-blue-600 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Free Tools (Empty for now) */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-6">Free Tools</h3>
            <ul className="space-y-3 text-sm">
              {/* Pending content */}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              {navigationConfig.footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-500 hover:text-blue-600 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {productConfig.product.logoText}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
