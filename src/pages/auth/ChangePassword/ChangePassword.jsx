import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import {
  changePassword,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from '@/redux/slices/authSlice';
import AuthCard from '@/components/auth/AuthCard';
import AuthHeader from '@/components/auth/AuthHeader';
import Alert from '@/components/common/Alert';
import ChangePasswordForm from './ChangePasswordForm';

/**
 * Change-password screen for authenticated users (lives inside the
 * app shell via ProtectedRoute + PageWrapper — see routes/AppRoutes).
 * Dispatches the real `changePassword` thunk.
 */
const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleSubmit = async (values) => {
    const result = await dispatch(
      changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
    );
    if (changePassword.fulfilled.match(result)) {
      toast.success('Password updated successfully.');
      navigate(-1);
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-10">
      <AuthCard>
        <AuthHeader title="Change password" subtitle="Update the password for your account" />

        {error && (
          <Alert type="error" className="mb-4" onDismiss={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <ChangePasswordForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} loading={loading} />
      </AuthCard>
    </div>
  );
};

export default ChangePassword;
