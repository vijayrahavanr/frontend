import { FiCode, FiGitBranch, FiCalendar } from 'react-icons/fi';
import { formatDate } from '@/utils/date.utils';
import { cn } from '@/utils/helpers';

/**
 * Version/build information card for the About page.
 *
 * @param {object} props
 * @param {{version: string, buildNumber?: string, environment?: string, releaseDate?: string}} props.info
 */
const VersionCard = ({ info, className }) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <p className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Version Information</p>
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <dt className="flex items-center gap-1.5 text-xs text-slate-400">
          <FiCode size={12} /> Version
        </dt>
        <dd className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">{info.version}</dd>
      </div>
      <div>
        <dt className="flex items-center gap-1.5 text-xs text-slate-400">
          <FiGitBranch size={12} /> Build
        </dt>
        <dd className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
          {info.buildNumber || '—'} · {info.environment || 'production'}
        </dd>
      </div>
      <div>
        <dt className="flex items-center gap-1.5 text-xs text-slate-400">
          <FiCalendar size={12} /> Released
        </dt>
        <dd className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
          {info.releaseDate ? formatDate(info.releaseDate) : '—'}
        </dd>
      </div>
    </dl>
  </div>
);

export default VersionCard;
