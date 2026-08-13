import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import { useBackup } from '@/hooks/useBackup';
import Header from '@/components/common/Header';
import FileUpload from '@/components/common/FileUpload';
import Button from '@/components/common/Button';
import DataTable from '@/components/tables/DataTable';
import ErrorState from '@/components/error/ErrorState';

const COLUMNS = [
  { key: 'date', header: 'Date', sortable: true },
  { key: 'source', header: 'Source', hideOnMobile: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * Restore from an uploaded backup file — backed by systemSlice's
 * restoreHistory via useBackup.
 */
const Restore = () => {
  const { restoreHistory, loading, error, fetchRestoreHistory, restoreUpload } = useBackup();
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchRestoreHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRestore = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const result = await restoreUpload(formData);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Restore from uploaded file started.');
      setFile(null);
      fetchRestoreHistory();
    }
  };

  if (error) return <ErrorState description={error} onRetry={fetchRestoreHistory} />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Restore" description="Restore system data from a backup file" />

      <Link
        to="/system/backup"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to backups
      </Link>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark-elevated">
        <FileUpload
          label="Backup file"
          accept=".zip,.sql,.tar.gz"
          helperText="Upload a previously exported backup file"
          onChange={(selectedFile) => setFile(selectedFile)}
        />
        <Button startIcon={<FiUpload size={15} />} className="self-end" onClick={handleRestore} disabled={!file} loading={loading}>
          Restore from File
        </Button>
      </div>

      <DataTable
        columns={COLUMNS}
        data={restoreHistory.items}
        loading={loading}
        pageSize={8}
        searchKeys={['source', 'status']}
      />
    </div>
  );
};

export default Restore;
