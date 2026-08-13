import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

/**
 * Title + subtitle pair shown at the top of an AuthCard.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 */
const AuthHeader = ({ title, subtitle, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.05 }}
    className={cn('mb-6 text-center', className)}
  >
    <h1 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">{title}</h1>
    {subtitle && (
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    )}
  </motion.div>
);

export default AuthHeader;
