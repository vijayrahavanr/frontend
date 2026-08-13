import {
  FiHome,
  FiCheckSquare,
  FiCamera,
  FiUserCheck,
  FiCalendar,
  FiBookOpen,
  FiBarChart2,
  FiBell,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import Sidebar from '@/components/sidebar/Sidebar';

const STUDENT_NAV_ITEMS = [
  { label: 'Dashboard', to: '/student/dashboard', icon: <FiHome /> },
  {
    label: 'Attendance',
    icon: <FiCheckSquare />,
    items: [
      { label: 'Overview', to: '/student/attendance' },
      { label: 'History', to: '/student/attendance/history' },
    ],
  },
  { label: 'QR Attendance', to: '/student/qr-attendance', icon: <FiCamera /> },
  { label: 'Face Recognition', to: '/student/face-recognition', icon: <FiUserCheck /> },
  { label: 'Leave', to: '/student/leave', icon: <FiCalendar /> },
  { label: 'Timetable', to: '/student/timetable', icon: <FiCalendar /> },
  { label: 'Subjects', to: '/student/subjects', icon: <FiBookOpen /> },
  { label: 'Reports', to: '/student/reports', icon: <FiBarChart2 /> },
  { label: 'Notifications', to: '/student/notifications', icon: <FiBell /> },
  { label: 'Profile', to: '/student/profile', icon: <FiUser /> },
  { label: 'Settings', to: '/student/settings', icon: <FiSettings /> },
];

/**
 * Student-role navigation config, rendered through the shared
 * layout Sidebar. Kept as its own file so the nav tree for this role
 * lives in one obvious place, separate from Faculty/Admin's.
 */
const StudentSidebar = (props) => <Sidebar items={STUDENT_NAV_ITEMS} {...props} />;

export default StudentSidebar;
