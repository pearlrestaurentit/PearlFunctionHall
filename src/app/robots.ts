import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://thepearlfunctionhall.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Hide admin dashboard from search engines
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
