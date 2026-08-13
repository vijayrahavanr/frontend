import { cn } from '@/utils/helpers';

/**
 * Lightweight card shell for pairing a chart with a title and a
 * custom legend/footer. Unlike common/ChartContainer, this doesn't
 * manage loading/empty/error state — use ChartContainer when a chart
 * needs those; use ChartCard for simple, always-ready presentational
 * groupings (e.g. a chart with a legend row beneath it).
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.footer]
 */
const ChartCard = ({ title, subtitle, action, footer, children, className }) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    {(title || action) && (
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          {title && (
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    )}

    {children}

    {footer && <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-700">{footer}</div>}
  </div>
);

export default ChartCard;
