import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Bottom strip of the sidebar: desktop collapse/expand toggle plus
 * an optional small footer label (e.g. app version).
 *
 * @param {object} props
 * @param {boolean} props.collapsed
 * @param {() => void} props.onToggleCollapse
 */
const SidebarFooter = ({ collapsed, onToggleCollapse, className }) => (
  <div
    className={cn(
      'flex items-center justify-between border-t border-slate-100 px-3 py-3 dark:border-slate-800',
      collapsed && 'justify-center',
      className
    )}
  >
    {!collapsed && <span className="text-xs text-slate-400">v1.0.0</span>}
    <button
      type="button"
      onClick={onToggleCollapse}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className="hidden h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:flex"
    >
      {collapsed ? <FiChevronsRight size={16} /> : <FiChevronsLeft size={16} />}
    </button>
  </div>
);

export default SidebarFooter;
