import { useEffect } from 'react';
import { useAttendance } from '@/hooks/useAttendance';
import StudentTopbar from '@/components/student/StudentTopbar';
import DataTable from '@/components/tables/DataTable';

const COLUMNS = [
  { key: 'subject', header: 'Subject', sortable: true },
  { key: 'verifiedAt', header: 'Verified At', sortable: true },
  { key: 'confidence', header: 'Confidence', hideOnMobile: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * History of face-recognition verification attempts — sourced from
 * attendanceSlice's history, filtered to the "face" verification method.
 */
const FaceHistory = () => {
  const { history, loading, error, fetchHistory } = useAttendance();

  useEffect(() => {
    fetchHistory({ method: 'face' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="Verification History" subtitle="Every face recognition attempt on record" />
      <DataTable
        columns={COLUMNS}
        data={history.items}
        loading={loading}
        error={error}
        onRetry={() => fetchHistory({ method: 'face' })}
        pageSize={8}
        searchKeys={['subject', 'status']}
      />
    </div>
  );
};

export default FaceHistory;
