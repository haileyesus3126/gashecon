import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

// Constants for better maintainability
const FLOATING_QUOTES_COUNT = 6;
const AUTO_PLAY_INTERVAL = 6000;
const MINI_TESTIMONIALS_COUNT = 3;

// Testimonials data included directly to avoid import issues
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
    color: "#0A2463" // Using your brand color
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
    color: "#FF6B35" // Using your brand color
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
    color: "#4CAF50" // Using your brand color
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
    color: "#F59E0B"
  }
];

// Star rating component
const StarRating = ({ rating, size = "medium" }) => {
  return (
    <div className={`star-rating ${size}`} role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
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
          aria-hidden="true"
        >
          ★
        </motion.span>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [hoveredTestimonial, setHoveredTestimonial] = useState(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // Memoized data
  const memoizedTestimonials = useMemo(() => testimonialsData, []);
  const memoizedMiniTestimonials = useMemo(() => testimonialsData.slice(0, MINI_TESTIMONIALS_COUNT), []);
  const memoizedTrustIndicators = useMemo(() => [
    { number: "100%", label: "Client Recommendation Rate", delay: 0.9 },
    { number: "4.9/5", label: "Average Client Rating", delay: 1.0 },
    { number: "150+", label: "Satisfied Clients", delay: 1.1 }
  ], []);

  // Memoized floating quotes
  const floatingQuotes = useMemo(() => 
    [...Array(FLOATING_QUOTES_COUNT)].map((_, i) => ({
      id: i,
      left: `${10 + (i * 15)}%`,
      background: `linear-gradient(135deg, var(--accent-color)${10 + i * 5}%, transparent)`,
      duration: 8 + i * 2,
      delay: i * 0.5
    }))
  , []);

  // Auto-advance carousel with pause on hover
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % memoizedTestimonials.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlaying, memoizedTestimonials.length, isInView]);

  // Handlers
  const nextTestimonial = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % memoizedTestimonials.length);
  }, [memoizedTestimonials.length]);

  const prevTestimonial = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + memoizedTestimonials.length) % memoizedTestimonials.length);
  }, [memoizedTestimonials.length]);

  const goToTestimonial = useCallback((index) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const handleTestimonialHover = useCallback((testimonialId) => {
    setHoveredTestimonial(testimonialId);
  }, []);

  const handleTestimonialLeave = useCallback(() => {
    setHoveredTestimonial(null);
  }, []);

  // Animation variants
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

  const currentTestimonial = memoizedTestimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="testimonials section-padding" 
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
    >
      {/* Background Elements */}
      <div className="testimonials-background" aria-hidden="true">
        <div className="floating-quotes">
          {floatingQuotes.map((quote) => (
            <motion.div
              key={quote.id}
              className="floating-quote"
              style={{
                left: quote.left,
                background: quote.background
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: quote.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: quote.delay
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
            id="testimonials-heading"
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
          role="region"
          aria-label="Client testimonials carousel"
        >
          {/* Enhanced Quote Marks */}
          <motion.div
            className="quote-marks"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            aria-hidden="true"
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
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${currentIndex + 1} of ${memoizedTestimonials.length}`}
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
                      background: `linear-gradient(135deg, ${currentTestimonial.color}15, ${currentTestimonial.color}05)`
                    }}
                    aria-hidden="true"
                  />

                  {/* Enhanced Rating */}
                  <motion.div
                    className="testimonial-rating"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <StarRating rating={currentTestimonial.rating} />
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
                    cite={`${currentTestimonial.name}, ${currentTestimonial.position}`}
                  >
                    "{currentTestimonial.text}"
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
                      aria-hidden="true"
                    >
                      <div 
                        className="avatar-placeholder"
                        style={{
                          background: `linear-gradient(135deg, ${currentTestimonial.color}, ${currentTestimonial.color}CC)`
                        }}
                      >
                        <span>{currentTestimonial.name.split(' ').map(n => n[0]).join('')}</span>
                        
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
                          style={{ background: currentTestimonial.color }}
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
                        {currentTestimonial.name}
                      </motion.h4>
                      
                      <motion.p 
                        className="client-position"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        {currentTestimonial.position}
                      </motion.p>
                      
                      <motion.p 
                        className="client-company"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        {currentTestimonial.company}
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
                          {currentTestimonial.project}
                        </motion.span>
                        <motion.span 
                          className="project-date"
                          whileHover={{ scale: 1.05 }}
                        >
                          {currentTestimonial.date}
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
                    style={{ background: currentTestimonial.color }}
                    aria-hidden="true"
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
                aria-label="Previous testimonial"
              >
                <motion.svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  aria-hidden="true"
                  initial={{ x: 0 }}
                  whileHover={{ x: -2 }}
                >
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.button>

              <div className="carousel-dots" role="tablist" aria-label="Testimonial navigation">
                {memoizedTestimonials.map((testimonial, index) => (
                  <motion.button
                    key={testimonial.id}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onHoverStart={() => handleTestimonialHover(testimonial.id)}
                    onHoverEnd={handleTestimonialLeave}
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Show testimonial from ${testimonial.name}`}
                    aria-controls={`testimonial-${testimonial.id}`}
                  >
                    <motion.span
                      className="dot-progress"
                      animate={{ scaleX: index === currentIndex ? 1 : 0 }}
                      transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
                      style={{ background: testimonial.color }}
                      aria-hidden="true"
                    />
                    
                    {/* Dot Tooltip */}
                    {hoveredTestimonial === testimonial.id && (
                      <motion.span
                        className="dot-tooltip"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="tooltip"
                      >
                        {testimonial.name}
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
                aria-label="Next testimonial"
              >
                <motion.svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  aria-hidden="true"
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
          aria-labelledby="more-testimonials-heading"
        >
          <motion.h3 
            id="more-testimonials-heading"
            className="grid-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            More Client Experiences
          </motion.h3>
          
          <div className="mini-testimonials" role="list" aria-label="Additional client testimonials">
            {memoizedMiniTestimonials.map((testimonial, index) => (
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
                onHoverStart={() => handleTestimonialHover(testimonial.id)}
                onHoverEnd={handleTestimonialLeave}
                role="listitem"
              >
                {/* Mini Card Background */}
                <div 
                  className="mini-background"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.color}10, ${testimonial.color}05)`
                  }}
                  aria-hidden="true"
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
                    aria-hidden="true"
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
                  aria-hidden="true"
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
          role="region"
          aria-label="Client satisfaction statistics"
        >
          {memoizedTrustIndicators.map((item, index) => (
            <motion.div
              key={item.label}
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
              role="group"
              aria-label={`${item.number} ${item.label}`}
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
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;