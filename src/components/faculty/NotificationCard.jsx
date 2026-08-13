import CommonNotificationCard from '@/components/common/NotificationCard';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

const PRIORITY_COLOR = {
  high: 'danger',
  medium: 'warning',
  low: 'neutral',
};

/**
 * Faculty-facing notification row: delegates layout to the shared
 * common/NotificationCard and adds a priority label. Mirrors
 * student/NotificationCard's contract.
 *
 * @param {object} props
 * @param {'high'|'medium'|'low'} [props.priority]
 */
const NotificationCard = ({ priority, className, ...rest }) => (
  <div className={cn('relative', className)}>
    <CommonNotificationCard {...rest} />
    {priority && (
      <Badge color={PRIORITY_COLOR[priority]} className="absolute right-3 top-3 capitalize">
        {priority}
      </Badge>
    )}
  </div>
);

export default NotificationCard;
