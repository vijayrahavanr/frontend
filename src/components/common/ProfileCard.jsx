import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import Avatar from './Avatar';
import Badge from './Badge';
import Skeleton from './Skeleton';

/**
 * Compact user summary card — avatar, name, role/subtitle, and an
 * optional status badge and action slot.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} [props.subtitle]
 * @param {string} [props.avatarSrc]
 * @param {'online'|'offline'|'busy'|'away'} [props.status]
 * @param {boolean} [props.loading]
 */
const ProfileCard = ({
  name,
  subtitle,
  avatarSrc,
  status,
  badge,
  action,
  loading = false,
  className,
}) => {
  if (loading) {
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated',
          className
        )}
      >
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition-shadow hover:shadow-lg',
        'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <Avatar src={avatarSrc} name={name} size="lg" status={status} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
          {name}
        </p>
        {subtitle && (
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
        {badge && <Badge color="primary" className="mt-1">{badge}</Badge>}
      </div>
      {action}
    </motion.div>
  );
};

export default ProfileCard;
