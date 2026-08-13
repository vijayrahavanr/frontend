import { motion } from 'framer-motion';
import { FiCamera, FiCheckCircle, FiXCircle, FiAlertTriangle } from 'react-icons/fi';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

const STATUS_CONFIG = {
  idle: { label: 'Ready to scan', color: 'neutral' },
  scanning: { label: 'Scanning...', color: 'primary' },
  success: { label: 'Attendance marked', color: 'success', icon: FiCheckCircle },
  duplicate: { label: 'Already scanned', color: 'warning', icon: FiAlertTriangle },
  error: { label: 'Scan failed', color: 'danger', icon: FiXCircle },
};

/**
 * QR scan viewport with result/status handling, including a distinct
 * "duplicate scan" warning state. The camera feed itself is a
 * placeholder — no real QR scanner library wired up in this phase.
 *
 * @param {object} props
 * @param {'idle'|'scanning'|'success'|'duplicate'|'error'} [props.status]
 * @param {string} [props.message] - detail line shown under the status badge
 * @param {() => void} [props.onToggleScan]
 */
const QRScannerCard = ({ status = 'idle', message, onToggleScan, className }) => {
  const config = STATUS_CONFIG[status];
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="relative flex h-56 w-56 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800/50">
        {status === 'scanning' && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 100 }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute left-4 right-4 h-0.5 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(37,99,235,0.6)]"
          />
        )}
        {StatusIcon ? (
          <StatusIcon
            size={44}
            className={cn(
              status === 'success' && 'text-success',
              status === 'duplicate' && 'text-warning',
              status === 'error' && 'text-danger'
            )}
          />
        ) : (
          <FiCamera size={40} className="text-slate-300 dark:text-slate-600" />
        )}
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <Badge color={config.color}>{config.label}</Badge>
        {message && <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400">{message}</p>}
      </div>

      <Button
        onClick={onToggleScan}
        variant={status === 'scanning' ? 'outlined' : 'primary'}
        startIcon={<FiCamera size={16} />}
      >
        {status === 'scanning' ? 'Stop scanning' : 'Start scan'}
      </Button>
    </div>
  );
};

export default QRScannerCard;
