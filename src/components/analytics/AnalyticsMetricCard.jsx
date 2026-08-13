import StatCard from '@/components/common/StatCard';

const COLOR_CLASSES = {
  primary: 'bg-primary-50 text-primary dark:bg-primary-900/20',
  secondary: 'bg-secondary-50 text-secondary dark:bg-secondary-900/20',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
};

/**
 * KPI tile for analytics pages, mirroring the color-themed StatCard
 * pattern used by every other module's own stat-card variant.
 *
 * @param {object} props
 * @param {keyof typeof COLOR_CLASSES} [props.color]
 */
const AnalyticsMetricCard = ({ color = 'primary', ...rest }) => (
  <StatCard iconColorClass={COLOR_CLASSES[color]} {...rest} />
);

export default AnalyticsMetricCard;
