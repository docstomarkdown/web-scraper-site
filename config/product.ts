import {
  FolderOpen,
  Search,
  Cloud,
  Image,
  Shield,
  Eye,
  Smartphone,
  Zap,
  HelpCircle,
  Link,
  Download,
  Clock,
  Users,
  Upload,
  Database,
  Settings,
  BarChart3,
  CheckCircle,
  Star,
  Play,
  Globe,
  Layers,
  RefreshCw,
  FileSpreadsheet,
  ListTodo,
  FileLock,
  Store,
  Sheet,
} from "lucide-react";

export const pricing = {
  heading: "Simple, Transparent Pricing",
  subheading: "Choose the plan that fits your needs",
  yearlyDiscount: "20%",
  plans: [
    {
      name: "Personal",
      description: "Perfect for individual users",
      monthlyPrice: "$14",
      yearlyPrice: "$99",
      features: [
        "Up to 100 file uploads/month",
        "Basic file organization",
        "Excel & CSV export",
        "Email support",
      ],
      ctaText: "Get Started",
      ctaUrl: "/signup?plan=personal",
      popular: false,
    },
    {
      name: "Pro",
      description: "Ideal for teams and businesses",
      monthlyPrice: "$29",
      yearlyPrice: "$279",
      features: [
        "Unlimited file uploads",
        "Advanced file organization",
        "Advanced export options",
        "Priority support",
        "Custom folder structures",
      ],
      ctaText: "Start Free Trial",
      ctaUrl: "/signup?plan=pro",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      features: [
        "Everything in Pro",
        "Custom API access",
        "Advanced security features",
        "24/7 dedicated support",
        "Custom integration options",
        "Team management",
      ],
      ctaText: "Contact Sales",
      ctaUrl: "/contact",
      popular: false,
    },
  ],
};

export const productConfig = {
  // Product details
  product: {
    name: "Web Scraper Pro",
    tagline: "Data Extraction Made Effortless",
    description: "Extract data from any website without code. Simple, powerful, and designed for everyone.",
    url: "https://www.webscraper.pro/",
    ctaText: "Install Web Scraper Pro Free",
    ctaUrl:
      "#", // Placeholder
    target: "_blank",
    secondaryCtaText: "Watch How",
    secondaryCtaUrl: "",
    logoText: "Web Scraper Pro",
    image: "hero-image.png",
    version: "1.0.0",
    lastUpdated: "2026-02-02",
    supportmail: "vikram@thinksolv.com",
  },

  // Hero section
  hero: {
    heading: "Data extraction made effortless.",
    subheading: [
      "Extract data from any website without code",
      "Simple, powerful, and designed for everyone",
    ],
    image: "",
    videoUrl: "", // Placeholder
  },

  trustIndicators: [
    {
      icon: CheckCircle,
      text: "Verified",
      subtext: "Secure & Trusted",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      icon: Star,
      text: ` 4.9/5`,
      subtext: ` Ratings`,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      icon: Users,
      text: `10k+`,
      subtext: "Active Users",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
  ],

  // Features section
  features: {
    title: "Features",
    subtitle:
      "Powerful features to extract, manage, and export data directly from the web.",
    ctaText: "Start Free Trial",
    ctaUrl:
      "#",
    items: [
      {
        icon: Zap,
        title: "Quick Setup, No Coding Needed",
        description:
          "Start scraping immediately. No scripts or technical setup required.",
      },
      {
        icon: Database,
        title: "Structured Data",
        description:
          "Get clean, structured data ready for analysis or integration.",
      },

      {
        icon: Shield,
        title: "Secure & Private",
        description:
          "Your data is processed securely and privately.",
      },
      {
        icon: FolderOpen,
        title: "Smart Organization",
        description:
          "Organize your scraped data with custom projects and folders.",
      },
      {
        icon: FileSpreadsheet,
        title: "Export to Any Format",
        description:
          "Export your data to CSV, JSON, or Excel.",
      },
      {
        icon: Upload,
        title: "Cloud Integration",
        description:
          "Automatically upload extracted data to your cloud storage.",
      },
    ],
  },

  // How it works section
  howItWorks: {
    title: "How Web Scraper Pro Works",
    description:
      "Start extracting data in three quick steps. No coding required.",
    steps: [
      {
        id: "install",
        title: "Install Web Scraper Pro",
        description:
          "Get the extension or app with a single click.",
        icon: "Download",
      },
      {
        id: "connect",
        title: "Select Data",
        description:
          "Point and click to select the data you want to extract.",
        icon: "Sheet", // Keeping icon for now, map needs update if changed
      },
      {
        id: "upload",
        title: "Extract & Export",
        description:
          "Run the scraper and export your data in your preferred format.",
        icon: "Upload",
      },
    ],
  },

  // Benefits section
  benefits: {
    title: "Why Choose Web Scraper Pro?",
    subtitle: "Everything you need to extract web data efficiently.",
    items: [
      {
        title: "Save Time",
        description:
          "Automate data extraction and save hours of manual work.",
        icon: Zap,
        metric: "90%",
        metricLabel: "Time Saved",
      },
      {
        title: "Work Faster",
        description:
          "Get data instantly for faster decision making.",
        icon: Users,
        metric: "5x",
        metricLabel: "Faster",
      },
      {
        title: "Stay Organized",
        description:
          "Keep all your data projects organized in one place.",
        icon: Layers,
        metric: "100%",
        metricLabel: "Organized",
      },
      {
        title: "Reliable",
        description:
          "Consistent and accurate data extraction every time.",
        icon: Shield,
        metric: "99.9%",
        metricLabel: "Accuracy",
      },
    ],
  },

  // Testimonials section
  testimonials: {
    heading: "What Our Users Say",
    subheading:
      "Join thousands of satisfied users who have simplified their data extraction",
    testimonialList: [
      {
        quote:
          "Web Scraper Pro has transformed how we gather market data. It's incredibly fast and easy to use.",
        author: "Sarah Johnson",
        position: "Market Analyst, TechCorp",
        avatar:
          "https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 5,
        company: "TechCorp",
      },
      {
        quote:
          "The no-code interface is brilliant. I was able to scrape complex sites in minutes.",
        author: "Michael Chen",
        position: "Data Scientist, InnovateCo",
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 5,
        company: "InnovateCo",
      },
      {
        quote:
          "Exporting data is seamless. Highly recommended for non-technical users.",
        author: "Emily Rodriguez",
        position: "Product Manager, GlobalFirm",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 5,
        company: "GlobalFirm",
      },
      {
        quote:
          "The best web scraping tool I've used. It handles dynamic content perfectly.",
        author: "David Kim",
        position: "Researcher, StartupXYZ",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 5,
        company: "StartupXYZ",
      },
    ],
  },

  // FAQ section
  faq: {
    heading: "Questions",
    subheading: "Find answers to common questions about Web Scraper Pro",
    questions: [
      {
        question: "How does it work?",
        answer:
          "Install Web Scraper Pro, open the website you want to scrape, click to select elements, and export the data. It's that simple.",
        category: "Getting Started",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes, your data is processed locally or securely in the cloud depending on your plan. We prioritize data privacy.",
        category: "Security",
      },
      {
        question: "Can I scrape dynamic websites?",
        answer:
          "Yes, Web Scraper Pro handles dynamic content (JavaScript, AJAX) automatically.",
        category: "Features",
      },
      {
        question: "Can I try it for free?",
        answer:
          "Yes. We offer a free tier so you can test the features before upgrading.",
        category: "Pricing",
      },
    ],
  },

  // Use cases section
  useCases: {
    title: "Built for E-commerce Growth",
    subtitle:
      "Everything you need to stay competitive in the fast-paced world of e-commerce.",
    cases: [
      {
        title: "Price Monitoring",
        description:
          "Track competitor prices in real-time. Adjust your pricing strategy dynamically to win the Buy Box and maximize margins.",
        icon: BarChart3,
        features: [
          "Real-time price tracking",
          "Dynamic pricing alerts",
          "Historical price trends",
        ],
        image:
          "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      },
      {
        title: "Product Research",
        description:
          "Analyze top-selling products, identify gaps in the market, and validate new product ideas with data-backed insights.",
        icon: Search,
        features: ["Bestseller analysis", "Gap analysis", "Market validation"],
        image:
          "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      },
      {
        title: "Competitor Analysis",
        description:
          "Monitor competitor inventory, promotions, and customer reviews to stay one step ahead in your niche.",
        icon: Users, // Or Store/ShoppingBag if available, sticking to existing imports for safety unless I add more
        features: ["Inventory tracking", "Review sentiment", "Promotion monitoring"],
        image:
          "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      },
    ],
  },

  // CTA section
  cta: {
    heading: "Get Started with Web Scraper Pro",
    subheading:
      "Start extracting data from the web today. No coding required.",
    ctaText: "Install Web Scraper Pro",
    ctaUrl:
      "#",
    videoUrl: "",
    secondaryCtaText: "Watch How",
    secondaryCtaUrl: "#demo",
  },

  // Contact section
  contact: {
    heading: "Get in Touch",
    subheading: "Have questions about Web Scraper Pro? We're here to help.",
    email: "vikram@thinksolv.com",
    address:
      "Thinksolv Technologies Pvt Ltd, KCT Tech Park, Coimbatore, India.",
    socialLinks: {
      twitter: "https://twitter.com/webscraperpro",
      linkedin: "https://linkedin.com/company/webscraperpro",
      youtube: "https://youtube.com/@webscraperpro",
    },
  },

  // Footer section
  footer: {
    companyName: "Thinksolv Technologies Pvt Ltd",
    description:
      "Building innovative solutions for web data extraction.",
    links: {
      product: [
        { name: "Features", href: "/#features-section" },
        { name: "Pricing", href: "/pricing" },
        { name: "How it Works", href: "/#how-it-works" },
        { name: "Use Cases", href: "/#use-cases" },
      ],
      support: [
        { name: "Documentation", href: "/docs" },
        { name: "Help Center", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "Status", href: "/status" },
      ],
      company: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
      ],
      legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
      ],
    },
    copyright: " 2024 Thinksolv Technologies Pvt Ltd. All rights reserved.",
  },

  // Meta information for SEO
  meta: {
    title: "Web Scraper Pro - No Code Data Extraction",
    description:
      "Seamlessly extract data from any website without code. Streamline your data scraping workflow.",
    keywords: [
      "Web Scraper",
      "Data Extraction",
      "No Code",
      "Productivity",
      "Scraping",
    ],
    ogImage:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1",
    twitterCard: "summary_large_image",
  },
};
