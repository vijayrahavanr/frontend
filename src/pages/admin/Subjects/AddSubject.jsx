import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useSubjects } from '@/hooks/useSubjects';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';

const COURSE_OPTIONS = [
  { label: 'B.Tech in Computer Science', value: 'B.Tech-CSE' },
  { label: 'B.Tech in Electronics', value: 'B.Tech-ECE' },
];

const AddSubject = () => {
  const navigate = useNavigate();
  const { loading, addSubject } = useSubjects();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', code: '', course: '', semester: '', credits: '' } });

  const onSubmit = async (values) => {
    const result = await addSubject(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Subject created successfully.');
      navigate('/admin/subjects');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Add Subject" subtitle="Create a new subject" />

      <Link
        to="/admin/subjects"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to subjects
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Subject Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Subject name" required error={errors.name} {...register('name', { required: 'Name is required' })} />
            <Input label="Subject code" required error={errors.code} {...register('code', { required: 'Code is required' })} />
            <Select label="Course" options={COURSE_OPTIONS} required error={errors.course} {...register('course', { required: 'Select a course' })} />
            <Input label="Semester" type="number" {...register('semester')} />
            <Input label="Credits" type="number" {...register('credits')} />
          </div>
        </Section>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outlined" onClick={() => navigate('/admin/subjects')}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<FiPlus size={15} />} loading={loading}>
            Create Subject
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSubject;
