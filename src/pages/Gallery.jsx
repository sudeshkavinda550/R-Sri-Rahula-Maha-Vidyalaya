import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight, faExpand } from '@fortawesome/free-solid-svg-icons';
import useReveal from '../hooks/useReveal';

// Standard Reveal for Titles and Texts
function Reveal({ children, className='', delay=0 }) {
  const { ref, visible } = useReveal();
  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ 
        opacity: visible ? 1 : 0, 
        transform: visible ? 'none' : 'translateY(40px)', 
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`
      }}
    >
      {children}
    </div>
  );
}

export default function Gallery() {
  const [lb, setLb] = useState(null);
  
  // Single observer for the entire grid container
  const { ref: gridRef, visible: gridVisible } = useReveal();

  const prev = () => setLb(i => (i - 1 + schoolData.gallery.length) % schoolData.gallery.length);
  const next = () => setLb(i => (i + 1) % schoolData.gallery.length);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lb === null) return;
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lb]);

  return (
    <div className="page-transition">
      <style>
        {`
          /* Professional Responsive Grid */
          .pro-gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            grid-auto-rows: 250px;
            gap: 20px;
            grid-auto-flow: dense;
          }

          /* Tablet & Desktop Span handling */
          @media (min-width: 768px) {
            .pro-gallery-grid .col-span-2 { grid-column: span 2; }
            .pro-gallery-grid .row-span-2 { grid-row: span 2; }
            .pro-gallery-grid .row-span-2 img { height: 100%; }
          }

          /* Mobile adjustments */
          @media (max-width: 767px) {
            .pro-gallery-grid {
              grid-template-columns: 1fr;
              grid-auto-rows: 250px;
            }
            .pro-gallery-grid .col-span-2,
            .pro-gallery-grid .row-span-2 {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
            }
          }

          /* Gallery Item Styling & Hover Effects */
          .pro-gallery-item {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            background: #eee;
            height: 100%;
          }

          .pro-gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .pro-gallery-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%);
            opacity: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px;
            transition: opacity 0.4s ease;
          }

          .pro-gallery-item:hover img {
            transform: scale(1.08);
          }

          .pro-gallery-item:hover .pro-gallery-overlay {
            opacity: 1;
          }

          .pro-caption {
            color: #fff;
            font-size: 1.1rem;
            font-weight: 600;
            transform: translateY(15px);
            transition: transform 0.4s ease;
          }

          .pro-gallery-item:hover .pro-caption {
            transform: translateY(0);
          }

          .pro-zoom-icon {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #fff;
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(4px);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transform: scale(0.8) translateY(-10px);
            opacity: 0;
            transition: all 0.4s ease;
          }

          .pro-gallery-item:hover .pro-zoom-icon {
            transform: scale(1) translateY(0);
            opacity: 1;
          }

          /* Professional Lightbox */
          .pro-lightbox {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
          }

          .pro-lightbox-img {
            max-width: 90vw;
            max-height: 80vh;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            object-fit: contain;
            user-select: none;
          }

          .pro-lightbox-controls button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(4px);
          }

          .pro-lightbox-controls button:hover {
            background: white;
            color: black;
            transform: translateY(-50%) scale(1.1);
          }

          .pro-btn-prev { left: 30px; }
          .pro-btn-next { right: 30px; }

          .pro-btn-close {
            position: absolute;
            top: 30px;
            right: 30px;
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .pro-btn-close:hover {
            background: #ff4757;
            transform: rotate(90deg);
          }

          .pro-lightbox-info {
            position: absolute;
            bottom: 30px;
            color: white;
            text-align: center;
          }

          .pro-lightbox-info h4 {
            margin: 0 0 5px 0;
            font-size: 1.2rem;
            font-weight: 600;
          }

          .pro-lightbox-info span {
            font-size: 0.9rem;
            opacity: 0.7;
          }

          @media (max-width: 767px) {
            .pro-btn-prev { left: 10px; width: 40px; height: 40px; }
            .pro-btn-next { right: 10px; width: 40px; height: 40px; }
            .pro-lightbox-img { max-width: 100vw; max-height: 70vh; border-radius: 0; }
          }

          @keyframes fadeIn { to { opacity: 1; } }
        `}
      </style>

      <PageHeader
        title="ඡායාරූප ගැලරිය"
        subtitle="අධ්‍යයන, ක්‍රීඩා, කලා සහ සංස්කෘතික සිදුවීම්වල සුන්දර මතකයන්"
        breadcrumbs={[{ label: 'Gallery' }]}
        bgImage="/school-bg.jpg"
      />

      <section className="inner-section" style={{ padding: '80px 0', backgroundColor: 'var(--light-bg, #f8f9fa)' }}>
        <div className="container">
          
          <Reveal className="text-center mb-5">
            <div className="section-badge" style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(13, 110, 253, 0.1)', color: '#0d6efd', borderRadius: '50px', fontWeight: '600', marginBottom: '15px' }}>
              අපේ මතකයන්
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800' }}>
              සුන්දර මතක සටහන්
            </h2>
            <div className="divider-line mx-auto" style={{ width: '60px', height: '4px', background: '#0d6efd', margin: '20px auto', borderRadius: '2px' }} />
            <p className="section-subtitle mx-auto" style={{ color: '#6c757d', maxWidth: '600px', fontSize: '1.1rem' }}>
              විද්‍යාලයේ විවිධ අවස්ථා, ජයග්‍රහණ හා සිසුන්ගේ දක්ෂතා දැක්වෙන ඡායාරූප එකතුවක් පහතින් නරඹන්න.
            </p>
          </Reveal>

          {/* Grid Container wrapped in a SINGLE observer */}
          <div ref={gridRef} className="pro-gallery-grid">
            {schoolData.gallery.map((item, i) => (
              <div 
                key={i}
                className={`pro-gallery-item ${item.span || ''}`} 
                onClick={() => setLb(i)}
                style={{ 
                  /* Dynamic CSS based on container visibility with a strict 1-second gap per image */
                  opacity: gridVisible ? 1 : 0, 
                  transform: gridVisible ? 'translateY(0)' : 'translateY(50px)',
                  /* Change "1s" here if you want it faster (e.g., 0.3s or 0.5s) */
                  transition: `opacity 0.6s ease-out ${i * 0.1}s, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.1}s` 
                }}
              >
                <img src={item.url} alt={item.caption} loading="lazy" />
                
                <div className="pro-gallery-overlay">
                  <div className="pro-zoom-icon">
                    <FontAwesomeIcon icon={faExpand} />
                  </div>
                  <div className="pro-caption">{item.caption}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Professional Lightbox Overlay */}
      {lb !== null && (
        <div className="pro-lightbox" onClick={() => setLb(null)}>
          
          <button className="pro-btn-close" onClick={() => setLb(null)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <div className="pro-lightbox-controls">
            <button className="pro-btn-prev" onClick={(e) => { e.stopPropagation(); prev(); }}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="pro-btn-next" onClick={(e) => { e.stopPropagation(); next(); }}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <img 
            src={schoolData.gallery[lb].url} 
            alt={schoolData.gallery[lb].caption} 
            className="pro-lightbox-img" 
            onClick={(e) => e.stopPropagation()} 
          />
          
          <div className="pro-lightbox-info" onClick={(e) => e.stopPropagation()}>
            <h4>{schoolData.gallery[lb].caption}</h4>
            <span>{lb + 1} / {schoolData.gallery.length}</span>
          </div>

        </div>
      )}
    </div>
  );
}