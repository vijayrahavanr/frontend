import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useStudents } from '@/hooks/useStudents';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import Skeleton from '@/components/common/Skeleton';

const DEPARTMENT_OPTIONS = [
  { label: 'Computer Science', value: 'CSE' },
  { label: 'Electronics', value: 'ECE' },
  { label: 'Mechanical', value: 'ME' },
];

/**
 * Edit-student form, pre-filled from studentSlice's studentDetails
 * (fetched by :id), dispatching updateStudent on submit.
 */
const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { studentDetails, loading, fetchStudentById, editStudent } = useStudents();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', rollNumber: '', department: '', semester: '' } });

  useEffect(() => {
    fetchStudentById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (studentDetails) reset(studentDetails);
  }, [studentDetails, reset]);

  const onSubmit = async (values) => {
    const result = await editStudent(id, values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Student updated successfully.');
      navigate(`/admin/students/${id}`);
    }
  };

  if (loading && !studentDetails) return <Skeleton className="h-96 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Edit Student" subtitle={`Editing record #${id}`} />

      <Link
        to={`/admin/students/${id}`}
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to student details
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Personal Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Full name" required error={errors.name} {...register('name', { required: 'Name is required' })} />
            <Input label="Email address" type="email" required error={errors.email} {...register('email', { required: 'Email is required' })} />
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
          <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<FiSave size={15} />} loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
