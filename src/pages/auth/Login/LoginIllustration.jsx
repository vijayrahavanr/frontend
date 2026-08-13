import { motion } from 'framer-motion';
import { FiCheckCircle, FiTrendingUp, FiUsers } from 'react-icons/fi';
import AuthBackground from '@/components/auth/AuthBackground';
import AuthLogo from '@/components/auth/AuthLogo';

const HIGHLIGHTS = [
  { icon: FiCheckCircle, text: 'Automated attendance in seconds' },
  { icon: FiTrendingUp, text: 'Real-time performance analytics' },
  { icon: FiUsers, text: 'Built for students, faculty & admins' },
];

/**
 * Illustration/brand panel shown on the left side of the Login page
 * (desktop only — AuthLayout hides it below the lg breakpoint).
 */
const LoginIllustration = () => (
  <div className="relative flex h-full w-full flex-col justify-between p-12 text-white">
    <AuthBackground />

    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10"
    >
      <AuthLogo variant="inverted" size="lg" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative z-10 max-w-md"
    >
      <h2 className="text-3xl font-semibold leading-tight">
        Attendance and performance, understood at a glance.
      </h2>
      <p className="mt-3 text-sm text-white/80">
        One platform for QR & face-recognition attendance, leave management, and
        AI-assisted performance insights — for every role on campus.
      </p>

      <ul className="mt-8 flex flex-col gap-3">
        {HIGHLIGHTS.map(({ icon: Icon, text }, i) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
            className="flex items-center gap-2.5 text-sm text-white/90"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Icon size={14} />
            </span>
            {text}
          </motion.li>
        ))}
      </ul>
    </motion.div>

    <p className="relative z-10 text-xs text-white/50">
      Trusted by academic institutions to run attendance, the smart way.
    </p>
  </div>
);

export default LoginIllustration;
