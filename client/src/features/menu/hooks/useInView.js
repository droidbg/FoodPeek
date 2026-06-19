import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and an `inView` flag that flips to true the first time the
 * referenced element scrolls into view. Used to trigger staggered reveal
 * animations once per element.
 *
 * @param {{ rootMargin?: string, threshold?: number }} [options]
 */
const useInView = ({
  rootMargin = "0px 0px -15% 0px",
  threshold = 0.1,
} = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, rootMargin, threshold]);

  return [ref, inView];
};

export default useInView;
