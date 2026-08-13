import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useDepartments } from '@/hooks/useDepartments';
import AdminTopbar from '@/components/admin/AdminTopbar';
import DepartmentCard from '@/components/admin/DepartmentCard';
import IconButton from '@/components/common/IconButton';
import Button from '@/components/common/Button';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

/**
 * Department list — backed by departmentSlice via useDepartments.
 */
const Departments = () => {
  const navigate = useNavigate();
  const { departments, loading, error, fetchDepartments, removeDepartment } = useDepartments();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    const result = await removeDepartment(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Department deleted successfully.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchDepartments} />;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar
        title="Departments"
        subtitle="Manage academic departments"
        actions={
          <Link to="/admin/departments/add">
            <Button size="sm" startIcon={<FiPlus size={14} />}>
              Add Department
            </Button>
          </Link>
        }
      />

      {loading && !departments.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : departments.length === 0 ? (
        <EmptyState title="No departments yet" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              action={
                <div className="flex gap-1">
                  <IconButton icon={<FiEdit2 size={14} />} aria-label={`Edit ${dept.name}`} size="sm" variant="ghost" onClick={() => navigate(`/admin/departments/${dept.id}/edit`)} />
                  <IconButton icon={<FiTrash2 size={14} />} aria-label={`Delete ${dept.name}`} size="sm" variant="ghost" onClick={() => setDeleteTarget(dept)} />
                </div>
              }
            />
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        variant="delete"
        title="Delete department?"
        description={`${deleteTarget?.name} will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default Departments;
