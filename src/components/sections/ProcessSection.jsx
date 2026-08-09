import Section from "../Section";
import { useSite } from "../../context/SiteContext";
import { PROCESS } from "../../data/content";

export default function ProcessSection() {
  const { t, pick } = useSite();

  return (
    <Section sectionIndex={5} id="s5">
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10">
        <div className="mb-14">
          <p data-reveal className="eyebrow mb-5">
            {t("process.eyebrow")}
          </p>
          <h2
            data-reveal
            className="section-title text-[clamp(2.2rem,5.5vw,3.8rem)]"
          >
            {t("process.title")} <span className="grad-text">{t("process.grad")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {PROCESS.map((step, i) => (
            <div
              key={step.step}
              data-reveal
              className="card group p-8 relative h-full flex flex-col"
            >
              <span
                className="absolute top-4 end-6 font-display font-bold text-6xl md:text-7xl grad-text opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.14] pointer-events-none select-none"
                aria-hidden="true"
              >
                {step.step}
              </span>
              <h3 className="relative font-display font-semibold text-lg mt-1 mb-3">
                {pick(step.title)}
              </h3>
              <p className="relative text-mute text-sm leading-6 flex-1">
                {pick(step.desc)}
              </p>
              {i < PROCESS.length - 1 && (
                <i
                  className="fa-solid fa-arrow-right process-arrow text-faint hidden lg:block"
                  style={{ color: "var(--accent)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
