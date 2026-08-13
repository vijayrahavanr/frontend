import ChartWrapper from './ChartWrapper';
import { CHART_PALETTE } from '@/utils/chartSetup';

/**
 * Bar chart. Datasets that don't specify a `backgroundColor` are
 * auto-assigned colors from the app's chart palette.
 *
 * @param {object} props
 * @param {string[]} props.labels
 * @param {{label: string, data: number[], backgroundColor?: string}[]} props.datasets
 */
const BarChart = ({ labels, datasets, options, height, className }) => {
  const data = {
    labels,
    datasets: datasets.map((ds, i) => ({
      borderRadius: 6,
      barThickness: 'flex',
      maxBarThickness: 32,
      backgroundColor: CHART_PALETTE[i % CHART_PALETTE.length],
      ...ds,
    })),
  };

  return (
    <ChartWrapper type="bar" data={data} options={options} height={height} className={className} />
  );
};

export default BarChart;
