import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { COLORS } from '@/constants/theme.constants';

// Register once, app-wide. Every chart component imports this module
// (side-effect only) instead of registering controllers individually.
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

export const CHART_PALETTE = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.success,
  COLORS.warning,
  COLORS.danger,
];

/**
 * Base Chart.js options shared by every chart component, adapted for
 * light/dark mode (grid lines, tick/legend text color).
 * @param {boolean} isDark
 * @returns {object}
 */
export const getBaseChartOptions = (isDark = false) => {
  const textColor = isDark ? '#CBD5E1' : '#475569';
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(148, 163, 184, 0.18)';

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400, easing: 'easeOutQuart' },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: textColor, usePointStyle: true, boxWidth: 8, padding: 16 },
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#0F172A',
        titleColor: '#F8FAFC',
        bodyColor: '#F8FAFC',
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor, drawTicks: false },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor, drawTicks: false },
      },
    },
  };
};

export default ChartJS;
