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
  { label: "Practical Projects", value: "10+", suffix: "Built", desc: "Live web apps & tools" },
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
    id: "studyflow",
    title: "StudyFlow — Student Study Diary & Tracker",
    badge: "Unit 5 • Project 2 (Live Deployed)",
    subtitle: "Complete academic productivity suite with Pomodoro timer, diary logs, and matrix calendar.",
    description:
      "A feature-rich academic dashboard built with React and Context API. Empowers students to manage deadlines, log daily study diaries, run focused Pomodoro cycles, track weekly horizons, and manage tasks across Kanban and Matrix views.",
    technologies: [
      "React.js",
      "Context API",
      "CSS3 Glassmorphism",
      "Local Storage",
      "Pomodoro Timer",
      "HashRouter",
      "Kanban Board"
    ],
    features: [
      "Interactive 7-day academic horizon planner and monthly calendar matrix",
      "Daily study diary with mood tracking and subject hour analytics",
      "Pomodoro focus timer with automated audio chimes and cycle counters",
      "Responsive sidebar navigation with instant dark/light theme switcher",
      "Full client-side task persistence using local storage"
    ],
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%205%20project%20-%202",
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-5-pro-2/",
    featured: true,
    accentColor: "#6366f1"
  },
  {
    id: "edugrade",
    title: "EduGrade — Student Report Card & SGPA Portal",
    badge: "Unit 5 • Project 1 (Live Deployed)",
    subtitle: "Interactive academic evaluation portal with SGPA calculations and printable grade sheets.",
    description:
      "A comprehensive student performance management portal. Features dynamic SGPA and CGPA computation, subject-wise grade distributions, instant search & filter across cohorts, and printable official student report cards.",
    technologies: [
      "React.js",
      "React Router",
      "State Management",
      "Vanilla CSS",
      "SGPA Engine",
      "Printable Reports"
    ],
    features: [
      "Real-time SGPA calculation based on credit hours and grade points",
      "Student directory with instant multi-attribute search and filtering",
      "Individual student modal with subject mark breakdowns and performance metrics",
      "Printable semester grade reports formatted for official records",
      "Full responsive layout optimized for mobile and desktop screens"
    ],
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%205%20project%20-%201",
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-5-pro-1/",
    featured: true,
    accentColor: "#0ea5e9"
  },
  {
    id: "verification-portal",
    title: "Secure User Verification & KYC Portal",
    badge: "Unit 4 • Project 1 (Live Deployed)",
    subtitle: "Dynamic multi-field registration form with algorithmic regex checks and cascading selectors.",
    description:
      "A production-grade user onboarding and document verification interface. Validates government identity formats (Aadhaar, PAN), verifies phone and email syntaxes, provides cascading state/city selectors, and supports live avatar photo uploads.",
    technologies: [
      "React.js",
      "Regex Validation",
      "FileReader API",
      "Dynamic Dropdowns",
      "Responsive Forms"
    ],
    features: [
      "Live 12-digit Aadhaar and 10-char PAN algorithmic syntax verification",
      "Cascading state-to-city location dropdowns (Karnataka, Maharashtra, Tamil Nadu)",
      "Interactive avatar image upload with real-time preview",
      "Age calculation and 18+ date of birth validation",
      "Real-time validation error tooltips and submission summary modal"
    ],
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%204%20project%20-%201",
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-4-pro-1/",
    featured: true,
    accentColor: "#10b981"
  },
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
      "Risk Scoring"
    ],
    features: [
      "Identity document upload with multi-format support",
      "Webcam live face capture & biometric matching",
      "OCR-based automatic information extraction",
      "MRZ and date validity verification engine",
      "Document tampering and image artifact analysis",
      "SHA-256 cryptographic document hashing",
      "Dynamic risk score generation with alert metrics"
    ],
    github: "https://github.com/nishanthms760/sih-26188-document-screening",
    featured: true,
    accentColor: "#a855f7"
  }
];

export const miniProjects = [
  {
    id: "attendance-tracker",
    title: "Student Attendance & Status Tracker",
    category: "Unit 3 • Project 2",
    icon: "📊",
    description: "Interactive student attendance management system tracking real-time Present/Absent states with cohort filtering and one-click status toggles.",
    tech: ["React.js", "State Toggles", "Filtering", "Modular CSS"],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-3-pro-2/",
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%203%20project%20-%202"
  },
  {
    id: "scientific-calculator",
    title: "Interactive Scientific Calculator",
    category: "Unit 3 • Project 1",
    icon: "🧮",
    description: "Responsive mathematical calculator supporting arithmetic evaluations, clear/reset memory buffers, and custom keyboard interaction.",
    tech: ["React.js", "Math Engine", "Grid Layout", "Key Listeners"],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-3-pro-1/",
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%203%20project%20-1"
  },
  {
    id: "hobby-showcase",
    title: "Hobby & Passion Showcase",
    category: "Unit 2 • Project 2",
    icon: "🎨",
    description: "Component-driven hobby showcase featuring categorized passion cards, interactive skill highlights, and modern visual cards.",
    tech: ["React.js", "Component Architecture", "CSS Cards"],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-2-pro-2/",
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%202%20project%20-%202"
  },
  {
    id: "developer-profile-card",
    title: "Developer Profile & Skill Card",
    category: "Unit 2 • Project 1",
    icon: "💼",
    description: "Modular personal showcase displaying custom Header, About bio, structured skill pills, career goals, and contact links.",
    tech: ["React.js", "Props Flow", "Component Composition"],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-2-pro-1/",
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%202%20Project%20-%201"
  },
  {
    id: "student-grade-card",
    title: "Student Profile Card & Grade Calculator",
    category: "Unit 1 • Project 2",
    icon: "🎓",
    description: "Vanilla HTML & JavaScript dynamic student profile generator that calculates letter grades (A, B, C, F) based on input exam marks.",
    tech: ["HTML5", "Vanilla JavaScript", "DOM Scripting"],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit%20-%201%20project%20-%202.html",
    github: "https://github.com/nishanthms760/Web-Project-"
  },
  {
    id: "counter-app",
    title: "Interactive Counter App",
    category: "Unit 1 • Project 1",
    icon: "⏱️",
    description: "Fast, responsive web counter with increment (+1), decrement (-1), and reset operations built with pure vanilla HTML and JavaScript.",
    tech: ["HTML5", "Vanilla JavaScript", "CSS Styling"],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit%20-%201%20project%20-%201.html",
    github: "https://github.com/nishanthms760/Web-Project-"
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
      "Architected and deployed 10+ live web applications across React and vanilla web engineering units.",
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
    title: "10+ Software & Web Projects Delivered",
    subtitle: "Hands-On Engineering Track",
    icon: "💡",
    desc: "Successfully demonstrated practical web, state-management, and algorithmic problem-solving capabilities across 5 academic engineering units."
  }
];
