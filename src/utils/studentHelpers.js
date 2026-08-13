/**
 * Student domain helpers — formatting utilities shared by
 * studentSlice and the Profile/Dashboard pages.
 */

/**
 * Normalizes a raw profile API payload into the shape the UI
 * components expect, filling in safe defaults for optional fields.
 * @param {object} profile
 */
export const formatProfile = (profile = {}) => ({
  name: profile.name || 'Unknown Student',
  rollNumber: profile.rollNumber || profile.roll_number || '—',
  department: formatDepartment(profile.department),
  year: formatSemester(profile.semester, profile.year),
  status: profile.status || 'Active',
  avatarSrc: profile.avatarUrl || profile.avatar_url || null,
  email: profile.email || '',
  phone: profile.phone || '',
  address: profile.address || '',
  guardianName: profile.guardianName || profile.guardian_name || '',
  guardianPhone: profile.guardianPhone || profile.guardian_phone || '',
});

/**
 * Formats a semester/year pair into a single display string, e.g.
 * "3rd Year · Semester 6". Falls back gracefully if either is absent.
 * @param {number|string} [semester]
 * @param {number|string} [year]
 */
export const formatSemester = (semester, year) => {
  const parts = [];
  if (year) parts.push(`${ordinal(year)} Year`);
  if (semester) parts.push(`Semester ${semester}`);
  return parts.length ? parts.join(' · ') : '—';
};

/**
 * Formats a department value, accepting either a plain string or an
 * API object shape like { name: 'Computer Science' }.
 * @param {string|{name: string}} department
 */
export const formatDepartment = (department) => {
  if (!department) return '—';
  return typeof department === 'string' ? department : department.name || '—';
};

/** @param {number|string} n */
const ordinal = (n) => {
  const num = Number(n);
  if (Number.isNaN(num)) return n;
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const remainder = num % 100;
  return `${num}${suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]}`;
};

export default { formatProfile, formatSemester, formatDepartment };
