export const profile = {
  name: 'Steven Dang',
  initials: 'SD',
  role: 'Computer Science Student & Software Engineer',
  location: 'Fort Worth / Arlington, TX',
  email: 'steven.phihung.dang@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/StevenPDang' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/stevenpdang' },
  ],
}

export const marqueeText = ''

export const statement = {
  heading: ['Systems-minded,', 'coffee-fueled,', 'always building.'],
  body: [
    "Hi, I'm Steven, a Computer Science student at the University of Texas at Arlington (3.72 GPA, expected Dec 2027), currently working as an undergraduate ML researcher building retrieval pipelines over relational databases. This past summer I interned as a Software Engineer at Business Wire, shipping production fixes for an enterprise publishing platform used by news organizations worldwide.",
    'Before that, I founded and ran Koicha, a popup coffee business in Fort Worth featured in two University Articles.',
  ],
}

export const timeline = [
  {
    year: 'UTA',
    title: 'B.S. Computer Science',
    description: 'University of Texas at Arlington · 3.72 GPA · expected Dec 2027.',
  },
  {
    year: '2025–26',
    title: 'Founder — Koicha Popup Café',
    description: 'Grew a team of 9 and built a Python/Flask/PostgreSQL order-management system; featured in two university news articles.',
  },
  {
    year: 'Summer 2026',
    title: 'Software Engineer Intern — Business Wire',
    description: 'Shipped 12+ production enhancements for an enterprise publishing platform used by news organizations worldwide.',
  },
  {
    year: 'Now',
    title: 'Undergraduate ML Researcher — UTA',
    description: 'Building a retrieval pipeline to construct representative coresets from multi-table relational databases.',
  },
]

export const services = [
  {
    label: '01',
    title: 'Full-Stack Engineering',
    description: 'Production features across React, Node.js, and Flask — most recently shipping fixes at Business Wire.',
  },
  {
    label: '02',
    title: 'Database Research',
    description: 'Undergraduate research building retrieval pipelines over multi-table relational databases for ML training.',
  },
  {
    label: '03',
    title: 'Systems & Products',
    description: 'End-to-end systems — from a self-hostable POS platform to the order-management stack behind a coffee business.',
  },
]

export const projects = [
  {
    title: 'OpenLedger POS',
    tag: 'Full-Stack',
    description:
      'A self-hostable point-of-sale system with a modular Flask/PostgreSQL backend and a React + Tailwind frontend — an open alternative to centralized SaaS platforms.',
    href: '#',
  },
  {
    title: 'Relational Retrieval Pipeline',
    tag: 'Research',
    description:
      'A Python/SQL pipeline that builds representative coresets from multi-table relational databases for relational transformer training.',
    href: '#',
  },
  {
    title: 'Lexical — Open Source',
    tag: 'Open Source',
    description:
      "Contributed fixes to Meta's Lexical editor — Markdown shortcuts, history management, and plugin behavior — in its TypeScript/React monorepo.",
    href: 'https://github.com/facebook/lexical',
  },
]

export const personal = {
  label: 'Off the Clock',
  heading: 'Coffee, brewed on weekends.',
  body: 'Before Business Wire, I founded Koicha — a popup coffee business in Fort Worth that grew a team of nine and drew 40+ minute lines at partner events.',
  // TODO: drop in photos from the pop-up here once you have them ready.
}
