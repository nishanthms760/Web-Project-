import express from 'express';
import cors from 'cors';
import { readDB, writeDB } from './db.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Helper: Extract current user id (defaults to seed user if no auth header)
const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return 'usr_nishanth_01'; // Default active student session
};

// -------------------------------------------------------------
// AUTHENTICATION ENDPOINTS
// -------------------------------------------------------------

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const db = readDB();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'A student account with this email already exists.' });
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email,
    password,
    profile_image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    created_at: new Date().toISOString()
  };

  db.users.push(newUser);

  // Initialize settings for new user
  db.user_settings.push({
    id: `set_${Date.now()}`,
    user_id: newUser.id,
    theme: 'light',
    notifications_enabled: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  writeDB(db);

  res.status(201).json({
    message: 'Registration successful',
    token: newUser.id,
    user: { id: newUser.id, name: newUser.name, email: newUser.email, profile_image: newUser.profile_image }
  });
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const db = readDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  res.json({
    message: 'Login successful',
    token: user.id,
    user: { id: user.id, name: user.name, email: user.email, profile_image: user.profile_image }
  });
});

// GET /api/auth/me
app.get('/api/auth/me', (req, res) => {
  const userId = getUserId(req);
  const db = readDB();
  const user = db.users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    profile_image: user.profile_image
  });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// PUT /api/profile
app.put('/api/profile', (req, res) => {
  const userId = getUserId(req);
  const { name, email, profile_image, password } = req.body;

  const db = readDB();
  const userIndex = db.users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (name) db.users[userIndex].name = name;
  if (email) db.users[userIndex].email = email;
  if (profile_image) db.users[userIndex].profile_image = profile_image;
  if (password) db.users[userIndex].password = password;

  writeDB(db);

  const updated = db.users[userIndex];
  res.json({
    message: 'Profile updated successfully',
    user: { id: updated.id, name: updated.name, email: updated.email, profile_image: updated.profile_image }
  });
});

// -------------------------------------------------------------
// TASKS ENDPOINTS (CRUD)
// -------------------------------------------------------------

// GET /api/tasks
app.get('/api/tasks', (req, res) => {
  const userId = getUserId(req);
  const { date, status, priority, type } = req.query;

  const db = readDB();
  let tasks = db.tasks.filter(t => t.user_id === userId);

  if (date) tasks = tasks.filter(t => t.date === date);
  if (status) tasks = tasks.filter(t => t.status.toLowerCase() === status.toLowerCase());
  if (priority) tasks = tasks.filter(t => t.priority.toLowerCase() === priority.toLowerCase());
  if (type) tasks = tasks.filter(t => t.type.toLowerCase() === type.toLowerCase());

  res.json(tasks);
});

// GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
  const userId = getUserId(req);
  const db = readDB();
  const task = db.tasks.find(t => t.id === req.params.id && t.user_id === userId);

  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const userId = getUserId(req);
  const { title, description, type, subject, date, start_time, due_time, priority, status, reminder } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: 'Task title and date are required.' });
  }

  const db = readDB();
  const newTask = {
    id: `tsk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    user_id: userId,
    title,
    description: description || '',
    type: type || 'Daily Task',
    subject: subject || 'General',
    date,
    start_time: start_time || '09:00',
    due_time: due_time || '10:00',
    priority: priority || 'Medium',
    status: status || 'Pending',
    reminder: reminder || 'None',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.tasks.unshift(newTask);
  writeDB(db);

  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
  const userId = getUserId(req);
  const db = readDB();
  const index = db.tasks.findIndex(t => t.id === req.params.id && t.user_id === userId);

  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const updatedTask = {
    ...db.tasks[index],
    ...req.body,
    id: db.tasks[index].id, // preserve ID
    user_id: userId,        // preserve ownership
    updated_at: new Date().toISOString()
  };

  db.tasks[index] = updatedTask;
  writeDB(db);

  res.json(updatedTask);
});

// PATCH /api/tasks/:id/complete
app.patch('/api/tasks/:id/complete', (req, res) => {
  const userId = getUserId(req);
  const db = readDB();
  const index = db.tasks.findIndex(t => t.id === req.params.id && t.user_id === userId);

  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const currentStatus = db.tasks[index].status;
  const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';

  db.tasks[index].status = newStatus;
  db.tasks[index].updated_at = new Date().toISOString();
  writeDB(db);

  res.json(db.tasks[index]);
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const userId = getUserId(req);
  const db = readDB();
  const initialLen = db.tasks.length;
  db.tasks = db.tasks.filter(t => !(t.id === req.params.id && t.user_id === userId));

  if (db.tasks.length === initialLen) {
    return res.status(404).json({ error: 'Task not found' });
  }

  writeDB(db);
  res.json({ message: 'Task deleted successfully', id: req.params.id });
});

// -------------------------------------------------------------
// DAILY DIARY ENDPOINTS (CRUD)
// -------------------------------------------------------------

// GET /api/diary
app.get('/api/diary', (req, res) => {
  const userId = getUserId(req);
  const { date } = req.query;

  const db = readDB();
  let entries = db.daily_diary.filter(d => d.user_id === userId);

  if (date) {
    const entry = entries.find(d => d.date === date);
    return res.json(entry || { date, notes: '', id: null });
  }

  res.json(entries);
});

// POST /api/diary (Create or Update by date)
app.post('/api/diary', (req, res) => {
  const userId = getUserId(req);
  const { date, notes } = req.body;

  if (!date) return res.status(400).json({ error: 'Date is required for diary entry.' });

  const db = readDB();
  const existingIdx = db.daily_diary.findIndex(d => d.user_id === userId && d.date === date);

  if (existingIdx >= 0) {
    db.daily_diary[existingIdx].notes = notes || '';
    db.daily_diary[existingIdx].updated_at = new Date().toISOString();
    writeDB(db);
    return res.json(db.daily_diary[existingIdx]);
  }

  const newEntry = {
    id: `dia_${Date.now()}`,
    user_id: userId,
    date,
    notes: notes || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.daily_diary.unshift(newEntry);
  writeDB(db);

  res.status(201).json(newEntry);
});

// PUT /api/diary/:id
app.put('/api/diary/:id', (req, res) => {
  const userId = getUserId(req);
  const { notes } = req.body;

  const db = readDB();
  const index = db.daily_diary.findIndex(d => d.id === req.params.id && d.user_id === userId);

  if (index === -1) return res.status(404).json({ error: 'Diary entry not found' });

  db.daily_diary[index].notes = notes;
  db.daily_diary[index].updated_at = new Date().toISOString();
  writeDB(db);

  res.json(db.daily_diary[index]);
});

// DELETE /api/diary/:id
app.delete('/api/diary/:id', (req, res) => {
  const userId = getUserId(req);
  const db = readDB();
  db.daily_diary = db.daily_diary.filter(d => !(d.id === req.params.id && d.user_id === userId));
  writeDB(db);
  res.json({ message: 'Diary entry deleted' });
});

// -------------------------------------------------------------
// SETTINGS ENDPOINTS
// -------------------------------------------------------------

// GET /api/settings
app.get('/api/settings', (req, res) => {
  const userId = getUserId(req);
  const db = readDB();
  const settings = db.user_settings.find(s => s.user_id === userId) || {
    user_id: userId,
    theme: 'light',
    notifications_enabled: true
  };
  res.json(settings);
});

// PUT /api/settings
app.put('/api/settings', (req, res) => {
  const userId = getUserId(req);
  const { theme, notifications_enabled } = req.body;

  const db = readDB();
  const index = db.user_settings.findIndex(s => s.user_id === userId);

  if (index >= 0) {
    if (theme !== undefined) db.user_settings[index].theme = theme;
    if (notifications_enabled !== undefined) db.user_settings[index].notifications_enabled = notifications_enabled;
    db.user_settings[index].updated_at = new Date().toISOString();
  } else {
    db.user_settings.push({
      id: `set_${Date.now()}`,
      user_id: userId,
      theme: theme || 'light',
      notifications_enabled: notifications_enabled ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  writeDB(db);
  const updated = db.user_settings.find(s => s.user_id === userId);
  res.json(updated);
});

// Start Express API server
app.listen(PORT, () => {
  console.log(`[EduDiary Backend Server] Running on http://localhost:${PORT}`);
  console.log(`[EduDiary Backend Server] Real Persistent Database loaded`);
});
