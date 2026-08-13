import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckSquare, FiUsers, FiBookOpen, FiCalendar } from 'react-icons/fi';
import { useFaculty } from '@/hooks/useFaculty';
import { useLeaveApproval } from '@/hooks/useLeaveApproval';
import { useNotifications } from '@/hooks/useNotifications';
import FacultyWelcomeCard from '@/components/faculty/FacultyWelcomeCard';
import FacultyStatCard from '@/components/faculty/FacultyStatCard';
import ClassCard from '@/components/faculty/ClassCard';
import QuickActionCard from '@/components/faculty/QuickActionCard';
import NotificationCard from '@/components/faculty/NotificationCard';
import FacultyActivityTimeline from '@/components/faculty/FacultyActivityTimeline';
import PerformanceChart from '@/components/charts/PerformanceChart';
import AreaChart from '@/components/charts/AreaChart';
import ChartContainer from '@/components/common/ChartContainer';
import Section from '@/components/common/Section';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';

const QUICK_ACTIONS = [
  { icon: <FiCheckSquare size={18} />, label: 'Mark Attendance', to: '/faculty/attendance/mark' },
  { icon: <FiCalendar size={18} />, label: 'Approve Leaves', to: '/faculty/leave-approval' },
  { icon: <FiUsers size={18} />, label: 'View Students', to: '/faculty/students' },
  { icon: <FiBookOpen size={18} />, label: 'View Subjects', to: '/faculty/subjects' },
];

/**
 * Faculty Dashboard — pulls profile, dashboard stats, assigned
 * classes, pending leaves, and notifications from Redux via the
 * domain hooks, fetching each on mount.
 */
const Dashboard = () => {
  const { profile, dashboard, loading, error, fetchProfile, fetchDashboard, fetchAssignedClasses } = useFaculty();
  const { pending, fetchPending } = useLeaveApproval();
  const { notifications, unreadCount, loading: notificationsLoading, fetchNotifications } = useNotifications();

  useEffect(() => {
    fetchProfile();
    fetchDashboard();
    fetchAssignedClasses();
    fetchPending({ pageSize: 5 });
    fetchNotifications({ pageSize: 4 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <ErrorState description={error} onRetry={fetchDashboard} />;
  }

  const stats = [
    { label: 'Students Taught', value: dashboard?.studentCount ?? '—', icon: <FiUsers size={20} />, color: 'primary' },
    { label: 'Assigned Subjects', value: dashboard?.subjectCount ?? '—', icon: <FiBookOpen size={20} />, color: 'secondary' },
    { label: "Today's Attendance", value: dashboard?.todayAttendance != null ? `${dashboard.todayAttendance}%` : '—', icon: <FiCheckSquare size={20} />, color: 'success' },
    { label: 'Pending Leave Requests', value: pending?.length ?? 0, icon: <FiCalendar size={20} />, color: 'warning' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <FacultyWelcomeCard
        name={profile?.name}
        subtitle="Here's an overview of your classes and students today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          stats.map((stat) => <FacultyStatCard key={stat.label} {...stat} />)
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Section title="Today's Classes" spacing="sm">
            {loading ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 rounded-2xl" />
                ))}
              </div>
            ) : dashboard?.todayClasses?.length ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {dashboard.todayClasses.map((session, i) => (
                  <ClassCard
                    key={session.subject}
                    session={session}
                    state={i === 0 ? 'current' : 'upcoming'}
                    action={
                      <Link to="/faculty/attendance/mark">
                        <Button size="sm" variant="outlined" fullWidth>
                          Mark Attendance
                        </Button>
                      </Link>
                    }
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="No classes scheduled today" compact />
            )}
          </Section>

          <ChartContainer
            title="Monthly Attendance Trend"
            subtitle="Average attendance across all sections"
            loading={loading}
            isEmpty={!dashboard?.monthlyAttendance?.labels?.length}
          >
            <AreaChart
              labels={dashboard?.monthlyAttendance?.labels ?? []}
              datasets={[{ label: 'Attendance %', data: dashboard?.monthlyAttendance?.scores ?? [] }]}
              height={240}
            />
          </ChartContainer>

          <PerformanceChart
            labels={dashboard?.classPerformance?.labels ?? []}
            scores={dashboard?.classPerformance?.scores ?? []}
            metricLabel="Average class performance"
            loading={loading}
          />
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
              {dashboard?.recentActivity?.length ? (
                <FacultyActivityTimeline activities={dashboard.recentActivity} />
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
