import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, MotionConfig, useReducedMotion, useScroll, useSpring } from "framer-motion";
import "./Header.css";

// Constants for better maintainability
const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const SCROLL_THRESHOLD = 50;
const INTERSECTION_OPTIONS = {
  rootMargin: "-40% 0px -55% 0px",
  threshold: [0, 0.25, 0.5, 1]
};

// Custom hook for scroll detection
const useScrollDetection = (threshold = SCROLL_THRESHOLD) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};

// Custom hook for active section detection
const useActiveSection = (navItems) => {
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const sectionIds = navItems
      .map(item => item.href.replace("#", ""))
      .filter(Boolean);
    
    const sectionElements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      
      if (visibleEntry?.target?.id) {
        setActiveHref(`#${visibleEntry.target.id}`);
      }
    }, INTERSECTION_OPTIONS);

    sectionElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  return activeHref;
};

export default function Header() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { 
    stiffness: 180, 
    damping: 24, 
    mass: 0.3 
  });

  const isScrolled = useScrollDetection();
  const activeHref = useActiveSection(NAV_ITEMS);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleBtnRef = useRef(null);

  // Handle body scroll lock
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isMobileOpen]);

  const handleMobileToggle = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  const handleMobileClose = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <MotionConfig
      transition={{ 
        duration: prefersReduced ? 0 : 0.35, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      reducedMotion="user"
    >
      <motion.header
        className={`header ${isScrolled ? "scrolled" : ""}`}
        role="banner"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-label="Site header"
      >
        {/* Progress Bar */}
        <motion.div 
          className="progress-bar" 
          style={{ scaleX: progress }}
          aria-hidden="true"
        />

        <div className="container">
          <div className="nav-wrapper">
            {/* Logo */}
            <a href="#home" className="logo" aria-label="Gashecon Construction - Home">
              <motion.span
                className="logo-icon"
                whileHover={{ 
                  rotate: prefersReduced ? 0 : 5, 
                  scale: prefersReduced ? 1 : 1.05 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 32 32" 
                  fill="currentColor" 
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect x="4" y="8" width="24" height="4" />
                  <rect x="8" y="16" width="16" height="4" />
                  <rect x="12" y="24" width="8" height="4" />
                  <path 
                    d="M4 8L16 4L28 8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none" 
                  />
                </svg>
              </motion.span>
              <span className="logo-text">Gashecon</span>
            </a>

            {/* Desktop Navigation */}
            <DesktopNav 
              nav={NAV_ITEMS} 
              activeHref={activeHref} 
            />

            {/* Mobile Menu Button */}
            <motion.button
              ref={toggleBtnRef}
              className={`mobile-menu-btn ${isMobileOpen ? "active" : ""}`}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              onClick={handleMobileToggle}
              whileTap={{ scale: 0.92 }}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <MobileDrawer
            open={isMobileOpen}
            onClose={handleMobileClose}
            nav={NAV_ITEMS}
            activeHref={activeHref}
            returnFocusRef={toggleBtnRef}
          />
        </div>
      </motion.header>
    </MotionConfig>
  );
}

/* ---------------------------- Desktop Navigation --------------------------- */

function DesktopNav({ nav, activeHref }) {
  const wrapRef = useRef(null);
  const itemRefs = useRef({});
  const prefersReduced = useReducedMotion();
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const [hoveredHref, setHoveredHref] = useState(null);

  const recalcIndicator = useCallback(() => {
    const wrap = wrapRef.current;
    const activeElement = activeHref ? itemRefs.current[activeHref] : null;
    
    if (!wrap || !activeElement) {
      setIndicator(prev => ({ ...prev, ready: false }));
      return;
    }

    const wrapRect = wrap.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();
    
    setIndicator({ 
      left: elementRect.left - wrapRect.left, 
      width: elementRect.width, 
      ready: true 
    });
  }, [activeHref]);

  useEffect(() => {
    recalcIndicator();
    
    const handleResize = () => recalcIndicator();
    window.addEventListener("resize", handleResize);
    
    // Recalculate after DOM update
    const timeoutId = setTimeout(recalcIndicator, 0);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [recalcIndicator]);

  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      <div className="desktop-nav-wrap" ref={wrapRef}>
        <ul role="menubar">
          {nav.map((item, index) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href} role="none">
                <motion.a
                  href={item.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  ref={(el) => (itemRefs.current[item.href] = el)}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  onMouseLeave={() => setHoveredHref(null)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  role="menuitem"
                >
                  <span className="link-label">{item.name}</span>
                  <motion.span
                    className="hover-wash"
                    initial={false}
                    animate={{
                      opacity: hoveredHref === item.href ? 1 : 0,
                      scale: hoveredHref === item.href ? 1 : 0.95
                    }}
                    transition={{ duration: prefersReduced ? 0 : 0.18 }}
                    aria-hidden="true"
                  />
                </motion.a>
              </li>
            );
          })}
        </ul>

        {/* Active Indicator */}
        <AnimatePresence>
          {indicator.ready && (
            <motion.span
              key="active-indicator"
              className="active-underline"
              initial={false}
              animate={{ 
                left: indicator.left, 
                width: indicator.width 
              }}
              transition={{ 
                duration: prefersReduced ? 0 : 0.35, 
                ease: "easeInOut" 
              }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

/* ----------------------------- Mobile Drawer ------------------------------ */

function MobileDrawer({ open, onClose, nav, activeHref, returnFocusRef }) {
  const prefersReduced = useReducedMotion();
  const panelRef = useRef(null);

  // Keyboard navigation and focus management
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusableElements = panel?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === "Tab" && focusableElements?.length) {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    // Focus first element when drawer opens
    setTimeout(() => firstElement?.focus(), 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Return focus to toggle button when drawer closes
      setTimeout(() => returnFocusRef?.current?.focus?.(), 0);
    };
  }, [open, onClose, returnFocusRef]);

  const drawerVariants = {
    closed: { 
      x: "100%", 
      opacity: 0 
    },
    open: {
      x: 0, 
      opacity: 1,
      transition: { 
        type: prefersReduced ? "tween" : "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="mobile-nav-overlay"
            onClick={onClose}
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            aria-hidden="true"
          />
          
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-nav-header">
              <a 
                href="#home" 
                className="logo"
                onClick={onClose}
                aria-label="Gashecon Construction - Home"
              >
                <span className="logo-icon" aria-hidden="true">
                  <svg 
                    width="28" 
                    height="28" 
                    viewBox="0 0 32 32" 
                    fill="currentColor"
                    focusable="false"
                  >
                    <rect x="4" y="8" width="24" height="4" />
                    <rect x="8" y="16" width="16" height="4" />
                    <rect x="12" y="24" width="8" height="4" />
                    <path 
                      d="M4 8L16 4L28 8" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="none" 
                    />
                  </svg>
                </span>
                <span className="logo-text">Gashecon</span>
              </a>
              
              <motion.button
                className="mobile-close-btn"
                onClick={onClose}
                aria-label="Close menu"
                whileHover={{ scale: prefersReduced ? 1 : 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  aria-hidden="true"
                  focusable="false"
                >
                  <path 
                    d="M18 6L6 18M6 6L18 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </motion.button>
            </div>

            <ul className="mobile-nav-list" role="menubar">
              {nav.map((item, index) => {
                const isActive = activeHref === item.href;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + index * 0.06 }}
                    role="none"
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      className={`mobile-nav-link ${isActive ? "active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      role="menuitem"
                    >
                      {item.name}
                      <motion.span
                        className="mobile-link-arrow"
                        animate={isActive ? { x: 0 } : { x: -6, opacity: 0.6 }}
                        transition={{ type: "spring", stiffness: 400, damping: 24 }}
                        aria-hidden="true"
                      >
                        →
                      </motion.span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}