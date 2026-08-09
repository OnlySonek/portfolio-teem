import { createContext, useContext } from "react";

export const SiteContext = createContext({
  activeIndex: 0,
  totalSections: 8,
  ready: true,
  theme: "dark",
  lang: "en",
  dir: "ltr",
  toggleTheme: () => {},
  toggleLang: () => {},
  t: (key) => key,
  pick: (value) => value,
  goTo: () => {},
  registerSection: () => {},
});

export function useSite() {
  return useContext(SiteContext);
}

export function useSectionActive(index) {
  const { activeIndex } = useSite();
  return activeIndex === index;
}
