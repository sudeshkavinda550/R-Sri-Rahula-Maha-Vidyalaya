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

      {/* Background Image with Black Opacity Overlay */}
      <section 
        className="inner-section" 
        style={{
          /* Change '/school-bg.jpg' to your image file path */
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/picture 13.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '60px 0',
          color: '#ffffff',
          minHeight: '80vh' 
        }}
      >
        <div className="container">
          <Reveal className="text-center mb-5">
            <div className="section-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              ගුරු මණ්ඩලය
            </div>
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

      {/* Principal message section */}
      <section className="inner-section" style={{ backgroundColor: '#f8f9fa', padding: '60px 0' }}>
        <div className="container">
          <Reveal>
            <div className="principal-card" style={{ background: 'white', padding: 'clamp(20px, 5vw, 40px)', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <div className="row align-items-center g-4 g-md-5">
                <div className="col-md-3 text-center">
                  
                  {/* Fluid Image for Principal */}
                  <div 
                    className="principal-img-wrap mx-auto"
                    style={{ 
                      width: '100%', 
                      maxWidth: '200px', 
                      aspectRatio: '1 / 1', 
                      borderRadius: '50%', 
                      overflow: 'hidden', 
                      border: '4px solid #0d6efd' 
                    }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop" 
                      alt="විදුහල්පති" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                </div>
                <div className="col-md-9 text-center text-md-start">
                  <div className="quote-icon" style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', color: '#0d6efd', lineHeight: '1', marginTop: '-10px' }}>"</div>
                  
                  {/* Responsive Quote Text */}
                  <p className="principal-quote" style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontStyle: 'italic', marginBottom: '20px', color: '#333' }}>
                    අප පාසලේ මාර්ගෝපදේශක දර්ශනය වන්නේ නිවැරදි අධ්‍යාපනය මගින් දරුවන්ගේ ජීවිත පරිවර්තනය කළ හැකි බවයි. අපගේ අරමුණ යහපත් චරිතයකින් යුතු පුරවැසියන් බිහිකිරීම සහ ඔවුන් තුළින් අපගේ සමාජයේ, ජාතියේ සහ ලෝකයේ අනාගතය දීප්තිමත් කිරීමයි.
                  </p>
                  
                  <div className="principal-name" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.2rem)', fontWeight: 'bold', color: '#000' }}>එච්. ඒ. ප්‍රේමතිලක මයා</div>
                  <div className="principal-title" style={{ color: '#666', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>විදුහල්පති, ර/ශ්‍රී රාහුල මහා විද්‍යාලය</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}