import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useDepartments } from '@/hooks/useDepartments';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import Skeleton from '@/components/common/Skeleton';

/**
 * Edit-department form. departmentSlice doesn't keep a separate
 * "details" field (departments are always loaded as a full list), so
 * this looks the record up from the already-fetched `departments`
 * array by :id.
 */
const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { departments, loading, fetchDepartments, editDepartment } = useDepartments();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', code: '', headOfDepartment: '', description: '' } });

  useEffect(() => {
    if (!departments.length) fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const department = departments.find((d) => String(d.id) === id);

  useEffect(() => {
    if (department) reset(department);
  }, [department, reset]);

  const onSubmit = async (values) => {
    const result = await editDepartment(id, values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Department updated successfully.');
      navigate('/admin/departments');
    }
  };

  if (loading && !department) return <Skeleton className="h-72 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Edit Department" subtitle={`Editing record #${id}`} />

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

export default EditDepartment;
