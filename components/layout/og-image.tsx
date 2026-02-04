import Image from "next/image"
import { cn } from "@/lib/utils"

interface OGImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function OGImage({ src, alt, className, priority = false }: OGImageProps) {
  return (
    <div className={cn("relative w-full aspect-[1200/630]", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={1200}
        height={630}
        className="object-cover w-full h-full"
        priority={priority}
      />
    </div>
  )
}