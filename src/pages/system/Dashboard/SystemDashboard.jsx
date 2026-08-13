import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiServer, FiActivity, FiUsers, FiShield, FiTool, FiDatabase } from 'react-icons/fi';
import { useSystem } from '@/hooks/useSystem';
import Header from '@/components/common/Header';
import SystemStatCard from '@/components/system/SystemStatCard';
import ServiceStatusCard from '@/components/system/ServiceStatusCard';
import ActivityLogCard from '@/components/system/ActivityLogCard';
import Section from '@/components/common/Section';
import Button from '@/components/common/Button';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';

const QUICK_LINKS = [
  { label: 'System Health', to: '/system/health', icon: <FiServer size={16} /> },
  { label: 'Audit Logs', to: '/system/logs/audit', icon: <FiActivity size={16} /> },
  { label: 'Role Management', to: '/system/roles', icon: <FiShield size={16} /> },
  { label: 'Backup & Restore', to: '/system/backup', icon: <FiDatabase size={16} /> },
  { label: 'Maintenance Mode', to: '/system/maintenance', icon: <FiTool size={16} /> },
];

/**
 * System Management overview — backed by systemSlice's dashboard via
 * useSystem.
 */
const SystemDashboard = () => {
  const { dashboard, loading, error, fetchDashboard } = useSystem();

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchDashboard} />;

  const STATS = [
    { label: 'System Uptime', value: dashboard?.uptime ?? '—', icon: <FiServer size={20} />, color: 'success' },
    { label: 'Active Sessions', value: dashboard?.activeSessions ?? '—', icon: <FiUsers size={20} />, color: 'primary' },
    { label: 'Roles Configured', value: dashboard?.roleCount ?? '—', icon: <FiShield size={20} />, color: 'secondary' },
    { label: 'Open Tickets', value: dashboard?.openTickets ?? '—', icon: <FiActivity size={20} />, color: 'warning' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Header title="System Dashboard" description="Enterprise system health and administration overview" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading && !dashboard ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          STATS.map((stat) => <SystemStatCard key={stat.label} {...stat} />)
        )}
      </div>

      <Section title="Service Status" spacing="sm">
        {loading && !dashboard ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : (dashboard?.services ?? []).length === 0 ? (
          <EmptyState title="No service data" compact />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dashboard.services.map((service) => (
              <ServiceStatusCard key={service.name} service={service} />
            ))}
          </div>
        )}
      </Section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Section title="Recent Activity" spacing="sm" className="lg:col-span-2">
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated">
            {loading && !dashboard ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-lg" />)
            ) : (dashboard?.recentActivity ?? []).length === 0 ? (
              <EmptyState title="No recent activity" compact />
            ) : (
              dashboard.recentActivity.map((entry) => <ActivityLogCard key={entry.id} entry={entry} />)
            )}
          </div>
        </Section>

        <Section title="Quick Links" spacing="sm">
          <div className="flex flex-col gap-2">
            {QUICK_LINKS.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button variant="outlined" fullWidth startIcon={link.icon} className="justify-start">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default SystemDashboard;
