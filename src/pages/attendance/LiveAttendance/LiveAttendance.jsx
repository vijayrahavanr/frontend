import { useEffect } from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiClock } from 'react-icons/fi';
import { useAttendance } from '@/hooks/useAttendance';
import Header from '@/components/common/Header';
import AttendanceStatusCard from '@/components/attendance/AttendanceStatusCard';
import AttendanceTimeline from '@/components/attendance/AttendanceTimeline';
import Section from '@/components/common/Section';
import Badge from '@/components/common/Badge';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';

/**
 * Live attendance dashboard — backed by attendanceSlice's
 * liveAttendance via useAttendance, polled periodically for
 * near-real-time updates.
 */
const LiveAttendance = () => {
  const { live, loading, error, fetchLive } = useAttendance();

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchLive} />;

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Live Attendance"
        description="Real-time attendance for the current session"
        action={<Badge color={live ? 'success' : 'neutral'}>{live ? 'Session active' : 'No active session'}</Badge>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading && !live ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)
        ) : (
          <>
            <AttendanceStatusCard variant="total" label="Total Students" value={live?.total ?? '—'} icon={<FiUsers size={18} />} />
            <AttendanceStatusCard variant="present" label="Present" value={live?.present ?? '—'} icon={<FiUserCheck size={18} />} />
            <AttendanceStatusCard variant="late" label="Late" value={live?.late ?? '—'} icon={<FiClock size={18} />} />
            <AttendanceStatusCard variant="absent" label="Absent" value={live?.absent ?? '—'} icon={<FiUserX size={18} />} />
          </>
        )}
      </div>

      <Section title="Recent Activity" spacing="sm">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          {loading && !live ? (
            <Skeleton className="h-40 w-full" />
          ) : live?.recentActivity?.length ? (
            <AttendanceTimeline entries={live.recentActivity} />
          ) : (
            <EmptyState title="No activity yet" compact />
          )}
        </div>
      </Section>
    </div>
  );
};

export default LiveAttendance;
