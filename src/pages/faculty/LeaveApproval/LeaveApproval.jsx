import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLeaveApproval } from '@/hooks/useLeaveApproval';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import LeaveRequestCard from '@/components/faculty/LeaveRequestCard';
import Tabs from '@/components/common/Tabs';
import SearchInput from '@/components/common/SearchInput';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';

/**
 * Leave requests grouped into Pending / Approved / Rejected tabs,
 * backed by leaveSlice via useLeaveApproval — approve/reject dispatch
 * the real thunks.
 */
const LeaveApproval = () => {
  const navigate = useNavigate();
  const { pending, approved, rejected, loading, error, fetchPending, fetchHistory, approve, reject } =
    useLeaveApproval();
  const [tab, setTab] = useState('pending');
  const [query, setQuery] = useState('');
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    fetchPending();
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listByTab = { pending, approved, rejected };
  const filtered = (listByTab[tab] ?? []).filter((l) =>
    l.studentName?.toLowerCase().includes(query.toLowerCase())
  );

  const handleApprove = async (id) => {
    const result = await approve(id);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Leave request approved.');
  };

  const handleRejectConfirm = async () => {
    setRejecting(true);
    const result = await reject(rejectTarget.id);
    setRejecting(false);
    setRejectTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Leave request rejected.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchPending} />;

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="Leave Approval" subtitle="Review and act on student leave requests" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          tabs={[
            { label: 'Pending', value: 'pending' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ]}
          value={tab}
          onChange={setTab}
        />
        <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} className="sm:max-w-xs" />
      </div>

      {loading && !filtered.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState title={`No ${tab} leave requests`} compact />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((leave) => (
            <LeaveRequestCard
              key={leave.id}
              leave={leave}
              onClick={() => navigate(`/faculty/leave-approval/${leave.id}`)}
              onApprove={tab === 'pending' ? () => handleApprove(leave.id) : undefined}
              onReject={tab === 'pending' ? () => setRejectTarget(leave) : undefined}
            />
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={Boolean(rejectTarget)}
        onClose={() => setRejectTarget(null)}
        onConfirm={handleRejectConfirm}
        variant="warning"
        title="Reject this leave request?"
        description={`${rejectTarget?.studentName}'s leave request will be marked as rejected.`}
        confirmLabel="Reject"
        loading={rejecting}
      />
    </div>
  );
};

export default LeaveApproval;
