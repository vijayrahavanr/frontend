import { useEffect, useState } from 'react';
import { useAttendanceAnalytics } from '@/hooks/useAttendanceAnalytics';
import Header from '@/components/common/Header';
import Select from '@/components/common/Select';
import AttendanceChartCard from '@/components/attendance/AttendanceChartCard';
import AttendanceSummaryCard from '@/components/attendance/AttendanceSummaryCard';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import { formatChartData } from '@/utils/dashboardHelpers';

const SUBJECT_OPTIONS = [
  { label: 'Data Structures', value: 'CS301' },
  { label: 'Operating Systems', value: 'CS302' },
  { label: 'Database Systems', value: 'CS303' },
];

/**
 * Per-subject attendance analytics — backed by attendanceSlice's
 * subjectAnalytics via useAttendanceAnalytics.
 */
const SubjectAnalytics = () => {
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0].value);
  const { subjectAnalytics, loading, error, fetchSubjectAnalytics } = useAttendanceAnalytics();

  useEffect(() => {
    fetchSubjectAnalytics({ subjectId: subject });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

  if (error) return <ErrorState description={error} onRetry={() => fetchSubjectAnalytics({ subjectId: subject })} />;

  const trend = formatChartData(subjectAnalytics?.trend ?? []);
  const sections = formatChartData(subjectAnalytics?.sectionComparison ?? []);

  return (
    <div className="flex flex-col gap-6">
      <Header title="Subject Analytics" description="Attendance trends for a specific subject" />

      <div className="max-w-xs">
        <Select label="Subject" options={SUBJECT_OPTIONS} value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>

      {loading && !subjectAnalytics ? (
        <Skeleton className="h-32 rounded-2xl" />
      ) : (
        subjectAnalytics && (
          <AttendanceSummaryCard
            title="Overall Attendance"
            percentage={subjectAnalytics.percentage}
            present={subjectAnalytics.present}
            absent={subjectAnalytics.absent}
          />
        )
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AttendanceChartCard
          type="line"
          title="Attendance Trend"
          subtitle="Last 6 months"
          labels={trend.labels}
          data={[{ label: 'Attendance %', data: trend.data }]}
          loading={loading}
        />
        <AttendanceChartCard
          type="bar"
          title="Section Comparison"
          subtitle="Current semester"
          labels={sections.labels}
          data={[{ label: 'Attendance %', data: sections.data }]}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SubjectAnalytics;
