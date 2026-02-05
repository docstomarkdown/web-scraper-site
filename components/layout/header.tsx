"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ExternalLink, ChevronDown, FileText, ShoppingCart, Package, Calculator, Banknote, Users, CheckSquare, Receipt, BookOpen } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Map icon strings to components
const iconMap: Record<string, any> = {
  "receipt": Receipt,
  "shopping-cart": ShoppingCart,
  "box": Package,
  "calculator": Calculator,
  "banknote": Banknote,
  "users": Users,
  "check-square": CheckSquare,
  "book": BookOpen,
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-slate-200/60 shadow-sm py-3"
          : isHome
            ? "bg-transparent py-4"
            : "bg-white/80 backdrop-blur-md border-slate-200 py-3"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Icons.logo className="w-10 h-10" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                {productConfig.product.logoText}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationConfig.mainNav.map((item: any) => {
              if (item.grouped && item.groups) {
                return (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-200 outline-none group data-[state=open]:bg-slate-50 data-[state=open]:text-slate-900">
                      {item.title}
                      <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-50 group-data-[state=open]:rotate-180 transition-transform duration-200" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      sideOffset={20}
                      className={cn(
                        "p-6 shadow-2xl border-slate-100 bg-white/95 backdrop-blur-2xl ring-1 ring-slate-900/5 rounded-3xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-200",
                        item.dropdownWidth || "w-[900px]"
                      )}
                    >
                      <div className={cn(
                        "gap-x-8 gap-y-8",
                        item.dropdownWidth ? "columns-1" : "grid grid-cols-2 lg:grid-cols-3"
                      )}>
                        {item.groups.map((group: any) => {
                          const IconComponent = iconMap[group.icon] || FileText;
                          return (
                            <div key={group.title} className="break-inside-avoid">
                              <div className="group/section relative p-4 rounded-2xl hover:bg-slate-50 transition-all duration-200">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover/section:bg-blue-100 transition-colors">
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <h4 className="font-semibold text-sm text-slate-900">
                                    {group.title.split('. ')[1] || group.title}
                                  </h4>
                                </div>
                                <div className="space-y-1 ml-11">
                                  {group.items.map((subItem: any) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className="block py-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                                    >
                                      {subItem.title}
                                    </Link>
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
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-200"
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Button
                asChild
                className="h-10 px-6 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 transition-all duration-300"
              >
                <Link href={productConfig.product.ctaUrl} target="_blank">
                  {productConfig.product.ctaText}
                </Link>
              </Button>
            </div>

            {/* Mobile Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full hover:bg-slate-100"
                >
                  <Menu className="h-6 w-6 text-slate-700" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 border-l border-slate-100">
                <SheetHeader className="p-6 border-b border-slate-100 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <Icons.logo className="w-8 h-8" />
                    <span className="font-bold text-lg text-slate-900">{productConfig.product.logoText}</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-[calc(100vh-80px)] p-6 pb-20">
                  <div className="flex flex-col gap-6">
                    {navigationConfig.mainNav.map((item: any, i: number) => (
                      <div key={i}>
                        {item.grouped ? (
                          <div className="space-y-4">
                            <h4 className="font-semibold text-slate-900 text-lg">{item.title}</h4>
                            <div className="pl-4 space-y-6">
                              {item.groups.map((group: any) => (
                                <div key={group.title} className="space-y-3">
                                  <h5 className="text-sm font-medium text-slate-900 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    {group.title.split('. ')[1] || group.title}
                                  </h5>
                                  <div className="pl-3.5 border-l border-slate-100 space-y-2">
                                    {group.items.map((subItem: any) => (
                                      <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        className="block pl-4 py-1 text-sm text-slate-500 hover:text-blue-600"
                                      >
                                        {subItem.title}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="block font-semibold text-slate-900 hover:text-blue-600 text-lg"
                          >
                            {item.title}
                          </Link>
                        )}
                      </div>
                    ))}
                    <div className="pt-6 mt-auto">
                      <Button asChild className="w-full h-11 rounded-full text-base shadow-lg shadow-blue-500/20">
                        <Link href={productConfig.product.ctaUrl} target="_blank">
                          {productConfig.product.ctaText}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
