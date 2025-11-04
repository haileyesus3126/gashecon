import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Services.css';

// Constants for better maintainability
const FLOATING_SHAPES_COUNT = 6;

// Data included directly in the component to avoid import issues
const servicesData = [
  {
    id: 1,
    title: "Commercial Construction",
    description: "State-of-the-art commercial spaces designed for functionality, sustainability, and business success with innovative architectural solutions.",
    icon: "🏢",
    color: "#0A2463", // Using your brand color
    gradient: "linear-gradient(135deg, #0A2463 0%, #1E40AF 100%)",
    features: [
      "Office Buildings & Corporate Campuses",
      "Retail & Shopping Centers",
      "Hospitality & Entertainment Venues",
      "Mixed-Use Developments",
      "LEED Certification Consulting"
    ],
    stats: { 
      projects: 150, 
      satisfaction: 98, 
      years: 15 
    }
  },
  {
    id: 2,
    title: "Residential Development",
    description: "Luxury residential properties combining modern design with timeless craftsmanship for exceptional living experiences.",
    icon: "🏡",
    color: "#FF6B35", // Using your brand color
    gradient: "linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)",
    features: [
      "Custom Luxury Homes",
      "Multi-Family Apartments",
      "Townhome Communities",
      "Sustainable Housing",
      "Smart Home Integration"
    ],
    stats: { 
      projects: 280, 
      satisfaction: 99, 
      years: 12 
    }
  },
  {
    id: 3,
    title: "Industrial Facilities",
    description: "Robust industrial structures engineered for efficiency, safety, and scalability in manufacturing and logistics.",
    icon: "🏭",
    color: "#4CAF50", // Using your brand color
    gradient: "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)",
    features: [
      "Manufacturing Plants",
      "Warehouses & Distribution",
      "Industrial Parks",
      "Process Optimization",
      "Safety Compliance"
    ],
    stats: { 
      projects: 85, 
      satisfaction: 97, 
      years: 18 
    }
  },
  {
    id: 4,
    title: "Renovation & Restoration",
    description: "Breathing new life into existing structures while preserving historical integrity and enhancing functionality.",
    icon: "🔨",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    features: [
      "Historical Preservation",
      "Structural Upgrades",
      "Modernization Projects",
      "Facade Restoration",
      "Interior Transformation"
    ],
    stats: { 
      projects: 120, 
      satisfaction: 96, 
      years: 20 
    }
  },
  {
    id: 5,
    title: "Sustainable Construction",
    description: "Eco-friendly building solutions that reduce environmental impact while maximizing energy efficiency and comfort.",
    icon: "🌿",
    color: "#06D6A0",
    gradient: "linear-gradient(135deg, #06D6A0 0%, #05A183 100%)",
    features: [
      "Green Building Certification",
      "Energy-Efficient Systems",
      "Solar Integration",
      "Water Conservation",
      "Sustainable Materials"
    ],
    stats: { 
      projects: 95, 
      satisfaction: 98, 
      years: 8 
    }
  },
  {
    id: 6,
    title: "Project Management",
    description: "Comprehensive project oversight ensuring timely delivery, budget adherence, and quality excellence from concept to completion.",
    icon: "📊",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
    features: [
      "Budget & Timeline Management",
      "Quality Control Systems",
      "Stakeholder Coordination",
      "Risk Mitigation",
      "Progress Reporting"
    ],
    stats: { 
      projects: 400, 
      satisfaction: 99, 
      years: 25 
    }
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
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
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180,
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400
      }
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
    tap: { scale: 0.98 }
  };

  // Memoized floating shapes
  const floatingShapes = useMemo(() => 
    [...Array(FLOATING_SHAPES_COUNT)].map((_, i) => ({
      id: i,
      left: `${20 + (i * 15)}%`,
      background: `linear-gradient(135deg, var(--accent-color)${10 + i * 5}%, transparent)`,
      duration: 8 + i * 2,
      delay: i * 0.5
    }))
  , []);

  // Handlers
  const handleCardHover = useCallback((serviceId) => {
    setHoveredCard(serviceId);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const handleLearnMore = useCallback((service) => {
    // You can implement modal or navigation logic here
    console.log('Learn more about:', service.title);
    // For now, just set as active
    setActiveService(service.id === activeService ? null : service.id);
  }, [activeService]);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <section 
      id="services" 
      className="services section-padding"
      aria-labelledby="services-heading"
    >
      {/* Background Elements */}
      <div className="services-background" aria-hidden="true">
        <div className="floating-shapes">
          {floatingShapes.map((shape) => (
            <motion.div
              key={shape.id}
              className="floating-shape"
              style={{
                left: shape.left,
                background: shape.background
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
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
      </div>

      <div className="container">
        {/* Enhanced Section Header */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 60 }}
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
            Our Services
          </motion.div>

          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Building Excellence,
            <motion.span 
              className="title-highlight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Delivering Innovation
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="services-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Comprehensive construction solutions backed by decades of expertise, 
            cutting-edge technology, and unwavering commitment to quality.
          </motion.p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          role="list"
          aria-label="Our construction services"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className={`service-card ${activeService === service.id ? 'active' : ''} ${hoveredCard === service.id ? 'hovered' : ''}`}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => handleCardHover(service.id)}
              onHoverEnd={handleCardLeave}
              onClick={() => handleLearnMore(service)}
              role="listitem"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleLearnMore(service);
                }
              }}
              aria-expanded={activeService === service.id}
              aria-label={`Learn more about ${service.title}`}
            >
              {/* Card Background Effect */}
              <div 
                className="card-background"
                style={{
                  background: `linear-gradient(135deg, ${service.color}15, ${service.color}08)`
                }}
              />
              
              {/* Service Icon */}
              <motion.div
                className="service-icon"
                variants={iconVariants}
                whileHover="hover"
                style={{ 
                  background: service.gradient,
                  borderColor: service.color
                }}
                aria-hidden="true"
              >
                <motion.span
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {service.icon}
                </motion.span>
              </motion.div>

              {/* Service Content */}
              <div className="service-content">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>

                {/* Features List */}
                <motion.ul 
                  className="service-features"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={`Features of ${service.title}`}
                >
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.7 + index * 0.1 + featureIndex * 0.1 
                      }}
                      viewport={{ once: true }}
                    >
                      <span className="feature-check" aria-hidden="true">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>

                

                {/* CTA Button */}
                <motion.div
                  className="service-cta"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                 
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="services-bottom-cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p>Ready to Bring Your Vision to Life?</p>
          <motion.a
            href="#contact"
            className="btn btn-primary"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(10, 36, 99, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            aria-label="Start your construction project today"
          >
            START YOUR PROJECT TODAY →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;