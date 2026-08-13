import { useEffect, useState } from 'react';
import { FiDownload, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAttendance } from '@/hooks/useAttendance';
import StudentTopbar from '@/components/student/StudentTopbar';
import DataTable from '@/components/tables/DataTable';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';

const SUBJECT_OPTIONS = [
  { label: 'All subjects', value: 'all' },
  { label: 'Data Structures', value: 'CS301' },
  { label: 'Operating Systems', value: 'CS302' },
  { label: 'Database Systems', value: 'CS303' },
];

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Present', value: 'present' },
  { label: 'Absent', value: 'absent' },
  { label: 'Late', value: 'late' },
];

const COLUMNS = [
  { key: 'date', header: 'Date', sortable: true },
  { key: 'subject', header: 'Subject', sortable: true },
  { key: 'faculty', header: 'Faculty', hideOnMobile: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * Full attendance history: fetches from attendanceSlice via
 * useAttendance, with server-side subject/status filters plus the
 * shared DataTable's client-side search/sort/pagination on top.
 */
const AttendanceHistory = () => {
  const navigate = useNavigate();
  const { history, loading, error, fetchHistory, exportRecords } = useAttendance();
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchHistory({
      subject: subjectFilter === 'all' ? undefined : subjectFilter,
      status: statusFilter === 'all' ? undefined : statusFilter,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectFilter, statusFilter]);

  const handleExport = async () => {
    setExporting(true);
    const result = await exportRecords({ format: 'csv' });
    setExporting(false);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Attendance export started.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar
        title="Attendance History"
        subtitle="Every recorded session, searchable and filterable"
        actions={
          <Button
            variant="outlined"
            size="sm"
            startIcon={<FiDownload size={14} />}
            onClick={handleExport}
            loading={exporting}
          >
            Export
          </Button>
        }
      />

      <div className="grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Filter by subject"
          options={SUBJECT_OPTIONS}
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        />
        <Select
          label="Filter by status"
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>

      <DataTable
        columns={COLUMNS}
        data={history.items}
        loading={loading}
        error={error}
        onRetry={() => fetchHistory({ subject: subjectFilter, status: statusFilter })}
        pageSize={history.pageSize || 8}
        searchKeys={['subject', 'faculty', 'status']}
        rowActions={(row) => (
          <IconButton
            icon={<FiEye size={14} />}
            aria-label={`View details for ${row.subject} on ${row.date}`}
            size="sm"
            variant="ghost"
            onClick={() => navigate(`/student/attendance/history/${row.id}`)}
          />
        )}
      />
    </div>
  );
};

export default AttendanceHistory;
