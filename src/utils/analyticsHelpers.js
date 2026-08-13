/**
 * Analytics domain helpers — KPI calculations, trend deltas, and
 * comparison formatting shared across the Reports & Analytics Center.
 */

/**
 * Attendance KPI: percentage plus a semantic status, for consistent
 * badge coloring across dashboard/summary cards.
 * @param {number} present
 * @param {number} total
 * @param {number} [threshold]
 */
export const calculateAttendanceKPI = (present, total, threshold = 75) => {
  const percentage = total ? Math.round((present / total) * 10000) / 100 : 0;
  return {
    percentage,
    status: percentage >= threshold ? 'good' : percentage >= threshold - 15 ? 'warning' : 'critical',
  };
};

/**
 * Performance KPI: average score plus a letter grade.
 * @param {number[]} scores
 */
export const calculatePerformanceKPI = (scores = []) => {
  if (!scores.length) return { average: 0, grade: 'N/A' };
  const average = Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 100) / 100;
  const grade = average >= 90 ? 'A' : average >= 75 ? 'B' : average >= 60 ? 'C' : average >= 40 ? 'D' : 'F';
  return { average, grade };
};

/**
 * Period-over-period trend: percentage change plus direction, from a
 * series of values (oldest first).
 * @param {number[]} series
 */
export const calculateTrend = (series = []) => {
  if (series.length < 2) return { changePercent: 0, direction: 'flat' };
  const first = series[0];
  const last = series[series.length - 1];
  if (!first) return { changePercent: 0, direction: 'flat' };
  const changePercent = Math.round(((last - first) / first) * 10000) / 100;
  return { changePercent, direction: changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'flat' };
};

/**
 * Formats a comparison entry (department/faculty/student/subject)
 * into the {label, value, meta} shape ComparisonCard expects.
 * @param {{name: string, value: number, count?: number, countLabel?: string}} entry
 */
export const formatComparisonEntry = (entry) => ({
  label: entry.name,
  value: entry.value,
  meta: entry.count != null ? `${entry.count} ${entry.countLabel || ''}`.trim() : undefined,
});

export default { calculateAttendanceKPI, calculatePerformanceKPI, calculateTrend, formatComparisonEntry };
