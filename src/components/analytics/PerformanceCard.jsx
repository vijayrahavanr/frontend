import CircularProgress from '@/components/common/CircularProgress';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

const GRADE_COLOR = { A: 'success', B: 'primary', C: 'warning', D: 'danger', F: 'danger' };

/**
 * Performance summary card — a score ring plus a letter-grade badge,
 * used across Student/Faculty/Course/Subject performance views.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {number} props.score - 0-100
 * @param {string} [props.grade]
 * @param {string} [props.subtitle]
 */
const PerformanceCard = ({ title, score, grade, subtitle, className }) => {
  const color = score >= 75 ? 'success' : score >= 50 ? 'warning' : 'danger';

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
        className
      )}
    >
      <CircularProgress value={score} color={color} size={72} strokeWidth={7} />
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {grade && <Badge color={GRADE_COLOR[grade] || 'neutral'}>Grade {grade}</Badge>}
    </div>
  );
};

export default PerformanceCard;
