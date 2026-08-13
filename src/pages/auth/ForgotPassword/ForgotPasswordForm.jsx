import { useForm } from 'react-hook-form';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes.constants';

/**
 * Forgot-password form: email input, a description of what happens
 * next, a submit button, and a link back to Login. Submission is UI
 * only — `onSubmit` is left for the auth module to wire up.
 *
 * @param {object} props
 * @param {(values: {email: string}) => void} [props.onSubmit]
 * @param {boolean} [props.loading]
 */
const ForgotPasswordForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '' } });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit?.(values))} noValidate className="flex flex-col gap-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Enter the email address associated with your account and we&apos;ll send you a link
        to reset your password.
      </p>

      <Input
        label="Email address"
        type="email"
        placeholder="you@institution.edu"
        prefixIcon={<FiMail size={16} />}
        required
        error={errors.email}
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
        })}
      />

      <Button type="submit" fullWidth loading={loading}>
        Send reset link
      </Button>

      <Link
        to={ROUTES.LOGIN}
        className="mt-1 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to login
      </Link>
    </form>
  );
};

export default ForgotPasswordForm;
