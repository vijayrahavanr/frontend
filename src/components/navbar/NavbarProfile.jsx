import UserMenu from '@/components/common/UserMenu';
import { ROLE_LABELS } from '@/constants/roles.constants';
import { cn } from '@/utils/helpers';

/**
 * Navbar-corner profile control: role label (desktop) next to the
 * UserMenu avatar trigger.
 *
 * @param {object} props
 * @param {{name: string, email?: string, avatarSrc?: string, role?: string}} props.user
 * @param {{label: string, icon?: React.ReactNode, onClick: () => void}[]} [props.items]
 * @param {() => void} [props.onLogout]
 */
const NavbarProfile = ({ user, items, onLogout, className }) => (
  <div className={cn('flex items-center gap-2', className)}>
    {user?.role && (
      <span className="hidden text-right text-xs leading-tight text-slate-500 dark:text-slate-400 md:block">
        <span className="block font-medium text-slate-700 dark:text-slate-200">{user.name}</span>
        {ROLE_LABELS[user.role] || user.role}
      </span>
    )}
    <UserMenu user={user} items={items} onLogout={onLogout} />
  </div>
);

export default NavbarProfile;
