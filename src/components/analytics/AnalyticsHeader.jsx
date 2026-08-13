import { motion } from 'framer-motion';
import Breadcrumb from '@/components/common/Breadcrumb';
import { cn } from '@/utils/helpers';

/**
 * Header for analytics pages: breadcrumb trail, title/description,
 * and a slot for quick filters or action buttons.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.actions]
 * @param {{label: string, href?: string}[]} [props.breadcrumbItems]
 */
const AnalyticsHeader = ({ title, description, actions, breadcrumbItems, className }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className={cn(
      'flex flex-col gap-3 pb-5 sm:flex-row sm:items-end sm:justify-between',
      className
    )}
  >
    <div className="flex flex-col gap-1.5">
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </motion.div>
);

export default AnalyticsHeader;
