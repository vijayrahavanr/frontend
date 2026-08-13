import { CircularProgress as MuiCircularProgress } from '@mui/material';
import { cn } from '@/utils/helpers';

const SIZE_PX = {
  sm: 16,
  md: 24,
  lg: 32,
};

/**
 * Indeterminate loading spinner. This is the general-purpose spinner
 * for buttons, inline sections, and small async areas — distinct
 * from CircularProgress, which shows a determinate percentage.
 *
 * @param {object} props
 * @param {'sm'|'md'|'lg'} [props.size]
 */
const Spinner = ({ size = 'md', className, ...rest }) => (
  <MuiCircularProgress
    size={SIZE_PX[size]}
    thickness={4}
    className={cn('text-primary', className)}
    aria-label="Loading"
    {...rest}
  />
);

export default Spinner;
