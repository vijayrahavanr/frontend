import { useCallback, useState } from 'react';
import exportService from '@/services/exportService';
import { generateExportFilename } from '@/utils/exportHelpers';

/**
 * Encapsulates export-workflow state + actions. Kept as a standalone
 * hook backed directly by exportService rather than Redux, since
 * export requests are one-shot fire-and-forget actions (trigger a
 * download) with no meaningful state to persist across the app —
 * consistent with the "expose loading/error/actions/state" contract
 * while avoiding a slice that would only ever hold a single in-flight
 * flag.
 */
export const useExportReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runExport = useCallback(async (serviceCall, reportConfig, extension) => {
    setLoading(true);
    setError(null);
    try {
      const response = await serviceCall(reportConfig);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = generateExportFilename(reportConfig?.reportType || 'report', extension);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return { success: true };
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Export failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const exportPDF = useCallback(
    (reportConfig) => runExport(exportService.exportPDF, reportConfig, 'pdf'),
    [runExport]
  );
  const exportExcel = useCallback(
    (reportConfig) => runExport(exportService.exportExcel, reportConfig, 'xlsx'),
    [runExport]
  );
  const exportCSV = useCallback(
    (reportConfig) => runExport(exportService.exportCSV, reportConfig, 'csv'),
    [runExport]
  );

  const printReport = useCallback(async (reportConfig) => {
    setLoading(true);
    setError(null);
    try {
      await exportService.printReport(reportConfig);
      return { success: true };
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Print request failed.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return {
    // state
    loading,
    error,
    // actions
    exportPDF,
    exportExcel,
    exportCSV,
    printReport,
    resetError,
  };
};

export default useExportReports;
