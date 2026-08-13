import { useState } from 'react';
import { motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';
import Drawer from '@/components/common/Drawer';
import { cn } from '@/utils/helpers';

/**
 * Primary app navigation panel. Persistent and width-collapsible on
 * desktop (lg+); on smaller screens it's hidden by default and can
 * be rendered as a Drawer by passing `mobileOpen`/`onMobileClose`
 * (e.g. wired up to a hamburger trigger elsewhere in the shell).
 *
 * @param {object} props
 * @param {object[]} props.items - see SidebarMenu for the item shape
 * @param {boolean} [props.mobileOpen] - controlled mobile drawer state
 * @param {() => void} [props.onMobileClose]
 */
const Sidebar = ({ items = [], mobileOpen = false, onMobileClose, className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menu = <SidebarMenu items={items} collapsed={collapsed} />;

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 76 : 240 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-slate-100 bg-white dark:border-slate-800 dark:bg-surface-dark lg:flex',
          className
        )}
      >
        <div className="flex-1 overflow-y-auto py-4">{menu}</div>
        <SidebarFooter collapsed={collapsed} onToggleCollapse={() => setCollapsed((p) => !p)} />
      </motion.aside>

      {onMobileClose && (
        <Drawer open={mobileOpen} onClose={onMobileClose} side="left" size="sm" title="Menu">
          <SidebarMenu items={items} />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
