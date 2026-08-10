export const NAV_ITEMS = [
  { label: { en: "Home", ar: "الرئيسية" }, index: 0 },
  { label: { en: "About", ar: "من نحن" }, index: 1 },
  { label: { en: "Skills", ar: "المهارات" }, index: 2 },
  { label: { en: "Services", ar: "الخدمات" }, index: 3 },
  { label: { en: "Work", ar: "الأعمال" }, index: 4 },
  { label: { en: "Process", ar: "منهجية العمل" }, index: 5 },
  { label: { en: "Team", ar: "الفريق" }, index: 6 },
  { label: { en: "Contact", ar: "تواصل" }, index: 7 },
];

export const TOTAL_SECTIONS = NAV_ITEMS.length;

export const MEMBER_1 = {
  index: 3,
  memberNo: "Member 01",
  firstName: "Abdelrhman",
  lastName: "Sherif",
  accent: "purple",
  role: { en: "Backend Developer", ar: "مطوّر باك اند" },
  roleColor: "#b88b91",
  image: "member1.jpg",
  bgText: "ABDELRHMAN",
  bio: {
    en: "Backend developer and cybersecurity specialist — building secure APIs, databases and hardened infrastructure.",
    ar: "مطوّر باك اند ومتخصص أمن سيبراني — يبني واجهات برمجية وقواعد بيانات وبنية تحتية محصّنة.",
  },
  github: "https://github.com/OnlySonek",
  linkedin: "https://www.linkedin.com/in/abdelrhman-sherif-5a760b37b/",
  website: "https://abdelrhman-sherif-mohamed.netlify.app",
  tools: [
    "PHP",
    "Laravel",
    "MySQL",
    "SQL",
    "NoSQL",
    "MongoDB",
    "Node.js",
    "REST APIs",
    "Cybersecurity",
    "Penetration Testing",
    "OWASP Top 10",
    "Ethical Hacking",
    "Linux",
    "Git",
    "GitHub",
  ],
  skills: [
    { label: { en: "Backend Development", ar: "تطوير الباك اند" }, value: 95 },
    { label: { en: "Cybersecurity", ar: "الأمن السيبراني" }, value: 92 },
    { label: { en: "Databases", ar: "قواعد البيانات" }, value: 90 },
  ],
};

export const MEMBER_2 = {
  index: 4,
  memberNo: "Member 02",
  firstName: "Seif",
  lastName: "El-sayed",
  accent: "cyan",
  role: { en: "Front End Developer", ar: "مطوّر فرونت اند" },
  roleColor: "#c9a26b",
  image: "member2.jpg",
  bgText: "SEIF",
  bio: {
    en: "Front-end developer crafting interfaces across React, Angular and Vue with pixel-perfect UI and smooth performance.",
    ar: "مطوّر فرونت اند يبني واجهات باستخدام React وAngular وVue بدقة وأداء سلس.",
  },
  github: "https://github.com/seifelsayedofficial",
  linkedin: "https://www.linkedin.com/in/seif-elsayed-dev/",
  website: "https://seif-elsayed.netlify.app",
  tools: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Tailwind",
    "Bootstrap",
    "Figma",
    "Git",
    "GitHub",
  ],
  skills: [
    { label: { en: "Front End", ar: "واجهات أمامية" }, value: 95 },
    { label: { en: "JS Frameworks", ar: "أطر جافاسكريبت" }, value: 92 },
    { label: { en: "UI / Design", ar: "تصميم واجهات" }, value: 88 },
  ],
};

export const MEMBER_3 = {
  index: 5,
  memberNo: "Member 03",
  firstName: { en: "Unknown", ar: "مجهول" },
  lastName: "",
  accent: "gold",
  role: { en: "UI/UX & Graphic Designer", ar: "مصمم UI/UX وجرافيك" },
  roleColor: "#a07840",
  image: null,
  bgText: "UNKNOWN",
  bio: {
    en: "Designs intuitive interfaces and striking visuals — from wireframes to polished brand identities.",
    ar: "يصمم واجهات سهلة الاستخدام وهويات بصرية مميزة — من الهياكل السلكية لحد الهوية الجاهزة.",
  },
  github: "#",
  linkedin: "#",
  website: "#",
  tools: [
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "After Effects",
    "Wireframing",
    "Prototyping",
    "Design Systems",
    "User Research",
  ],
  skills: [
    { label: { en: "UI/UX Design", ar: "تصميم UI/UX" }, value: 93 },
    { label: { en: "Graphic Design", ar: "تصميم جرافيك" }, value: 90 },
    { label: { en: "Prototyping", ar: "النماذج الأولية" }, value: 87 },
  ],
};

export const MARQUEE_TAGS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PHP",
  "MySQL",
  "Tailwind",
  "Figma",
];

export const SKILLS = [
  {
    group: { en: "Frontend", ar: "الواجهات" },
    items: [
      { name: { en: "React / Next.js", ar: "React / Next.js" }, value: 95 },
      { name: { en: "TypeScript", ar: "TypeScript" }, value: 88 },
      { name: { en: "Tailwind CSS", ar: "Tailwind CSS" }, value: 94 },
      { name: { en: "Figma → Code", ar: "Figma → كود" }, value: 86 },
    ],
  },
  {
    group: { en: "Backend", ar: "الخلفية" },
    items: [
      { name: { en: "Node.js / Express", ar: "Node.js / Express" }, value: 90 },
      { name: { en: "PHP", ar: "PHP" }, value: 84 },
      { name: { en: "MySQL", ar: "MySQL" }, value: 86 },
      { name: { en: "REST APIs", ar: "واجهات REST" }, value: 92 },
    ],
  },
  {
    group: { en: "Security & Tools", ar: "الأمان والأدوات" },
    items: [
      { name: { en: "OWASP Top 10", ar: "OWASP Top 10" }, value: 88 },
      { name: { en: "Penetration Testing", ar: "اختبار الاختراق" }, value: 82 },
      { name: { en: "Git / GitHub", ar: "Git / GitHub" }, value: 93 },
      { name: { en: "Performance (CWV)", ar: "الأداء (CWV)" }, value: 90 },
    ],
  },
];

export const SERVICES = [
  {
    icon: "fa-code",
    title: { en: "Web Development", ar: "تطوير الويب" },
    desc: {
      en: "End-to-end web platforms built with modern, scalable architecture and clean code.",
      ar: "منصات ويب متكاملة مبنية بمعمارية عصرية قابلة للتوسع وكود نظيف.",
    },
    items: [
      { en: "React & Next.js", ar: "React & Next.js" },
      { en: "Node.js & PHP", ar: "Node.js & PHP" },
      { en: "REST / MySQL", ar: "REST / MySQL" },
    ],
  },
  {
    icon: "fa-cart-shopping",
    title: { en: "E-Commerce Solutions", ar: "حلول التجارة الإلكترونية" },
    desc: {
      en: "High-performance online stores engineered for speed, conversions and security.",
      ar: "متاجر إلكترونية عالية الأداء مصممة للسرعة والتحويلات والأمان.",
    },
    items: [
      { en: "Custom stores", ar: "متاجر مخصصة" },
      { en: "Payment gateways", ar: "بوابات الدفع" },
      { en: "Inventory systems", ar: "أنظمة المخزون" },
    ],
  },
  {
    icon: "fa-pen-ruler",
    title: { en: "UI/UX & Design", ar: "تصميم الواجهات وتجربة المستخدم" },
    desc: {
      en: "Pixel-perfect interfaces and design systems that elevate brand experience.",
      ar: "واجهات دقيقة وأنظمة تصميم ترتقي بتجربة العلامة التجارية.",
    },
    items: [
      { en: "Figma prototypes", ar: "نماذج أولية في Figma" },
      { en: "Design systems", ar: "أنظمة تصميم" },
      { en: "Responsive layouts", ar: "تصميم متجاوب" },
    ],
  },
  {
    icon: "fa-shield-halved",
    title: { en: "Web Security Auditing", ar: "تدقيق أمان الويب" },
    desc: {
      en: "Proactive penetration testing and hardening to keep your product safe.",
      ar: "اختبار اختراق استباقي وتحصين لحماية منتجك.",
    },
    items: [
      { en: "OWASP Top 10", ar: "OWASP Top 10" },
      { en: "Penetration testing", ar: "اختبار الاختراق" },
      { en: "Security audits", ar: "مراجعات أمنية" },
    ],
  },
  {
    icon: "fa-bolt",
    title: { en: "Performance Optimization", ar: "تحسين الأداء" },
    desc: {
      en: "Core Web Vitals tuning that makes your site fast, smooth and SEO-friendly.",
      ar: "ضبط مؤشرات الويب الأساسية لتجعل موقعك سريعًا وسلسًا ومهيأً لمحركات البحث.",
    },
    items: [
      { en: "Lighthouse 90+", ar: "Lighthouse 90+" },
      { en: "Code splitting", ar: "تقسيم الكود" },
      { en: "Caching strategies", ar: "استراتيجيات التخزين المؤقت" },
    ],
  },
  {
    icon: "fa-gears",
    title: { en: "Custom Web Apps", ar: "تطبيقات ويب مخصصة" },
    desc: {
      en: "Tailored dashboards and SaaS products built around your exact workflow.",
      ar: "لوحات تحكم ومنتجات SaaS مصممة حول سير عملك بدقة.",
    },
    items: [
      { en: "Dashboards", ar: "لوحات التحكم" },
      { en: "SaaS platforms", ar: "منصات SaaS" },
      { en: "Third-party APIs", ar: "واجهات برمجية خارجية" },
    ],
  },
];

export const PROJECTS = [
  {
    name: { en: "Ayat Curtains", ar: "آيات ستائر" },
    category: "E-commerce",
    image: "ayatcurtains.webp",
    description: {
      en: "A high-performance e-commerce solution designed to digitize the textile industry — scalable, fast and secure.",
      ar: "حل تجارة إلكترونية عالي الأداء صُمم لرقمنة صناعة المنسوجات — قابل للتوسع وسريع وآمن.",
    },
    tags: ["React", "Node.js", "PHP", "MySQL", "Tailwind"],
    link: "https://ayatcurtains.com/",
    year: "2025",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: { en: "Discovery", ar: "الاستكشاف" },
    desc: {
      en: "We dig into your goals, audience and constraints to define a sharp scope and success metrics.",
      ar: "نستكشف أهدافك وجمهورك وقيودك لنحدد نطاقًا واضحًا ومؤشرات نجاح.",
    },
  },
  {
    step: "02",
    title: { en: "Design", ar: "التصميم" },
    desc: {
      en: "Wireframes and high-fidelity UI in Figma — tested for usability and aligned with your brand.",
      ar: "هياكل سلكية وواجهات عالية الدقة في Figma — مختبرة لسهولة الاستخدام ومتناسقة مع علامتك.",
    },
  },
  {
    step: "03",
    title: { en: "Build", ar: "البناء" },
    desc: {
      en: "Clean, scalable code with modern stacks, reviewed, tested and optimized for performance.",
      ar: "كود نظيف قابل للتوسع بتقنيات عصرية، مُراجَع ومُختبَر ومُحسَّن للأداء.",
    },
  },
  {
    step: "04",
    title: { en: "Launch & Support", ar: "الإطلاق والدعم" },
    desc: {
      en: "Deployment, analytics, monitoring and continued iteration to keep your product growing.",
      ar: "نشر وتحليلات ومراقبة وتطوير مستمر لإبقاء منتجك في نمو.",
    },
  },
];

export const TESTIMONIALS = [
  {
    quote: {
      en: "Novalyx delivered our e-commerce platform ahead of schedule. The attention to security and performance was outstanding.",
      ar: "قدّمت نوفاليكس منصة التجارة الإلكترونية قبل الموعد. الاهتمام بالأمان والأداء كان استثنائيًا.",
    },
    name: "Ahmed Hassan",
    role: { en: "Founder, AYAT Curtains", ar: "مؤسس، آيات ستائر" },
  },
  {
    quote: {
      en: "Communication was flawless. They translated our vague idea into a clean, fast product our clients love.",
      ar: "التواصل كان مثاليًا. حوّلوا فكرتنا الغامضة إلى منتج نظيف وسريع يعشقه عملاؤنا.",
    },
    name: "Mona Youssef",
    role: { en: "Product Manager", ar: "مديرة منتجات" },
  },
  {
    quote: {
      en: "Rare to find developers who care equally about UI polish and backend solidity. Highly recommended.",
      ar: "من النادر إيجاد مطوّرين يهتمون بجمال الواجهات ومتانة الخلفية بنفس القدر. أنصح بهم بشدة.",
    },
    name: "Karim Adel",
    role: { en: "Startup CTO", ar: "مدير تقني لشركة ناشئة" },
  },
];

export const CONTACT = {
  email: "hello@novalyx.dev",
  phone: "+20 100 000 0000",
  location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
  responseTime: { en: "Replies within 24 hours", ar: "نرد خلال 24 ساعة" },
};
