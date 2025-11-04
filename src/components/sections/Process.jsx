import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Process.css';

// Constants for better maintainability
const FLOATING_ELEMENTS_COUNT = 8;
const AUTO_ROTATE_INTERVAL = 4000;
const COUNTER_DURATION = 2000;

// Process data included directly to avoid import issues
const processData = [
  {
    id: 1,
    step: "01",
    title: "Consultation & Planning",
    description: "We begin with an in-depth consultation to understand your vision, requirements, and objectives. Our team conducts site analysis and develops a comprehensive project plan.",
    icon: "📋",
    color: "#0A2463", // Using your brand color
    duration: "1-2 Weeks",
    details: [
      "Initial client consultation and needs assessment",
      "Site evaluation and feasibility study",
      "Budget planning and cost estimation",
      "Project timeline development",
      "Regulatory compliance review"
    ]
  },
  {
    id: 2,
    step: "02",
    title: "Design & Engineering",
    description: "Our architects and engineers create detailed designs that balance aesthetics, functionality, and structural integrity while incorporating sustainable practices.",
    icon: "📐",
    color: "#FF6B35", // Using your brand color
    duration: "2-4 Weeks",
    details: [
      "Architectural design development",
      "Structural engineering calculations",
      "3D modeling and visualization",
      "Material selection and specification",
      "Building code compliance review"
    ]
  },
  {
    id: 3,
    step: "03",
    title: "Pre-Construction",
    description: "We prepare all necessary documentation, obtain permits, and assemble the project team. Detailed scheduling and resource planning ensure a smooth construction phase.",
    icon: "🏗️",
    color: "#4CAF50", // Using your brand color
    duration: "2-3 Weeks",
    details: [
      "Permit acquisition and approvals",
      "Contractor and subcontractor selection",
      "Material procurement and logistics",
      "Safety plan development",
      "Stakeholder coordination meetings"
    ]
  },
  {
    id: 4,
    step: "04",
    title: "Construction Phase",
    description: "Our skilled team executes the project with precision, maintaining the highest standards of quality and safety while adhering to the established timeline.",
    icon: "🔨",
    color: "#8B5CF6",
    duration: "Project Dependent",
    details: [
      "Site preparation and foundation work",
      "Structural construction and framing",
      "Mechanical, electrical, and plumbing",
      "Quality control and inspections",
      "Progress reporting and client updates"
    ]
  },
  {
    id: 5,
    step: "05",
    title: "Finishing & Quality Control",
    description: "We focus on interior finishes, exterior detailing, and comprehensive quality checks to ensure every aspect meets our exacting standards.",
    icon: "✨",
    color: "#F59E0B",
    duration: "2-4 Weeks",
    details: [
      "Interior finishing and detailing",
      "Exterior landscaping and hardscaping",
      "Final inspections and quality assurance",
      "Punch list completion",
      "Client walkthrough and feedback"
    ]
  },
  {
    id: 6,
    step: "06",
    title: "Project Delivery",
    description: "We conduct final inspections, hand over all documentation, and provide ongoing support to ensure your complete satisfaction with the finished project.",
    icon: "🎯",
    color: "#06D6A0",
    duration: "1 Week",
    details: [
      "Final project inspection and certification",
      "Documentation and warranty handover",
      "Client training and orientation",
      "Post-construction support setup",
      "Project completion celebration"
    ]
  }
];

// Animated counter component
const Counter = ({ target, suffix = "", duration = COUNTER_DURATION }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = target / (duration / 16);
      let animationFrame;
      
      const updateCount = () => {
        start += increment;
        if (start >= target) {
          setCount(target);
        } else {
          setCount(Math.ceil(start));
          animationFrame = requestAnimationFrame(updateCount);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="stat-number" aria-live="polite">
      {count}{suffix}
    </span>
  );
};

const Process = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // Auto-rotate through steps with pause on hover
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processData.length);
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stepVariants = {
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
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180 
    },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const connectorVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Handlers
  const handleStepHover = useCallback((index) => {
    setHoveredStep(index);
  }, []);

  const handleStepLeave = useCallback(() => {
    setHoveredStep(null);
  }, []);

  const handleStepClick = useCallback((index) => {
    setActiveStep(index);
  }, []);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Memoized data
  const memoizedProcessData = useMemo(() => processData, []);
  const memoizedStats = useMemo(() => [
    { target: 150, suffix: "+", label: "Projects Completed", delay: 0.1 },
    { target: 98, suffix: "%", label: "Client Satisfaction", delay: 0.2 },
    { target: 15, suffix: "+", label: "Years Experience", delay: 0.3 },
    { target: 50, suffix: "+", label: "Awards Won", delay: 0.4 }
  ], []);

  // Memoized floating elements
  const floatingElements = useMemo(() => 
    [...Array(FLOATING_ELEMENTS_COUNT)].map((_, i) => ({
      id: i,
      left: `${15 + (i * 10)}%`,
      background: `linear-gradient(135deg, var(--accent-color)${10 + i * 5}%, transparent)`,
      duration: 6 + i * 1,
      delay: i * 0.3
    }))
  , []);

  return (
    <section 
      id="process" 
      className="process section-padding" 
      ref={sectionRef}
      aria-labelledby="process-heading"
    >
      {/* Background Elements */}
      <div className="process-background" aria-hidden="true">
        <div className="floating-elements">
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="floating-element"
              style={{
                left: element.left,
                background: element.background
              }}
              animate={{
                y: [0, -50, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.delay
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        {/* Enhanced Header */}
        <motion.div
          className="process-header"
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
            Our Process
          </motion.div>

          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Our Proven
            <motion.span 
              className="title-highlight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Process
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="process-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            From concept to completion, we follow a meticulous process that ensures 
            quality, transparency, and outstanding results every step of the way.
          </motion.p>
        </motion.div>

        {/* Enhanced Process Steps */}
        <motion.div
          className="process-steps"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          role="list"
          aria-label="Construction process steps"
        >
          {memoizedProcessData.map((step, index) => (
            <motion.div
              key={step.id}
              className={`process-step ${activeStep === index ? 'active' : ''} ${hoveredStep === index ? 'hovered' : ''}`}
              variants={stepVariants}
              onHoverStart={() => handleStepHover(index)}
              onHoverEnd={handleStepLeave}
              onClick={() => handleStepClick(index)}
              whileHover={{ 
                y: -8,
                scale: 1.02
              }}
              role="listitem"
              aria-current={activeStep === index ? 'step' : undefined}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleStepClick(index);
                }
              }}
            >
              {/* Step Indicator */}
              <div className="step-indicator">
                <motion.div
                  className="step-number-container"
                  variants={numberVariants}
                >
                  <span className="step-number">{step.step}</span>
                  <motion.div
                    className="step-glow"
                    animate={{ 
                      scale: activeStep === index ? [1, 1.2, 1] : 1,
                      opacity: activeStep === index ? [0.5, 0.8, 0.5] : 0
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: activeStep === index ? Infinity : 0 
                    }}
                    aria-hidden="true"
                  />
                </motion.div>

                <motion.div
                  className="step-icon"
                  variants={iconVariants}
                  whileHover="hover"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)`
                  }}
                  aria-hidden="true"
                >
                  <span>{step.icon}</span>
                  
                  {/* Icon Pulse Effect */}
                  <motion.div
                    className="icon-pulse"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    aria-hidden="true"
                  />
                </motion.div>

                {/* Animated Connector */}
                {index < memoizedProcessData.length - 1 && (
                  <motion.div
                    className="step-connector"
                    variants={connectorVariants}
                    aria-hidden="true"
                  >
                    <motion.div
                      className="connector-progress"
                      animate={{ 
                        scaleY: activeStep > index ? 1 : 0 
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{ background: `linear-gradient(to bottom, ${step.color}, ${memoizedProcessData[index + 1].color})` }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Step Content */}
              <motion.div 
                className="step-content"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
                
                <motion.div
                  className="step-details"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={`Key activities for ${step.title}`}
                >
                  <h4>📋 Key Activities:</h4>
                  <ul role="list">
                    {step.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.9 + index * 0.1 + idx * 0.1 
                        }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          x: 5,
                          color: step.color
                        }}
                        role="listitem"
                      >
                        <motion.span 
                          className="detail-check"
                          style={{ background: step.color }}
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                          aria-hidden="true"
                        >
                          ✓
                        </motion.span>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Step Duration */}
                <motion.div
                  className="step-duration"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={`Typical duration for ${step.title}: ${step.duration}`}
                >
                  <span className="duration-label">⏱️ Typical Duration:</span>
                  <span className="duration-value">{step.duration}</span>
                </motion.div>
              </motion.div>

              {/* Step Background Effect */}
              <div 
                className="step-background"
                style={{
                  background: `linear-gradient(135deg, ${step.color}10, ${step.color}05)`
                }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Statistics */}
        <motion.div
          className="process-stats"
          variants={statsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          role="region"
          aria-label="Company statistics and achievements"
        >
          <motion.div
            className="stats-background"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            aria-hidden="true"
          />

          {memoizedStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + stat.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              role="group"
              aria-label={`${stat.target}${stat.suffix} ${stat.label}`}
            >
              <div className="stat-number">
                <Counter 
                  target={stat.target} 
                  suffix={stat.suffix}
                  duration={2500}
                />
              </div>
              <div className="stat-label">{stat.label}</div>
              
              {/* Stat Progress Bar */}
              <motion.div
                className="stat-progress"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 + stat.delay, ease: "easeOut" }}
                viewport={{ once: true }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Process CTA */}
        <motion.div
          className="process-cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Ready to Start Your Project?</h3>
            <p>Let's follow our proven process to bring your vision to life with precision and excellence.</p>
            
            <motion.div
              className="cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(10, 36, 99, 0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                aria-label="Start your construction project with our proven process"
              >
                Start Your Project
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
              </motion.a>

              <motion.button
                className="btn btn-secondary"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "var(--accent-color)" 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Simulate PDF download
                  console.log('Downloading process PDF...');
                  // In a real app, this would trigger a download
                }}
                aria-label="Download our construction process PDF guide"
              >
                Download Process PDF
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;