import { FiFileText } from 'react-icons/fi';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import DateRangeFilter from './DateRangeFilter';
import EmptyState from '@/components/empty-state/EmptyState';
import { cn } from '@/utils/helpers';

const REPORT_TYPE_OPTIONS = [
  { label: 'Attendance Report', value: 'attendance' },
  { label: 'Performance Report', value: 'performance' },
  { label: 'Department Report', value: 'department' },
  { label: 'Faculty Report', value: 'faculty' },
];

/**
 * Custom report builder: report type, date range, and scope filters
 * (department/course/semester/section/subject/faculty/student), with
 * a preview placeholder and generate action.
 *
 * @param {object} props
 * @param {object} props.values - current field values
 * @param {(field: string, value: string) => void} props.onChange
 * @param {() => void} props.onGenerate
 * @param {boolean} [props.generating]
 * @param {object|null} [props.preview]
 */
const ReportBuilderCard = ({
  values,
  onChange,
  onGenerate,
  generating = false,
  preview,
  departmentOptions = [],
  courseOptions = [],
  semesterOptions = [],
  sectionOptions = [],
  subjectOptions = [],
  facultyOptions = [],
  studentOptions = [],
  className,
}) => (
  <div
    className={cn(
      'grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark lg:grid-cols-2',
      className
    )}
  >
    <div className="flex flex-col gap-4">
      <Select
        label="Report type"
        options={REPORT_TYPE_OPTIONS}
        value={values.reportType}
        onChange={(e) => onChange('reportType', e.target.value)}
      />

      <DateRangeFilter
        startDate={values.startDate}
        endDate={values.endDate}
        onChange={({ startDate, endDate }) => {
          onChange('startDate', startDate);
          onChange('endDate', endDate);
        }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Select label="Department" options={departmentOptions} value={values.department} onChange={(e) => onChange('department', e.target.value)} />
        <Select label="Course" options={courseOptions} value={values.course} onChange={(e) => onChange('course', e.target.value)} />
        <Select label="Semester" options={semesterOptions} value={values.semester} onChange={(e) => onChange('semester', e.target.value)} />
        <Select label="Section" options={sectionOptions} value={values.section} onChange={(e) => onChange('section', e.target.value)} />
        <Select label="Subject" options={subjectOptions} value={values.subject} onChange={(e) => onChange('subject', e.target.value)} />
        <Select label="Faculty" options={facultyOptions} value={values.faculty} onChange={(e) => onChange('faculty', e.target.value)} />
      </div>

      <Select label="Student (optional)" options={studentOptions} value={values.student} onChange={(e) => onChange('student', e.target.value)} />

      <Button onClick={onGenerate} loading={generating} startIcon={<FiFileText size={15} />} fullWidth>
        Generate Report
      </Button>
    </div>

    <div className="flex flex-col rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800/40">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Preview</p>
      {preview ? (
        <pre className="flex-1 overflow-auto whitespace-pre-wrap text-xs text-slate-600 dark:text-slate-300">
          {JSON.stringify(preview, null, 2)}
        </pre>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState title="No preview yet" description="Configure and generate a report to preview it here." compact />
        </div>
      )}
    </div>
  </div>
);

export default ReportBuilderCard;
