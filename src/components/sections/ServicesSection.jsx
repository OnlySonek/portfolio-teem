import Section from "../Section";
import { useSite } from "../../context/SiteContext";
import { SERVICES } from "../../data/content";

export default function ServicesSection() {
  const { t, pick } = useSite();

  return (
    <Section sectionIndex={3} id="s3">
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10">
        <div className="mb-14">
          <p data-reveal className="eyebrow mb-5">
            {t("services.eyebrow")}
          </p>
          <h2
            data-reveal
            className="section-title text-[clamp(2.2rem,5.5vw,3.8rem)]"
          >
            {t("services.title")} <span className="grad-text">{t("services.grad")}</span>{" "}
            {t("services.title2")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICES.map((service) => (
            <div
              key={service.title.en}
              data-reveal
              className="card group p-8 h-full flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-7 transition-transform duration-300 group-hover:scale-110">
                <i
                  className={`fa-solid ${service.icon} text-lg`}
                  style={{ color: "var(--accent)" }}
                />
              </div>
              <h3 className="font-display font-semibold text-lg mb-3">
                {pick(service.title)}
              </h3>
              <p className="text-mute text-sm leading-6 mb-6 flex-1">
                {pick(service.desc)}
              </p>
              <ul className="space-y-2.5">
                {service.items.map((item) => (
                  <li
                    key={item.en}
                    className="flex items-center gap-2.5 font-mono text-xs text-fore/80"
                  >
                    <i
                      className="fa-solid fa-circle-check text-[10px]"
                      style={{ color: "var(--accent-2)" }}
                    />
                    {pick(item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
