import { FiCpu } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const SIZE_CLASSES = {
  sm: { badge: 'h-9 w-9', icon: 16, text: 'text-sm' },
  md: { badge: 'h-11 w-11', icon: 20, text: 'text-base' },
  lg: { badge: 'h-14 w-14', icon: 26, text: 'text-lg' },
};

/**
 * Reusable brand mark for authentication screens. Distinct from
 * layout/Navbar/NavbarBrand — this variant supports a light-on-dark
 * treatment for the illustration panel via the `variant` prop.
 *
 * @param {object} props
 * @param {'sm'|'md'|'lg'} [props.size]
 * @param {'default'|'inverted'} [props.variant] - inverted for use on dark/gradient backgrounds
 */
const AuthLogo = ({ size = 'md', variant = 'default', className }) => {
  const { badge, icon, text } = SIZE_CLASSES[size];

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-2xl',
          badge,
          variant === 'inverted'
            ? 'bg-white/15 text-white backdrop-blur-sm'
            : 'bg-gradient-to-br from-primary to-secondary text-white'
        )}
      >
        <FiCpu size={icon} />
      </span>
      <span
        className={cn(
          'font-semibold leading-tight',
          text,
          variant === 'inverted' ? 'text-white' : 'text-slate-900 dark:text-white'
        )}
      >
        Smart Attendance
        <span
          className={cn(
            'block text-[11px] font-normal',
            variant === 'inverted' ? 'text-white/70' : 'text-slate-400'
          )}
        >
          & Performance Analytics
        </span>
      </span>
    </div>
  );
};

export default AuthLogo;
