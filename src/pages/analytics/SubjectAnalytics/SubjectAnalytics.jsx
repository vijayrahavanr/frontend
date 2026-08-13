import { useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import AnalyticsFilterBar from '@/components/analytics/AnalyticsFilterBar';
import AnalyticsChartCard from '@/components/analytics/AnalyticsChartCard';
import PerformanceCard from '@/components/analytics/PerformanceCard';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

const SUBJECT_OPTIONS = [
  { label: 'Data Structures', value: 'CS301' },
  { label: 'Operating Systems', value: 'CS302' },
  { label: 'Database Systems', value: 'CS303' },
];

/**
 * Subject-level analytics (Analytics Center) — backed by
 * attendanceSlice's subjectAnalytics via useAnalytics.
 */
const SubjectAnalytics = () => {
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0].value);
  const { subjectAnalytics, loading, error, fetchSubjectAnalytics } = useAnalytics();

  useEffect(() => {
    fetchSubjectAnalytics({ subjectId: subject });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

  if (error) return <ErrorState description={error} onRetry={() => fetchSubjectAnalytics({ subjectId: subject })} />;

  const trend = formatChartData(subjectAnalytics?.performanceTrend ?? []);

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Subject Analytics"
        description="Attendance and performance trends for a specific subject"
        breadcrumbItems={[{ label: 'Analytics', href: '/analytics/dashboard' }, { label: 'Subjects' }]}
      />

      <AnalyticsFilterBar
        filters={[{ key: 'subject', label: 'Subject', options: SUBJECT_OPTIONS, value: subject, onChange: setSubject }]}
      />

      {loading && !subjectAnalytics ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PerformanceCard
            title="Overall Attendance"
            score={subjectAnalytics?.attendanceScore ?? 0}
            grade={subjectAnalytics?.attendanceGrade}
            subtitle={`Faculty: ${subjectAnalytics?.faculty ?? '—'} · ${subjectAnalytics?.credits ?? '—'} credits`}
          />
          <PerformanceCard
            title="Average Performance"
            score={subjectAnalytics?.performanceScore ?? 0}
            grade={subjectAnalytics?.performanceGrade}
            subtitle="Based on assessments this semester"
          />
        </div>
      )}

      <AnalyticsChartCard
        type="line"
        title="Performance Trend"
        subtitle="Last 6 months"
        labels={trend.labels}
        data={[{ label: 'Average Score', data: trend.data }]}
        loading={loading}
      />
    </div>
  );
};

export default SubjectAnalytics;
