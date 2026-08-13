import { useEffect } from 'react';
import { FiUserCheck, FiPercent, FiClock } from 'react-icons/fi';
import { useFaceRecognition } from '@/hooks/useFaceRecognition';
import Header from '@/components/common/Header';
import AttendanceChartCard from '@/components/attendance/AttendanceChartCard';
import AttendanceMetricCard from '@/components/attendance/AttendanceMetricCard';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * Face recognition analytics — backed by faceRecognitionSlice's
 * recognitionAnalytics via useFaceRecognition.
 */
const RecognitionAnalytics = () => {
  const { recognitionAnalytics, loading, error, fetchAnalytics } = useFaceRecognition();

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trend = formatChartData(recognitionAnalytics?.confidenceTrend ?? []);
  const outcomes = recognitionAnalytics?.outcomeBreakdown ?? { labels: [], data: [] };

  const STATS = [
    { label: 'Total Verifications', value: recognitionAnalytics?.totalVerifications?.toLocaleString() ?? '—', icon: <FiUserCheck size={20} />, color: 'primary' },
    { label: 'Average Confidence', value: recognitionAnalytics?.averageConfidence != null ? `${recognitionAnalytics.averageConfidence}%` : '—', icon: <FiPercent size={20} />, color: 'success' },
    { label: 'Average Verify Time', value: recognitionAnalytics?.averageVerifyTime ?? '—', icon: <FiClock size={20} />, color: 'secondary' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Header title="Recognition Analytics" description="Confidence trends and verification outcomes" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading && !recognitionAnalytics ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          STATS.map((stat) => <AttendanceMetricCard key={stat.label} {...stat} />)
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AttendanceChartCard
          type="line"
          title="Average Confidence Trend"
          subtitle="Last 6 months"
          labels={trend.labels}
          data={[{ label: 'Confidence %', data: trend.data }]}
          loading={loading}
          error={error}
          onRetry={fetchAnalytics}
        />
        <AttendanceChartCard
          type="doughnut"
          title="Verification Outcomes"
          subtitle="All time"
          labels={outcomes.labels}
          data={outcomes.data}
          loading={loading}
          error={error}
          onRetry={fetchAnalytics}
        />
      </div>
    </div>
  );
};

export default RecognitionAnalytics;
