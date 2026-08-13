import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import {
  getTodaySchedule,
  getWeeklySchedule,
  selectTodaySchedule,
  selectWeeklySchedule,
  selectTimetableLoading,
  selectTimetableError,
} from '@/redux/slices/timetableSlice';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import TimetableCard from '@/components/faculty/TimetableCard';
import Tabs from '@/components/common/Tabs';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TODAY_LABEL = WEEK_DAYS[new Date().getDay() - 1] || 'Monday';

/**
 * Faculty timetable — backed by the shared timetableSlice, using its
 * "Schedule"-named aliases (getTodaySchedule/getWeeklySchedule) so
 * this page's action names match the faculty spec while reusing the
 * exact same state as the student module's Timetable page.
 */
const Timetable = () => {
  const dispatch = useAppDispatch();
  const today = useAppSelector(selectTodaySchedule);
  const weekly = useAppSelector(selectWeeklySchedule);
  const loading = useAppSelector(selectTimetableLoading);
  const error = useAppSelector(selectTimetableError);
  const [activeDay, setActiveDay] = useState(TODAY_LABEL);

  useEffect(() => {
    dispatch(getTodaySchedule());
    dispatch(getWeeklySchedule());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <ErrorState
        description={error}
        onRetry={() => {
          dispatch(getTodaySchedule());
          dispatch(getWeeklySchedule());
        }}
      />
    );
  }

  const activeDaySchedule = weekly[activeDay] ?? [];

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="Timetable" subtitle="Your weekly teaching schedule" />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
        <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
          Today — {TODAY_LABEL}
        </p>
        <div className="flex flex-col gap-2">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
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
