import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/helpers';

/**
 * A single class session card (richer than TimetableCard) — subject,
 * time, room, section, and student count, with a status badge and
 * action slot (e.g. "Mark Attendance"). Used on the Dashboard for
 * today's classes.
 *
 * @param {object} props
 * @param {{subject: string, time: string, room: string, section: string, studentCount: number}} props.session
 * @param {'current'|'past'|'upcoming'} [props.state]
 */
const ClassCard = ({ session, state = 'upcoming', action, className }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      state === 'current' && 'ring-2 ring-primary',
      className
    )}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{session.subject}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Section {session.section}</p>
      </div>
      {state === 'current' && <Badge color="primary">Now</Badge>}
    </div>

    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
      <span className="flex items-center gap-1">
        <FiClock size={12} /> {session.time}
      </span>
      <span className="flex items-center gap-1">
        <FiMapPin size={12} /> {session.room}
      </span>
      <span className="flex items-center gap-1">
        <FiUsers size={12} /> {session.studentCount} students
      </span>
    </div>

    {action && <div className="pt-1">{action}</div>}
  </motion.div>
);

export default ClassCard;
