import { motion } from 'framer-motion';
import { FiCamera, FiZap } from 'react-icons/fi';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

const STATUS_CONFIG = {
  idle: { label: 'Ready to scan', color: 'neutral' },
  scanning: { label: 'Scanning...', color: 'primary' },
  success: { label: 'Attendance marked', color: 'success' },
  error: { label: 'Scan failed', color: 'danger' },
};

/**
 * QR scanner placeholder card: a dashed camera viewport (real camera
 * wiring belongs to the QR Attendance feature module), a status
 * badge, and a start/stop button.
 *
 * @param {object} props
 * @param {'idle'|'scanning'|'success'|'error'} [props.status]
 * @param {() => void} [props.onToggleScan]
 */
const QRScannerCard = ({ status = 'idle', onToggleScan, className }) => {
  const config = STATUS_CONFIG[status];

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
        <FiCamera size={40} className="text-slate-300 dark:text-slate-600" />
      </div>

      <Badge color={config.color}>{config.label}</Badge>

      <Button
        onClick={onToggleScan}
        startIcon={<FiZap size={16} />}
        variant={status === 'scanning' ? 'outlined' : 'primary'}
      >
        {status === 'scanning' ? 'Stop scanning' : 'Start scan'}
      </Button>
    </div>
  );
};

export default QRScannerCard;
