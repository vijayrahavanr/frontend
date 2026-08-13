import { cn } from '@/utils/helpers';

/**
 * Styled tooltip content box, intended to be rendered via Chart.js's
 * `options.plugins.tooltip.external` callback for full HTML tooltips
 * (canvas-native tooltips can't use the app's design tokens directly).
 * Position the returned element absolutely using the caller/positioner.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {{label: string, value: string|number, color?: string}[]} props.rows
 */
const ChartTooltip = ({ title, rows = [], className, style }) => (
  <div
    className={cn(
      'pointer-events-none rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg dark:bg-slate-800',
      className
    )}
    style={style}
  >
    {title && <p className="mb-1 font-semibold">{title}</p>}
    <ul className="flex flex-col gap-0.5">
      {rows.map((row) => (
        <li key={row.label} className="flex items-center gap-2">
          {row.color && (
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: row.color }}
            />
          )}
          <span className="text-slate-300">{row.label}:</span>
          <span className="font-medium">{row.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ChartTooltip;
