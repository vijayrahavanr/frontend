import { FiCheckCircle, FiAlertTriangle, FiClock } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Compact QR usage statistics row — successful scans, duplicate
 * attempts, and average scan time.
 *
 * @param {object} props
 * @param {number} props.successfulScans
 * @param {number} props.duplicateAttempts
 * @param {string} [props.averageScanTime] - e.g. "1.8s"
 */
const QRStatisticsCard = ({ successfulScans, duplicateAttempts, averageScanTime, className }) => (
  <div
    className={cn(
      'grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark sm:grid-cols-3',
      className
    )}
  >
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
        <FiCheckCircle size={18} />
      </span>
      <div>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">{successfulScans}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Successful scans</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
        <FiAlertTriangle size={18} />
      </span>
      <div>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">{duplicateAttempts}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Duplicate attempts</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-900/20">
        <FiClock size={18} />
      </span>
      <div>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">{averageScanTime}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Avg. scan time</p>
      </div>
    </div>
  </div>
);

export default QRStatisticsCard;
