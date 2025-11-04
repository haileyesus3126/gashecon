export default function useStaggerAnimation({
  baseDelay = 0.08,  // seconds
  start = 0,         // index offset
  max = Infinity,    // cap if needed
} = {}) {
  const delayFor = (index) => (index >= max ? null : (start + index) * baseDelay);
  const styleFor = (index) => {
    const d = delayFor(index);
    return d == null ? {} : { transitionDelay: `${d}s`, animationDelay: `${d}s` };
  };
  return { delayFor, styleFor };
}
