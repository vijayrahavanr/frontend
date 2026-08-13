import { cn } from '@/utils/helpers';

/**
 * Base skeleton block for building custom loading placeholders.
 * Compose multiple with different width/height utility classes to
 * approximate the shape of the content that will load in.
 */
const Skeleton = ({ className, circle = false, ...rest }) => (
  <div
    aria-hidden="true"
    className={cn(
      'animate-pulse bg-slate-200 dark:bg-slate-700',
      circle ? 'rounded-full' : 'rounded-md',
      className
    )}
    {...rest}
  />
);

export default Skeleton;
