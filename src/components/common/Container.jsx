import { cn } from '@/utils/helpers';

const MAX_WIDTH_CLASSES = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1600px]',
  full: 'max-w-full',
};

/**
 * Centered, responsively-padded content wrapper. The base building
 * block for consistent page gutters across breakpoints.
 *
 * @param {object} props
 * @param {'sm'|'md'|'lg'|'xl'|'full'} [props.size]
 */
const Container = ({ children, size = 'lg', className, as: Component = 'div', ...rest }) => (
  <Component
    className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', MAX_WIDTH_CLASSES[size], className)}
    {...rest}
  >
    {children}
  </Component>
);

export default Container;
