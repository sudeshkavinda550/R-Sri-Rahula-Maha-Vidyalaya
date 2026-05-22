import React from 'react';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-5">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img src="/School logo.png" alt="School Logo" style={{ width: '50px', height: '50px', objectFit: 'contain', flexShrink: 0 }} />
                <div>
                  <div className="school-name-footer">{schoolData.nameEn}</div>
                  <div className="tagline">{schoolData.taglineEn}</div>
                </div>
              </div>
              <div className="footer-social mt-3">
                <a href="#!" title="Facebook"><FontAwesomeIcon icon={faFacebookF}/></a>
                <a href="#!" title="Twitter"><FontAwesomeIcon icon={faTwitter}/></a>
                <a href="#!" title="Instagram"><FontAwesomeIcon icon={faInstagram}/></a>
                <a href="#!" title="YouTube"><FontAwesomeIcon icon={faYoutube}/></a>
              </div>
            </div>
          </div>
          

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h5 className="footer-heading">Contact Us</h5>
            <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
              <div style={{ display:'flex',gap:12,alignItems:'flex-start' }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color:'var(--secondary)',marginTop:3,flexShrink:0 }}/>
                <span style={{ color:'rgba(255,255,255,0.55)',fontSize:'0.86rem',lineHeight:1.65 }}>{schoolData.address}</span>
              </div>
              {schoolData.phones.map((p,i)=>(
                <div key={i} style={{ display:'flex',gap:12,alignItems:'center' }}>
                  <FontAwesomeIcon icon={faPhone} style={{ color:'var(--secondary)',flexShrink:0 }}/>
                  <a href={`tel:${p}`} style={{ color:'rgba(255,255,255,0.55)',fontSize:'0.86rem',textDecoration:'none' }}>{p}</a>
                </div>
              ))}
              <div style={{ display:'flex',gap:12,alignItems:'center' }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ color:'var(--secondary)',flexShrink:0 }}/>
                <a href={`mailto:${schoolData.email}`} style={{ color:'rgba(255,255,255,0.55)',fontSize:'0.86rem',textDecoration:'none' }}>{schoolData.email}</a>
              </div>
            </div>
          </div>
        </div>

        <hr className="footer-divider"/>
        <div className="footer-bottom">
          Copyright © {new Date().getFullYear()} {schoolData.nameEn} (Pvt) Ltd. All Rights Reserved. &nbsp;·&nbsp; Made with <FontAwesomeIcon icon={faHeart} style={{ color:'var(--accent)',margin:'0 3px' }}/> in Sri Lanka
        </div>
      </div>
    </footer>
  );
}
