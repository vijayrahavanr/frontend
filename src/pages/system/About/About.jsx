import { FiCpu } from 'react-icons/fi';
import Header from '@/components/common/Header';
import VersionCard from '@/components/system/VersionCard';

const VERSION_INFO = {
  version: '1.0.0',
  buildNumber: '2026.07.16-1',
  environment: 'production',
  releaseDate: new Date(),
};

/**
 * About page: platform description, team/credits, and version info.
 */
const About = () => (
  <div className="flex flex-col gap-6">
    <Header title="About" description="Information about this platform" />

    <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-surface-dark-elevated">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
        <FiCpu size={28} />
      </span>
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          AI Smart Attendance & Performance Analytics
        </h2>
        <p className="mt-2 max-w-lg text-sm text-slate-500 dark:text-slate-400">
          A unified platform for QR and face-recognition attendance, leave management, and
          AI-assisted performance insights — built for students, faculty, and administrators.
        </p>
      </div>
    </div>

    <VersionCard info={VERSION_INFO} />

    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
      <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">Legal</p>
      <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
        <a href="#" className="hover:text-primary">Terms of Service</a>
        <a href="#" className="hover:text-primary">Privacy Policy</a>
        <a href="#" className="hover:text-primary">Licenses</a>
      </div>
    </div>
  </div>
);

export default About;
