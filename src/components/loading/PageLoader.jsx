import { CircularProgress } from '@mui/material';

/**
 * Full-viewport loader shown while a lazy-loaded route chunk downloads.
 * Used as the fallback for <Suspense> in AppRoutes.
 */
const PageLoader = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-surface-light dark:bg-surface-dark">
      <CircularProgress color="primary" />
    </div>
  );
};

export default PageLoader;
