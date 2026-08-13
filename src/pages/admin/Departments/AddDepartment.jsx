import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useDepartments } from '@/hooks/useDepartments';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';

const AddDepartment = () => {
  const navigate = useNavigate();
  const { loading, addDepartment } = useDepartments();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', code: '', headOfDepartment: '', description: '' } });

  const onSubmit = async (values) => {
    const result = await addDepartment(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Department created successfully.');
      navigate('/admin/departments');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Add Department" subtitle="Create a new academic department" />

      <Link
        to="/admin/departments"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to departments
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Department Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Department name" required error={errors.name} {...register('name', { required: 'Name is required' })} />
            <Input label="Department code" required error={errors.code} {...register('code', { required: 'Code is required' })} />
            <Input label="Head of department" className="sm:col-span-2" {...register('headOfDepartment')} />
            <TextArea label="Description" rows={3} className="sm:col-span-2" {...register('description')} />
          </div>
        </Section>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outlined" onClick={() => navigate('/admin/departments')}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<FiPlus size={15} />} loading={loading}>
            Create Department
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
