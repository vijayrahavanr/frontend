import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';
import { useRoles } from '@/hooks/useRoles';
import { usePermissions } from '@/hooks/usePermissions';
import Header from '@/components/common/Header';
import PermissionMatrixTable from '@/components/system/PermissionMatrixTable';
import Button from '@/components/common/Button';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

/**
 * Role × Permission matrix editor — backed by roleSlice's matrix via
 * usePermissions, with roles from useRoles.
 */
const RolePermissionMatrix = () => {
  const { roles, loading: rolesLoading, fetchRoles } = useRoles();
  const { permissions, matrix, loading, error, isChecked, fetchPermissions, fetchMatrix, saveMatrix, toggleCell } =
    usePermissions();

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
    fetchMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = (roleId, permissionId) => toggleCell(roleId, permissionId);

  const handleSave = async () => {
    const result = await saveMatrix(matrix);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Permission matrix updated successfully.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchMatrix} />;

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Role Permission Matrix"
        description="Grant or revoke permissions for each role"
        action={
          <Button size="sm" startIcon={<FiSave size={14} />} onClick={handleSave} loading={loading}>
            Save Changes
          </Button>
        }
      />

      {(rolesLoading || loading) && !roles.length ? (
        <Skeleton className="h-96 rounded-2xl" />
      ) : (
        <PermissionMatrixTable roles={roles} permissions={permissions} isChecked={isChecked} onToggle={handleToggle} />
      )}
    </div>
  );
};

export default RolePermissionMatrix;
