import { useEffect, useState } from 'react';
import { FiUsers, FiCheckSquare, FiTrendingUp } from 'react-icons/fi';
import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import AnalyticsFilterBar from '@/components/analytics/AnalyticsFilterBar';
import AnalyticsMetricCard from '@/components/analytics/AnalyticsMetricCard';
import AnalyticsChartCard from '@/components/analytics/AnalyticsChartCard';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

const COURSE_OPTIONS = [
  { label: 'B.Tech in Computer Science', value: 'B.Tech-CSE' },
  { label: 'B.Tech in Electronics', value: 'B.Tech-ECE' },
];

/**
 * Course-level analytics — backed by attendanceSlice's
 * courseAnalytics via useAnalytics.
 */
const CourseAnalytics = () => {
  const [course, setCourse] = useState(COURSE_OPTIONS[0].value);
  const { courseAnalytics, loading, error, fetchCourseAnalytics } = useAnalytics();

  useEffect(() => {
    fetchCourseAnalytics({ course });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  if (error) return <ErrorState description={error} onRetry={() => fetchCourseAnalytics({ course })} />;

  const semesterChart = formatChartData(courseAnalytics?.semesterAttendance ?? []);

  const STATS = [
    { label: 'Enrollment', value: courseAnalytics?.enrollment?.toLocaleString() ?? '—', icon: <FiUsers size={20} />, color: 'primary' },
    { label: 'Average Attendance', value: courseAnalytics?.averageAttendance != null ? `${courseAnalytics.averageAttendance}%` : '—', icon: <FiCheckSquare size={20} />, color: 'success' },
    { label: 'Average Performance', value: courseAnalytics?.averagePerformance ?? '—', icon: <FiTrendingUp size={20} />, color: 'secondary' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Course Analytics"
        description="Enrollment, attendance, and performance by course"
        breadcrumbItems={[{ label: 'Analytics', href: '/analytics/dashboard' }, { label: 'Courses' }]}
      />

      <AnalyticsFilterBar
        filters={[{ key: 'course', label: 'Course', options: COURSE_OPTIONS, value: course, onChange: setCourse }]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading && !courseAnalytics ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          STATS.map((stat) => <AnalyticsMetricCard key={stat.label} {...stat} />)
        )}
      </div>

      <AnalyticsChartCard
        type="bar"
        title="Semester-wise Attendance"
        subtitle="Current academic year"
        labels={semesterChart.labels}
        data={[{ label: 'Attendance %', data: semesterChart.data }]}
        loading={loading}
      />
    </div>
  );
};

export default CourseAnalytics;
