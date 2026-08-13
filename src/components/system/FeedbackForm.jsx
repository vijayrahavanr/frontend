import { useForm } from 'react-hook-form';
import Select from '@/components/common/Select';
import TextArea from '@/components/common/TextArea';
import Button from '@/components/common/Button';
import { FiSend } from 'react-icons/fi';

const CATEGORY_OPTIONS = [
  { label: 'General Feedback', value: 'general' },
  { label: 'Bug Report', value: 'bug' },
  { label: 'Feature Request', value: 'feature' },
  { label: 'Other', value: 'other' },
];

const RATING_OPTIONS = [
  { label: '⭐️⭐️⭐️⭐️⭐️ Excellent', value: '5' },
  { label: '⭐️⭐️⭐️⭐️ Good', value: '4' },
  { label: '⭐️⭐️⭐️ Average', value: '3' },
  { label: '⭐️⭐️ Poor', value: '2' },
  { label: '⭐️ Very Poor', value: '1' },
];

/**
 * Feedback submission form: category, rating, and message.
 *
 * @param {object} props
 * @param {(values: {category: string, rating: string, message: string}) => void} props.onSubmit
 * @param {boolean} [props.loading]
 */
const FeedbackForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { category: 'general', rating: '5', message: '' } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select label="Category" options={CATEGORY_OPTIONS} {...register('category')} />
        <Select label="Overall rating" options={RATING_OPTIONS} {...register('rating')} />
      </div>
      <TextArea
        label="Your feedback"
        rows={5}
        required
        placeholder="Tell us what's working well or what could be improved..."
        error={errors.message}
        {...register('message', { required: 'Please share some feedback before submitting' })}
      />
      <Button type="submit" startIcon={<FiSend size={15} />} loading={loading} className="self-end">
        Submit Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;
