# 🛠️ Tools Platform — Developer Guide

A practical reference for building and maintaining tools on this platform. This document covers the shared component library, how each piece fits together, what needs updating, and the exact prompt to use when upgrading a calculator.

---

## 📁 Project Structure

```
app/tools/
├── _shared/
│   └── components/        ← All reusable building blocks (documented below)
├── (sai)/                 ← Sai's tool pages
├── (madhu)/               ← Madhu's tool pages
└── (listing)/             ← Listing-related tools
```

Every tool page is built by composing the shared components listed below. No tool should build its own result card, input row, FAQ section, or step guide from scratch.

---

## 🧩 Shared Components — What They Are & When to Use Them

### 1. `ResultSummaryCard`
**File:** `_shared/components/ResultSummaryCard.tsx`

The **primary result display card** used across all calculator tools. This is the single most important shared component on the platform.

**What it does:**
- Shows a large **primary result** (e.g., "Net Profit", "Safety Stock Units") as a big bold number in the center.
- Below the primary result it renders stacked **secondary result cards** — one per metric (e.g., Revenue, Total Fees, Profit Margin).
- In the top-right corner it shows a **dynamic mandatory field checklist** (e.g., `3/5` with a blue progress bar) that automatically scans all `calculator-input-field` elements on the page and tracks which required inputs have been filled.
- When all required inputs are filled and the user calculates, the checklist transitions to a colored **"Live" / "Profit" / "Loss" badge** indicating the result state.
- Before calculation, it shows a professional **empty state** — a frosted-glass overlay on top of a blurred skeleton dashboard, with an animated pulse icon and the message "Fill in the inputs to see your [Result Name]".
- Supports **profit/loss auto-coloring**: pass a `profitLossKey` and it automatically turns the badge green (Profit) or red (Loss), adjusts label text, and removes the minus sign while labeling appropriately.
- Supports **dynamic contextual descriptions** — different messages for positive, negative, and breakeven outcomes.
- Accepts **custom icons** on secondary result cards and **inline badges** (e.g., a rate shown alongside a metric).
- Supports **two variants**: `indicators` (default stacked cards) and `editorial`.

**When to use:** Every calculator tool that shows a numeric result. This is the standard. Do not create a custom result card.

---

### 2. `ResultDateCard`
**File:** `_shared/components/ResultDateCard.tsx`

A **variant of the result card** designed for tools whose output includes an important **date or time value** alongside the primary metric.

**What it does:**
- Same header and empty-state behavior as `ResultSummaryCard` (same "Result Panel" title, same checklist progress badge, same frosted-glass empty state skeleton).
- Shows a large **primary result** (e.g., "120 days") in the hero area.
- Adds a dedicated **date section card** below — an icon box + label + formatted date string (e.g., "Estimated Reorder Date: June 14, 2025"). Falls back to a placeholder text when not yet calculated.
- Adds a secondary **info card** below the date, where you can pass any custom React content (e.g., a list of reorder tips, a next-step recommendation).
- Supports a **custom badge** in the top-right as an override for the default "Live" badge.

**When to use:** Tools where a calendar date or time-sensitive output is a key part of the result — for example, a Reorder Point Calculator or a Safety Stock date projection. Use this instead of `ResultSummaryCard` when a date and an info summary card belong in the result panel.

---

### 3. `ResultFeedbackCard`
**File:** `_shared/components/ResultFeedbackCard.tsx`

The **older-generation result card**, predating `ResultSummaryCard`. It has a darker, more opinionated visual style and no built-in empty state or checklist.

**What it does:**
- Renders a card with a **dark background** (slate-700 by default) suited for bold, impactful result displays.
- Shows a large **main value** (e.g., a score or ROAS percentage), an optional **primary supporting metric** (full-width with its own label), and up to a **2-column grid of secondary metrics**.
- Supports three visual variants: `default` (dark slate), `warning` (deep red), and `compact` (white/light).
- Supports **tooltips** on both the card title and individual secondary metrics.
- Accepts custom children for additional content below the metrics.
- Includes animated background blur effects (for `default` and `warning` variants only).

**When to use:** This component is the **legacy result card**. New tools should use `ResultSummaryCard`. Existing tools that still use `ResultFeedbackCard` are considered "not yet updated" and should be migrated as part of the standardization effort.

---

### 4. `CalculatorInput`
**File:** `_shared/components/CalculatorInput.tsx`

The **standard input row** for all calculator tools. Every numeric or text field in an input card should use this component.

**What it does:**
- Renders a horizontal row with a **label on the left** and a styled **input field on the right**.
- Supports a `groupingTitle` + `groupingIcon` prop pair that renders a **section group header** — an icon in a rounded box with a bold title and a vertical blue connecting line drawn down through all inputs in that group. This is the standardized grouping style used across all tools.
- The `groupingTitle` can include `(Optional)` at the end and the component will automatically render it as a smaller italic tag next to the title.
- Automatically **detects and focuses** the first empty input on the page.
- Shows an animated **blue highlight border** on the first empty focused input.
- Renders **prefix/suffix symbols** (e.g., `$`, `%`, `kg`) inside the input box.
- Supports full **currency-aware formatting** — pass a `currency` code and it resolves the correct symbol and position (prefix vs suffix) for that currency using `Intl.NumberFormat`.
- Shows a **tooltip on the label** (the `ℹ` icon next to the label text) and a **hint tooltip on the input itself** (appears on hover, styled as a black-bordered callout with an arrow).
- Marks inputs as `(optional)` with the `isOptional` flag, and excludes them from the mandatory field checklist with `ignoreChecklist`.
- Supports a `rowAction` slot for extra controls (e.g., a small button) alongside the input.
- Supports a `groupingAction` slot for extra controls at the group header level (e.g., a currency picker).
- The input field carries the `calculator-input-field` class used by `ResultSummaryCard` to scan and count mandatory fields automatically.

**Input card grouping style rules:**
- Group label: bold, 16px, `text-slate-600`, with an icon in a `bg-blue-50` rounded box.
- A vertical blue line (`bg-blue-200/70`) connects all inputs within a group.
- Sub-label (individual field label): medium weight, 14.5px, `text-slate-600/90`.
- Separator lines render automatically between groups (unless `hideSeparator` is set).

---

### 5. `CalculatorCardHeader`
**File:** `_shared/components/CalculatorCardHeader.tsx`

The **header section of the input card** (the white card on the left side of a tool page).

**What it does:**
- Renders the input card's **title** (bold, blue, 20px) with an optional icon.
- Shows a **description** below the title in muted text — a one-line summary of what the tool calculates.
- Includes a **"?" help icon** that smoothly scrolls the page to the "How to Use" section when clicked.
- Integrates the **`CurrencyCombobox`** inline in the top-right when `currency` and `onCurrencyChange` props are provided — so users can switch the calculator's currency without leaving the input area.
- Includes a **reset button** (circular arrow icon) when `onReset` is provided, which clears all inputs back to defaults.

**When to use:** Place this at the top of every tool's input card. The title here should be specific to the tool (e.g., "Amazon FBA Inputs", "Profit Inputs") — not a generic label.

---

### 6. `CurrencyCombobox`
**File:** `_shared/components/CurrencyCombobox.tsx`

A **searchable currency selector dropdown** covering 150+ world currencies with country flag icons.

**What it does:**
- Renders a styled button showing the selected currency's **flag image**, **currency code**, and **symbol** (e.g., 🇮🇳 INR (₹)).
- Opens a **popover with a search input** — users can type a currency name (e.g., "Indian") or code (e.g., "INR") and get filtered results ranked by relevance.
- Includes a prioritized search algorithm: exact code match → code prefix → name prefix → contains match.
- Exports helper utilities used throughout the platform:
  - `getCurrencySymbol(code)` — returns the symbol string for a given currency code.
  - `formatCurrencyValue(value, code, decimals)` — formats a number as a currency string using the correct symbol and locale formatting.
  - `currencies[]` — the full currency list, importable directly for any lookup.

**When to use:** Used inside `CalculatorCardHeader` for tools that need currency switching. Also used internally by `CalculatorInput` and `ResultSummaryCard` to format currency values correctly.

---

### 7. `ToolOverview`
**File:** `_shared/components/ToolOverview.tsx`

The **educational overview section** that appears below the calculator on every tool page, introduced as part of the standardized platform design.

**What it does:**
- Renders a two-column layout: **left side** has a heading + definition paragraph, **right side** has up to 3 **"fact cards"** (a stat, a short label, and a supporting detail sentence).
- The heading supports an `headingAccent` string that highlights a keyword in the chosen accent color (e.g., "Tool Essential" with "Essential" in blue).
- Supports 7 accent color themes: `blue`, `indigo`, `violet`, `rose`, `red`, `emerald`, `amber` — each one colors the heading accent, section background gradient, card borders, and stat text consistently.
- Fact cards animate in on scroll using `whileInView` (one by one with staggered delays).
- The section uses `id="tool-overview"` for internal anchor navigation.
- Section heading is standardized to **"Tool Essential"** across all tools (recently standardized — no tool should use "What is the [Tool Name]?" as the heading anymore).

**When to use:** Every tool page should have a dedicated `[ToolName]Overview.tsx` file that imports and uses this component. The definition and facts should be tailored to the specific tool's subject matter.

---

### 8. `ToolGuide`
**File:** `_shared/components/ToolGuide.tsx`

The **educational guide section** that teaches users how the tool's subject works — not just the steps to use it.

**What it does:**
- Renders a list of **guide cards**, each with an icon, a title, and a description (can be a plain string or React nodes).
- Each card has a colored accent bar at the top that becomes visible on hover, color-matched to the card's icon background.
- The icon animates with a subtle scale effect on hover.
- The section uses `id="tool-guide"` for internal navigation.
- The section header (icon + title) is rendered by `ToolSectionHeader`.
- HTML in description strings is supported via `dangerouslySetInnerHTML` — `<em>` tags render as bold (not italic), and `<strong>` tags are stripped (text is preserved).

**When to use:** Place after the "How to Use" steps section. Use this for conceptual content — explaining formulas, key terms, industry context — rather than usage instructions.

---

### 9. `ToolSteps`
**File:** `_shared/components/ToolSteps.tsx`

The **"How to Use" section** — a numbered step-by-step guide displayed in a horizontal timeline on desktop and a vertical stack on mobile.

**What it does:**
- Renders each step as a card with a numbered circle badge (filled blue), an icon box, a step title, and a description.
- On **desktop**: cards sit side-by-side in a grid with the numbered badges floating above each card at the top center.
- On **mobile**: cards stack vertically with the badge circle on the left and the card content beside it.
- Supports an optional `goal` step that appends a final "what you get" card after the regular steps.
- The numbered badges animate with a scale effect on hover.
- The default title is "How to Use This Calculator" and can be customized.
- The section uses `id="how-to-use"` which is the anchor the help icon in `CalculatorCardHeader` scrolls to.

**Design guideline:** Each step should be streamlined to a **single actionable sentence**. Three steps is the standard (Input → Configure → Read Result).

---

### 10. `ToolFAQ`
**File:** `_shared/components/ToolFAQ.tsx`

The **FAQ accordion section** at the bottom of each tool page.

**What it does:**
- Renders each question as an **accordion item** — collapsed by default, expands on click.
- The trigger area shows a numbered badge (e.g., `01`, `02`) that transforms into a blue question-mark icon when the item is open.
- A chevron rotates 90° when expanded.
- The open state colors the question text blue and adds a soft blue border to the card.
- Answers support basic HTML (bold via `<strong>`, emphasis via `<em>`).
- The section uses `id="faq"` for anchor navigation.

**Design guideline:** Questions should be ordered from most fundamental to most strategic. Avoid redundant definitions — if it's covered in the overview or guide, it should not be repeated in the FAQ.

---

### 11. `ToolPageTitle`
**File:** `_shared/components/ToolPageTitle.tsx`

The **h1 page title** displayed at the top of every tool page, above the calculator card.

**What it does:**
- Renders the tool name as a centered `<h1>` at `text-4xl / text-[42px]`, semibold, slate-700.
- Wraps the title in a `FadeIn` animation (entrance from below by default).
- Accepts a `direction` and `duration` for animation customization.

**When to use:** At the top of every tool page, before the calculator layout. Only a few tools currently also show a short **description paragraph** below the title — this is optional and tool-specific.

---

### 12. `ToolSectionHeader`
**File:** `_shared/components/ToolSectionHeader.tsx`

The **reusable section title** used at the top of the Guide, Steps, and FAQ sections.

**What it does:**
- Renders an icon in a blue-gradient rounded icon box alongside a bold section title (`text-[22px]–text-[28px]`).
- Optionally shows a subtitle paragraph below the title if provided.
- Used internally by `ToolGuide`, `ToolSteps`, and `ToolFAQ` — you rarely need to use this directly.

---

### 13. `FadeIn`
**File:** `_shared/components/FadeIn.tsx`

A lightweight **scroll-triggered fade-in animation wrapper**.

**What it does:**
- Wraps any content with a `motion.div` that animates from hidden (opacity 0 + offset) to visible on scroll.
- Supports four entrance directions: `up`, `down`, `left`, `right` (and `none` for opacity-only fade).
- Configurable `delay` and `duration`.
- Triggers once when the element enters the viewport (`once: true`).

**When to use:** Used by `ToolPageTitle` and available for any section or element that should animate in on scroll.

---

### 14. `Counter`
**File:** `_shared/components/Counter.tsx`

An **animated number counter** component that smoothly transitions between values.

**What it does:**
- Uses `framer-motion`'s `useMotionValue` and `animate` to tween a number from its previous value to a new value over 0.5 seconds with an easeOut curve.
- Accepts an optional `formatter` function for custom display (e.g., currency, decimals, percentages).
- Supports `prefix` and `suffix` strings (e.g., `$`, `%`).
- Falls back to `Math.round().toLocaleString()` if no formatter is provided.

**When to use:** When a result value changes (e.g., after recalculation) and you want the number to roll smoothly rather than jump instantly. Especially useful inside result cards.

---

### 15. `ScannerModal`
**File:** `_shared/components/ScannerModal.tsx`

A **barcode scanner dialog** built around a camera reader element.

**What it does:**
- Opens a modal dialog with a camera viewport div (identified by `readerId`) where a barcode scanning library renders its camera feed.
- Displays an error message inside the modal if the scanner fails.

**Current status:** This component was originally used in the **GTIN Validator** and **UPC Validator** tools to let users scan barcodes with their camera. It has since been **removed from those tools** — they now only support image upload and file upload for barcode detection. The component still exists in the shared library but is no longer actively used.

---

## 🔄 Result Card Hierarchy Summary

| Component | Style | Empty State | Checklist | Use For |
|---|---|---|---|---|
| `ResultSummaryCard` | Light (`#F5F8FD`) | ✅ Full skeleton | ✅ Auto-scanned | **All calculators** (current standard) |
| `ResultDateCard` | Light (`#F5F8FD`) | ✅ Full skeleton | ✅ Manual list | Calculators with a **date output** |
| `ResultFeedbackCard` | Dark (slate-700) | ❌ None | ❌ None | **Legacy** — migrate to ResultSummaryCard |

---

## 🔧 Tools Pending Standardization

The following tools have **not yet been updated** to the current component standards. Use the prompt in the next section to upgrade each one.

| # | Tool Name |
|---|---|
| 1 | Dropshipping Profit Calculator |
| 2 | Amazon FBA Fee Calculator |
| 3 | Profit Margin Calculator |
| 4 | Discount Percentage Calculator |
| 5 | ROI Calculator for Products |
| 6 | ROAS Calculator (Return on Ad Spend) |
| 7 | SKU Generator |
| 8 | Return Rate Calculator |
| 9 | Free Shipping Threshold Calculator |
| 10 | Inventory Reorder Calculator |
| 11 | Promo Code Generator |
| 12 | Price Elasticity Calculator |
| 13 | Bundle Profit Calculator |
| 14 | Time Zone Meeting Planner |

---

## ✏️ Standardization Prompt

Use this prompt to upgrade any of the tools listed above. Replace `TOOL NAME` with the actual tool name.

```
Update the "TOOL NAME"

Result Panel Standardization: Fully integrated the shared ResultSummaryCard
component to handle calculations and result displays.

Mandatory Field Checklist: Added the dynamic checklist to the top right of
the result card to correctly track required inputs.

Breakdown Visualization Layout: Moved the circular breakdown chart outside
of the main result card to match the standardized layout of other tools.

Breakdown Empty State: Implemented a persistent "empty state" visual for the
breakdown chart when no data is present.

Breakdown Formatting Fixes: Resolved text rendering bugs in the breakdown
legend and prevented the legend from disappearing when values hit zero.

Input Tooltip Improvements: Updated all input field hover tooltips with
simplified, user-friendly messaging to reduce confusion.

Result Tooltip Additions: Added brand-new informational tooltips to the
inner outcome cards (Total Fees, Profit Margin) to explain the background math.

Tool Guide Restructuring: Updated the educational guide content for better
formatting and clearer information.

FAQ Hierarchy: Reordered the FAQ questions into a much more logical,
structured hierarchy.

How-to-Use Refinement: Streamlined the "How to Use" section into three clear,
actionable steps with updated icons.

Overview Metric Update: Updated the final highlight metric in the Tool
Overview component to emphasize the accurate calculation of hidden costs.

Update tool page title. In the input card, follow the grouping label and
sub-label size of the text and color shade of text. Follow the same format
that grouping label uses: an icon and a vertical line below the icon. The
input card should be updated with a header that is suitable to the specific
tool.
```

---

## ⚠️ Known Pending Platform Updates

### Footer & CTA Section
The **footer** and **CTA (Call-to-Action) section** across tool pages are **not yet updated**. These sections exist in the `main` branch in their updated form but have not been pulled into the current working branch.

> **Action required:** Take a pull from `main` to sync the updated footer and CTA components before shipping the next batch of tool updates.

### Tool Page Descriptions
Only a **select few tool pages** currently display a short description paragraph below the `ToolPageTitle`. This is an optional enhancement — it is not yet consistent across all tools. When adding a description, keep it to one or two sentences that explain the tool's purpose at a glance.

---

## 📌 Input Card Design Standards

When building or updating the input section of any tool, follow these rules:

1. **Card Header** — Use `CalculatorCardHeader` with a title specific to the tool (e.g., "FBA Cost Inputs", not "Calculator Inputs"). Include a one-line description.
2. **Grouping Labels** — Use `CalculatorInput`'s `groupingTitle` + `groupingIcon` props. The label is bold, 16px, `text-slate-600`, with an icon in a `bg-blue-50` box and a vertical blue connecting line through the group's inputs.
3. **Field Labels** — Medium weight, 14.5px, `text-slate-600/90`.
4. **Tooltips** — Each input should have a `tooltip` (shown on the `ℹ` label icon) with a short, plain-English explanation. Keep it to one sentence.
5. **Optional fields** — Use `isOptional` on the `CalculatorInput` to append `(optional)` inline, or append `(Optional)` to the `groupingTitle` for an entire optional section.
6. **Currency inputs** — Use `isCurrency` or pass a `currency` code. Never hardcode `$` as a prefix string — let the component resolve the symbol.
7. **Reset** — Pass `onReset` to `CalculatorCardHeader` to give users a reset button.

---

## 🗂️ Exports (`index.ts`)

All shared components are re-exported from `_shared/components/index.ts` for clean imports:

```ts
import {
  ResultSummaryCard,
  ResultDateCard,
  ResultFeedbackCard,
  CalculatorInput,
  CalculatorCardHeader,
  CurrencyCombobox,
  ToolOverview,
  ToolGuide,
  ToolSteps,
  ToolFAQ,
  ToolPageTitle,
  ToolSectionHeader,
  FadeIn,
  Counter,
  ScannerModal,
} from "@/app/tools/_shared/components"
```
