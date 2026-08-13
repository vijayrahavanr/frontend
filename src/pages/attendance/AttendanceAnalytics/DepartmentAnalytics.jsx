import { useEffect } from 'react';
import { FiLayers, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { useAttendanceAnalytics } from '@/hooks/useAttendanceAnalytics';
import Header from '@/components/common/Header';
import AttendanceChartCard from '@/components/attendance/AttendanceChartCard';
import AttendanceMetricCard from '@/components/attendance/AttendanceMetricCard';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * Cross-department attendance comparison — backed by
 * attendanceSlice's departmentAnalytics via useAttendanceAnalytics.
 */
const DepartmentAnalytics = () => {
  const { departmentAnalytics, loading, error, fetchDepartmentAnalytics } = useAttendanceAnalytics();

  useEffect(() => {
    fetchDepartmentAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchDepartmentAnalytics} />;

  const comparison = formatChartData(departmentAnalytics?.comparison ?? []);
  const trend = formatChartData(departmentAnalytics?.trend ?? []);

  const STATS = [
    { label: 'Departments Compared', value: departmentAnalytics?.departmentCount ?? '—', icon: <FiLayers size={20} />, color: 'primary' },
    { label: 'Total Students', value: departmentAnalytics?.totalStudents?.toLocaleString() ?? '—', icon: <FiUsers size={20} />, color: 'secondary' },
    { label: 'Best Performing', value: departmentAnalytics?.bestPerforming ?? '—', icon: <FiTrendingUp size={20} />, color: 'success' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Header title="Department Analytics" description="Compare attendance performance across departments" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading && !departmentAnalytics ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          STATS.map((stat) => <AttendanceMetricCard key={stat.label} {...stat} />)
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AttendanceChartCard
          type="bar"
          title="Department Comparison"
          subtitle="Current semester average"
          labels={comparison.labels}
          data={[{ label: 'Attendance %', data: comparison.data }]}
          loading={loading}
        />
        <AttendanceChartCard
          type="line"
          title="Institution-wide Trend"
          subtitle="Last 6 months"
          labels={trend.labels}
          data={[{ label: 'Attendance %', data: trend.data }]}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DepartmentAnalytics;
