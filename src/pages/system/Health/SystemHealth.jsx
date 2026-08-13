import { useEffect } from 'react';
import { FiCpu, FiClock, FiAlertCircle } from 'react-icons/fi';
import { useSystem } from '@/hooks/useSystem';
import Header from '@/components/common/Header';
import ServiceStatusCard from '@/components/system/ServiceStatusCard';
import SystemStatCard from '@/components/system/SystemStatCard';
import LineChart from '@/components/charts/LineChart';
import ChartContainer from '@/components/common/ChartContainer';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import EmptyState from '@/components/empty-state/EmptyState';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * System health — backed by systemSlice's systemHealth via
 * useSystem, polled periodically.
 */
const SystemHealth = () => {
  const { systemHealth, loading, error, fetchSystemHealth } = useSystem();

  useEffect(() => {
    fetchSystemHealth();
    const interval = setInterval(fetchSystemHealth, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchSystemHealth} />;

  const latency = formatChartData(systemHealth?.latencyTrend ?? []);
  const services = systemHealth?.services ?? [];

  const STATS = [
    { label: 'Avg. Response Time', value: systemHealth?.avgResponseTime ?? '—', icon: <FiClock size={20} />, color: 'primary' },
    { label: 'Overall Uptime', value: systemHealth?.overallUptime ?? '—', icon: <FiCpu size={20} />, color: 'success' },
    { label: 'Active Incidents', value: systemHealth?.activeIncidents ?? 0, icon: <FiAlertCircle size={20} />, color: 'warning' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Header title="System Health" description="Live status and uptime for every core service" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading && !systemHealth ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          STATS.map((stat) => <SystemStatCard key={stat.label} {...stat} />)
        )}
      </div>

      {loading && !systemHealth ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <EmptyState title="No service data" compact />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <ServiceStatusCard key={service.name} service={service} />
          ))}
        </div>
      )}

      <ChartContainer title="API Latency" subtitle="Last 24 hours" loading={loading} isEmpty={!latency.labels.length}>
        <LineChart labels={latency.labels} datasets={[{ label: 'Latency (ms)', data: latency.data }]} height={260} />
      </ChartContainer>
    </div>
  );
};

export default SystemHealth;
