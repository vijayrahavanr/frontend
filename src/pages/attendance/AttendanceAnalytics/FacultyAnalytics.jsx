import { useState } from 'react';
import { FiCheckSquare, FiBookOpen, FiUsers } from 'react-icons/fi';
import { useAttendanceAnalytics } from '@/hooks/useAttendanceAnalytics';
import Header from '@/components/common/Header';
import AttendanceSearch from '@/components/attendance/AttendanceSearch';
import AttendanceChartCard from '@/components/attendance/AttendanceChartCard';
import AttendanceMetricCard from '@/components/attendance/AttendanceMetricCard';
import EmptyState from '@/components/empty-state/EmptyState';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * Per-faculty attendance analytics — backed by attendanceSlice's
 * facultyAnalytics via useAttendanceAnalytics.
 */
const FacultyAnalytics = () => {
  const [query, setQuery] = useState('');
  const { facultyAnalytics, loading, fetchFacultyAnalytics } = useAttendanceAnalytics();

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim().length > 2) fetchFacultyAnalytics({ facultyId: value });
  };

  const subjectChart = formatChartData(facultyAnalytics?.subjectBreakdown ?? []);

  const STATS = [
    { label: 'Average Attendance Marked', value: facultyAnalytics?.averageAttendance != null ? `${facultyAnalytics.averageAttendance}%` : '—', icon: <FiCheckSquare size={20} />, color: 'success' },
    { label: 'Subjects Taught', value: facultyAnalytics?.subjectCount ?? '—', icon: <FiBookOpen size={20} />, color: 'primary' },
    { label: 'Students Managed', value: facultyAnalytics?.studentCount ?? '—', icon: <FiUsers size={20} />, color: 'secondary' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Header title="Faculty Analytics" description="Attendance recording consistency by faculty member" />

      <AttendanceSearch
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for a faculty member..."
        className="max-w-sm"
      />

      {loading ? (
        <Skeleton className="h-24 rounded-2xl" />
      ) : !facultyAnalytics ? (
        <EmptyState title="Search for a faculty member to view their analytics" />
      ) : (
        <>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing analytics for <span className="font-medium text-slate-700 dark:text-slate-200">{facultyAnalytics.name}</span>
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((stat) => (
              <AttendanceMetricCard key={stat.label} {...stat} />
            ))}
          </div>

          <AttendanceChartCard
            type="bar"
            title="Subject-wise Attendance"
            subtitle="Classes taught by this faculty member"
            labels={subjectChart.labels}
            data={[{ label: 'Attendance %', data: subjectChart.data }]}
          />
        </>
      )}
    </div>
  );
};

export default FacultyAnalytics;
