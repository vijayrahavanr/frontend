import { useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import Tabs from '@/components/common/Tabs';
import TrendCard from '@/components/analytics/TrendCard';
import AnalyticsChartCard from '@/components/analytics/AnalyticsChartCard';
import Alert from '@/components/common/Alert';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

const PERIOD_TABS = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Semester', value: 'semester' },
  { label: 'Academic Year', value: 'academic' },
];

/**
 * Trend analysis — backed by attendanceSlice's trendAnalytics via
 * useAnalytics.
 */
const TrendAnalysis = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const { trendAnalytics, loading, error, fetchTrendAnalytics } = useAnalytics();

  useEffect(() => {
    fetchTrendAnalytics({ period: activeTab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  if (error) return <ErrorState description={error} onRetry={() => fetchTrendAnalytics({ period: activeTab })} />;

  const chart = formatChartData(trendAnalytics?.series ?? []);
  const growth = trendAnalytics?.growthSummary ?? [];

  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader
        title="Trend Analysis"
        description="Growth trends across monthly, semester, and academic-year views"
        breadcrumbItems={[{ label: 'Analytics', href: '/analytics/dashboard' }, { label: 'Trends' }]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading && !growth.length ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)
        ) : (
          growth.map((item) => <TrendCard key={item.label} {...item} />)
        )}
      </div>

      <Tabs tabs={PERIOD_TABS} value={activeTab} onChange={setActiveTab} />

      <AnalyticsChartCard
        type="line"
        title={`${PERIOD_TABS.find((t) => t.value === activeTab)?.label} Trend`}
        subtitle="Institution-wide attendance"
        labels={chart.labels}
        data={[{ label: 'Attendance %', data: chart.data }]}
        loading={loading}
      />

      <Alert type="info" title="Forecasting coming soon">
        Predictive trend forecasting will be available once historical data collection is complete.
      </Alert>
    </div>
  );
};

export default TrendAnalysis;
