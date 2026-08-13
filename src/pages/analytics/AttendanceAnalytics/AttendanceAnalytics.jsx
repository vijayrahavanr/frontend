import { useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import AnalyticsFilterBar from '@/components/analytics/AnalyticsFilterBar';
import AnalyticsChartCard from '@/components/analytics/AnalyticsChartCard';
import AttendanceInsightCard from '@/components/analytics/AttendanceInsightCard';
import AttendanceHeatmap from '@/components/attendance/AttendanceHeatmap';
import Section from '@/components/common/Section';
import ErrorState from '@/components/error/ErrorState';
import { formatChartData } from '@/utils/dashboardHelpers';

const PERIOD_OPTIONS = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

/**
 * Attendance analytics view — backed by attendanceSlice's
 * attendanceAnalytics via useAnalytics.
 */
const AttendanceAnalytics = () => {
  const [period, setPeriod] = useState('monthly');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const { attendanceAnalytics, loading, error, fetchAttendanceAnalytics } = useAnalytics();

  useEffect(() => {
    fetchAttendanceAnalytics({ period, ...dateRange });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, dateRange]);

  if (error) return <ErrorState description={error} onRetry={() => fetchAttendanceAnalytics({ period })} />;

  const trend = formatChartData(attendanceAnalytics?.trend ?? []);
  const dataByDate = (attendanceAnalytics?.dailyAttendance ?? []).reduce((acc, entry) => {
    acc[entry.date] = entry.percentage;
    return acc;
  }, {});
  const insights = attendanceAnalytics?.insights ?? [];

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Attendance Analytics"
        description="Daily, weekly, monthly, and yearly attendance breakdowns"
        breadcrumbItems={[{ label: 'Analytics', href: '/analytics/dashboard' }, { label: 'Attendance' }]}
      />

      <AnalyticsFilterBar
        filters={[{ key: 'period', label: 'Period', options: PERIOD_OPTIONS, value: period, onChange: setPeriod }]}
        dateRange={{ ...dateRange, onChange: setDateRange }}
      />

      {insights.length > 0 && (
        <Section title="Insights" spacing="sm">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {insights.map((insight, i) => (
              <AttendanceInsightCard key={i} {...insight} />
            ))}
          </div>
        </Section>
      )}

      <AnalyticsChartCard
        type="line"
        title="Attendance Trend"
        subtitle={`${PERIOD_OPTIONS.find((p) => p.value === period)?.label} view`}
        labels={trend.labels}
        data={[{ label: 'Attendance %', data: trend.data }]}
        loading={loading}
      />

      <Section title="Attendance Heatmap" spacing="sm">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <AttendanceHeatmap dataByDate={dataByDate} />
        </div>
      </Section>
    </div>
  );
};

export default AttendanceAnalytics;
