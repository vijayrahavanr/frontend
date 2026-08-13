import { memo } from 'react';
import { Chart } from 'react-chartjs-2';
import { useThemeMode } from '@/hooks/useThemeMode';
import { getBaseChartOptions } from '@/utils/chartSetup';
import { cn } from '@/utils/helpers';

/**
 * Low-level chart host used by BarChart/LineChart/PieChart/etc.
 * Merges the app's theme-aware base options with any chart-specific
 * `options` override, and renders inside a fixed-height container so
 * Chart.js's responsive resize observer has a stable box to measure.
 *
 * Memoized: Chart.js re-renders are expensive (canvas re-paint), and
 * this is the leaf every chart wrapper funnels through, so a parent
 * re-render with referentially-stable props (e.g. a sibling state
 * update) shouldn't force a repaint here.
 *
 * @param {object} props
 * @param {'bar'|'line'|'pie'|'doughnut'|'radar'} props.type
 * @param {object} props.data
 * @param {object} [props.options]
 * @param {number|string} [props.height]
 */
const ChartWrapper = memo(function ChartWrapper({ type, data, options = {}, height = 260, className, ...rest }) {
  const { isDark } = useThemeMode();
  const base = getBaseChartOptions(isDark);

  const mergedOptions = {
    ...base,
    ...options,
    plugins: { ...base.plugins, ...options.plugins },
    scales: options.scales === null ? undefined : { ...base.scales, ...options.scales },
  };

  return (
    <div className={cn('relative w-full', className)} style={{ height }}>
      <Chart type={type} data={data} options={mergedOptions} {...rest} />
    </div>
  );
});

export default ChartWrapper;
