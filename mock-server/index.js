import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;
const BASE = '/api/v1';

app.use(cors());
app.use(express.json());

// Log every request so it's easy to see what the frontend is actually
// calling while you click around.
app.use((req, res, next) => {
  console.log(`${new Date().toISOString().slice(11, 19)}  ${req.method.padEnd(6)} ${req.originalUrl}`);
  next();
});

// Simulate real network latency so loading skeletons are visible instead
// of flashing instantly.
const LATENCY_MS = 250;
app.use((req, res, next) => setTimeout(next, LATENCY_MS));

// ---------------------------------------------------------------------------
// In-memory "session" — good enough for a single-browser demo. Not real
// auth: any password is accepted, role is derived from the email so you
// can test all three roles without a real user database.
// ---------------------------------------------------------------------------
let currentUser = null;

const roleFromEmail = (email = '') => {
  const lower = email.toLowerCase();
  if (lower.includes('admin')) return 'admin';
  if (lower.includes('faculty') || lower.includes('teacher') || lower.includes('prof')) return 'faculty';
  return 'student';
};

const PERMISSIONS_BY_ROLE = {
  admin: ['view_students', 'manage_students', 'view_faculty', 'manage_faculty', 'view_reports', 'manage_settings', 'manage_roles', 'manage_backups'],
  faculty: ['view_students', 'view_reports'],
  student: [],
};

const buildUser = (email) => {
  const role = roleFromEmail(email);
  const namePart = email.split('@')[0].replace(/[._]/g, ' ');
  const name = namePart.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Demo User';
  return {
    id: 'mock-user-1',
    name,
    email,
    role,
    permissions: PERMISSIONS_BY_ROLE[role],
    avatar: null,
  };
};

const base64url = (obj) =>
  Buffer.from(JSON.stringify(obj)).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * A structurally-real (unsigned) JWT: header.payload.signature, with a
 * proper `exp` claim. The frontend only ever reads `exp` client-side
 * (see src/utils/authHelpers.js) — it never verifies the signature,
 * which always happens server-side — so this exercises the real
 * expiry-checking code path without needing an actual signing key.
 */
const fakeToken = (subject, expiresInSeconds = 60 * 60 * 8) => {
  const header = base64url({ alg: 'none', typ: 'JWT' });
  const payload = base64url({
    sub: subject,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  });
  return `${header}.${payload}.mock-signature`;
};

// ---------------------------------------------------------------------------
// Auth routes — the only ones with real (fake) logic. Paths match
// src/constants/apiEndpoints.js AUTH_ENDPOINTS exactly.
// ---------------------------------------------------------------------------
app.post(`${BASE}/auth/login`, (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(422).json({ message: 'Email and password are required.' });
  }
  currentUser = buildUser(email);
  res.json({
    user: currentUser,
    accessToken: fakeToken(currentUser.id, 60 * 60 * 8), // 8h
    refreshToken: fakeToken(currentUser.id, 60 * 60 * 24 * 30), // 30d
  });
});

app.post(`${BASE}/auth/refresh-token`, (req, res) => {
  res.json({
    accessToken: fakeToken(currentUser?.id || 'mock-user-1', 60 * 60 * 8),
    refreshToken: fakeToken(currentUser?.id || 'mock-user-1', 60 * 60 * 24 * 30),
  });
});

app.post(`${BASE}/auth/logout`, (req, res) => {
  currentUser = null;
  res.json({ success: true });
});

app.get(`${BASE}/auth/profile`, (req, res) => {
  res.json(currentUser || buildUser('demo.student@example.com'));
});

app.post(`${BASE}/auth/forgot-password`, (req, res) => {
  res.json({ message: 'If that email exists, a reset link has been sent.' });
});

app.post(`${BASE}/auth/reset-password`, (req, res) => {
  res.json({ message: 'Password reset successfully.' });
});

app.post(`${BASE}/auth/change-password`, (req, res) => {
  res.json({ message: 'Password changed successfully.' });
});

// ---------------------------------------------------------------------------
// A handful of curated, populated endpoints for the highest-traffic pages,
// so the first few screens someone checks after logging in feel alive
// instead of empty. Everything else falls through to the generic
// catch-all below.
// ---------------------------------------------------------------------------
app.get(`${BASE}/system/dashboard`, (req, res) => {
  res.json({
    uptime: '99.98%',
    activeSessions: 342,
    roleCount: 3,
    openTickets: 4,
    services: [
      { name: 'API Server', type: 'server', status: 'operational', uptime: '99.99%' },
      { name: 'Database', type: 'database', status: 'operational', uptime: '99.97%' },
      { name: 'File Storage', type: 'storage', status: 'operational', uptime: '99.95%' },
    ],
    recentActivity: [
      { id: 1, user: 'Priya Kapoor', activity: 'updated the security configuration', timestamp: new Date(Date.now() - 3600e3) },
      { id: 2, user: 'System', activity: 'completed a scheduled backup', timestamp: new Date(Date.now() - 22 * 3600e3) },
    ],
  });
});

app.get(`${BASE}/roles`, (req, res) => {
  res.json([
    { id: 1, name: 'Admin', description: 'Full system access', userCount: 2, permissionCount: 8, isSystem: true },
    { id: 2, name: 'Faculty', description: 'Teaching and attendance access', userCount: 18, permissionCount: 2, isSystem: true },
    { id: 3, name: 'Student', description: 'Self-service access', userCount: 240, permissionCount: 0, isSystem: true },
  ]);
});

app.get(`${BASE}/permissions`, (req, res) => {
  res.json([
    { id: 1, name: 'view_students', category: 'Students', description: 'View student records' },
    { id: 2, name: 'manage_students', category: 'Students', description: 'Create, edit, and delete student records' },
    { id: 3, name: 'view_reports', category: 'Reports', description: 'View analytics and reports' },
    { id: 4, name: 'manage_settings', category: 'System', description: 'Modify system configuration' },
  ]);
});

app.get(`${BASE}/students`, (req, res) => {
  res.json({
    items: [
      { id: 1, name: 'Aditi Sharma', email: 'aditi.sharma@example.com', department: 'CSE', status: 'active' },
      { id: 2, name: 'Rohan Verma', email: 'rohan.verma@example.com', department: 'ECE', status: 'active' },
      { id: 3, name: 'Meera Iyer', email: 'meera.iyer@example.com', department: 'CSE', status: 'inactive' },
    ],
    total: 3,
    page: 1,
    pageSize: 10,
  });
});

app.get(`${BASE}/faculty`, (req, res) => {
  res.json({
    items: [
      { id: 1, name: 'Dr. Ravi Menon', email: 'ravi.menon@example.com', department: 'CSE', status: 'active' },
      { id: 2, name: 'Dr. Anjali Rao', email: 'anjali.rao@example.com', department: 'ECE', status: 'active' },
    ],
    total: 2,
    page: 1,
    pageSize: 10,
  });
});

app.get(`${BASE}/notifications`, (req, res) => {
  res.json({
    items: [
      { id: 1, title: 'Welcome', message: 'This is mock data from the local mock server.', read: false, createdAt: new Date() },
    ],
    total: 1,
  });
});

// ---------------------------------------------------------------------------
// Generic catch-all — every other endpoint in the app (there are ~150+
// across all the domain services) gets a harmless, correctly-shaped
// empty response instead of a 404, so pages render their empty states
// cleanly rather than erroring. GETs return an empty list shape; writes
// echo the request body back with a fake id so create/update flows
// "succeed" and show their success toasts.
// ---------------------------------------------------------------------------
app.get(`${BASE}/*`, (req, res) => {
  res.json({ items: [], total: 0, page: 1, pageSize: 10 });
});

app.post(`${BASE}/*`, (req, res) => {
  res.status(201).json({ id: Math.floor(Math.random() * 100000), ...req.body });
});

app.put(`${BASE}/*`, (req, res) => {
  res.json({ ...req.body });
});

app.patch(`${BASE}/*`, (req, res) => {
  res.json({ ...req.body });
});

app.delete(`${BASE}/*`, (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`\nMock API server running at http://localhost:${PORT}${BASE}`);
  console.log('Log in with ANY password. Email controls the role:');
  console.log('  contains "admin"   -> admin role');
  console.log('  contains "faculty" -> faculty role');
  console.log('  anything else      -> student role\n');
});
