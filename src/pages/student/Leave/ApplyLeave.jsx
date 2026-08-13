import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiCalendar } from 'react-icons/fi';
import { useLeave } from '@/hooks/useLeave';
import StudentTopbar from '@/components/student/StudentTopbar';
import Select from '@/components/common/Select';
import DatePicker from '@/components/common/DatePicker';
import TextArea from '@/components/common/TextArea';
import FileUpload from '@/components/common/FileUpload';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import Skeleton from '@/components/common/Skeleton';

const LEAVE_TYPES = [
  { label: 'Sick Leave', value: 'sick' },
  { label: 'Casual Leave', value: 'casual' },
  { label: 'Emergency Leave', value: 'emergency' },
  { label: 'Other', value: 'other' },
];

/**
 * Leave application form + a leave-balance summary, both backed by
 * leaveSlice via useLeave.
 */
const ApplyLeave = () => {
  const navigate = useNavigate();
  const { balance, loading, fetchBalance, submitLeave } = useLeave();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { type: '', startDate: '', endDate: '', reason: '' } });

  useEffect(() => {
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    const result = await submitLeave(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Leave application submitted successfully.');
      navigate('/student/leave/history');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="Apply for Leave" subtitle="Submit a new leave request" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark lg:col-span-2"
        >
          <Select
            label="Leave type"
            options={LEAVE_TYPES}
            required
            error={errors.type}
            {...register('type', { required: 'Select a leave type' })}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DatePicker
              label="Start date"
              required
              error={errors.startDate}
              {...register('startDate', { required: 'Start date is required' })}
            />
            <DatePicker
              label="End date"
              required
              error={errors.endDate}
              {...register('endDate', { required: 'End date is required' })}
            />
          </div>

          <TextArea
            label="Reason"
            rows={4}
            required
            placeholder="Briefly explain the reason for your leave request"
            error={errors.reason}
            {...register('reason', { required: 'A reason is required' })}
          />

          <FileUpload label="Supporting document (optional)" accept=".pdf,.jpg,.png" />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" startIcon={<FiCalendar size={15} />} loading={loading}>
              Submit request
            </Button>
          </div>
        </form>

        <Section title="Leave Balance" spacing="sm">
          <div className="flex flex-col gap-3">
            {loading && !balance.length ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
            ) : (
              balance.map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{b.label}</span>
                    <span className="text-slate-500 dark:text-slate-400">{b.total - b.used} left</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(b.used / b.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ApplyLeave;
