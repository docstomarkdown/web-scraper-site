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
        title: "Amazon FBA Fee Calculator",
        href: "/tools/amazon-fba-fee-calculator",
      },
      {
        title: "Dropshipping Profit Calculator",
        href: "/tools/dropshipping-profit-calculator",
      },
      {
        title: "Dimension Converter",
        href: "/tools/dimension-converter",
      },
      {
        title: "Profit Margin Calculator",
        href: "/tools/profit-margin-calculator",
      },
      {
        title: "UPC/EAN Validator",
        href: "/tools/upc-ean-validator",
      },
      {
        title: "GTIN Converter",
        href: "/tools/gtin-converter",
      },
      {
        title: "ROI Calculator",
        href: "/tools/roi-calculator",
      },
      {
        title: "Discount Percentage Calculator",
        href: "/tools/discount-percentage-calculator",
      },
      {
        title: "ROAS Calculator",
        href: "/tools/return-on-ad-spend-calculator",
      },
      {
        title: "CPA Calculator",
        href: "/tools/cpa-calculator",
      },
      {
        title: "Dimensional Weight Calculator",
        href: "/tools/dimensional-weight-calculator",
      },
      {
        title: "Free Shipping Calculator",
        href: "/tools/free-shipping-calculator",
      },
      {
        title: "Inventory Reorder Calculator",
        href: "/tools/inventory-reorder-calculator",
      },
      {
        title: "Safety Stock Calculator",
        href: "/tools/safety-stock-calculator",
      },
      {
        title: "Sales Velocity Calculator",
        href: "/tools/sales-velocity-calculator",
      },
      {
        title: "Promo Code Generator",
        href: "/tools/promo-code-generator",
      },
      {
        title: "Price Elasticity Calculator",
        href: "/tools/price-elasticity-calculator",
      },
      {
        title: "Bundle Profit Calculator",
        href: "/tools/bundle-profit-calculator",
      },
      {
        title: "MOQ Cost Calculator",
        href: "/tools/moq-cost-calculator",
      },
      {
        title: "Landed Cost Calculator",
        href: "/tools/landed-cost-calculator",
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