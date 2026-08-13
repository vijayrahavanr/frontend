import { memo, useMemo, useState } from 'react';
import { FiChevronUp, FiChevronDown, FiDownload, FiRefreshCw } from 'react-icons/fi';
import { cn } from '@/utils/helpers';
import SearchInput from '../common/SearchInput';
import Checkbox from '../common/Checkbox';
import Pagination from '../common/Pagination';
import Skeleton from '../common/Skeleton';
import NoData from '../empty-state/NoData';
import ErrorState from '../error/ErrorState';
import Button from '../common/Button';
import Badge from '../common/Badge';

const STATUS_COLOR = {
  active: 'success',
  present: 'success',
  approved: 'success',
  inactive: 'neutral',
  pending: 'warning',
  warning: 'warning',
  rejected: 'danger',
  absent: 'danger',
  error: 'danger',
};

/**
 * Enterprise-grade data table.
 *
 * @param {object} props
 * @param {{key: string, header: string, sortable?: boolean, render?: (row: object) => React.ReactNode, width?: string, hideOnMobile?: boolean, status?: boolean}[]} props.columns
 * @param {object[]} props.data - each row should have a unique `id`
 * @param {boolean} [props.loading]
 * @param {string|null} [props.error]
 * @param {() => void} [props.onRetry]
 * @param {() => void} [props.onRefresh]
 * @param {() => void} [props.onExport]
 * @param {boolean} [props.selectable]
 * @param {(selectedIds: (string|number)[]) => React.ReactNode} [props.bulkActions]
 * @param {(row: object) => React.ReactNode} [props.rowActions]
 * @param {number} [props.pageSize]
 * @param {boolean} [props.searchable]
 * @param {string[]} [props.searchKeys] - row keys to match against the search query
 */
const DataTable = memo(function DataTable({
  columns = [],
  data = [],
  loading = false,
  error = null,
  onRetry,
  onRefresh,
  onExport,
  selectable = false,
  bulkActions,
  rowActions,
  pageSize = 10,
  searchable = true,
  searchKeys,
  className,
}) {
  const [query, setQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const effectiveSearchKeys = searchKeys || columns.map((c) => c.key);

  const filteredData = useMemo(() => {
    if (!query) return data;
    const lower = query.toLowerCase();
    return data.filter((row) =>
      effectiveSearchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(lower))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, query]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const allVisibleSelected =
    paginatedData.length > 0 && paginatedData.every((row) => selectedIds.includes(row.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !paginatedData.some((r) => r.id === id)));
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...paginatedData.filter((r) => !prev.includes(r.id)).map((r) => r.id),
      ]);
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const renderCell = (row, column) => {
    if (column.status) {
      const value = row[column.key];
      const color = STATUS_COLOR[String(value).toLowerCase()] || 'neutral';
      return <Badge color={color}>{value}</Badge>;
    }
    if (column.render) return column.render(row);
    return row[column.key];
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {searchable ? (
          <SearchInput
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="sm:max-w-xs"
          />
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2">
          {selectable && selectedIds.length > 0 && bulkActions?.(selectedIds)}
          {onRefresh && (
            <Button variant="outlined" size="sm" onClick={onRefresh} startIcon={<FiRefreshCw size={14} />}>
              Refresh
            </Button>
          )}
          {onExport && (
            <Button variant="outlined" size="sm" onClick={onExport} startIcon={<FiDownload size={14} />}>
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full min-w-full text-left text-sm" aria-label="Data table" aria-busy={loading}>
          <thead className="sticky top-0 z-10 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={allVisibleSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn('px-4 py-3 font-medium', column.hideOnMobile && 'hidden sm:table-cell')}
                  aria-sort={
                    column.sortable
                      ? sortConfig.key === column.key
                        ? sortConfig.direction === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                      : undefined
                  }
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                      className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      aria-label={`Sort by ${column.header}`}
                    >
                      {column.header}
                      {sortConfig.key === column.key &&
                        (sortConfig.direction === 'asc' ? (
                          <FiChevronUp size={12} aria-hidden="true" />
                        ) : (
                          <FiChevronDown size={12} aria-hidden="true" />
                        ))}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
              {rowActions && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {loading ? (
              Array.from({ length: Math.min(pageSize, 5) }).map((_, rowIdx) => (
                <tr key={`skeleton-${rowIdx}`}>
                  {selectable && (
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-4" />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3">
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-16" />
                    </td>
                  )}
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}>
                  <ErrorState description={error} onRetry={onRetry} />
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}>
                  <NoData message={query ? 'No results match your search' : 'No data available'} />
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <Checkbox
                        aria-label={`Select row ${row.id}`}
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleSelectRow(row.id)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'px-4 py-3 text-slate-700 dark:text-slate-200',
                        column.hideOnMobile && 'hidden sm:table-cell'
                      )}
                    >
                      {renderCell(row, column)}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-3 text-right">{rowActions(row)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && !error && sortedData.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sortedData.length)} of{' '}
            {sortedData.length}
          </p>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
});

export default DataTable;
