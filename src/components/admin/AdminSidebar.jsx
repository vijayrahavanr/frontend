import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiLayers,
  FiBookOpen,
  FiBook,
  FiCheckSquare,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import Sidebar from '@/components/sidebar/Sidebar';

const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: <FiHome /> },
  { label: 'Students', to: '/admin/students', icon: <FiUsers /> },
  { label: 'Faculty', to: '/admin/faculty', icon: <FiUserCheck /> },
  { label: 'Departments', to: '/admin/departments', icon: <FiLayers /> },
  { label: 'Courses', to: '/admin/courses', icon: <FiBookOpen /> },
  { label: 'Subjects', to: '/admin/subjects', icon: <FiBook /> },
  {
    label: 'Attendance',
    icon: <FiCheckSquare />,
    items: [
      { label: 'Overview', to: '/admin/attendance' },
      { label: 'Analytics', to: '/admin/attendance/analytics' },
    ],
  },
  { label: 'Timetable', to: '/admin/timetable', icon: <FiCalendar /> },
  { label: 'Reports', to: '/admin/reports', icon: <FiBarChart2 /> },
  { label: 'Notifications', to: '/admin/notifications', icon: <FiBell /> },
  { label: 'Profile', to: '/admin/profile', icon: <FiUser /> },
  { label: 'Settings', to: '/admin/settings', icon: <FiSettings /> },
];

/**
 * Admin-role navigation config, rendered through the shared layout
 * Sidebar. Kept as its own file so this role's nav tree lives in one
 * obvious place, separate from Student/Faculty's.
 */
const AdminSidebar = (props) => <Sidebar items={ADMIN_NAV_ITEMS} {...props} />;

export default AdminSidebar;
