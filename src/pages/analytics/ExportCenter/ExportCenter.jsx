import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiFileText, FiGrid, FiFile, FiPrinter } from 'react-icons/fi';
import { useReports } from '@/hooks/useReports';
import { useExportReports } from '@/hooks/useExportReports';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import ExportOptionsCard from '@/components/analytics/ExportOptionsCard';
import AnalyticsTable from '@/components/analytics/AnalyticsTable';
import Section from '@/components/common/Section';

const COLUMNS = [
  { key: 'date', header: 'Date', sortable: true },
  { key: 'report', header: 'Report', sortable: true },
  { key: 'format', header: 'Format', hideOnMobile: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * Export center — dispatches useExportReports' format-specific
 * actions and reads download history from reportSlice via
 * useReports.
 */
const ExportCenter = () => {
  const { reportHistory, loading: historyLoading, fetchReportHistory } = useReports();
  const { exportPDF, exportExcel, exportCSV, printReport, loading: exporting } = useExportReports();

  useEffect(() => {
    fetchReportHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExport = async (formatKey) => {
    const reportConfig = { reportType: 'attendance' };
    const actionMap = { pdf: exportPDF, excel: exportExcel, csv: exportCSV, print: printReport };
    const result = await actionMap[formatKey](reportConfig);
    if (result.success) {
      toast.success(formatKey === 'print' ? 'Sent to printer.' : 'Export downloaded.');
      fetchReportHistory();
    } else {
      toast.error(result.error);
    }
  };

  const EXPORT_OPTIONS = [
    { key: 'pdf', icon: <FiFileText size={22} />, title: 'PDF', description: 'Formatted document, ready to share' },
    { key: 'excel', icon: <FiGrid size={22} />, title: 'Excel', description: 'Spreadsheet with raw data' },
    { key: 'csv', icon: <FiFile size={22} />, title: 'CSV', description: 'Plain data for import elsewhere' },
    { key: 'print', icon: <FiPrinter size={22} />, title: 'Print', description: 'Send directly to a printer' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Export Center"
        description="Export analytics data in your preferred format"
        breadcrumbItems={[{ label: 'Analytics', href: '/analytics/dashboard' }, { label: 'Export Center' }]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EXPORT_OPTIONS.map((option) => (
          <ExportOptionsCard key={option.key} {...option} onExport={() => handleExport(option.key)} exporting={exporting} />
        ))}
      </div>

      <Section title="Download History" spacing="sm">
        <AnalyticsTable
          columns={COLUMNS}
          data={reportHistory.items}
          loading={historyLoading}
          onRetry={fetchReportHistory}
          pageSize={reportHistory.pageSize || 8}
          searchKeys={['report', 'format', 'status']}
        />
      </Section>
    </div>
  );
};

export default ExportCenter;
