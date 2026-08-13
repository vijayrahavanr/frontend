import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import NavbarBrand from './NavbarBrand';
import NavbarMenu from './NavbarMenu';
import NavbarProfile from './NavbarProfile';
import NavbarNotification from './NavbarNotification';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import IconButton from '@/components/common/IconButton';
import Drawer from '@/components/common/Drawer';
import { cn } from '@/utils/helpers';

/**
 * Sticky top application bar. Composes the brand mark, a horizontal
 * nav link list (desktop), dark-mode toggle, notification bell, and
 * profile menu — collapsing the nav links into a Drawer on mobile.
 *
 * @param {object} props
 * @param {{label: string, to: string}[]} [props.navItems]
 * @param {object} [props.user]
 * @param {object[]} [props.notifications]
 * @param {() => void} [props.onLogout]
 */
const Navbar = ({ navItems = [], user, notifications = [], onLogout, className }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-100 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-surface-dark/80 sm:px-6',
        className
      )}
    >
      <div className="flex items-center gap-6">
        <IconButton
          icon={<FiMenu size={20} />}
          aria-label="Open navigation menu"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
        />
        <NavbarBrand />
        {navItems.length > 0 && <NavbarMenu items={navItems} className="hidden lg:flex" />}
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <DarkModeToggle />
        <NavbarNotification notifications={notifications} />
        {user && <NavbarProfile user={user} onLogout={onLogout} />}
      </div>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        side="left"
        size="sm"
        title="Menu"
      >
        <NavbarMenu items={navItems} direction="vertical" />
      </Drawer>
    </motion.header>
  );
};

export default Navbar;
