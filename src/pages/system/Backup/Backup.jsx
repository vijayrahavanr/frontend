import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiDatabase } from 'react-icons/fi';
import { useBackup } from '@/hooks/useBackup';
import Header from '@/components/common/Header';
import BackupCard from '@/components/system/BackupCard';
import Button from '@/components/common/Button';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

/**
 * Backup management — backed by systemSlice's backups via useBackup.
 */
const Backup = () => {
  const { backups, loading, error, fetchBackups, backupNow, restore, removeBackup } = useBackup();
  const [restoreTarget, setRestoreTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [restoring, setRestoring] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBackups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateBackup = async () => {
    const result = await backupNow();
    if (result.meta.requestStatus === 'fulfilled') toast.success('Backup created successfully.');
  };

  const handleRestoreConfirm = async () => {
    setRestoring(true);
    const result = await restore(restoreTarget.id);
    setRestoring(false);
    setRestoreTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Restore started successfully.');
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    const result = await removeBackup(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Backup deleted.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchBackups} />;

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Backup"
        description="Create and manage system data backups"
        action={
          <Button size="sm" startIcon={<FiDatabase size={14} />} onClick={handleCreateBackup} loading={loading}>
            Create Backup
          </Button>
        }
      />

      <Link
        to="/system/backup/restore"
        className="w-fit rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-500 hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-400"
      >
        View restore history →
      </Link>

      {loading && !backups.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : backups.length === 0 ? (
        <EmptyState title="No backups yet" />
      ) : (
        <div className="flex flex-col gap-2">
          {backups.map((backup) => (
            <BackupCard
              key={backup.id}
              backup={backup}
              onRestore={() => setRestoreTarget(backup)}
              onDelete={() => setDeleteTarget(backup)}
            />
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={Boolean(restoreTarget)}
        onClose={() => setRestoreTarget(null)}
        onConfirm={handleRestoreConfirm}
        variant="warning"
        title="Restore this backup?"
        description="Restoring will overwrite current data with this backup's contents. This cannot be undone."
        confirmLabel="Restore"
        loading={restoring}
      />

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        variant="delete"
        title="Delete this backup?"
        description="This backup file will be permanently removed."
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default Backup;
