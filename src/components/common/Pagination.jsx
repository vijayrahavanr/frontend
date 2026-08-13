import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Numeric pagination control with ellipsis collapsing for large
 * page counts.
 *
 * @param {object} props
 * @param {number} props.page - current page (1-indexed)
 * @param {number} props.totalPages
 * @param {(page: number) => void} props.onChange
 */
const Pagination = ({ page, totalPages, onChange, className }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i += 1
    ) {
      range.push(i);
    }

    const pages = [1];
    if (range[0] > 2) pages.push('ellipsis-start');
    pages.push(...range);
    if (range[range.length - 1] < totalPages - 1) pages.push('ellipsis-end');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const baseBtn =
    'inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200';

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={cn(baseBtn, 'disabled:cursor-not-allowed disabled:opacity-40', 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800')}
      >
        <FiChevronLeft size={16} />
      </button>

      {getPageNumbers().map((p, idx) =>
        typeof p === 'number' ? (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              baseBtn,
              p === page
                ? 'bg-primary text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            )}
          >
            {p}
          </button>
        ) : (
          <span key={`${p}-${idx}`} className="px-1 text-slate-400">
            …
          </span>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={cn(baseBtn, 'disabled:cursor-not-allowed disabled:opacity-40', 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800')}
      >
        <FiChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
