import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { schoolData } from '../data/schoolData';
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

export default function Staff() {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate current items to show
  const totalPages = Math.ceil(schoolData.staff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStaff = schoolData.staff.slice(startIndex, startIndex + itemsPerPage);

  // Pagination Handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="page-transition">
      <PageHeader
        title="අපේ ආචාර්ය මණ්ඩලය"
        subtitle="දිනපතා දරුවන්ගේ අනාගතය හැඩගස්වන අපගේ කැපවූ ගුරු මණ්ඩලය හඳුනාගන්න"
        breadcrumbs={[{ label: 'ආචාර්ය මණ්ඩලය' }]}
        bgImage="https://images.unsplash.com/photo-1544717305-2782549b5136?w=1600&h=700&fit=crop"
      />

      <section 
        className="staff-header-bg inner-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${process.env.PUBLIC_URL}/picture 13.jpg')`
        }}
      >
        <div className="container">
          <Reveal className="text-center mb-5">
            {/* Responsive Title */}
            <h2 className="section-title" style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
              අපගේ ප්‍රවීණ ආචාර්ය මණ්ඩලය
            </h2>
            <div className="divider-line mx-auto" style={{ background: '#ffffff' }} />
            <p className="section-subtitle mx-auto" style={{ color: '#dddddd', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
              සිසුන්ගේ සාර්ථකත්වය වෙනුවෙන් කැපවූ, සුදුසුකම් ලත් දක්ෂ ගුරුවරුන් 30 කට අධික ප්‍රමාණයක්
            </p>
          </Reveal>

          {/* Teacher Grid - Responsive Columns (Bootstrap classes handle the layout flawlessly) */}
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 justify-content-center">
            {currentStaff.map((m, i) => (
              <Reveal key={startIndex + i} className="col" delay={(i % itemsPerPage) * 0.05}>
                <div className="text-center" style={{ padding: '10px 5px' }}>
                  
                  {/* Fluid Round Image Wrap for Web/Mobile */}
                  <div 
                    className="mx-auto mb-3" 
                    style={{ 
                      width: '100%',            // Takes full width of the small column
                      maxWidth: '140px',       // Maximum size on desktop
                      aspectRatio: '1 / 1',    // Keeps it perfectly round on any device
                      borderRadius: '50%', 
                      overflow: 'hidden',
                      border: '3px solid rgba(255, 255, 255, 0.4)', 
                    }}
                  >
                    <img 
                      src={m.img} 
                      alt={m.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      loading="lazy" 
                    />
                  </div>

                  {/* Complete Name Wrapper - Fluid Text */}
                  <div style={{ padding: '0 5px' }}>
                    <h6 style={{ 
                      fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', // Smaller on mobile, bigger on desktop
                      fontWeight: '500', 
                      margin: '0', 
                      color: '#ffffff',
                      lineHeight: '1.4',
                      wordWrap: 'break-word'
                    }}>
                      {m.name}
                    </h6>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Reveal className="d-flex justify-content-center mt-5" delay={0.2}>
              <div className="pagination-wrapper" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                
                <button 
                  onClick={handlePrev} 
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: currentPage === 1 ? 'transparent' : 'rgba(255,255,255,0.1)',
                    color: currentPage === 1 ? '#666' : '#fff',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                >
                  පෙර
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button 
                      key={pageNum}
                      onClick={() => handlePageClick(pageNum)}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: isActive ? 'none' : '1px solid rgba(255,255,255,0.3)',
                        background: isActive ? '#0d6efd' : 'transparent', 
                        color: '#fff',
                        fontWeight: isActive ? 'bold' : 'normal',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        fontSize: '0.9rem'
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button 
                  onClick={handleNext} 
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: currentPage === totalPages ? 'transparent' : 'rgba(255,255,255,0.1)',
                    color: currentPage === totalPages ? '#666' : '#fff',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                >
                  ඊළඟ
                </button>

              </div>
            </Reveal>
          )}

        </div>
      </section>
    </div>
  );
}