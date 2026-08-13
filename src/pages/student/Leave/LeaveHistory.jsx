import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLeave } from '@/hooks/useLeave';
import StudentTopbar from '@/components/student/StudentTopbar';
import LeaveCard from '@/components/student/LeaveCard';
import Stepper from '@/components/common/Stepper';
import Section from '@/components/common/Section';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';

const STATUS_STEPS = { pending: 1, approved: 3, rejected: 2 };
const STEPPER_LABELS = ['Submitted', 'Under Review', 'Decision'];

/**
 * List of past leave applications with a status-progress view for the
 * selected request, backed by leaveSlice via useLeave. Supports
 * canceling a pending request.
 */
const LeaveHistory = () => {
  const { history, loading, error, fetchHistory, removeLeave } = useLeave();
  const [selected, setSelected] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selected && history.length) setSelected(history[0]);
  }, [history, selected]);

  const handleCancelConfirm = async () => {
    setCanceling(true);
    const result = await removeLeave(cancelTarget.id);
    setCanceling(false);
    setCancelTarget(null);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Leave request canceled.');
      if (selected?.id === cancelTarget.id) setSelected(null);
    }
  };

  if (error) return <ErrorState description={error} onRetry={fetchHistory} />;

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="Leave History" subtitle="Track the status of your leave requests" />

      <Section title="Latest Request Status" spacing="sm">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark-elevated">
          {loading && !selected ? (
            <Skeleton className="h-10 w-full" />
          ) : selected ? (
            <Stepper
              steps={STEPPER_LABELS.map((label) => ({ label }))}
              activeStep={STATUS_STEPS[selected.status]}
            />
          ) : (
            <EmptyState title="No leave requests yet" compact />
          )}
        </div>
      </Section>

      <Section title="All Requests" spacing="sm">
        {loading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : history.length === 0 ? (
          <EmptyState title="No leave requests yet" />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {history.map((leave) => (
              <div key={leave.id} className="flex flex-col gap-2">
                <div onClick={() => setSelected(leave)} className="cursor-pointer">
                  <LeaveCard leave={leave} />
                </div>
                {leave.status === 'pending' && (
                  <button
                    onClick={() => setCancelTarget(leave)}
                    className="self-end text-xs font-medium text-danger hover:underline"
                  >
                    Cancel request
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>

      <ConfirmationDialog
        open={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancelConfirm}
        variant="delete"
        title="Cancel leave request?"
        description="This will withdraw your pending leave application."
        confirmLabel="Cancel request"
        cancelLabel="Keep it"
        loading={canceling}
      />
    </div>
  );
};

export default LeaveHistory;
