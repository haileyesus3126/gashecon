import React, { useMemo, useState } from "react";
import { MotionConfig, motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projectsData } from "../../data/projectsData";
import "./Projects.css";

const EASE = [0.22, 1, 0.36, 1];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = useMemo(() => projectsData, []);

  const getCategoryColor = (category) => {
    const colors = {
      commercial: "#3B82F6",
      residential: "#10B981",
      industrial: "#F59E0B",
      renovation: "#8B5CF6",
      default: "#EF4444",
    };
    return colors[category] || colors.default;
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: EASE },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const cardHover = {
    rest: { 
      y: 0,
      scale: 1,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
    },
    hover: { 
      y: -12,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const imageHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.08,
      transition: { duration: 0.8, ease: "easeOut" }
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
    <MotionConfig transition={{ duration: 0.6, ease: EASE }}>
      <section id="projects" className="projects section-padding">
        {/* Background Elements */}
        <div className="projects-background">
          <div className="floating-dots">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-dot"
                style={{
                  left: `${10 + (i * 8)}%`,
                  background: `linear-gradient(135deg, var(--accent-color), var(--orange))`
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>

        <div className="container">
          {/* Enhanced Header */}
          <motion.div
            className="projects-header"
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
              Our Portfolio
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Portfolio of
              <motion.span 
                className="title-highlight"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Excellence
              </motion.span>
            </motion.h2>
            
            <motion.p
              className="projects-subtitle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Explore landmark builds across commercial, residential, and industrial sectors—delivered
              with precision, safety, and craftsmanship.
            </motion.p>

            {/* Portfolio Stats */}
            <motion.div
              className="portfolio-stats"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="stat">
                <span className="stat-number">{projectsData.length}+</span>
                <span className="stat-label">Successful Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Grid */}
          <motion.div
            className="projects-grid"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} className="masonry-grid" variants={container}>
                {filtered.map((project, index) => {
                  const color = getCategoryColor(project.category);
                  return (
                    <motion.article
                      key={project.id}
                      className="project-card"
                      variants={item}
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      onHoverStart={() => setHoveredProject(project.id)}
                      onHoverEnd={() => setHoveredProject(null)}
                      custom={index}
                    >
                      {/* Card Background Effects */}
                      <div 
                        className="card-background"
                        style={{
                          background: `linear-gradient(135deg, ${color}08, ${color}03)`
                        }}
                      />
                      
                      <motion.div
                        className="card-border"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{ background: `linear-gradient(90deg, ${color}, var(--orange))` }}
                      />

                      {/* Enhanced Media Section */}
                      <motion.div
                        className="project-media"
                        style={{ "--accent": color }}
                        variants={cardHover}
                      >
                        <motion.div
                          className="image-container"
                          variants={imageHover}
                        >
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="project-img"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />

                          {/* Enhanced Overlay Effects */}
                          <div className="media-gradient" />
                          <motion.div 
                            className="media-sheen"
                            animate={{
                              x: hoveredProject === project.id ? "100%" : "-100%"
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          />

                          {/* Enhanced Category Chip */}
                          <motion.span 
                            className="category-chip"
                            style={{ color }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {project.category}
                          </motion.span>

                          {/* Enhanced Status Badge */}
                          <motion.div 
                            className={`project-status ${project.status}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {project.status === "completed" ? (
                              <>
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.5 }}
                                >
                                  ✓
                                </motion.span>
                                Completed
                              </>
                            ) : (
                              <>
                                <motion.span
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                  🔄
                                </motion.span>
                                In Progress
                              </>
                            )}
                          </motion.div>

                          {/* Enhanced Hover Overlay */}
                          <motion.div
                            className="project-overlay"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="overlay-content"
                              initial={{ opacity: 0, y: 20 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 }}
                            >
                              <motion.a
                                href={project.link || "#projects"}
                                className="view-project-btn"
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                style={{ 
                                  background: `linear-gradient(135deg, ${color}, var(--orange))`,
                                  boxShadow: `0 10px 30px ${color}40`
                                }}
                              >
                                View Project Details
                                <motion.svg 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 16 16"
                                  initial={{ x: 0 }}
                                  whileHover={{ x: 5 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <path 
                                    d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" 
                                    fill="currentColor" 
                                  />
                                </motion.svg>
                              </motion.a>

                              <motion.button
                                className="quick-view-btn"
                                onClick={() => setSelectedProject(project)}
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                              >
                                Quick View
                              </motion.button>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      {/* Enhanced Content Section */}
                      <div className="project-content">
                        <motion.div 
                          className="project-header"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <h3>{project.title}</h3>
                          <motion.span 
                            className="project-year"
                            style={{ color }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {project.year}
                          </motion.span>
                        </motion.div>

                        <motion.p 
                          className="project-description"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {project.description}
                        </motion.p>

                        {/* Enhanced Meta Information */}
                        <motion.div 
                          className="project-meta"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="meta-item">
                            <span className="meta-label">📍 Location</span>
                            <span className="meta-value">{project.location}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">📐 Size</span>
                            <span className="meta-value">{project.size}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">⏱️ Duration</span>
                            <span className="meta-value">{project.duration}</span>
                          </div>
                        </motion.div>

                        {/* Enhanced Features Grid */}
                        <motion.div 
                          className="project-features"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <h4>✨ Key Features</h4>
                          <div className="features-grid">
                            {project.features.slice(0, 3).map((feature, i) => (
                              <motion.span
                                className="feature-tag"
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 + i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                  scale: 1.05,
                                  y: -2
                                }}
                                style={{
                                  color,
                                  borderColor: color,
                                  backgroundColor: `${color}15`,
                                }}
                              >
                                {feature}
                              </motion.span>
                            ))}
                            {project.features.length > 3 && (
                              <motion.span 
                                className="feature-tag more-tag"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                              >
                                +{project.features.length - 3} more
                              </motion.span>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Bottom CTA */}
          <motion.div
            className="projects-bottom-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="cta-background">
              <div className="cta-pattern"></div>
            </div>
            
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                Ready to Build Something Exceptional?
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                viewport={{ once: true }}
              >
                Let's turn your vision into a durable, beautiful reality—on time and on budget.
              </motion.p>

              <motion.div
                className="cta-buttons"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="#contact"
                  className="btn btn-primary"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
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
                  href="#services"
                  className="btn btn-secondary"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  View Our Services
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Projects;