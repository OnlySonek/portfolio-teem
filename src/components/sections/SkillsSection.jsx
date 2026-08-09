import Section from "../Section";
import { useSite } from "../../context/SiteContext";
import { SKILLS } from "../../data/content";

export default function SkillsSection() {
  const { t, pick } = useSite();

  return (
    <Section sectionIndex={2} id="s2">
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10">
        <div className="mb-14">
          <p data-reveal className="eyebrow mb-5">
            {t("skills.eyebrow")}
          </p>
          <h2
            data-reveal
            className="section-title text-[clamp(2.2rem,5.5vw,3.8rem)]"
          >
            {t("skills.title")} <span className="grad-text">{t("skills.grad")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SKILLS.map((group) => (
            <div
              key={group.group.en}
              data-reveal
              className="card p-8 md:p-9 h-full flex flex-col"
            >
              <div className="flex items-center gap-4 mb-9">
                <span className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-layer-group text-base" style={{ color: "var(--accent)" }} />
                </span>
                <h3 className="font-display font-semibold text-xl">{pick(group.group)}</h3>
              </div>

              <div className="space-y-7 flex-1">
                {group.items.map((skill) => (
                  <div key={skill.name.en}>
                    <div className="flex justify-between mb-3">
                      <span className="font-mono text-xs text-fore/80">{pick(skill.name)}</span>
                      <span className="font-mono text-xs text-fore/80">{skill.value}%</span>
                    </div>
                    <div className="h-2 rounded-full skill-track overflow-hidden">
                      <div
                        className="h-full rounded-full skill-fill"
                        style={{
                          width: `${skill.value}%`,
                          background:
                            "linear-gradient(90deg, var(--accent), var(--accent-2))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
