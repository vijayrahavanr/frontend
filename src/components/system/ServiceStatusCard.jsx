import { FiServer, FiDatabase, FiWifi, FiCloud, FiCheckCircle, FiAlertTriangle, FiXCircle } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const ICONS = { server: FiServer, database: FiDatabase, network: FiWifi, storage: FiCloud };
const STATUS_CONFIG = {
  operational: { icon: FiCheckCircle, className: 'text-success' },
  degraded: { icon: FiAlertTriangle, className: 'text-warning' },
  down: { icon: FiXCircle, className: 'text-danger' },
};

/**
 * Single service health row — icon, name, uptime, and a status
 * indicator. Used by System Health / Application Health pages.
 *
 * @param {object} props
 * @param {{name: string, type: keyof typeof ICONS, status: 'operational'|'degraded'|'down', uptime?: string, latency?: string}} props.service
 */
const ServiceStatusCard = ({ service, className }) => {
  const Icon = ICONS[service.type] || FiServer;
  const status = STATUS_CONFIG[service.status] || STATUS_CONFIG.operational;
  const StatusIcon = status.icon;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <Icon size={16} />
        </span>
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{service.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {service.uptime ? `Uptime ${service.uptime}` : ''}
            {service.latency ? ` · ${service.latency} latency` : ''}
          </p>
        </div>
      </div>
      <span className={cn('flex items-center gap-1.5 text-xs font-medium capitalize', status.className)}>
        <StatusIcon size={14} />
        {service.status}
      </span>
    </div>
  );
};

export default ServiceStatusCard;
