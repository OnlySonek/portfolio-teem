import Section from "../Section";
import { useSite } from "../../context/SiteContext";
import { MEMBER_1, MEMBER_2 } from "../../data/content";

export default function AboutSection() {
  const { t, pick } = useSite();

  const STATS = [
    { value: "4+", label: t("stats.years") },
    { value: "20+", label: t("stats.projects") },
    { value: "30+", label: t("stats.tech") },
    { value: "100%", label: t("stats.satisfaction") },
  ];

  return (
    <Section sectionIndex={1} id="s1">
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10">
        <p data-reveal className="eyebrow mb-5">
          {t("about.eyebrow")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2
              data-reveal
              className="section-title text-[clamp(2.2rem,5.5vw,3.8rem)]"
            >
              {t("about.title")}
              <br />
              {t("about.title2")} <span className="grad-text">{t("about.grad")}</span> {t("about.title3")}
            </h2>
            <p data-reveal className="text-mute mt-7 leading-7 md:leading-8 max-w-md">
              {pick(MEMBER_1.firstName)} {t("about.and")} {pick(MEMBER_2.firstName)}{" "}
              {t("about.p1")}
            </p>
            <p data-reveal className="text-mute mt-4 leading-7 md:leading-8 max-w-md">
              {t("about.p2")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                data-reveal
                className="card p-7 md:p-8 flex flex-col gap-3 h-full"
              >
                <span className="section-title grad-text text-4xl md:text-5xl">
                  {s.value}
                </span>
                <span className="font-mono text-xs text-faint uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
