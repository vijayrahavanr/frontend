import { motion } from 'framer-motion';
import { FiLayers, FiUsers, FiUserCheck } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Department summary tile: name, code, head of department, and
 * student/faculty counts.
 *
 * @param {object} props
 * @param {{id: string|number, name: string, code: string, headOfDepartment?: string, studentCount: number, facultyCount: number}} props.department
 * @param {React.ReactNode} [props.action]
 */
const DepartmentCard = ({ department, action, className }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className={cn(
      'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-lg',
      'dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark',
      className
    )}
  >
    <div className="flex items-start justify-between">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-900/20">
        <FiLayers size={18} />
      </span>
      {action}
    </div>

    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{department.code}</p>
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{department.name}</h3>
      {department.headOfDepartment && (
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Head: {department.headOfDepartment}
        </p>
      )}
    </div>

    <div className="flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
      <span className="flex items-center gap-1.5">
        <FiUsers size={13} />
        {department.studentCount} students
      </span>
      <span className="flex items-center gap-1.5">
        <FiUserCheck size={13} />
        {department.facultyCount} faculty
      </span>
    </div>
  </motion.div>
);

export default DepartmentCard;
