import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import PasswordInput from '@/components/common/PasswordInput';
import Button from '@/components/common/Button';
import PasswordStrength from '@/components/auth/PasswordStrength';
import { ROUTES } from '@/constants/routes.constants';

/**
 * Reset-password form: new password + confirmation, live strength
 * meter, and a submit button. Submission is UI only for now.
 *
 * @param {object} props
 * @param {(values: {password: string, confirmPassword: string}) => void} [props.onSubmit]
 * @param {boolean} [props.loading]
 */
const ResetPasswordForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { password: '', confirmPassword: '' } });

  const password = useWatch({ control, name: 'password' });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit?.(values))} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <PasswordInput
          label="New password"
          placeholder="Enter a new password"
          required
          error={errors.password}
          {...register('password', {
            required: 'New password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
        />
        <PasswordStrength password={password} />
      </div>

      <PasswordInput
        label="Confirm password"
        placeholder="Re-enter your new password"
        required
        error={errors.confirmPassword}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === watch('password') || 'Passwords do not match',
        })}
      />

      <Button type="submit" fullWidth loading={loading}>
        Reset password
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

export default ResetPasswordForm;
