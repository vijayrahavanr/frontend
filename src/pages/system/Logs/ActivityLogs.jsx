import { useEffect, useState } from 'react';
import { useSystem } from '@/hooks/useSystem';
import Header from '@/components/common/Header';
import SystemLogFilter from '@/components/system/SystemLogFilter';
import ActivityLogCard from '@/components/system/ActivityLogCard';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const TYPE_OPTIONS = [
  { label: 'All activity', value: 'all' },
  { label: 'Students', value: 'student' },
  { label: 'Faculty', value: 'faculty' },
  { label: 'Admin', value: 'admin' },
];

/**
 * General user-activity log — backed by systemSlice's activityLogs
 * via useSystem.
 */
const ActivityLogs = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [date, setDate] = useState('');
  const { activityLogs, loading, error, fetchActivityLogs } = useSystem();

  useEffect(() => {
    fetchActivityLogs({
      query: query || undefined,
      type: type === 'all' ? undefined : type,
      dateFrom: date || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, type, date]);

  if (error) return <ErrorState description={error} onRetry={() => fetchActivityLogs({ query, type })} />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Activity Logs" description="General user activity across the platform" />

      <SystemLogFilter
        query={query}
        onQueryChange={setQuery}
        typeOptions={TYPE_OPTIONS}
        type={type}
        onTypeChange={setType}
        date={date}
        onDateChange={setDate}
      />

      {loading && !activityLogs.items.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : activityLogs.items.length === 0 ? (
        <EmptyState title="No matching activity" compact />
      ) : (
        <div className="flex flex-col gap-2">
          {activityLogs.items.map((entry) => (
            <ActivityLogCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;
