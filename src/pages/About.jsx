import React from 'react';
import PageHeader from '../components/PageHeader';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faTrophy, faUsers, faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import useReveal from '../hooks/useReveal';

function Reveal({ children, className='', delay=0 }) {
  const { ref, visible } = useReveal();
  return <div ref={ref} className={className} style={{ opacity: visible?1:0, transform: visible?'none':'translateY(36px)', transition:`opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>{children}</div>;
}

const features = [
  { icon: faBookOpen, label:'Quality Education',    desc:'Comprehensive curriculum designed for holistic development' },
  { icon: faTrophy,   label:'National Achievements', desc:'Over 25+ national awards and recognitions' },
  { icon: faUsers,    label:'Expert Faculty',        desc:'180+ dedicated and qualified teachers' },
  { icon: faStar,     label:'Co-Curriculars',        desc:'Sports, arts, music and cultural activities' },
];



export default function About() {
  return (
    <div className="page-transition">
      <PageHeader
        title="About Our School"
        subtitle="A legacy of educational excellence since 1959 — shaping Sri Lanka's future leaders"
        breadcrumbs={[{ label:'About' }]}
        bgImage="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&h=700&fit=crop"
      />

      {/* Main About */}
      <section className="inner-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <Reveal className="col-lg-5" delay={0.05}>
              <div className="about-img-multi">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=480&fit=crop" alt="School" className="about-img-main"/>
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=260&h=200&fit=crop"    alt="Students" className="about-img-secondary"/>
                <div className="about-year-badge">
                  <div className="year">{schoolData.established}</div>
                  <div className="text">Est.</div>
                </div>
              </div>
            </Reveal>
            <Reveal className="col-lg-7" delay={0.15}>
              <div className="section-badge">📖 Our Story</div>
              <h2 className="section-title">History of {schoolData.nameEn}</h2>
              <div className="divider-line"/>
              <p className="body-text">{schoolData.principalMessage}</p>
              <p className="body-text">Founded in 1959, R/ Sri Rahula Maha Vidyalaya started with a small group of students and teachers. Today, after more than six decades of dedicated service, we proudly serve over 3,500 students with a faculty of 180+ qualified teachers. Our commitment to academic excellence and holistic development has earned us recognition as one of the premier schools in the region.</p>
              <div className="check-list">
                {['National curriculum (O/L & A/L)','English medium instruction','International standard laboratories','Modern ICT & hybrid learning facilities','Rich co-curricular program'].map((item,i)=>(
                  <div key={i} className="check-item">
                    <FontAwesomeIcon icon={faCheckCircle} className="check-icon"/>
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="inner-section bg-light-custom">
        <div className="container">
          <Reveal className="text-center mb-5">
            <div className="section-badge">⭐ Why Choose Us</div>
            <h2 className="section-title">What Makes Us Different</h2>
            <div className="divider-line mx-auto"/>
          </Reveal>
          <div className="row g-4">
            {features.map((f,i)=>(
              <Reveal key={i} className="col-sm-6 col-lg-3" delay={i*0.08}>
                <div className="feature-card text-center">
                  <div className="feature-icon-wrap"><FontAwesomeIcon icon={f.icon}/></div>
                  <h5>{f.label}</h5>
                  <p>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>    </div>
  );
}
