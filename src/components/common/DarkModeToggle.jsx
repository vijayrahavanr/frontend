import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useThemeMode } from '@/hooks/useThemeMode';
import { cn } from '@/utils/helpers';

/**
 * Single icon button that toggles between light and dark mode, with
 * an animated icon swap. For a three-way (light/dark/system) control,
 * use ThemeSwitcher instead.
 */
const DarkModeToggle = ({ className }) => {
  const { isDark, toggleMode } = useThemeMode();

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {isDark ? <FiMoon size={18} /> : <FiSun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default DarkModeToggle;
