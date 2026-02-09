// Site configuration
export const siteConfig = {
  name: "Web Scraper Pro - Extract Data without Code",
  description: "Extract data from any website without code. Simple, powerful, and designed for everyone.",
  metaDescription: "Extract data from any website without code with Web Scraper Pro. Save time and streamline your workflow with automated data extraction.",
  url: "https://www.webscraper.pro/",
  ogImage: "https://webscraper.pro/og.jpg",
  links: {
    twitter: "https://twitter.com/webscraperpro",
    youtube: "https://www.youtube.com/@webscraperpro",
    linkedin: "https://linkedin.com/company/webscraperpro",
  },
  keywords: [
    "Web Scraper",
    "Data Extraction",
    "No Code",
    "Productivity",
    "Automation",
    "Workflow",
    "Integration",
    "Scraping",
    "Web Scraper Pro",
  ],
}

// Tools groups configuration (exported separately for tools page)
// Tools groups configuration (exported separately for tools page)
// Tools groups configuration (exported separately for tools page)
export const toolsGroups = [
  {
    title: "E-commerce Tools",
    icon: "shopping-cart",
    items: [
      {
        title: "Dropshipping Profit Calculator",
        href: "/tools/dropshipping-profit-calculator",
      },
    ],
  },
];

// Navigation
export const navigationConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    /* {
      title: "Tools",
      grouped: true,
      groups: toolsGroups,
    },
    */
    /*
    {
      title: "Features",
      href: "/#features-section",
    },
    */
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Docs",
      href: "https://docs.webscraper.pro",
      external: true,
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  footerNav: {
    product: [
      {
        title: "Features",
        href: "/#features-section",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
      {
        title: "FAQ",
        href: "/#faq",
      },
      {
        title: "Blog",
        href: "/blog",
      },
      {
        title: "Contact",
        href: "/contact",
      },
    ],
    freeTools: [
      {
        title: "Dropshipping Profit Calculator",
        href: "/tools/dropshipping-profit-calculator",
      },
    ],
    legal: [
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        title: "Terms of Service",
        href: "/terms-of-service",
      },
    ],
  },
}