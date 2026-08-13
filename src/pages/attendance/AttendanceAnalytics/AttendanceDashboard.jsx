import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiUserCheck, FiLayers, FiBookOpen } from 'react-icons/fi';
import { useAttendance } from '@/hooks/useAttendance';
import Header from '@/components/common/Header';
import AttendanceMetricCard from '@/components/attendance/AttendanceMetricCard';
import AttendanceChartCard from '@/components/attendance/AttendanceChartCard';
import AttendanceHeatmap from '@/components/attendance/AttendanceHeatmap';
import Section from '@/components/common/Section';
import Button from '@/components/common/Button';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import { formatChartData } from '@/utils/dashboardHelpers';

const ANALYTICS_LINKS = [
  { label: 'Department Analytics', to: '/attendance/analytics/department' },
  { label: 'Faculty Analytics', to: '/attendance/analytics/faculty' },
  { label: 'Student Analytics', to: '/attendance/analytics/student' },
  { label: 'Subject Analytics', to: '/attendance/analytics/subject' },
];

/**
 * Top-level attendance analytics dashboard — backed by
 * attendanceSlice's attendanceDashboard via useAttendance.
 */
const AttendanceDashboard = () => {
  const { dashboard, loading, error, fetchDashboard } = useAttendance();

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchDashboard} />;

  const trend = formatChartData(dashboard?.attendanceTrend ?? []);
  const dataByDate = (dashboard?.dailyAttendance ?? []).reduce((acc, entry) => {
    acc[entry.date] = entry.percentage;
    return acc;
  }, {});

  const STATS = [
    { label: 'Overall Attendance', value: dashboard?.overallPercentage != null ? `${dashboard.overallPercentage}%` : '—', icon: <FiUsers size={20} />, color: 'success' },
    { label: 'Active Students', value: dashboard?.activeStudents?.toLocaleString() ?? '—', icon: <FiUserCheck size={20} />, color: 'primary' },
    { label: 'Departments Tracked', value: dashboard?.departmentCount ?? '—', icon: <FiLayers size={20} />, color: 'secondary' },
    { label: 'Subjects Tracked', value: dashboard?.subjectCount ?? '—', icon: <FiBookOpen size={20} />, color: 'warning' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Header title="Attendance Dashboard" description="Institution-wide attendance analytics overview" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading && !dashboard ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          STATS.map((stat) => <AttendanceMetricCard key={stat.label} {...stat} />)
        )}
      </div>

      <AttendanceChartCard
        type="line"
        title="Attendance Trend"
        subtitle="Last 6 months"
        labels={trend.labels}
        data={[{ label: 'Attendance %', data: trend.data }]}
        loading={loading}
        error={error}
        onRetry={fetchDashboard}
      />

      <Section title="Daily Attendance Density" spacing="sm">
        {loading && !dashboard ? (
          <Skeleton className="h-32 rounded-2xl" />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
            <AttendanceHeatmap dataByDate={dataByDate} />
          </div>
        )}
      </Section>

      <Section title="Deeper Analytics" spacing="sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ANALYTICS_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              <Button variant="outlined" fullWidth>
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default AttendanceDashboard;
