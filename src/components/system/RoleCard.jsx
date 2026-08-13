import { FiShield, FiUsers, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import IconButton from '@/components/common/IconButton';
import { cn } from '@/utils/helpers';

/**
 * Role summary tile: name, description, assigned-user count, and
 * permission count, with edit/delete actions.
 *
 * @param {object} props
 * @param {{id: string|number, name: string, description?: string, userCount: number, permissionCount: number, isSystem?: boolean}} props.role
 * @param {() => void} [props.onEdit]
 * @param {() => void} [props.onDelete]
 */
const RoleCard = ({ role, onEdit, onDelete, className }) => (
  <div
    className={cn(
      'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="flex items-start justify-between">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-900/20">
        <FiShield size={18} />
      </span>
      {role.isSystem && <Badge color="neutral">System</Badge>}
    </div>

    <div>
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{role.name}</h3>
      {role.description && (
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{role.description}</p>
      )}
    </div>

    <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
      <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <FiUsers size={12} /> {role.userCount} users
        </span>
        <span>{role.permissionCount} permissions</span>
      </div>
      {!role.isSystem && (
        <div className="flex gap-1">
          {onEdit && <IconButton icon={<FiEdit2 size={13} />} aria-label={`Edit ${role.name}`} size="sm" variant="ghost" onClick={onEdit} />}
          {onDelete && <IconButton icon={<FiTrash2 size={13} />} aria-label={`Delete ${role.name}`} size="sm" variant="ghost" onClick={onDelete} />}
        </div>
      )}
    </div>
  </div>
);

export default RoleCard;
