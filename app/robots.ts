import { MetadataRoute } from "next";

// SEO SAFETY LOCK: Keep robots closed globally.
// Do not remove or relax this unless the project owner explicitly asks for it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
