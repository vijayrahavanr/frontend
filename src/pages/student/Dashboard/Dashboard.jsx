import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckSquare, FiCalendar, FiCamera, FiUserCheck, FiClock, FiBookOpen } from 'react-icons/fi';
import { useStudent } from '@/hooks/useStudent';
import { useAttendance } from '@/hooks/useAttendance';
import { useTimetable } from '@/hooks/useTimetable';
import { useNotifications } from '@/hooks/useNotifications';
import { useLeave } from '@/hooks/useLeave';
import StudentWelcomeCard from '@/components/student/StudentWelcomeCard';
import StudentStatCard from '@/components/student/StudentStatCard';
import AttendanceSummaryCard from '@/components/student/AttendanceSummaryCard';
import TimetableCard from '@/components/student/TimetableCard';
import QuickActionCard from '@/components/student/QuickActionCard';
import NotificationCard from '@/components/student/NotificationCard';
import StudentActivityTimeline from '@/components/student/StudentActivityTimeline';
import PerformanceChart from '@/components/charts/PerformanceChart';
import Section from '@/components/common/Section';
import Badge from '@/components/common/Badge';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import EmptyState from '@/components/empty-state/EmptyState';

const QUICK_ACTIONS = [
  { icon: <FiCamera size={18} />, label: 'Scan QR', to: '/student/qr-attendance' },
  { icon: <FiUserCheck size={18} />, label: 'Verify Face', to: '/student/face-recognition' },
  { icon: <FiCalendar size={18} />, label: 'Apply Leave', to: '/student/leave/apply' },
  { icon: <FiBookOpen size={18} />, label: 'View Subjects', to: '/student/subjects' },
];

/**
 * Student Dashboard — pulls profile, dashboard stats, attendance
 * summary, today's timetable, notifications, and leave status from
 * Redux (via the domain hooks), fetching each on mount.
 */
const Dashboard = () => {
  const { profile, dashboard, loading: studentLoading, error: studentError, fetchProfile, fetchDashboard } = useStudent();
  const { summary, loading: attendanceLoading, fetchSummary } = useAttendance();
  const { today: todayTimetable, loading: timetableLoading, fetchToday } = useTimetable();
  const { notifications, loading: notificationsLoading, fetchNotifications } = useNotifications();
  const { status: leaveStatus, fetchHistory: fetchLeaveHistory } = useLeave();

  useEffect(() => {
    fetchProfile();
    fetchDashboard();
    fetchSummary();
    fetchToday();
    fetchNotifications({ pageSize: 4 });
    fetchLeaveHistory({ pageSize: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (studentError) {
    return <ErrorState description={studentError} onRetry={fetchDashboard} />;
  }

  const stats = [
    {
      label: 'Overall Attendance',
      value: summary?.percentage != null ? `${summary.percentage}%` : '—',
      icon: <FiCheckSquare size={20} />,
      color: 'success',
    },
    {
      label: "Today's Classes",
      value: todayTimetable?.length ?? '—',
      icon: <FiBookOpen size={20} />,
      color: 'primary',
    },
    {
      label: 'Leave Status',
      value: leaveStatus ? leaveStatus.charAt(0).toUpperCase() + leaveStatus.slice(1) : 'None',
      icon: <FiCalendar size={20} />,
      color: 'warning',
    },
    {
      label: 'Unread Notifications',
      value: notifications?.filter((n) => !n.read).length ?? 0,
      icon: <FiClock size={20} />,
      color: 'secondary',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <StudentWelcomeCard
        name={profile?.name}
        subtitle="Here's what's happening with your attendance and classes today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {studentLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          stats.map((stat) => <StudentStatCard key={stat.label} {...stat} />)
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {attendanceLoading ? (
            <Skeleton className="h-32 rounded-2xl" />
          ) : summary ? (
            <AttendanceSummaryCard
              percentage={summary.percentage}
              present={summary.present}
              absent={summary.absent}
              late={summary.late}
            />
          ) : (
            <EmptyState title="No attendance data yet" compact />
          )}

          <PerformanceChart
            labels={dashboard?.performanceTrend?.labels ?? []}
            scores={dashboard?.performanceTrend?.scores ?? []}
            loading={studentLoading}
          />

          <Section title="Today's Timetable" spacing="sm">
            {timetableLoading ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            ) : todayTimetable?.length ? (
              <div className="flex flex-col gap-2">
                {todayTimetable.map((period, i) => (
                  <TimetableCard key={period.subject} period={period} state={i === 0 ? 'current' : 'upcoming'} />
                ))}
              </div>
            ) : (
              <EmptyState title="No classes today" compact />
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

          <Section
            title="Recent Notifications"
            spacing="sm"
            action={
              notifications?.length > 0 && (
                <Badge color="primary">{notifications.filter((n) => !n.read).length} new</Badge>
              )
            }
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
                <StudentActivityTimeline activities={dashboard.recentActivity} />
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
