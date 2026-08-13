import { useState } from 'react';
import toast from 'react-hot-toast';
import { useHelp } from '@/hooks/useHelp';
import Header from '@/components/common/Header';
import FeedbackForm from '@/components/system/FeedbackForm';
import Alert from '@/components/common/Alert';

/**
 * Feedback submission page — backed by helpSlice's submitFeedback via
 * useHelp.
 */
const Feedback = () => {
  const { loading, sendFeedback } = useHelp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values) => {
    const result = await sendFeedback(values);
    if (result.meta.requestStatus === 'fulfilled') {
      setSubmitted(true);
      toast.success('Feedback submitted successfully.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Header title="Share Feedback" description="Help us improve the platform" />

      {submitted && (
        <Alert type="success" title="Thank you!" onDismiss={() => setSubmitted(false)}>
          Your feedback has been submitted and will help us improve.
        </Alert>
      )}

      <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark-elevated">
        <FeedbackForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default Feedback;
