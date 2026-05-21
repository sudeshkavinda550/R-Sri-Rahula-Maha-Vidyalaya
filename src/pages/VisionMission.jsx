import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import useReveal from '../hooks/useReveal';

function Reveal({ children, className='', delay=0 }) {
  const { ref, visible } = useReveal();
  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ 
        opacity: visible ? 1 : 0, 
        transform: visible ? 'none' : 'translateY(36px)', 
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` 
      }}
    >
      {children}
    </div>
  );
}

export default function VisionMission() {
  const [showVision, setShowVision] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowVision((prev) => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const renderVisionWords = () => {
    const text = "ගුණාත්මක පුරවැසියෙකු සමාජයට දායාද කිරීම.";
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        style={{
          display: 'inline-block',
          opacity: 0,
          animation: `wordPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${0.3 + (index * 0.15)}s`,
          marginRight: '0.28em'
        }}
      >
        {word}
      </span>
    ));
  };

  const renderMissionWords = () => {
    const lines = [
      "විධිමත් විෂයමාලාව ක්‍රියාත්මක කරමින්,",
      "භෞතික හා මානව සම්පත් උපරිම ලෙස කළමනාකරණය කරමින්,",
      "නිපුණතා පාදක අධ්‍යාපනයක් තුළින්",
      "දැක්ම කරා ලඟාවීම."
    ];

    let globalWordIndex = 0;

    return lines.map((line, lineIndex) => {
      const words = line.split(' ');
      const renderedLine = words.map((word, wordIndex) => {
        const delay = 0.3 + (globalWordIndex * 0.12); 
        globalWordIndex++;
        return (
          <span
            key={`${lineIndex}-${wordIndex}`}
            style={{
              display: 'inline-block',
              opacity: 0,
              animation: `wordPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${delay}s`,
              marginRight: '0.28em'
            }}
          >
            {word}
          </span>
        );
      });

      return (
        <React.Fragment key={lineIndex}>
          {renderedLine}
          {lineIndex < lines.length - 1 && <br className="d-none d-md-block" />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="page-transition">
      <style>
        {`
          @keyframes wordPop {
            0% {
              opacity: 0;
              transform: translateY(30px) scale(0.8);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

      <PageHeader
        title="දැක්ම සහ මෙහෙවර"
        subtitle="ර/ශ්‍රී රාහුල මහා විද්‍යාලය"
        breadcrumbs={[{ label: 'දැක්ම සහ මෙහෙවර' }]}
        bgImage="https://images.unsplash.com/photo-1544717305-2782549b5136?w=1600&h=700&fit=crop"
      />

      <section 
        className="inner-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('picture 20.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '70vh', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <Reveal>
            <div 
              style={{ 
                minHeight: '350px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              
              {showVision ? (
                <div key="vision-container" style={{ width: '100%' }}>
                  <h2 style={{ 
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                    fontWeight: '800', 
                    color: '#ffc107', 
                    marginBottom: '30px',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                    opacity: 0,
                    animation: 'wordPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                  }}>
                    දැක්ම
                  </h2>
                  <p style={{ 
                    fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', 
                    color: '#ffffff', 
                    lineHeight: '1.6',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    fontWeight: '500',
                    textShadow: '1px 1px 5px rgba(0,0,0,0.8)'
                  }}>
                    {renderVisionWords()}
                  </p>
                </div>
              ) : (
                <div key="mission-container" style={{ width: '100%' }}>
                  <h2 style={{ 
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                    fontWeight: '800', 
                    color: '#ffc107', 
                    marginBottom: '30px',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                    opacity: 0,
                    animation: 'wordPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                  }}>
                    මෙහෙවර
                  </h2>
                  <p style={{ 
                    fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)', 
                    color: '#ffffff', 
                    lineHeight: '1.8',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    fontWeight: '500',
                    textShadow: '1px 1px 5px rgba(0,0,0,0.8)'
                  }}>
                    {renderMissionWords()}
                  </p>
                </div>
              )}

            </div>
            
            <div className="d-flex justify-content-center mt-4 gap-2">
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: showVision ? '#ffc107' : 'rgba(255,255,255,0.3)', transition: 'background-color 0.5s' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: !showVision ? '#ffc107' : 'rgba(255,255,255,0.3)', transition: 'background-color 0.5s' }}></div>
            </div>

          </Reveal>
        </div>
      </section>

    </div>
  );
}