/**
 * Admin domain helpers — formatting utilities shared by adminSlice
 * and the Dashboard/Profile pages.
 */

/**
 * Normalizes a raw admin profile API payload into the shape the UI
 * components expect.
 * @param {object} profile
 */
export const formatAdminProfile = (profile = {}) => ({
  name: profile.name || 'Unknown Admin',
  role: profile.role || 'Administrator',
  accessLevel: profile.accessLevel || profile.access_level || 'Admin',
  status: profile.status || 'Active',
  avatarSrc: profile.avatarUrl || profile.avatar_url || null,
  email: profile.email || '',
  phone: profile.phone || '',
  adminId: profile.adminId || profile.admin_id || '',
  joinedOn: profile.joinedOn || profile.joined_on || '',
});

/**
 * Normalizes raw system-statistics counts into the flat shape the
 * dashboard's stat cards expect, filling in 0 for any missing metric.
 * @param {object} stats
 */
export const formatStatistics = (stats = {}) => ({
  totalStudents: stats.totalStudents ?? 0,
  totalFaculty: stats.totalFaculty ?? 0,
  totalDepartments: stats.totalDepartments ?? 0,
  totalCourses: stats.totalCourses ?? 0,
  totalSubjects: stats.totalSubjects ?? 0,
  todayAttendance: stats.todayAttendance ?? 0,
});

/**
 * Normalizes a raw system-status payload (a list of service checks)
 * into a consistent shape, and derives an overall status.
 * @param {{label: string, type: string, status: string}[]} services
 */
export const formatSystemStatus = (services = []) => {
  const overall = services.every((s) => s.status === 'operational')
    ? 'operational'
    : services.some((s) => s.status === 'down')
      ? 'down'
      : 'degraded';

  return { services, overall };
};

export default { formatAdminProfile, formatStatistics, formatSystemStatus };
