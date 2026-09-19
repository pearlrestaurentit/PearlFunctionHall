"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  
  // Manual block state
  const [blockDate, setBlockDate] = useState("");
  const [blockReason, setBlockReason] = useState("");
  const [blockGuests, setBlockGuests] = useState("");

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchBookings = () => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data));
  };

  const fetchGallery = () => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => setGalleryImages(data));
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
    if (status === "authenticated") {
      fetchBookings();
      fetchGallery();
    }
  }, [status, router]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (newStatus === 'DELETE') {
      if (!window.confirm('Are you sure you want to permanently delete this booking?')) {
        fetchBookings(); // Reset select
        return;
      }
      await fetch('/api/bookings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchBookings();
      return;
    }
    
    await fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    fetchBookings();
  };

  const handleManualBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate) return;
    
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: blockReason || "Manual Block",
        date: blockDate,
        guests: blockGuests,
        status: "CONFIRMED"
      })
    });
    
    setBlockDate("");
    setBlockReason("");
    setBlockGuests("");
    fetchBookings();
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);

    try {
      await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });
      setUploadFile(null);
      setUploadTitle("");
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchGallery();
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchGallery();
  };

  if (status === "loading") return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (!session) return null;

  return (
    <div className="container section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>Admin Dashboard</h1>
        <button 
          onClick={() => signOut()} 
          className="btn-outline"
        >
          Logout
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Manage Gallery Section */}
        <div style={{ background: 'var(--secondary)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#fff' }}>Manage Gallery Images</h2>
          
          <form onSubmit={handleImageUpload} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.9rem' }}>Select Image file</label>
              <input 
                type="file" 
                accept="image/*"
                required
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                ref={fileInputRef}
                style={{ width: '100%', background: 'var(--background)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '4px', color: '#fff' }}
              />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.9rem' }}>Image Title / Description</label>
              <input 
                type="text" 
                placeholder="e.g. Grand Stage Setup"
                required
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                style={{ width: '100%', background: 'var(--background)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '4px', color: '#fff' }}
              />
            </div>
            <button type="submit" disabled={isUploading} className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '4px', opacity: isUploading ? 0.5 : 1 }}>
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </form>

          {/* Uploaded Images Preview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {Array.isArray(galleryImages) && galleryImages.map(img => (
              <div key={img.id} style={{ position: 'relative', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={img.url} alt={img.description} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  onClick={() => handleDeleteImage(img.id)}
                  style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255,0,0,0.8)', color: 'white', padding: '0.3rem', borderRadius: '4px' }}
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
            {galleryImages.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No images uploaded yet.</p>}
          </div>
        </div>

        {/* Manual Date Block */}
        <div style={{ background: 'var(--secondary)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#fff' }}>Manually Block Dates</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Set specific dates as busy/reserved so they show up on the public home page availability calendar.
          </p>
          <form onSubmit={handleManualBlock} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 180px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.9rem' }}>Date</label>
              <input 
                type="date" 
                required
                value={blockDate}
                onChange={(e) => setBlockDate(e.target.value)}
                style={{ width: '100%', background: 'var(--background)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '4px', color: '#fff' }}
              />
            </div>
            <div style={{ flex: '1 1 120px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.9rem' }}>Guests</label>
              <input 
                type="number" 
                placeholder="e.g. 500"
                value={blockGuests}
                onChange={(e) => setBlockGuests(e.target.value)}
                style={{ width: '100%', background: 'var(--background)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '4px', color: '#fff' }}
              />
            </div>
            <div style={{ flex: '2 1 250px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.9rem' }}>Reason (e.g. Maintenance, Private Event)</label>
              <input 
                type="text" 
                placeholder="Maintenance / Private Block"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                style={{ width: '100%', background: 'var(--background)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '4px', color: '#fff' }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '4px' }}>
              Block Date
            </button>
          </form>
        </div>

        {/* Bookings Table */}
        <div style={{ background: 'var(--secondary)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--border)', overflowX: 'auto' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#fff' }}>Recent Enquiries & Bookings</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '1.25rem 1rem', color: '#ccc' }}>Name / Details</th>
                <th style={{ padding: '1.25rem 1rem', color: '#ccc' }}>Date</th>
                <th style={{ padding: '1.25rem 1rem', color: '#ccc' }}>Guests</th>
                <th style={{ padding: '1.25rem 1rem', color: '#ccc' }}>Status</th>
                <th style={{ padding: '1.25rem 1rem', color: '#ccc' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No bookings found</td></tr>
              ) : (
                Array.isArray(bookings) && bookings.map((booking: any) => (
                  <tr key={booking.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem' }}>
                      <strong style={{ color: '#fff', fontSize: '1.05rem' }}>{booking.name}</strong>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {booking.phone && <span>{booking.phone} • </span>}
                        {booking.email && <span>{booking.email}</span>}
                      </div>
                      {booking.eventType !== 'Other' && <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.25rem', textTransform: 'uppercase' }}>{booking.eventType}</div>}
                    </td>
                    <td style={{ padding: '1rem', color: '#fff' }}>{new Date(booking.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td style={{ padding: '1rem', color: '#fff' }}>{booking.guests || '-'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.35rem 0.75rem', 
                        borderRadius: '50px', 
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        background: booking.status === 'PENDING' ? 'rgba(234, 179, 8, 0.2)' : booking.status === 'CONFIRMED' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: booking.status === 'PENDING' ? '#facc15' : booking.status === 'CONFIRMED' ? '#4ade80' : '#f87171'
                      }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <select 
                        value={booking.status} 
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="action-select"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRM</option>
                        <option value="CANCELLED">CANCEL</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
