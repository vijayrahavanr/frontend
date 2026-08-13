import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useSubjects } from '@/hooks/useSubjects';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import FacultyInfoCard from '@/components/faculty/FacultyInfoCard';
import DataTable from '@/components/tables/DataTable';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';

const COLUMNS = [
  { key: 'rollNumber', header: 'Roll No.', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'attendance', header: 'Attendance', sortable: true, render: (row) => `${row.attendance}%` },
];

/**
 * Subject detail (credits/semester/section/enrolled students) —
 * backed by subjectSlice via useSubjects, looked up by :code.
 */
const SubjectDetails = () => {
  const { code } = useParams();
  const { subjectDetails, loading, error, fetchSubjectDetails } = useSubjects();

  useEffect(() => {
    fetchSubjectDetails(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  if (error) return <ErrorState description={error} onRetry={() => fetchSubjectDetails(code)} />;

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="Subject Details" subtitle={`Subject code: ${code}`} />

      <Link
        to="/faculty/subjects"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to subjects
      </Link>

      {loading && !subjectDetails ? (
        <Skeleton className="h-32 rounded-2xl" />
      ) : (
        <FacultyInfoCard
          title="Subject Information"
          fields={[
            { label: 'Code', value: subjectDetails?.code ?? code },
            { label: 'Name', value: subjectDetails?.name },
            { label: 'Semester', value: subjectDetails?.semester },
            { label: 'Section', value: subjectDetails?.section },
            { label: 'Credits', value: subjectDetails?.credits },
            { label: 'Enrolled Students', value: subjectDetails?.studentCount },
          ]}
        />
      )}

      <DataTable
        columns={COLUMNS}
        data={subjectDetails?.students ?? []}
        loading={loading}
        pageSize={10}
        searchKeys={['name', 'rollNumber']}
      />
    </div>
  );
};

export default SubjectDetails;
