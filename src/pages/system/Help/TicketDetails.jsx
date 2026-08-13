import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import { useSupport } from '@/hooks/useSupport';
import Header from '@/components/common/Header';
import TicketStatusBadge from '@/components/system/TicketStatusBadge';
import Badge from '@/components/common/Badge';
import Avatar from '@/components/common/Avatar';
import TextArea from '@/components/common/TextArea';
import Button from '@/components/common/Button';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import { formatDateTime } from '@/utils/date.utils';

const PRIORITY_COLOR = { high: 'danger', medium: 'warning', low: 'neutral' };

/**
 * Support-ticket thread — backed by helpSlice's ticketDetails via
 * useSupport.
 */
const TicketDetails = () => {
  const { id } = useParams();
  const { ticketDetails, loading, error, fetchTicketById, sendReply } = useSupport();
  const [reply, setReply] = useState('');

  useEffect(() => {
    fetchTicketById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSendReply = async () => {
    if (!reply.trim()) return;
    const result = await sendReply(id, reply);
    if (result.meta.requestStatus === 'fulfilled') {
      setReply('');
      toast.success('Reply sent.');
    }
  };

  if (error) return <ErrorState description={error} onRetry={() => fetchTicketById(id)} />;
  if (loading && !ticketDetails) return <Skeleton className="h-96 rounded-2xl" />;
  if (!ticketDetails) return null;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Ticket Details" description={`Ticket #${id}`} />

      <Link
        to="/help/tickets"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to tickets
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark-elevated">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">{ticketDetails.subject}</h2>
          <div className="flex gap-2">
            <Badge color={PRIORITY_COLOR[ticketDetails.priority]}>{ticketDetails.priority} priority</Badge>
            <TicketStatusBadge status={ticketDetails.status} />
          </div>
        </div>
        <p className="mt-1 text-xs text-slate-400">Opened {formatDateTime(ticketDetails.createdAt)}</p>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{ticketDetails.description}</p>
      </div>

      <div className="flex flex-col gap-3">
        {(ticketDetails.replies ?? []).map((r) => (
          <div key={r.id} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated">
            <Avatar name={r.author} size="sm" />
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                {r.author}
                <span className="text-xs font-normal text-slate-400">{formatDateTime(r.timestamp)}</span>
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{r.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
        <TextArea label="Reply" rows={3} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply..." />
        <Button startIcon={<FiSend size={15} />} className="self-end" disabled={!reply.trim()} onClick={handleSendReply} loading={loading}>
          Send Reply
        </Button>
      </div>
    </div>
  );
};

export default TicketDetails;
