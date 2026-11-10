/* Identity and career facts. Sources are noted beside anything that is not
   self-evident. Where the owner's own records disagree (a start date, a title)
   the entry is left without the disputed detail instead of picking one. */

export const SITE = {
  origin: "https://sm.meertech.tech",
  name: "Mahmud Sani Madobi",
  short: "Mahmud Madobi",
  role: "AI Systems Engineer and Software Architect",
  title: "Founder and CEO, MeerTech Ltd",
  location: "Abuja, Nigeria",
  email: "sanimahmudmadobi@gmail.com",
  github: "https://github.com/MEERTECHLTD",
  linkedin: "https://www.linkedin.com/in/mahmud-madobi/",
  company: "https://www.meertech.tech",
  x: "https://x.com/MEERTECHLtd",
  tagline: "Building intelligent systems for the real world.",
  description:
    "Mahmud Sani Madobi is an AI systems engineer and software architect, and the founder and CEO of MeerTech Ltd in Abuja, Nigeria. He builds and operates production systems for energy, finance and data under real-world constraints.",
} as const;

export const NAV = [
  { label: "Work", href: "/work" },
  { label: "Stack", href: "/#stack" },
  { label: "Experience", href: "/#experience" },
  { label: "Writing", href: "/writing" },
  { label: "Résumé", href: "/resume" },
];

export const PRINCIPLES = [
  { name: "Correctness before speed", text: "Money paths are made un-replayable before they are made fast: double-entry ledgers that refuse unbalanced entries, and idempotency keys on every state change." },
  { name: "Offline is the operating condition", text: "State lives on the device first and reconciles when it can. A device offline for eleven days syncs the same way as one offline for eleven seconds." },
  { name: "Absence is a value", text: "Where an input is missing, the system says so and says why. It does not fill the gap with an estimate that looks like a measurement." },
  { name: "AI inside a boundary", text: "A model proposes; deterministic code decides. No model writes to a system of record, moves money or invents a missing input." },
  { name: "Deny by default", text: "Access is refused unless granted, enforced at the row in the database, so a new screen cannot forget a permission check." },
  { name: "Production is the proof", text: "A system is finished when someone depends on it. Until then it is called what it is: built, functional, or a prototype." },
] as const;

export interface Role { role: string; org: string; when: string; where?: string; note: string }
/* Titles and dates as published on the owner's LinkedIn profile, read 10 November 2026. */
export const EXPERIENCE: Role[] = [
  { role: "Founder and CEO", org: "MeerTech Ltd", when: "Present", where: "Abuja, Nigeria", note: "Founded and leads an engineering company that builds and operates software for energy, agriculture, trade, finance and the public sector. Designs the architecture of its products and client systems and runs them in production." },
  { role: "Software Engineer, part-time", org: "a solar mini-grid developer in Nigeria", when: "2022 to 2026", note: "Software engineering for the operations of a solar mini-grid developer." },
  { role: "Digitalisation Consultant, contract", org: "GIZ Nigeria and ECOWAS", when: "2025", note: "Digital maturity assessments and hands-on tool setup for small businesses on a digital transformation programme." },
  { role: "NYSC Intern, 5G Team", org: "Huawei", when: "2025", where: "Abuja, Nigeria", note: "National service year placement in the Service Experience Department." },
  { role: "Backend and AI Engineer, trainee", org: "MIDS Dynamics Ltd", when: "2024 to 2025", note: "Backend and AI engineering as a trainee." },
  { role: "Student Intern", org: "Blue Sapphire Hub", when: "2023 to 2024", where: "Kano, Nigeria", note: "Internship at a technology hub." },
];

export const LEADERSHIP = [{ role: "Vice President, Student Union Government", org: "Federal University Dutsin-Ma", when: "2023 to 2024" }];

export const EDUCATION = [
  { what: "MSc Financial Engineering", where: "WorldQuant University", when: "In progress" },
  { what: "BSc Computer Science and Information Technology", where: "Federal University Dutsin-Ma", when: "2024" },
  { what: "Software Engineering programme", where: "ALX Africa", when: "2025" },
  { what: "Applied Data Science Lab", where: "WorldQuant University", when: "2025" },
  { what: "Aspire Leaders Program", where: "Aspire Institute", when: "2025" },
];

export const CREDENTIALS = [
  { what: "HCIP-AI", where: "Huawei", when: "2025" },
  { what: "Certified Backend Engineer", where: "ALX Africa", when: "2025" },
  { what: "Member", where: "Association for the Advancement of Artificial Intelligence (AAAI)", when: "2026" },
  { what: "Member", where: "Association for Computing Machinery (ACM)", when: "2026" },
  { what: "Global member", where: "Internet Society", when: "2026" },
];

/* The stack, each item tied to a system on this site that uses it. */
export const STACK: { group: string; line: string; items: { name: string; used: string[] }[] }[] = [
  { group: "AI and machine learning", line: "Models and agents kept inside deterministic boundaries.", items: [
    { name: "Python", used: ["exportflow", "aditusos", "nmas"] }, { name: "TensorFlow and Keras", used: ["maizeguard"] },
    { name: "Model Context Protocol", used: ["clearmind", "meridian-books"] }, { name: "Gemini API", used: ["clearmind"] },
    { name: "OCR and document extraction", used: ["exportflow", "document-verification-backend"] }, { name: "Agent safety gates", used: ["agentic-wallets"] },
  ] },
  { group: "Backend", line: "Modular monoliths with the rules in the database.", items: [
    { name: "FastAPI", used: ["ranawallet", "exportflow", "aditusos", "meridian-books", "msiv", "nmas"] }, { name: "Node.js and TypeScript", used: ["minigrid-monitoring"] },
    { name: "REST APIs", used: ["clearmind", "ranawallet"] }, { name: "WebSockets", used: ["minigrid-monitoring"] }, { name: "USSD and SMS", used: ["ranawallet"] },
  ] },
  { group: "Data", line: "PostgreSQL first, with the right extension for the job.", items: [
    { name: "PostgreSQL", used: ["ranawallet", "exportflow", "aditusos", "meridian-books", "msiv"] }, { name: "PostGIS", used: ["agricultural-intelligence", "aditusos"] },
    { name: "TimescaleDB", used: ["aditusos"] }, { name: "InfluxDB", used: ["minigrid-monitoring"] }, { name: "SQLite and SQLCipher", used: ["salcollect", "wisdomsigma-ciu"] },
    { name: "Redis", used: ["ranawallet"] }, { name: "SQLAlchemy and Alembic", used: ["meridian-books", "document-verification-backend"] }, { name: "Prisma", used: ["agricultural-intelligence"] },
  ] },
  { group: "Frontend and mobile", line: "Web consoles and field apps that work offline.", items: [
    { name: "React and Next.js", used: ["exportflow", "ranawallet", "agricultural-intelligence", "salcollect"] }, { name: "React Native and Expo", used: ["ranawallet", "salcollect", "wisdomsigma-ciu", "msiv"] },
    { name: "TypeScript", used: ["clearmind", "wisdomsigma-ciu"] }, { name: "Kotlin (native modules)", used: ["msiv"] }, { name: "MapLibre and deck.gl", used: ["agricultural-intelligence"] },
  ] },
  { group: "Infrastructure and IoT", line: "Small, legible deployments and the protocols devices already speak.", items: [
    { name: "Docker", used: ["msiv", "meridian-books", "agentic-wallets"] }, { name: "nginx", used: ["sts-prepayment-integration"] }, { name: "MQTT", used: ["minigrid-monitoring"] },
    { name: "DLMS/COSEM over Bluetooth", used: ["wisdomsigma-ciu"] }, { name: "GitHub Actions", used: ["remote-portal", "prepaid-vending-wallet"] },
  ] },
  { group: "Security", line: "Enforced where the data lives.", items: [
    { name: "Row-level security", used: ["exportflow", "remote-portal"] }, { name: "Schema per tenant", used: ["aditusos"] }, { name: "Idempotency keys", used: ["ranawallet"] },
    { name: "Append-only audit and hash chains", used: ["salcollect", "msiv"] }, { name: "AES-GCM", used: ["wisdomsigma-ciu"] }, { name: "OAuth scoped tokens", used: ["clearmind"] },
  ] },
];
