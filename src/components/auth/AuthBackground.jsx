import { motion } from 'framer-motion';

/**
 * Ambient animated background used behind the auth illustration panel:
 * slow-drifting soft gradient blobs plus a faint grid overlay. Purely
 * decorative — `aria-hidden` so it never reaches assistive tech.
 */
const AuthBackground = ({ className }) => (
  <div
    aria-hidden="true"
    className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-secondary-700 ${className || ''}`}
  >
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    <motion.div
      className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-secondary/40 blur-3xl"
      animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-[-6rem] right-[-4rem] h-[28rem] w-[28rem] rounded-full bg-primary-400/30 blur-3xl"
      animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

export default AuthBackground;
