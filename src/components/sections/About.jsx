import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import './About.css';

// Enhanced Counter Component with better performance and Gashecon styling
const Counter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
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

    // Start animation when component is in viewport
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    }, { threshold: 0.1 });

    const counterElement = document.querySelector('.stat-number-turner');
    if (counterElement) {
      observer.observe(counterElement);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span className="stat-number-turner" aria-live="polite">
      {count}{suffix}
    </span>
  );
};

// Enhanced about data with Gashecon branding
const aboutData = {
  company: {
    founded: "2009",
    description: "Gashecon Construction has been at the forefront of Rwanda's construction industry for over a decade, delivering exceptional projects that shape skylines and communities. Our commitment to quality, innovation, and client satisfaction has made us a trusted partner for both private and public sector projects."
  },
  stats: [
    { value: "450", label: "Projects Completed", suffix: "+" },
    { value: "15", label: "Years Experience", suffix: "+" },
    { value: "98", label: "Client Satisfaction", suffix: "%" },
    { value: "50", label: "Expert Team Members", suffix: "+" }
  ],
  values: [
    {
      icon: "🏗️",
      title: "Quality Craftsmanship",
      description: "We never compromise on quality. Every project reflects our commitment to excellence and attention to detail."
    },
    {
      icon: "🤝",
      title: "Client Partnership",
      description: "We build lasting relationships through transparent communication, trust, and collaborative problem-solving."
    },
    {
      icon: "🌱",
      title: "Sustainable Innovation",
      description: "We integrate eco-friendly practices and cutting-edge technology to create sustainable, future-proof structures."
    },
    {
      icon: "⏱️",
      title: "Timely Delivery",
      description: "Our rigorous project management ensures we deliver on time and within budget, every time."
    },
    {
      icon: "🛡️",
      title: "Safety First",
      description: "The wellbeing of our team and stakeholders is our top priority in every project we undertake."
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "We strive for excellence in every aspect of our work, from initial concept to final completion."
    }
  ],
  leadership: [
    {
      name: "Jean Gashema",
      position: "Founder & CEO",
      bio: "With over 20 years in construction management, Jean founded Gashecon with a vision to transform Rwanda's construction landscape through innovation and integrity.",
      expertise: ["Strategic Planning", "Project Finance", "Stakeholder Management", "Business Development"]
    },
    {
      name: "Marie Uwase",
      position: "Chief Operations Officer",
      bio: "Marie brings 15 years of operational excellence, ensuring our projects run smoothly from conception to completion with maximum efficiency.",
      expertise: ["Operations Management", "Quality Control", "Process Optimization", "Team Leadership"]
    },
    {
      name: "David Nkusi",
      position: "Head of Projects",
      bio: "David oversees all construction projects with meticulous attention to detail and a passion for delivering beyond client expectations.",
      expertise: ["Project Management", "Construction Methodology", "Risk Assessment", "Client Relations"]
    }
  ],
  certifications: [
    { name: "ISO 9001:2015 Certified", organization: "International Organization for Standardization" },
    { name: "LEED Accredited Professional", organization: "Green Building Certification Institute" },
    { name: "Rwanda Construction Board Certified", organization: "Rwanda Development Board" },
    { name: "Occupational Health & Safety Certified", organization: "Rwanda Standards Board" },
    { name: "Excellence in Construction Award 2023", organization: "Rwanda Construction Association" },
    { name: "Sustainable Builder Certification", organization: "East African Builders Council" }
  ]
};

const About = () => {
  // Enhanced animation variants with construction theme
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
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const slideInLeft = {
    hidden: { 
      opacity: 0, 
      x: -60,
      rotate: -2 
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInRight = {
    hidden: { 
      opacity: 0, 
      x: 60,
      rotate: 2 
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  // Enhanced handlers with smooth scrolling
  const scrollToContact = useCallback((e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const scrollToProjects = useCallback((e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Memoized data for performance
  const memoizedStats = useMemo(() => aboutData.stats, []);
  const memoizedValues = useMemo(() => aboutData.values, []);
  const memoizedLeadership = useMemo(() => aboutData.leadership, []);
  const memoizedCertifications = useMemo(() => aboutData.certifications, []);

  return (
    <section 
      id="about" 
      className="about"
      aria-labelledby="about-heading"
    >
      {/* Enhanced Hero Section */}
      <div className="about-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              viewport={{ once: true }}
            >
              <span className="badge-dot"></span>
              Building Excellence Since {aboutData.company.founded}
            </motion.div>
            
            <motion.h1
              id="about-heading"
              className="hero-title"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Building Rwanda's Future,
              <motion.span 
                className="title-highlight"
                initial={{ opacity: 0, scale: 0.9, backgroundPosition: '0% 50%' }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  backgroundPosition: '100% 50%' 
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.5,
                  backgroundPosition: { duration: 2, ease: "easeInOut" }
                }}
                viewport={{ once: true }}
              >
                With Precision & Pride
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {aboutData.company.description}
            </motion.p>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            role="region"
            aria-label="Company achievements and statistics"
          >
            {memoizedStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-item"
                variants={itemVariants}
                custom={index}
                whileHover={{ 
                  scale: 1.08,
                  y: -8,
                  transition: { duration: 0.3, type: "spring", stiffness: 400 }
                }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="stat-number">
                  <Counter 
                    target={parseInt(stat.value)} 
                    suffix={stat.suffix} 
                    duration={2500} 
                  />
                </div>
                <motion.div 
                  className="stat-label"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.label}
                </motion.div>
                <div className="stat-underline"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Our Story Section */}
      <div className="about-content">
        <div className="container">
          <motion.section
            className="content-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            aria-labelledby="our-story-heading"
          >
            <div className="section-header">
              <motion.h2
                id="our-story-heading"
                className="section-title"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Our Construction Legacy
              </motion.h2>
              <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Building Rwanda's skyline, one project at a time
              </motion.p>
            </div>

            <div className="two-column">
              <motion.div
                className="column-content"
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Building a Legacy of Excellence
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Founded in {aboutData.company.founded}, Gashecon Construction began as a small 
                  local contractor with big ambitions. Today, we're a premier construction firm 
                  known for delivering complex projects with precision and innovation.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Our growth has been guided by a simple principle: do what's right for the client, 
                  the project, and the community. This commitment has earned us the trust of 
                  clients across multiple sectors and regions.
                </motion.p>
                <motion.div
                  className="achievement-highlights"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { year: "2012", milestone: "First major commercial project" },
                    { year: "2018", milestone: "Expanded to industrial construction" },
                    { year: "2023", milestone: "Awarded Excellence in Construction" }
                  ].map((achievement, index) => (
                    <motion.div
                      key={achievement.year}
                      className="achievement"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <strong>{achievement.year}</strong>
                      <span>{achievement.milestone}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              
              <motion.div
                className="column-content"
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.h3
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Our Construction Approach
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  We combine traditional craftsmanship with cutting-edge technology to deliver 
                  projects that are not only beautiful and functional but also sustainable and 
                  efficient.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Our integrated approach ensures seamless collaboration between all stakeholders, 
                  from initial concept through final completion, guaranteeing projects that exceed 
                  expectations in quality, timeline, and budget.
                </motion.p>
                <motion.div
                  className="approach-features"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: "🔍", text: "Detailed Planning & Analysis" },
                    { icon: "🤝", text: "Collaborative Client Partnerships" },
                    { icon: "⚡", text: "Advanced Construction Technology" },
                    { icon: "🌿", text: "Sustainable Building Practices" }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      className="feature"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <motion.span 
                        className="feature-icon"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >
                        {feature.icon}
                      </motion.span>
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Enhanced Values Section */}
          <motion.section
            className="content-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            aria-labelledby="our-values-heading"
          >
            <div className="section-header">
              <motion.h2
                id="our-values-heading"
                className="section-title"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Our Construction Values
              </motion.h2>
              <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                The foundation of every structure we build
              </motion.p>
            </div>

            <motion.div
              className="values-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              role="list"
              aria-label="Our company values"
            >
              {memoizedValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="value-item"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.3, type: "spring" }
                  }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  role="listitem"
                >
                  <motion.div 
                    className="value-icon"
                    whileHover={{ 
                      scale: 1.3,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.4 }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                  <div className="value-underline"></div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Enhanced Leadership Section */}
          <motion.section
            className="content-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            aria-labelledby="leadership-heading"
          >
            <div className="section-header">
              <motion.h2
                id="leadership-heading"
                className="section-title"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Leadership Team
              </motion.h2>
              <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Experienced professionals building Rwanda's future
              </motion.p>
            </div>

            <motion.div
              className="leadership-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              role="list"
              aria-label="Our leadership team"
            >
              {memoizedLeadership.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  className="leader-card"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.03,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  role="listitem"
                >
                  <div className="leader-image">
                    <motion.div 
                      className="leader-image-placeholder"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="icon">👤</div>
                      <div className="placeholder-text">Leader Photo</div>
                    </motion.div>
                    <motion.div 
                      className="leader-overlay"
                      whileHover={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                    >
                      <span className="overlay-text">View Profile</span>
                    </motion.div>
                  </div>
                  <div className="leader-info">
                    <h3 className="leader-name">{leader.name}</h3>
                    <p className="leader-position">{leader.position}</p>
                    <p className="leader-bio">{leader.bio}</p>
                    <div className="expertise-tags">
                      {leader.expertise.map((exp, expIndex) => (
                        <motion.span 
                          key={expIndex} 
                          className="expertise-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3, delay: expIndex * 0.1 }}
                        >
                          {exp}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Enhanced Certifications Section */}
          <motion.section
            className="content-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            aria-labelledby="certifications-heading"
          >
            <div className="section-header">
              <motion.h2
                id="certifications-heading"
                className="section-title"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Certifications & Awards
              </motion.h2>
              <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Recognized for excellence in construction and safety standards
              </motion.p>
            </div>

            <motion.div
              className="certifications-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              role="list"
              aria-label="Our certifications and awards"
            >
              {memoizedCertifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  className="cert-item"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  role="listitem"
                >
                  <motion.div 
                    className="cert-badge"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <span className="badge-icon">🏆</span>
                  </motion.div>
                  <div className="cert-info">
                    <div className="cert-name">{cert.name}</div>
                    <div className="cert-org">{cert.organization}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="about-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 
              className="cta-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Build Together?
            </motion.h2>
            <motion.p 
              className="cta-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Let's discuss how our experience and expertise can bring your vision to life.
            </motion.p>
            <motion.div 
              className="cta-buttons"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.button
                className="btn btn-primary"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(230, 163, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                aria-label="Start your construction project with us"
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                aria-label="View our completed construction projects"
              >
                View Our Work
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;