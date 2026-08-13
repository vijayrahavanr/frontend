import { useEffect } from 'react';
import { useAttendance } from '@/hooks/useAttendance';
import StudentTopbar from '@/components/student/StudentTopbar';
import DataTable from '@/components/tables/DataTable';

const COLUMNS = [
  { key: 'subject', header: 'Subject', sortable: true },
  { key: 'scannedAt', header: 'Scanned At', sortable: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * History of QR scan attempts — sourced from attendanceSlice's
 * history, filtered to the "qr" verification method.
 */
const QRHistory = () => {
  const { history, loading, error, fetchHistory } = useAttendance();

  useEffect(() => {
    fetchHistory({ method: 'qr' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="QR Scan History" subtitle="Every QR attendance attempt on record" />
      <DataTable
        columns={COLUMNS}
        data={history.items}
        loading={loading}
        error={error}
        onRetry={() => fetchHistory({ method: 'qr' })}
        pageSize={8}
        searchKeys={['subject', 'status']}
      />
    </div>
  );
};

export default QRHistory;
