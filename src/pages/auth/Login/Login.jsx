import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import { login, selectAuthLoading, selectAuthError, clearError } from '@/redux/slices/authSlice';
import { ROLES } from '@/constants/roles.constants';
import { ROUTES } from '@/constants/routes.constants';
import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthFooter from '@/components/auth/AuthFooter';
import AuthLogo from '@/components/auth/AuthLogo';
import Alert from '@/components/common/Alert';
import LoginIllustration from './LoginIllustration';
import LoginForm from './LoginForm';

const DASHBOARD_BY_ROLE = {
  [ROLES.ADMIN]: ROUTES.ADMIN.DASHBOARD,
  [ROLES.FACULTY]: ROUTES.FACULTY.DASHBOARD,
  [ROLES.STUDENT]: ROUTES.STUDENT.DASHBOARD,
};

/**
 * Login screen. Dispatches the real `login` thunk (Redux/Axios/JWT —
 * built in Prompt 3A/3B) and redirects to the role-appropriate
 * dashboard on success, or back to wherever the user was headed
 * before ProtectedRoute redirected them here.
 */
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleSubmit = async (values) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      const role = result.payload.user?.role;
      const redirectTo = location.state?.from?.pathname || DASHBOARD_BY_ROLE[role] || ROUTES.ROOT;
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <AuthLayout illustration={<LoginIllustration />}>
      <AuthCard>
        <div className="mb-6 flex justify-center lg:hidden">
          <AuthLogo />
        </div>
        <AuthHeader title="Welcome back" subtitle="Sign in to continue to your dashboard" />

        {error && (
          <Alert type="error" className="mb-4" onDismiss={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <LoginForm onSubmit={handleSubmit} loading={loading} />
      </AuthCard>
      <AuthFooter />
    </AuthLayout>
  );
};

export default Login;
