import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';

const leftLinks = [
  { label:'Home',             path:'/' },
  { label:'About',            path:'/about' },
  { label:'Vision & Mission', path:'/vision-mission' },
];

const rightLinks = [
  { label:'Staff',     path:'/staff' },
  { label:'Gallery',   path:'/gallery' },
  { label:'Anthem',    path:'/anthem' },
  { label:'Contact',   path:'/contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { dark, setDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <style>
        {`
          .navbar-custom {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1030;
            transition: all 0.3s ease;
            /* Ensure proper background visibility in both Light and Dark themes */
            background: ${scrolled ? (dark ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)') : (dark ? '#1a1a1a' : '#ffffff')};
            box-shadow: ${scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)'};
            backdrop-filter: blur(10px);
            padding: ${scrolled ? '10px 0' : '15px 0'};
          }

          /* Desktop Nav Links - Increased font size */
          .nav-link-custom {
            color: ${dark ? '#f8f9fa' : '#333333'};
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem; /* Increased from default */
            margin: 0 8px;
            padding: 8px 12px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .nav-link-custom:hover, .nav-link-custom.active {
            color: #0d6efd; 
            background: transparent; 
          }

          /* Mobile Menu Overlay */
          .menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 1040;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }
          .menu-overlay.show {
            opacity: 1;
            pointer-events: auto;
          }

          /* Mobile Menu Drawer */
          .mobile-menu {
            position: fixed;
            top: 0;
            right: -320px;
            width: 300px;
            max-width: 85vw;
            height: 100vh;
            background-color: ${dark ? '#1a1a1a' : '#ffffff'};
            box-shadow: -5px 0 25px rgba(0,0,0,0.2);
            z-index: 1050;
            transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            overflow-y: auto;
            display: flex;
            flex-direction: column;
          }
          .mobile-menu.open {
            right: 0;
          }

          /* Mobile Nav Links - White Box Tags */
          .mobile-nav-link {
            display: block;
            padding: 14px 20px;
            margin: 8px 25px;
            background: ${dark ? '#2d2d2d' : '#f8f9fa'};
            color: ${dark ? '#fff' : '#333'};
            text-decoration: none;
            font-weight: 600;
            border-radius: 12px;
            border: 1px solid ${dark ? '#444' : '#eee'};
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
          }
          
          .mobile-menu.open .mobile-nav-link {
            animation: tagPopUp 0.4s ease forwards;
          }

          /* Mobile active style (Blue box) */
          .mobile-nav-link:hover, .mobile-nav-link.active {
            background: #0d6efd;
            color: white;
            border-color: #0d6efd;
            transform: translateY(-3px) !important;
            box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
          }

          /* Staggered animation delays */
          .mobile-menu.open .mobile-nav-link:nth-child(1) { animation-delay: 0.1s; }
          .mobile-menu.open .mobile-nav-link:nth-child(2) { animation-delay: 0.15s; }
          .mobile-menu.open .mobile-nav-link:nth-child(3) { animation-delay: 0.2s; }
          .mobile-menu.open .mobile-nav-link:nth-child(4) { animation-delay: 0.25s; }
          .mobile-menu.open .mobile-nav-link:nth-child(5) { animation-delay: 0.3s; }
          .mobile-menu.open .mobile-nav-link:nth-child(6) { animation-delay: 0.35s; }
          .mobile-menu.open .mobile-nav-link:nth-child(7) { animation-delay: 0.4s; }
          .mobile-menu.open .mobile-nav-link:nth-child(8) { animation-delay: 0.45s; }
          .mobile-menu.open .mobile-nav-link:nth-child(9) { animation-delay: 0.5s; }
          .mobile-menu.open .mobile-nav-link:nth-child(10) { animation-delay: 0.55s; }

          @keyframes tagPopUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Hamburger & Icons styling */
          .hamburger-btn, .theme-toggle-btn {
            background: transparent;
            border: none;
            color: ${dark ? '#ffffff' : '#333333'}; 
            font-size: 1.5rem;
            cursor: pointer;
            transition: color 0.3s;
          }
          
          /* School Name Text - Fixed Wrapping and Spacing */
          .brand-main {
            font-weight: bold;
            font-size: clamp(0.9rem, 1.1vw, 1.1rem);
            color: ${dark ? '#ffffff' : '#111111'}; 
            white-space: nowrap; /* Prevents text from breaking into multiple lines */
          }
        `}
      </style>

      <nav className={`navbar-custom`}>
        <div className="container-fluid px-3 px-xl-4">

          {/* ---- DESKTOP: 3-column layout ---- */}
          <div className="d-none d-lg-flex align-items-center w-100 justify-content-between">
            {/* Left links */}
            <div className="nav-links-group d-flex align-items-center">
              {leftLinks.map(link => (
                <Link key={link.path} to={link.path} className={`nav-link-custom ${isActive(link.path) ? 'active' : ''}`}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Center logo - Adjusted spacing to fit inside navbar safely */}
            <div className="nav-center-logo text-center">
              <Link to="/" className="text-decoration-none d-flex flex-column align-items-center">
                <img src="/School logo.png" alt="School Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                <span className="brand-main" style={{ marginTop: '2px' }}>ර/ශ්‍රී රාහුල මහා විද්‍යාලය</span>
              </Link>
            </div>

            {/* Right links */}
            <div className="nav-links-group d-flex align-items-center">
              {rightLinks.map(link => (
                <Link key={link.path} to={link.path} className={`nav-link-custom ${isActive(link.path) ? 'active' : ''}`}>
                  {link.label}
                </Link>
              ))}
              <button
                className="theme-toggle-btn ms-3"
                onClick={() => setDark(!dark)}
                title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <FontAwesomeIcon icon={dark ? faSun : faMoon} />
              </button>
            </div>
          </div>

          {/* ---- MOBILE: brand + icons ---- */}
          <div className="d-flex d-lg-none align-items-center justify-content-between w-100 py-1">
            <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
              <img src="/School logo.png" alt="School Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
              <div>
                  <span className="brand-main" style={{ fontSize: '1rem' }}>ර/ශ්‍රී රාහුල මහා විද්‍යාලය</span>
              </div>
            </Link>
            
            <div className="d-flex align-items-center gap-3">
              <button className="theme-toggle-btn" onClick={() => setDark(!dark)}>
                <FontAwesomeIcon icon={dark ? faSun : faMoon} />
              </button>
              <button className="hamburger-btn" onClick={() => setMenuOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* ---- MOBILE DRAWER & OVERLAY ---- */}
      <div 
        className={`menu-overlay ${menuOpen ? 'show' : ''}`} 
        onClick={() => setMenuOpen(false)} 
      />

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="d-flex align-items-center justify-content-between px-4 py-4 mb-2" style={{ borderBottom: `1px solid ${dark ? '#333' : '#eee'}` }}>
          <div className="d-flex align-items-center gap-2">
            <img src="/School logo.png" alt="School Logo" style={{ width: 35, height: 35, objectFit: 'contain' }} />
            <span style={{ fontWeight: 800, color: dark ? '#fff' : '#000', fontSize: '1.1rem' }}>Menu</span>
          </div>
          <button 
            onClick={() => setMenuOpen(false)} 
            style={{ background: 'transparent', border: 'none', fontSize: '1.8rem', color: dark ? '#aaa' : '#555', cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="d-flex flex-column pb-4">
          {[...leftLinks, ...rightLinks].map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto p-4" style={{ borderTop: `1px solid ${dark ? '#333' : '#eee'}` }}>
          <button 
            onClick={() => { setDark(!dark); setMenuOpen(false); }} 
            style={{ 
              width: '100%', padding: '12px 16px', borderRadius: '10px', 
              border: `1.5px solid ${dark ? '#444' : '#eee'}`, 
              background: dark ? '#333' : '#fff', 
              color: dark ? '#fff' : '#333', 
              fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', 
              transition: 'all 0.3s ease' 
            }}
          >
            <FontAwesomeIcon icon={dark ? faSun : faMoon} />
            {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
    </>
  );
}