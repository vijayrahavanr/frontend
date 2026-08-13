import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useSupport } from '@/hooks/useSupport';
import Header from '@/components/common/Header';
import TicketCard from '@/components/system/TicketCard';
import Tabs from '@/components/common/Tabs';
import Button from '@/components/common/Button';
import Modal from '@/components/modals/Modal';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import TextArea from '@/components/common/TextArea';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const PRIORITY_OPTIONS = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Closed', value: 'closed' },
];

/**
 * Support ticket list — backed by helpSlice's tickets via useSupport.
 */
const SupportTickets = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const { tickets, loading, error, fetchTickets, openTicket } = useSupport();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { subject: '', priority: 'medium', description: '' } });

  useEffect(() => {
    fetchTickets({ status: tab === 'all' ? undefined : tab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const onSubmit = async (values) => {
    const result = await openTicket(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Support ticket created successfully.');
      reset();
      setModalOpen(false);
    }
  };

  if (error) return <ErrorState description={error} onRetry={() => fetchTickets({ status: tab === 'all' ? undefined : tab })} />;

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Support Tickets"
        description="Track and manage your support requests"
        action={
          <Button size="sm" startIcon={<FiPlus size={14} />} onClick={() => setModalOpen(true)}>
            New Ticket
          </Button>
        }
      />

      <Tabs tabs={TABS} value={tab} onChange={setTab} />

      {loading && !tickets.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState title="No tickets here" compact />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} onClick={() => navigate(`/help/tickets/${ticket.id}`)} />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Support Ticket"
        footer={
          <>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} loading={loading}>
              Submit
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Subject" required error={errors.subject} {...register('subject', { required: 'Subject is required' })} />
          <Select label="Priority" options={PRIORITY_OPTIONS} {...register('priority')} />
          <TextArea label="Describe the issue" rows={4} required error={errors.description} {...register('description', { required: 'Description is required' })} />
        </form>
      </Modal>
    </div>
  );
};

export default SupportTickets;
