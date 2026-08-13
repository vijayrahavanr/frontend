import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useRoles } from '@/hooks/useRoles';
import { usePermissions } from '@/hooks/usePermissions';
import Header from '@/components/common/Header';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import MultiSelect from '@/components/common/MultiSelect';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';

/**
 * New-role creation form — dispatches roleSlice's createRole thunk
 * via useRoles. Permission options come from roleSlice's permission
 * catalog via usePermissions.
 */
const AddRole = () => {
  const navigate = useNavigate();
  const { loading, addRole } = useRoles();
  const { permissions, fetchPermissions } = usePermissions();
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', description: '' } });

  useEffect(() => {
    fetchPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const permissionOptions = permissions.map((p) => ({ label: p.name, value: p.id }));

  const onSubmit = async (values) => {
    const result = await addRole({ ...values, permissions: selectedPermissions });
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Role created successfully.');
      navigate('/system/roles');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Header title="Add Role" description="Create a new custom role" />

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
          <Button type="button" variant="outlined" onClick={() => navigate('/system/roles')}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<FiPlus size={15} />} loading={loading}>
            Create Role
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRole;
