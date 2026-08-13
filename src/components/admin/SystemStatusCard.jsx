import { FiServer, FiDatabase, FiWifi, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

const ICONS = { server: FiServer, database: FiDatabase, network: FiWifi };

/**
 * System status/health card — a list of service checks each with an
 * operational/degraded/down status badge.
 *
 * @param {object} props
 * @param {{label: string, type: keyof typeof ICONS, status: 'operational'|'degraded'|'down'}[]} props.services
 */
const SystemStatusCard = ({ services = [], className }) => {
  const allOperational = services.every((s) => s.status === 'operational');

  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">System Status</p>
        <Badge color={allOperational ? 'success' : 'warning'}>
          <span className="flex items-center gap-1">
            {allOperational ? <FiCheckCircle size={12} /> : <FiAlertTriangle size={12} />}
            {allOperational ? 'All systems operational' : 'Degraded'}
          </span>
        </Badge>
      </div>

      <ul className="flex flex-col gap-3">
        {services.map((service) => {
          const Icon = ICONS[service.type] || FiServer;
          return (
            <li key={service.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Icon size={14} className="text-slate-400" />
                {service.label}
              </span>
              <span
                className={cn(
                  'flex items-center gap-1.5 text-xs font-medium capitalize',
                  service.status === 'operational' && 'text-success',
                  service.status === 'degraded' && 'text-warning',
                  service.status === 'down' && 'text-danger'
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    service.status === 'operational' && 'bg-success',
                    service.status === 'degraded' && 'bg-warning',
                    service.status === 'down' && 'bg-danger'
                  )}
                />
                {service.status}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SystemStatusCard;
