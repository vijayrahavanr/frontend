import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiShare2, FiClock } from 'react-icons/fi';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * QR code preview card: the generated code, a live expiry countdown,
 * and download/share actions. The QR image itself is a placeholder
 * (no real QR rendering library wired up in this phase).
 *
 * @param {object} props
 * @param {string} [props.qrValue] - the encoded session token/payload
 * @param {number} props.expiresInSeconds - countdown starting point
 * @param {() => void} [props.onDownload]
 * @param {() => void} [props.onShare]
 * @param {() => void} [props.onExpire]
 */
const QRCodeCard = ({ qrValue, expiresInSeconds = 60, onDownload, onShare, onExpire, className }) => {
  const [secondsLeft, setSecondsLeft] = useState(expiresInSeconds);

  useEffect(() => {
    setSecondsLeft(expiresInSeconds);
  }, [expiresInSeconds, qrValue]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire?.();
      return undefined;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onExpire]);

  const isExpiring = secondsLeft <= 10;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="relative flex h-56 w-56 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700">
        {qrValue ? (
          <div
            className="grid h-full w-full grid-cols-8 grid-rows-8 gap-0.5"
            role="img"
            aria-label="Generated QR code"
          >
            {Array.from({ length: 64 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'rounded-[1px]',
                  // Deterministic pseudo-pattern so the placeholder looks QR-like
                  (i * 7 + qrValue.length) % 3 === 0 ? 'bg-slate-900 dark:bg-white' : 'bg-transparent'
                )}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No active QR code</p>
        )}
      </div>

      <Badge color={isExpiring ? 'danger' : 'primary'}>
        <span className="flex items-center gap-1.5">
          <FiClock size={12} />
          Expires in {minutes}:{String(seconds).padStart(2, '0')}
        </span>
      </Badge>

      <motion.div
        className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
        initial={false}
      >
        <motion.div
          className={cn('h-full rounded-full', isExpiring ? 'bg-danger' : 'bg-primary')}
          animate={{ width: `${(secondsLeft / expiresInSeconds) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="flex gap-2">
        <Button variant="outlined" size="sm" startIcon={<FiDownload size={14} />} onClick={onDownload}>
          Download
        </Button>
        <Button variant="outlined" size="sm" startIcon={<FiShare2 size={14} />} onClick={onShare}>
          Share
        </Button>
      </div>
    </div>
  );
};

export default QRCodeCard;
