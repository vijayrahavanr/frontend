import Switch from '@/components/common/Switch';
import { cn } from '@/utils/helpers';

/**
 * A single labeled on/off configuration row — mirrors the
 * SettingsRow pattern already used inline on each role's Settings
 * page, promoted to a shared component for the system configuration
 * pages.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.icon]
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {boolean} props.checked
 * @param {(checked: boolean) => void} props.onChange
 */
const ConfigToggleRow = ({ icon, title, description, checked, onChange, className }) => (
  <div className={cn('flex items-center justify-between gap-4', className)}>
    <div className="flex items-center gap-3">
      {icon && (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {icon}
        </span>
      )}
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{title}</p>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
    </div>
    <Switch checked={checked} onChange={(e) => onChange(e.target.checked)} />
  </div>
);

export default ConfigToggleRow;
