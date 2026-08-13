import { useEffect } from 'react';
import { useReports } from '@/hooks/useReports';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import DepartmentInsightCard from '@/components/analytics/DepartmentInsightCard';
import AnalyticsChartCard from '@/components/analytics/AnalyticsChartCard';
import Section from '@/components/common/Section';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * Department analytics — backed by reportSlice's departmentReports
 * via useReports.
 */
const DepartmentAnalytics = () => {
  const { departmentReports, loading, error, fetchDepartmentReports } = useReports();

  useEffect(() => {
    fetchDepartmentReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchDepartmentReports} />;

  const departments = departmentReports?.list ?? [];
  const attendanceChart = formatChartData(departmentReports?.attendanceComparison ?? []);
  const performanceChart = formatChartData(departmentReports?.performanceComparison ?? []);

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Department Analytics"
        description="Compare attendance and performance across departments"
        breadcrumbItems={[{ label: 'Analytics', href: '/analytics/dashboard' }, { label: 'Departments' }]}
      />

      <Section title="Department Overview" spacing="sm">
        {loading && !departmentReports ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {departments.map((dept) => (
              <DepartmentInsightCard key={dept.name} department={dept} />
            ))}
          </div>
        )}
      </Section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsChartCard
          type="bar"
          title="Attendance Comparison"
          subtitle="Current semester average"
          labels={attendanceChart.labels}
          data={[{ label: 'Attendance %', data: attendanceChart.data }]}
          loading={loading}
        />
        <AnalyticsChartCard
          type="bar"
          title="Performance Metrics"
          subtitle="Average academic score"
          labels={performanceChart.labels}
          data={[{ label: 'Score', data: performanceChart.data }]}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DepartmentAnalytics;
