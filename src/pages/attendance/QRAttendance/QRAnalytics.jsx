import { useEffect } from 'react';
import { useQRAttendance } from '@/hooks/useQRAttendance';
import Header from '@/components/common/Header';
import AttendanceChartCard from '@/components/attendance/AttendanceChartCard';
import QRStatisticsCard from '@/components/attendance/QRStatisticsCard';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * QR usage analytics — backed by qrAttendanceSlice's statistics via
 * useQRAttendance.
 */
const QRAnalytics = () => {
  const { statistics, loading, error, fetchStatistics } = useQRAttendance();

  useEffect(() => {
    fetchStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dailyVolume = formatChartData(statistics?.dailyVolume ?? []);
  const subjectSuccess = formatChartData(statistics?.subjectSuccessRate ?? []);

  return (
    <div className="flex flex-col gap-6">
      <Header title="QR Analytics" description="Usage trends and success rates for QR attendance" />

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AttendanceChartCard
          type="bar"
          title="Daily Scan Volume"
          subtitle="This week"
          labels={dailyVolume.labels}
          data={[{ label: 'Scans', data: dailyVolume.data }]}
          loading={loading}
          error={error}
          onRetry={fetchStatistics}
        />
        <AttendanceChartCard
          type="bar"
          title="Success Rate by Subject"
          subtitle="Last 30 days"
          labels={subjectSuccess.labels}
          data={[{ label: 'Success %', data: subjectSuccess.data }]}
          loading={loading}
          error={error}
          onRetry={fetchStatistics}
        />
      </div>
    </div>
  );
};

export default QRAnalytics;
