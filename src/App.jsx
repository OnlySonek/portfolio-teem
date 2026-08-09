import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { SiteContext } from "./context/SiteContext";
import { TOTAL_SECTIONS } from "./data/content";
import { t as translate, pick as pickLang } from "./i18n";
import TransitionOverlay from "./components/TransitionOverlay";
import Navbar from "./components/Navbar";
import SideDots from "./components/SideDots";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ServicesSection from "./components/sections/ServicesSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ProcessSection from "./components/sections/ProcessSection";
import TeamSection from "./components/sections/TeamSection";
import ContactSection from "./components/sections/ContactSection";

export default function App() {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const sectionRefs = useRef([]);
  const busyRef = useRef(false);
  const currentRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(true);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("aas-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("aas-lang") || "en";
    } catch {
      return "en";
    }
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    try {
      localStorage.setItem("aas-theme", theme);
    } catch {
      /* noop */
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", dir);
    try {
      localStorage.setItem("aas-lang", lang);
    } catch {
      /* noop */
    }
  }, [lang, dir]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback((key) => translate(lang, key), [lang]);
  const pick = useCallback((value) => pickLang(lang, value), [lang]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sectionRefs.current.indexOf(e.target);
            if (i !== -1 && i !== currentRef.current) {
              currentRef.current = i;
              setActiveIndex(i);
            }
          }
        });
      },
      { root: wrapper, threshold: 0.5 }
    );
    sectionRefs.current.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ready]);

  const playTransition = useCallback((cb) => {
    const overlay = overlayRef.current;
    if (!overlay) {
      cb();
      return;
    }
    gsap.set(overlay, { opacity: 1, clipPath: "inset(50% 0 50% 0)" });
    gsap.to(overlay, {
      clipPath: "inset(0% 0 0% 0)",
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        cb();
        gsap.to(overlay, {
          clipPath: "inset(50% 0 50% 0)",
          duration: 0.4,
          ease: "power3.inOut",
          delay: 0.05,
          onComplete: () => gsap.set(overlay, { opacity: 0 }),
        });
      },
    });
  }, []);

  const goTo = useCallback(
    (index) => {
      if (
        busyRef.current ||
        index === currentRef.current ||
        index < 0 ||
        index >= TOTAL_SECTIONS
      )
        return;
      busyRef.current = true;
      playTransition(() => {
        sectionRefs.current[index].scrollIntoView({ behavior: "instant" });
        currentRef.current = index;
        setActiveIndex(index);
        setTimeout(() => {
          busyRef.current = false;
        }, 100);
      });
    },
    [playTransition]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(currentRef.current + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(currentRef.current - 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [goTo]);

  const registerSection = useCallback((el, i) => {
    sectionRefs.current[i] = el;
  }, []);

  const value = useMemo(
    () => ({
      activeIndex,
      totalSections: TOTAL_SECTIONS,
      ready,
      theme,
      lang,
      dir,
      toggleTheme,
      toggleLang,
      t,
      pick,
      goTo,
      registerSection,
    }),
    [activeIndex, ready, theme, lang, dir, toggleTheme, toggleLang, t, pick, goTo, registerSection]
  );

  return (
    <SiteContext.Provider value={value}>
      <div className="h-screen overflow-hidden bg-paper text-fore font-sans">
        <div className="grain-overlay" aria-hidden="true" />
        <TransitionOverlay ref={overlayRef} />
        <Navbar />
        <SideDots />

        <div
          ref={wrapperRef}
          id="scrollWrapper"
          className="h-screen overflow-y-scroll"
        >
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ServicesSection />
          <ProjectsSection />
          <ProcessSection />
          <TeamSection />
          <ContactSection />
        </div>
      </div>
    </SiteContext.Provider>
  );
}
