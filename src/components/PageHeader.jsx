import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function PageHeader({ title, subtitle, breadcrumbs = [], bgImage }) {
  return (
    <div
      className="page-header"
      style={bgImage ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      } : {}}
    >
      {/* Dark overlay for readability */}
      <div className="page-header-overlay" />
      {/* Animated diagonal shapes */}
      <div className="page-header-shape shape-1" />
      <div className="page-header-shape shape-2" />

      <div className="container page-header-content">
        {/* Breadcrumb */}
        <nav className="page-breadcrumb animate-fade-down" aria-label="breadcrumb">
          <Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link>
          {breadcrumbs.map((b, i) => (
            <span key={i}>
              <FontAwesomeIcon icon={faChevronRight} className="bc-sep" />
              {b.path ? <Link to={b.path}>{b.label}</Link> : <span className="bc-current">{b.label}</span>}
            </span>
          ))}
        </nav>

        <h1 className="page-header-title animate-fade-left">{title}</h1>
        {subtitle && <p className="page-header-subtitle animate-fade-left delay-2">{subtitle}</p>}
        <div className="page-header-line animate-fade-up delay-3" />
      </div>
    </div>
  );
}
