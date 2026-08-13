import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

/**
 * Responsive shell for authentication screens. On large screens it
 * splits into two columns — a decorative illustration panel on the
 * left and centered form content on the right. On smaller screens
 * the illustration collapses away and the form content fills the
 * viewport. Passing no `illustration` renders a single centered
 * column (used by the lighter secondary flows like ChangePassword).
 *
 * @param {object} props
 * @param {React.ReactNode} [props.illustration]
 * @param {React.ReactNode} props.children - form content (AuthCard, etc.)
 */
const AuthLayout = ({ illustration, children, className }) => (
  <div className={cn('flex min-h-screen w-full bg-surface-light dark:bg-surface-dark', className)}>
    {illustration && (
      <div className="relative hidden w-1/2 overflow-hidden lg:flex">{illustration}</div>
    )}

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex w-full flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6',
        illustration && 'lg:w-1/2'
      )}
    >
      {children}
    </motion.div>
  </div>
);

export default AuthLayout;
