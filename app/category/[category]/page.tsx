import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Category",
  description: "Explore blog posts by category on our site.",
  keywords: ["blog", "category", "articles", "posts", "topics"],
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-heading mb-8">Category: {category}</h1>
          
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-border/50 pb-8">
                <Link href={`/${post.slug}`}>
                  <h2 className="text-3xl font-heading hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span>•</span>
                  <Link 
                    href={`/author/${encodeURIComponent(post.author)}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.author}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}