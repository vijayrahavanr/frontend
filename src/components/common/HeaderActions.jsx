import { cn } from '@/utils/helpers';

/**
 * Right-aligned slot for header-level action buttons (e.g. "Export",
 * "New Student"). Just a flex row — pass Button/IconButton children.
 */
const HeaderActions = ({ children, className }) => (
  <div className={cn('flex flex-wrap items-center gap-2', className)}>{children}</div>
);

export default HeaderActions;
