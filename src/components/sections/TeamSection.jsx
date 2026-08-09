import Section from "../Section";
import { useSite } from "../../context/SiteContext";
import { MEMBER_1, MEMBER_2 } from "../../data/content";

const MEMBERS = [MEMBER_1, MEMBER_2];

export default function TeamSection() {
  const { goTo, t, pick } = useSite();

  return (
    <Section sectionIndex={6} id="s6">
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10">
        <div className="mb-14">
          <p data-reveal className="eyebrow mb-5">
            {t("team.eyebrow")}
          </p>
          <h2
            data-reveal
            className="section-title text-[clamp(2.2rem,5.5vw,3.8rem)]"
          >
            {t("team.title")} <span className="grad-text">{t("team.grad")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {MEMBERS.map((member) => (
            <div
              key={member.firstName}
              data-reveal
              className="card p-8 group h-full flex flex-col"
            >
              <div className="flex items-start gap-5">
                <img
                  src={`/${member.image}`}
                  alt={`${member.firstName} ${member.lastName}`}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-xl">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p
                    className="font-mono text-xs mt-1 mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    {pick(member.role)}
                  </p>
                  <p className="text-mute text-sm leading-6">
                    {pick(member.bio)}
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-4 flex-1">
                {member.skills.map((skill) => (
                  <div key={skill.label.en}>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-fore/80">
                        {pick(skill.label)}
                      </span>
                      <span className="font-mono text-xs text-fore/80">
                        {skill.value}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full skill-track overflow-hidden">
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

              <div className="flex items-center gap-3 mt-7 pt-6 border-t border-line">
                {[
                  { icon: "fa-github", href: member.github, label: "GitHub" },
                  { icon: "fa-linkedin-in", href: member.linkedin, label: "LinkedIn" },
                  { icon: "fa-globe", href: member.website, label: "Website" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-accent-soft flex items-center justify-center text-mute hover:text-[var(--accent)] transition-colors"
                    aria-label={link.label}
                  >
                    <i className={`fa-brands ${link.icon}`} />
                  </a>
                ))}
                <button
                  className="ms-auto btn btn-ghost text-xs"
                  onClick={() => goTo(7)}
                >
                  {t("team.workWithUs")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
