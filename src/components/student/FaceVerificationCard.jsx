import { motion } from 'framer-motion';
import { FiUserCheck, FiVideo } from 'react-icons/fi';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

const STATUS_CONFIG = {
  idle: { label: 'Camera not active', color: 'neutral' },
  scanning: { label: 'Verifying face...', color: 'primary' },
  success: { label: 'Face verified', color: 'success' },
  error: { label: 'Verification failed', color: 'danger' },
};

/**
 * Face-recognition placeholder card: a rounded camera-preview
 * viewport with a scanning-frame animation, status badge, and a
 * start/stop verification button. Real camera wiring belongs to the
 * Face Recognition feature module.
 *
 * @param {object} props
 * @param {'idle'|'scanning'|'success'|'error'} [props.status]
 * @param {() => void} [props.onToggleVerification]
 */
const FaceVerificationCard = ({ status = 'idle', onToggleVerification, className }) => {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800/50">
        {status === 'scanning' && (
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-3 rounded-full border-2 border-primary"
          />
        )}
        {status === 'success' ? (
          <FiUserCheck size={44} className="text-success" />
        ) : (
          <FiVideo size={40} className="text-slate-300 dark:text-slate-600" />
        )}
      </div>

      <Badge color={config.color}>{config.label}</Badge>

      <Button
        onClick={onToggleVerification}
        startIcon={<FiUserCheck size={16} />}
        variant={status === 'scanning' ? 'outlined' : 'primary'}
      >
        {status === 'scanning' ? 'Cancel' : 'Start verification'}
      </Button>
    </div>
  );
};

export default FaceVerificationCard;
