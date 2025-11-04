import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

// Temporary data - add this inside your component file
const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Homeowner",
    company: "Private Residence",
    project: "Luxury Villa Construction",
    date: "Completed 2023",
    rating: 5,
    text: "Gashecon transformed our dream home into reality. Their attention to detail and commitment to quality was exceptional. The project was completed on time and within budget, exceeding our expectations at every turn. We couldn't be happier with the results!",
    color: "#3B82F6"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO",
    company: "Tech Innovations Ltd",
    project: "Corporate Office Complex",
    date: "Completed 2024",
    rating: 5,
    text: "Working with Gashecon on our new corporate headquarters was a game-changer. Their innovative approach to sustainable construction and project management saved us both time and money. The final result is a stunning, functional space that perfectly represents our brand.",
    color: "#10B981"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    position: "Property Developer",
    company: "Urban Spaces Development",
    project: "Mixed-Use Complex",
    date: "Completed 2023",
    rating: 5,
    text: "As a property developer, I've worked with many construction firms, but Gashecon stands out. Their professionalism, technical expertise, and ability to handle complex projects is unmatched. They delivered our mixed-use complex ahead of schedule.",
    color: "#F59E0B"
  },
  {
    id: 4,
    name: "David Thompson",
    position: "Restaurant Owner",
    company: "Culinary Experience",
    project: "Fine Dining Restaurant",
    date: "Completed 2024",
    rating: 5,
    text: "The team at Gashecon understood our vision perfectly. They created a beautiful, functional space that enhances our dining experience. Their attention to acoustics, lighting, and flow was remarkable. Our customers love the atmosphere!",
    color: "#8B5CF6"
  },
  {
    id: 5,
    name: "Lisa Wang",
    position: "Architect",
    company: "Design Studio Collective",
    project: "Boutique Hotel",
    date: "Completed 2023",
    rating: 5,
    text: "Collaborating with Gashecon was a pleasure. They respected our design vision while providing practical construction insights. The craftsmanship is outstanding, and their problem-solving skills during construction were impressive.",
    color: "#EF4444"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [hoveredTestimonial, setHoveredTestimonial] = useState(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonialsData.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const goToTestimonial = (index) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Star rating component
  const StarRating = ({ rating, size = "medium" }) => {
    return (
      <div className={`star-rating ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              delay: 0.5 + star * 0.1 
            }}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            ★
          </motion.span>
        ))}
      </div>
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 20 : -20
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -20 : 20,
      transition: {
        duration: 0.5
      }
    })
  };

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

  const buttonVariants = {
    initial: { 
      scale: 1,
      backgroundColor: "var(--bg-tertiary)"
    },
    hover: { 
      scale: 1.1, 
      backgroundColor: "var(--accent-color)",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="testimonials" className="testimonials section-padding" ref={sectionRef}>
      {/* Background Elements */}
      <div className="testimonials-background">
        <div className="floating-quotes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-quote"
              style={{
                left: `${10 + (i * 15)}%`,
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
          className="testimonials-header"
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
            Client Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            What Our
            <motion.span 
              className="title-highlight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Clients Say
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="testimonials-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it. Here's what our clients have to say 
            about their experience working with Gashecon.
          </motion.p>
        </motion.div>

        {/* Enhanced Main Testimonial Carousel */}
        <motion.div
          className="testimonials-carousel"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Enhanced Quote Marks */}
          <motion.div
            className="quote-marks"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="quote-mark left"
              animate={{
                y: [0, -10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              "
            </motion.span>
            <motion.span 
              className="quote-mark right"
              animate={{
                y: [0, 10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              "
            </motion.span>
          </motion.div>

          {/* Enhanced Carousel Container */}
          <div className="carousel-container">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                className="testimonial-slide"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.div 
                  className="testimonial-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card Background Effect */}
                  <div 
                    className="card-background"
                    style={{
                      background: `linear-gradient(135deg, ${testimonialsData[currentIndex].color}15, ${testimonialsData[currentIndex].color}05)`
                    }}
                  />

                  {/* Enhanced Rating */}
                  <motion.div
                    className="testimonial-rating"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <StarRating rating={testimonialsData[currentIndex].rating} />
                    <motion.span 
                      className="rating-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      Excellent
                    </motion.span>
                  </motion.div>

                  {/* Enhanced Testimonial Text */}
                  <motion.blockquote
                    className="testimonial-text"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    "{testimonialsData[currentIndex].text}"
                  </motion.blockquote>

                  {/* Enhanced Client Info */}
                  <motion.div
                    className="client-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.div 
                      className="client-avatar"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div 
                        className="avatar-placeholder"
                        style={{
                          background: `linear-gradient(135deg, ${testimonialsData[currentIndex].color}, ${testimonialsData[currentIndex].color}CC)`
                        }}
                      >
                        <span>{testimonialsData[currentIndex].name.split(' ').map(n => n[0]).join('')}</span>
                        
                        {/* Avatar Glow */}
                        <motion.div
                          className="avatar-glow"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity 
                          }}
                          style={{ background: testimonialsData[currentIndex].color }}
                        />
                      </div>
                    </motion.div>
                    
                    <div className="client-details">
                      <motion.h4 
                        className="client-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        {testimonialsData[currentIndex].name}
                      </motion.h4>
                      
                      <motion.p 
                        className="client-position"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        {testimonialsData[currentIndex].position}
                      </motion.p>
                      
                      <motion.p 
                        className="client-company"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        {testimonialsData[currentIndex].company}
                      </motion.p>
                      
                      <motion.div 
                        className="project-info"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <motion.span 
                          className="project-name"
                          whileHover={{ scale: 1.05 }}
                        >
                          {testimonialsData[currentIndex].project}
                        </motion.span>
                        <motion.span 
                          className="project-date"
                          whileHover={{ scale: 1.05 }}
                        >
                          {testimonialsData[currentIndex].date}
                        </motion.span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Card Border Effect */}
                  <motion.div
                    className="card-border"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ background: testimonialsData[currentIndex].color }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Navigation Controls */}
            <div className="carousel-controls">
              <motion.button
                className="nav-btn prev"
                onClick={prevTestimonial}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  initial={{ x: 0 }}
                  whileHover={{ x: -2 }}
                >
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.button>

              <div className="carousel-dots">
                {testimonialsData.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onHoverStart={() => setHoveredTestimonial(index)}
                    onHoverEnd={() => setHoveredTestimonial(null)}
                  >
                    <motion.span
                      className="dot-progress"
                      animate={{ scaleX: index === currentIndex ? 1 : 0 }}
                      transition={{ duration: 6, ease: "linear" }}
                      style={{ background: testimonialsData[index].color }}
                    />
                    
                    {/* Dot Tooltip */}
                    {hoveredTestimonial === index && (
                      <motion.span
                        className="dot-tooltip"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {testimonialsData[index].name}
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                className="nav-btn next"
                onClick={nextTestimonial}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  initial={{ x: 0 }}
                  whileHover={{ x: 2 }}
                >
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Additional Testimonials Grid */}
        <motion.div
          className="testimonials-grid"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="grid-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            More Client Experiences
          </motion.h3>
          
          <div className="mini-testimonials">
            {testimonialsData.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="mini-testimonial"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8 
                }}
                onHoverStart={() => setHoveredTestimonial(testimonial.id)}
                onHoverEnd={() => setHoveredTestimonial(null)}
              >
                {/* Mini Card Background */}
                <div 
                  className="mini-background"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.color}10, ${testimonial.color}05)`
                  }}
                />

                <div className="mini-rating">
                  <StarRating rating={testimonial.rating} size="small" />
                </div>
                
                <motion.p 
                  className="mini-text"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  "{testimonial.text.slice(0, 120)}..."
                </motion.p>
                
                <div className="mini-client">
                  <div 
                    className="mini-avatar"
                    style={{ background: testimonial.color }}
                  >
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="mini-details">
                    <motion.strong
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {testimonial.name}
                    </motion.strong>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {testimonial.position}
                    </motion.span>
                  </div>
                </div>

                {/* Mini Card Border */}
                <motion.div
                  className="mini-border"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: testimonial.color }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Trust Indicators */}
        <motion.div
          className="trust-indicators"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { number: "100%", label: "Client Recommendation Rate", delay: 0.9 },
            { number: "4.9/5", label: "Average Client Rating", delay: 1.0 },
            { number: "150+", label: "Satisfied Clients", delay: 1.1 }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="trust-item"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                delay: item.delay 
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.span
                className="trust-number"
                animate={{
                  scale: [1, 1.1, 1],
                  color: ["var(--text-primary)", "var(--accent-color)", "var(--text-primary)"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {item.number}
              </motion.span>
              <span className="trust-label">{item.label}</span>
              
              {/* Trust Item Pulse */}
              <motion.div
                className="trust-pulse"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;