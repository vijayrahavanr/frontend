import ChartWrapper from './ChartWrapper';
import { CHART_PALETTE } from '@/utils/chartSetup';

/**
 * Doughnut chart — same data shape as PieChart, hollow center.
 * Commonly used for attendance/status breakdowns with a centered
 * summary figure overlaid by the parent (see AttendanceChart).
 *
 * @param {object} props
 * @param {string[]} props.labels
 * @param {number[]} props.data
 * @param {string[]} [props.colors]
 */
const DoughnutChart = ({ labels, data, colors, options, height, className }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors || labels.map((_, i) => CHART_PALETTE[i % CHART_PALETTE.length]),
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  return (
    <ChartWrapper
      type="doughnut"
      data={chartData}
      options={{ scales: null, cutout: '70%', ...options }}
      height={height}
      className={className}
    />
  );
};

export default DoughnutChart;
