import { useEffect } from 'react';
import { useReports } from '@/hooks/useReports';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import FacultyInsightCard from '@/components/analytics/FacultyInsightCard';
import AnalyticsChartCard from '@/components/analytics/AnalyticsChartCard';
import PerformanceCard from '@/components/analytics/PerformanceCard';
import Section from '@/components/common/Section';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * Faculty performance analytics — backed by reportSlice's
 * facultyReports via useReports.
 */
const FacultyPerformance = () => {
  const { facultyReports, loading, error, fetchFacultyReports } = useReports();

  useEffect(() => {
    fetchFacultyReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchFacultyReports} />;

  const facultyList = facultyReports?.list ?? [];
  const impact = formatChartData(facultyReports?.attendanceImpact ?? []);

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Faculty Performance"
        description="Attendance consistency and classroom impact by faculty member"
        breadcrumbItems={[{ label: 'Analytics', href: '/analytics/dashboard' }, { label: 'Faculty' }]}
      />

      {loading && !facultyReports ? (
        <Skeleton className="h-24 rounded-2xl" />
      ) : (
        <PerformanceCard
          title="Institution-wide Faculty Score"
          score={facultyReports?.overallScore ?? 0}
          grade={facultyReports?.overallGrade}
          subtitle={`Average across ${facultyReports?.totalFaculty ?? 0} faculty members`}
        />
      )}

      <AnalyticsChartCard
        type="bar"
        title="Student Attendance Impact"
        subtitle="Average attendance rate in each faculty member's classes"
        labels={impact.labels}
        data={[{ label: 'Attendance %', data: impact.data }]}
        loading={loading}
      />

      <Section title="Faculty Summary" spacing="sm">
        {loading && !facultyReports ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {facultyList.map((faculty) => (
              <FacultyInsightCard key={faculty.name} faculty={faculty} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default FacultyPerformance;
