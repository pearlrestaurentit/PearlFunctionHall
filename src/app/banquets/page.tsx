import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Premium Banquets | The Pearl Function Hall",
  description: "Explore our luxurious banquet halls and private dining spaces for events of all sizes, from intimate gatherings of 10 to grand celebrations of 800.",
};

export default function BanquetsPage() {
  const banquetTypes = [
    {
      capacity: "700-800",
      title: "LARGE BANQUET",
      description: "Our grandest space, perfect for magnificent weddings, large corporate galas, and spectacular celebrations.",
    },
    {
      capacity: "50-100",
      title: "MINI BANQUET",
      description: "An elegant setting tailored for mid-sized events, birthday parties, and corporate meetings.",
    },
    {
      capacity: "25-30",
      title: "PRIVATE DINING",
      description: "An intimate and exclusive atmosphere designed for close family gatherings and VIP dinners.",
    },
    {
      capacity: "10-15",
      title: "MINI PRIVATE DINING",
      description: "A cozy yet luxurious space for highly exclusive dining experiences and confidential meetings.",
    }
  ];

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--background)' }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '60vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
            alt="Luxurious Banquet Hall"
            fill
            style={{ objectFit: 'cover' }}
            className="hero-bg-image"
            priority
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.95) 100%)', zIndex: 2 }} />
        
        {/* Ambient Blobs */}
        <div className="ambient-blob gold" style={{ top: '20%', left: '10%', width: '300px', height: '300px', zIndex: 3 }} />
        <div className="ambient-blob white" style={{ bottom: '10%', right: '15%', width: '250px', height: '250px', zIndex: 3 }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', marginBottom: '1rem', letterSpacing: '4px', color: '#fff', textTransform: 'uppercase' }}>
            Luxurious <span className="text-gold">Banquets</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#eaeaea', maxWidth: '800px', margin: '0 auto', fontWeight: 300, letterSpacing: '1px' }}>
            Spaces designed to elevate every occasion, from grand celebrations to intimate moments.
          </p>
        </div>
      </div>

      {/* Banquet Types Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
              Find Your <span className="text-gold">Perfect Space</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              We offer a variety of elegantly designed venues to accommodate events of any scale.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {banquetTypes.map((banquet, index) => (
              <div 
                key={index}
                className="banquet-card glass-card"
                style={{
                  borderRadius: '16px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <h3 style={{ 
                  color: 'var(--primary)', 
                  fontSize: '3rem', 
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '1rem',
                  fontWeight: 500
                }}>
                  {banquet.capacity}
                </h3>
                <h4 style={{ 
                  color: '#fff', 
                  fontSize: '1.1rem', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  fontWeight: 600
                }}>
                  {banquet.title}
                </h4>
                <p style={{ 
                  color: 'var(--text-muted)', 
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}>
                  {banquet.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
            Ready to <span className="text-gold">Plan Your Event?</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
            Get in touch with our event specialists to discuss your requirements and book the perfect space for your occasion.
          </p>
          <Link href="/contact" className="btn-primary">
            Inquire Now
          </Link>
        </div>
      </section>
    </div>
  );
}
