import React from 'react';
import { Link } from 'react-router-dom';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const navLinks = [
  { label:'Home',            to:'/' },
  { label:'About',           to:'/about' },
  { label:'Vision & Mission',to:'/vision-mission' },
  { label:'Staff',           to:'/staff' },
  { label:'Gallery',         to:'/gallery' },
  { label:'Anthem',          to:'/anthem' },
  { label:'Contact',         to:'/contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-5">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{ width:50,height:50,background:'var(--gradient)',borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',flexShrink:0 }}>🏫</div>
                <div>
                  <div className="school-name-footer">{schoolData.nameEn}</div>
                  <div className="tagline">{schoolData.taglineEn}</div>
                </div>
              </div>
              <p>Sri Lanka's leading national school — dedicated to academic excellence, character development, and holistic education since {schoolData.established}.</p>
              <div className="footer-social mt-3">
                <a href="#!" title="Facebook"><FontAwesomeIcon icon={faFacebookF}/></a>
                <a href="#!" title="Twitter"><FontAwesomeIcon icon={faTwitter}/></a>
                <a href="#!" title="Instagram"><FontAwesomeIcon icon={faInstagram}/></a>
                <a href="#!" title="YouTube"><FontAwesomeIcon icon={faYoutube}/></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              {navLinks.slice(0,4).map(l=>(
                <li key={l.to}>
                  <Link to={l.to}><FontAwesomeIcon icon={faArrowRight} style={{fontSize:'0.6rem'}}/>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-heading">More Pages</h5>
            <ul className="footer-links">
              {navLinks.slice(4).map(l=>(
                <li key={l.to}>
                  <Link to={l.to}><FontAwesomeIcon icon={faArrowRight} style={{fontSize:'0.6rem'}}/>{l.label}</Link>
                </li>
              ))}
            </ul>
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
            {/* Newsletter */}
            <div style={{ marginTop:22 }}>
              <div style={{ color:'rgba(255,255,255,0.5)',fontSize:'0.82rem',marginBottom:10 }}>📧 Newsletter</div>
              <div style={{ display:'flex',gap:8 }}>
                <input type="email" placeholder="Your email..." style={{ flex:1,padding:'10px 14px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:10,color:'white',fontSize:'0.83rem',outline:'none' }}/>
                <button style={{ background:'var(--gradient-gold)',border:'none',borderRadius:10,padding:'10px 14px',color:'var(--primary-dark)',fontWeight:700,cursor:'pointer',fontSize:'0.9rem' }}>→</button>
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
