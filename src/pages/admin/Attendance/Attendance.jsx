import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBarChart2, FiCheckSquare, FiUsers, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { useAttendanceAnalytics } from '@/hooks/useAttendanceAnalytics';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminStatCard from '@/components/admin/AdminStatCard';
import AttendanceAnalyticsCard from '@/components/admin/AttendanceAnalyticsCard';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import DataTable from '@/components/tables/DataTable';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';

const COLUMNS = [
  { key: 'className', header: 'Class', sortable: true },
  { key: 'semester', header: 'Semester', hideOnMobile: true },
  { key: 'present', header: 'Present', hideOnMobile: true },
  { key: 'percentage', header: 'Attendance', sortable: true, render: (row) => `${row.percentage}%` },
];

/**
 * System-wide attendance overview — backed by attendanceSlice's admin
 * analytics via useAttendanceAnalytics.
 */
const Attendance = () => {
  const { analytics, departmentAttendance, classAttendance, loading, error, fetchAnalytics, fetchDepartmentAttendance, fetchClassAttendance } =
    useAttendanceAnalytics();

  useEffect(() => {
    fetchAnalytics();
    fetchDepartmentAttendance();
    fetchClassAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchAnalytics} />;

  const STATS = [
    { label: 'Overall Attendance', value: analytics?.overallPercentage != null ? `${analytics.overallPercentage}%` : '—', icon: <FiCheckSquare size={20} />, color: 'success' },
    { label: 'Students Present Today', value: analytics?.presentToday?.toLocaleString() ?? '—', icon: <FiUsers size={20} />, color: 'primary' },
    { label: 'Improving Departments', value: analytics?.improvingCount ?? '—', icon: <FiTrendingUp size={20} />, color: 'secondary' },
    { label: 'At-Risk Departments', value: analytics?.atRiskCount ?? '—', icon: <FiTrendingDown size={20} />, color: 'danger' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar
        title="Attendance"
        subtitle="Institution-wide attendance overview"
        actions={
          <Link to="/admin/attendance/analytics">
            <Button size="sm" variant="outlined" startIcon={<FiBarChart2 size={14} />}>
              View Analytics
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          STATS.map((stat) => <AdminStatCard key={stat.label} {...stat} />)
        )}
      </div>

      <Section title="Department-wise Attendance" spacing="sm">
        {loading && !departmentAttendance.length ? (
          <Skeleton className="h-48 rounded-2xl" />
        ) : departmentAttendance.length === 0 ? (
          <EmptyState title="No department data yet" compact />
        ) : (
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
            {departmentAttendance.map((dept) => (
              <AttendanceAnalyticsCard key={dept.label} {...dept} />
            ))}
          </div>
        )}
      </Section>

      <Section title="Class-wise Attendance" spacing="sm">
        <DataTable columns={COLUMNS} data={classAttendance} loading={loading} pageSize={8} searchKeys={['className']} />
      </Section>
    </div>
  );
};

export default Attendance;
