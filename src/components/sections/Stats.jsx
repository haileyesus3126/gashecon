import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { number: 50, suffix: '+', label: 'Projects Completed', duration: 2000 },
  { number: 15, suffix: '+', label: 'Years Experience', duration: 1500 },
  { number: 100, suffix: '%', label: 'Client Satisfaction', duration: 1800 },
  { number: 24, suffix: '/7', label: 'Support Available', duration: 1200 }
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatItem 
              key={stat.label}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index, isInView }) {
  const { number, suffix, label, duration } = stat;
  
  return (
    <motion.div 
      className="stat-item"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="stat-content">
        <motion.div 
          className="stat-number"
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : { scale: 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          <Counter 
            from={0} 
            to={number} 
            duration={duration} 
            isInView={isInView}
          />
          <span className="stat-suffix">{suffix}</span>
        </motion.div>
        <p className="stat-label">{label}</p>
      </div>
      
      {/* Background decoration */}
      <motion.div 
        className="stat-bg"
        initial={{ scale: 0, rotate: -45 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
      />
    </motion.div>
  );
}

function Counter({ from, to, duration, isInView }) {
  const [count, setCount] = React.useState(from);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (to - from) + from));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}