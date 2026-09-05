export const resumeMeta = {
  // Bump this whenever the content on this page actually changes.
  lastUpdated: 'September 2026',
  tags: ['Résumé', 'B.S. CS · Dec 2027'],
  title: ['Software Engineering,', 'Database & ML', 'Research',],
  name: 'Steven Dang',
  affiliation: 'University of Texas at Arlington · Business Wire',
  phone: '682-716-3199',
  pdfHref: '/resume.pdf',
}

export const highlights = [
  { value: 'UTA', label: 'B.S. Computer Science · 3.72 GPA' },
  { value: 'Prev @ Business Wire', label: 'Software Engineer Intern' },
  { value: 'RDL Research', label: 'Undergraduate ML Researcher' },
  { value: 'Koicha', label: 'Founder, Popup Café' },
]

export const overview =
  "I'm a Computer Science student at the University of Texas at Arlington (3.72 GPA, expected Dec 2027), currently working as an undergraduate ML researcher building retrieval pipelines over relational databases. I spent this past summer as a Software Engineer Intern at Business Wire, and before that founded and ran Koicha, a popup coffee business in Fort Worth."

export const experience = [
  {
    role: 'Undergraduate ML Researcher',
    org: 'University of Texas at Arlington',
    dates: 'Aug 2026 – Present',
    bullets: [
      // TODO: confirm what "RT-J" should read as — left as-is from the resume PDF.
      'Developing a Python and SQL retrieval pipeline to construct representative coresets from multi-table relational databases for RT-J training.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    org: 'Business Wire',
    dates: 'Jun 2026 – Aug 2026',
    bullets: [
      'Shipped 12+ production enhancements and defect fixes for an enterprise publishing platform, improving proofing and editing workflows.',
      'Diagnosed and resolved issues involving stale state, editor synchronization, word highlighting, and scrolling, eliminating all known reproducible cases within the assigned scope.',
      'Developed and validated changes using React, Node.js, Docker, Kubernetes, and Git, collaborating with engineering, QA, and product teams through regression testing and release.',
    ],
  },
  {
    role: 'Owner & Operator — Popup Café Business',
    org: 'Koicha LLC',
    dates: 'May 2025 – Jun 2026',
    bullets: [
      'Founded and scaled a popup café featured in two university news articles, generating 40+ minute customer lines at partner events while recruiting and leading a team of 9 employees.',
      'Built a Python, Flask, and PostgreSQL order-management system that automated order logging, receipts, reporting, and operational dashboards.',
    ],
  },
]

export const research = {
  title: 'Relational Retrieval Pipeline for RT-J Training',
  org: 'University of Texas at Arlington',
  dates: 'Aug 2026 – Present',
  description:
    'Undergraduate research building a Python and SQL retrieval pipeline that constructs representative coresets from multi-table relational databases.',
  bullets: [
    // TODO: add more detail here (motivation, methods, findings) for a fuller write-up —
    // the resume only has the one line above to go on right now.
    'Developing a Python and SQL retrieval pipeline to construct representative coresets from multi-table relational databases for RT-J training.',
  ],
}

export const education = {
  school: 'University of Texas at Arlington',
  degree: 'B.S. in Computer Science · 3.72 / 4.0 GPA',
  dates: 'Expected Dec 2027',
  details: [] as string[],
}

export const skills = [
  { category: 'Languages', items: ['C', 'C++', 'C#', 'Java', 'Python', 'SQL', 'JavaScript'] },
  {
    category: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'Node.js', 'Flask', 'SQLAlchemy', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost'],
  },
  {
    category: 'Systems & Tools',
    items: ['PostgreSQL', 'REST APIs', 'Git', 'Docker', 'Kubernetes', 'Google Cloud Platform', 'Jira', 'CRDTs', 'Yjs'],
  },
]
