"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaWifi, FaParking, FaSnowflake, FaGlassCheers, FaCameraRetro, FaMusic, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Home() {
  const [busyDates, setBusyDates] = useState<Set<string>>(new Set());
  const [previewImages, setPreviewImages] = useState<any[]>([]);
  
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    if (selectedDate) data.date = selectedDate;
    
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setBookingStatus("success");
      } else {
        setBookingStatus("error");
      }
    } catch {
      setBookingStatus("error");
    }
  };

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        const now = new Date();
        const dates = Array.isArray(data) ? data
          .filter((b: any) => b.status === 'CONFIRMED' && new Date(b.date) >= new Date(now.getFullYear(), now.getMonth(), now.getDate()))
          .map((b: any) => {
            const d = new Date(b.date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          }) : [];
        setBusyDates(new Set(dates));
      })
      .catch(err => console.error(err));

    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => setPreviewImages(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(err => console.error(err));
  }, []);

  // Calendar Logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} style={{ padding: '0.7rem' }}></div>);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isBusy = busyDates.has(dateStr);
    const isPast = new Date(year, month, d) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    
    const disabled = isBusy || isPast;

    calendarDays.push(
      <motion.div 
        key={d} 
        whileHover={!disabled ? { scale: 1.15, zIndex: 10, rotateX: 10, rotateY: 10, boxShadow: '0 15px 30px rgba(0,0,0,0.8)' } : {}}
        onClick={() => {
          if (!disabled) {
            setSelectedDate(dateStr);
            setBookingStatus("idle");
          }
        }}
        style={{
          aspectRatio: '1 / 1',
          textAlign: 'center',
          background: disabled ? 'rgba(10,10,10,0.5)' : 'var(--secondary)',
          color: isPast ? '#333' : isBusy ? '#555' : '#fff',
          borderRadius: '10px',
          border: isBusy ? '1px solid rgba(239, 68, 68, 0.25)' : isPast ? '1px solid transparent' : '1px solid var(--border)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          boxShadow: !disabled ? 'inset 0 1px 1px rgba(255,255,255,0.05), 0 3px 5px rgba(0,0,0,0.3)' : 'none',
          transition: 'background 0.3s ease'
        }}
      >
        <span style={{ fontSize: '1.15rem', fontWeight: 'bold' }}>{d}</span>
        {isBusy && <span style={{ fontSize: '0.6rem', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '3px', fontWeight: 'bold' }}>Booked</span>}
      </motion.div>
    );
  }

  return (
    <div>
      {/* 1. Cinematic Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2
          }}
        >
          <source src="/videos/conference_hall.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,1) 100%)',
          zIndex: -1
        }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxWidth: '900px', padding: '1.5rem', marginTop: '4rem' }}
        >
          <p style={{ color: 'var(--primary)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '2rem', fontSize: '0.85rem', fontWeight: 600 }}>Welcome to the pinnacle of luxury</p>
          <h1 style={{ fontSize: '5rem', marginBottom: '2rem', lineHeight: 1.1, color: '#fff', letterSpacing: '-1px' }}>The Pearl<br/>Function Hall</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '4rem', color: '#a1a1aa', fontWeight: 300, maxWidth: '600px', margin: '0 auto 4rem', lineHeight: 1.8 }}>
            Where your dream events become reality. The most prestigious venue designed for those who demand perfection.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <Link href="/contact" className="btn-primary hover-lift">
              Reserve Now
            </Link>
            <Link href="/gallery" className="btn-outline hover-lift">
              View Gallery
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. Intro Section */}
      <section className="section container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>The Experience</p>
            <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#fff' }}>Elegance Redefined</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              The Pearl Function Hall is an architectural masterpiece designed to host premium weddings, exclusive corporate galas, and grand celebrations. Every corner of our venue exudes sophistication.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
              With exquisite interior detailing, state-of-the-art facilities, and unmatched hospitality, we ensure your special moments are etched in memory forever.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ 
              position: 'relative', 
              height: '500px', 
              overflow: 'hidden', 
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' 
            }}
          >
            <img src="/images/yellow_chairs.jpg" alt="Interior Details" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>
      </section>

      {/* 3. Preview Section */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>Visuals</p>
            <h2 style={{ fontSize: '3rem', color: '#fff' }}>Experience The Pearl</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {previewImages.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                style={{ 
                  position: 'relative', 
                  height: '400px', 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                <img src={img.url} alt={img.description} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', filter: 'brightness(0.8)' }} className="hover-lift" onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1)')} onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(0.8)')} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                  padding: '2.5rem 1.5rem 1.5rem 1.5rem',
                  display: 'flex', alignItems: 'flex-end',
                  pointerEvents: 'none'
                }}>
                  <h3 style={{ color: 'white', fontSize: '1.25rem', margin: 0, letterSpacing: '1px', fontWeight: 500 }}>
                    {img.description}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 4. Interactive 3D Availability Calendar Section */}
      <section className="section container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>Availability</p>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#fff' }}>Secure Your Date</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.8 }}>
              Our venue is highly sought after and gets booked months in advance. Browse our interactive calendar to find available dates for your prestigious event.
            </p>
            <Link href="/contact" className="btn-outline hover-lift">Enquire Now</Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ 
              background: 'linear-gradient(145deg, #111, #161616)', 
              padding: '2.25rem', 
              borderRadius: '1.25rem', 
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.05)',
              perspective: '1000px',
              maxWidth: '600px',
              width: '100%',
              margin: '0 auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <button onClick={prevMonth} style={{ color: 'var(--primary)', padding: '0.5rem' }} className="hover-lift"><FaChevronLeft size={18}/></button>
              <h3 style={{ fontSize: '1.35rem', color: '#fff', margin: 0, letterSpacing: '1px' }}>{monthNames[month]} {year}</h3>
              <button onClick={nextMonth} style={{ color: 'var(--primary)', padding: '0.5rem' }} className="hover-lift"><FaChevronRight size={18}/></button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.35rem', marginBottom: '0.75rem', textAlign: 'center', color: 'var(--primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.65rem' }}>
              {calendarDays}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Amenities Section */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>Facilities</p>
            <h2 style={{ fontSize: '3rem', color: '#fff' }}>Uncompromising Quality</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            {[
              { icon: <FaSnowflake size={32} />, title: "Climate Control", desc: "Advanced HVAC systems ensuring absolute comfort regardless of weather." },
              { icon: <FaParking size={32} />, title: "Valet Service", desc: "Secure parking for 500+ vehicles with complimentary premium valet." },
              { icon: <FaGlassCheers size={32} />, title: "Luxury Dining", desc: "A separate, lavish dining hall equipped for multi-cuisine grand buffets." },
              { icon: <FaWifi size={32} />, title: "High-Speed WiFi", desc: "Enterprise-grade connectivity for live streaming and guests." },
              { icon: <FaCameraRetro size={32} />, title: "Photo Zones", desc: "Beautifully curated aesthetic spots perfect for wedding photoshoots." },
              { icon: <FaMusic size={32} />, title: "Acoustics", desc: "State-of-the-art sound systems and acoustic treatments." }
            ].map((facility, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  {facility.icon}
                </div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: '#fff' }}>{facility.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{facility.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Capacity Section */}
      <section className="section container" style={{ textAlign: 'center' }}>
         <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>Scale</p>
         <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#fff' }}>Grand Capacities</h2>
         <p style={{ color: 'var(--text-muted)', marginBottom: '5rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 5rem', lineHeight: 1.8 }}>
           Designed to comfortably host the most spectacular gatherings without compromising on space or luxury.
         </p>
         
         <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { cap: "700-800", label: "Large Banquet" },
              { cap: "50-100", label: "Mini Banquet" },
              { cap: "25-30", label: "Private Dining" },
              { cap: "10-15", label: "Mini Private Dining" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                style={{ padding: '2.5rem 1rem', border: '1px solid var(--border)', width: '100%', maxWidth: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--secondary)', borderRadius: '16px' }}
              >
                <h3 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--primary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{item.cap}</h3>
                <p style={{ fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', textAlign: 'center' }}>{item.label}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Booking Modal */}
      {selectedDate && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', padding: '1rem' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: 'var(--secondary)', padding: '2.5rem', borderRadius: '1.25rem', width: '100%', maxWidth: '550px', border: '1px solid var(--border)', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
            <button onClick={() => { setSelectedDate(null); setBookingStatus('idle'); }} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#fff', fontSize: '1.5rem', background: 'rgba(255,255,255,0.1)', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }} className="hover-lift">&times;</button>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>Secure Your Date</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Booking for: <strong style={{ color: 'var(--primary)' }}>{new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </p>
            
            {bookingStatus === 'success' ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#4ade80', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Request Sent!</h3>
                <p style={{ color: 'var(--text-muted)' }}>We will get back to you within 24 hours to confirm your booking.</p>
                <button onClick={() => { setSelectedDate(null); setBookingStatus('idle'); }} className="btn-primary hover-lift" style={{ marginTop: '2rem', padding: '0.75rem 2rem' }}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="premium-label">Full Name *</label>
                  <input type="text" name="name" required placeholder="e.g. John Doe" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label className="premium-label">Email *</label>
                    <input type="email" name="email" required placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="premium-label">Phone *</label>
                    <input type="tel" name="phone" required placeholder="e.g. 9876543210" pattern="[0-9]{10}" minLength={10} maxLength={10} title="Please enter a valid 10-digit phone number" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label className="premium-label">Event Type</label>
                    <select name="eventType">
                      <option value="Wedding">Wedding</option>
                      <option value="Reception">Reception</option>
                      <option value="Corporate">Corporate Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="premium-label">Estimated Guests *</label>
                    <input type="number" name="guests" placeholder="e.g. 500" required min="1" />
                  </div>
                </div>
                <button type="submit" disabled={bookingStatus === 'loading'} className="btn-primary hover-lift" style={{ marginTop: '1rem', width: '100%', opacity: bookingStatus === 'loading' ? 0.7 : 1, padding: '1.15rem' }}>
                  {bookingStatus === 'loading' ? 'Submitting...' : 'Submit Booking Request'}
                </button>
                {bookingStatus === 'error' && <p style={{ color: '#ef4444', marginTop: '0.5rem', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
