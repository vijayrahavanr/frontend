import { FiCheck } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Role × Permission matrix grid — a checkbox at each intersection.
 * Fully controlled: the caller owns the checked state and receives a
 * toggle callback per cell.
 *
 * @param {object} props
 * @param {{id: string|number, name: string}[]} props.roles
 * @param {{id: string|number, name: string, category?: string}[]} props.permissions
 * @param {(roleId: string|number, permissionId: string|number) => boolean} props.isChecked
 * @param {(roleId: string|number, permissionId: string|number) => void} props.onToggle
 * @param {boolean} [props.readOnly]
 */
const PermissionMatrixTable = ({ roles = [], permissions = [], isChecked, onToggle, readOnly = false, className }) => (
  <div className={cn('overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700', className)}>
    <table className="w-full min-w-full text-left text-sm">
      <thead className="sticky top-0 z-10 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <tr>
          <th className="px-4 py-3 font-medium">Permission</th>
          {roles.map((role) => (
            <th key={role.id} className="px-4 py-3 text-center font-medium">
              {role.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
        {permissions.map((permission) => (
          <tr key={permission.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
            <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
              <p className="font-medium">{permission.name}</p>
              {permission.category && (
                <p className="text-xs text-slate-400">{permission.category}</p>
              )}
            </td>
            {roles.map((role) => {
              const checked = isChecked(role.id, permission.id);
              return (
                <td key={role.id} className="px-4 py-3 text-center">
                  <button
                    type="button"
                    disabled={readOnly}
                    onClick={() => onToggle(role.id, permission.id)}
                    aria-label={`${checked ? 'Revoke' : 'Grant'} ${permission.name} for ${role.name}`}
                    aria-pressed={checked}
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-md border transition-colors',
                      checked
                        ? 'border-primary bg-primary text-white'
                        : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800',
                      readOnly ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-primary'
                    )}
                  >
                    {checked && <FiCheck size={13} />}
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PermissionMatrixTable;
