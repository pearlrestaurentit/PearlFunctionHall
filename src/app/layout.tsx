import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: '--font-body' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-heading' });

export const metadata: Metadata = {
  title: "The Pearl Function Hall & Restaurant | Luxury Wedding Venue in Srikakulam",
  description: "The Pearl Function Hall and NEW BLUEEARTH Restaurant in Srikakulam. Experience unparalleled elegance, fine dining, and top-tier service for your weddings, corporate events, and celebrations.",
  keywords: ["Function Hall in Srikakulam", "Wedding Venue Srikakulam", "Best Restaurant Srikakulam", "The Pearl Function Hall", "NEW BLUEEARTH Restaurant", "Banquet Hall Srikakulam", "Catering Srikakulam"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {/* Full-width Glass Header */}
        <header className="glass" style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '1.25rem 0'
        }}>
          <div className="container" style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <Link href="/" style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ margin: 0, color: '#fff', fontSize: '1.65rem', letterSpacing: '2px', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                THE PEARL<span style={{ color: 'var(--primary)' }}>.</span>
              </h1>
              <span style={{ fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, marginTop: '3px' }}>
                Function Hall
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="desktop-nav" style={{ gap: '3rem', alignItems: 'center' }}>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/restaurant" className="nav-link">Restaurant & Catering</Link>
              <Link href="/gallery" className="nav-link">Gallery</Link>
              <Link href="/contact" className="nav-link" style={{ color: 'var(--primary)' }}>Enquire</Link>
            </nav>

            {/* Mobile Nav */}
            <nav className="mobile-nav" style={{ gap: '1.5rem', alignItems: 'center' }}>
              <Link href="/restaurant" className="nav-link">Restaurant</Link>
              <Link href="/gallery" className="nav-link">Gallery</Link>
              <Link href="/contact" className="nav-link" style={{ color: 'var(--primary)' }}>Enquire</Link>
            </nav>
          </div>
        </header>

        <Providers>
          {/* Main Content */}
          <main style={{ flex: 1 }}>
            {children}
          </main>

          {/* Minimalist Footer */}
          <footer style={{ 
            padding: '6rem 0 2rem', 
            background: 'var(--background)',
            borderTop: '1px solid var(--border)',
            color: '#fff'
          }}>
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>
              
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.65rem', margin: 0, letterSpacing: '2px', color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                    THE PEARL<span style={{ color: 'var(--primary)' }}>.</span>
                  </h2>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600 }}>
                    Function Hall
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  Redefining luxury events. The perfect venue for weddings, corporate galas, and exclusive celebrations.
                </p>
              </div>

              <div style={{ flex: '1 1 150px' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Explore</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li><Link href="/" className="nav-link">Home</Link></li>
                  <li><Link href="/restaurant" className="nav-link">Restaurant & Catering</Link></li>
                  <li><Link href="/gallery" className="nav-link">Gallery</Link></li>
                  <li><Link href="/contact" className="nav-link">Book Now</Link></li>
                </ul>
              </div>

              <div style={{ flex: '1 1 200px' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>NEW BLUEEARTH Restaurant</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>(The Pearl multi cuisine)</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Opp. Forest Office, Day & Night Junction, Srikakulam</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>+91 79979 95312</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>+91 79979 95314</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>+91 79979 95315</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>pearlrestaurentit@gmail.com</p>
              </div>

            </div>
            
            <div className="container" style={{ 
              marginTop: '5rem', 
              paddingTop: '2rem', 
              borderTop: '1px solid var(--border)', 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              color: 'var(--text-muted)',
              fontSize: '0.85rem'
            }}>
              <p>&copy; {new Date().getFullYear()} The Pearl Function Hall. All rights reserved.</p>
              <Link href="/admin/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Admin Portal</Link>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
