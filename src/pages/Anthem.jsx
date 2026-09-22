import React from 'react';
import PageHeader from '../components/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

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
        bgImage="/img 2.jpg"
        icon={faMusic}
      />

      <section className="logo-watermark-section" style={{ background: 'linear-gradient(135deg, #0a1b2c, #1a3a6b)', padding: '88px 0', position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <img className="logo-watermark" src="/logo.png" alt="" aria-hidden="true" />
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

                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
