import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { usePermissions } from '@/hooks/usePermissions';
import Header from '@/components/common/Header';
import DataTable from '@/components/tables/DataTable';
import Button from '@/components/common/Button';
import Modal from '@/components/modals/Modal';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import ErrorState from '@/components/error/ErrorState';

const COLUMNS = [
  { key: 'name', header: 'Permission', sortable: true },
  { key: 'category', header: 'Category', sortable: true },
  { key: 'description', header: 'Description', hideOnMobile: true },
];

/**
 * Permission catalog — backed by roleSlice's permissions via
 * usePermissions.
 */
const PermissionManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { permissions, loading, error, fetchPermissions, addPermission } = usePermissions();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { key: '', category: '', description: '' } });

  useEffect(() => {
    fetchPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    const result = await addPermission(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Permission created successfully.');
      reset();
      setModalOpen(false);
    }
  };

  if (error) return <ErrorState description={error} onRetry={fetchPermissions} />;

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Permission Management"
        description="Manage the catalog of permissions available to roles"
        action={
          <Button size="sm" startIcon={<FiPlus size={14} />} onClick={() => setModalOpen(true)}>
            Add Permission
          </Button>
        }
      />

      <DataTable columns={COLUMNS} data={permissions} loading={loading} pageSize={10} searchKeys={['name', 'category', 'description']} />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Permission"
        footer={
          <>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} loading={loading}>
              Create
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Permission key" placeholder="e.g. manage_timetable" required error={errors.key} {...register('key', { required: 'Permission key is required' })} />
          <Input label="Category" placeholder="e.g. Timetable" required error={errors.category} {...register('category', { required: 'Category is required' })} />
          <TextArea label="Description" rows={3} {...register('description')} />
        </form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
