import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Today's date in YYYY-MM-DD
const TODAY = '2026-09-29';

// Default initial database seed
const INITIAL_DB = {
  users: [
    {
      id: "usr_nishanth_01",
      name: "Nishanth M S",
      email: "nishanth@edudiary.edu",
      password: "password123", // In production hash with bcrypt
      profile_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      created_at: "2026-09-01T08:00:00Z"
    }
  ],
  tasks: [
    {
      id: "tsk_001",
      user_id: "usr_nishanth_01",
      title: "Mathematics Homework & Calculus Problem Set",
      description: "Solve problems 14 through 28 on Multivariable Limits and Partial Derivatives.",
      type: "Homework",
      subject: "Mathematics",
      date: TODAY,
      start_time: "07:30",
      due_time: "09:00",
      priority: "High",
      status: "Completed",
      reminder: "30 minutes before",
      created_at: "2026-09-29T06:00:00Z",
      updated_at: "2026-09-29T09:15:00Z"
    },
    {
      id: "tsk_002",
      user_id: "usr_nishanth_01",
      title: "Data Structures & Algorithms Laboratory",
      description: "Implement AVL Tree balancing rotation in C++ and test insertion edge cases.",
      type: "College",
      subject: "Computer Science",
      date: TODAY,
      start_time: "10:00",
      due_time: "12:30",
      priority: "High",
      status: "Completed",
      reminder: "15 minutes before",
      created_at: "2026-09-29T06:10:00Z",
      updated_at: "2026-09-29T12:35:00Z"
    },
    {
      id: "tsk_003",
      user_id: "usr_nishanth_01",
      title: "Physics Mechanics Lecture & Quiz Prep",
      description: "Review Lagrangian equations and harmonic oscillators for the weekly quiz.",
      type: "Study",
      subject: "Physics",
      date: TODAY,
      start_time: "14:00",
      due_time: "15:30",
      priority: "Medium",
      status: "In Progress",
      reminder: "10 minutes before",
      created_at: "2026-09-29T06:30:00Z",
      updated_at: "2026-09-29T14:00:00Z"
    },
    {
      id: "tsk_004",
      user_id: "usr_nishanth_01",
      title: "Full-Stack React Project Milestone 2",
      description: "Refactor student diary context and test responsive sidebar navigation.",
      type: "Project",
      subject: "Web Development",
      date: TODAY,
      start_time: "16:30",
      due_time: "18:30",
      priority: "High",
      status: "Pending",
      reminder: "1 hour before",
      created_at: "2026-09-29T07:00:00Z",
      updated_at: "2026-09-29T07:00:00Z"
    },
    {
      id: "tsk_005",
      user_id: "usr_nishanth_01",
      title: "Evening Workout & Hydration Track",
      description: "Jogging 4km around campus track and 15 mins stretching.",
      type: "Personal",
      subject: "Fitness",
      date: TODAY,
      start_time: "19:00",
      due_time: "20:00",
      priority: "Low",
      status: "Pending",
      reminder: "None",
      created_at: "2026-09-29T07:15:00Z",
      updated_at: "2026-09-29T07:15:00Z"
    },
    {
      id: "tsk_006",
      user_id: "usr_nishanth_01",
      title: "Night Revision & Daily Diary Reflection",
      description: "Review today's study goals, plan tomorrow's priority schedule, and write diary.",
      type: "Daily Task",
      subject: "General",
      date: TODAY,
      start_time: "21:30",
      due_time: "22:30",
      priority: "Medium",
      status: "Pending",
      reminder: "30 minutes before",
      created_at: "2026-09-29T07:30:00Z",
      updated_at: "2026-09-29T07:30:00Z"
    },
    // Past completed tasks for Weekly & Completed page metrics
    {
      id: "tsk_007",
      user_id: "usr_nishanth_01",
      title: "Chemistry Lab Practical Report",
      description: "Submitted volumetric titration titration calculation sheet.",
      type: "Study",
      subject: "Chemistry",
      date: "2026-09-28",
      start_time: "11:00",
      due_time: "13:00",
      priority: "Medium",
      status: "Completed",
      reminder: "None",
      created_at: "2026-09-28T08:00:00Z",
      updated_at: "2026-09-28T13:00:00Z"
    },
    {
      id: "tsk_008",
      user_id: "usr_nishanth_01",
      title: "English Technical Communication Paper",
      description: "Completed draft on Technical Writing for Software Engineers.",
      type: "Homework",
      subject: "English",
      date: "2026-09-27",
      start_time: "15:00",
      due_time: "17:00",
      priority: "Low",
      status: "Completed",
      reminder: "None",
      created_at: "2026-09-27T09:00:00Z",
      updated_at: "2026-09-27T17:00:00Z"
    },
    {
      id: "tsk_009",
      user_id: "usr_nishanth_01",
      title: "Operating Systems Memory Management Notes",
      description: "Covered Virtual Memory, Paging, and Page Replacement Algorithms.",
      type: "Study",
      subject: "Computer Science",
      date: "2026-09-30",
      start_time: "10:00",
      due_time: "12:00",
      priority: "High",
      status: "Pending",
      reminder: "1 hour before",
      created_at: "2026-09-28T10:00:00Z",
      updated_at: "2026-09-28T10:00:00Z"
    }
  ],
  daily_diary: [
    {
      id: "dia_001",
      user_id: "usr_nishanth_01",
      date: TODAY,
      notes: "Had a productive morning reviewing Multivariable Calculus. Completed the AVL tree lab on time without segmentation faults. Looking forward to completing Milestone 2 of the React project this evening. Need to maintain 8+ hours of focus every day.",
      created_at: "2026-09-29T08:00:00Z",
      updated_at: "2026-09-29T13:45:00Z"
    },
    {
      id: "dia_002",
      user_id: "usr_nishanth_01",
      date: "2026-09-28",
      notes: "Monday started strong. Chemistry lab session was successful. Spent 2 hours reviewing React Hooks and Context API patterns. Consistency is building momentum.",
      created_at: "2026-09-28T21:00:00Z",
      updated_at: "2026-09-28T21:00:00Z"
    }
  ],
  user_settings: [
    {
      id: "set_001",
      user_id: "usr_nishanth_01",
      theme: "light",
      notifications_enabled: true,
      created_at: "2026-09-01T08:00:00Z",
      updated_at: "2026-09-29T08:00:00Z"
    }
  ]
};

// Read database from file
export const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeDB(INITIAL_DB);
      return INITIAL_DB;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file, resetting to initial seed:', err);
    writeDB(INITIAL_DB);
    return INITIAL_DB;
  }
};

// Write database to file synchronously
export const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to database file:', err);
    return false;
  }
};
