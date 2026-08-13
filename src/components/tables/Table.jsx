import { cn } from '@/utils/helpers';

/**
 * Bare-bones styled table primitive. Use directly for small static
 * tables; use DataTable for anything needing search/sort/pagination/
 * selection.
 */
const Table = ({ children, className, ...rest }) => (
  <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
    <table className={cn('w-full min-w-full text-left text-sm', className)} {...rest}>
      {children}
    </table>
  </div>
);

const TableHead = ({ children, className }) => (
  <thead
    className={cn(
      'bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400',
      className
    )}
  >
    {children}
  </thead>
);

const TableBody = ({ children, className }) => (
  <tbody className={cn('divide-y divide-slate-100 dark:divide-slate-700', className)}>
    {children}
  </tbody>
);

const TableRow = ({ children, className, ...rest }) => (
  <tr
    className={cn('transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60', className)}
    {...rest}
  >
    {children}
  </tr>
);

const TableCell = ({ children, className, as: Component = 'td', ...rest }) => (
  <Component className={cn('px-4 py-3 text-slate-700 dark:text-slate-200', className)} {...rest}>
    {children}
  </Component>
);

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
