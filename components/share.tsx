"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

export default function ShareButton({ 
  title, 
  excerpt, 
  url 
}: { 
  title: string
  excerpt: string
  url: string
}) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: excerpt,
          url,
        })
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="hover:bg-primary hover:text-white hover:border-primary transition-colors"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4 mr-2" />   
      Share
    </Button>
  )
}