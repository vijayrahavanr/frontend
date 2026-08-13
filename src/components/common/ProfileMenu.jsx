import { FiLogOut } from 'react-icons/fi';
import Avatar from './Avatar';
import Divider from './Divider';
import { cn } from '@/utils/helpers';

/**
 * Profile panel content: user summary header, a list of menu items,
 * and a logout action pinned at the bottom. Meant to be rendered
 * inside a Popover/Dropdown trigger — see UserMenu, which wires this
 * up as a Popover panel.
 *
 * @param {object} props
 * @param {{name: string, email?: string, avatarSrc?: string}} props.user
 * @param {{label: string, icon?: React.ReactNode, onClick: () => void}[]} props.items
 * @param {() => void} [props.onLogout]
 */
const ProfileMenu = ({ user, items = [], onLogout, className }) => (
  <div className={cn('w-64 py-2', className)}>
    <div className="flex items-center gap-3 px-4 py-2">
      <Avatar src={user?.avatarSrc} name={user?.name} size="md" />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
          {user?.name}
        </p>
        {user?.email && (
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
        )}
      </div>
    </div>

    <Divider className="my-2" />

    <ul>
      {items.map((item) => (
        <li key={item.label}>
          <button
            type="button"
            onClick={item.onClick}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {item.icon}
            {item.label}
          </button>
        </li>
      ))}
    </ul>

    {onLogout && (
      <>
        <Divider className="my-2" />
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-danger hover:bg-danger/5"
        >
          <FiLogOut size={15} />
          Log out
        </button>
      </>
    )}
  </div>
);

export default ProfileMenu;
