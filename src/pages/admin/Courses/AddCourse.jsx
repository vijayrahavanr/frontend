import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useCourses } from '@/hooks/useCourses';
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

const AddCourse = () => {
  const navigate = useNavigate();
  const { loading, addCourse } = useCourses();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', code: '', department: '', duration: '' } });

  const onSubmit = async (values) => {
    const result = await addCourse(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Course created successfully.');
      navigate('/admin/courses');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Add Course" subtitle="Create a new academic course" />

      <Link
        to="/admin/courses"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to courses
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Course Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Course name" required error={errors.name} {...register('name', { required: 'Name is required' })} />
            <Input label="Course code" required error={errors.code} {...register('code', { required: 'Code is required' })} />
            <Select label="Department" options={DEPARTMENT_OPTIONS} required error={errors.department} {...register('department', { required: 'Select a department' })} />
            <Input label="Duration" placeholder="e.g. 4 years" {...register('duration')} />
          </div>
        </Section>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outlined" onClick={() => navigate('/admin/courses')}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<FiPlus size={15} />} loading={loading}>
            Create Course
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
