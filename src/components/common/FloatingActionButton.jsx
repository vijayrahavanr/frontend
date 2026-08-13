import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

const POSITION_CLASSES = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
};

/**
 * Generic floating action button, positioned fixed to a screen
 * corner. Use for a single primary action per page (e.g. "Mark
 * Attendance", "Add Student").
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon
 * @param {string} [props.label] - visible on larger screens next to the icon
 * @param {'bottom-right'|'bottom-left'} [props.position]
 */
const FloatingActionButton = ({
  icon,
  label,
  position = 'bottom-right',
  onClick,
  className,
  ...rest
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={cn(
      'fixed z-40 flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 text-white shadow-xl',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2',
      POSITION_CLASSES[position],
      className
    )}
    aria-label={label}
    {...rest}
  >
    {icon}
    {label && <span className="hidden text-sm font-medium sm:inline">{label}</span>}
  </motion.button>
);

export default FloatingActionButton;
