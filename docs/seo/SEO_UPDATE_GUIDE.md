# SEO Metadata Update Guide

## Template Format

I've created a template for you to fill in. Here's how to use it:

### Step 1: Prepare Your Data

Use the `seo-metadata-template.csv` file as a starting point, or create a spreadsheet with these columns:

| Column | Description | Example | Notes |
|--------|-------------|---------|-------|
| **tool_slug** | Folder name of the tool | `invoice-generator` | Must match folder name exactly |
| **title** | Page title (browser tab) | `Free Invoice Generator Online \| Create Professional PDF Invoices Instantly` | 50-60 chars, use \| for pipe |
| **description** | Meta description | `Create professional invoices instantly...` | 150-160 characters |
| **keywords** | Comma-separated keywords | `invoice generator, free invoice maker, ...` | 20-35 keywords |
| **canonical_url** | Canonical URL path | `/tools/invoice-generator` | Always starts with `/tools/` |
| **og_title** | OpenGraph title | `Free Invoice Generator Online \| Create Professional PDF Invoices Instantly` | For social sharing |
| **og_description** | OpenGraph description | `Create professional invoices instantly...` | For social sharing |
| **twitter_title** | Twitter card title | `Free Invoice Generator Online \| Create Professional PDF Invoices Instantly` | For Twitter |
| **twitter_description** | Twitter card description | `Create professional invoices instantly...` | For Twitter |
| **og_image** | Image filename | `invoice-generator-og.jpg` | Place in `public/tools/` folder, reference as `/tools/filename` |

### Step 2: Fill in All 29 Tools

Copy the template row for each tool and fill in the details. Make sure:
- ✅ All 29 tools are included
- ✅ Keywords are comprehensive (20-35 per tool)
- ✅ Descriptions are 150-160 characters
- ✅ Titles are 50-60 characters
- ✅ Canonical URLs are correct

### Step 3: Export Your Data

**Option A: Spreadsheet**
1. Create a spreadsheet with the columns above
2. Fill in all 29 rows
3. Export as CSV (File → Download → Comma-separated values)
4. Share the CSV file with me

**Option B: CSV File**
1. Use the `seo-metadata-template.csv` as starting point
2. Fill in all rows
3. Save as CSV (pipe-delimited or comma with quotes)
4. Share the file with me

### Step 4: Image Preparation

For each tool, prepare an OpenGraph image:
- **Size**: 1200x630 pixels (recommended)
- **Format**: JPG or PNG
- **Filename**: Use the name from `og_image` column (e.g., `invoice-generator-og.jpg`)
- **Location**: Place in the `public/tools/` folder
  - Example: `public/tools/invoice-generator-og.jpg`
  - **Important**: In Next.js, images in `public` folder are served from root, so reference as `/tools/invoice-generator-og.jpg`

### Step 5: What I'll Do

Once you share the CSV:
1. ✅ Parse the CSV file
2. ✅ Update all 29 `layout.tsx` files with new metadata
3. ✅ Add canonical URLs to all tools
4. ✅ Add Twitter cards to all tools
5. ✅ Enhance OpenGraph metadata
6. ✅ Ensure consistency across all tools

## Example: What the Final Layout Will Look Like

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Invoice Generator Online | Create Professional PDF Invoices Instantly",
    description: "Create professional invoices instantly with our free online invoice generator. Generate customizable PDF invoices with multiple currencies, tax calculations, and logo support. No signup required.",
    keywords: [
        "invoice generator",
        "free invoice maker",
        "online invoice creator",
        "professional invoice template",
        "PDF invoice generator",
        "business invoice maker",
        "invoice software",
        "invoice app",
        "invoice tool",
        "create invoice online",
        "invoice builder",
        "invoice designer",
        "invoice formatter",
        "invoice template free",
        "invoice generator India",
        "invoice generator USA",
        "invoice generator UK",
        "invoice generator Canada",
        "invoice generator Australia",
        "invoice generator free",
        "invoice maker online",
        "invoice creator tool",
        "invoice software free",
        "invoice generator software",
        "invoice generator app",
        "invoice generator website",
        "invoice generator tool",
        "invoice generator free online",
        "invoice generator PDF",
        "invoice generator with logo",
        "invoice generator with tax",
        "invoice generator multi currency",
        "invoice generator professional",
        "invoice generator business",
        "invoice generator small business",
        "invoice generator freelancer",
        "invoice generator contractor"
    ],
    alternates: {
        canonical: "/tools/invoice-generator",
    },
    openGraph: {
        title: "Free Invoice Generator Online | Create Professional PDF Invoices Instantly",
        description: "Create professional invoices instantly with our free online invoice generator. Generate customizable PDF invoices with multiple currencies, tax calculations, and logo support.",
        type: "website",
        images: [
            {
                url: "/tools/invoice-generator-og.jpg",
                width: 1200,
                height: 630,
                alt: "Free Invoice Generator Online",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Invoice Generator Online | Create Professional PDF Invoices Instantly",
        description: "Create professional invoices instantly with our free online invoice generator. Generate customizable PDF invoices.",
        images: ["/tools/invoice-generator-og.jpg"],
    },
};

export default function InvoiceGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
```

## Keyword Research Tips

For each tool, include:
1. **Main keyword**: The tool name (e.g., "invoice generator")
2. **Variations**: Free, online, PDF, professional, etc.
3. **Use cases**: Small business, freelancer, contractor, etc.
4. **Locations**: India, USA, UK, Canada, Australia, etc.
5. **Related terms**: Invoice maker, invoice creator, invoice tool, etc.
6. **Long-tail**: "free invoice generator online", "create invoice PDF", etc.
7. **Industry terms**: Billing, invoicing, accounts receivable, etc.

## Tool Slugs (Complete List)

1. invoice-generator
2. goods-and-services-tax-invoice-generator
3. proforma-invoice-generator
4. sales-receipt-generator
5. credit-note-generator
6. debit-note-generator
7. purchase-order-generator
8. Work-order-generator
9. purchase-return-generator
10. sales-return-generator
11. stock-keeping-unit-generator
12. packing-slip-generator
13. goods-received-note-generator
14. stock-transfer-note-generator
15. free-barcode-generator
16. quotation-generator
17. project-cost-quote
18. budget-calculator
19. tax-deducted-at-source-calculator
20. expense-report-generator
21. petty-cash-voucher-generator
22. experience-letter-generator
23. salary-slip-generator
24. checklist-generator
25. offer-letter-generator
26. memorandum-of-understanding-generator
27. refund-policy-generator
28. resume-generator
29. appointment-letter-generator

## Notes

- Use pipe (`|`) as delimiter in CSV if your descriptions/keywords contain commas
- Or use comma with quotes: `"keyword1, keyword2, keyword3"`
- OG images should be 1200x630px for best results
- Keep descriptions under 160 characters for optimal display
- Include location-based keywords (India, USA, UK, etc.) where relevant
- Add use-case keywords (small business, freelancer, contractor, etc.)
