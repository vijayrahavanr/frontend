/**
 * Dashboard-level helpers — chart data shaping and cross-entity
 * summary calculations, shared across the Admin dashboard/reports/
 * analytics pages.
 */

/**
 * Converts a `{label, value}[]` series into the `{labels, data}`
 * shape the chart components (BarChart/LineChart/etc) expect.
 * @param {{label: string, value: number}[]} series
 */
export const formatChartData = (series = []) => ({
  labels: series.map((item) => item.label),
  data: series.map((item) => item.value),
});

/**
 * Computes total + average from a list of numeric values — used for
 * quick summary rows above a chart (e.g. "Average: 87%, Total: 2,480").
 * @param {number[]} values
 */
export const calculateSummary = (values = []) => {
  const total = values.reduce((sum, v) => sum + v, 0);
  const average = values.length ? Math.round((total / values.length) * 100) / 100 : 0;
  return { total, average, count: values.length };
};

/**
 * Derives per-department metrics (student/faculty ratio, attendance
 * standing) from raw department records — used by the Dashboard's
 * department breakdown and the Departments page's stat badges.
 * @param {{studentCount: number, facultyCount: number, attendance?: number}[]} departments
 */
export const calculateDepartmentMetrics = (departments = []) =>
  departments.map((dept) => ({
    ...dept,
    studentFacultyRatio: dept.facultyCount ? Math.round(dept.studentCount / dept.facultyCount) : 0,
    standing: (dept.attendance ?? 0) >= 75 ? 'good' : 'at-risk',
  }));

export default { formatChartData, calculateSummary, calculateDepartmentMetrics };
