import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const QUICK_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Support', href: '#' },
];

const SOCIAL_LINKS = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
];

const APP_VERSION = 'v1.0.0';

/**
 * App shell footer: copyright, version tag, quick links, and social
 * icon placeholders. Rendered once inside PageWrapper.
 */
const Footer = ({ className }) => (
  <footer
    className={cn(
      'mt-auto border-t border-slate-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-surface-dark sm:px-6 lg:px-8',
      className
    )}
  >
    <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 sm:flex-row">
      <p>
        © {new Date().getFullYear()} AI Smart Attendance & Performance Analytics.{' '}
        <span className="text-slate-400 dark:text-slate-500">{APP_VERSION}</span>
      </p>

      <nav aria-label="Footer links" className="flex items-center gap-4">
        {QUICK_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-primary">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} aria-label={label} className="hover:text-primary">
            <Icon size={15} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
