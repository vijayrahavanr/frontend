import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/helpers';

/**
 * Horizontal navigation link list for the navbar (desktop), also
 * reused as the stacked list inside the mobile menu drawer.
 *
 * @param {object} props
 * @param {{label: string, to: string}[]} props.items
 * @param {'horizontal'|'vertical'} [props.direction]
 */
const NavbarMenu = ({ items = [], direction = 'horizontal', className }) => (
  <nav
    className={cn(
      'flex',
      direction === 'horizontal' ? 'items-center gap-1' : 'flex-col gap-1',
      className
    )}
  >
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          cn(
            'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary-50 text-primary dark:bg-primary-900/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
          )
        }
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default NavbarMenu;
