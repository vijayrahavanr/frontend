import { useEffect } from 'react';
import { useSystem } from '@/hooks/useSystem';
import Header from '@/components/common/Header';
import ApplicationHealthCard from '@/components/system/ApplicationHealthCard';
import BarChart from '@/components/charts/BarChart';
import ChartContainer from '@/components/common/ChartContainer';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * Application-level health — backed by systemSlice's
 * applicationHealth via useSystem.
 */
const ApplicationHealth = () => {
  const { applicationHealth, loading, error, fetchApplicationHealth } = useSystem();

  useEffect(() => {
    fetchApplicationHealth();
    const interval = setInterval(fetchApplicationHealth, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchApplicationHealth} />;

  const errorRate = formatChartData(applicationHealth?.errorRateTrend ?? []);
  const gauges = applicationHealth?.gauges ?? [];

  return (
    <div className="flex flex-col gap-6">
      <Header title="Application Health" description="Resource usage and error rates for the application layer" />

      {loading && !applicationHealth ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {gauges.map((gauge) => (
            <ApplicationHealthCard key={gauge.label} {...gauge} />
          ))}
        </div>
      )}

      <ChartContainer title="Error Rate" subtitle="Errors logged per day, last 7 days" loading={loading} isEmpty={!errorRate.labels.length}>
        <BarChart labels={errorRate.labels} datasets={[{ label: 'Errors', data: errorRate.data }]} height={260} />
      </ChartContainer>
    </div>
  );
};

export default ApplicationHealth;
