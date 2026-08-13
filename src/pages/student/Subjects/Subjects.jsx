import { useEffect } from 'react';
import { useAttendance } from '@/hooks/useAttendance';
import StudentTopbar from '@/components/student/StudentTopbar';
import SubjectCard from '@/components/student/SubjectCard';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';

/**
 * Grid of all enrolled subjects for the current semester — sourced
 * from attendanceSlice's summary (each subject's attendance % lives
 * there already, so there's no need for a separate subjects fetch).
 */
const Subjects = () => {
  const { summary, loading, error, fetchSummary } = useAttendance();

  useEffect(() => {
    if (!summary) fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchSummary} />;

  const subjects = summary?.subjects ?? [];

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="My Subjects" subtitle="Subjects enrolled for this semester" />

      {loading && !subjects.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : subjects.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.code} subject={subject} />
          ))}
        </div>
      ) : (
        <EmptyState title="No subjects found" description="You're not enrolled in any subjects yet." />
      )}
    </div>
  );
};

export default Subjects;
