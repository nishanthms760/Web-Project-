export const personalInfo = {
  name: "Nishanth M S",
  role: "Computer Science Engineering Student",
  roleSubtitle: "Aspiring Software Engineer & Full-Stack Developer",
  year: "2nd Year B.E. CSE",
  college: "Prince Dr. K. Vasudevan College of Engineering and Technology (PDKVCET)",
  collegeShort: "PDKVCET, Chennai",
  graduation: "2029",
  cgpa: "8.6",
  location: "Chennai, Tamil Nadu, India",
  careerGoal: "Software Engineer / Full-Stack Developer",
  availability: "Open to Internship opportunities (On-site & Remote)",
  about:
    "I am a 2nd-year Computer Science Engineering student passionate about software development and building practical technology solutions. I have experience with Java, Python, HTML, CSS, JavaScript, GitHub, and React, and I enjoy developing web applications and solving programming problems. I am currently strengthening my skills in full-stack development, data structures, databases, and modern web technologies while preparing for software engineering internships and placements.",
  githubUsername: "nishanthms760",
  githubUrl: "https://github.com/nishanthms760",
  linkedinUrl: "https://www.linkedin.com/in/nishanthms760",
  email: "nishanthms760@gmail.com",
  phone: "+91 98765 43210"
};

export const stats = [
  { label: "Current CGPA", value: "8.6", suffix: "/ 10", desc: "Top tier academic record" },
  { label: "Year & Degree", value: "2nd", suffix: "Year B.E.", desc: "Computer Science & Eng." },
  { label: "Practical Projects", value: "8+", suffix: "Built", desc: "Web, AI & full-stack apps" },
  { label: "Availability", value: "Immediate", suffix: "Intern", desc: "Remote or Chennai onsite" }
];

export const skillsData = {
  programming: [
    { name: "Java", level: 85, icon: "☕", note: "OOP, Core Java & DSA" },
    { name: "Python", level: 80, icon: "🐍", note: "Scripting, Logic & AI tools" },
    { name: "JavaScript (ES6+)", level: 85, icon: "⚡", note: "DOM, Async & Modern syntax" },
    { name: "OOP Principles", level: 88, icon: "🧱", note: "Encapsulation, Inheritance & Design" },
    { name: "Data Structures & Algorithms", level: 78, icon: "🌲", note: "Arrays, Trees, Graphs, Sorting" },
    { name: "Problem Solving", level: 85, icon: "🧩", note: "Algorithmic thinking & Optimization" }
  ],
  webDevelopment: [
    { name: "HTML5", level: 95, icon: "🌐", note: "Semantic layout, accessibility, SEO" },
    { name: "CSS3", level: 90, icon: "🎨", note: "Flexbox, Grid, Animations, Variables" },
    { name: "JavaScript", level: 85, icon: "💻", note: "Interactive web logic & event flow" },
    { name: "React.js", level: 82, icon: "⚛️", note: "Hooks, Context, State & Modular UI" },
    { name: "Responsive Web Design", level: 92, icon: "📱", note: "Mobile-first & multi-device UX" },
    { name: "REST API Basics", level: 80, icon: "🔌", note: "Fetch, Axios, JSON & CRUD endpoints" }
  ],
  database: [
    { name: "SQL", level: 82, icon: "🗄️", note: "Queries, joins, grouping & indexing" },
    { name: "MySQL", level: 80, icon: "🐬", note: "Relational schema & transaction logic" },
    { name: "DBMS", level: 84, icon: "📊", note: "Database normalization & ACID concepts" }
  ],
  tools: [
    { name: "Git", level: 85, icon: "🌿", note: "Branching, commits, rebasing & PRs" },
    { name: "GitHub", level: 88, icon: "🐙", note: "Repos, workflows, collaboration" },
    { name: "VS Code", level: 90, icon: "🛠️", note: "Extensions, debugging & workflow" },
    { name: "MS Office", level: 88, icon: "📄", note: "Documentation, slides & spreadsheets" }
  ],
  currentlyLearning: [
    { name: "Advanced React", icon: "🚀", desc: "Custom hooks, performance profiling, compound components" },
    { name: "Full-Stack Development", icon: "🔄", desc: "End-to-end client, server & API architectures" },
    { name: "Backend Development", icon: "⚙️", desc: "Node.js, Express, FastAPI server design" },
    { name: "AI/ML Integration", icon: "🤖", desc: "Integrating intelligent models into web interfaces" },
    { name: "Cloud Deployment", icon: "☁️", desc: "Containerization, Vercel, Docker & CI/CD" }
  ]
};

export const featuredProjects = [
  {
    id: "sih-26188",
    title: "AI-Based Fake Identity & Document Screening System",
    badge: "Smart India Hackathon 2026 • PS 26188",
    subtitle: "AI-powered forensic document tampering and biometric verification platform.",
    description:
      "A document verification and identity screening system designed to detect potentially fraudulent identity documents. Engineered to detect forgeries, automate OCR data extraction, analyze tamper risk scores, and perform face biometric comparison.",
    technologies: [
      "React",
      "Python",
      "FastAPI",
      "OCR",
      "SHA-256",
      "Face Verification",
      "MRZ Validation",
      "Image Analysis",
      "Risk Scoring",
      "Docker",
      "SQLite"
    ],
    features: [
      "Identity document upload with multi-format support",
      "Webcam live face capture & biometric matching",
      "OCR-based automatic information extraction",
      "MRZ and date validity verification engine",
      "Document tampering and image artifact analysis",
      "SHA-256 cryptographic document hashing",
      "Dynamic risk score generation with alert metrics",
      "Comprehensive audit trail log for screening history"
    ],
    github: "https://github.com/nishanthms760/sih-26188-document-screening",
    featured: true,
    accentColor: "#6366f1"
  },
  {
    id: "college-website",
    title: "College Website",
    badge: "Academic Web Project",
    subtitle: "Modern, responsive institutional web portal for academic discovery.",
    description:
      "A responsive college website developed as a practical web-development project. Features comprehensive information architecture, responsive department catalogs, admissions portal preview, and interactive campus highlights.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Responsive layout optimized across desktop, tablet, and mobile screens",
      "Structured navigation with department directories and syllabus overviews",
      "Interactive events banner and campus news feed",
      "Admissions inquiry form with client-side verification",
      "Lightweight Vanilla CSS animations and accessible UI patterns"
    ],
    github: "https://github.com/nishanthms760/college-website",
    featured: true,
    accentColor: "#0ea5e9"
  }
];

export const miniProjects = [
  {
    id: "todo-app",
    title: "Todo Application",
    category: "React State & Storage",
    icon: "📋",
    description: "Task management application featuring local storage persistence, priority tagging, and dynamic filter states (Active, Completed, All).",
    tech: ["React.js", "LocalStorage", "CSS Modules"]
  },
  {
    id: "feedback-wall",
    title: "Feedback Wall",
    category: "Interactive Community Board",
    icon: "💬",
    description: "Community feedback and sentiment board with real-time feedback submissions, star rating analytics, and sentiment categorization.",
    tech: ["React.js", "State Lifting", "Transitions"]
  },
  {
    id: "student-context",
    title: "Student Context Application",
    category: "Global State Architecture",
    icon: "🎓",
    description: "Demonstration of React Context API for global student record state management without prop drilling across deeply nested views.",
    tech: ["React Context API", "useReducer", "CRUD"]
  },
  {
    id: "blood-locator",
    title: "Community Blood Donation Locator",
    category: "Civic & Healthcare Tech",
    icon: "🩸",
    description: "Emergency blood donor prototype linking hospital requests with registered local donors filtered by blood group and geographic location.",
    tech: ["React.js", "Geo Filter", "Mock API"]
  },
  {
    id: "api-integration",
    title: "React API Integration Hub",
    category: "Asynchronous Networking",
    icon: "📡",
    description: "Live data retrieval engine with search debounce, error boundaries, request retry logic, and skeleton loading animations.",
    tech: ["React.js", "Async/Await", "REST API"]
  },
  {
    id: "fetch-axios",
    title: "Fetch vs Axios Demonstrator",
    category: "Network Engineering",
    icon: "⚡",
    description: "Comparative architecture sandbox highlighting differences in HTTP clients, request/response interceptors, and timeout handling.",
    tech: ["Fetch API", "Axios", "Error Handlers"]
  }
];

export const educationData = [
  {
    degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering",
    institution: "Prince Dr. K. Vasudevan College of Engineering and Technology (PDKVCET)",
    location: "Chennai, Tamil Nadu",
    period: "2025 - 2029 (Expected)",
    score: "CGPA: 8.6 / 10.0",
    status: "Currently in 2nd Year",
    details: [
      "Consistent academic performance maintaining an 8.6 CGPA across core engineering disciplines.",
      "Core coursework: Data Structures, Object-Oriented Programming with Java, Database Management Systems, Computer Networks, and Web Technologies.",
      "Active participant in technical symposiums, hackathons, and software development challenges."
    ]
  }
];

export const certificationsData = [
  {
    title: "Introduction to Java",
    issuer: "Infosys Springboard",
    badge: "Official Certification",
    icon: "☕",
    color: "#f59e0b",
    skills: ["Java Fundamentals", "Object-Oriented Programming", "Exception Handling", "Collections Framework"],
    desc: "Comprehensive coursework covering Java programming concepts, syntax, class hierarchies, interfaces, and problem-solving fundamentals."
  },
  {
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    badge: "Official Certification",
    icon: "🌐",
    color: "#3b82f6",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Client-Side Engineering"],
    desc: "Rigorous curriculum focused on semantic markup, responsive design principles, web standards, and JavaScript application fundamentals."
  },
  {
    title: "Continuous Programming & Web Engineering",
    issuer: "Self-Driven & Project-Based Curriculum",
    badge: "Hands-on Practice",
    icon: "🚀",
    color: "#10b981",
    skills: ["React.js", "RESTful Architecture", "Git & GitHub", "Algorithmic Problem Solving"],
    desc: "Dedicated self-paced specialization focusing on building full-scale web applications, state management, and modern component architectures."
  }
];

export const experienceData = [
  {
    role: "Project Developer / Hackathon Finalist",
    organization: "Smart India Hackathon 2026",
    period: "2026",
    type: "National Level Initiative",
    details: [
      "Developed Problem Statement 26188: AI-Based Fake Identity & Document Screening System.",
      "Engineered full pipeline including document upload, OCR extraction, MRZ verification, tamper score modeling, and face biometric comparison.",
      "Built interactive React client integrated with Python FastAPI backend services and SQLite audit storage."
    ]
  },
  {
    role: "Full-Stack & Web Developer (Independent Practice)",
    organization: "Academic & Personal Projects",
    period: "2025 - Present",
    type: "Practical Development",
    details: [
      "Architected and deployed 8+ web applications including responsive college website and React utility ecosystems.",
      "Applied modern software development standards: version control with Git/GitHub, modular component architecture, and responsive design.",
      "Practiced data structure problem solving and object-oriented programming in Java and Python."
    ]
  }
];

export const achievementsData = [
  {
    title: "Smart India Hackathon (SIH 2026) Project Solution",
    subtitle: "Problem Statement 26188 Solution Developer",
    icon: "🏆",
    desc: "Built a complete forensic document authenticity and facial biometric identity screening platform."
  },
  {
    title: "Academic Excellence — 8.6 CGPA",
    subtitle: "2nd Year B.E. Computer Science",
    icon: "⭐",
    desc: "Recognized for strong analytical aptitude and continuous consistency in Computer Science coursework."
  },
  {
    title: "8+ Software & Web Projects Delivered",
    subtitle: "Hands-On Engineering Track",
    icon: "💡",
    desc: "Successfully demonstrated practical web, state-management, and algorithmic problem-solving capabilities."
  }
];
