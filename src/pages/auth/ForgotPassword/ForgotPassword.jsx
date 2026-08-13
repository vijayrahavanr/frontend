import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import { forgotPassword, selectAuthLoading, selectAuthError, clearError } from '@/redux/slices/authSlice';
import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthFooter from '@/components/auth/AuthFooter';
import AuthLogo from '@/components/auth/AuthLogo';
import Alert from '@/components/common/Alert';
import ForgotPasswordForm from './ForgotPasswordForm';

/**
 * Forgot-password screen. Dispatches the real `forgotPassword` thunk
 * and swaps the form for a confirmation message once the request
 * succeeds (the API's response shouldn't reveal whether the email
 * actually exists, so the success state is deliberately generic).
 */
const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const [submittedEmail, setSubmittedEmail] = useState(null);

  const handleSubmit = async (values) => {
    const result = await dispatch(forgotPassword(values));
    if (forgotPassword.fulfilled.match(result)) {
      setSubmittedEmail(values.email);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-6 flex justify-center">
          <AuthLogo />
        </div>
        <AuthHeader title="Forgot password?" subtitle="No worries, we'll help you reset it" />

        {error && (
          <Alert type="error" className="mb-4" onDismiss={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        {submittedEmail ? (
          <Alert type="success" title="Check your inbox">
            If an account exists for {submittedEmail}, we&apos;ve sent a password reset link to it.
          </Alert>
        ) : (
          <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} />
        )}
      </AuthCard>
      <AuthFooter />
    </AuthLayout>
  );
};

export default ForgotPassword;
