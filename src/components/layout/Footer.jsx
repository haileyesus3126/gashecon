import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Footer.css';

// Constants for better maintainability
const SCROLL_THRESHOLD = 500;

// FIXED: Added proper names to social links
const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: '#1877F2',
    link: 'https://facebook.com/gashecon'
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: '#0A66C2',
    link: 'https://linkedin.com/company/gashecon'
  },
  {
    name: 'Twitter',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.055 10.055 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.543l-.047-.02z"/>
      </svg>
    ),
    color: '#1DA1F2',
    link: 'https://twitter.com/gashecon'
  },
  {
    name: 'Instagram', // FIXED: Added name
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: '#E4405F',
    link: 'https://instagram.com/gashecon'
  }
];

const FOOTER_LINKS = {
  company: [
    { name: 'About Us', link: '#about' },
    { name: 'Our Process', link: '#process' },
    { name: 'Team', link: '#team' },
    { name: 'Careers', link: '#contact' },
    { name: 'Contact', link: '#contact' }
  ],
  services: [
    { name: 'Custom Home Building', link: '#services' },
    { name: 'Commercial Construction', link: '#services' },
    { name: 'Renovation & Remodeling', link: '#services' },
    { name: 'Architectural Design', link: '#services' },
    { name: 'Project Management', link: '#services' }
  ],
  projects: [
    { name: 'Residential Projects', link: '#projects' },
    { name: 'Commercial Projects', link: '#projects' },
    { name: 'Renovation Projects', link: '#projects' },
    { name: 'View All Projects', link: '#projects' }
  ]
};

// Custom hook for scroll detection
const useScrollDetection = (threshold = SCROLL_THRESHOLD) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
};

// Custom hook for newsletter form
const useNewsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
    }
  }, [email]);

  return {
    email,
    setEmail,
    status,
    handleSubmit
  };
};

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const showBackToTop = useScrollDetection();
  
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, threshold: 0.1 });
  const { email, setEmail, status, handleSubmit } = useNewsletter();

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.2 + i * 0.05
      }
    }),
    hover: {
      x: 8,
      color: "var(--accent-color)",
      transition: {
        duration: 0.2
      }
    }
  };

  const socialVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400
      }
    },
    tap: {
      scale: 0.9
    }
  };

  const backToTopVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingDots = useMemo(() => 
    [...Array(12)].map((_, i) => ({
      id: i,
      left: `${5 + (i * 8)}%`,
      background: `linear-gradient(135deg, var(--accent-color)${10 + i * 3}%, transparent)`,
      duration: 4 + i * 0.5,
      delay: i * 0.2
    }))
  , []);

  return (
    <footer className="footer" ref={footerRef} role="contentinfo">
      {/* Background Elements */}
      <div className="footer-background" aria-hidden="true">
        <div className="footer-pattern"></div>
        <div className="floating-dots">
          {floatingDots.map((dot) => (
            <motion.div
              key={dot.id}
              className="floating-dot"
              style={{
                left: dot.left,
                background: dot.background
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: dot.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot.delay
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        {/* Main Footer Content */}
        <motion.div
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Brand Column */}
          <motion.div
            className="footer-brand"
            variants={itemVariants}
          >
            <motion.h3
              className="footer-logo"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Gashecon
            </motion.h3>
            
            <motion.p
              className="footer-description"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Building excellence since 2009. We transform visions into enduring 
              structures with uncompromising quality and innovative solutions.
            </motion.p>

            {/* Enhanced Social Links */}
            <motion.div
              className="footer-social"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.name} // FIXED: Now using proper unique names
                  href={social.link}
                  aria-label={`Follow us on ${social.name}`}
                  className="social-link"
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setHoveredSocial(index)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  style={{
                    background: hoveredSocial === index ? social.color : 'var(--bg-tertiary)',
                    color: hoveredSocial === index ? 'white' : 'var(--text-secondary)'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                  
                  {/* Social Link Tooltip */}
                  <motion.span
                    className="social-tooltip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredSocial === index ? 1 : 0,
                      y: hoveredSocial === index ? 0 : 10
                    }}
                  >
                    {social.name}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              className="newsletter-signup"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h4>Stay Updated</h4>
              <p>Get the latest construction insights and project updates.</p>
              
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="newsletter-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address for newsletter"
                    disabled={status === 'loading'}
                  />
                  <motion.button
                    type="submit"
                    className="newsletter-btn"
                    whileHover={{ scale: status === 'idle' ? 1.05 : 1 }}
                    whileTap={{ scale: status === 'idle' ? 0.95 : 1 }}
                    disabled={status === 'loading'}
                    aria-live="polite"
                  >
                    {status === 'loading' ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⏳
                      </motion.span>
                    ) : status === 'success' ? (
                      '✅'
                    ) : (
                      'Subscribe'
                    )}
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.p
                      className="newsletter-message success"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Thank you for subscribing!
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      className="newsletter-message error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Please enter a valid email address.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>

          {/* Links Columns */}
          <div className="footer-links">
            {/* Company Links */}
            <motion.div
              className="footer-column"
              variants={itemVariants}
            >
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Company
              </motion.h4>
              <ul role="list">
                {FOOTER_LINKS.company.map((link, index) => (
                  <motion.li
                    key={link.name}
                    custom={index}
                    variants={linkVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                    onHoverStart={() => setHoveredLink(`${link.name}-${index}`)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <motion.a
                      href={link.link}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.link);
                      }}
                      aria-label={`Navigate to ${link.name}`}
                    >
                      {link.name}
                      {hoveredLink === `${link.name}-${index}` && (
                        <motion.span
                          className="link-underline"
                          layoutId="linkUnderline"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services Links */}
            <motion.div
              className="footer-column"
              variants={itemVariants}
            >
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Services
              </motion.h4>
              <ul role="list">
                {FOOTER_LINKS.services.map((link, index) => (
                  <motion.li
                    key={link.name}
                    custom={index}
                    variants={linkVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                    onHoverStart={() => setHoveredLink(`${link.name}-${index}`)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <motion.a
                      href={link.link}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.link);
                      }}
                      aria-label={`Navigate to ${link.name}`}
                    >
                      {link.name}
                      {hoveredLink === `${link.name}-${index}` && (
                        <motion.span
                          className="link-underline"
                          layoutId="linkUnderline"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Projects Links */}
            <motion.div
              className="footer-column"
              variants={itemVariants}
            >
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Projects
              </motion.h4>
              <ul role="list">
                {FOOTER_LINKS.projects.map((link, index) => (
                  <motion.li
                    key={link.name}
                    custom={index}
                    variants={linkVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                    onHoverStart={() => setHoveredLink(`${link.name}-${index}`)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <motion.a
                      href={link.link}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.link);
                      }}
                      aria-label={`Navigate to ${link.name}`}
                    >
                      {link.name}
                      {hoveredLink === `${link.name}-${index}` && (
                        <motion.span
                          className="link-underline"
                          layoutId="linkUnderline"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="footer-column"
              variants={itemVariants}
            >
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Contact Info
              </motion.h4>
              <motion.div
                className="contact-info"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="contact-item"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <strong>📞 Phone:</strong>
                  <a href="tel:+250788123456" aria-label="Call us at +250 788 123 456">
                    +250 788 123 456
                  </a>
                </motion.div>
                <motion.div
                  className="contact-item"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <strong>✉️ Email:</strong>
                  <a href="mailto:info@gashecon.com" aria-label="Email us at info@gashecon.com">
                    info@gashecon.com
                  </a>
                </motion.div>
                <motion.div
                  className="contact-item"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <strong>📍 Address:</strong>
                  <address>
                    KG 123 St, Kigali Heights<br />Kigali, Rwanda
                  </address>
                </motion.div>
                
                {/* Business Hours */}
                <motion.div
                  className="business-hours"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <strong>🕒 Business Hours:</strong>
                  <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
                  <span>Sat: 9:00 AM - 1:00 PM</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <motion.div
              className="copyright"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <p>&copy; {currentYear} Gashecon Construction. All rights reserved.</p>
              <p className="tagline">Building Rwanda's Future, One Project at a Time</p>
            </motion.div>
            
            <motion.div
              className="footer-legal"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ 
                    color: "var(--accent-color)",
                    y: -2 
                  }}
                  transition={{ duration: 0.2 }}
                  aria-label={`View our ${item}`}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="back-to-top"
            variants={backToTopVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;