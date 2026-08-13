import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { useSystem } from '@/hooks/useSystem';
import Header from '@/components/common/Header';
import SystemLogFilter from '@/components/system/SystemLogFilter';
import AuditLogCard from '@/components/system/AuditLogCard';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import Button from '@/components/common/Button';

const TYPE_OPTIONS = [
  { label: 'All actions', value: 'all' },
  { label: 'Create', value: 'create' },
  { label: 'Update', value: 'update' },
  { label: 'Delete', value: 'delete' },
  { label: 'Login', value: 'login' },
  { label: 'Permission', value: 'permission' },
];

/**
 * Institution-wide audit log — backed by systemSlice's auditLogs via
 * useSystem.
 */
const AuditLogs = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [date, setDate] = useState('');
  const { auditLogs, loading, error, fetchAuditLogs } = useSystem();

  useEffect(() => {
    fetchAuditLogs({
      query: query || undefined,
      action: type === 'all' ? undefined : type,
      dateFrom: date || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, type, date]);

  const handleExport = () => toast.success('Audit log export started.');

  if (error) return <ErrorState description={error} onRetry={() => fetchAuditLogs({ query, action: type })} />;

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Audit Logs"
        description="Complete record of security and data-changing actions"
        action={
          <Button variant="outlined" size="sm" startIcon={<FiDownload size={14} />} onClick={handleExport}>
            Export
          </Button>
        }
      />

      <SystemLogFilter
        query={query}
        onQueryChange={setQuery}
        typeOptions={TYPE_OPTIONS}
        type={type}
        onTypeChange={setType}
        date={date}
        onDateChange={setDate}
      />

      {loading && !auditLogs.items.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : auditLogs.items.length === 0 ? (
        <EmptyState title="No matching audit logs" compact />
      ) : (
        <div className="flex flex-col gap-2">
          {auditLogs.items.map((log) => (
            <AuditLogCard key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
