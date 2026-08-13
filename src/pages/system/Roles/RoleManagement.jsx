import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useRoles } from '@/hooks/useRoles';
import Header from '@/components/common/Header';
import RoleCard from '@/components/system/RoleCard';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';
import Button from '@/components/common/Button';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

/**
 * Role list — backed by roleSlice via useRoles.
 */
const RoleManagement = () => {
  const { roles, loading, error, fetchRoles, removeRole } = useRoles();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    const result = await removeRole(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Role deleted successfully.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchRoles} />;

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Role Management"
        description="Define roles and manage who has access to what"
        action={
          <Link to="/system/roles/add">
            <Button size="sm" startIcon={<FiPlus size={14} />}>
              Add Role
            </Button>
          </Link>
        }
      />

      {loading && !roles.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      ) : roles.length === 0 ? (
        <EmptyState title="No roles configured" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Link key={role.id} to={role.isSystem ? '#' : `/system/roles/${role.id}/edit`}>
              <RoleCard role={role} onDelete={() => setDeleteTarget(role)} />
            </Link>
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        variant="delete"
        title="Delete role?"
        description={`${deleteTarget?.name} will be permanently removed. Users with this role will need to be reassigned.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default RoleManagement;
