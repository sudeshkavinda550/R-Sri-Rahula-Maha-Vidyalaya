import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { schoolData } from '../data/schoolData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChevronLeft, faChevronRight, faImages, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import useReveal from '../hooks/useReveal';

function NewsCard({ item, index }) {
  const [currentImage, setCurrentImage] = useState(0);
  const { ref, visible } = useReveal();
  const imageCount = item.images.length;

  const changeImage = (direction) => {
    setCurrentImage((current) => (current + direction + imageCount) % imageCount);
  };

  return (
    <article ref={ref} className="news-page-card" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: `opacity 0.65s ease ${index * 0.08}s, transform 0.65s ease ${index * 0.08}s` }}>
      <div className="news-page-image-box">
        <img src={item.images[currentImage]} alt={`${item.title} - ${currentImage + 1}`} className="news-page-image" />
        <button type="button" className="news-page-arrow news-page-arrow-left" onClick={() => changeImage(-1)} aria-label="පෙර ඡායාරූපය"><FontAwesomeIcon icon={faChevronLeft} /></button>
        <button type="button" className="news-page-arrow news-page-arrow-right" onClick={() => changeImage(1)} aria-label="ඊළඟ ඡායාරූපය"><FontAwesomeIcon icon={faChevronRight} /></button>
        <div className="news-page-image-count"><FontAwesomeIcon icon={faImages} /> {currentImage + 1} / {imageCount}</div>
        <div className="news-page-dots" aria-label="ඡායාරූප තේරීම">
          {item.images.map((image, imageIndex) => <button key={image} type="button" className={currentImage === imageIndex ? 'active' : ''} onClick={() => setCurrentImage(imageIndex)} aria-label={`ඡායාරූපය ${imageIndex + 1}`} />)}
        </div>
      </div>
      <div className="news-page-body">
        <div className="news-page-meta"><span className="news-page-category">{item.category}</span><span className="news-page-date"><FontAwesomeIcon icon={faCalendarDays} /> {item.date}</span></div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        {item.highlights && <ul className="news-page-highlights">{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
      </div>
    </article>
  );
}

export default function News() {
  return (
    <div className="page-transition">
      <PageHeader title="පුවත් සහ සිදුවීම්" subtitle="ර/ශ්‍රී රාහුල මහා විද්‍යාලයේ නවතම ජයග්‍රහණ, වැඩසටහන් සහ විශේෂ අවස්ථා" breadcrumbs={[{ label: 'පුවත්' }]} icon={faNewspaper} bgImage="/img 3.jpg" />
      <style>{`
        .news-page-section { padding: 72px 0 88px; }
        .news-page-intro { max-width: 690px; margin: 0 auto 48px; text-align: center; }
        .news-page-intro h2 { color: var(--primary); font-size: clamp(1.7rem, 3vw, 2.45rem); margin-bottom: 12px; }
        .news-page-intro p { color: var(--text-muted); line-height: 1.8; margin: 0; }
        .news-page-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 30px; }
        .news-page-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 20px; overflow: hidden; box-shadow: var(--shadow); transition: var(--transition); }
        .news-page-card:hover { transform: translateY(-7px); box-shadow: var(--shadow-hover); }
        .news-page-image-box { height: 300px; position: relative; overflow: hidden; background: var(--dark-bg); }
        .news-page-image { width: 100%; height: 100%; object-fit: cover; transition: opacity .25s ease; }
        .news-page-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; border: 1px solid rgba(255,255,255,.45); border-radius: 50%; background: rgba(10,23,48,.65); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: var(--transition); }
        .news-page-arrow:hover { background: var(--secondary); border-color: var(--secondary); }
        .news-page-arrow-left { left: 14px; } .news-page-arrow-right { right: 14px; }
        .news-page-image-count { position: absolute; top: 14px; right: 14px; padding: 5px 10px; border-radius: 16px; background: rgba(10,23,48,.7); color: #fff; font-size: .75rem; }
        .news-page-dots { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
        .news-page-dots button { width: 8px; height: 8px; padding: 0; border: 0; border-radius: 50%; background: rgba(255,255,255,.55); cursor: pointer; transition: var(--transition); }
        .news-page-dots button.active { width: 22px; border-radius: 5px; background: var(--secondary); }
        .news-page-body { padding: 26px 28px 30px; }
        .news-page-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 15px; }
        .news-page-category { padding: 4px 12px; border-radius: 20px; background: rgba(26,58,107,.09); color: var(--primary); font-size: .74rem; font-weight: 700; }
        .news-page-date { color: var(--text-muted); font-size: .78rem; display: inline-flex; gap: 6px; align-items: center; }
        .news-page-body h2 { color: var(--primary); font-size: 1.2rem; line-height: 1.55; margin-bottom: 12px; }
        .news-page-body p { color: var(--text-muted); font-size: .91rem; line-height: 1.85; margin-bottom: 0; }
        .news-page-highlights { color: var(--text-muted); font-size: .88rem; line-height: 1.75; margin: 14px 0 0; padding-left: 20px; }
        .news-page-highlights li::marker { color: var(--secondary); }
        @media (max-width: 767px) { .news-page-section { padding: 50px 0 64px; } .news-page-grid { grid-template-columns: 1fr; gap: 24px; } .news-page-image-box { height: 240px; } .news-page-body { padding: 22px 20px 25px; } .news-page-body h2 { font-size: 1.08rem; } }
      `}</style>
      <section className="news-page-section"><div className="container">
        <div className="news-page-intro"><h2>අපේ නවතම පුවත්</h2><div className="divider-line mx-auto" /><p>විද්‍යාලීය ප්‍රජාවේ ජයග්‍රහණ සහ වැදගත් අවස්ථා පිළිබඳ නවතම තොරතුරු මෙතැනින් දැනගන්න.</p></div>
        <div className="news-page-grid">{schoolData.news.map((item, index) => <NewsCard key={item.title} item={item} index={index} />)}</div>
      </div></section>
    </div>
  );
}