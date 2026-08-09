import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Section from "../Section";
import { useSite, useSectionActive } from "../../context/SiteContext";
import { MARQUEE_TAGS } from "../../data/content";

export default function HeroSection() {
  const { goTo, t } = useSite();
  const innerRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const active = useSectionActive(0);

  useEffect(() => {
    if (!active) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "expo", delay: 0.3 }
      );
      gsap.fromTo(
        titleRef.current,
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, ease: "expo", delay: 0.45 }
      );
      gsap.fromTo(
        subRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo", delay: 0.7 }
      );
      gsap.fromTo(
        ctaRef.current.children,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo", stagger: 0.12, delay: 0.9 }
      );
    }, innerRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <Section sectionIndex={0} id="s0">
      <div
        className="glow-blob glow-blob-drift"
        style={{
          top: "-10%",
          left: "8%",
          width: "38vw",
          height: "38vw",
          background: "var(--accent)",
        }}
        aria-hidden="true"
      />
      <div
        className="glow-blob glow-blob-drift"
        style={{
          bottom: "-15%",
          right: "6%",
          width: "32vw",
          height: "32vw",
          background: "var(--accent-2)",
          animationDelay: "-7s",
        }}
        aria-hidden="true"
      />
      <div ref={innerRef} className="relative z-10 w-full max-w-4xl px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-7">
          <span ref={badgeRef} className="chip" style={{ opacity: 0 }}>
            <i className="fa-solid fa-bolt text-[10px]" style={{ color: "var(--accent)" }} />
            {t("hero.badge")}
          </span>
        </div>

        <div className="overflow-hidden mb-6">
          <h1
            ref={titleRef}
            className="section-title text-fore"
            style={{
              fontSize: "clamp(2.9rem, 8.5vw, 6.4rem)",
              opacity: 0,
            }}
          >
            {t("hero.line1")}{" "}
            <span className="grad-text">{t("hero.line2")}</span>
            <br />
            {t("hero.line3")}
          </h1>
        </div>

        <p
          ref={subRef}
          className="text-mute text-base md:text-lg leading-7 md:leading-8 max-w-xl mx-auto"
          style={{ opacity: 0 }}
        >
          {t("hero.sub")}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3.5 mt-10"
          style={{ opacity: 0 }}
        >
          <button className="btn btn-primary" onClick={() => goTo(4)}>
            {t("hero.ctaWork")}
            <i className="fa-solid fa-arrow-right" />
          </button>
          <button className="btn btn-ghost" onClick={() => goTo(7)}>
            {t("hero.ctaContact")}
          </button>
        </div>

        <div
          className="mt-16 overflow-hidden"
          style={{
            WebkitMask:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            mask: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="marquee-track font-mono text-xs tracking-[0.25em] uppercase text-faint">
            {[...MARQUEE_TAGS, ...MARQUEE_TAGS, ...MARQUEE_TAGS, ...MARQUEE_TAGS].map(
              (t, i) => (
                <span key={i} className="flex items-center gap-6">
                  {t} <span className="text-faint">✦</span>
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
