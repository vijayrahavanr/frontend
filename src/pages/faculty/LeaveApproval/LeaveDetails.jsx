import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import { useLeaveApproval } from '@/hooks/useLeaveApproval';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Stepper from '@/components/common/Stepper';
import Skeleton from '@/components/common/Skeleton';
import EmptyState from '@/components/empty-state/EmptyState';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';
import { formatDate } from '@/utils/date.utils';

const STATUS_COLOR = { approved: 'success', pending: 'warning', rejected: 'danger' };
const STATUS_STEPS = { pending: 1, approved: 3, rejected: 2 };

/**
 * Single leave request's full detail, looked up by :id from the
 * pending/approved/rejected lists already loaded into leaveSlice
 * (fetches them if empty).
 */
const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pending, approved, rejected, loading, fetchPending, fetchHistory, approve, reject } =
    useLeaveApproval();
  const [rejectOpen, setRejectOpen] = useState(false);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    if (!pending.length && !approved.length && !rejected.length) {
      fetchPending();
      fetchHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leave = [...pending, ...approved, ...rejected].find((l) => String(l.id) === id);

  const handleApprove = async () => {
    setActing(true);
    const result = await approve(leave.id);
    setActing(false);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Leave request approved.');
      navigate('/faculty/leave-approval');
    }
  };

  const handleRejectConfirm = async () => {
    setActing(true);
    const result = await reject(leave.id);
    setActing(false);
    setRejectOpen(false);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Leave request rejected.');
      navigate('/faculty/leave-approval');
    }
  };

  if (loading && !leave) return <Skeleton className="h-72 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="Leave Request Details" subtitle={`Request #${id}`} />

      <Link
        to="/faculty/leave-approval"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to leave approval
      </Link>

      {!leave ? (
        <EmptyState title="Leave request not found" />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar name={leave.studentName} size="lg" />
              <div>
                <p className="text-base font-semibold text-slate-900 dark:text-white">
                  {leave.studentName}
                </p>
                {leave.rollNumber && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Roll No. {leave.rollNumber}
                  </p>
                )}
              </div>
            </div>
            <Badge color={STATUS_COLOR[leave.status]}>{leave.status}</Badge>
          </div>

          <div className="mt-6">
            <Stepper
              steps={[{ label: 'Submitted' }, { label: 'Under Review' }, { label: 'Decision' }]}
              activeStep={STATUS_STEPS[leave.status]}
            />
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-400">Leave Type</dt>
              <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{leave.type}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Duration</dt>
              <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {formatDate(leave.startDate)} – {formatDate(leave.endDate)}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-slate-400">Reason</dt>
              <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{leave.reason}</dd>
            </div>
          </dl>

          {leave.status === 'pending' && (
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outlined" onClick={() => setRejectOpen(true)}>
                Reject
              </Button>
              <Button variant="success" onClick={handleApprove} loading={acting}>
                Approve
              </Button>
            </div>
          )}
        </div>
      )}

      <ConfirmationDialog
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onConfirm={handleRejectConfirm}
        variant="warning"
        title="Reject this leave request?"
        description={`${leave?.studentName}'s leave request will be marked as rejected.`}
        confirmLabel="Reject"
        loading={acting}
      />
    </div>
  );
};

export default LeaveDetails;
