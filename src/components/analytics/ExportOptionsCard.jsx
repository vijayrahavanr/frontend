import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { cn } from '@/utils/helpers';

/**
 * A single export-format option (PDF/Excel/CSV/Print) with an icon,
 * description, and an export button.
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {() => void} [props.onExport]
 * @param {boolean} [props.exporting]
 */
const ExportOptionsCard = ({ icon, title, description, onExport, exporting = false, className }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      'flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card transition-shadow hover:shadow-lg',
      'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
      {icon}
    </span>
    <div>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
      {description && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>}
    </div>
    <Button size="sm" onClick={onExport} loading={exporting} fullWidth>
      Export
    </Button>
  </motion.div>
);

export default ExportOptionsCard;
