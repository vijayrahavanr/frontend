import { FiUser, FiEdit2, FiTrash2, FiPlus, FiLogIn, FiShield } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import { formatDateTime } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

const ACTION_CONFIG = {
  create: { icon: FiPlus, badgeColor: 'success', iconClass: 'bg-success/10 text-success' },
  update: { icon: FiEdit2, badgeColor: 'primary', iconClass: 'bg-primary-50 text-primary dark:bg-primary-900/20' },
  delete: { icon: FiTrash2, badgeColor: 'danger', iconClass: 'bg-danger/10 text-danger' },
  login: { icon: FiLogIn, badgeColor: 'secondary', iconClass: 'bg-secondary-50 text-secondary dark:bg-secondary-900/20' },
  permission: { icon: FiShield, badgeColor: 'warning', iconClass: 'bg-warning/10 text-warning' },
};

/**
 * Single audit-log entry — actor, action, target entity, and
 * timestamp. Used by the Audit Logs page's list view.
 *
 * @param {object} props
 * @param {{id: string|number, actor: string, action: keyof typeof ACTION_CONFIG, entity: string, description: string, timestamp: string, ipAddress?: string}} props.log
 */
const AuditLogCard = ({ log, className }) => {
  const config = ACTION_CONFIG[log.action] || ACTION_CONFIG.update;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated',
        className
      )}
    >
      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', config.iconClass)}>
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="flex items-center gap-1 text-sm font-medium text-slate-800 dark:text-slate-100">
            <FiUser size={12} className="text-slate-400" />
            {log.actor}
          </p>
          <Badge color={config.badgeColor}>{log.action}</Badge>
        </div>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{log.description}</p>
        <p className="mt-1 text-[11px] text-slate-400">
          {formatDateTime(log.timestamp)}
          {log.ipAddress && ` · ${log.ipAddress}`}
        </p>
      </div>
    </div>
  );
};

export default AuditLogCard;
