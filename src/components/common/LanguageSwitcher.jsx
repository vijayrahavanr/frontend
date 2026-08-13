import { useState } from 'react';
import { FiGlobe, FiCheck } from 'react-icons/fi';
import Dropdown from './Dropdown';
import { cn } from '@/utils/helpers';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'es', label: 'Español' },
];

/**
 * Language selector — UI only for now (no i18n library wired up).
 * Swap the local `useState` for a real i18n context/store once
 * localization is implemented.
 */
const LanguageSwitcher = ({ className }) => {
  const [selected, setSelected] = useState(LANGUAGES[0].code);
  const current = LANGUAGES.find((l) => l.code === selected);

  return (
    <Dropdown
      trigger={(open) => (
        <button
          type="button"
          onClick={open}
          aria-label="Change language"
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
            className
          )}
        >
          <FiGlobe size={16} />
          <span className="hidden sm:inline">{current?.label}</span>
        </button>
      )}
      items={LANGUAGES.map((lang) => ({
        label: lang.label,
        icon: selected === lang.code ? <FiCheck size={14} /> : null,
        onClick: () => setSelected(lang.code),
      }))}
    />
  );
};

export default LanguageSwitcher;
