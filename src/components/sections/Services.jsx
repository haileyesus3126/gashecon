import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Services.css';


// Data included directly in the component to avoid import issues
const servicesData = [
  {
    id: 1,
    title: "Commercial Construction",
    description: "State-of-the-art commercial spaces designed for functionality, sustainability, and business success with innovative architectural solutions.",
    icon: "🏢",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
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
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #047857 100%)",
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
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
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

  return (
    <section id="services" className="services section-padding">
      {/* Background Elements */}
      <div className="services-background">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-shape"
              style={{
                left: `${20 + (i * 15)}%`,
                background: `linear-gradient(135deg, var(--accent-color)${10 + i * 5}%, transparent)`
              }}
              animate={{
                y: [0, -30, 0],
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
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(service.id)}
              onHoverEnd={() => setHoveredCard(null)}
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
                      <span className="feature-check">✓</span>
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
                  <motion.button
                    className="cta-button"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Learn More
                    <motion.svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path 
                        d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" 
                        fill="currentColor"
                      />
                    </motion.svg>
                  </motion.button>
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
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            START YOUR PROJECT TODAY →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;