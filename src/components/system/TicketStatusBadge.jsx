import Badge from '@/components/common/Badge';

const STATUS_COLOR = { open: 'primary', 'in-progress': 'warning', resolved: 'success', closed: 'neutral' };
const STATUS_LABEL = { open: 'Open', 'in-progress': 'In Progress', resolved: 'Resolved', closed: 'Closed' };

/**
 * Thin wrapper over Badge for consistent support-ticket status
 * coloring across TicketCard, TicketDetails, and the tickets table.
 *
 * @param {object} props
 * @param {'open'|'in-progress'|'resolved'|'closed'} props.status
 */
const TicketStatusBadge = ({ status, className }) => (
  <Badge color={STATUS_COLOR[status] || 'neutral'} className={className}>
    {STATUS_LABEL[status] || status}
  </Badge>
);

export default TicketStatusBadge;
