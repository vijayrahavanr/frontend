import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

const LEVELS = [
  { label: 'Too weak', color: 'bg-danger' },
  { label: 'Weak', color: 'bg-danger' },
  { label: 'Fair', color: 'bg-warning' },
  { label: 'Good', color: 'bg-success' },
  { label: 'Strong', color: 'bg-success' },
];

/**
 * Computes a simple heuristic password strength score (0-4) and
 * renders it as a segmented bar with a label. Purely presentational —
 * real strength validation belongs in the Yup schema once wired up.
 * @param {string} password
 */
const scorePassword = (password = '') => {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 4);
};

/**
 * Password strength meter — four segments that fill and recolor as
 * the password gets stronger.
 *
 * @param {object} props
 * @param {string} props.password
 */
const PasswordStrength = ({ password = '', className }) => {
  const score = useMemo(() => scorePassword(password), [password]);
  const level = LEVELS[score];

  if (!password) return null;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: i < score ? '100%' : '0%' }}
              transition={{ duration: 0.25 }}
              className={cn('h-full rounded-full', level.color)}
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Password strength: <span className="font-medium">{level.label}</span>
      </p>
    </div>
  );
};

export default PasswordStrength;
