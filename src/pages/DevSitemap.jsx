import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.constants';

// Dynamic route params get a placeholder value so every link is
// actually clickable instead of landing on a broken /:id URL.
const withPlaceholders = (path) =>
  path
    .replace(':id', '1')
    .replace(':code', 'CS101');

const SECTIONS = [
  {
    title: 'Public / Auth',
    badge: 'Public',
    badgeColor: 'bg-slate-100 text-slate-600',
    routes: {
      Login: ROUTES.LOGIN,
      Register: ROUTES.REGISTER,
      'Forgot Password': ROUTES.FORGOT_PASSWORD,
      'Reset Password': ROUTES.RESET_PASSWORD,
      'Change Password': ROUTES.CHANGE_PASSWORD,
    },
  },
  {
    title: 'Student',
    badge: 'Student login required',
    badgeColor: 'bg-blue-100 text-blue-700',
    routes: ROUTES.STUDENT,
  },
  {
    title: 'Faculty',
    badge: 'Faculty login required',
    badgeColor: 'bg-purple-100 text-purple-700',
    routes: ROUTES.FACULTY,
  },
  {
    title: 'Admin',
    badge: 'Admin login required',
    badgeColor: 'bg-amber-100 text-amber-700',
    routes: ROUTES.ADMIN,
  },
  {
    title: 'Advanced Attendance (QR / Face / Live)',
    badge: 'Any logged-in role',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    routes: ROUTES.ATTENDANCE,
  },
  {
    title: 'Reports & Analytics Center',
    badge: 'Any logged-in role',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    routes: ROUTES.ANALYTICS,
  },
  {
    title: 'Enterprise System Management',
    badge: 'Admin login required',
    badgeColor: 'bg-amber-100 text-amber-700',
    routes: ROUTES.SYSTEM,
  },
  {
    title: 'Help Center',
    badge: 'Any logged-in role',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    routes: ROUTES.HELP,
  },
  {
    title: 'Error Pages',
    badge: 'Public',
    badgeColor: 'bg-slate-100 text-slate-600',
    routes: { 'Not Found (404)': ROUTES.NOT_FOUND, Unauthorized: ROUTES.UNAUTHORIZED },
  },
];

const humanize = (key) =>
  key
    .split('_')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');

/**
 * Dev-only QA utility: every route in the app in one scrollable page,
 * grouped by section, so you can click through and verify each page
 * renders instead of hunting down URLs by hand. Not linked from any
 * nav menu — reach it directly at /dev/sitemap.
 *
 * Role-guarded links will redirect you to /login (if logged out) or
 * /unauthorized (if logged in as the wrong role) — that's the route
 * guards working correctly, not a bug in this page.
 */
const DevSitemap = () => {
  const totalRoutes = SECTIONS.reduce(
    (sum, s) => sum + (typeof s.routes === 'object' ? Object.keys(s.routes).length : 0),
    0
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dev Sitemap</h1>
        <p className="mt-1 text-sm text-slate-500">
          Every route in the app ({totalRoutes} total) — click any link to jump straight there.
          Dynamic <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">:id</code>/
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">:code</code> params are
          filled with a placeholder so links are always clickable.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {SECTIONS.map((section) => (
          <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-800">{section.title}</h2>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${section.badgeColor}`}>
                {section.badge}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {Object.entries(section.routes)
                .filter(([key]) => key !== 'ROOT')
                .map(([key, path]) => (
                  <Link
                    key={path}
                    to={withPlaceholders(path)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:border-primary hover:bg-primary-50/40 hover:text-primary"
                  >
                    {humanize(key)}
                    <span className="mt-0.5 block truncate text-xs text-slate-400">{path}</span>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevSitemap;
