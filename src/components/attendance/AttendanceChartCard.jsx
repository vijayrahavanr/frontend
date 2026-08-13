import ChartContainer from '@/components/common/ChartContainer';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import DoughnutChart from '@/components/charts/DoughnutChart';
import AreaChart from '@/components/charts/AreaChart';

const CHART_COMPONENTS = {
  bar: BarChart,
  line: LineChart,
  doughnut: DoughnutChart,
  area: AreaChart,
};

/**
 * Chart card for attendance analytics dashboards — picks the right
 * chart primitive by `type` so pages don't repeat the
 * ChartContainer + chart-component pairing.
 *
 * @param {object} props
 * @param {'bar'|'line'|'doughnut'|'area'} props.type
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {string[]} props.labels
 * @param {object[]|number[]} props.data - datasets array (bar/line/area) or values array (doughnut)
 * @param {boolean} [props.loading]
 * @param {string|null} [props.error]
 * @param {() => void} [props.onRetry]
 */
const AttendanceChartCard = ({ type, title, subtitle, labels, data, loading, error, onRetry, height = 260, className }) => {
  const ChartComponent = CHART_COMPONENTS[type];
  const isEmpty = !labels?.length;

  return (
    <ChartContainer
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
      onRetry={onRetry}
      isEmpty={isEmpty}
      height={height}
      className={className}
    >
      {type === 'doughnut' ? (
        <DoughnutChart labels={labels} data={data} height={height} />
      ) : (
        <ChartComponent labels={labels} datasets={data} height={height} />
      )}
    </ChartContainer>
  );
};

export default AttendanceChartCard;
