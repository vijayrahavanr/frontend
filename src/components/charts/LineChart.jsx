import ChartWrapper from './ChartWrapper';
import { CHART_PALETTE } from '@/utils/chartSetup';

/**
 * Line chart. Datasets without an explicit `borderColor` are
 * auto-assigned from the app's chart palette.
 *
 * @param {object} props
 * @param {string[]} props.labels
 * @param {{label: string, data: number[], borderColor?: string}[]} props.datasets
 */
const LineChart = ({ labels, datasets, options, height, className }) => {
  const data = {
    labels,
    datasets: datasets.map((ds, i) => ({
      borderColor: CHART_PALETTE[i % CHART_PALETTE.length],
      backgroundColor: 'transparent',
      tension: 0.35,
      pointRadius: 3,
      pointHoverRadius: 5,
      borderWidth: 2,
      ...ds,
    })),
  };

  return (
    <ChartWrapper type="line" data={data} options={options} height={height} className={className} />
  );
};

export default LineChart;
