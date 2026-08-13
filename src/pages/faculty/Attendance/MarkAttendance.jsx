import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FiCheckCircle } from 'react-icons/fi';
import { useFaculty } from '@/hooks/useFaculty';
import { useAttendance } from '@/hooks/useAttendance';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import AttendanceOverviewCard from '@/components/faculty/AttendanceOverviewCard';
import StudentAttendanceCard from '@/components/faculty/StudentAttendanceCard';
import Select from '@/components/common/Select';
import DatePicker from '@/components/common/DatePicker';
import SearchInput from '@/components/common/SearchInput';
import Button from '@/components/common/Button';
import EmptyState from '@/components/empty-state/EmptyState';
import Alert from '@/components/common/Alert';
import Skeleton from '@/components/common/Skeleton';
import { calculateAttendancePercentage } from '@/utils/attendanceHelpers';

const SECTION_OPTIONS = [
  { label: 'Section A', value: 'A' },
  { label: 'Section B', value: 'B' },
];

/**
 * Mark Attendance page: choose subject/section/date, then set each
 * student's status via a three-way toggle, submitting via
 * attendanceSlice's markAttendance thunk (useAttendance).
 */
const MarkAttendance = () => {
  const { assignedSubjects, fetchAssignedSubjects } = useFaculty();
  const { attendanceList, loading, error, submitAttendance } = useAttendance();

  const [subject, setSubject] = useState('');
  const [section, setSection] = useState('A');
  const [date, setDate] = useState('');
  const [query, setQuery] = useState('');
  const [statuses, setStatuses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchAssignedSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!subject && assignedSubjects?.length) setSubject(assignedSubjects[0].code);
  }, [assignedSubjects, subject]);

  const subjectOptions = (assignedSubjects ?? []).map((s) => ({ label: s.name, value: s.code }));

  const filteredStudents = (attendanceList ?? []).filter(
    (s) =>
      s.name?.toLowerCase().includes(query.toLowerCase()) ||
      s.rollNumber?.toLowerCase().includes(query.toLowerCase())
  );

  const summary = useMemo(() => {
    const values = Object.values(statuses);
    const present = values.filter((v) => v === 'present').length;
    const absent = values.filter((v) => v === 'absent').length;
    const late = values.filter((v) => v === 'late').length;
    return { present, absent, late, total: attendanceList?.length ?? 0 };
  }, [statuses, attendanceList]);

  const markAll = (status) => {
    setStatuses(Object.fromEntries((attendanceList ?? []).map((s) => [s.id, status])));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const records = Object.entries(statuses).map(([studentId, status]) => ({ studentId, status }));
    const result = await submitAttendance({ subjectId: subject, section, date, records });
    setSubmitting(false);
    if (result.meta.requestStatus === 'fulfilled') {
      setSubmitted(true);
      toast.success('Attendance submitted successfully.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="Mark Attendance" subtitle="Record attendance for a class session" />

      {error && <Alert type="error" title="Couldn't submit attendance">{error}</Alert>}

      {submitted && (
        <div className="flex items-center gap-2 rounded-xl bg-success/10 px-4 py-3 text-sm text-success-700 dark:text-success">
          <FiCheckCircle size={16} />
          Attendance submitted successfully.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated sm:grid-cols-3">
        <Select label="Subject" options={subjectOptions} value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Select label="Section" options={SECTION_OPTIONS} value={section} onChange={(e) => setSection(e.target.value)} />
        <DatePicker label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <AttendanceOverviewCard
        percentage={calculateAttendancePercentage(summary.present, summary.total)}
        present={summary.present}
        absent={summary.absent}
        late={summary.late}
        total={summary.total}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} className="sm:max-w-xs" />
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={() => markAll('present')}>
            Mark all present
          </Button>
          <Button variant="outlined" size="sm" onClick={() => setStatuses({})}>
            Reset
          </Button>
        </div>
      </div>

      {loading && !attendanceList?.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : filteredStudents.length === 0 ? (
        <EmptyState title="No students found" description="Select a subject and section to load the roster." compact />
      ) : (
        <div className="flex flex-col gap-2">
          {filteredStudents.map((student) => (
            <StudentAttendanceCard
              key={student.id}
              student={student}
              status={statuses[student.id]}
              onStatusChange={(status) => setStatuses((prev) => ({ ...prev, [student.id]: status }))}
            />
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleSubmit} loading={submitting} startIcon={<FiCheckCircle size={16} />}>
          Submit Attendance
        </Button>
      </div>
    </div>
  );
};

export default MarkAttendance;
