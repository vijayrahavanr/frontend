import { useState } from 'react';
import { cn } from '@/utils/helpers';

const SIZE_CLASSES = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

const STATUS_CLASSES = {
  online: 'bg-success',
  offline: 'bg-slate-400',
  busy: 'bg-danger',
  away: 'bg-warning',
};

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

/**
 * User avatar. Falls back to initials on a colored background when
 * no `src` is provided or the image fails to load.
 *
 * @param {object} props
 * @param {string} [props.src]
 * @param {string} [props.name] - used for initials fallback and alt text
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size]
 * @param {'online'|'offline'|'busy'|'away'} [props.status]
 */
const Avatar = ({ src, name = '', size = 'md', status, className, ...rest }) => {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-full font-medium text-white',
          !showImage && 'bg-gradient-to-br from-primary to-secondary',
          SIZE_CLASSES[size]
        )}
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt={name || 'User avatar'}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-label={name}>{getInitials(name) || '?'}</span>
        )}
      </span>

      {status && (
        <span
          aria-label={`Status: ${status}`}
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-surface-dark',
            size === 'xs' || size === 'sm' ? 'h-2 w-2' : 'h-3 w-3',
            STATUS_CLASSES[status]
          )}
        />
      )}
    </span>
  );
};

export default Avatar;
