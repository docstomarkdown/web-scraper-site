import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Web Scraper.do",
  description: "Learn how Web Scraper.do collects, uses, and protects your data.",
  keywords: ["privacy policy", "data protection", "GDPR"],
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

export default function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "content", "legal", "privacy-policy.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  const sections = extractSections(content);

  return (
    <LegalPage
      type="privacy"
      content={content}
      sections={sections}
    />
  );
}