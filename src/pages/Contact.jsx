import React, { useState } from 'react';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faGlobe, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useReveal from '../hooks/useReveal';

export default function Contact() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="text-center mb-5" ref={ref} style={{ opacity: visible ? 1 : 0, transition: 'all 0.7s ease' }}>
          <h2 className="section-title">අප හා සම්බන්ධ වන්න</h2>
          <div className="divider-line mx-auto" />
          <p className="section-subtitle">ඔබේ ප්‍රශ්නවලට හා ඇතුළත් වීමේ තොරතුරු සඳහා අප හා සම්බන්ධ වන්න</p>
        </div>
        <div className="row g-4">
          {/* Info */}
          <div className="col-lg-5" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-30px)', transition: 'all 0.8s ease 0.2s' }}>
            <div className="contact-info-card">
              <h4 style={{ marginBottom: 30 }}>📍 සම්බන්ධ තොරතුරු</h4>
              <div className="contact-info-item">
                <div className="contact-icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
                <div>
                  <h6>ලිපිනය</h6>
                  <p>{schoolData.address}</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon"><FontAwesomeIcon icon={faPhone} /></div>
                <div>
                  <h6>දුරකතන</h6>
                  {schoolData.phones.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
                <div>
                  <h6>විද්‍යුත් තැපෑල</h6>
                  <p>{schoolData.email}</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon"><FontAwesomeIcon icon={faGlobe} /></div>
                <div>
                  <h6>වෙබ් අඩවිය</h6>
                  <p>{schoolData.website}</p>
                </div>
              </div>
              {/* Map embed placeholder */}
              <div style={{ borderRadius: 12, overflow: 'hidden', marginTop: 8, height: 160, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 8 }}>🗺️</div>
                  <div style={{ fontSize: '0.82rem' }}>Google Maps embed<br />vercel.json හෝ iframe කේතය එකතු කරන්න</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(30px)', transition: 'all 0.8s ease 0.3s' }}>
            <div className="contact-form-card">
              <h4 style={{ marginBottom: 24, color: 'var(--primary)' }}>✉️ පණිවිඩ යවන්න</h4>
              {sent && (
                <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: 12, padding: '14px 20px', marginBottom: 20, color: '#155724', fontWeight: 500 }}>
                  ✅ ඔබේ පණිවිඩය සාර්ථකව ලැබී ඇත. ඉක්මනින් ඔබ හා සම්බන්ධ වෙමු!
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input className="form-control-custom" placeholder="ඔබේ නම *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <input className="form-control-custom" type="email" placeholder="විද්‍යුත් ලිපිනය *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <input className="form-control-custom" placeholder="දුරකතන අංකය" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <select className="form-control-custom" style={{ cursor: 'pointer' }}>
                      <option>ඇතුළත් වීම ගැන</option>
                      <option>විෂය නිර්දේශ ගැන</option>
                      <option>ගුරු රැකියා</option>
                      <option>වෙනත්</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <textarea className="form-control-custom" rows="5" placeholder="ඔබේ පණිවිඩය *" required value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: 'vertical' }} />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn-primary-custom w-100" style={{ justifyContent: 'center' }}>
                      <FontAwesomeIcon icon={faPaperPlane} /> පණිවිඩ යවන්න
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
