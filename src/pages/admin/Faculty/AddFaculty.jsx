import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiUserPlus } from 'react-icons/fi';
import { useFaculty } from '@/hooks/useFaculty';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';

const DEPARTMENT_OPTIONS = [
  { label: 'Computer Science', value: 'CSE' },
  { label: 'Electronics', value: 'ECE' },
  { label: 'Mechanical', value: 'ME' },
];
const DESIGNATION_OPTIONS = [
  { label: 'Professor', value: 'Professor' },
  { label: 'Associate Professor', value: 'Associate Professor' },
  { label: 'Assistant Professor', value: 'Assistant Professor' },
];

/**
 * New-faculty creation form — dispatches facultySlice's createFaculty
 * thunk via useFaculty.
 */
const AddFaculty = () => {
  const navigate = useNavigate();
  const { loading, addFaculty } = useFaculty();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', employeeId: '', department: '', designation: '', qualification: '' },
  });

  const onSubmit = async (values) => {
    const result = await addFaculty(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Faculty member created successfully.');
      navigate('/admin/faculty');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Add Faculty" subtitle="Create a new faculty record" />

      <Link
        to="/admin/faculty"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to faculty
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Personal Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Full name" required error={errors.name} {...register('name', { required: 'Name is required' })} />
            <Input label="Email address" type="email" required error={errors.email} {...register('email', { required: 'Email is required' })} />
          </div>
        </Section>

        <Section title="Employment Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Employee ID" required error={errors.employeeId} {...register('employeeId', { required: 'Employee ID is required' })} />
            <Select label="Department" options={DEPARTMENT_OPTIONS} required error={errors.department} {...register('department', { required: 'Select a department' })} />
            <Select label="Designation" options={DESIGNATION_OPTIONS} required error={errors.designation} {...register('designation', { required: 'Select a designation' })} />
            <Input label="Qualification" {...register('qualification')} />
          </div>
        </Section>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outlined" onClick={() => navigate('/admin/faculty')}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<FiUserPlus size={15} />} loading={loading}>
            Create Faculty
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddFaculty;
