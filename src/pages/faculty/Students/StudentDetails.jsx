import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCheckSquare } from 'react-icons/fi';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import FacultyInfoCard from '@/components/faculty/FacultyInfoCard';
import Avatar from '@/components/common/Avatar';
import CircularProgress from '@/components/common/CircularProgress';
import Button from '@/components/common/Button';

// Placeholder detail — would be looked up by :id once wired to real data.
const STUDENT = {
  name: 'Aditi Sharma',
  rollNumber: 'CS21B045',
  section: 'A',
  attendance: 87,
  email: 'aditi.sharma@institution.edu',
  phone: '+91 98765 43210',
  department: 'Computer Science & Engineering',
  semester: '6th',
};

const StudentDetails = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="Student Details" subtitle={`Roll No. ${STUDENT.rollNumber}`} />

      <Link
        to="/faculty/students"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to students
      </Link>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={STUDENT.name} size="xl" />
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-white">{STUDENT.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Roll No. {STUDENT.rollNumber} · Section {STUDENT.section} · Student ID {id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CircularProgress value={STUDENT.attendance} size={64} />
          <Link to="/faculty/attendance/mark">
            <Button startIcon={<FiCheckSquare size={15} />}>Mark Attendance</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FacultyInfoCard
          title="Academic Information"
          fields={[
            { label: 'Department', value: STUDENT.department },
            { label: 'Semester', value: STUDENT.semester },
            { label: 'Section', value: STUDENT.section },
            { label: 'Attendance', value: `${STUDENT.attendance}%` },
          ]}
        />
        <FacultyInfoCard
          title="Contact Information"
          fields={[
            { label: 'Email', value: STUDENT.email },
            { label: 'Phone', value: STUDENT.phone },
          ]}
        />
      </div>
    </div>
  );
};

export default StudentDetails;
