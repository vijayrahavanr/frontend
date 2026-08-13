import { FiCameraOff, FiVideo, FiLoader } from 'react-icons/fi';
import Button from '@/components/common/Button';
import { cn } from '@/utils/helpers';

const STATE_CONFIG = {
  idle: { icon: FiVideo, message: 'Camera preview will appear here' },
  loading: { icon: FiLoader, message: 'Requesting camera access...' },
  denied: { icon: FiCameraOff, message: 'Camera access was denied. Check your browser permissions.' },
  active: { icon: FiVideo, message: null },
};

/**
 * Generic camera viewport placeholder shared by any attendance flow
 * that needs a live camera feed (face registration/verification).
 * Handles the idle/loading/permission-denied/active states — the
 * actual video stream isn't wired up in this phase.
 *
 * @param {object} props
 * @param {'idle'|'loading'|'denied'|'active'} [props.state]
 * @param {() => void} [props.onRequestAccess]
 * @param {React.ReactNode} [props.overlay] - e.g. a face-alignment guide
 */
const CameraPreviewCard = ({ state = 'idle', onRequestAccess, overlay, className }) => {
  const config = STATE_CONFIG[state];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'relative flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center dark:border-slate-600 dark:bg-slate-800/50',
        state === 'denied' && 'border-danger/40',
        className
      )}
    >
      <Icon
        size={36}
        className={cn(
          state === 'loading' && 'animate-spin text-primary',
          state === 'denied' && 'text-danger',
          (state === 'idle' || state === 'active') && 'text-slate-300 dark:text-slate-600'
        )}
      />
      {config.message && <p className="max-w-xs px-4 text-xs text-slate-500 dark:text-slate-400">{config.message}</p>}
      {state === 'idle' && onRequestAccess && (
        <Button size="sm" variant="outlined" onClick={onRequestAccess}>
          Enable camera
        </Button>
      )}
      {state === 'denied' && onRequestAccess && (
        <Button size="sm" variant="outlined" onClick={onRequestAccess}>
          Try again
        </Button>
      )}
      {overlay}
    </div>
  );
};

export default CameraPreviewCard;
