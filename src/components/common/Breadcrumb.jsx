import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { cn } from '@/utils/helpers';
import { ROUTES } from '@/constants/routes.constants';

const autoGenerate = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  let path = '';
  return segments.map((segment) => {
    path += `/${segment}`;
    return {
      label: segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      href: path,
    };
  });
};

/**
 * Breadcrumb trail. Pass explicit `items` for full control, or omit
 * it to auto-generate a trail from the current route path.
 *
 * @param {object} props
 * @param {{label: string, href?: string}[]} [props.items]
 */
const Breadcrumb = ({ items, className }) => {
  const location = useLocation();
  const trail = items || autoGenerate(location.pathname);

  if (trail.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)}>
      <ol className="flex items-center gap-1.5">
        <li>
          <Link
            to={ROUTES.ROOT}
            aria-label="Home"
            className="flex items-center text-slate-400 hover:text-primary"
          >
            <FiHome size={14} />
          </Link>
        </li>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={item.href || item.label} className="flex items-center gap-1.5">
              <FiChevronRight size={12} className="text-slate-300 dark:text-slate-600" />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="font-medium text-slate-700 dark:text-slate-200"
                >
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="text-slate-500 hover:text-primary dark:text-slate-400">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
