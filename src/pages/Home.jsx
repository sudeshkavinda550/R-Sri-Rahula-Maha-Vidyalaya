import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { schoolData } from '../data/schoolData';
import useReveal from '../hooks/useReveal';

// Reusable Counter component
function Counter({ target, suffix }) {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const [started, setStarted] = React.useState(false);
  
  useEffect(() => {
    // Single observer to track visibility
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    // Counting logic with staggered interval based on grid visibility
    if (!started) return;
    let v = 0;
    const step = target / (2000 / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [started, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Stagger delays for sequential pop-up
function RevealSection({ children, className = '', delay = 0 }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(36px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Home() {
  
  // --- Hero Section Image Slideshow Logic ---
  const [currentBg, setCurrentBg] = useState(0);
  
  // Define image paths for your hero slideshow (user can update these)
  const heroImages = [
    '/picture 13.jpg', 
    '/picture 14.jpg', 
    '/picture 15.jpg', 
    '/picture 16.jpg', 
    '/school-bg.jpg'  
  ];

  // Automatic image change every 5 seconds (5000ms) with a 5-sec gap
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Mouse click on hero to change image with sequential pop-up
  const handleHeroClick = () => {
    setCurrentBg((prev) => (prev + 1) % heroImages.length);
  };

  // Prevent background click from affecting button interaction
  const stopProp = (e) => e.stopPropagation();

  return (
    <div className="page-transition">

      {/* ===== HERO SECTION ===== */}
      <section 
        className="hero-section" 
        id="home" 
        onClick={handleHeroClick} // click mouse event changes image
        style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      >
        {/* Animated Background Slideshow with professional fade-in transition */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className="hero-bg-slide"
            style={{
              backgroundImage: `url('${process.env.PUBLIC_URL + img}')`,
              opacity: currentBg === index ? 1 : 0, // sequential pop-up effect
              transform: currentBg === index ? 'scale(1.03)' : 'scale(1)',
              transition: 'opacity 1.5s ease-in-out, transform 4.5s ease-in-out', // professional cross-fade
              zIndex: 0
            }}
          />
        ))}
 
        {/* Dark overlay for readability when background slideshow is active */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85))',
          zIndex: 1
        }} />
 
        <div className="container hero-content" style={{ zIndex: 3, position: 'relative' }}>
          <div className="row align-items-center g-5">
            {/* Hero Text Content */}
            <div className="col-lg-7 col-xl-6 text-center text-lg-start">
              
              <h1 className="hero-title animate-fade-left">
                <span className="hero-sinhala" style={{ display: 'block', fontSize: 'clamp(2.1rem, 5vw, 4rem)', fontWeight: '800', lineHeight: 1.2 }}>
                  {schoolData.name}
                </span>
              </h1>
              
              <p className="hero-subtitle animate-fade-left delay-2" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', lineHeight: '1.8', color: '#e0e0e0' }}>
                දශක ගණනාවක් පුරා විශිෂ්ට අධ්‍යාපනයක් ලබා දෙමින්, අනාගත පරපුරේ ජීවිත සාර්ථකත්වයට මඟ පෙන්වන ර/ශ්‍රී රාහුල මහා විද්‍යාලයයි. යහපත් චරිතයකින් යුතු, කුසලතා පිරිපුන් පුරවැසියන් බිහිකිරීම අපගේ පරමාර්ථයයි.
              </p>
              
              <div className="d-flex flex-wrap gap-3 animate-fade-up delay-3">
                <Link to="/contact" className="btn-primary-custom" onClick={stopProp}>
                  අපව අමතන්න
                </Link>
                <Link to="/about" className="btn-outline-custom" onClick={stopProp}>
                  විද්‍යාලය ගැන
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slideshow Progress Dots for professional feel */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 3 }}>
          {heroImages.map((_, idx) => (
            <div 
              key={idx} 
              style={{ 
                width: currentBg === idx ? '24px' : '10px', 
                height: '10px', 
                borderRadius: '5px', 
                background: currentBg === idx ? '#0d6efd' : 'rgba(255,255,255,0.4)', 
                transition: 'all 0.4s ease' 
              }} 
            />
          ))}
        </div>

        <div className="scroll-hint" onClick={(e) => { stopProp(e); document.getElementById('about-home')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ zIndex: 3 }}>
          <div className="scroll-hint-text">පහළට</div>
          <div className="scroll-hint-wheel"><div className="scroll-hint-dot" /></div>
        </div>
      </section>

      {/* ===== STATS BAR SECTION ===== */}
      <section className="stats-section">
        <div className="container">
          <div className="row g-0">
            {schoolData.stats.map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-number"><Counter target={s.number} suffix={s.suffix} /></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SNIPPET SECTION ===== */}
      <section className="inner-section" id="about-home">
        <div className="container">
          <div className="row align-items-center g-5">
            <RevealSection className="col-lg-5">
              <div className="about-img-multi">
                <img src="/picture 7.png" alt="School" className="about-img-main" />
                <img src="/picture 11.png" alt="Students" className="about-img-secondary" />
                <div className="about-year-badge">
                  <div className="year">{schoolData.established}</div>
                  <div className="text">ආරම්භය</div>
                </div>
              </div>
            </RevealSection>
            <RevealSection className="col-lg-7" delay={0.15}>
              <h2 className="section-title">{schoolData.name}</h2>
              <div className="divider-line" />
              <p className="body-text">{schoolData.principalMessage}</p>
              <p className="body-text">
                {schoolData.established} වර්ෂයේදී ආරම්භ කරන ලද අප විද්‍යාලය, කුඩා ආයතනයක සිට අද වන විට ශ්‍රී ලංකාවේ ප්‍රමුඛතම ජාතික පාසලක් දක්වා ගෞරවනීය ගමන් මඟක් පැමිණ ඇත. සිසුන්ගේ බුද්ධිමය, ශාරීරික හා සමාජීය සංවර්ධනය වෙනුවෙන් උසස් ගුණාත්මක අධ්‍යාපනයක් ලබා දීම අපගේ පරමාර්ථයයි.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/about" className="btn-primary-custom">තවත් කියවන්න</Link>
                <Link to="/vision-mission" className="btn-dark-outline">දැක්ම සහ මෙහෙවර</Link>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ===== QUICK LINKS GRID SECTION ===== */}
      <section className="inner-section bg-light-custom">
        <div className="container">
          <RevealSection className="text-center mb-5">
            <h2 className="section-title">අපේ පාසල ගැන දැනගන්න</h2>
            <div className="divider-line mx-auto" />
            <p className="section-subtitle mx-auto">ර/ශ්‍රී රාහුල මහා විද්‍යාලය පිළිබඳව ඔබ දැනගත යුතු සියලුම තොරතුරු</p>
          </RevealSection>
          <div className="row g-4">
            {[
              { title: 'දැක්ම සහ මෙහෙවර',   desc: 'අපගේ මාර්ගෝපදේශක දැක්ම සහ මෙහෙවර පිළිබඳ මූලික පරමාර්ථ',        to: '/vision-mission', color: '#1a3a6b' },
              { title: 'විද්‍යාලය ගැන',       desc: 'ර/ශ්‍රී රාහුල මහා විද්‍යාලය පිළිබඳව හැඳින්වීම සහ තොරතුරු',     to: '/about',          color: '#3b1a6b' },
              { title: 'ඡායාරූප ගැලරිය',      desc: 'පාසල් සිදුවීම්, ක්‍රීඩා සහ අධ්‍යයන කටයුතුවල සුන්දර මතකයන්',    to: '/gallery',        color: '#5a1a4b' },
              { title: 'ආචාර්ය මණ්ඩලය',       desc: 'සිසුන්ගේ අනාගතය හැඩගස්වන අපගේ ප්‍රවීණ ගුරු මණ්ඩලය',         to: '/staff',          color: '#1a5a3b' },
              { title: 'පාසල් ගීතය සහ ධජය',   desc: 'විද්‍යාලයීය අභිමානය නිරූපණය වන පාසල් ගීතය සහ කොඩියේ තොරතුරු',    to: '/anthem',         color: '#2d5a2d' },
              { title: 'අපව අමතන්න',         desc: 'විමසීම් සහ වැඩිදුර තොරතුරු දැනගැනීම සඳහා අප හා සම්බන්ධ වන්න',          to: '/contact',        color: '#8b3a12' },
            ].map((item, i) => (
              <RevealSection key={i} className="col-sm-6 col-lg-4" delay={i * 0.07}>
                <Link to={item.to} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--card-bg)', borderRadius: 20, padding: '32px 24px',
                    border: '1px solid var(--border-color)', transition: 'all 0.35s ease',
                    cursor: 'pointer', height: '100%',
                  }}
                    className="feature-card"
                    onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = ''; }}
                  >
                    <h5 style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: 8 }}>{item.title}</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="inner-section bg-primary-custom">
        <div className="container text-center">
          <RevealSection>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>අප හා සම්බන්ධ වන්න</div>
            <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: 16 }}>විද්‍යාලයීය ප්‍රජාව හා සම්බන්ධ වන්න</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.8, fontSize: '1.1rem' }}>
              අපගේ විද්‍යාලය පිළිබඳ වැඩිදුර තොරතුරු ලබාගැනීමට සහ ඕනෑම විමසීමක් සඳහා අදම අප හා සම්බන්ධ වන්න.
            </p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Link to="/contact" className="btn-primary-custom">සම්බන්ධ වන්න</Link>
              <Link to="/about" className="btn-outline-custom">වැඩිදුර විස්තර</Link>
            </div>
          </RevealSection>
        </div>
      </section>
      
    </div>
  );
}