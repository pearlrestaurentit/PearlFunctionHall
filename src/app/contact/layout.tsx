import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | The Pearl Function Hall Srikakulam',
  description: 'Contact our event specialists to book your wedding venue or restaurant reservation in Srikakulam today.',
  keywords: ["Contact The Pearl Srikakulam", "Book Wedding Venue Srikakulam", "Function Hall Booking Srikakulam"],
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
