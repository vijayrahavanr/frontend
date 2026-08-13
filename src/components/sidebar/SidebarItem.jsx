import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/helpers';

/**
 * Single sidebar navigation item (leaf link). Highlights when its
 * route is active; collapses to icon-only when `collapsed` is true.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.to
 * @param {React.ReactNode} [props.icon]
 * @param {boolean} [props.collapsed]
 * @param {boolean} [props.nested] - indent for items inside a SidebarGroup
 */
const SidebarItem = ({ label, to, icon, collapsed = false, nested = false }) => (
  <NavLink
    to={to}
    title={collapsed ? label : undefined}
    className={({ isActive }) =>
      cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        nested && !collapsed && 'pl-9',
        isActive
          ? 'bg-primary-50 text-primary dark:bg-primary-900/20'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
        collapsed && 'justify-center px-2'
      )
    }
  >
    {icon && <span className="flex shrink-0 text-lg">{icon}</span>}
    {!collapsed && <span className="truncate">{label}</span>}
  </NavLink>
);

export default SidebarItem;
