import React from 'react';
import PageHeader from '../components/PageHeader';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faTrophy, faUsers, faStar, faSchool } from '@fortawesome/free-solid-svg-icons';
import useReveal from '../hooks/useReveal';

function Reveal({ children, className='', delay=0 }) {
  const { ref, visible } = useReveal();
  return <div ref={ref} className={className} style={{ opacity: visible?1:0, transform: visible?'none':'translateY(36px)', transition:`opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>{children}</div>;
}

const features = [
  { icon: faBookOpen, label:'වසර 67ක විශ්වාසනීය අධ්‍යාපන මෙහෙවර', desc:'දශක හයකට වැඩි කාලයක අත්දැකීම් සහිතව 6 ශ්‍රේණියේ සිට 13 ශ්‍රේණිය දක්වා (සාමාන්‍ය පෙළ සහ උසස් පෙළ) සිසුන්ගේ අධ්‍යාපනික කටයුතු සාර්ථකව මෙහෙයවීම.' },
  { icon: faTrophy, label:'උසස් පෙළ විෂය ධාරා', desc:'උසස් පෙළ අංශයේ විද්‍යා, කලා හා වාණිජ යන විෂය ධාරාවන්ගෙන් විශිෂ්ට කුසලතා දැක්වීමට අත්දැකීම් බහුල ආචාර්ය මණ්ඩලයක මගපෙන්වීම.' },
  { icon: faStar, label:'බාහිර හා ක්‍රීඩා කටයුතු', desc:'අධ්‍යාපනයට මෙන්ම ක්‍රීඩා, නර්තන, සෞන්දර්යාත්මක හා සංස්කෘතික බාහිර ක්‍රියාකාරකම් සඳහා විශේෂ අවධානය යොමු කරමින් සිසුන්ගේ සහජ කුසලතා ඉහළ මට්ටමකට ගෙන ඒම.' },
  { icon: faUsers, label:'ගුණධර්ම හා විනය', desc:'විද්‍යාලයීය පාරම්පරික අගයන් සුරකිමින් සිසුන්ගේ ශික්ෂණය, ආචාරධර්ම සහ සමාජීය වගකීම් වර්ධනය කිරීම.' },
];



export default function About() {
  return (
    <div className="page-transition">
      <PageHeader
        title="පාසල ගැන"
        subtitle="1959 සිට අධ්‍යාපන උසස්කම්වල උරුමයක් ඇති, ශ්‍රී ලංකාවේ අනාගත නායකයින් හැඩගැස්සීම"
        breadcrumbs={[{ label:'පාසල ගැන' }]}
        bgImage="/img 5.jpg"
        icon={faSchool}
      />

      {/* Main About */}
      <section className="inner-section logo-watermark-section">
        <img className="logo-watermark" src="/logo.png" alt="" aria-hidden="true" />
        <div className="container">
          <div className="row g-5 align-items-center">
            <Reveal className="col-lg-5" delay={0.05}>
              <div className="about-img-multi">
                <img src="/picture 7.png" alt="School" className="about-img-main"/>
                <img src="/picture 11.png"    alt="Students" className="about-img-secondary"/>
                <div className="about-year-badge">
                  <div className="year">{schoolData.established}</div>
                  <div className="text">ආරම්භය</div>
                </div>
              </div>
            </Reveal>
            <Reveal className="col-lg-7" delay={0.15}>
              <h2 className="section-title">{schoolData.name} ගැන</h2>
              <div className="divider-line"/>
              <p className="body-text">ශ්‍රී රාහුල මහා විද්‍යාලය යනු සබරගමුව පළාතේ, රත්නපුර දිස්ත්‍රික්කයේ ලෙල්ලොපිටිය ප්‍රදේශයේ පිහිටි අභිමානවත් රාජ්‍ය පාසලකි. වසර 67කට අධික දීර්ඝ හා ආඩම්බරකාරී ඉතිහාසයකට හිමිකම් කියන මෙම විද්‍යාලය, දශක හයකට වැඩි කාලයක් පුරා ප්‍රදේශයේ දරුවන් දහස් ගණනකට ගුණාත්මක අධ්‍යාපනයක් ලබා දෙමින් සමාජයට වැඩදායී ප්‍රගතිශීලී පුරවැසියන් දායාද කිරීමට කැපවී කටයුතු කරයි.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="inner-section bg-light-custom">
        <div className="container">
          <Reveal className="text-center mb-5">
            <h2 className="section-title">අපේ විශේෂත්වයන්</h2>
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
      </section>

    </div>
  );
}
