import Header from '@/components/common/Header';
import VersionCard from '@/components/system/VersionCard';
import Section from '@/components/common/Section';
import Badge from '@/components/common/Badge';

const VERSION_INFO = {
  version: '1.0.0',
  buildNumber: '2026.07.16-1',
  environment: 'production',
  releaseDate: new Date(),
};

const CHANGELOG = [
  { version: '1.0.0', date: '16 Jul 2026', type: 'major', notes: ['Initial production release', 'Full attendance, reports, and system management modules'] },
  { version: '0.9.0', date: '01 Jul 2026', type: 'minor', notes: ['Added Enterprise Reports & Analytics Center', 'Advanced attendance module (QR, face recognition)'] },
  { version: '0.5.0', date: '01 Jun 2026', type: 'minor', notes: ['Student, Faculty, and Admin modules completed'] },
];

const TYPE_COLOR = { major: 'primary', minor: 'secondary', patch: 'neutral' };

/**
 * Detailed version/build information and changelog.
 */
const VersionInfo = () => (
  <div className="flex flex-col gap-6">
    <Header title="Version Information" description="Current build details and release history" />

    <VersionCard info={VERSION_INFO} />

    <Section title="Changelog" spacing="sm">
      <div className="flex flex-col gap-3">
        {CHANGELOG.map((entry) => (
          <div key={entry.version} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-surface-dark-elevated">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">v{entry.version}</p>
              <Badge color={TYPE_COLOR[entry.type]}>{entry.type}</Badge>
              <span className="text-xs text-slate-400">{entry.date}</span>
            </div>
            <ul className="mt-2 flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
              {entry.notes.map((note) => (
                <li key={note} className="flex gap-1.5">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  </div>
);

export default VersionInfo;
