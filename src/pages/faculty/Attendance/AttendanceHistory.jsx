import { useEffect, useState } from 'react';
import { FiDownload, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFaculty } from '@/hooks/useFaculty';
import { useAttendance } from '@/hooks/useAttendance';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import DataTable from '@/components/tables/DataTable';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';

const COLUMNS = [
  { key: 'date', header: 'Date', sortable: true },
  { key: 'subject', header: 'Subject', sortable: true },
  { key: 'section', header: 'Section', hideOnMobile: true },
  { key: 'presentCount', header: 'Present', hideOnMobile: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * Faculty attendance-submission history: fetches from attendanceSlice
 * via useAttendance, filterable by assigned subject.
 */
const AttendanceHistory = () => {
  const navigate = useNavigate();
  const { assignedSubjects, fetchAssignedSubjects } = useFaculty();
  const { history, loading, error, fetchHistory, exportRecords } = useAttendance();
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchAssignedSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchHistory({ subject: subjectFilter === 'all' ? undefined : subjectFilter });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectFilter]);

  const subjectOptions = [
    { label: 'All subjects', value: 'all' },
    ...(assignedSubjects ?? []).map((s) => ({ label: s.name, value: s.code })),
  ];

  const handleExport = async () => {
    setExporting(true);
    const result = await exportRecords({ format: 'csv' });
    setExporting(false);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Export started.');
  };

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar
        title="Attendance History"
        subtitle="Every attendance session you've submitted"
        actions={
          <Button variant="outlined" size="sm" startIcon={<FiDownload size={14} />} onClick={handleExport} loading={exporting}>
            Export
          </Button>
        }
      />

      <div className="max-w-xs">
        <Select label="Filter by subject" options={subjectOptions} value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} />
      </div>

      <DataTable
        columns={COLUMNS}
        data={history.items}
        loading={loading}
        error={error}
        onRetry={() => fetchHistory({ subject: subjectFilter })}
        pageSize={8}
        searchKeys={['subject', 'section', 'status']}
        rowActions={(row) => (
          <IconButton
            icon={<FiEye size={14} />}
            aria-label={`View details for ${row.subject} on ${row.date}`}
            size="sm"
            variant="ghost"
            onClick={() => navigate(`/faculty/attendance/history/${row.id}`)}
          />
        )}
      />
    </div>
  );
};

export default AttendanceHistory;
