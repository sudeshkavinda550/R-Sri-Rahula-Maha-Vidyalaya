import React, { useState, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faMusic } from '@fortawesome/free-solid-svg-icons';

export default function Anthem() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  // Edit your school anthem verses here
  const anthemVerses = [
    "පළමු පේළිය මෙතැනින් ලියන්න...\nදෙවන පේළිය මෙතැනින් ලියන්න...",
    "තෙවන පේළිය මෙතැනින් ලියන්න...\nසිව්වන පේළිය මෙතැනින් ලියන්න..."
  ];

  return (
    <div className="page-transition">
      <PageHeader
        title="School Anthem"
        subtitle="R/ Sri Rahula Maha Vidyalaya"
        breadcrumbs={[{ label: 'School Anthem' }]}
        bgImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&h=700&fit=crop"
      />

      {/* Anthem Section */}
      <section style={{ background: 'var(--gradient)', padding: '88px 0', position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <div style={{ position: 'absolute', inset: 0, background: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center mb-5">
            <div className="section-badge section-badge-light">🎵 School Anthem</div>
            <h2 className="section-title section-title-light">විද්‍යාලයීය ගීතය</h2>
            <div className="divider-line mx-auto" />
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="anthem-card">
                <div className="anthem-quote-icon"><FontAwesomeIcon icon={faMusic} /></div>
                <div className="anthem-text">
                  {anthemVerses.map((verse, i) => (
                    <div key={i} className="verse" style={{ marginBottom: '24px', textAlign: 'center', color: '#fff', fontSize: '1.2rem', lineHeight: '2' }}>
                      {verse.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                    </div>
                  ))}
                </div>

                {/* Audio Player */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  <button className="play-btn" onClick={togglePlay} title={playing ? 'Pause' : 'Play Anthem'}>
                    <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FontAwesomeIcon icon={faVolumeUp} />
                      {playing ? 'Now playing...' : 'Click play to listen to the school anthem'}
                    </div>
                    <div className="audio-progress">
                      <div className="audio-progress-fill" style={{ width: playing ? '45%' : '0%' }} />
                    </div>
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.76rem', marginTop: 12 }}>
                  * Place your anthem audio file at <code>public/anthem.mp3</code> and edit lyrics in <code>src/pages/Anthem.jsx</code>
                </p>
                <audio ref={audioRef} src="/anthem.mp3" onEnded={() => setPlaying(false)} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
