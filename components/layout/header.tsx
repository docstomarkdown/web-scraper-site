"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { productConfig } from "@/config/product";
import { navigationConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileText, ShoppingCart, Box, Calculator, Banknote, Users, CheckSquare, Receipt, Package, Barcode, BookOpen } from "lucide-react";

// Map icon strings to components
const iconMap: Record<string, any> = {
  "receipt": Receipt,
  "shopping-cart": ShoppingCart,
  "box": Package, // Using Package for box to be more specific
  "calculator": Calculator,
  "banknote": Banknote,
  "users": Users,
  "check-square": CheckSquare,
  "book": BookOpen,
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-100",
        scrolled || !isHome
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Icons.logo className="w-8 h-8 flex-shrink-0" />
              <span className="text-2xl mt-2 font-heading text-slate-700">
                {productConfig.product.logoText}
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationConfig.mainNav.map((item: any) => {
              if (item.external) {
                // External link
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-slate-700 transition-colors hover:text-primary"
                  >
                    {item.title}
                  </a>
                );
              } else if (item.grouped && item.groups) {
                return (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger className="flex items-center text-base font-medium text-slate-700 transition-colors hover:text-primary outline-none">
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      sideOffset={12}
                      className={cn(
                        "p-6 shadow-3xl border-slate-100/50 bg-white/95 backdrop-blur-md ring-1 ring-slate-900/5 rounded-[32px]",
                        item.dropdownWidth || "w-[1000px]"
                      )}
                    >
                      <div className={cn(
                        "gap-8 space-y-8",
                        item.dropdownWidth ? "columns-1" : "columns-2 lg:columns-3"
                      )}>
                        {item.groups.map((group: any) => {
                          const IconComponent = iconMap[group.icon] || FileText;
                          return (
                            <div key={group.title} className="break-inside-avoid mb-6 last:mb-0">
                              <div className="group/section relative p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-sm transition-all duration-300">
                                {/* Floating accent line */}
                                <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-blue-500/0 group-hover/section:bg-blue-500 rounded-r-full transition-all duration-300" />

                                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100/80">
                                  <div className="p-2 rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-100 group-hover/section:scale-105 transition-all duration-300">
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <h4 className="font-semibold text-[14px] tracking-tight text-slate-700 cursor-default select-none">
                                    {group.title.split('. ')[1] || group.title}
                                  </h4>
                                </div>
                                <div className="space-y-0.5">
                                  {group.items.map((subItem: any) => (
                                    <DropdownMenuItem key={subItem.href} asChild>
                                      <Link
                                        href={subItem.href}
                                        className="block w-full cursor-pointer py-1.5 px-2 rounded-lg text-[13px] text-slate-500 font-medium hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                                      >
                                        {subItem.title}
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              } else if (item.items) {
                // Dropdown menu
                return (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger className="flex items-center text-base font-medium text-slate-700 transition-colors hover:text-primary outline-none">
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    {item.items.length > 12 ? (
                      <DropdownMenuContent
                        align="end"
                        sideOffset={12}
                        className="w-[800px] p-6 shadow-3xl border-slate-100/50 bg-white/95 backdrop-blur-md ring-1 ring-slate-900/5 rounded-[32px]"
                      >
                        <div className="grid grid-cols-3 gap-4">
                          {item.items.map((subItem: any) => (
                            <DropdownMenuItem key={subItem.href} asChild>
                              {subItem.external ? (
                                <a
                                  href={subItem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between w-full cursor-pointer py-2 px-3 rounded-lg text-sm text-slate-600 font-medium hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                                >
                                  <span>{subItem.title}</span>
                                  <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60" />
                                </a>
                              ) : (
                                <Link
                                  href={subItem.href}
                                  className="block w-full cursor-pointer py-2 px-3 rounded-lg text-sm text-slate-600 font-medium hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                                >
                                  {subItem.title}
                                </Link>
                              )}
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    ) : (
                      <DropdownMenuContent
                        align="end"
                        sideOffset={12}
                        className="w-[240px] p-2 shadow-3xl border-slate-100/50 bg-white/95 backdrop-blur-md ring-1 ring-slate-900/5 rounded-[20px]"
                      >
                        {item.items.map((subItem: any) => (
                          <DropdownMenuItem key={subItem.href} asChild>
                            {subItem.external ? (
                              <a
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full cursor-pointer py-2.5 px-3 rounded-xl text-[14px] text-slate-600 font-medium hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                              >
                                <span>{subItem.title}</span>
                                <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60" />
                              </a>
                            ) : (
                              <Link
                                href={subItem.href}
                                className="block w-full cursor-pointer py-2.5 px-3 rounded-xl text-[14px] text-slate-600 font-medium hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                              >
                                {subItem.title}
                              </Link>
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    )}
                  </DropdownMenu>
                );
              } else {
                // Internal link
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-slate-700 transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                );
              }
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <Button 
                asChild 
                variant="outline"
                className="h-9 px-4 text-sm font-medium border-blue-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 bg-blue-50/30 hover:bg-blue-50/50 transition-all duration-200"
              >
                <Link href={productConfig.product.ctaUrl} target="_blank">
                  {productConfig.product.ctaText}
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden ">
          <div className="space-y-1 px-4 py-5 bg-background border-b">
            {navigationConfig.mainNav.map((item: any) => {
              if (item.grouped && item.groups) {
                return (
                  <div key={item.title} className="space-y-4 pt-2 pb-4">
                    <div className="px-3 text-lg font-semibold text-foreground flex items-center gap-2">
                      {item.title}
                    </div>
                    <div className="pl-0 space-y-6">
                      {item.groups.map((group: any) => {
                        const IconComponent = iconMap[group.icon] || FileText;
                        return (
                          <div key={group.title} className="space-y-2">
                            <div className="px-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                              <IconComponent className="h-4 w-4 text-blue-500" />
                              {group.title.split('. ')[1]}
                            </div>
                            <div className="space-y-1 pl-3 border-l-2 border-slate-100 ml-4">
                              {group.items.map((subItem: any) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="block pl-4 pr-3 py-2 rounded-r-md text-sm font-medium hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              } else if (item.items) {
                // Render dropdown items for mobile (just a list here for simplicity)
                return (
                  <div key={item.title} className="space-y-1">
                    <div className="px-3 py-2 text-base font-medium text-muted-foreground">
                      {item.title}
                    </div>
                    {item.items.map((subItem: any) => (
                      subItem.external ? (
                        <a
                          key={subItem.href}
                          href={subItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between pl-6 pr-3 py-2 rounded-md text-sm font-medium hover:bg-muted"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{subItem.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                        </a>
                      ) : (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium hover:bg-muted"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      )
                    ))}
                  </div>
                );
              } else {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                );
              }
            })}
            <div className="pt-4">
              <Button 
                asChild 
                variant="outline"
                className="w-full h-9 text-sm font-medium border-blue-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 bg-blue-50/30 hover:bg-blue-50/50 transition-all duration-200"
              >
                <Link href={productConfig.product.ctaUrl} target="_blank">
                  {productConfig.product.ctaText}
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
