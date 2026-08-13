import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import Skeleton from './Skeleton';
import EmptyState from '../empty-state/EmptyState';

/**
 * General-purpose content card: icon, title, description, and an
 * optional action slot. The building block for most non-tabular
 * dashboard panels.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.icon]
 * @param {React.ReactNode} [props.action]
 * @param {boolean} [props.loading]
 * @param {boolean} [props.empty]
 * @param {'flat'|'glass'|'gradient-border'} [props.variant]
 */
const InfoCard = ({
  title,
  description,
  icon,
  action,
  children,
  loading = false,
  empty = false,
  variant = 'flat',
  className,
}) => {
  const variantClasses = {
    flat: 'bg-white dark:bg-surface-dark-elevated border border-slate-200 dark:border-slate-700',
    glass:
      'bg-white/60 backdrop-blur-md border border-white/40 dark:bg-slate-900/40 dark:border-slate-700/50',
    'gradient-border': 'bg-white dark:bg-surface-dark-elevated border-2 border-transparent bg-clip-padding',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'relative rounded-2xl p-5 shadow-card transition-shadow hover:shadow-lg dark:shadow-card-dark',
        variantClasses[variant],
        variant === 'gradient-border' &&
          'before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-primary before:to-secondary before:p-[2px]',
        className
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-900/20">
              {icon}
            </span>
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
            {description && (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
            )}
          </div>
        </div>
        {action}
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : empty ? (
        <EmptyState title="Nothing here yet" compact />
      ) : (
        children
      )}
    </motion.div>
  );
};

export default InfoCard;
