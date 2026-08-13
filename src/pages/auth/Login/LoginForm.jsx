import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import Input from '@/components/common/Input';
import PasswordInput from '@/components/common/PasswordInput';
import Button from '@/components/common/Button';
import Divider from '@/components/common/Divider';
import RememberMe from '@/components/auth/RememberMe';

/**
 * Login form. Wired up with React Hook Form for field state and
 * client-side validation UI only — no auth service call yet. Pass
 * `onSubmit` to hook in real submission logic once the auth module
 * (Redux/Axios) is built.
 *
 * @param {object} props
 * @param {(values: {email: string, password: string, rememberMe: boolean}) => void} [props.onSubmit]
 * @param {boolean} [props.loading]
 */
const LoginForm = ({ onSubmit, loading = false }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const submitHandler = (values) => {
    onSubmit?.({ ...values, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate className="flex flex-col gap-4">
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

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        required
        error={errors.password}
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' },
        })}
      />

      <div className="flex items-center justify-between">
        <RememberMe checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        <a href="#" className="text-sm font-medium text-primary hover:underline">
          Forgot password?
        </a>
      </div>

      <Button type="submit" fullWidth loading={loading}>
        Sign in
      </Button>

      <Divider label="or" />

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Don&apos;t have access yet?{' '}
        <a href="#" className="font-medium text-primary hover:underline">
          Contact your administrator
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
