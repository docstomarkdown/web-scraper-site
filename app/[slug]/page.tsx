import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ShareButton from "@/components/share"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Updated generateMetadata with proper typing
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image || "/placeholder.svg?height=630&width=1200",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}


const MarkdownComponents = {
  h1: ({ node, ...props }: any) => <h1 className="text-3xl font-heading mt-8 mb-6 first:mt-0 dark:text-white" {...props} />,
  h2: ({ node, ...props }: any) => <h2 className="text-2xl font-heading mt-8 mb-4 dark:text-white" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="text-xl font-heading mt-6 mb-3 dark:text-white/50" {...props} />,
  p: ({ node, ...props }: any) => <p className="mb-6 leading-relaxed text-lg dark:text-white/50" {...props} />,
  li: ({ node, ...props }: any) => <li className="ml-6 mb-2 list-disc dark:text-white/50" {...props} />,
  strong: ({ node, ...props }: any) => <strong className="dark:text-white" {...props} />,
  em: ({ node, ...props }: any) => <em className="dark:text-white" {...props} />,
  img: ({ node, ...props }: any) => (
    <div className="relative w-full h-64 my-8 rounded-lg overflow-hidden">
      <Image
        src={props.src || "/placeholder.svg"}
        alt={props.alt || "Post image"}
        fill
        className="object-cover"
      />
    </div>
  ),
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://webscraper.pro'}/${slug}`
  const shareText = `Check out this post: ${post.title} - ${post.excerpt}`
  const shareTitle = encodeURIComponent(post.title)
  const shareDescription = encodeURIComponent(post.excerpt)

  const socialShares = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(postUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${shareTitle}&summary=${shareDescription}`,
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-8">
          <Button variant="ghost" className="hover:bg-primary" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article className="max-w-4xl mx-auto">
          {post.image && (
            <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-1 text-muted-foreground">
              By
              <Link
                href={`/author/${encodeURIComponent(post.author)}`}
                className="hover:text-primary transition-colors"
              >
                {post.author}
              </Link>
              <span className="px-2">•</span>
              <span>{post.date}</span>
              <span className="px-2">•</span>
              <Link
                href={`/category/${encodeURIComponent(post.category)}`}
                className="hover:text-primary transition-colors"
              >
                {post.category}
              </Link>
            </div>
          </header>

          <div className="prose prose-lg max-w-none mb-12 dark:prose-invert">
            <ReactMarkdown
              components={MarkdownComponents}
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <footer className="pt-8 border-t border-border/50">
            <h3 className="text-lg font-semibold mb-6">Share this article</h3>
            <div className="flex flex-wrap gap-3">
              <ShareButton
                title={post.title}
                excerpt={post.excerpt}
                url={postUrl}
              />
              {/* <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-white hover:border-primary transition-colors"
                asChild
              >
                <Link href={socialShares.facebook} target="_blank" rel="noopener noreferrer">
                  <LuFacebook className="h-4 w-4 mr-2" />
                  Facebook
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-white hover:border-primary transition-colors"
                asChild
              >
                <Link href={socialShares.twitter} target="_blank" rel="noopener noreferrer">
                  <FaXTwitter className="h-4 w-4 mr-2" />
                  Twitter
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-white hover:border-primary transition-colors"
                asChild
              >
                <Link href={socialShares.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Link>
              </Button> */}
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}