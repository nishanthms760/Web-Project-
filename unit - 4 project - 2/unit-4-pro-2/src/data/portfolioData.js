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

export const allProjects = [
  {
    id: "studyflow",
    title: "StudyFlow — Student Study Diary & Tracker",
    unit: "unit-5",
    badge: "Unit 5 • Project 2",
    badgeType: "live",
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
    unit: "unit-5",
    badge: "Unit 5 • Project 1",
    badgeType: "live",
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
    unit: "unit-4",
    badge: "Unit 4 • Project 1",
    badgeType: "live",
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
    unit: "hackathon",
    badge: "SIH 2026 • Problem Statement 26188",
    badgeType: "flagship",
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
  },
  {
    id: "attendance-tracker",
    title: "Student Attendance & Status Tracker",
    unit: "unit-3",
    badge: "Unit 3 • Project 2",
    badgeType: "live",
    subtitle: "Interactive attendance management system tracking real-time student statuses.",
    description:
      "A React student attendance tracker providing real-time tracking of Present and Absent students with cohort-wide filtering and one-click attendance status toggles.",
    technologies: ["React.js", "State Toggles", "Filtering", "Modular CSS"],
    features: [
      "Interactive student attendance management system",
      "Real-time Present/Absent states tracking",
      "Instant cohort search and status filter",
      "One-click attendance status toggles"
    ],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-3-pro-2/",
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%203%20project%20-%202",
    featured: false,
    accentColor: "#06b6d4"
  },
  {
    id: "scientific-calculator",
    title: "Interactive Scientific Calculator",
    unit: "unit-3",
    badge: "Unit 3 • Project 1",
    badgeType: "live",
    subtitle: "Responsive mathematical calculator with arithmetic evaluations and key listeners.",
    description:
      "A responsive mathematical calculator supporting arithmetic evaluations, clear/reset memory buffers, and custom keyboard interaction for students and developers.",
    technologies: ["React.js", "Math Engine", "Grid Layout", "Key Listeners"],
    features: [
      "Arithmetic calculations and instant formula evaluation",
      "Clear, reset, and memory operations",
      "Responsive tactile calculator keypad layout",
      "Keyboard event support for rapid math input"
    ],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-3-pro-1/",
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%203%20project%20-1",
    featured: false,
    accentColor: "#f59e0b"
  },
  {
    id: "hobby-showcase",
    title: "Hobby & Passion Showcase",
    unit: "unit-2",
    badge: "Unit 2 • Project 2",
    badgeType: "live",
    subtitle: "Component-driven hobby showcase featuring categorized passion cards.",
    description:
      "A component-driven showcase highlighting creative pursuits and technical hobbies with rich card layouts, interactive badges, and responsive multi-device design.",
    technologies: ["React.js", "Component Architecture", "CSS Cards"],
    features: [
      "Categorized interest and hobby profile showcase",
      "Interactive cards with responsive grid flow",
      "Clean component separation and custom styling",
      "Multi-device viewport adaptation"
    ],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-2-pro-2/",
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%202%20project%20-%202",
    featured: false,
    accentColor: "#ec4899"
  },
  {
    id: "developer-profile-card",
    title: "Developer Profile & Skill Card",
    unit: "unit-2",
    badge: "Unit 2 • Project 1",
    badgeType: "live",
    subtitle: "Modular personal showcase with Header, About, structured skill pills, and goals.",
    description:
      "A modular personal developer showcase displaying custom Header, About bio, structured skill pills, career goals, and professional contact links.",
    technologies: ["React.js", "Props Flow", "Component Composition"],
    features: [
      "Modular personal developer showcase",
      "Structured skill pills and expertise metrics",
      "Career objective and educational background cards",
      "Direct social and professional contact links"
    ],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit-2-pro-1/",
    github: "https://github.com/nishanthms760/Web-Project-/tree/main/unit%20-%202%20Project%20-%201",
    featured: false,
    accentColor: "#8b5cf6"
  },
  {
    id: "student-grade-card",
    title: "Student Profile Card & Grade Calculator",
    unit: "unit-1",
    badge: "Unit 1 • Project 2",
    badgeType: "live",
    subtitle: "Vanilla HTML & JavaScript dynamic student profile generator with letter grades.",
    description:
      "A lightweight, zero-dependency student profile card generator that dynamically computes letter grades (A, B, C, F) based on input exam marks.",
    technologies: ["HTML5", "Vanilla JavaScript", "DOM Scripting"],
    features: [
      "Dynamic student profile card generator",
      "Automated letter grade calculation (A, B, C, F) based on input marks",
      "Pure client-side DOM manipulation without external libraries",
      "Clean responsive card display"
    ],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit%20-%201%20project%20-%202.html",
    github: "https://github.com/nishanthms760/Web-Project-",
    featured: false,
    accentColor: "#14b8a6"
  },
  {
    id: "counter-app",
    title: "Interactive Counter App",
    unit: "unit-1",
    badge: "Unit 1 • Project 1",
    badgeType: "live",
    subtitle: "Pure vanilla HTML & JavaScript interactive counter with +/- and reset.",
    description:
      "Fast, responsive web counter with increment (+1), decrement (-1), and reset operations built with pure vanilla HTML and JavaScript.",
    technologies: ["HTML5", "Vanilla JavaScript", "CSS Styling"],
    features: [
      "Interactive numerical counter with increment (+1) and decrement (-1)",
      "Instant reset to zero functionality",
      "Visual feedback and responsive buttons",
      "Lightweight, zero-dependency pure vanilla implementation"
    ],
    demoUrl: "https://nishanthms760.github.io/Web-Project-/unit%20-%201%20project%20-%201.html",
    github: "https://github.com/nishanthms760/Web-Project-",
    featured: false,
    accentColor: "#f97316"
  }
];

// Backward compatibility exports
export const featuredProjects = allProjects.filter(p => p.featured);
export const miniProjects = allProjects.filter(p => !p.featured);
