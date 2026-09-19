"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="section container" style={{ paddingTop: '8rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>Portfolio</p>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', color: '#fff' }}>Visual Journey</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
          Explore the unparalleled elegance, intricate details, and majestic scale of The Pearl Function Hall.
        </p>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading gallery...</div>
      ) : images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No images available in the gallery.</div>
      ) : (
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <motion.div 
              key={img.id}
              className="gallery-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (idx % 6) * 0.1 }}
              onClick={() => setSelectedImg(img.url)}
              style={{ 
                position: 'relative', 
                overflow: 'hidden',
                cursor: 'zoom-in',
                background: 'var(--secondary)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="img-overlay" style={{ position: 'relative', display: 'block', width: '100%', height: '100%' }}>
                <img 
                  src={img.url} 
                  alt={img.description || 'Gallery Image'} 
                  style={{ width: '100%', display: 'block', transition: 'transform 0.8s ease, filter 0.8s ease', filter: 'brightness(0.7)' }} 
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                  padding: '2.5rem 1.5rem 1.5rem 1.5rem',
                  display: 'flex', alignItems: 'flex-end'
                }}>
                  <h3 style={{ color: 'white', fontSize: '1.15rem', margin: 0, letterSpacing: '1px', fontWeight: 500 }}>
                    {img.description}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <style jsx>{`
        .gallery-item:hover img {
          transform: scale(1.05);
          filter: brightness(1) !important;
        }
        .gallery-item:hover .overlay-content {
          opacity: 1;
        }
        .gallery-item:hover .overlay-content h3 {
          transform: translateY(0);
        }
      `}</style>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
              zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: '2rem', cursor: 'zoom-out'
            }}
          >
            <motion.img
              src={selectedImg}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ maxWidth: '100%', maxHeight: '100%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 1)' }}
            />
            <button style={{
              position: 'absolute', top: '2rem', right: '3rem', color: 'white',
              fontSize: '3rem', background: 'none', border: 'none', cursor: 'pointer'
            }}>
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
