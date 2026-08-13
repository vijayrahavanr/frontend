/**
 * Attendance domain helpers — pure functions shared by attendanceSlice,
 * the Attendance pages, and student/AttendanceCalendar so percentage/
 * status logic lives in exactly one place.
 */

/**
 * @param {number} present
 * @param {number} total
 * @returns {number} percentage rounded to 2 decimals, 0 if total is 0
 */
export const calculateAttendancePercentage = (present, total) => {
  if (!total) return 0;
  return Math.round((present / total) * 10000) / 100;
};

/**
 * @param {{status: string}[]} records
 * @returns {number}
 */
export const calculatePresentDays = (records = []) =>
  records.filter((record) => record.status?.toLowerCase() === 'present').length;

/**
 * @param {{status: string}[]} records
 * @returns {number}
 */
export const calculateAbsentDays = (records = []) =>
  records.filter((record) => record.status?.toLowerCase() === 'absent').length;

/**
 * @param {{status: string}[]} records
 * @returns {number}
 */
export const calculateLateEntries = (records = []) =>
  records.filter((record) => record.status?.toLowerCase() === 'late').length;

/**
 * Derives a semantic status ('safe' | 'warning' | 'critical') from an
 * attendance percentage against a minimum requirement, for consistent
 * badge/progress-bar coloring across the module.
 * @param {number} percentage
 * @param {number} [requiredPercentage]
 */
export const generateAttendanceStatus = (percentage, requiredPercentage = 75) => {
  if (percentage >= requiredPercentage) return 'safe';
  if (percentage >= requiredPercentage - 15) return 'warning';
  return 'critical';
};

/**
 * Groups a flat list of attendance records by date, keyed 'yyyy-MM-dd',
 * mapping to that day's status — the shape AttendanceCalendar expects.
 * @param {{date: string, status: string}[]} records
 */
export const groupAttendanceByDate = (records = []) =>
  records.reduce((acc, record) => {
    acc[record.date] = record.status?.toLowerCase();
    return acc;
  }, {});

/**
 * Builds a complete attendance summary object from a flat list of
 * per-student records for a session — the shape both the student and
 * faculty modules' summary cards expect. Added for the faculty
 * module's "Generate Attendance Summary" action; reuses the
 * present/absent/late/percentage helpers above instead of
 * duplicating that logic.
 * @param {{status: string}[]} records
 * @param {number} [requiredPercentage]
 */
export const generateAttendanceSummary = (records = [], requiredPercentage = 75) => {
  const total = records.length;
  const present = calculatePresentDays(records);
  const absent = calculateAbsentDays(records);
  const late = calculateLateEntries(records);
  const percentage = calculateAttendancePercentage(present, total);

  return {
    total,
    present,
    absent,
    late,
    percentage,
    status: generateAttendanceStatus(percentage, requiredPercentage),
  };
};

export default {
  calculateAttendancePercentage,
  calculatePresentDays,
  calculateAbsentDays,
  calculateLateEntries,
  generateAttendanceStatus,
  groupAttendanceByDate,
  generateAttendanceSummary,
};
