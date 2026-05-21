import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home         from './pages/Home';
import About        from './pages/About';
import VisionMission from './pages/VisionMission';
import Staff        from './pages/Staff';
import Gallery      from './pages/Gallery';
import Anthem       from './pages/Anthem';
import Contact      from './pages/Contact';

function ScrollRestorer() {
  const location = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

function AppInner() {
  return (
    <div className="app">
      <ScrollRestorer />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/about"          element={<About />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/staff"          element={<Staff />} />
          <Route path="/gallery"        element={<Gallery />} />
          <Route path="/anthem"         element={<Anthem />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="*"               element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppInner />
      </Router>
    </ThemeProvider>
  );
}
