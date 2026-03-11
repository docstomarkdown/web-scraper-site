import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Web Scraper.do",
  description: "Read the terms and conditions for using Web Scraper.do.",
  keywords: ["terms of service", "user agreement", "legal"],
};

function extractSections(markdown: string) {
  const lines = markdown.split("\n");
  return lines
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const title = l.replace(/^## /, "").trim();
      const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      return { id, title };
    });
}

export default function TermsOfServicePage() {
  const filePath = path.join(process.cwd(), "content", "legal", "terms-of-service.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  const sections = extractSections(content);

  return (
    <LegalPage
      type="terms"
      content={content}
      sections={sections}
    />
  );
}