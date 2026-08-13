/**
 * Faculty domain helpers — formatting utilities shared by
 * facultySlice and the Profile/Dashboard pages.
 */

/**
 * Normalizes a raw faculty profile API payload into the shape the UI
 * components expect, filling in safe defaults for optional fields.
 * @param {object} profile
 */
export const formatFacultyProfile = (profile = {}) => ({
  name: profile.name || 'Unknown Faculty',
  employeeId: profile.employeeId || profile.employee_id || '—',
  department: formatDepartment(profile.department),
  designation: formatDesignation(profile.designation),
  status: profile.status || 'Active',
  avatarSrc: profile.avatarUrl || profile.avatar_url || null,
  email: profile.email || '',
  phone: profile.phone || '',
  office: profile.office || '',
  qualification: profile.qualification || '',
  experience: profile.experience || '',
  specialization: profile.specialization || '',
});

/**
 * Formats a department value, accepting either a plain string or an
 * API object shape like { name: 'Computer Science' }.
 * @param {string|{name: string}} department
 */
export const formatDepartment = (department) => {
  if (!department) return '—';
  return typeof department === 'string' ? department : department.name || '—';
};

/**
 * Formats a designation value, accepting either a plain string or an
 * API object shape like { title: 'Associate Professor' }.
 * @param {string|{title: string}} designation
 */
export const formatDesignation = (designation) => {
  if (!designation) return '—';
  return typeof designation === 'string' ? designation : designation.title || '—';
};

export default { formatFacultyProfile, formatDepartment, formatDesignation };
