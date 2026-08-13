import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { useThemeMode } from '@/hooks/useThemeMode';
import { cn } from '@/utils/helpers';

const OPTIONS = [
  { value: 'light', icon: FiSun, label: 'Light' },
  { value: 'dark', icon: FiMoon, label: 'Dark' },
  { value: 'system', icon: FiMonitor, label: 'System' },
];

/**
 * Segmented light/dark/system theme control, for settings-style
 * surfaces where DarkModeToggle's single icon button is too terse.
 * "System" applies the OS preference once and then behaves like a
 * one-time selection (this app doesn't keep listening after that).
 */
const ThemeSwitcher = ({ className }) => {
  const { mode, setMode } = useThemeMode();

  const handleSelect = (value) => {
    if (value === 'system') {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
      return;
    }
    setMode(value);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        'relative inline-flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800',
        className
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => handleSelect(option.value)}
            className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors dark:text-slate-400"
          >
            {isActive && (
              <motion.span
                layoutId="theme-switcher-pill"
                className="absolute inset-0 rounded-full bg-white shadow dark:bg-slate-700"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <option.icon size={15} className={cn('relative', isActive && 'text-primary')} />
            <span className="sr-only">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
