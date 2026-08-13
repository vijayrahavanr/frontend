import { cn } from '@/utils/helpers';

/**
 * Small footer strip shown beneath an AuthCard: copyright, version
 * tag, and a support link placeholder (wired up once the backend/
 * support flow exists).
 */
const AuthFooter = ({ className }) => (
  <p
    className={cn(
      'mt-6 text-center text-xs text-slate-400 dark:text-slate-500',
      className
    )}
  >
    © {new Date().getFullYear()} Smart Attendance & Performance Analytics
    <span className="mx-1.5">·</span>
    v1.0.0
    <span className="mx-1.5">·</span>
    <a href="#" className="text-primary hover:underline">
      Contact support
    </a>
  </p>
);

export default AuthFooter;
