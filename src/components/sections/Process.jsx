import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { processData } from '../../data/processData';
import './Process.css';

const Process = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // Auto-rotate through steps
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView]);

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

  // Animated counter component
  const Counter = ({ target, suffix = "", duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.5 });

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [isInView, target, duration]);

    return (
      <span ref={ref} className="stat-number">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section id="process" className="process section-padding" ref={sectionRef}>
      {/* Background Elements */}
      <div className="process-background">
        <div className="floating-elements">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element"
              style={{
                left: `${15 + (i * 10)}%`,
                background: `linear-gradient(135deg, var(--accent-color)${10 + i * 5}%, transparent)`
              }}
              animate={{
                y: [0, -50, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6 + i * 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
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
        >
          {processData.map((step, index) => (
            <motion.div
              key={step.id}
              className={`process-step ${activeStep === index ? 'active' : ''} ${hoveredStep === index ? 'hovered' : ''}`}
              variants={stepVariants}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
              onClick={() => setActiveStep(index)}
              whileHover={{ 
                y: -8,
                scale: 1.02
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
                  />
                </motion.div>

                <motion.div
                  className="step-icon"
                  variants={iconVariants}
                  whileHover="hover"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)`
                  }}
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
                  />
                </motion.div>

                {/* Animated Connector */}
                {index < processData.length - 1 && (
                  <motion.div
                    className="step-connector"
                    variants={connectorVariants}
                  >
                    <motion.div
                      className="connector-progress"
                      animate={{ 
                        scaleY: activeStep > index ? 1 : 0 
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{ background: `linear-gradient(to bottom, ${step.color}, ${processData[index + 1].color})` }}
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
                >
                  <h4>📋 Key Activities:</h4>
                  <ul>
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
                      >
                        <motion.span 
                          className="detail-check"
                          style={{ background: step.color }}
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
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
        >
          <motion.div
            className="stats-background"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          />

          {[
            { target: 150, suffix: "+", label: "Projects Completed", delay: 0.1 },
            { target: 98, suffix: "%", label: "Client Satisfaction", delay: 0.2 },
            { target: 15, suffix: "+", label: "Years Experience", delay: 0.3 },
            { target: 50, suffix: "+", label: "Awards Won", delay: 0.4 }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + stat.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
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
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
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
              </motion.a>

              <motion.a
                href="#contact"
                className="btn btn-secondary"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "var(--accent-color)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Download Process PDF
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;