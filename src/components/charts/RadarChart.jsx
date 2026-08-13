import ChartWrapper from './ChartWrapper';
import { CHART_PALETTE } from '@/utils/chartSetup';

const withAlpha = (hex, alpha = 0.2) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Radar chart — useful for multi-dimensional performance comparisons
 * (e.g. a student's scores across subjects).
 *
 * @param {object} props
 * @param {string[]} props.labels
 * @param {{label: string, data: number[], borderColor?: string}[]} props.datasets
 */
const RadarChart = ({ labels, datasets, options, height, className }) => {
  const data = {
    labels,
    datasets: datasets.map((ds, i) => {
      const color = ds.borderColor || CHART_PALETTE[i % CHART_PALETTE.length];
      return {
        borderColor: color,
        backgroundColor: withAlpha(color),
        pointBackgroundColor: color,
        borderWidth: 2,
        ...ds,
      };
    }),
  };

  return (
    <ChartWrapper
      type="radar"
      data={data}
      options={{ scales: null, ...options }}
      height={height}
      className={className}
    />
  );
};

export default RadarChart;
