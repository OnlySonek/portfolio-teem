import { useEffect, useState } from "react";
import { NAV_ITEMS } from "../data/content";
import { useSite } from "../context/SiteContext";

export default function Navbar() {
  const {
    activeIndex,
    totalSections,
    goTo,
    theme,
    toggleTheme,
    lang,
    toggleLang,
    t,
    pick,
  } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = totalSections > 1 ? activeIndex / (totalSections - 1) : 0;

  useEffect(() => {
    const wrapper = document.getElementById("scrollWrapper");
    if (!wrapper) return;
    const onScroll = () => setScrolled(wrapper.scrollTop > 40);
    onScroll();
    wrapper.addEventListener("scroll", onScroll);
    return () => wrapper.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (index) => {
    setMenuOpen(false);
    goTo(index);
  };

  return (
    <nav className={`nav-top ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-brand" onClick={() => handleNavClick(0)}>
        <img src="/logo.png" alt="Novalyx logo" className="nav-brand-logo" />
        <div className="flex flex-col">
          <span className="nav-brand-text">Novalyx</span>
          <span className="nav-brand-sub">{t("hero.badge")}</span>
        </div>
      </div>

      <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item.index}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.index);
              }}
              className={`nav-link ${activeIndex === item.index ? "active" : ""}`}
            >
              {pick(item.label)}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-cta">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={t("nav.themeToggle")}
        >
          {theme === "dark" ? (
            <i className="fa-solid fa-sun" />
          ) : (
            <i className="fa-solid fa-moon" />
          )}
        </button>
        <button
          className="lang-toggle"
          onClick={toggleLang}
          aria-label={t("nav.langToggle")}
        >
          {lang === "en" ? "ع" : "EN"}
        </button>
        <button className="btn btn-primary" onClick={() => goTo(7)}>
          {t("nav.letsTalk")}
        </button>
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={t("nav.menuToggle")}
          aria-expanded={menuOpen}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>

      <div className="nav-progress-track" aria-hidden="true">
        <div
          className="nav-progress-fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </nav>
  );
}
