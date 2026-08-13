import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

/**
 * The elevated card that hosts an auth form's content. Fades and
 * slides up on mount, with a soft shadow and subtle glass edge —
 * the shared shell for Login/ForgotPassword/ResetPassword/ChangePassword.
 */
const AuthCard = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className={cn(
      'w-full max-w-md rounded-2xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur-sm',
      'dark:border-slate-800 dark:bg-surface-dark-elevated/90',
      className
    )}
  >
    {children}
  </motion.div>
);

export default AuthCard;
