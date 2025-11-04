import React, { useMemo, useState, useCallback, useEffect } from "react";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";
import "./Projects.css";

// -------------------------
// Config & helpers
// -------------------------
const EASE = [0.22, 1, 0.36, 1];
const FLOATING_DOTS_COUNT = 8;

const categoryColor = {
  commercial: "#0A2463",
  residential: "#FF6B35",
  industrial: "#4CAF50",
  renovation: "#8B5CF6",
  default: "#64748B",
};

// -------------------------
// Data (add description/client/location to show in modal)
// -------------------------
const projectsData = [
  {
    id: 1,
    title: "Kigali Corporate Tower",
    category: "commercial",
    status: "completed",
    year: "2023",
    image: "/images/projects/construction-3.jpg",
    client: "Eka Holdings",
    location: "Kigali, Rwanda",
    area: "42,000 m²",
    description:
      "Premium Grade-A office tower featuring high-efficiency MEP systems, low-E curtain walls, and flexible floorplates for enterprise tenants.",
  },
  {
    id: 2,
    title: "Lakeside Luxury Residences",
    category: "residential",
    status: "completed",
    year: "2022",
    image: "/images/projects/construction-3.jpg",
    client: "BlueLake Developments",
    location: "Kampala, Uganda",
    area: "18,500 m²",
    description:
      "Modern family-centric apartments with cross-ventilation, acoustic glazing, and shared amenities including pool, gym, and community lounges.",
  },
  {
    id: 3,
    title: "Industrial Innovation Park",
    category: "industrial",
    status: "in-progress",
    year: "2024",
    image: "/images/projects/construction-3.jpg",
    client: "EastTech Logistics",
    location: "Addis Ababa, Ethiopia",
    area: "96,000 m²",
    description:
      "High-bay warehouses, modular production units, and smart logistics hubs designed for rapid scaling and efficient material flow.",
  },
  {
    id: 4,
    title: "Heritage Building Restoration",
    category: "renovation",
    status: "completed",
    year: "2021",
    image: "/images/projects/construction-2.jpg",
    client: "City Council",
    location: "Mombasa, Kenya",
    area: "7,800 m²",
    description:
      "Sensitive restoration preserving historic facades while upgrading structure, services, and accessibility to modern standards.",
  },
  {
    id: 5,
    title: "Eco-Friendly Mixed-Use Complex",
    category: "commercial",
    status: "in-progress",
    year: "2024",
    image: "/images/projects/construction-2.jpg",
    client: "GreenCore",
    location: "Nairobi, Kenya",
    area: "58,000 m²",
    description:
      "Retail podium, offices, and co-living units with solar integration, grey-water systems, and biophilic terraces.",
  },
  {
    id: 6,
    title: "Modern Family Compound",
    category: "residential",
    status: "completed",
    year: "2023",
    image: "/images/projects/construction-2.jpg",
    client: "Private",
    location: "Arusha, Tanzania",
    area: "3,400 m²",
    description:
      "Contemporary villas with passive cooling, shaded courtyards, and thoughtfully crafted interiors for multi-generational living.",
  },
];

// -------------------------
// Modal Component
// -------------------------
const ProjectModal = ({
  project,
  onClose,
}) => {
  const color = categoryColor[project?.category] || categoryColor.default;

  useEffect(() => {
    // Disable scroll when modal is open
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-panel"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { ease: EASE, duration: 0.4 } }}
            exit={{ y: 20, opacity: 0, transition: { ease: EASE, duration: 0.25 } }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close project details"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="modal-body">
              <motion.div className="modal-media">
                {/* Shared layoutId for smooth expansion from thumbnail */}
                <motion.img
                  layoutId={`project-img-${project.id}`}
                  src={project.image}
                  alt={project.title}
                  className="modal-img"
                />
              </motion.div>

              <div className="modal-details">
                <h3 className="modal-title">{project.title}</h3>

                <div className="modal-meta">
                  <span className="meta-pill" style={{ color, borderColor: color }}>
                    {project.category}
                  </span>
                  <span className={`meta-pill status ${project.status}`}>
                    {project.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                  <span className="meta-pill neutral">{project.year}</span>
                </div>

                <p className="modal-desc">{project.description}</p>

                <div className="modal-specs">
                  <div>
                    <span className="spec-label">Client</span>
                    <span className="spec-value">{project.client}</span>
                  </div>
                  <div>
                    <span className="spec-label">Location</span>
                    <span className="spec-value">{project.location}</span>
                  </div>
                  <div>
                    <span className="spec-label">Built Area</span>
                    <span className="spec-value">{project.area}</span>
                  </div>
                </div>

                <div className="modal-actions">
                  <a
                    href="#contact"
                    className="btn btn-primary"
                    aria-label="Start your project"
                    onClick={onClose}
                  >
                    Start Your Project
                    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 0L8.59 1.41L14.17 7H0V9H14.17L8.59 14.59L10 16L20 8L10 0Z" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// -------------------------
// Main Component
// -------------------------
const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selected, setSelected] = useState(null);

  const floatingDots = useMemo(
    () =>
      [...Array(FLOATING_DOTS_COUNT)].map((_, i) => ({
        id: i,
        left: `${8 + i * 12}%`,
        duration: 4 + i * 0.4,
        delay: i * 0.25,
      })),
    []
  );

  const openProject = useCallback((project) => setSelected(project), []);
  const closeProject = useCallback(() => setSelected(null), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const cardHover = {
    rest: { y: 0, scale: 1 },
    hover: { y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <MotionConfig transition={{ duration: 0.5, ease: EASE }}>
      <section id="projects" className="projects section-padding" aria-labelledby="projects-heading">
        {/* Background: architectural grid + diagonal light beams + parallax dots */}
        <div className="projects-background" aria-hidden="true">
          <div className="bg-architectural" />
          <div className="bg-beams" />
          <div className="floating-dots">
            {floatingDots.map((dot) => (
              <motion.span
                key={dot.id}
                className="floating-dot"
                style={{ left: dot.left }}
                animate={{ y: [0, -30, 0], opacity: [0.15, 0.4, 0.15], scale: [1, 1.06, 1] }}
                transition={{ duration: dot.duration, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
              />
            ))}
          </div>
        </div>

        <div className="container">
          {/* Header */}
          <motion.div
            className="projects-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="section-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="badge-dot" />
              Our Work
            </motion.div>

            <motion.h2
              id="projects-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true }}
            >
              Projects
            </motion.h2>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            role="list"
            aria-label="Projects portfolio"
          >
            <div className="masonry-grid">
              {projectsData.map((project, index) => {
                const color = categoryColor[project.category] || categoryColor.default;
                return (
                  <motion.article
                    key={project.id}
                    className="project-card"
                    variants={itemVariants}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    role="listitem"
                    aria-label={`Project: ${project.title}`}
                    onClick={() => openProject(project)}
                  >
                    <motion.div
                      className="card-border"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ background: color }}
                    />

                    <motion.div className="project-media" variants={cardHover}>
                      <motion.div className="image-container" whileHover={{ scale: 1.0 }}>
                        {/* Shared layoutId enables smooth image expansion into modal */}
                        <motion.img
                          layoutId={`project-img-${project.id}`}
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="project-img"
                        />

                        <div className="media-gradient" />

                        <motion.div
                          className={`project-status ${project.status}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, delay: 0.1 + index * 0.06 }}
                          viewport={{ once: true }}
                        >
                          {project.status === "completed" ? "✓ Completed" : "🔄 In Progress"}
                        </motion.div>

                        <motion.div className="project-overlay" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                          <motion.div className="overlay-content" initial={{ y: 12, opacity: 0 }} whileHover={{ y: 0, opacity: 1 }}>
                            <motion.button
                              className="view-project-btn"
                              style={{ background: color }}
                              onClick={(e) => {
                                e.stopPropagation();
                                openProject(project);
                              }}
                              whileTap={{ scale: 0.98 }}
                              whileHover={{ scale: 1.04 }}
                              aria-label={`View ${project.title}`}
                            >
                              View Project
                              <motion.svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor" />
                              </motion.svg>
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    <div className="project-content">
                      <div className="project-header">
                        <h3>{project.title}</h3>
                        <motion.span
                          className="project-year"
                          style={{ color }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, delay: 0.15 + index * 0.06 }}
                          viewport={{ once: true }}
                        >
                          {project.year}
                        </motion.span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="projects-bottom-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="cta-background">
              <div className="cta-pattern" />
            </div>
            <motion.div className="cta-content" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
              <motion.h3 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.55 }} viewport={{ once: true }}>
                Start Your Project
              </motion.h3>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.65 }} viewport={{ once: true }}>
                Let’s build something exceptional together.
              </motion.p>
              <motion.div className="cta-buttons" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.75 }} viewport={{ once: true }}>
                <a href="#contact" className="btn btn-primary" aria-label="Start your construction project">
                  Get Started
                  <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 0L8.59 1.41L14.17 7H0V9H14.17L8.59 14.59L10 16L20 8L10 0Z" fill="currentColor" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Modal */}
        <ProjectModal project={selected} onClose={closeProject} />
      </section>
    </MotionConfig>
  );
};

export default Projects;
