import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Team.css';

// Temporary data - add this inside your component file
const teamData = [
  {
    id: 1,
    name: "John Gashecon",
    position: "Founder & CEO",
    bio: "With over 25 years in the construction industry, John founded Gashecon with a vision to deliver exceptional quality and client service. His leadership drives our company's strategic direction and commitment to excellence.",
    expertise: ["Strategic Planning", "Business Development", "Project Oversight", "Client Relations"],
    social: {
      linkedin: "#",
      twitter: "#"
    },
    color: "#3B82F6",
    stats: {
      experience: "25+ years",
      projects: "450+",
      specialties: ["Commercial", "Residential"]
    }
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    position: "Chief Operations Officer",
    bio: "Sarah brings 15+ years of construction management experience, ensuring operational excellence across all projects. Her meticulous approach guarantees quality and efficiency in every phase.",
    expertise: ["Operations Management", "Quality Control", "Process Optimization", "Team Leadership"],
    social: {
      linkedin: "#",
      twitter: "#"
    },
    color: "#10B981",
    stats: {
      experience: "15+ years",
      projects: "300+",
      specialties: ["Operations", "Quality Assurance"]
    }
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Head of Engineering",
    bio: "Michael is a structural engineering expert with 12+ years of experience. He leads our technical team in implementing innovative construction methods and ensuring structural integrity.",
    expertise: ["Structural Engineering", "Technical Innovation", "Safety Standards", "Project Planning"],
    social: {
      linkedin: "#",
      twitter: "#"
    },
    color: "#F59E0B",
    stats: {
      experience: "12+ years",
      projects: "200+",
      specialties: ["Engineering", "Innovation"]
    }
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    position: "Project Management Lead",
    bio: "Elena coordinates complex construction projects with precision and attention to detail. Her client-focused approach ensures seamless communication and project success.",
    expertise: ["Project Coordination", "Timeline Management", "Client Relations", "Budget Control"],
    social: {
      linkedin: "#",
      twitter: "#"
    },
    color: "#8B5CF6",
    stats: {
      experience: "10+ years",
      projects: "180+",
      specialties: ["Project Management", "Coordination"]
    }
  },
  {
    id: 5,
    name: "David Thompson",
    position: "Head of Sustainability",
    bio: "David leads our green building initiatives, implementing sustainable practices and ensuring environmental compliance across all projects.",
    expertise: ["Sustainable Design", "LEED Certification", "Environmental Compliance", "Green Materials"],
    social: {
      linkedin: "#",
      twitter: "#"
    },
    color: "#06D6A0",
    stats: {
      experience: "8+ years",
      projects: "120+",
      specialties: ["Sustainability", "Green Building"]
    }
  },
  {
    id: 6,
    name: "Lisa Wang",
    position: "Design Director",
    bio: "Lisa combines artistic vision with practical functionality, creating spaces that inspire while meeting client needs and budget requirements.",
    expertise: ["Architectural Design", "Space Planning", "Material Selection", "3D Visualization"],
    social: {
      linkedin: "#",
      twitter: "#"
    },
    color: "#EF4444",
    stats: {
      experience: "14+ years",
      projects: "250+",
      specialties: ["Design", "Architecture"]
    }
  }
];

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [activeMember, setActiveMember] = useState(null);
  const sectionRef = useRef(null);
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

  const memberVariants = {
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
      y: -12,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
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
    <section id="team" className="team section-padding" ref={sectionRef}>
      {/* Background Elements */}
      <div className="team-background">
        <div className="floating-avatars">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-avatar"
              style={{
                left: `${10 + (i * 12)}%`,
                background: `linear-gradient(135deg, var(--accent-color)${15 + i * 5}%, transparent)`
              }}
              animate={{
                y: [0, -40, 0],
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
          className="team-header"
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
            Our Team
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Meet Our
            <motion.span 
              className="title-highlight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Leadership Team
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="team-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our experienced leadership team brings together diverse expertise 
            and a shared commitment to excellence in every project.
          </motion.p>

          {/* Team Stats */}
          <motion.div
            className="team-stats"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="team-stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Expert Professionals</span>
            </div>
            <div className="team-stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Average Experience</span>
            </div>
            <div className="team-stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Team Grid */}
        <motion.div
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamData.map((member, index) => (
            <motion.div
              key={member.id}
              className={`team-member ${hoveredMember === member.id ? 'hovered' : ''}`}
              variants={memberVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
              onClick={() => setActiveMember(activeMember === member.id ? null : member.id)}
            >
              {/* Member Background Effect */}
              <div 
                className="member-background"
                style={{
                  background: `linear-gradient(135deg, ${member.color}10, ${member.color}05)`
                }}
              />

              {/* Enhanced Member Image */}
              <motion.div
                className="member-image"
                variants={imageVariants}
                whileHover="hover"
              >
                <div 
                  className="image-placeholder"
                  style={{
                    background: `linear-gradient(135deg, ${member.color}, ${member.color}CC)`
                  }}
                >
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </motion.span>
                  
                  {/* Image Glow Effect */}
                  <motion.div
                    className="image-glow"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    style={{ background: member.color }}
                  />
                </div>

                {/* Enhanced Overlay with Social Links */}
                <motion.div
                  className="member-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="social-links"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <motion.a
                      href={member.social.linkedin}
                      aria-label="LinkedIn"
                      variants={socialVariants}
                      whileHover="hover"
                      style={{ background: member.color }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      aria-label="Twitter"
                      variants={socialVariants}
                      whileHover="hover"
                      style={{ background: member.color }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.055 10.055 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.543l-.047-.02z"/>
                      </svg>
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Member Stats Badge */}
                <motion.div
                  className="member-stats"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="stat-item">
                    <span className="stat-value">{member.stats.experience}</span>
                    <span className="stat-label">Experience</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced Member Info */}
              <motion.div 
                className="member-info"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  {member.name}
                </motion.h3>
                
                <motion.p
                  className="position"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  style={{ color: member.color }}
                >
                  {member.position}
                </motion.p>
                
                <motion.p
                  className="bio"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  {member.bio}
                </motion.p>
                
                <motion.div
                  className="expertise"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <h4>🎯 Areas of Expertise:</h4>
                  <div className="expertise-tags">
                    {member.expertise.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="expertise-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 1 + index * 0.1 + idx * 0.1 
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2
                        }}
                        style={{
                          borderColor: member.color,
                          color: member.color,
                          backgroundColor: `${member.color}15`
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Member Border Effect */}
              <motion.div
                className="member-border"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ background: `linear-gradient(90deg, ${member.color}, var(--orange))` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          className="team-cta"
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
            <h3>Join Our Team of Experts</h3>
            <p>Be part of a company that values innovation, quality, and professional growth.</p>
            
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
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                View Career Opportunities
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
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                Contact Our Team
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;