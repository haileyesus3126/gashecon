// Hero.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

// --- Config ---
const SLIDE_INTERVAL = 6000;
const PARTICLE_COUNT = 14;

// Static copy (never changes between slides)
const HERO_COPY = {
  title: 'Building Excellence',
  highlight: 'Since 2009',
  subtitle:
    'Premium construction services with uncompromising quality and precision craftsmanship',
  primaryCtaText: 'Start Your Project',
  secondaryCtaText: 'Explore Portfolio',
  brandColor: '#0A2463', // used for accents (not tied to slide)
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});
  const [direction, setDirection] = useState(0);
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);

  // Background slides (images only)
  const slides = useMemo(
    () => [
      {
        id: 1,
        src: '/images/hero/construction-1.jpg',
        fallback: '/images/hero/construction-1.webp',
        color: '#0A2463',
      },
      {
        id: 2,
        src: '/images/hero/construction-2.jpg',
        fallback: '/images/hero/construction-2.webp',
        color: '#FF6B35',
      },
      {
        id: 3,
        src: '/images/hero/construction-3.jpg',
        fallback: '/images/hero/construction-3.webp',
        color: '#4CAF50',
      },
    ],
    []
  );

  // Preload images (with fallback)
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.onload = () => setImageLoaded((p) => ({ ...p, [s.id]: true }));
      img.onerror = () => {
        if (s.fallback) {
          const fb = new Image();
          fb.onload = () => setImageLoaded((p) => ({ ...p, [s.id]: true }));
          fb.onerror = () => setImageLoaded((p) => ({ ...p, [s.id]: false }));
          fb.src = s.fallback;
        } else {
          setImageLoaded((p) => ({ ...p, [s.id]: false }));
        }
      };
      img.src = s.src;
    });
  }, [slides]);

  // Respect reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto-rotate (pause on visibility change and hover)
  const start = useCallback(() => {
    if (prefersReducedMotion) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hoveringRef.current) {
        setDirection(1);
        setCurrent((i) => (i + 1) % slides.length);
      }
    }, SLIDE_INTERVAL);
  }, [slides.length, prefersReducedMotion]);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    start();
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [start, stop]);

  // Particles (decorative)
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 1.5,
      })),
    []
  );

  // Navigation
  const goTo = useCallback(
    (idx) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Animations
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 600 : -600,
      opacity: 0,
      scale: 1.06,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: prefersReducedMotion ? 0 : 1, ease: [0.33, 1, 0.68, 1] },
    },
    exit: (dir) => ({
      x: dir < 0 ? 600 : -600,
      opacity: 0,
      scale: 0.98,
      transition: { duration: prefersReducedMotion ? 0 : 0.8, ease: [0.33, 1, 0.68, 1] },
    }),
  };

  const textContainer = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay: 0.2, when: 'beforeChildren', staggerChildren: 0.1 },
    },
  };

  const textItem = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const floating = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const bg = slides[current];
  const bgUrl = imageLoaded[bg?.id] ? bg.src : bg.fallback || bg.src;

  return (
    <section
      id="home"
      className="hero"
      aria-label="Hero section showcasing construction services"
      onMouseEnter={() => {
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
      }}
    >
      {/* Background slider */}
      <div className="hero-background" aria-hidden="true">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={bg?.id || 'bg'}
            className="hero-slide"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(10,36,99,0.65) 0%, rgba(0,0,0,0.35) 100%), url(${bgUrl})`,
            }}
          />
        </AnimatePresence>

        {/* Soft colored angle overlay from current slide color */}
        <motion.div
          className="slide-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{ background: `linear-gradient(135deg, ${bg.color}30, transparent 70%)` }}
        />

        {/* Particles */}
        <div className="hero-particles">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="particle"
              style={{ left: p.left, top: p.top, background: bg.color }}
              animate={{ y: [0, -80, 0], opacity: [0, 0.3, 0], scale: [0, 1, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}
        </div>
      </div>

      {/* --- STATIC TEXT (does not depend on current slide) --- */}
      <div className="container">
        <motion.div
          className="hero-content"
          variants={textContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="hero-title" variants={textItem}>
            <span className="title-line">{HERO_COPY.title}</span>
            <span className="title-highlight" style={{ color: HERO_COPY.brandColor }}>
              {HERO_COPY.highlight}
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={textItem}>
            {HERO_COPY.subtitle}
          </motion.p>

          <motion.div className="hero-cta" variants={textItem}>
            <motion.a
              href="#contact"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: `linear-gradient(135deg, ${HERO_COPY.brandColor}, ${HERO_COPY.brandColor}CC)`,
              }}
              aria-label={`Get started: ${HERO_COPY.primaryCtaText}`}
            >
              {HERO_COPY.primaryCtaText}
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <path
                  d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                  fill="currentColor"
                />
              </motion.svg>
            </motion.a>

            <motion.a
              href="#projects"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Explore our portfolio of completed projects"
            >
              <span>{HERO_COPY.secondaryCtaText}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M14 8L8 14M14 8L8 2M14 8H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <div className="hero-stats" role="region" aria-label="Company achievements and statistics">
            {[
              { number: '450+', label: 'Projects Completed' },
              { number: '15+', label: 'Years Experience' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Expert Team' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-item"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                role="group"
                aria-label={`${s.number} ${s.label}`}
              >
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="slide-navigation">
        <div className="slide-indicators">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`slide-indicator ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? 'true' : 'false'}
            >
              <motion.span
                className="indicator-progress"
                animate={{ width: i === current ? '100%' : '0%' }}
                transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                style={{ background: s.color }}
              />
              <span className="indicator-number">0{i + 1}</span>
            </button>
          ))}
        </div>

        <div className="slide-arrows">
          <motion.button
            className="arrow-btn prev"
            onClick={prev}
            aria-label="Previous slide"
            whileHover={{ scale: 1.08, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L7.5 10L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>
          <motion.button
            className="arrow-btn next"
            onClick={next}
            aria-label="Next slide"
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L12.5 10L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        aria-label="Scroll down to explore more content"
      >
        <motion.span className="scroll-arrow" variants={floating} animate="animate" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
        <span className="scroll-text">Scroll to Explore</span>
      </motion.button>

      {/* Floating CTA */}
      <motion.a
        href="#contact"
        className="floating-cta"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        style={{
          background: `linear-gradient(135deg, ${HERO_COPY.brandColor}, ${HERO_COPY.brandColor}CC)`,
        }}
        aria-label="Get a free quote for your construction project"
      >
        <span>GET FREE QUOTE</span>
        <motion.span
          className="pulse-ring"
          aria-hidden="true"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.a>
    </section>
  );
};

export default Hero;
