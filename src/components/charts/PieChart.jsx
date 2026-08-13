import ChartWrapper from './ChartWrapper';
import { CHART_PALETTE } from '@/utils/chartSetup';

/**
 * Pie chart for single-series proportional data.
 *
 * @param {object} props
 * @param {string[]} props.labels
 * @param {number[]} props.data
 * @param {string[]} [props.colors]
 */
const PieChart = ({ labels, data, colors, options, height, className }) => {
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
      type="pie"
      data={chartData}
      options={{ scales: null, ...options }}
      height={height}
      className={className}
    />
  );
};

export default PieChart;
