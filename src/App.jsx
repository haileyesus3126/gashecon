// src/App.jsx - UPDATED
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Process from './components/sections/Process';
import About from './components/sections/About';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

import useParallax from './hooks/useParallax';
import './styles/globals/globals.css';
import './styles/globals/animated-bg.css';

function App() {
  // Fixed parallax hook usage
  useParallax({
    throttleMs: 16,
    rootMargin: '0px 0px -100px 0px'
  });

  useEffect(() => {
    document.body.classList.remove('loading');
  }, []);

  return (
    <div className="app">
      {/* Construction-themed animated background */}
      <div className="animated-bg" aria-hidden="true" role="presentation">
        <div className="animated-bg__layer animated-bg__gradient"></div>
        <div
          className="animated-bg__layer animated-bg__grid"
          data-parallax-depth="0.03"
        />
        <div
          className="animated-bg__layer animated-bg__beams"
          data-parallax-depth="0.08"
        />
        <div
          className="animated-bg__layer animated-bg__dust"
          data-parallax-depth="0.12"
        />
        <div
          className="animated-bg__layer animated-bg__dust--far"
          data-parallax-depth="0.02"
        />
      </div>

      <Header />
      <main className="main-content">
        <Hero />
        <Services />
        <Projects />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;