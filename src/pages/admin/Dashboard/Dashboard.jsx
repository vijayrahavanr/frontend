import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiUserCheck, FiLayers, FiCheckSquare, FiUserPlus, FiBell, FiSend } from 'react-icons/fi';
import { useAdmin } from '@/hooks/useAdmin';
import { useNotifications } from '@/hooks/useNotifications';
import AdminWelcomeCard from '@/components/admin/AdminWelcomeCard';
import AdminStatCard from '@/components/admin/AdminStatCard';
import QuickActionCard from '@/components/admin/QuickActionCard';
import NotificationCard from '@/components/admin/NotificationCard';
import RecentActivityCard from '@/components/admin/RecentActivityCard';
import SystemStatusCard from '@/components/admin/SystemStatusCard';
import AttendanceAnalyticsCard from '@/components/admin/AttendanceAnalyticsCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import ChartContainer from '@/components/common/ChartContainer';
import Section from '@/components/common/Section';
import Badge from '@/components/common/Badge';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';
import { formatStatistics } from '@/utils/adminHelpers';
import { formatChartData } from '@/utils/dashboardHelpers';

const QUICK_ACTIONS = [
  { icon: <FiUserPlus size={18} />, label: 'Add Student', to: '/admin/students/add' },
  { icon: <FiUserCheck size={18} />, label: 'Add Faculty', to: '/admin/faculty/add' },
  { icon: <FiSend size={18} />, label: 'Send Notification', to: '/admin/notifications/send' },
  { icon: <FiBell size={18} />, label: 'View Reports', to: '/admin/reports' },
];

/**
 * Admin Dashboard — pulls profile, system statistics, status, and
 * notifications from Redux via the domain hooks, fetching each on
 * mount.
 */
const Dashboard = () => {
  const {
    profile,
    dashboard,
    systemStatistics,
    recentActivities,
    systemStatus,
    loading,
    error,
    fetchProfile,
    fetchDashboard,
    fetchSystemStatistics,
    fetchSystemStatus,
  } = useAdmin();
  const { notifications, unreadCount, loading: notificationsLoading, fetchNotifications } = useNotifications();

  useEffect(() => {
    fetchProfile();
    fetchDashboard();
    fetchSystemStatistics();
    fetchSystemStatus();
    fetchNotifications({ pageSize: 4 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchDashboard} />;

  const stats = formatStatistics(systemStatistics);
  const attendanceTrend = formatChartData(dashboard?.attendanceTrend ?? []);
  const departmentStats = formatChartData(dashboard?.departmentStats ?? []);

  const STATS = [
    { label: 'Total Students', value: stats.totalStudents.toLocaleString(), icon: <FiUsers size={20} />, color: 'primary' },
    { label: 'Total Faculty', value: stats.totalFaculty.toLocaleString(), icon: <FiUserCheck size={20} />, color: 'secondary' },
    { label: 'Departments', value: stats.totalDepartments, icon: <FiLayers size={20} />, color: 'warning' },
    { label: "Today's Attendance", value: `${stats.todayAttendance}%`, icon: <FiCheckSquare size={20} />, color: 'success' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AdminWelcomeCard name={profile?.name} subtitle="Here's what's happening across the institution today." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          STATS.map((stat) => <AdminStatCard key={stat.label} {...stat} />)
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ChartContainer title="Attendance Trend" subtitle="Institution-wide, last 6 months" loading={loading} isEmpty={!attendanceTrend.labels.length}>
            <LineChart labels={attendanceTrend.labels} datasets={[{ label: 'Attendance %', data: attendanceTrend.data }]} height={260} />
          </ChartContainer>

          <ChartContainer title="Department-wise Attendance" subtitle="Current semester average" loading={loading} isEmpty={!departmentStats.labels.length}>
            <BarChart labels={departmentStats.labels} datasets={[{ label: 'Attendance %', data: departmentStats.data }]} height={260} />
          </ChartContainer>

          <Section title="Department Breakdown" spacing="sm">
            {loading ? (
              <Skeleton className="h-40 rounded-2xl" />
            ) : dashboard?.departmentBreakdown?.length ? (
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
                {dashboard.departmentBreakdown.map((dept) => (
                  <AttendanceAnalyticsCard key={dept.label} {...dept} />
                ))}
              </div>
            ) : (
              <EmptyState title="No department data yet" compact />
            )}
          </Section>
        </div>

        <div className="flex flex-col gap-6">
          <Section title="Quick Actions" spacing="sm">
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <Link key={action.label} to={action.to}>
                  <QuickActionCard icon={action.icon} label={action.label} />
                </Link>
              ))}
            </div>
          </Section>

          {loading ? <Skeleton className="h-48 rounded-2xl" /> : systemStatus && <SystemStatusCard services={systemStatus.services ?? []} />}

          <Section
            title="Recent Notifications"
            spacing="sm"
            action={notifications?.length > 0 && <Badge color="primary">{unreadCount} new</Badge>}
          >
            {notificationsLoading ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            ) : notifications?.length ? (
              <div className="flex flex-col gap-2">
                {notifications.slice(0, 4).map((n) => (
                  <NotificationCard key={n.id} {...n} />
                ))}
              </div>
            ) : (
              <EmptyState title="No notifications" compact />
            )}
          </Section>

          <Section title="Recent Activity" spacing="sm">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
              {recentActivities?.length ? (
                <RecentActivityCard activities={recentActivities} />
              ) : (
                <EmptyState title="No recent activity" compact />
              )}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
