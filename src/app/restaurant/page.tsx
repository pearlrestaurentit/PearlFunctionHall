import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "NEW BLUEEARTH Restaurant | Best Fine Dining in Srikakulam",
  description: "Experience exquisite local and international multi-cuisine at NEW BLUEEARTH Restaurant (The Pearl) in Srikakulam. Premium catering services available for all events.",
  keywords: ["Restaurant in Srikakulam", "Best Dining Srikakulam", "NEW BLUEEARTH Restaurant", "The Pearl Restaurant", "Multi-cuisine Srikakulam", "Catering Services Srikakulam"],
};

export default function RestaurantPage() {
  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--background)' }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '60vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Image
          src="/images/restaurant_hero.jpg"
          alt="Fine Dining at The Pearl"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.8) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1rem', letterSpacing: '2px', color: '#fff' }}>
            Fine Dining & <span className="text-gold">Catering</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
            A culinary experience that matches the elegance of your events.
          </p>
        </div>
      </div>

      {/* Restaurant Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
                The Pearl <span className="text-gold">Restaurant</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Indulge in a world of flavors at our in-house luxury restaurant. Our award-winning chefs 
                craft exquisite menus featuring local and international cuisines, perfect for an intimate 
                dinner, a family celebration, or a business lunch.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                With a meticulously curated wine list and a mesmerizing ambiance, every meal at The Pearl 
                is an occasion to remember.
              </p>
              <Link href="/contact" className="btn-primary">
                Reserve a Table
              </Link>
            </div>
            <div style={{ flex: '1 1 400px', position: 'relative', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
               <Image
                 src="/images/restaurant_interior.jpg"
                 alt="Restaurant Interior"
                 fill
                 style={{ objectFit: 'cover' }}
               />
            </div>
          </div>
        </div>
      </section>

      {/* Catering Section */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '4rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px', position: 'relative', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
               <Image
                 src="/images/restaurant_hero.jpg"
                 alt="Catering Services"
                 fill
                 style={{ objectFit: 'cover' }}
               />
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
                Premium <span className="text-gold">Catering</span> Services
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Bring The Pearl's exceptional culinary standards to your next event. We provide comprehensive 
                catering services tailored to your specific needs, whether it's a grand wedding reception, a corporate 
                gala, or a private gathering.
              </p>
              <ul style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '1.1rem', listStylePosition: 'inside', paddingLeft: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Customizable menus tailored to your theme</li>
                <li style={{ marginBottom: '0.5rem' }}>Professional servers and staff</li>
                <li style={{ marginBottom: '0.5rem' }}>Live cooking stations and buffets</li>
                <li style={{ marginBottom: '0.5rem' }}>Dietary accommodations (Vegan, Gluten-free, etc.)</li>
              </ul>
              <Link href="/contact" className="btn-outline">
                Inquire About Catering
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
                Visit <span className="text-gold">Us</span>
              </h2>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>NEW BLUEEARTH Restaurant</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                (The Pearl multi cuisine)
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Opp. Forest Office, Day & Night Junction, Srikakulam
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>Hours of Operation</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Monday - Sunday: 11:00 AM - 11:00 PM</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>Contact</h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>+91 79979 95312</p>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>+91 79979 95314</p>
                  <p style={{ color: 'var(--text-muted)' }}>+91 79979 95315</p>
                </div>
              </div>
              <a href="https://maps.app.goo.gl/wmKf2Q16jJ2BCtRz8" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Get Directions
              </a>
            </div>
            <div style={{ flex: '1 1 400px', position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.303254922616!2d83.8926101!3d18.3056148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c1562d3f945b9%3A0xc8e3c1382a6a22eb!2sNEW%20BLUEEARTH%20Restaurant!5e0!3m2!1sen!2sus!4v1716912345678!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
