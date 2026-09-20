import React from 'react';
import { Link } from 'react-router-dom';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationDot, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const quickLinks = [
  { label: 'මුල් පිටුව', to: '/' },
  { label: 'විද්‍යාලය ගැන', to: '/about' },
  { label: 'දැක්ම සහ මෙහෙවර', to: '/vision-mission' },
  { label: 'ගුරු මණ්ඩලය', to: '/staff' },
  { label: 'පුවත් සහ සිදුවීම්', to: '/news' },
  { label: 'ඡායාරූප ගැලරිය', to: '/gallery' },
  { label: 'අපව අමතන්න', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-topline">
          <span className="footer-topline-mark" />
          <span>රහල් පවුලේ නිල වෙබ් අඩවිය</span>
        </div>

        <div className="row g-4 footer-grid">
          <div className="col-lg-5 col-md-6">
            <div className="footer-brand">
              <div className="d-flex align-items-center gap-3 mb-3 footer-brand-row">
                <img src="/School logo.png" alt="School Logo" className="footer-logo" />
                <div>
                  <div className="school-name-footer">{schoolData.name}</div>
                  <div className="tagline">{schoolData.tagline}</div>
                </div>
              </div>

              <p className="footer-summary">
                දැනුම, අධ්‍යාපනය සහ ගුණාත්මක භාවය මඟින් අනාගත පරපුරට ශක්තියක් ලබා දෙන
                නිර්මාණශීලී අධ්‍යාපන පරිසරයක් අපගේ පාසල තුළ ගොඩනඟයි.
              </p>

              <div className="footer-social mt-3">
                <a href="https://web.facebook.com/srirahulamaha.vidyalaya.35" target="_blank" rel="noreferrer" title="Facebook" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">ඉක්මන් සබැඳි</h5>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <FontAwesomeIcon icon={faArrowRight} className="footer-link-icon" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-4 col-md-8">
            <h5 className="footer-heading">අපව හමුවන්න</h5>
            <div className="footer-contact-list">
              <div className="footer-contact-row">
                <span className="footer-contact-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
                <span>ලෙල්ලොපිටිය, රත්නපුර,<br />ශ්‍රී ලංකාව</span>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-icon"><FontAwesomeIcon icon={faPhone} /></span>
                <a href={`tel:${schoolData.phones[0]}`}>{schoolData.phones[0]}</a>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                <a href={`mailto:${schoolData.email}`}>{schoolData.email}</a>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-icon"><FontAwesomeIcon icon={faClock} /></span>
                <span>සඳුදා - සිකුරාදා<br />පෙ.ව. 7.30 - ප.ව. 2.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 {schoolData.name}</span>
          <span className="footer-bottom-dot" />
          <span>දැනුම ජීවිතය සාර්ථක කරයි</span>
        </div>
      </div>
    </footer>
  );
}
