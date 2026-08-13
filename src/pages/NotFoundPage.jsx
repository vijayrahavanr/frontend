import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.constants';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-light px-4 text-center dark:bg-surface-dark">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to={ROUTES.ROOT}
        className="rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-primary-700"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
