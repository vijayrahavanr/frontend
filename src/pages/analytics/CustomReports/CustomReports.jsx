import { useState } from 'react';
import toast from 'react-hot-toast';
import { useReports } from '@/hooks/useReports';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import ReportBuilderCard from '@/components/analytics/ReportBuilderCard';
import Alert from '@/components/common/Alert';
import { validateExportConfig } from '@/utils/exportHelpers';

const DEPARTMENT_OPTIONS = [{ label: 'All departments', value: 'all' }, { label: 'Computer Science', value: 'CSE' }];
const COURSE_OPTIONS = [{ label: 'All courses', value: 'all' }, { label: 'B.Tech-CSE', value: 'B.Tech-CSE' }];
const SEMESTER_OPTIONS = [{ label: 'All semesters', value: 'all' }, { label: 'Semester 6', value: '6' }];
const SECTION_OPTIONS = [{ label: 'All sections', value: 'all' }, { label: 'Section A', value: 'A' }];
const SUBJECT_OPTIONS = [{ label: 'All subjects', value: 'all' }, { label: 'Data Structures', value: 'CS301' }];
const FACULTY_OPTIONS = [{ label: 'All faculty', value: 'all' }, { label: 'Dr. Ravi Menon', value: 'ravi-menon' }];
const STUDENT_OPTIONS = [{ label: 'All students', value: 'all' }, { label: 'Aditi Sharma', value: 'aditi-sharma' }];

const DEFAULT_VALUES = {
  reportType: 'attendance',
  startDate: '',
  endDate: '',
  department: 'all',
  course: 'all',
  semester: 'all',
  section: 'all',
  subject: 'all',
  faculty: 'all',
  student: 'all',
};

/**
 * Custom report builder — dispatches reportSlice's
 * generateCustomReport thunk via useReports.
 */
const CustomReports = () => {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const { customReports, loading, error, generateReport, resetError } = useReports();

  const handleChange = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));

  const handleGenerate = async () => {
    const validationErrors = validateExportConfig(values);
    if (validationErrors.length) {
      toast.error(validationErrors[0]);
      return;
    }
    const result = await generateReport(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Report generated successfully.');
    }
  };

  const preview = customReports?.[0] ?? null;

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Custom Report Builder"
        description="Configure and generate a tailored report"
        breadcrumbItems={[{ label: 'Analytics', href: '/analytics/dashboard' }, { label: 'Custom Reports' }]}
      />

      {error && (
        <Alert type="error" title="Couldn't generate report" onDismiss={resetError}>
          {error}
        </Alert>
      )}

      <ReportBuilderCard
        values={values}
        onChange={handleChange}
        onGenerate={handleGenerate}
        generating={loading}
        preview={preview}
        departmentOptions={DEPARTMENT_OPTIONS}
        courseOptions={COURSE_OPTIONS}
        semesterOptions={SEMESTER_OPTIONS}
        sectionOptions={SECTION_OPTIONS}
        subjectOptions={SUBJECT_OPTIONS}
        facultyOptions={FACULTY_OPTIONS}
        studentOptions={STUDENT_OPTIONS}
      />
    </div>
  );
};

export default CustomReports;
