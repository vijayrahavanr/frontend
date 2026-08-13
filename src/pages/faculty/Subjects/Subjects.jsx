import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSubjects } from '@/hooks/useSubjects';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import SubjectCard from '@/components/faculty/SubjectCard';
import Button from '@/components/common/Button';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';

/**
 * Grid of subjects assigned to this faculty member — backed by
 * subjectSlice via useSubjects.
 */
const Subjects = () => {
  const { subjects, loading, error, fetchSubjects } = useSubjects();

  useEffect(() => {
    fetchSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchSubjects} />;

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="My Subjects" subtitle="Subjects assigned to you this semester" />

      {loading && !subjects.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      ) : subjects.length === 0 ? (
        <EmptyState title="No subjects assigned" description="You have no subjects assigned this semester." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.code}
              subject={subject}
              action={
                <Link to={`/faculty/subjects/${subject.code}`}>
                  <Button size="sm" variant="text">
                    View details
                  </Button>
                </Link>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Subjects;
