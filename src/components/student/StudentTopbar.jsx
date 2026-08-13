import { motion } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import HeaderSearch from '@/components/common/HeaderSearch';
import HeaderActions from '@/components/common/HeaderActions';
import { formatDate } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

/**
 * Student-scoped page top bar: title/greeting on the left, a search
 * box and action slot on the right. Sits at the top of each student
 * page's content area — distinct from the app-wide layout/Navbar,
 * which stays fixed above the whole shell.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {boolean} [props.searchable]
 * @param {React.ReactNode} [props.actions]
 */
const StudentTopbar = ({
  title,
  subtitle,
  searchable = false,
  searchValue,
  onSearchChange,
  actions,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className={cn(
      'flex flex-col gap-4 pb-5 sm:flex-row sm:items-center sm:justify-between',
      className
    )}
  >
    <div>
      <h1 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
        {title}
      </h1>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <FiCalendar size={14} />
        {subtitle || formatDate(new Date(), 'EEEE, dd MMMM yyyy')}
      </p>
    </div>

    <div className="flex items-center gap-3">
      {searchable && <HeaderSearch value={searchValue} onChange={onSearchChange} />}
      {actions && <HeaderActions>{actions}</HeaderActions>}
    </div>
  </motion.div>
);

export default StudentTopbar;
