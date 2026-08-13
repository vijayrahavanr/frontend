import { Link } from 'react-router-dom';
import { FiCpu } from 'react-icons/fi';
import { ROUTES } from '@/constants/routes.constants';
import { cn } from '@/utils/helpers';

/**
 * App logo mark + name, linking back to the root route.
 */
const NavbarBrand = ({ className }) => (
  <Link to={ROUTES.ROOT} className={cn('flex items-center gap-2', className)}>
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
      <FiCpu size={18} />
    </span>
    <span className="hidden text-sm font-semibold leading-tight text-slate-900 dark:text-white sm:block">
      Smart Attendance
      <span className="block text-[11px] font-normal text-slate-400">& Analytics</span>
    </span>
  </Link>
);

export default NavbarBrand;
