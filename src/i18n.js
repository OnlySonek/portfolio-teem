export const LANGS = ["en", "ar"];

export function pick(lang, value) {
  if (value && typeof value === "object") {
    if (value[lang] !== undefined) return value[lang];
    if (value.en !== undefined) return value.en;
  }
  return value;
}

export const STRINGS = {
  en: {
    nav: {
      letsTalk: "Let's Talk",
      langToggle: "Switch to Arabic",
      themeToggle: "Toggle theme",
      menuToggle: "Toggle menu",
    },
    hero: {
      badge: "Available for new projects",
      line1: "We build",
      line2: "modern web",
      line3: "experiences that perform.",
      sub: "Full-stack duo crafting fast, secure and beautiful digital products — from landing pages to complex platforms.",
      ctaWork: "View Our Work",
      ctaContact: "Contact Us",
    },
    about: {
      eyebrow: "/ About us",
      title: "Two developers,",
      title2: "one",
      grad: "obsession",
      title3: "for quality.",
      p1: "combine deep full-stack experience with a security-first mindset. We design, build and ship products that look great, load fast and hold up under pressure.",
      p2: "From pixel-perfect UI to hardened backends, we own the whole journey — so you get a cohesive product, not a patchwork.",
      and: "and",
    },
    stats: {
      years: "Years combined",
      projects: "Projects shipped",
      tech: "Technologies",
      satisfaction: "Client satisfaction",
    },
    skills: {
      eyebrow: "/ Our stack",
      title: "Skills &",
      grad: "expertise",
    },
    services: {
      eyebrow: "/ What we do",
      title: "Services that",
      grad: "scale",
      title2: "with you",
    },
    work: {
      eyebrow: "/ Selected work",
      title: "Projects we're",
      grad: "proud of",
    },
    process: {
      eyebrow: "/ How we work",
      title: "A process that",
      grad: "delivers",
    },
    team: {
      eyebrow: "/ The team",
      title: "The minds behind",
      grad: "Novalyx",
      workWithUs: "Work with us",
    },
    contact: {
      eyebrow: "/ Get in touch",
      title: "Let's build something",
      grad: "great",
      sub: "Have a project in mind? Tell us about it and we'll get back to you within 24 hours.",
      email: "Email",
      location: "Location",
      name: "Your name",
      namePlaceholder: "John Doe",
      emailPlaceholder: "john@example.com",
      details: "Project details",
      detailsPlaceholder: "Tell us about your project, timeline and budget…",
      send: "Send message",
      sent: "Message sent — we'll reply soon!",
      footer: "Built with care.",
    },
    marquee: "Novalyx",
  },
  ar: {
    nav: {
      letsTalk: "لنتحدث",
      langToggle: "التبديل إلى الإنجليزية",
      themeToggle: "تبديل المظهر",
      menuToggle: "فتح القائمة",
    },
    hero: {
      badge: "متاحون لمشاريع جديدة",
      line1: "نبني",
      line2: "تجارب ويب",
      line3: "عصرية تحقق أداءً استثنائيًا.",
      sub: "ثنائي تطوير فول ستاك يصنع منتجات رقمية سريعة وآمنة وجميلة — من صفحات الهبوط إلى المنصات المعقدة.",
      ctaWork: "شاهد أعمالنا",
      ctaContact: "تواصل معنا",
    },
    about: {
      eyebrow: "/ من نحن",
      title: "مطوّران،",
      title2: "وشغف",
      grad: "واحد",
      title3: "بالجودة.",
      p1: "يجمعان خبرة عميقة في تطوير فول ستاك مع عقلية تركّز على الأمان. نصمم ونبني ونطلق منتجات رائعة، سريعة التحميل وقادرة على الصمود تحت الضغط.",
      p2: "من واجهات دقيقة إلى أنظمة خلفية محصّنة، نتحكم في الرحلة كاملة — لتحصل على منتج متكامل، لا ترميمات متفرقة.",
      and: "و",
    },
    stats: {
      years: "سنوات خبرة",
      projects: "مشروع مُسلَّم",
      tech: "تقنية",
      satisfaction: "رضا العملاء",
    },
    skills: {
      eyebrow: "/ مهاراتنا",
      title: "المهارات",
      grad: "والخبرة",
    },
    services: {
      eyebrow: "/ ماذا نقدم",
      title: "خدمات",
      grad: "تنمو",
      title2: "معك",
    },
    work: {
      eyebrow: "/ أعمال مختارة",
      title: "مشاريع",
      grad: "نفخر بها",
    },
    process: {
      eyebrow: "/ كيف نعمل",
      title: "منهجية",
      grad: "تحقق النتائج",
    },
    team: {
      eyebrow: "/ الفريق",
      title: "العقول وراء",
      grad: "نوفاليكس",
      workWithUs: "اعمل معنا",
    },
    contact: {
      eyebrow: "/ تواصل معنا",
      title: "لنبنِ شيئًا",
      grad: "عظيمًا",
      sub: "لديك مشروع في بالك؟ أخبرنا عنه وسنرد عليك خلال 24 ساعة.",
      email: "البريد الإلكتروني",
      location: "الموقع",
      name: "اسمك",
      namePlaceholder: "محمد أحمد",
      emailPlaceholder: "example@email.com",
      details: "تفاصيل المشروع",
      detailsPlaceholder: "حدثنا عن مشروعك والجدول الزمني والميزانية…",
      send: "أرسل الرسالة",
      sent: "تم الإرسال — سنرد قريبًا!",
      footer: "صُنع بعناية.",
    },
    marquee: "نوفاليكس",
  },
};

function resolve(dict, key) {
  return key
    .split(".")
    .reduce((acc, part) => (acc && typeof acc === "object" ? acc[part] : undefined), dict);
}

export function t(lang, key) {
  return resolve(STRINGS[lang], key) ?? resolve(STRINGS.en, key) ?? key;
}
