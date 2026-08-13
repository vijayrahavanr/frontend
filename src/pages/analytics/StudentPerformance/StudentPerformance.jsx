import { useEffect, useState } from 'react';
import { useReports } from '@/hooks/useReports';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import StudentInsightCard from '@/components/analytics/StudentInsightCard';
import AnalyticsChartCard from '@/components/analytics/AnalyticsChartCard';
import Section from '@/components/common/Section';
import Tabs from '@/components/common/Tabs';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * Student performance analytics — backed by reportSlice's
 * studentReports via useReports.
 */
const StudentPerformance = () => {
  const [tab, setTab] = useState('top');
  const { studentReports, loading, error, fetchStudentReports } = useReports();

  useEffect(() => {
    fetchStudentReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchStudentReports} />;

  const topPerformers = studentReports?.topPerformers ?? [];
  const lowAttendance = studentReports?.lowAttendance ?? [];
  const distribution = formatChartData(studentReports?.performanceDistribution ?? []);
  const activeList = tab === 'top' ? topPerformers : lowAttendance;

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Student Performance"
        description="Rankings and performance distribution across all students"
        breadcrumbItems={[{ label: 'Analytics', href: '/analytics/dashboard' }, { label: 'Students' }]}
      />

      <AnalyticsChartCard
        type="doughnut"
        title="Performance Distribution"
        subtitle="By attendance percentage bracket"
        labels={distribution.labels}
        data={distribution.data}
        loading={loading}
        height={260}
      />

      <Section title="Student Rankings" spacing="sm">
        <Tabs
          tabs={[
            { label: 'Top Performing', value: 'top' },
            { label: 'Low Attendance', value: 'low' },
          ]}
          value={tab}
          onChange={setTab}
          className="mb-4"
        />
        {loading && !studentReports ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        ) : activeList.length === 0 ? (
          <EmptyState title="No data available" compact />
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {activeList.map((student, i) => (
              <StudentInsightCard key={student.rollNumber} student={student} rank={i + 1} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default StudentPerformance;
