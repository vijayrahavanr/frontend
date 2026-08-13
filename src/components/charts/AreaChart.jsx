import ChartWrapper from './ChartWrapper';
import { CHART_PALETTE } from '@/utils/chartSetup';

const withAlpha = (hex, alpha = 0.15) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Area chart — a line chart with the region under the curve filled.
 * Built on the same ChartWrapper as LineChart, differing only in
 * default `fill`/`backgroundColor` behavior.
 *
 * @param {object} props
 * @param {string[]} props.labels
 * @param {{label: string, data: number[], borderColor?: string}[]} props.datasets
 */
const AreaChart = ({ labels, datasets, options, height, className }) => {
  const data = {
    labels,
    datasets: datasets.map((ds, i) => {
      const color = ds.borderColor || CHART_PALETTE[i % CHART_PALETTE.length];
      return {
        borderColor: color,
        backgroundColor: withAlpha(color),
        fill: true,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 5,
        borderWidth: 2,
        ...ds,
      };
    }),
  };

  return (
    <ChartWrapper type="line" data={data} options={options} height={height} className={className} />
  );
};

export default AreaChart;
