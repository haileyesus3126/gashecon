import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '../../data/aboutData';
import './About.css';

// Counter Component
const Counter = ({ target, suffix, duration = 2000 }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
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
  }, [target, duration]);

  return (
    <span className="stat-number-turner">
      {count}{suffix}
    </span>
  );
};

const AboutTurner = () => {
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

  return (
    <section id="about" className="about-turner">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Since {aboutData.company.founded}
            </motion.div>
            
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Building with Purpose, Delivering with Pride
            </motion.h1>
            
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {aboutData.company.description}
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="stats-grid-turner"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {aboutData.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item-turner"
                variants={itemVariants}
              >
                <div className="stat-number-turner">
                  {stat.value}
                </div>
                <div className="stat-label-turner">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="about-content-turner">
        <div className="container">
          <motion.section
            className="content-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="section-header">
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Story
              </motion.h2>
              <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                From humble beginnings to industry leadership
              </motion.p>
            </div>

            <div className="two-column">
              <motion.div
                className="column-content"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3>Building a Legacy of Excellence</h3>
                <p>
                  Founded in {aboutData.company.founded}, Gashecon Construction began as a small 
                  local contractor with big ambitions. Today, we're a premier construction firm 
                  known for delivering complex projects with precision and innovation.
                </p>
                <p>
                  Our growth has been guided by a simple principle: do what's right for the client, 
                  the project, and the community. This commitment has earned us the trust of 
                  clients across multiple sectors and regions.
                </p>
              </motion.div>
              
              <motion.div
                className="column-content"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3>Our Approach</h3>
                <p>
                  We combine traditional craftsmanship with cutting-edge technology to deliver 
                  projects that are not only beautiful and functional but also sustainable and 
                  efficient.
                </p>
                <p>
                  Our integrated approach ensures seamless collaboration between all stakeholders, 
                  from initial concept through final completion, guaranteeing projects that exceed 
                  expectations in quality, timeline, and budget.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section
            className="content-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="section-header">
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Values
              </motion.h2>
            </div>

            <motion.div
              className="values-grid-turner"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {aboutData.values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-item-turner"
                  variants={itemVariants}
                >
                  <div className="value-icon-turner">{value.icon}</div>
                  <h3 className="value-title-turner">{value.title}</h3>
                  <p className="value-description-turner">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Leadership Section */}
          <motion.section
            className="content-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="section-header">
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Leadership Team
              </motion.h2>
              <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Experienced professionals guiding our success
              </motion.p>
            </div>

            <motion.div
              className="leadership-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {aboutData.leadership.map((leader, index) => (
                <motion.div
                  key={index}
                  className="leader-card"
                  variants={itemVariants}
                >
                  <div className="leader-image">
                    <div className="leader-image-placeholder">
                      <div className="icon">👤</div>
                      <div>Leader Photo</div>
                    </div>
                  </div>
                  <div className="leader-info">
                    <h3 className="leader-name">{leader.name}</h3>
                    <p className="leader-position">{leader.position}</p>
                    <p className="leader-bio">{leader.bio}</p>
                    <div className="expertise-tags">
                      {leader.expertise.map((exp, expIndex) => (
                        <span key={expIndex} className="expertise-tag">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section
            className="content-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="section-header">
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Certifications & Awards
              </motion.h2>
            </div>

            <motion.div
              className="certifications-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {aboutData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="cert-item-turner"
                  variants={itemVariants}
                >
                  <div className="cert-name">{cert.name}</div>
                  <div className="cert-org">{cert.organization}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* CTA Section */}
      <div className="about-cta-turner">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Ready to Build Together?</h2>
            <p className="cta-description">
              Let's discuss how our experience and expertise can bring your vision to life.
            </p>
            <div className="cta-buttons">
              <motion.a
                href="#contact"
                className="btn-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="#projects"
                className="btn-outline-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTurner;