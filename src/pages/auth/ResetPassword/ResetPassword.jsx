import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import { resetPassword, selectAuthLoading, selectAuthError, clearError } from '@/redux/slices/authSlice';
import { ROUTES } from '@/constants/routes.constants';
import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthFooter from '@/components/auth/AuthFooter';
import AuthLogo from '@/components/auth/AuthLogo';
import Alert from '@/components/common/Alert';
import ResetPasswordForm from './ResetPasswordForm';

/**
 * Reset-password screen, reached via the emailed link from
 * ForgotPassword — expects a `?token=...` query param identifying
 * which reset request this is. Dispatches the real `resetPassword`
 * thunk, then redirects to Login with a success toast.
 */
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleSubmit = async (values) => {
    const result = await dispatch(resetPassword({ token, password: values.password }));
    if (resetPassword.fulfilled.match(result)) {
      toast.success('Password reset successfully. Please log in with your new password.');
      navigate(ROUTES.LOGIN, { replace: true });
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-6 flex justify-center">
          <AuthLogo />
        </div>
        <AuthHeader title="Reset your password" subtitle="Choose a new, strong password" />

        {!token && (
          <Alert type="warning" className="mb-4">
            This reset link is missing or invalid. Request a new one from the forgot-password page.
          </Alert>
        )}

        {error && (
          <Alert type="error" className="mb-4" onDismiss={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <ResetPasswordForm onSubmit={handleSubmit} loading={loading} />
      </AuthCard>
      <AuthFooter />
    </AuthLayout>
  );
};

export default ResetPassword;
