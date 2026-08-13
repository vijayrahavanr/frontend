import ChartContainer from '@/components/common/ChartContainer';
import DoughnutChart from './DoughnutChart';
import ChartLegend from './ChartLegend';
import { COLORS } from '@/constants/theme.constants';
import { calculatePercentage } from '@/utils/helpers';

/**
 * Domain-specific chart summarizing attendance as a present/absent/
 * late breakdown, with the overall percentage centered visually via
 * the surrounding legend.
 *
 * @param {object} props
 * @param {number} props.present
 * @param {number} props.absent
 * @param {number} [props.late]
 * @param {boolean} [props.loading]
 * @param {string|null} [props.error]
 */
const AttendanceChart = ({
  present = 0,
  absent = 0,
  late = 0,
  loading = false,
  error = null,
  onRetry,
  className,
}) => {
  const total = present + absent + late;
  const percentage = calculatePercentage(present, total);

  const labels = ['Present', 'Absent', ...(late ? ['Late'] : [])];
  const data = [present, absent, ...(late ? [late] : [])];
  const colors = [COLORS.success, COLORS.danger, ...(late ? [COLORS.warning] : [])];

  return (
    <ChartContainer
      title="Attendance Breakdown"
      subtitle={`${percentage}% overall attendance`}
      loading={loading}
      error={error}
      onRetry={onRetry}
      isEmpty={total === 0}
      height={240}
      className={className}
    >
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <DoughnutChart labels={labels} data={data} colors={colors} height={180} />
        <ChartLegend
          items={labels.map((label, i) => ({ label, color: colors[i], value: data[i] }))}
        />
      </div>
    </ChartContainer>
  );
};

export default AttendanceChart;
