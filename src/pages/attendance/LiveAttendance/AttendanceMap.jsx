import { useEffect, useState } from 'react';
import { useAttendance } from '@/hooks/useAttendance';
import Header from '@/components/common/Header';
import AttendanceHeatmap from '@/components/attendance/AttendanceHeatmap';
import Select from '@/components/common/Select';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';

const SUBJECT_OPTIONS = [
  { label: 'All subjects', value: 'all' },
  { label: 'Data Structures', value: 'CS301' },
  { label: 'Operating Systems', value: 'CS302' },
];

/**
 * "Attendance map": a calendar-style heatmap of daily attendance
 * density, derived from attendanceSlice's dashboard data via
 * useAttendance (a GitHub-contributions-style grid rather than a
 * geographic map, since no mapping library is in this project's
 * tech stack).
 */
const AttendanceMap = () => {
  const { dashboard, loading, error, fetchDashboard } = useAttendance();
  const [subject, setSubject] = useState('all');

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

  if (error) return <ErrorState description={error} onRetry={fetchDashboard} />;

  const dataByDate = (dashboard?.dailyAttendance ?? []).reduce((acc, entry) => {
    acc[entry.date] = entry.percentage;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      <Header title="Attendance Map" description="Daily attendance density over the last 12 weeks" />

      <div className="max-w-xs">
        <Select label="Subject" options={SUBJECT_OPTIONS} value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>

      {loading && !dashboard ? (
        <Skeleton className="h-40 rounded-2xl" />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <AttendanceHeatmap dataByDate={dataByDate} />
        </div>
      )}
    </div>
  );
};

export default AttendanceMap;
