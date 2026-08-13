import DataTable from '@/components/tables/DataTable';

const COLUMNS = [
  { key: 'date', header: 'Date', sortable: true },
  { key: 'subject', header: 'Subject', sortable: true },
  { key: 'scannedBy', header: 'Scanned By', hideOnMobile: true },
  { key: 'time', header: 'Time', hideOnMobile: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * Table of QR generation/scan history — a thin wrapper over the
 * shared DataTable pre-configured with QR-specific columns, so pages
 * don't repeat the column config.
 *
 * @param {object} props
 * @param {object[]} props.data
 * @param {boolean} [props.loading]
 * @param {string|null} [props.error]
 * @param {() => void} [props.onRetry]
 */
const QRHistoryTable = ({ data = [], loading, error, onRetry, pageSize = 8 }) => (
  <DataTable
    columns={COLUMNS}
    data={data}
    loading={loading}
    error={error}
    onRetry={onRetry}
    pageSize={pageSize}
    searchKeys={['subject', 'scannedBy', 'status']}
  />
);

export default QRHistoryTable;
