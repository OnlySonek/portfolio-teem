import { useEffect, useState } from "react";
import Section from "../Section";
import { useSite } from "../../context/SiteContext";
import { CONTACT, MEMBER_1, MEMBER_2 } from "../../data/content";

const SOCIALS = [
  { icon: "fa-github", href: MEMBER_1.github, label: "Abdelrhman — GitHub" },
  { icon: "fa-linkedin-in", href: MEMBER_1.linkedin, label: "Abdelrhman — LinkedIn" },
  { icon: "fa-github", href: MEMBER_2.github, label: "Seif — GitHub" },
  { icon: "fa-linkedin-in", href: MEMBER_2.linkedin, label: "Seif — LinkedIn" },
  { icon: "fa-envelope", href: `mailto:${CONTACT.email}`, label: "Email" },
];

const FORM_TARGET_EMAIL = "abdelrhmansherif140@gmail.com";

export default function ContactSection() {
  const { t, pick } = useSite();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "true") {
      setSent(true);
      params.delete("sent");
      const cleanUrl =
        window.location.pathname +
        (params.toString() ? `?${params}` : "") +
        "#s7";
      window.history.replaceState({}, "", cleanUrl);
    }
  }, []);

  return (
    <Section sectionIndex={7} id="s7">
      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        <p data-reveal className="eyebrow mb-5">
          {t("contact.eyebrow")}
        </p>
        <h2
          data-reveal
          className="section-title text-[clamp(2.2rem,6vw,4rem)]"
        >
          {t("contact.title")} <span className="grad-text">{t("contact.grad")}</span>
        </h2>
        <p data-reveal className="text-mute mt-6 max-w-md mx-auto leading-7 md:leading-8">
          {t("contact.sub")}
        </p>

        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-xs text-fore/80"
        >
          <span className="inline-flex items-center gap-2.5">
            <i className="fa-solid fa-envelope" style={{ color: "var(--accent)" }} />
            {CONTACT.email}
          </span>
          <span className="inline-flex items-center gap-2.5">
            <i className="fa-solid fa-location-dot" style={{ color: "var(--accent-2)" }} />
            {pick(CONTACT.location)}
          </span>
        </div>

        <div
          data-reveal
          className="mt-12 flex items-center justify-center gap-3"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center text-mute hover:text-[var(--accent)] transition-colors"
              aria-label={s.label}
            >
              <i className={`fa-brands ${s.icon}`} />
            </a>
          ))}
        </div>

        <form
          data-reveal
          action={`https://formsubmit.co/${FORM_TARGET_EMAIL}`}
          method="POST"
          className="card mt-14 p-8 md:p-9 text-start"
        >
          <input type="hidden" name="_subject" value="New message from the portfolio site" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value={
              typeof window !== "undefined"
                ? `${window.location.origin}${window.location.pathname}?sent=true#s7`
                : ""
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col gap-2.5 text-start">
              <label className="font-mono text-xs text-mute uppercase tracking-widest">
                {t("contact.name")}
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t("contact.namePlaceholder")}
                className="field"
              />
            </div>
            <div className="flex flex-col gap-2.5 text-start">
              <label className="font-mono text-xs text-mute uppercase tracking-widest">
                {t("contact.email")}
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t("contact.emailPlaceholder")}
                className="field"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 mb-7 text-start">
            <label className="font-mono text-xs text-mute uppercase tracking-widest">
              {t("contact.details")}
            </label>
            <textarea
              required
              rows={4}
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t("contact.detailsPlaceholder")}
              className="field resize-none"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {sent ? (
              <>
                <i className="fa-solid fa-circle-check" /> {t("contact.sent")}
              </>
            ) : (
              <>
                {t("contact.send")} <i className="fa-solid fa-arrow-right" />
              </>
            )}
          </button>
        </form>

        <p data-reveal className="mt-9 font-mono text-[11px] text-faint">
          © {new Date().getFullYear()} Novalyx. {t("contact.footer")}
        </p>
      </div>
    </Section>
  );
}
