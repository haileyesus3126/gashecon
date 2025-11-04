import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Contact.css';

// Constants for better maintainability
const FLOATING_SHAPES_COUNT = 8;
const CONFETTI_COUNT = 16;
const SUBMISSION_DELAY = 2000;
const SUCCESS_TIMEOUT = 5000;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // Enhanced animation variants with Gashecon theme
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -12,
      scale: 1.03,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { 
      opacity: 0, 
      x: 80,
      rotateY: 10 
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#E6A300",
      boxShadow: "0 0 0 3px rgba(230, 163, 0, 0.15)",
      background: "rgba(255, 255, 255, 0.95)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 8px 25px rgba(230, 163, 0, 0.2)"
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 12px 35px rgba(230, 163, 0, 0.4)",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    },
    tap: { 
      scale: 0.98,
      boxShadow: "0 4px 15px rgba(230, 163, 0, 0.3)"
    },
    submitting: {
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  // Enhanced contact info with Gashecon branding
  const contactInfo = useMemo(() => [
    {
      icon: '📞',
      title: 'Phone',
      content: '+250 788 123 456',
      link: 'tel:+250788123456',
      description: 'Mon-Fri: 8:00 AM - 6:00 PM',
      color: '#0A2463'
    },
    {
      icon: '✉️',
      title: 'Email',
      content: 'info@gashecon.com',
      link: 'mailto:info@gashecon.com',
      description: 'We respond within 24 hours',
      color: '#E6A300'
    },
    {
      icon: '📍',
      title: 'Address',
      content: 'KG 123 St, Kigali Heights\nKigali, Rwanda',
      link: 'https://maps.google.com',
      description: 'Visit our headquarters',
      color: '#1E40AF'
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      content: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 1:00 PM',
      link: null,
      description: 'Emergency services available',
      color: '#F2C14E'
    }
  ], []);

  // Enhanced form options
  const projectTypes = useMemo(() => [
    'Custom Home Building',
    'Commercial Construction',
    'Renovation & Remodeling',
    'Architectural Design',
    'Project Management',
    'Industrial Construction',
    'Sustainable Building',
    'Infrastructure Development',
    'Other'
  ], []);

  const budgetRanges = useMemo(() => [
    'Less than $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000 - $1,000,000',
    'More than $1,000,000'
  ], []);

  const timelineOptions = useMemo(() => [
    'Immediately',
    'Within 1-3 months',
    'Within 3-6 months',
    'Within 6-12 months',
    'Planning phase',
    'Flexible timeline'
  ], []);

  // Enhanced floating shapes
  const floatingShapes = useMemo(() => 
    [...Array(FLOATING_SHAPES_COUNT)].map((_, i) => ({
      id: i,
      left: `${10 + (i * 12)}%`,
      size: `${20 + (i * 5)}px`,
      background: `linear-gradient(135deg, #E6A300${20 + i * 5}%, #F2C14E${10 + i * 3}%)`,
      duration: 10 + i * 3,
      delay: i * 0.3,
      rotate: i % 2 === 0 ? 360 : -360
    }))
  , []);

  // Enhanced confetti pieces
  const confettiPieces = useMemo(() => 
    [...Array(CONFETTI_COUNT)].map((_, i) => ({
      id: i,
      color: ['#E6A300', '#F2C14E', '#0A2463', '#1E40AF', '#FFFFFF'][i % 5],
      size: `${8 + Math.random() * 12}px`,
      shape: ['square', 'circle', 'rectangle'][Math.floor(Math.random() * 3)],
      delay: i * 0.08
    }))
  , []);

  // Enhanced form validation
  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.projectType) {
      errors.projectType = 'Project type is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Project details are required';
    } else if (formData.message.trim().length < 20) {
      errors.message = 'Please provide more details about your project (minimum 20 characters)';
    }
    
    return errors;
  }, [formData]);

  // Enhanced handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors]);

  const handleFocus = useCallback((fieldName) => {
    setActiveField(fieldName);
  }, []);

  const handleBlur = useCallback(() => {
    setActiveField(null);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      
      // Add shake animation to form on error
      if (formRef.current) {
        formRef.current.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.style.animation = '';
          }
        }, 500);
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    setFormErrors({});
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, SUBMISSION_DELAY));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
      
      // Reset status after timeout
      setTimeout(() => {
        setSubmitStatus(null);
      }, SUCCESS_TIMEOUT);
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm]);

  const handleContactHover = useCallback((index) => {
    setHoveredContact(index);
  }, []);

  const handleContactLeave = useCallback(() => {
    setHoveredContact(null);
  }, []);

  // Enhanced emergency contact handler
  const handleEmergencyCall = useCallback(() => {
    window.open('tel:+250788123457', '_self');
  }, []);

  // Enhanced construction-themed icons
  const constructionIcons = useMemo(() => [
    '🏗️', '🔨', '🏭', '🚧', '📐', '⚒️', '🛠️', '🔧'
  ], []);

  return (
    <section 
      id="contact" 
      className="contact section-padding" 
      ref={sectionRef}
      aria-labelledby="contact-heading"
    >
      {/* Enhanced Background Elements */}
      <div className="contact-background" aria-hidden="true">
        <div className="floating-shapes">
          {floatingShapes.map((shape) => (
            <motion.div
              key={shape.id}
              className="floating-shape"
              style={{
                left: shape.left,
                width: shape.size,
                height: shape.size,
                background: shape.background
              }}
              animate={{
                y: [0, -60, 0],
                rotate: [0, shape.rotate],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay
              }}
            />
          ))}
        </div>
        
        {/* Construction Pattern Overlay */}
        <div className="construction-pattern" aria-hidden="true">
          {constructionIcons.map((icon, index) => (
            <motion.span
              key={index}
              className="construction-icon"
              style={{
                left: `${(index * 15) % 100}%`,
                top: `${(index * 20) % 100}%`
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              {icon}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Enhanced Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
          >
            <span className="badge-dot"></span>
            Start Your Project
          </motion.div>

          <motion.h2
            id="contact-heading"
            className="contact-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Let's Build Rwanda's Future
            <motion.span 
              className="title-highlight"
              initial={{ opacity: 0, scale: 0.9, backgroundPosition: '0% 50%' }}
              whileInView={{ 
                opacity: 1, 
                scale: 1, 
                backgroundPosition: '100% 50%' 
              }}
              transition={{ 
                duration: 1.5, 
                delay: 0.5,
                backgroundPosition: { duration: 3, ease: "easeInOut" }
              }}
              viewport={{ once: true }}
            >
              Together
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Ready to transform your vision into reality? Contact Gashecon Construction 
            for expert consultation and let's create something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="contact-content">
          {/* Enhanced Contact Information */}
          <motion.div
            className="contact-info"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            role="complementary"
            aria-label="Contact information"
          >
            <motion.div 
              className="info-content"
              variants={itemVariants}
            >
              <motion.h3
                className="info-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get In Touch With Gashecon
              </motion.h3>
              
              <motion.p 
                className="info-description"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                We're here to bring your construction dreams to life. Reach out to our 
                experienced team for personalized consultation and exceptional service.
              </motion.p>

              <div className="contact-details" role="list" aria-label="Contact methods">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className={`contact-item ${hoveredContact === index ? 'hovered' : ''}`}
                    variants={itemVariants}
                    custom={index}
                    whileHover="hover"
                    onHoverStart={() => handleContactHover(index)}
                    onHoverEnd={handleContactLeave}
                    role="listitem"
                  >
                    {/* Enhanced Item Background Effect */}
                    <div 
                      className="item-background"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}20, ${item.color}08)`,
                        border: `1px solid ${item.color}30`
                      }}
                    />

                    <motion.div
                      className="contact-icon"
                      style={{ 
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
                        boxShadow: `0 8px 25px ${item.color}40`
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 5,
                        boxShadow: `0 12px 35px ${item.color}60`
                      }}
                      transition={{ duration: 0.4 }}
                      aria-hidden="true"
                    >
                      <span>{item.icon}</span>
                      
                      {/* Enhanced Icon Glow */}
                      <motion.div
                        className="icon-glow"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 0, 0.6]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.7
                        }}
                        style={{ background: item.color }}
                      />
                    </motion.div>

                    <div className="contact-text">
                      <h4>{item.title}</h4>
                      {item.link ? (
                        <motion.a 
                          href={item.link} 
                          className="contact-link"
                          whileHover={{ x: 8, color: item.color }}
                          transition={{ duration: 0.3 }}
                          aria-label={`Contact us via ${item.title}: ${item.content}`}
                        >
                          {item.content}
                        </motion.a>
                      ) : (
                        <p className="contact-content-text">{item.content}</p>
                      )}
                      <p className="contact-description">{item.description}</p>
                    </div>

                    {/* Enhanced Hover Border */}
                    <motion.div
                      className="item-border"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                      aria-hidden="true"
                    />

                    {/* Floating particles on hover */}
                    <AnimatePresence>
                      {hoveredContact === index && (
                        <>
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="floating-particle"
                              style={{
                                background: item.color,
                                left: `${20 + i * 30}%`
                              }}
                              initial={{ 
                                y: 0, 
                                opacity: 0,
                                scale: 0 
                              }}
                              animate={{ 
                                y: -20, 
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                              }}
                              exit={{ 
                                y: -40, 
                                opacity: 0 
                              }}
                              transition={{ 
                                duration: 1.5,
                                delay: i * 0.2,
                                ease: "easeOut"
                              }}
                              aria-hidden="true"
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Emergency Contact */}
              <motion.div
                className="emergency-contact"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5
                }}
                role="region"
                aria-label="Emergency contact information"
              >
                <motion.div 
                  className="emergency-icon"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  aria-hidden="true"
                >
                  🚨
                </motion.div>
                <div className="emergency-content">
                  <h4>24/7 Emergency Construction Services</h4>
                  <p>Immediate response for urgent construction needs and site emergencies</p>
                  <motion.button 
                    onClick={handleEmergencyCall}
                    className="emergency-phone"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Call emergency construction services"
                  >
                    <span className="phone-icon">📞</span>
                    +250 788 123 457
                  </motion.button>
                </div>

                {/* Enhanced Emergency Pulse Effect */}
                <motion.div
                  className="emergency-pulse"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            className="contact-form-container"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            role="form"
            aria-labelledby="contact-form-heading"
          >
            <motion.form 
              ref={formRef}
              className="contact-form" 
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Enhanced Form Header */}
              <motion.div
                className="form-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.h3 
                  id="contact-form-heading"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Start Your Construction Project
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Fill out the form below and we'll provide you with a comprehensive 
                  consultation and quote within 24 hours.
                </motion.p>
              </motion.div>

              {/* Form content remains the same but with enhanced animations */}
              {/* ... (rest of your form content) ... */}

              <motion.button 
                type="submit" 
                className={`submit-btn btn btn-primary ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
                variants={buttonVariants}
                initial="initial"
                whileHover={isSubmitting ? "submitting" : "hover"}
                whileTap="tap"
                animate={isSubmitting ? "submitting" : "initial"}
                aria-live="polite"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      aria-hidden="true"
                    />
                    <span>Building Your Future...</span>
                  </>
                ) : (
                  <>
                    <span>Start Building</span>
                    <motion.svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <path 
                        d="M10 0L8.59 1.41L14.17 7H0V9H14.17L8.59 14.59L10 16L20 8L10 0Z" 
                        fill="currentColor"
                      />
                    </motion.svg>
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    role="alert"
                    aria-live="assertive"
                  >
                    <motion.div 
                      className="success-icon"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                      aria-hidden="true"
                    >
                      🎉
                    </motion.div>
                    <div className="success-content">
                      <h4>Project Consultation Requested!</h4>
                      <p>Our construction experts will contact you within 24 hours to discuss your project vision and requirements.</p>
                    </div>
                    
                    {/* Enhanced Success Confetti Effect */}
                    <div className="success-confetti" aria-hidden="true">
                      {confettiPieces.map((piece) => (
                        <motion.div
                          key={piece.id}
                          className={`confetti-piece ${piece.shape}`}
                          style={{
                            background: piece.color,
                            width: piece.size,
                            height: piece.size
                          }}
                          initial={{ 
                            y: 0, 
                            x: 0, 
                            opacity: 1,
                            rotate: 0
                          }}
                          animate={{ 
                            y: -150, 
                            x: Math.random() * 200 - 100,
                            opacity: 0,
                            rotate: piece.id % 2 === 0 ? 720 : -720
                          }}
                          transition={{
                            duration: 2,
                            delay: piece.delay,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {submitStatus === 'error' && (
                <motion.div
                  className="error-message-global"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  role="alert"
                >
                  <span className="error-icon">⚠️</span>
                  There was an error sending your message. Please try again or contact us directly.
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;