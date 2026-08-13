import { useEffect, useState } from 'react';
import { useTimetable } from '@/hooks/useTimetable';
import StudentTopbar from '@/components/student/StudentTopbar';
import TimetableCard from '@/components/student/TimetableCard';
import Tabs from '@/components/common/Tabs';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TODAY_LABEL = WEEK_DAYS[new Date().getDay() - 1] || 'Monday';

/**
 * Timetable page: today's schedule up top, full weekly view via
 * tabs — both backed by timetableSlice via useTimetable.
 */
const Timetable = () => {
  const { today, weekly, loading, error, fetchToday, fetchWeekly } = useTimetable();
  const [activeDay, setActiveDay] = useState(TODAY_LABEL);

  useEffect(() => {
    fetchToday();
    fetchWeekly();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={() => { fetchToday(); fetchWeekly(); }} />;

  const activeDaySchedule = weekly[activeDay] ?? [];

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="Timetable" subtitle="Your weekly class schedule" />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
        <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
          Today — {TODAY_LABEL}
        </p>
        <div className="flex flex-col gap-2">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
          ) : today?.length ? (
            today.map((period, i) => (
              <TimetableCard key={period.subject} period={period} state={i === 0 ? 'current' : 'upcoming'} />
            ))
          ) : (
            <EmptyState title="No classes today" compact />
          )}
        </div>
      </div>

      <div>
        <Tabs
          tabs={WEEK_DAYS.map((day) => ({ label: day.slice(0, 3), value: day }))}
          value={activeDay}
          onChange={setActiveDay}
          className="mb-4"
        />
        <div className="flex flex-col gap-2">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
          ) : activeDaySchedule.length ? (
            activeDaySchedule.map((period) => <TimetableCard key={period.subject} period={period} />)
          ) : (
            <EmptyState title="No classes scheduled" compact />
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
