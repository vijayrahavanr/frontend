import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useCourses } from '@/hooks/useCourses';
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

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, loading, fetchCourses, editCourse } = useCourses();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', code: '', department: '', duration: '' } });

  useEffect(() => {
    if (!courses.length) fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const course = courses.find((c) => String(c.id) === id);

  useEffect(() => {
    if (course) reset(course);
  }, [course, reset]);

  const onSubmit = async (values) => {
    const result = await editCourse(id, values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Course updated successfully.');
      navigate('/admin/courses');
    }
  };

  if (loading && !course) return <Skeleton className="h-72 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Edit Course" subtitle={`Editing record #${id}`} />

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
            <Input label="Duration" {...register('duration')} />
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

export default EditCourse;
