import { FiDatabase } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Minimal "no records" indicator, purpose-built for compact contexts
 * like inside a table body or a narrow list — lighter weight than
 * EmptyState, which is meant for full card/page-level empty states.
 *
 * @param {object} props
 * @param {string} [props.message]
 */
const NoData = ({ message = 'No data available', className }) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-1.5 py-8 text-slate-400',
      className
    )}
  >
    <FiDatabase size={20} />
    <p className="text-xs">{message}</p>
  </div>
);

export default NoData;
