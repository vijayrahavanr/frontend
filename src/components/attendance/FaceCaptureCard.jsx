import { motion } from 'framer-motion';
import { FiCamera, FiVideo } from 'react-icons/fi';
import Button from '@/components/common/Button';
import { cn } from '@/utils/helpers';

/**
 * Camera viewport for face registration, with a capture button. The
 * camera feed is a placeholder — React Webcam isn't wired up in this
 * phase.
 *
 * @param {object} props
 * @param {boolean} [props.cameraActive]
 * @param {() => void} [props.onStartCamera]
 * @param {() => void} [props.onCapture]
 */
const FaceCaptureCard = ({ cameraActive = false, onStartCamera, onCapture, className }) => (
  <div
    className={cn(
      'flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800/50">
      {cameraActive && (
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-6 rounded-2xl border-2 border-primary"
        />
      )}
      <FiVideo size={44} className="text-slate-300 dark:text-slate-600" />
    </div>

    {!cameraActive ? (
      <Button startIcon={<FiVideo size={16} />} onClick={onStartCamera}>
        Start camera
      </Button>
    ) : (
      <Button startIcon={<FiCamera size={16} />} onClick={onCapture}>
        Capture photo
      </Button>
    )}
  </div>
);

export default FaceCaptureCard;
