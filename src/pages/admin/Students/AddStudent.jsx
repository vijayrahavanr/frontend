import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiUserPlus } from 'react-icons/fi';
import { useStudents } from '@/hooks/useStudents';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import DatePicker from '@/components/common/DatePicker';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';

const DEPARTMENT_OPTIONS = [
  { label: 'Computer Science', value: 'CSE' },
  { label: 'Electronics', value: 'ECE' },
  { label: 'Mechanical', value: 'ME' },
];

/**
 * New-student creation form — dispatches studentSlice's createStudent
 * thunk via useStudents.
 */
const AddStudent = () => {
  const navigate = useNavigate();
  const { loading, addStudent } = useStudents();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', rollNumber: '', department: '', semester: '', dob: '' },
  });

  const onSubmit = async (values) => {
    const result = await addStudent(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Student created successfully.');
      navigate('/admin/students');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Add Student" subtitle="Create a new student record" />

      <Link
        to="/admin/students"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to students
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Personal Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Full name" required error={errors.name} {...register('name', { required: 'Name is required' })} />
            <Input label="Email address" type="email" required error={errors.email} {...register('email', { required: 'Email is required' })} />
            <DatePicker label="Date of birth" {...register('dob')} />
          </div>
        </Section>

        <Section title="Academic Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Roll number" required error={errors.rollNumber} {...register('rollNumber', { required: 'Roll number is required' })} />
            <Select label="Department" options={DEPARTMENT_OPTIONS} required error={errors.department} {...register('department', { required: 'Select a department' })} />
            <Input label="Semester" type="number" {...register('semester')} />
          </div>
        </Section>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outlined" onClick={() => navigate('/admin/students')}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<FiUserPlus size={15} />} loading={loading}>
            Create Student
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
