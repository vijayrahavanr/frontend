import { cn } from '@/utils/helpers';

/**
 * Standalone legend for cases where Chart.js's built-in legend isn't
 * flexible enough (e.g. legend needs to live outside the canvas, or
 * show extra values next to each swatch).
 *
 * @param {object} props
 * @param {{label: string, color: string, value?: string|number}[]} props.items
 * @param {'row'|'column'} [props.direction]
 */
const ChartLegend = ({ items = [], direction = 'row', className }) => (
  <ul
    className={cn(
      'flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-300',
      direction === 'column' && 'flex-col',
      className
    )}
  >
    {items.map((item) => (
      <li key={item.label} className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: item.color }}
          aria-hidden="true"
        />
        <span>{item.label}</span>
        {item.value !== undefined && (
          <span className="font-medium text-slate-800 dark:text-slate-100">{item.value}</span>
        )}
      </li>
    ))}
  </ul>
);

export default ChartLegend;
