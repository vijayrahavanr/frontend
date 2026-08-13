import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Avatar from './Avatar';
import Popover from './Popover';
import ProfileMenu from './ProfileMenu';
import { cn } from '@/utils/helpers';

/**
 * Navbar-corner user control: avatar trigger that opens a ProfileMenu
 * panel in a Popover. Pairs with layout/Navbar/NavbarProfile.
 *
 * @param {object} props
 * @param {{name: string, email?: string, avatarSrc?: string}} props.user
 * @param {{label: string, icon?: React.ReactNode, onClick: () => void}[]} [props.items]
 * @param {() => void} [props.onLogout]
 */
const UserMenu = ({ user, items = [], onLogout, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <button
        type="button"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
          className
        )}
      >
        <Avatar src={user?.avatarSrc} name={user?.name} size="sm" />
        <FiChevronDown
          size={14}
          className={cn('hidden text-slate-400 transition-transform sm:block', open && 'rotate-180')}
        />
      </button>

      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <ProfileMenu
          user={user}
          items={items}
          onLogout={() => {
            setAnchorEl(null);
            onLogout?.();
          }}
        />
      </Popover>
    </>
  );
};

export default UserMenu;
