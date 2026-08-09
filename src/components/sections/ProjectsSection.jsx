import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Section from "../Section";
import { useSite } from "../../context/SiteContext";
import { PROJECTS } from "../../data/content";

export default function ProjectsSection() {
  const { t, pick } = useSite();
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    gsap.fromTo(
      el.children,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.08 }
    );
  }, []);

  return (
    <Section sectionIndex={4} id="s4">
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10">
        <div className="mb-14">
          <p data-reveal className="eyebrow mb-5">
            {t("work.eyebrow")}
          </p>
          <h2
            data-reveal
            className="section-title text-[clamp(2.2rem,5.5vw,3.8rem)]"
          >
            {t("work.title")} <span className="grad-text">{t("work.grad")}</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 max-w-2xl mx-auto">
          {PROJECTS.map((project) => (
            <a
              key={project.name.en}
              href={project.link}
              target={project.link !== "#" ? "_blank" : undefined}
              rel="noreferrer"
              className="card group p-7 no-underline h-full flex flex-col"
            >
              <div className="relative rounded-xl overflow-hidden bg-surface-2 aspect-[16/9] mb-6 border border-line">
                {project.image.endsWith(".svg") ? (
                  <div className="w-full h-full flex items-center justify-center bg-surface-2">
                    <img
                      src={`/${project.image}`}
                      alt={pick(project.name)}
                      className="w-24 h-24 opacity-90"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={`/${project.image}`}
                    alt={pick(project.name)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i
                    className="fa-solid fa-arrow-up-right-from-square text-white text-2xl"
                    style={{ color: "var(--accent-2)" }}
                  />
                </div>
                <span className="absolute top-3.5 start-3.5 chip text-[10px] py-1 shadow-lg">
                  {project.category}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 flex-1">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2">
                    {pick(project.name)}
                  </h3>
                  <p className="text-mute text-sm leading-6 max-w-md">
                    {pick(project.description)}
                  </p>
                </div>
                <span className="font-mono text-xs text-faint shrink-0 pt-1">
                  {project.year}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-fore/80 border border-line rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
