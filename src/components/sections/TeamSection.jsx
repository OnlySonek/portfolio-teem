import Section from "../Section";
import { useSite } from "../../context/SiteContext";
import { MEMBER_1, MEMBER_2, MEMBER_3 } from "../../data/content";

function TeamCard({ member }) {
  const { pick } = useSite();

  return (
    <div data-reveal className="card p-8 group h-full flex flex-col">
      <div className="flex items-start gap-5">
        {member.image ? (
          <img
            src={`/${member.image}`}
            alt={`${pick(member.firstName)} ${pick(member.lastName)}`}
            className="w-28 h-28 rounded-2xl object-cover shrink-0"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div
            className="w-28 h-28 rounded-2xl bg-surface-2 border border-line flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <span className="font-display font-bold text-5xl text-faint">
              ?
            </span>
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-display font-semibold text-xl">
            {pick(member.firstName)} {pick(member.lastName)}
          </h3>
          <p
            className="font-mono text-xs mt-1 mb-3"
            style={{ color: "var(--accent)" }}
          >
            {pick(member.role)}
          </p>
          <p className="text-mute text-sm leading-6">{pick(member.bio)}</p>
        </div>
      </div>

      <div className="mt-7 space-y-3 flex-1">
        {member.skills.map((skill) => (
          <div key={skill.label.en} className="flex justify-between">
            <span className="font-mono text-xs text-fore/80">
              {pick(skill.label)}
            </span>
            <span className="font-mono text-xs text-fore/80">
              {skill.value}%
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-7">
        {member.tools.map((tool) => (
          <span
            key={tool}
            className="font-mono text-[10px] text-fore/80 border border-line rounded-full px-2.5 py-1"
          >
            {tool}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-7 pt-6 border-t border-line">
        <a
          href={member.github}
          target="_blank"
          rel="noreferrer"
          className="w-9 h-9 rounded-lg bg-accent-soft flex items-center justify-center text-mute hover:text-[var(--accent)] transition-colors"
          aria-label="GitHub"
        >
          <i className="fa-brands fa-github" />
        </a>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          className="w-9 h-9 rounded-lg bg-accent-soft flex items-center justify-center text-mute hover:text-[var(--accent)] transition-colors"
          aria-label="LinkedIn"
        >
          <i className="fa-brands fa-linkedin-in" />
        </a>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const { t } = useSite();

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
          <TeamCard member={MEMBER_1} />
          <TeamCard member={MEMBER_2} />
        </div>

        <div className="mt-8 max-w-xl mx-auto">
          <TeamCard member={MEMBER_3} />
        </div>
      </div>
    </Section>
  );
}
