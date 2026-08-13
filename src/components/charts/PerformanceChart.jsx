import ChartContainer from '@/components/common/ChartContainer';
import LineChart from './LineChart';
import { COLORS } from '@/constants/theme.constants';

/**
 * Domain-specific chart tracking a performance metric (e.g. average
 * score, GPA trend) across a series of terms/months/assessments.
 *
 * @param {object} props
 * @param {string[]} props.labels - e.g. term names
 * @param {number[]} props.scores
 * @param {string} [props.metricLabel]
 * @param {boolean} [props.loading]
 * @param {string|null} [props.error]
 */
const PerformanceChart = ({
  labels = [],
  scores = [],
  metricLabel = 'Average score',
  loading = false,
  error = null,
  onRetry,
  className,
}) => (
  <ChartContainer
    title="Performance Trend"
    subtitle={metricLabel}
    loading={loading}
    error={error}
    onRetry={onRetry}
    isEmpty={scores.length === 0}
    height={260}
    className={className}
  >
    <LineChart
      labels={labels}
      datasets={[{ label: metricLabel, data: scores, borderColor: COLORS.primary }]}
      height={260}
    />
  </ChartContainer>
);

export default PerformanceChart;
