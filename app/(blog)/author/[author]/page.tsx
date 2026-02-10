import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getPostsByAuthor, getAllAuthors } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Articles by Author",
  description: "Explore articles written by a specific author on our blog.",
  keywords: ["blog", "author", "articles", "posts", "writing", "content"],
}

interface AuthorPageProps {
  params: Promise<{ author: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    author: encodeURIComponent(author),
  }));
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { author: encodedAuthor } = await params;
  const author = decodeURIComponent(encodedAuthor);
  const posts = getPostsByAuthor(author);

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
          <h1 className="text-5xl font-heading mb-8">Articles by {author}</h1>
          
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
                    href={`/category/${encodeURIComponent(post.category)}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.category}
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