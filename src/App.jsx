import { Toaster } from 'react-hot-toast';
import AppRoutes from '@/routes/AppRoutes';
import AuthSessionManager from '@/components/common/AuthSessionManager';
import ScrollToTop from '@/components/common/ScrollToTop';
import BackToTop from '@/components/common/BackToTop';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import OfflineBanner from '@/components/common/OfflineBanner';
import '@/styles/App.css';

/**
 * App root. AuthSessionManager wraps everything else: it blocks
 * rendering behind a full-page loader until the startup session
 * check resolves (auto login / session restore), then owns idle
 * timeout and forced-logout handling for the lifetime of the app.
 *
 * ErrorBoundary sits just inside that, around the routed app only —
 * a crash in a page component shows the recovery screen without
 * tearing down the session manager, toaster, or scroll handling
 * around it.
 */
const App = () => (
  <AuthSessionManager>
    <OfflineBanner />
    <ScrollToTop />
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
    <BackToTop />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: '0.75rem',
          fontSize: '0.875rem',
        },
      }}
    />
  </AuthSessionManager>
);

export default App;
