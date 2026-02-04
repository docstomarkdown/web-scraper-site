# SEO Metadata Template for Tools

## CSV/Google Sheets Format

Use this format to prepare metadata for all tools. Each row represents one tool.

### Column Headers:

| tool_slug | title | description | keywords | canonical_url | og_title | og_description | twitter_title | twitter_description | og_image |
|-----------|-------|-------------|----------|---------------|----------|----------------|---------------|---------------------|----------|

### Column Descriptions:

1. **tool_slug** - The folder name of the tool (e.g., `invoice-generator`, `free-barcode-generator`)
2. **title** - Page title (appears in browser tab)
3. **description** - Meta description (155-160 characters recommended)
4. **keywords** - Comma-separated keywords (20-35 keywords recommended)
5. **canonical_url** - Canonical URL path (e.g., `/tools/invoice-generator`)
6. **og_title** - OpenGraph title (for social sharing)
7. **og_description** - OpenGraph description (for social sharing)
8. **twitter_title** - Twitter card title
9. **twitter_description** - Twitter card description
10. **og_image** - Image path (place in `public/tools/` folder, reference as `/tools/filename.jpg`, e.g., `/tools/invoice-generator-og.jpg`)

### Example Row:

```
invoice-generator|Free Invoice Generator Online | Create Professional PDF Invoices Instantly|Create professional invoices instantly with our free online invoice generator. Generate customizable PDF invoices with multiple currencies, tax calculations, and logo support. No signup required.|invoice generator, free invoice maker, online invoice creator, professional invoice template, PDF invoice generator, business invoice maker, invoice software, invoice app, invoice tool, create invoice online, invoice builder, invoice designer, invoice formatter, invoice template free, invoice generator India, invoice generator USA, invoice generator UK, invoice generator Canada, invoice generator Australia, invoice generator free, invoice maker online, invoice creator tool, invoice generator software, invoice generator app, invoice generator website, invoice generator tool, invoice generator free online, invoice generator PDF, invoice generator with logo, invoice generator with tax, invoice generator multi currency, invoice generator professional, invoice generator business, invoice generator small business, invoice generator freelancer, invoice generator contractor|/tools/invoice-generator|Free Invoice Generator Online | Create Professional PDF Invoices Instantly|Create professional invoices instantly with our free online invoice generator. Generate customizable PDF invoices with multiple currencies, tax calculations, and logo support.|Free Invoice Generator Online | Create Professional PDF Invoices Instantly|Create professional invoices instantly with our free online invoice generator. Generate customizable PDF invoices.|og-image.jpg
```

### CSV Format (Comma-separated):

**Note:** Since descriptions and keywords contain commas, use **pipe (|) as delimiter** or wrap text fields in quotes.

### Recommended Format (Pipe-delimited):

```
tool_slug|title|description|keywords|canonical_url|og_title|og_description|twitter_title|twitter_description|og_image
invoice-generator|Free Invoice Generator Online | Create Professional PDF Invoices Instantly|Create professional invoices instantly with our free online invoice generator. Generate customizable PDF invoices with multiple currencies, tax calculations, and logo support. No signup required.|invoice generator, free invoice maker, online invoice creator, professional invoice template, PDF invoice generator, business invoice maker, invoice software, invoice app, invoice tool, create invoice online, invoice builder, invoice designer, invoice formatter, invoice template free, invoice generator India, invoice generator USA, invoice generator UK, invoice generator Canada, invoice generator Australia, invoice generator free, invoice maker online, invoice creator tool, invoice software free, invoice generator software, invoice generator app, invoice generator website, invoice generator tool, invoice generator free online, invoice generator PDF, invoice generator with logo, invoice generator with tax, invoice generator multi currency, invoice generator professional, invoice generator business, invoice generator small business, invoice generator freelancer, invoice generator contractor|/tools/invoice-generator|Free Invoice Generator Online | Create Professional PDF Invoices Instantly|Create professional invoices instantly with our free online invoice generator. Generate customizable PDF invoices with multiple currencies, tax calculations, and logo support.|Free Invoice Generator Online | Create Professional PDF Invoices Instantly|Create professional invoices instantly with our free online invoice generator. Generate customizable PDF invoices.|/tools/invoice-generator-og.jpg
```

### Guidelines:

1. **Title**: 50-60 characters, include main keyword at the start
2. **Description**: 150-160 characters, include 2-3 main keywords naturally
3. **Keywords**: 20-35 keywords, include:
   - Main keyword variations
   - Long-tail keywords
   - Location-based (India, USA, UK, etc.)
   - Use-case keywords (small business, freelancer, contractor, etc.)
   - Alternative names/synonyms
   - Related terms
4. **Canonical URL**: Always start with `/tools/`
5. **OG Image**: Use descriptive filename format (e.g., `invoice-generator-og.jpg` or `invoice-generator-og.png`) - place in `public/tools/` folder, reference as `/tools/filename.jpg`

### Tool Slugs Reference:

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

### Example for Google Sheets:

Create a sheet with these columns:
- Column A: tool_slug
- Column B: title
- Column C: description
- Column D: keywords (comma-separated)
- Column E: canonical_url
- Column F: og_title
- Column G: og_description
- Column H: twitter_title
- Column I: twitter_description
- Column J: og_image

### After You Prepare the Data:

1. Export as CSV (pipe-delimited or comma with quotes)
2. Share the file with me
3. I'll update all layout.tsx files in one go
4. You'll need to add the OG images to each tool folder (same name as specified in og_image column)
