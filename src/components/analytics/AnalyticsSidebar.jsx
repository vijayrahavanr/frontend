import {
  FiGrid,
  FiCheckSquare,
  FiUser,
  FiUserCheck,
  FiLayers,
  FiBookOpen,
  FiBook,
  FiTrendingUp,
  FiFileText,
  FiDownload,
} from 'react-icons/fi';
import Sidebar from '@/components/sidebar/Sidebar';

const ANALYTICS_NAV_ITEMS = [
  { label: 'Overview', to: '/analytics/dashboard', icon: <FiGrid /> },
  { label: 'Attendance Analytics', to: '/analytics/attendance', icon: <FiCheckSquare /> },
  { label: 'Student Performance', to: '/analytics/students', icon: <FiUser /> },
  { label: 'Faculty Performance', to: '/analytics/faculty', icon: <FiUserCheck /> },
  { label: 'Department Analytics', to: '/analytics/departments', icon: <FiLayers /> },
  { label: 'Course Analytics', to: '/analytics/courses', icon: <FiBookOpen /> },
  { label: 'Subject Analytics', to: '/analytics/subjects', icon: <FiBook /> },
  { label: 'Trend Analysis', to: '/analytics/trends', icon: <FiTrendingUp /> },
  { label: 'Custom Reports', to: '/analytics/custom', icon: <FiFileText /> },
  { label: 'Export Center', to: '/analytics/export', icon: <FiDownload /> },
];

/**
 * Navigation config for the Enterprise Reports & Analytics Center,
 * rendered through the shared layout Sidebar. Kept as its own file so
 * this section's nav tree lives in one obvious place, separate from
 * each role's own Sidebar (StudentSidebar/FacultySidebar/AdminSidebar).
 */
const AnalyticsSidebar = (props) => <Sidebar items={ANALYTICS_NAV_ITEMS} {...props} />;

export default AnalyticsSidebar;
