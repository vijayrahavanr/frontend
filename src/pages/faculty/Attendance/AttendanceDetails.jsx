import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useAttendance } from '@/hooks/useAttendance';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import AttendanceOverviewCard from '@/components/faculty/AttendanceOverviewCard';
import DataTable from '@/components/tables/DataTable';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';
import { formatDate } from '@/utils/date.utils';
import { calculateAttendancePercentage } from '@/utils/attendanceHelpers';

const COLUMNS = [
  { key: 'rollNumber', header: 'Roll No.', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * A single attendance session's roster and outcome, looked up by
 * :id from attendanceSlice's history (fetches it if empty).
 */
const AttendanceDetails = () => {
  const { id } = useParams();
  const { history, loading, error, fetchHistory } = useAttendance();

  useEffect(() => {
    if (!history.items.length) fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const session = history.items.find((item) => String(item.id) === id);

  if (loading) return <Skeleton className="h-64 rounded-2xl" />;
  if (error) return <ErrorState description={error} onRetry={fetchHistory} />;

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar
        title="Session Details"
        subtitle={session ? `${session.subject} — Section ${session.section}, ${formatDate(session.date)}` : ''}
      />

      <Link
        to="/faculty/attendance/history"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to history
      </Link>

      {!session ? (
        <EmptyState title="Session not found" description="This attendance record may have been removed." />
      ) : (
        <>
          <AttendanceOverviewCard
            percentage={calculateAttendancePercentage(session.presentCount, session.totalCount)}
            present={session.presentCount}
            absent={(session.totalCount ?? 0) - (session.presentCount ?? 0)}
            total={session.totalCount}
          />

          <DataTable
            columns={COLUMNS}
            data={session.students ?? []}
            pageSize={10}
            searchKeys={['name', 'rollNumber']}
          />
        </>
      )}
    </div>
  );
};

export default AttendanceDetails;
