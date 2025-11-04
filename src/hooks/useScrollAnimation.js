import { useEffect, useRef, useState } from "react";

export default function useScrollAnimation({
  root = null,
  rootMargin = "0px",
  threshold = 0.15,
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) obs.unobserve(node);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { root, rootMargin, threshold }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [root, rootMargin, threshold, triggerOnce]);

  return { ref, isVisible };
}
