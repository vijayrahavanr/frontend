import { useForm, useWatch } from 'react-hook-form';
import PasswordInput from '@/components/common/PasswordInput';
import Button from '@/components/common/Button';
import PasswordStrength from '@/components/auth/PasswordStrength';

/**
 * Change-password form for authenticated users: current password,
 * new password + confirmation, live strength meter, Save/Cancel.
 * Submission is UI only for now.
 *
 * @param {object} props
 * @param {(values: {currentPassword: string, newPassword: string, confirmPassword: string}) => void} [props.onSubmit]
 * @param {() => void} [props.onCancel]
 * @param {boolean} [props.loading]
 */
const ChangePasswordForm = ({ onSubmit, onCancel, loading = false }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const newPassword = useWatch({ control, name: 'newPassword' });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit?.(values))} noValidate className="flex flex-col gap-4">
      <PasswordInput
        label="Current password"
        placeholder="Enter your current password"
        required
        error={errors.currentPassword}
        {...register('currentPassword', { required: 'Current password is required' })}
      />

      <div className="flex flex-col gap-1.5">
        <PasswordInput
          label="New password"
          placeholder="Enter a new password"
          required
          error={errors.newPassword}
          {...register('newPassword', {
            required: 'New password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
        />
        <PasswordStrength password={newPassword} />
      </div>

      <PasswordInput
        label="Confirm new password"
        placeholder="Re-enter your new password"
        required
        error={errors.confirmPassword}
        {...register('confirmPassword', {
          required: 'Please confirm your new password',
          validate: (value) => value === watch('newPassword') || 'Passwords do not match',
        })}
      />

      <div className="mt-2 flex items-center justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={loading}>
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
