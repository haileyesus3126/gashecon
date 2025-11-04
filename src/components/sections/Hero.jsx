import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const slides = [
    {
      id: 1,
      type: 'image',
      src: '/images/hero/construction-1.jpg',
      alt: 'Modern construction project',
      title: 'Building Excellence',
      highlight: 'Since 2009',
      subtitle: 'Premium construction services with uncompromising quality and precision craftsmanship',
      cta: 'Start Your Project',
      color: '#3B82F6'
    },
    {
      id: 2,
      type: 'image',
      src: '/images/hero/construction-2.jpg',
      alt: 'Architectural design',
      title: 'Innovative Solutions',
      highlight: 'Cutting-Edge',
      subtitle: 'Transforming visions into enduring landmarks with advanced technology and expertise',
      cta: 'View Our Work',
      color: '#10B981'
    },
    {
      id: 3,
      type: 'image',
      src: '/images/hero/construction-3.jpg',
      alt: 'Project completion',
      title: 'Your Vision',
      highlight: 'Our Craftsmanship',
      subtitle: 'Delivering exceptional results that stand the test of time and exceed expectations',
      cta: 'Get Free Quote',
      color: '#F59E0B'
    }
  ];

  // Auto-rotate slides every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const staggerText = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)" },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    tap: { scale: 0.98 }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const scrollToExplore = () => {
    const nextSection = document.getElementById('services');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="hero">
      {/* Background Slides with Enhanced Effects */}
      <div className="hero-background" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            className="hero-slide"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url(${slides[currentSlide].src})`
            }}
          >
            {/* Animated Gradient Overlay */}
            <div 
              className="slide-gradient"
              style={{
                background: `linear-gradient(135deg, ${slides[currentSlide].color}20, transparent 50%)`
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Animated Background Elements */}
        <div className="hero-particles">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: slides[currentSlide].color
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div className="hero-text" variants={textVariants}>
            {/* Badge */}
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="badge-dot"></span>
              Premium Construction Services
            </motion.div>

            {/* Title with Highlight */}
            <motion.h1 className="hero-title" variants={staggerText}>
              <motion.span 
                className="title-line"
                variants={staggerText}
              >
                {slides[currentSlide].title}
              </motion.span>
              <motion.span 
                className="title-highlight"
                variants={staggerText}
                style={{ color: slides[currentSlide].color }}
              >
                {slides[currentSlide].highlight}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="hero-subtitle"
              variants={staggerText}
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="hero-cta"
              variants={staggerText}
            >
              <motion.a
                href="#contact"
                className="btn btn-primary"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  background: `linear-gradient(135deg, ${slides[currentSlide].color}, ${slides[currentSlide].color}CC)`
                }}
              >
                {slides[currentSlide].cta}
                <motion.svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
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
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <span>Explore Portfolio</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div 
            className="hero-stats"
            variants={staggerText}
          >
            {[
              { number: "450+", label: "Projects Completed", delay: 0.1 },
              { number: "15+", label: "Years Experience", delay: 0.2 },
              { number: "98%", label: "Client Satisfaction", delay: 0.3 },
              { number: "50+", label: "Expert Team", delay: 0.4 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + stat.delay }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <motion.span 
                  className="stat-number"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 200, 
                    damping: 15, 
                    delay: 1 + stat.delay 
                  }}
                >
                  {stat.number}
                </motion.span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Navigation */}
      <div className="slide-navigation">
        <div className="slide-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            >
              <motion.span
                className="indicator-progress"
                animate={{ width: index === currentSlide ? '100%' : '0%' }}
                transition={{ duration: 6, ease: 'linear' }}
                style={{ background: slide.color }}
              />
              <span className="indicator-number">0{index + 1}</span>
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="slide-arrows">
          <button 
            className="arrow-btn prev"
            onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L7.5 10L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button 
            className="arrow-btn next"
            onClick={() => goToSlide((currentSlide + 1) % slides.length)}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L12.5 10L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToExplore}
      >
        <motion.div
          className="scroll-arrow"
          variants={floatingVariants}
          animate="animate"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 5V19M12 19L19 12M12 19L5 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <span className="scroll-text">Scroll to Explore</span>
      </motion.div>

      {/* Floating CTA */}
      <motion.div
        className="floating-cta"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
      >
        <motion.a
          href="#contact"
          className="floating-btn"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          style={{
            background: `linear-gradient(135deg, ${slides[currentSlide].color}, ${slides[currentSlide].color}CC)`
          }}
        >
          <span>GET FREE QUOTE</span>
          <motion.div
            className="pulse-ring"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.a>
      </motion.div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="spinner-ring" style={{ borderColor: slides[currentSlide].color }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;