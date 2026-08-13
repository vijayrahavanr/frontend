import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useTimetable } from '@/hooks/useTimetable';
import AdminTopbar from '@/components/admin/AdminTopbar';
import TimetableCard from '@/components/admin/TimetableCard';
import Select from '@/components/common/Select';
import Tabs from '@/components/common/Tabs';
import Button from '@/components/common/Button';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SECTION_OPTIONS = [
  { label: 'CSE — Section A', value: 'CSE-A' },
  { label: 'CSE — Section B', value: 'CSE-B' },
];

/**
 * Admin timetable management — backed by timetableSlice's admin CRUD
 * via useTimetable.
 */
const Timetable = () => {
  const navigate = useNavigate();
  const { timetable, loading, error, fetchTimetable, removeTimetable } = useTimetable();
  const [section, setSection] = useState(SECTION_OPTIONS[0].value);
  const [activeDay, setActiveDay] = useState('Monday');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTimetable({ section });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const periods = timetable.filter((p) => p.day === activeDay);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    const result = await removeTimetable(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Timetable period deleted.');
  };

  if (error) return <ErrorState description={error} onRetry={() => fetchTimetable({ section })} />;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar
        title="Timetable"
        subtitle="Manage class schedules"
        actions={
          <Link to="/admin/timetable/create">
            <Button size="sm" startIcon={<FiPlus size={14} />}>
              Create Timetable
            </Button>
          </Link>
        }
      />

      <div className="max-w-xs">
        <Select label="Class / Section" options={SECTION_OPTIONS} value={section} onChange={(e) => setSection(e.target.value)} />
      </div>

      <Tabs
        tabs={WEEK_DAYS.map((day) => ({ label: day.slice(0, 3), value: day }))}
        value={activeDay}
        onChange={setActiveDay}
      />

      {loading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : periods.length === 0 ? (
        <EmptyState title="No periods scheduled" description="Add a period for this day." compact />
      ) : (
        <div className="flex flex-col gap-2">
          {periods.map((period) => (
            <TimetableCard
              key={period.id}
              period={period}
              onEdit={() => navigate(`/admin/timetable/${period.id}/edit`)}
              onDelete={() => setDeleteTarget(period)}
            />
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        variant="delete"
        title="Delete this period?"
        description={`${deleteTarget?.subject} at ${deleteTarget?.time} will be removed from the timetable.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default Timetable;
