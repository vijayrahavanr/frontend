import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQRAttendance } from '@/hooks/useQRAttendance';
import Header from '@/components/common/Header';
import QRHistoryTable from '@/components/attendance/QRHistoryTable';
import QRStatisticsCard from '@/components/attendance/QRStatisticsCard';
import AttendanceExportCard from '@/components/attendance/AttendanceExportCard';
import Skeleton from '@/components/common/Skeleton';

/**
 * Full QR generation/scan history — backed by qrAttendanceSlice via
 * useQRAttendance.
 */
const QRHistory = () => {
  const { history, statistics, loading, error, fetchHistory, fetchStatistics } = useQRAttendance();
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchHistory();
    fetchStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      toast.success('QR history export started.');
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6">
      <Header title="QR Attendance History" description="Every QR code generated and scanned" />

      {loading && !statistics ? (
        <Skeleton className="h-24 rounded-2xl" />
      ) : (
        statistics && (
          <QRStatisticsCard
            successfulScans={statistics.successfulScans}
            duplicateAttempts={statistics.duplicateAttempts}
            averageScanTime={statistics.averageScanTime}
          />
        )
      )}

      <QRHistoryTable
        data={history.items}
        loading={loading}
        error={error}
        onRetry={fetchHistory}
        pageSize={history.pageSize || 8}
      />

      <AttendanceExportCard
        title="Export QR history"
        description="Download this history as CSV or PDF."
        onExport={handleExport}
        exporting={exporting}
      />
    </div>
  );
};

export default QRHistory;
