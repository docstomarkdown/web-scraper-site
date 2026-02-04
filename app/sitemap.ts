// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllPosts, getAllAuthors, getAllCategories } from '@/lib/posts'
import { siteConfig } from '@/config/site'

// Get base URL from environment variable or fallback to site config
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url.replace(/\/$/, '')

export const dynamic = 'force-static';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Get all blog posts
  let blogPosts: MetadataRoute.Sitemap = []
  let authors: MetadataRoute.Sitemap = []
  let categories: MetadataRoute.Sitemap = []
  
  try {
    // Blog posts
    const posts = await getAllPosts()
    blogPosts = posts.map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Author pages
    const authorList = await getAllAuthors() // Should return string[] of author names
    authors = authorList.map(author => ({
      url: `${BASE_URL}/blog/author/${encodeURIComponent(author)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Category pages
    const categoryList = await getAllCategories() // Should return string[] of category names
    categories = categoryList.map(category => ({
      url: `${BASE_URL}/blog/category/${encodeURIComponent(category)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  } catch (error) {
    console.error('Error generating sitemap entries:', error)
  }

  return [...staticPages, ...blogPosts, ...authors, ...categories]
}