import { FiDatabase, FiDownload, FiTrash2 } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import IconButton from '@/components/common/IconButton';
import Button from '@/components/common/Button';
import { formatDateTime } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const STATUS_COLOR = { completed: 'success', running: 'primary', failed: 'danger' };

/**
 * Single backup entry — created date, size, status, and
 * download/restore/delete actions.
 *
 * @param {object} props
 * @param {{id: string|number, createdAt: string, size: string, status: 'completed'|'running'|'failed'}} props.backup
 * @param {() => void} [props.onDownload]
 * @param {() => void} [props.onRestore]
 * @param {() => void} [props.onDelete]
 */
const BackupCard = ({ backup, onDownload, onRestore, onDelete, className }) => (
  <div
    className={cn(
      'flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated',
      className
    )}
  >
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-900/20">
        <FiDatabase size={16} />
      </span>
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
          {formatDateTime(backup.createdAt)}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{backup.size}</p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <Badge color={STATUS_COLOR[backup.status]}>{backup.status}</Badge>
      {backup.status === 'completed' && (
        <>
          <IconButton icon={<FiDownload size={14} />} aria-label="Download backup" size="sm" variant="ghost" onClick={onDownload} />
          <Button size="sm" variant="outlined" onClick={onRestore}>
            Restore
          </Button>
        </>
      )}
      <IconButton icon={<FiTrash2 size={14} />} aria-label="Delete backup" size="sm" variant="ghost" onClick={onDelete} />
    </div>
  </div>
);

export default BackupCard;
