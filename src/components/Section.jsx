import { useEffect, useRef } from "react";
import { useSite } from "../context/SiteContext";

export default function Section({
  sectionIndex,
  id,
  className = "",
  children,
}) {
  const { registerSection } = useSite();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { root: document.getElementById("scrollWrapper"), threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={(el) => {
        ref.current = el;
        if (el) registerSection(el, sectionIndex);
      }}
      className={`snap-section ${className}`}
    >
      {children}
    </section>
  );
}
