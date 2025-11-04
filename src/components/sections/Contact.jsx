import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Contact.css';

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
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
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
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "var(--accent-color)",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 8px 25px 0 rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    tap: { scale: 0.98 },
    submitting: {
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
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
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone',
      content: '+250 788 123 456',
      link: 'tel:+250788123456',
      description: 'Mon-Fri: 8:00 AM - 6:00 PM',
      color: '#3B82F6'
    },
    {
      icon: '✉️',
      title: 'Email',
      content: 'info@gashecon.com',
      link: 'mailto:info@gashecon.com',
      description: 'We respond within 24 hours',
      color: '#10B981'
    },
    {
      icon: '📍',
      title: 'Address',
      content: 'KG 123 St, Kigali Heights\nKigali, Rwanda',
      link: 'https://maps.google.com',
      description: 'Visit our headquarters',
      color: '#F59E0B'
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      content: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 1:00 PM',
      link: null,
      description: 'Emergency services available',
      color: '#8B5CF6'
    }
  ];

  const projectTypes = [
    'Custom Home Building',
    'Commercial Construction',
    'Renovation & Remodeling',
    'Architectural Design',
    'Project Management',
    'Industrial Construction',
    'Sustainable Building',
    'Other'
  ];

  const budgetRanges = [
    'Less than $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000 - $1,000,000',
    'More than $1,000,000'
  ];

  const timelineOptions = [
    'Immediately',
    'Within 1-3 months',
    'Within 3-6 months',
    'Within 6-12 months',
    'Planning phase'
  ];

  return (
    <section id="contact" className="contact section-padding" ref={sectionRef}>
      {/* Background Elements */}
      <div className="contact-background">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-shape"
              style={{
                left: `${15 + (i * 15)}%`,
                background: `linear-gradient(135deg, var(--accent-color)${10 + i * 5}%, transparent)`
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        {/* Enhanced Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="badge-dot"></span>
            Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Let's Build Something
            <motion.span 
              className="title-highlight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Extraordinary
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to start your construction project? Get in touch with our team 
            for a free consultation and quote.
          </motion.p>
        </motion.div>

        <div className="contact-content">
          {/* Enhanced Contact Information */}
          <motion.div
            className="contact-info"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div 
              className="info-content"
              variants={itemVariants}
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.h3>
              
              <motion.p 
                className="info-description"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                We're here to answer any questions you may have about your 
                construction project. Reach out to us and we'll respond as soon as we can.
              </motion.p>

              <div className="contact-details">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`contact-item ${hoveredContact === index ? 'hovered' : ''}`}
                    variants={itemVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredContact(index)}
                    onHoverEnd={() => setHoveredContact(null)}
                  >
                    {/* Item Background Effect */}
                    <div 
                      className="item-background"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`
                      }}
                    />

                    <motion.div
                      className="contact-icon"
                      style={{ background: item.color }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>{item.icon}</span>
                      
                      {/* Icon Glow */}
                      <motion.div
                        className="icon-glow"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.5
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
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.content}
                        </motion.a>
                      ) : (
                        <p>{item.content}</p>
                      )}
                      <p className="contact-description">{item.description}</p>
                    </div>

                    {/* Hover Border */}
                    <motion.div
                      className="item-border"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{ background: item.color }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Emergency Contact */}
              <motion.div
                className="emergency-contact"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="emergency-icon"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🚨
                </motion.div>
                <div className="emergency-content">
                  <h4>24/7 Emergency Service</h4>
                  <p>Immediate response for urgent construction needs</p>
                  <motion.a 
                    href="tel:+250788123457" 
                    className="emergency-phone"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    +250 788 123 457
                  </motion.a>
                </div>

                {/* Emergency Pulse Effect */}
                <motion.div
                  className="emergency-pulse"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
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
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.form 
              ref={formRef}
              className="contact-form" 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Form Header */}
              <motion.div
                className="form-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3>Start Your Project</h3>
                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
              </motion.div>

              <div className="form-row">
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name">Full Name *</label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    required
                    placeholder="Enter your full name"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                  {activeField === 'name' && (
                    <motion.div
                      className="input-focus-bar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email">Email Address *</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    required
                    placeholder="Enter your email address"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                  {activeField === 'email' && (
                    <motion.div
                      className="input-focus-bar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </div>

              <div className="form-row">
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="phone">Phone Number</label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    placeholder="Enter your phone number"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                  {activeField === 'phone' && (
                    <motion.div
                      className="input-focus-bar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="projectType">Project Type *</label>
                  <motion.select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    onFocus={() => handleFocus('projectType')}
                    onBlur={handleBlur}
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </motion.select>
                  {activeField === 'projectType' && (
                    <motion.div
                      className="input-focus-bar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </div>

              <div className="form-row">
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="budget">Estimated Budget</label>
                  <motion.select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onFocus={() => handleFocus('budget')}
                    onBlur={handleBlur}
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </motion.select>
                  {activeField === 'budget' && (
                    <motion.div
                      className="input-focus-bar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="timeline">Project Timeline</label>
                  <motion.select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    onFocus={() => handleFocus('timeline')}
                    onBlur={handleBlur}
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((timeline, index) => (
                      <option key={index} value={timeline}>{timeline}</option>
                    ))}
                  </motion.select>
                  {activeField === 'timeline' && (
                    <motion.div
                      className="input-focus-bar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </div>

              <motion.div
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message">Project Details *</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  rows="6"
                  placeholder="Tell us about your project vision, specific requirements, location, and any other important details..."
                  variants={inputVariants}
                  whileFocus="focus"
                ></motion.textarea>
                {activeField === 'message' && (
                  <motion.div
                    className="input-focus-bar"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>

              <motion.button 
                type="submit" 
                className={`submit-btn btn btn-primary ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
                variants={buttonVariants}
                initial="initial"
                whileHover={isSubmitting ? "submitting" : "hover"}
                whileTap="tap"
                animate={isSubmitting ? "submitting" : "initial"}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <motion.svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20"
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
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="success-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                    >
                      ✓
                    </motion.div>
                    <div className="success-content">
                      <h4>Message Sent Successfully!</h4>
                      <p>We'll get back to you within 24 hours with a detailed consultation.</p>
                    </div>
                    
                    {/* Success Confetti Effect */}
                    <div className="success-confetti">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="confetti-piece"
                          style={{
                            background: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5]
                          }}
                          initial={{ 
                            y: 0, 
                            x: 0, 
                            opacity: 1,
                            rotate: 0
                          }}
                          animate={{ 
                            y: -100, 
                            x: Math.random() * 100 - 50,
                            opacity: 0,
                            rotate: 360
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;