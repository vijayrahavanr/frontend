import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAttendance } from '@/hooks/useAttendance';
import StudentTopbar from '@/components/student/StudentTopbar';
import AttendanceSummaryCard from '@/components/student/AttendanceSummaryCard';
import AttendanceProgressCard from '@/components/student/AttendanceProgressCard';
import AttendanceCalendar from '@/components/student/AttendanceCalendar';
import SubjectCard from '@/components/student/SubjectCard';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';
import { groupAttendanceByDate } from '@/utils/attendanceHelpers';

/**
 * Attendance overview: summary ring, requirement progress, a month
 * calendar, and subject-wise breakdown — all backed by
 * attendanceSlice via useAttendance.
 */
const Attendance = () => {
  const { summary, loading, error, fetchSummary, exportRecords } = useAttendance();
  const [filter, setFilter] = useState('all');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExport = async () => {
    setExporting(true);
    const result = await exportRecords({ format: 'csv' });
    setExporting(false);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Attendance export started.');
    }
  };

  if (error) {
    return <ErrorState description={error} onRetry={fetchSummary} />;
  }

  const subjects = summary?.subjects ?? [];
  const filteredSubjects = subjects.filter((s) => {
    if (filter === 'at risk') return s.attendance < 75;
    if (filter === 'safe') return s.attendance >= 75;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar
        title="Attendance"
        subtitle="Track your subject-wise and monthly attendance"
        actions={
          <Button
            variant="outlined"
            size="sm"
            startIcon={<FiDownload size={14} />}
            onClick={handleExport}
            loading={exporting}
          >
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {loading ? (
          <>
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </>
        ) : summary ? (
          <>
            <AttendanceSummaryCard
              percentage={summary.percentage}
              present={summary.present}
              absent={summary.absent}
              late={summary.late}
            />
            <AttendanceProgressCard current={summary.percentage} required={summary.required ?? 75} />
          </>
        ) : (
          <EmptyState title="No attendance data yet" className="lg:col-span-2" />
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AttendanceCalendar
          statusByDate={groupAttendanceByDate(summary?.records ?? [])}
          className="lg:col-span-1"
        />

        <div className="lg:col-span-2">
          <Section
            title="Subject-wise Attendance"
            spacing="sm"
            action={
              <div className="flex gap-2">
                {['all', 'at risk', 'safe'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                      filter === f
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            }
          >
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-2xl" />
                ))}
              </div>
            ) : filteredSubjects.length ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredSubjects.map((subject) => (
                  <SubjectCard key={subject.code} subject={subject} />
                ))}
              </div>
            ) : (
              <EmptyState title="No subjects match this filter" compact />
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
