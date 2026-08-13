import { FiDownload, FiFileText } from 'react-icons/fi';
import Button from '@/components/common/Button';
import { cn } from '@/utils/helpers';

/**
 * Export action card — icon, label, and a download button. Used
 * across QR History, Recognition History, Attendance Logs, and
 * Analytics pages for their respective export actions.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {() => void} [props.onExport]
 * @param {boolean} [props.exporting]
 */
const AttendanceExportCard = ({
  title = 'Export data',
  description = 'Download this data as a CSV or PDF file.',
  onExport,
  exporting = false,
  className,
}) => (
  <div
    className={cn(
      'flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary dark:bg-secondary-900/20">
        <FiFileText size={18} />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
    <Button variant="outlined" size="sm" startIcon={<FiDownload size={14} />} onClick={onExport} loading={exporting}>
      Export
    </Button>
  </div>
);

export default AttendanceExportCard;
