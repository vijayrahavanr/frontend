import ChartContainer from '@/components/common/ChartContainer';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import DoughnutChart from '@/components/charts/DoughnutChart';
import PieChart from '@/components/charts/PieChart';
import AreaChart from '@/components/charts/AreaChart';
import RadarChart from '@/components/charts/RadarChart';

const CHART_COMPONENTS = { bar: BarChart, line: LineChart, area: AreaChart, radar: RadarChart };

/**
 * Chart card for the analytics center — picks the right chart
 * primitive by `type` so pages don't repeat the ChartContainer +
 * chart-component pairing. Mirrors attendance/AttendanceChartCard's
 * contract but lives in its own module-local folder.
 *
 * @param {object} props
 * @param {'bar'|'line'|'area'|'radar'|'doughnut'|'pie'} props.type
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {string[]} props.labels
 * @param {object[]|number[]} props.data - datasets array, or values array for doughnut/pie
 * @param {boolean} [props.loading]
 * @param {string|null} [props.error]
 * @param {() => void} [props.onRetry]
 */
const AnalyticsChartCard = ({ type, title, subtitle, labels, data, loading, error, onRetry, height = 280, className }) => {
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
      ) : type === 'pie' ? (
        <PieChart labels={labels} data={data} height={height} />
      ) : (
        (() => {
          const ChartComponent = CHART_COMPONENTS[type];
          return <ChartComponent labels={labels} datasets={data} height={height} />;
        })()
      )}
    </ChartContainer>
  );
};

export default AnalyticsChartCard;
