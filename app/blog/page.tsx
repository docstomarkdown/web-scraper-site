import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { getAllPosts } from "@/lib/posts"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest news, updates, and insights from our team.",
  keywords: ["blog", "articles", "news", "updates", "insights", "technology", "lifestyle"],
}

export default function BlogPage() {
  const blogPosts = getAllPosts()

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Blog"
          description="Read updates from our team."
          dividerColor="primary"
          className="mb-16"
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border-0 bg-background"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image || "/placeholder.svg?height=630&width=1200"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.category}</span>
                  </div>
                  <Link href={`/${post.slug}`} className="block">
                    <CardTitle className="text-3xl hover:text-primary transition-colors line-clamp-2 font-heading">
                      {post.title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="text-sm">By {post.author}</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  <Button variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-primary/80" asChild>
                    <Link href={`/${post.slug}`}>Read more &nbsp; <ArrowRight size={15}/></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
