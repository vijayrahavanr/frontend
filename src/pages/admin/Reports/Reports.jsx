import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useReports } from '@/hooks/useReports';
import AdminTopbar from '@/components/admin/AdminTopbar';
import ReportCard from '@/components/admin/ReportCard';
import BarChart from '@/components/charts/BarChart';
import ChartContainer from '@/components/common/ChartContainer';
import Section from '@/components/common/Section';
import EmptyState from '@/components/empty-state/EmptyState';
import { COLORS } from '@/constants/theme.constants';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * System-wide report generation/download hub — backed by reportSlice's
 * admin-facing getReports/download via useReports.
 */
const Reports = () => {
  const { reports, departmentReports, loading, fetchReports, download } = useReports();

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = async (reportId) => {
    const result = await download({ reportId, format: 'pdf' });
    if (result.meta.requestStatus === 'fulfilled') toast.success('Report download started.');
  };

  const departmentChart = formatChartData(departmentReports);

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Reports" subtitle="Generate and download institution-wide reports" />

      <Section title="Available Reports" spacing="sm">
        {loading && !reports.length ? (
          <EmptyState title="Loading reports..." compact />
        ) : reports.length === 0 ? (
          <EmptyState title="No reports available" compact />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                title={report.title}
                description={report.description}
                onDownload={() => handleDownload(report.id)}
              />
            ))}
          </div>
        )}
      </Section>

      <ChartContainer title="Department Performance" subtitle="Average academic performance by department" loading={loading} isEmpty={!departmentChart.labels.length}>
        <BarChart labels={departmentChart.labels} datasets={[{ label: 'Score', data: departmentChart.data, backgroundColor: COLORS.primary }]} height={260} />
      </ChartContainer>
    </div>
  );
};

export default Reports;
