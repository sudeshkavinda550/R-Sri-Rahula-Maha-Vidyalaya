import React from 'react';
import PageHeader from '../components/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

export default function Anthem() {
  const anthemVerses = [
    [
      'ර/ශ්‍රී රාහුල මහා විද්‍යාලය,',
      'අම්මාගේ මල් පිපෙන මල්වත්තේ,',
      'දැනුම දී, ගුණය දී, ප්‍රඥාව දී,',
      'අනාගතේ සංකල්පය මොනවා වුවත් ඉහළට ගෙන යමු.'
    ],
    [
      'ගුරු මණ්ඩලයේ පදවියට,',
      'සිසුන්ගේ හදවත් තිරසර මැවෙයි,',
      'හදවත් සතුටින් අලුත් අදහස් ගොඩනඟා,',
      'ලස්සන සමාජයක් හදමු අනාගතයේ.'
    ],
    [
      'ප්‍රියතම පාසල, අපේ අභිමානය,',
      'සියලු දුක දෝෂ දුරු කර,',
      'ඉගිලෙන ඉදිරි ගමන් මඟේ,',
      'නැගෙන නවීන ලොවට දොර විවර කරමු.'
    ]
  ];

  return (
    <div className="page-transition">
      <PageHeader
        title="පාසල් ගීතය"
        subtitle="ර/ශ්‍රී රාහුල මහා විද්‍යාලයේ අභිමානය"
        breadcrumbs={[{ label: 'පාසල් ගීතය' }]}
        bgImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&h=700&fit=crop"
        icon={faMusic}
      />

      <section style={{ background: 'var(--gradient)', padding: '88px 0', position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <div style={{ position: 'absolute', inset: 0, background: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center mb-5">
            <h2 className="section-title section-title-light">අපේ පාසල් ගීතය</h2>
            <div className="divider-line mx-auto" />
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="anthem-card">
                <div className="anthem-quote-icon"><FontAwesomeIcon icon={faMusic} /></div>
                <div className="anthem-text">
                  {anthemVerses.map((verse, i) => (
                    <div key={i} className="verse" style={{ marginBottom: '24px', textAlign: 'center', color: '#fff', fontSize: '1.15rem', lineHeight: '2' }}>
                      {verse.map((line, j) => <div key={j}>{line}</div>)}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="play-btn" title="School anthem preview" aria-label="School anthem preview" style={{ pointerEvents: 'none' }}>
                    <FontAwesomeIcon icon={faVolumeUp} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>අපේ පාසල් ගීතයේ වචන සකස් කර ඇත. වාදනය කිරීමට ශ්‍රව්‍ය ගොනුවක් එක් කිරීම අවශ්‍ය වේ.</span>
                    </div>
                    <div className="audio-progress">
                      <div className="audio-progress-fill" style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
