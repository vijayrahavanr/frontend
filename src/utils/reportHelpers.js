/**
 * Report domain helpers — formatting for report objects, history
 * entries, and status labels shared across the Reports & Analytics
 * Center.
 */

/**
 * Normalizes a raw report API payload into display-ready shape.
 * @param {object} report
 */
export const formatReport = (report = {}) => ({
  id: report.id,
  title: report.title || report.name || 'Untitled report',
  description: report.description || '',
  type: report.type || 'general',
  createdAt: report.createdAt || report.created_at || null,
  status: formatReportStatus(report.status),
});

/**
 * Normalizes a report-history row for table display.
 * @param {object} entry
 */
export const formatReportHistoryEntry = (entry = {}) => ({
  id: entry.id,
  report: entry.reportTitle || entry.report_title || entry.title || 'Report',
  date: entry.generatedAt || entry.generated_at || entry.date || null,
  format: (entry.format || 'PDF').toUpperCase(),
  status: formatReportStatus(entry.status),
});

/**
 * Maps a raw status value to the capitalized label the shared
 * Badge/DataTable status-coloring expects (see tables/DataTable's
 * STATUS_COLOR map).
 * @param {string} status
 */
export const formatReportStatus = (status) => {
  const normalized = (status || 'completed').toLowerCase();
  const LABELS = {
    completed: 'Completed',
    success: 'Completed',
    pending: 'Pending',
    processing: 'Pending',
    failed: 'Failed',
    error: 'Failed',
  };
  return LABELS[normalized] || 'Completed';
};

export default { formatReport, formatReportHistoryEntry, formatReportStatus };
