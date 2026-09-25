"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ background: 'var(--background)' }}>
      {/* Hero Banner */}
      <section style={{ 
        position: 'relative', 
        height: '40vh', 
        minHeight: '350px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--secondary)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("/images/hero_wedding_hall_1788953336829.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 10, marginTop: '80px', padding: '0 2rem' }}
        >
          <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Contact Us</p>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}>Let's Plan Your Event</h1>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="section container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '6rem',
          alignItems: 'start'
        }}>
          
          {/* Contact Info Side */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>We're Here to Help</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.8 }}>
              From initial inquiries to the final exquisite details, our dedicated event specialists are ready to make your dream event a reality.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}>
                  <FaMapMarkerAlt size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>Visit Us</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    NEW BLUEEARTH Restaurant<br/>
                    (The Pearl multi cuisine)<br/>
                    Opp. Forest Office, Day & Night Junction<br/>
                    Srikakulam
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}>
                  <FaPhoneAlt size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>Call Us</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    +91 79979 95312<br/>
                    +91 79979 95314<br/>
                    +91 79979 95315<br/>
                    Mon - Sun, 11am - 11pm
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}>
                  <FaEnvelope size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>Email Us</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>pearlrestaurentit@gmail.com</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '4rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://wa.me/917997995312" target="_blank" rel="noreferrer" className="hover-lift" style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 2.5rem', background: '#25D366', color: 'white', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
              }}>
                <FaWhatsapp size={24} /> Message on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Booking Form Side */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{
            background: 'var(--secondary)',
            padding: '3.5rem',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#fff' }}>Send an Enquiry</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.05rem' }}>Fill out the details below and we will get back to you within 24 hours.</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <label className="premium-label">Full Name *</label>
                <input type="text" name="name" required placeholder="e.g. John Doe" />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div>
                  <label className="premium-label">Email *</label>
                  <input type="email" name="email" required placeholder="john@example.com" />
                </div>
                <div>
                  <label className="premium-label">Phone *</label>
                  <input type="tel" name="phone" required placeholder="e.g. 9876543210" pattern="[0-9]{10}" minLength={10} maxLength={10} title="Please enter a valid 10-digit phone number" />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div>
                  <label className="premium-label">Event Date *</label>
                  <input type="date" name="date" required />
                </div>
                <div>
                  <label className="premium-label">Event Type</label>
                  <select name="eventType">
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="premium-label">Estimated Guests *</label>
                <input type="number" name="guests" placeholder="e.g. 500" required min="1" />
              </div>
              
              <div>
                <label className="premium-label">Additional Message *</label>
                <textarea name="message" rows={4} placeholder="Tell us more about your event requirements..." style={{ resize: 'vertical' }} required></textarea>
              </div>
              
              <button type="submit" disabled={status === 'loading'} className="btn-primary hover-lift" style={{
                width: '100%',
                marginTop: '1rem',
                border: 'none',
                opacity: status === 'loading' ? 0.7 : 1,
              }}>
                {status === 'loading' ? 'Submitting...' : 'Submit Enquiry'}
              </button>
              
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '1.5rem', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', borderRadius: '8px', textAlign: 'center', marginTop: '1rem' }}>
                  <strong>Success!</strong> Your enquiry has been submitted. We will contact you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '8px', textAlign: 'center', marginTop: '1rem' }}>
                  <strong>Error:</strong> Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem', color: '#fff' }}>
                Find <span className="text-gold">Us</span>
              </h2>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>The Pearl Function Hall</h3>
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
                  <p style={{ color: 'var(--text-muted)' }}>pearlrestaurentit@gmail.com</p>
                </div>
              </div>
              <a href="https://maps.app.goo.gl/x3ZdQoFuVCCpvzwXA" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Get Directions
              </a>
            </div>
            <div style={{ flex: '1 1 400px', position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <iframe
                src="https://maps.google.com/maps?q=The%20Pearl%20Function%20Hall%20Srikakulam&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
