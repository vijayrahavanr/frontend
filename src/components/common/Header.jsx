import { motion } from 'framer-motion';
import HeaderTitle from './HeaderTitle';
import HeaderSearch from './HeaderSearch';
import HeaderActions from './HeaderActions';
import { cn } from '@/utils/helpers';

/**
 * Page-level header: sits at the top of a page's content area (below
 * the app Navbar) with a dynamic title/breadcrumb, optional search,
 * and an action button row. Composes HeaderTitle, HeaderSearch, and
 * HeaderActions so pages typically only need to pass content, not
 * rebuild this layout.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {{label: string, href?: string}[]} [props.breadcrumbItems]
 * @param {boolean} [props.searchable]
 * @param {string} [props.searchValue]
 * @param {(e) => void} [props.onSearchChange]
 * @param {React.ReactNode} [props.actions]
 */
const Header = ({
  title,
  description,
  breadcrumbItems,
  searchable = false,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  actions,
  className,
}) => (
  <motion.header
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className={cn(
      'flex flex-col gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between',
      className
    )}
  >
    <HeaderTitle title={title} description={description} breadcrumbItems={breadcrumbItems} />

    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {searchable && (
        <HeaderSearch
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      )}
      {actions && <HeaderActions>{actions}</HeaderActions>}
    </div>
  </motion.header>
);

export default Header;
