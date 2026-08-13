import Tooltip from './Tooltip';
import IconButton from './IconButton';
import { cn } from '@/utils/helpers';

/**
 * Row of quick-access icon actions, typically shown in a Header's
 * action area (e.g. "New Record", "Mark Attendance", "Generate Report").
 *
 * @param {object} props
 * @param {{label: string, icon: React.ReactNode, onClick: () => void, disabled?: boolean}[]} props.actions
 */
const QuickActions = ({ actions = [], className }) => (
  <div className={cn('flex items-center gap-1.5', className)}>
    {actions.map((action) => (
      <Tooltip key={action.label} title={action.label}>
        <span>
          <IconButton
            icon={action.icon}
            aria-label={action.label}
            onClick={action.onClick}
            disabled={action.disabled}
            variant="outlined"
            size="sm"
          />
        </span>
      </Tooltip>
    ))}
  </div>
);

export default QuickActions;
