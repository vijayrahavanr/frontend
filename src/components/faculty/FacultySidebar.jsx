import {
  FiHome,
  FiCheckSquare,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiBarChart2,
  FiBell,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import Sidebar from '@/components/sidebar/Sidebar';

const FACULTY_NAV_ITEMS = [
  { label: 'Dashboard', to: '/faculty/dashboard', icon: <FiHome /> },
  {
    label: 'Attendance',
    icon: <FiCheckSquare />,
    items: [
      { label: 'Mark Attendance', to: '/faculty/attendance/mark' },
      { label: 'History', to: '/faculty/attendance/history' },
    ],
  },
  { label: 'Students', to: '/faculty/students', icon: <FiUsers /> },
  { label: 'Subjects', to: '/faculty/subjects', icon: <FiBookOpen /> },
  { label: 'Leave Approval', to: '/faculty/leave-approval', icon: <FiCalendar /> },
  { label: 'Timetable', to: '/faculty/timetable', icon: <FiCalendar /> },
  { label: 'Reports', to: '/faculty/reports', icon: <FiBarChart2 /> },
  { label: 'Notifications', to: '/faculty/notifications', icon: <FiBell /> },
  { label: 'Profile', to: '/faculty/profile', icon: <FiUser /> },
  { label: 'Settings', to: '/faculty/settings', icon: <FiSettings /> },
];

/**
 * Faculty-role navigation config, rendered through the shared layout
 * Sidebar. Kept as its own file so this role's nav tree lives in one
 * obvious place, separate from Student/Admin's.
 */
const FacultySidebar = (props) => <Sidebar items={FACULTY_NAV_ITEMS} {...props} />;

export default FacultySidebar;
