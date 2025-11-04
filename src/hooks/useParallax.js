// src/hooks/useParallax.js
import { useEffect } from "react";

/**
 * Applies a lightweight parallax effect to any elements that have a
 * `data-parallax-depth` attribute. Uses transform only (60fps safe).
 */
export default function useParallax(options = {}) {
  const {
    selector = ".animated-bg__layer",
    throttleMs = 16,
    rootMargin = '0px 0px -100px 0px'
  } = options;

  useEffect(() => {
    const layers = Array.from(document.querySelectorAll(selector));
    if (!layers.length) return;

    let rafId = null;
    let lastScrollY = window.scrollY;
    
    const update = () => {
      const y = lastScrollY;
      const vh = Math.max(window.innerHeight, 1);

      layers.forEach((el) => {
        const depth = parseFloat(el.getAttribute("data-parallax-depth") || "0");
        const offsetY = (y / vh) * depth * 40;
        el.style.transform = `translate3d(0, ${offsetY}px, 0)`;
      });

      rafId = null;
    };

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (rafId == null) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [selector, throttleMs, rootMargin]);
}