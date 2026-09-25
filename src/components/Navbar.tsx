"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
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
            <Link href="/banquets" className={`nav-link ${pathname === '/banquets' ? 'active' : ''}`}>Banquets</Link>
            <Link href="/outdoor-catering" className={`nav-link ${pathname === '/outdoor-catering' ? 'active' : ''}`}>Outdoor Catering</Link>
            <Link href="/restaurant" className={`nav-link ${pathname === '/restaurant' ? 'active' : ''}`}>Restaurant</Link>
            <Link href="/gallery" className={`nav-link ${pathname === '/gallery' ? 'active' : ''}`}>Gallery</Link>
            <Link href="/contact" className="nav-link" style={{ color: 'var(--primary)' }}>Enquire</Link>
          </nav>

          {/* Hamburger Icon */}
          <button 
            className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-menu-nav">
          <Link href="/" className="mobile-nav-link">Home</Link>
          <Link href="/banquets" className="mobile-nav-link">Banquets</Link>
          <Link href="/outdoor-catering" className="mobile-nav-link">Outdoor Catering</Link>
          <Link href="/restaurant" className="mobile-nav-link">Restaurant</Link>
          <Link href="/gallery" className="mobile-nav-link">Gallery</Link>
          <Link href="/contact" className="mobile-nav-link text-gold">Enquire</Link>
        </nav>
      </div>
    </>
  );
}
