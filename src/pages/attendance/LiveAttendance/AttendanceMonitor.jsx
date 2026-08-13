import { useEffect, useState } from 'react';
import { useAttendance } from '@/hooks/useAttendance';
import Header from '@/components/common/Header';
import LiveAttendanceCard from '@/components/attendance/LiveAttendanceCard';
import AttendanceSearch from '@/components/attendance/AttendanceSearch';
import Select from '@/components/common/Select';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const METHOD_OPTIONS = [
  { label: 'All methods', value: 'all' },
  { label: 'QR Scan', value: 'QR Scan' },
  { label: 'Face Recognition', value: 'Face Recognition' },
];

/**
 * Live attendance monitor — the fuller, filterable feed view of the
 * same liveAttendance data used by the Live Attendance dashboard
 * (see attendanceSlice.liveAttendance via useAttendance), polled
 * periodically.
 */
const AttendanceMonitor = () => {
  const { live, loading, error, fetchLive } = useAttendance();
  const [query, setQuery] = useState('');
  const [method, setMethod] = useState('all');

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const feed = live?.feed ?? [];
  const filtered = feed.filter(
    (e) => (method === 'all' || e.method === method) && e.name?.toLowerCase().includes(query.toLowerCase())
  );

  if (error) return <ErrorState description={error} onRetry={fetchLive} />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Attendance Monitor" description="Live feed of attendance scans and verifications" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <AttendanceSearch value={query} onChange={(e) => setQuery(e.target.value)} className="sm:max-w-xs" />
        <div className="max-w-xs">
          <Select options={METHOD_OPTIONS} value={method} onChange={(e) => setMethod(e.target.value)} />
        </div>
      </div>

      {loading && !feed.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching activity" compact />
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((entry) => (
            <LiveAttendanceCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceMonitor;
