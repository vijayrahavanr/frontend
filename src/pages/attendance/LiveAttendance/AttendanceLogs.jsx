import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAttendance } from '@/hooks/useAttendance';
import Header from '@/components/common/Header';
import AttendanceFilter from '@/components/attendance/AttendanceFilter';
import AttendanceExportCard from '@/components/attendance/AttendanceExportCard';
import DataTable from '@/components/tables/DataTable';

const METHOD_OPTIONS = [
  { label: 'All methods', value: 'all' },
  { label: 'QR Scan', value: 'QR Scan' },
  { label: 'Face Recognition', value: 'Face Recognition' },
  { label: 'Manual', value: 'Manual' },
];
const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Present', value: 'Present' },
  { label: 'Late', value: 'Late' },
  { label: 'Absent', value: 'Absent' },
];

const COLUMNS = [
  { key: 'date', header: 'Date', sortable: true },
  { key: 'student', header: 'Student', sortable: true },
  { key: 'subject', header: 'Subject', hideOnMobile: true },
  { key: 'method', header: 'Method', hideOnMobile: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * Full attendance logs table — backed by attendanceSlice's
 * attendanceLogs via useAttendance, with method/status/date filters.
 */
const AttendanceLogs = () => {
  const { logs, loading, error, fetchLogs, exportRecords } = useAttendance();
  const [method, setMethod] = useState('all');
  const [status, setStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchLogs({
      method: method === 'all' ? undefined : method,
      status: status === 'all' ? undefined : status,
      dateFrom: dateFrom || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, status, dateFrom]);

  const handleExport = async () => {
    setExporting(true);
    const result = await exportRecords({ format: 'csv', dateFrom });
    setExporting(false);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Export started.');
  };

  return (
    <div className="flex flex-col gap-6">
      <Header title="Attendance Logs" description="Complete record of every attendance event" />

      <AttendanceFilter
        filters={[
          { key: 'date', label: 'From date', type: 'date', value: dateFrom, onChange: setDateFrom },
          { key: 'method', label: 'Method', type: 'select', options: METHOD_OPTIONS, value: method, onChange: setMethod },
          { key: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS, value: status, onChange: setStatus },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        data={logs.items}
        loading={loading}
        error={error}
        onRetry={() => fetchLogs({ method, status, dateFrom })}
        pageSize={logs.pageSize || 10}
        searchKeys={['student', 'subject', 'method', 'status']}
      />

      <AttendanceExportCard
        title="Export attendance logs"
        description="Download filtered logs as CSV or PDF."
        onExport={handleExport}
        exporting={exporting}
      />
    </div>
  );
};

export default AttendanceLogs;
