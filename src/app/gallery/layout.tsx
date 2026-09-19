import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery | Best Wedding & Event Venue in Srikakulam',
  description: 'View photos of our luxurious banquet hall, beautiful events, and modern restaurant in Srikakulam.',
  keywords: ["Function Hall Photos Srikakulam", "Wedding Venue Gallery Srikakulam", "Restaurant Interior Srikakulam", "The Pearl Function Hall Images"],
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
