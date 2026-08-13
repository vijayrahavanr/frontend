import DataTable from '@/components/tables/DataTable';

/**
 * Thin wrapper over the shared DataTable for analytics listing pages
 * (report history, download history, ranking tables) — just forwards
 * props so pages configure their own columns without repeating the
 * search/pagination/loading/error/empty wiring.
 */
const AnalyticsTable = (props) => <DataTable {...props} />;

export default AnalyticsTable;
