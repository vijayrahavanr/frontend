import { FiCheck, FiRotateCcw } from 'react-icons/fi';
import Button from '@/components/common/Button';
import { cn } from '@/utils/helpers';

/**
 * Preview of a just-captured face photo, with retake/confirm actions.
 *
 * @param {object} props
 * @param {string} [props.imageSrc] - object URL of the captured frame
 * @param {() => void} [props.onRetake]
 * @param {() => void} [props.onConfirm]
 * @param {boolean} [props.confirming]
 */
const FacePreviewCard = ({ imageSrc, onRetake, onConfirm, confirming = false, className }) => (
  <div
    className={cn(
      'flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
      {imageSrc ? (
        <img src={imageSrc} alt="Captured face preview" className="h-full w-full object-cover" />
      ) : (
        <p className="text-xs text-slate-400">No photo captured yet</p>
      )}
    </div>

    <div className="flex gap-2">
      <Button variant="outlined" startIcon={<FiRotateCcw size={15} />} onClick={onRetake}>
        Retake
      </Button>
      <Button startIcon={<FiCheck size={15} />} onClick={onConfirm} loading={confirming} disabled={!imageSrc}>
        Confirm
      </Button>
    </div>
  </div>
);

export default FacePreviewCard;
