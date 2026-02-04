import fs from "fs"
import path from "path"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  category: string
  excerpt: string
  image: string
  content: string         // original markdown
  contentHtml?: string    // rendered HTML
  views?: number
}

// Simple frontmatter parser
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = fileContent.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: fileContent }
  }

  const frontmatterText = match[1]
  const content = match[2]

  const data: Record<string, string> = {}

  frontmatterText.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":")
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()

      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      data[key] = value
    }
  })

  return { data, content }
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = parseFrontmatter(fileContents)

      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        author: data.author || "",
        category: data.category || "",
        excerpt: data.excerpt || "",
        image: data.image || "",
        content,
      }
    })

  return allPostsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = parseFrontmatter(fileContents)

    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      author: data.author || "",
      category: data.category || "",
      excerpt: data.excerpt || "",
      image: data.image || "",
      content,
      contentHtml,
    }
  } catch (error) {
    return null
  }
}

export function getPostsByAuthor(author: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.author === author);
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export function getAllAuthors(): string[] {
  const posts = getAllPosts()
  const authors = new Set(posts.map(post => post.author))
  return Array.from(authors)
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories)
}
