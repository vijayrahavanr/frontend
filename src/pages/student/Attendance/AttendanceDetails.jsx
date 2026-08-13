import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiUser, FiCheckCircle } from 'react-icons/fi';
import { useAttendance } from '@/hooks/useAttendance';
import StudentTopbar from '@/components/student/StudentTopbar';
import Badge from '@/components/common/Badge';
import StudentInfoCard from '@/components/student/StudentInfoCard';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';
import { formatDate } from '@/utils/date.utils';

const STATUS_COLOR = { Present: 'success', Absent: 'danger', Late: 'warning' };

/**
 * Single attendance session detail, looked up by :id from the
 * history already loaded into attendanceSlice (fetches it if empty).
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
      <StudentTopbar title="Session Details" subtitle={session?.subject || 'Attendance record'} />

      <Link
        to="/student/attendance/history"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to history
      </Link>

      {!session ? (
        <EmptyState title="Session not found" description="This attendance record may have been removed." />
      ) : (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {session.subjectCode}
                </p>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {session.subject}
                </h2>
              </div>
              <Badge color={STATUS_COLOR[session.status] || 'neutral'}>
                <span className="flex items-center gap-1">
                  <FiCheckCircle size={12} />
                  {session.status}
                </span>
              </Badge>
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <FiCalendar size={14} className="text-slate-400" /> {formatDate(session.date)}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <FiClock size={14} className="text-slate-400" /> {session.time || '—'}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <FiUser size={14} className="text-slate-400" /> {session.faculty}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <FiMapPin size={14} className="text-slate-400" /> {session.room || '—'}
              </div>
            </dl>
          </div>

          <StudentInfoCard
            title="Verification Details"
            fields={[
              { label: 'Method', value: session.method },
              { label: 'Marked at', value: session.markedAt },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default AttendanceDetails;
