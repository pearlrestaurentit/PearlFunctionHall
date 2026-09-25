import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Premium Outdoor Catering | The Pearl Function Hall",
  description: "Experience The Pearl's premium outdoor catering services. We bring our exquisite culinary standards to your weddings, corporate events, and private gatherings.",
};

export default function OutdoorCateringPage() {
  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--background)' }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '60vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Image
            src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop"
            alt="Premium Outdoor Catering"
            fill
            style={{ objectFit: 'cover' }}
            className="hero-bg-image"
            priority
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.95) 100%)', zIndex: 2 }} />
        
        {/* Ambient Blobs */}
        <div className="ambient-blob gold" style={{ top: '10%', left: '15%', width: '250px', height: '250px', zIndex: 3 }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', marginBottom: '1rem', letterSpacing: '4px', color: '#fff', textTransform: 'uppercase' }}>
            Outdoor <span className="text-gold">Catering</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#eaeaea', maxWidth: '800px', margin: '0 auto', fontWeight: 300, letterSpacing: '1px' }}>
            Unforgettable culinary experiences, brought to your chosen destination.
          </p>
        </div>
      </div>

      {/* Premium Catering Services */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 500px' }}>
              <span className="premium-label" style={{ color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                Premium Services
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
                Exquisite Dining <br/><span className="text-gold">Anywhere</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Bring The Pearl's award-winning culinary standards to your next off-site event. Our premium outdoor catering service is designed for clients who demand excellence, elegance, and flawless execution.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Whether it is a grand destination wedding, a high-profile corporate retreat, or an exclusive garden party, our team of expert chefs and dedicated staff will craft a bespoke dining experience that surpasses all expectations.
              </p>
              <Link href="/contact" className="btn-primary">
                Book Catering
              </Link>
            </div>
            
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass-card" style={{ padding: '2rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Live Cooking Stations</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Interactive culinary experiences featuring fresh ingredients, prepared right in front of your guests.</p>
              </div>
              <div className="glass-card" style={{ padding: '2rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Bespoke Menus</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Tailored menus reflecting your personal taste, theme, and dietary requirements.</p>
              </div>
              <div className="glass-card" style={{ padding: '2rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>VIP Service Staff</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Highly trained, impeccably dressed professionals ensuring every guest is treated like royalty.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery/Experience Section (Placeholder) */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
         <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '3rem' }}>
              The Premium <span className="text-gold">Experience</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="experience-card">
                <Image src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop" alt="Gourmet Buffet" fill style={{ objectFit: 'cover' }} />
                <div className="experience-overlay">
                  <div className="experience-text">
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Gourmet Buffet Setup</h3>
                    <p style={{ color: '#ccc', fontSize: '0.95rem' }}>A lavish spread designed for visual impact and incredible taste.</p>
                  </div>
                </div>
              </div>
              <div className="experience-card">
                <Image src="https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?q=80&w=1000&auto=format&fit=crop" alt="Fine Dining" fill style={{ objectFit: 'cover' }} />
                <div className="experience-overlay">
                  <div className="experience-text">
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Fine Dining Service</h3>
                    <p style={{ color: '#ccc', fontSize: '0.95rem' }}>White-glove service ensuring a flawless seated dinner experience.</p>
                  </div>
                </div>
              </div>
              <div className="experience-card">
                <Image src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1000&auto=format&fit=crop" alt="Elegant Dessert Bar" fill style={{ objectFit: 'cover' }} />
                <div className="experience-overlay">
                  <div className="experience-text">
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Elegant Dessert Bar</h3>
                    <p style={{ color: '#ccc', fontSize: '0.95rem' }}>Decadent sweet treats presented as works of art.</p>
                  </div>
                </div>
              </div>
            </div>
         </div>
      </section>
    </div>
  );
}
