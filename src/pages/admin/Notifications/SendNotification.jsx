import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import { useNotifications } from '@/hooks/useNotifications';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import Select from '@/components/common/Select';
import MultiSelect from '@/components/common/MultiSelect';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';

const AUDIENCE_OPTIONS = [
  { label: 'All Students', value: 'students' },
  { label: 'All Faculty', value: 'faculty' },
  { label: 'Computer Science', value: 'CSE' },
  { label: 'Electronics', value: 'ECE' },
];

const PRIORITY_OPTIONS = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

/**
 * Compose-and-broadcast notification form — dispatches
 * notificationSlice's sendNotification thunk via useNotifications.
 */
const SendNotification = () => {
  const navigate = useNavigate();
  const { loading, send } = useNotifications();
  const [audience, setAudience] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { title: '', message: '', priority: 'medium' } });

  const onSubmit = async (values) => {
    const result = await send({ ...values, audience });
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Notification sent successfully.');
      navigate('/admin/notifications');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Send Notification" subtitle="Compose and broadcast a notification" />

      <Link
        to="/admin/notifications"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to notifications
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Notification Details" spacing="sm">
          <div className="flex flex-col gap-4">
            <Input label="Title" required error={errors.title} {...register('title', { required: 'Title is required' })} />
            <TextArea label="Message" rows={4} required error={errors.message} {...register('message', { required: 'Message is required' })} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select label="Priority" options={PRIORITY_OPTIONS} {...register('priority')} />
              <MultiSelect label="Audience" options={AUDIENCE_OPTIONS} value={audience} onChange={(e) => setAudience(e.target.value)} />
            </div>
          </div>
        </Section>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outlined" onClick={() => navigate('/admin/notifications')}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<FiSend size={15} />} loading={loading}>
            Send Notification
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendNotification;
