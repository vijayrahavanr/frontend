import { motion } from 'framer-motion';
import { FiDownload, FiFileText } from 'react-icons/fi';
import Button from '@/components/common/Button';
import { cn } from '@/utils/helpers';

/**
 * Report summary tile: icon, title, description, and a download
 * button (UI placeholder). Mirrors student/ReportCard.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {() => void} [props.onDownload]
 */
const FacultyReportCard = ({ title, description, onDownload, className }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      'flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-lg',
      'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary dark:bg-secondary-900/20">
        <FiFileText size={18} />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
    </div>
    <Button variant="outlined" size="sm" startIcon={<FiDownload size={14} />} onClick={onDownload}>
      Download
    </Button>
  </motion.div>
);

export default FacultyReportCard;
