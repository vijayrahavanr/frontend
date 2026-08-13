import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useRoles } from '@/hooks/useRoles';
import { usePermissions } from '@/hooks/usePermissions';
import Header from '@/components/common/Header';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import MultiSelect from '@/components/common/MultiSelect';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import Skeleton from '@/components/common/Skeleton';

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { roleDetails, loading, fetchRoleById, editRole } = useRoles();
  const { permissions, fetchPermissions } = usePermissions();
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', description: '' } });

  useEffect(() => {
    fetchRoleById(id);
    fetchPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (roleDetails) {
      reset({ name: roleDetails.name, description: roleDetails.description });
      setSelectedPermissions(roleDetails.permissions ?? []);
    }
  }, [roleDetails, reset]);

  const permissionOptions = permissions.map((p) => ({ label: p.name, value: p.id }));

  const onSubmit = async (values) => {
    const result = await editRole(id, { ...values, permissions: selectedPermissions });
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Role updated successfully.');
      navigate('/system/roles');
    }
  };

  if (loading && !roleDetails) return <Skeleton className="h-96 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Edit Role" description={`Editing role #${id}`} />

      <Link
        to="/system/roles"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to roles
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Role Details" spacing="sm">
          <div className="flex flex-col gap-4">
            <Input label="Role name" required error={errors.name} {...register('name', { required: 'Name is required' })} />
            <TextArea label="Description" rows={3} {...register('description')} />
            <MultiSelect
              label="Permissions"
              options={permissionOptions}
              value={selectedPermissions}
              onChange={(e) => setSelectedPermissions(e.target.value)}
            />
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

export default EditRole;
