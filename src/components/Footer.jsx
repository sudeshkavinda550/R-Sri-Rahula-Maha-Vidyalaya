import React from 'react';
import { Link } from 'react-router-dom';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faHeart, faGlobe, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const quickLinks = [
  { label: 'මුල් පිටුව', to: '/' },
  { label: 'විද්‍යාලය ගැන', to: '/about' },
  { label: 'දැක්ම සහ මෙහෙවර', to: '/vision-mission' },
  { label: 'ගුරු මණ්ඩලය', to: '/staff' },
  { label: 'ඡායාරූප ගැලරිය', to: '/gallery' },
  { label: 'අපව අමතන්න', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-5 footer-grid">
          <div className="col-lg-4 col-md-6">
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
                <a href="#!" title="Facebook" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF}/></a>
                <a href="#!" title="Twitter" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter}/></a>
                <a href="#!" title="Instagram" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram}/></a>
                <a href="#!" title="YouTube" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube}/></a>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
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

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">ආසන්න සම්බන්ධතා</h5>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>{schoolData.address}</span>
              </div>
              {schoolData.phones.map((p, i) => (
                <div key={i} className="footer-contact-item">
                  <FontAwesomeIcon icon={faPhone} />
                  <a href={`tel:${p}`}>{p}</a>
                </div>
              ))}
              <div className="footer-contact-item">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href={`mailto:${schoolData.email}`}>{schoolData.email}</a>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">විද්‍යාලය පිළිබඳ</h5>
            <div className="footer-info-box">
              <div className="footer-info-row">
                <strong>ආරම්භ වර්ෂ:</strong>
                <span>{schoolData.established}</span>
              </div>
              <div className="footer-info-row">
                <strong>වෙබ් අඩවිය:</strong>
                <a href={`https://${schoolData.website}`} target="_blank" rel="noreferrer">{schoolData.website}</a>
              </div>
              <div className="footer-info-row">
                <strong>ආයතනය:</strong>
                <span>රාහුල මහා විද්‍යාලය</span>
              </div>
              <div className="footer-info-row footer-info-row-inline">
                <FontAwesomeIcon icon={faGlobe} />
                <span>ශ්‍රී ලංකාව</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="footer-bottom">
          © {new Date().getFullYear()} {schoolData.name}. සියලුම හිමිකම් සුරක්ෂිතයි. &nbsp;·&nbsp; ශ්‍රී ලංකාවේ සෑදී ඇත <FontAwesomeIcon icon={faHeart} className="footer-heart" />
        </div>
      </div>
    </footer>
  );
}
