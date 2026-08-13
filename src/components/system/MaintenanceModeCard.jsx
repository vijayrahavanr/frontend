import { FiTool } from 'react-icons/fi';
import Switch from '@/components/common/Switch';
import TextArea from '@/components/common/TextArea';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * Maintenance-mode toggle card: on/off switch, a status badge, and a
 * custom message shown to non-admin users while enabled.
 *
 * @param {object} props
 * @param {boolean} props.enabled
 * @param {(enabled: boolean) => void} props.onToggle
 * @param {string} props.message
 * @param {(message: string) => void} props.onMessageChange
 */
const MaintenanceModeCard = ({ enabled, onToggle, message, onMessageChange, className }) => (
  <div
    className={cn(
      'flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning/10 text-warning">
          <FiTool size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Maintenance Mode</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Temporarily restrict access for non-admin users
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge color={enabled ? 'warning' : 'success'}>{enabled ? 'Active' : 'Inactive'}</Badge>
        <Switch checked={enabled} onChange={(e) => onToggle(e.target.checked)} />
      </div>
    </div>

    {enabled && (
      <TextArea
        label="Maintenance message"
        rows={3}
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="We're currently performing scheduled maintenance. Please check back shortly."
      />
    )}
  </div>
);

export default MaintenanceModeCard;
