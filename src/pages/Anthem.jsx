import React, { useState, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faMusic } from '@fortawesome/free-solid-svg-icons';
import useReveal from '../hooks/useReveal';

function Reveal({ children, className='', delay=0 }) {
  const { ref, visible } = useReveal();
  return <div ref={ref} className={className} style={{ opacity: visible?1:0, transform: visible?'none':'translateY(36px)', transition:`opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>{children}</div>;
}

export default function Anthem() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().catch(()=>{}); setPlaying(true); }
  };

  return (
    <div className="page-transition">
      <PageHeader
        title="School Anthem & Flag"
        subtitle="The symbols of pride, identity and spirit of R/ Sri Rahula Maha Vidyalaya"
        breadcrumbs={[{ label:'School Anthem' }]}
        bgImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&h=700&fit=crop"
      />

      {/* Anthem Section */}
      <section style={{ background:'var(--gradient)', padding:'88px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:"url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3C/g%3E%3C/svg%3E\")" }}/>
        <div className="container" style={{ position:'relative',zIndex:1 }}>
          <Reveal className="text-center mb-5">
            <div className="section-badge section-badge-light">🎵 School Anthem</div>
            <h2 className="section-title section-title-light">{schoolData.anthem.title}</h2>
            <div className="divider-line mx-auto"/>
          </Reveal>
          <div className="row justify-content-center">
            <Reveal className="col-lg-8" delay={0.1}>
              <div className="anthem-card">
                <div className="anthem-quote-icon"><FontAwesomeIcon icon={faMusic}/></div>
                <div className="anthem-text">
                  {schoolData.anthem.verses.map((verse,i)=>(
                    <div key={i} className="verse">
                      {verse.split('\n').map((line,j)=><div key={j}>{line}</div>)}
                    </div>
                  ))}
                </div>
                {/* Audio Player */}
                <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:28, paddingTop:22, borderTop:'1px solid rgba(255,255,255,0.12)' }}>
                  <button className="play-btn" onClick={togglePlay} title={playing?'Pause':'Play Anthem'}>
                    <FontAwesomeIcon icon={playing ? faPause : faPlay}/>
                  </button>
                  <div style={{ flex:1 }}>
                    <div style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.75rem', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
                      <FontAwesomeIcon icon={faVolumeUp}/>
                      {playing ? 'Now playing...' : 'Click play to listen to the school anthem'}
                    </div>
                    <div className="audio-progress">
                      <div className="audio-progress-fill" style={{ width: playing?'45%':'0%' }}/>
                    </div>
                  </div>
                </div>
                <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'0.76rem', marginTop:12 }}>
                  * Place your anthem audio file at <code>public/anthem.mp3</code>
                </p>
                <audio ref={audioRef} src="/anthem.mp3" onEnded={()=>setPlaying(false)}/>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Flag Section */}
      <section className="inner-section">
        <div className="container">
          <Reveal className="text-center mb-5">
            <div className="section-badge">🏳️ School Flag</div>
            <h2 className="section-title">The Significance of Our Flag</h2>
            <div className="divider-line mx-auto"/>
            <p className="section-subtitle mx-auto">The colours and symbols that represent our school's identity and values</p>
          </Reveal>
          <div className="row align-items-center g-5 justify-content-center">
            <Reveal className="col-lg-5 text-center" delay={0.05}>
              {/* Animated SVG Flag */}
              <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth:300, filter:'drop-shadow(0 20px 40px rgba(26,58,107,0.25))' }}>
                <rect x="12" y="20" width="10" height="185" fill="#8B7355" rx="5"/>
                <rect x="22" y="28" width="275" height="150" fill="#1a3a6b" rx="6"/>
                <rect x="22" y="28" width="275" height="52" fill="#3a6bc8" rx="6"/>
                <text x="160" y="120" textAnchor="middle" fill="white" fontSize="26" fontWeight="900" fontFamily="serif">SRMV</text>
                <text x="160" y="148" textAnchor="middle" fill="#c8a951" fontSize="11" fontFamily="sans-serif" letterSpacing="2">Est. {schoolData.established}</text>
                <circle cx="160" cy="80" r="22" fill="rgba(200,169,81,0.25)" stroke="#c8a951" strokeWidth="2"/>
                <text x="160" y="87" textAnchor="middle" fill="#c8a951" fontSize="20">🏫</text>
              </svg>
            </Reveal>
            <Reveal className="col-lg-7" delay={0.15}>
              <p className="body-text">{schoolData.flagInfo.description}</p>
              <div className="row g-3 mt-2">
                {[
                  { color:'#1a3a6b', name:'Navy Blue', meaning:'Knowledge, wisdom, and academic excellence — the deep blue represents the pursuit of learning and the limitless depths of understanding.' },
                  { color:'#c8a951', name:'Gold',      meaning:'Achievement, success, and bright futures — the gold symbolizes the shining accomplishments of our students and the school\'s legacy.' },
                ].map((c,i)=>(
                  <div key={i} className="col-sm-6">
                    <div style={{ background:'var(--light-bg)', borderRadius:16, padding:'20px', border:'1px solid var(--border-color)', display:'flex', gap:14, alignItems:'flex-start' }}>
                      <div style={{ width:48, height:48, background:c.color, borderRadius:12, flexShrink:0, boxShadow:`0 6px 18px ${c.color}55` }}/>
                      <div>
                        <div style={{ fontWeight:700, color:'var(--primary)', marginBottom:6 }}>{c.name}</div>
                        <p style={{ color:'var(--text-muted)', fontSize:'0.84rem', lineHeight:1.6, margin:0 }}>{c.meaning}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
