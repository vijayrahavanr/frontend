import { FiFileText, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Help-center article tile — icon, title, short excerpt, clickable.
 *
 * @param {object} props
 * @param {{id: string|number, title: string, excerpt?: string, category?: string}} props.article
 * @param {() => void} [props.onClick]
 */
const HelpArticleCard = ({ article, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-primary-200 hover:bg-primary-50/40 dark:border-slate-700 dark:bg-surface-dark-elevated dark:hover:bg-primary-900/10',
      className
    )}
  >
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary dark:bg-primary-900/20">
        <FiFileText size={15} />
      </span>
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{article.title}</p>
        {article.excerpt && (
          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{article.excerpt}</p>
        )}
      </div>
    </div>
    <FiChevronRight size={16} className="shrink-0 text-slate-300" />
  </button>
);

export default HelpArticleCard;
