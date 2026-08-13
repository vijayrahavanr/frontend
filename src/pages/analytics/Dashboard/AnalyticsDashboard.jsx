import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiUserCheck, FiCheckSquare, FiTrendingUp } from 'react-icons/fi';
import { useReports } from '@/hooks/useReports';
import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import AnalyticsSummaryCard from '@/components/analytics/AnalyticsSummaryCard';
import AnalyticsChartCard from '@/components/analytics/AnalyticsChartCard';
import ComparisonCard from '@/components/analytics/ComparisonCard';
import KPIWidget from '@/components/analytics/KPIWidget';
import ReportCard from '@/components/admin/ReportCard';
import Section from '@/components/common/Section';
import Button from '@/components/common/Button';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import { formatChartData } from '@/utils/dashboardHelpers';
import { formatComparisonEntry } from '@/utils/analyticsHelpers';

/**
 * Enterprise Analytics Center overview — backed by reportSlice's
 * dashboardReports via useReports and attendanceSlice's kpiMetrics
 * via useAnalytics.
 */
const AnalyticsDashboard = () => {
  const { dashboardReports, loading, error, fetchDashboardReports } = useReports();
  const { kpiMetrics, fetchKPIMetrics } = useAnalytics();

  useEffect(() => {
    fetchDashboardReports();
    fetchKPIMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchDashboardReports} />;

  const trend = formatChartData(dashboardReports?.attendanceTrend ?? []);
  const departmentItems = (dashboardReports?.departmentOverview ?? []).map(formatComparisonEntry);

  const SUMMARY = [
    { label: 'Overall Attendance', value: dashboardReports?.overallAttendance != null ? `${dashboardReports.overallAttendance}%` : '—', description: dashboardReports?.attendanceChangeLabel, icon: <FiCheckSquare size={18} /> },
    { label: 'Active Students', value: dashboardReports?.activeStudents?.toLocaleString() ?? '—', description: dashboardReports?.studentChangeLabel, icon: <FiUsers size={18} /> },
    { label: 'Active Faculty', value: dashboardReports?.activeFaculty ?? '—', description: dashboardReports?.facultyChangeLabel, icon: <FiUserCheck size={18} /> },
    { label: 'Avg. Performance', value: dashboardReports?.averagePerformance ?? '—', description: dashboardReports?.performanceChangeLabel, icon: <FiTrendingUp size={18} /> },
  ];

  const KPIS = kpiMetrics
    ? [
        { label: 'Daily Attendance', value: `${kpiMetrics.daily}%`, changePercent: kpiMetrics.dailyChange },
        { label: 'Weekly Attendance', value: `${kpiMetrics.weekly}%`, changePercent: kpiMetrics.weeklyChange },
        { label: 'Monthly Attendance', value: `${kpiMetrics.monthly}%`, changePercent: kpiMetrics.monthlyChange },
        { label: 'Yearly Attendance', value: `${kpiMetrics.yearly}%`, changePercent: kpiMetrics.yearlyChange },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Analytics Overview"
        description="Executive summary across attendance and performance"
        breadcrumbItems={[{ label: 'Analytics' }]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading && !dashboardReports ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)
        ) : (
          SUMMARY.map((item) => <AnalyticsSummaryCard key={item.label} {...item} />)
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading && !kpiMetrics ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
        ) : (
          KPIS.map((kpi) => <KPIWidget key={kpi.label} {...kpi} />)
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AnalyticsChartCard
          type="line"
          title="Attendance Trend"
          subtitle="Last 6 months"
          labels={trend.labels}
          data={[{ label: 'Attendance %', data: trend.data }]}
          loading={loading}
          className="lg:col-span-2"
        />
        <ComparisonCard title="Department Overview" items={departmentItems} />
      </div>

      <Section
        title="Recent Reports"
        spacing="sm"
        action={
          <Link to="/analytics/custom">
            <Button size="sm" variant="outlined">
              Build a report
            </Button>
          </Link>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(dashboardReports?.recentReports ?? []).map((report) => (
            <ReportCard key={report.title} {...report} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default AnalyticsDashboard;
