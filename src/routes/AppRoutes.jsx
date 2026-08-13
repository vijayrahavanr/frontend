import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageLoader from '@/components/loading/PageLoader';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import FacultyRoute from './FacultyRoute';
import StudentRoute from './StudentRoute';
import { ROUTES } from '@/constants/routes.constants';

// Route-based code splitting: every page is its own chunk.
const Login = lazy(() => import('@/pages/auth/Login/Login'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword/ResetPassword'));
const ChangePassword = lazy(() => import('@/pages/auth/ChangePassword/ChangePassword'));

const PageWrapper = lazy(() => import('@/layouts/DashboardLayout'));

// Student module pages
const Dashboard = lazy(() => import('@/pages/student/Dashboard/Dashboard'));
const Attendance = lazy(() => import('@/pages/student/Attendance/Attendance'));
const AttendanceHistory = lazy(() => import('@/pages/student/Attendance/AttendanceHistory'));
const AttendanceDetails = lazy(() => import('@/pages/student/Attendance/AttendanceDetails'));
const Profile = lazy(() => import('@/pages/student/Profile/Profile'));
const EditProfile = lazy(() => import('@/pages/student/Profile/EditProfile'));
const ScanQR = lazy(() => import('@/pages/student/QRAttendance/ScanQR'));
const QRHistory = lazy(() => import('@/pages/student/QRAttendance/QRHistory'));
const FaceVerification = lazy(() => import('@/pages/student/FaceRecognition/FaceVerification'));
const FaceHistory = lazy(() => import('@/pages/student/FaceRecognition/FaceHistory'));
const ApplyLeave = lazy(() => import('@/pages/student/Leave/ApplyLeave'));
const LeaveHistory = lazy(() => import('@/pages/student/Leave/LeaveHistory'));
const Timetable = lazy(() => import('@/pages/student/Timetable/Timetable'));
const Subjects = lazy(() => import('@/pages/student/Subjects/Subjects'));
const Reports = lazy(() => import('@/pages/student/Reports/Reports'));
const Notifications = lazy(() => import('@/pages/student/Notifications/Notifications'));
const Settings = lazy(() => import('@/pages/student/Settings/Settings'));

const FacultyDashboardPage = lazy(() => import('@/pages/faculty/Dashboard/Dashboard'));
const MarkAttendance = lazy(() => import('@/pages/faculty/Attendance/MarkAttendance'));
const FacultyAttendanceHistory = lazy(() => import('@/pages/faculty/Attendance/AttendanceHistory'));
const FacultyAttendanceDetails = lazy(() => import('@/pages/faculty/Attendance/AttendanceDetails'));
const Students = lazy(() => import('@/pages/faculty/Students/Students'));
const StudentDetails = lazy(() => import('@/pages/faculty/Students/StudentDetails'));
const FacultySubjects = lazy(() => import('@/pages/faculty/Subjects/Subjects'));
const FacultySubjectDetails = lazy(() => import('@/pages/faculty/Subjects/SubjectDetails'));
const LeaveApproval = lazy(() => import('@/pages/faculty/LeaveApproval/LeaveApproval'));
const LeaveDetails = lazy(() => import('@/pages/faculty/LeaveApproval/LeaveDetails'));
const FacultyTimetable = lazy(() => import('@/pages/faculty/Timetable/Timetable'));
const FacultyReports = lazy(() => import('@/pages/faculty/Reports/Reports'));
const FacultyNotifications = lazy(() => import('@/pages/faculty/Notifications/Notifications'));
const FacultyProfile = lazy(() => import('@/pages/faculty/Profile/Profile'));
const FacultyEditProfile = lazy(() => import('@/pages/faculty/Profile/EditProfile'));
const FacultySettings = lazy(() => import('@/pages/faculty/Settings/Settings'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/Dashboard/Dashboard'));
const AdminStudents = lazy(() => import('@/pages/admin/Students/Students'));
const AddStudent = lazy(() => import('@/pages/admin/Students/AddStudent'));
const EditStudent = lazy(() => import('@/pages/admin/Students/EditStudent'));
const AdminStudentDetails = lazy(() => import('@/pages/admin/Students/StudentDetails'));
const AdminFaculty = lazy(() => import('@/pages/admin/Faculty/Faculty'));
const AddFaculty = lazy(() => import('@/pages/admin/Faculty/AddFaculty'));
const EditFaculty = lazy(() => import('@/pages/admin/Faculty/EditFaculty'));
const AdminFacultyDetails = lazy(() => import('@/pages/admin/Faculty/FacultyDetails'));
const Departments = lazy(() => import('@/pages/admin/Departments/Departments'));
const AddDepartment = lazy(() => import('@/pages/admin/Departments/AddDepartment'));
const EditDepartment = lazy(() => import('@/pages/admin/Departments/EditDepartment'));
const Courses = lazy(() => import('@/pages/admin/Courses/Courses'));
const AddCourse = lazy(() => import('@/pages/admin/Courses/AddCourse'));
const EditCourse = lazy(() => import('@/pages/admin/Courses/EditCourse'));
const AdminSubjects = lazy(() => import('@/pages/admin/Subjects/Subjects'));
const AddSubject = lazy(() => import('@/pages/admin/Subjects/AddSubject'));
const EditSubject = lazy(() => import('@/pages/admin/Subjects/EditSubject'));
const AdminAttendance = lazy(() => import('@/pages/admin/Attendance/Attendance'));
const AttendanceAnalytics = lazy(() => import('@/pages/admin/Attendance/AttendanceAnalytics'));
const AdminTimetable = lazy(() => import('@/pages/admin/Timetable/Timetable'));
const CreateTimetable = lazy(() => import('@/pages/admin/Timetable/CreateTimetable'));
const EditTimetable = lazy(() => import('@/pages/admin/Timetable/EditTimetable'));
const AdminReports = lazy(() => import('@/pages/admin/Reports/Reports'));
const AdminNotifications = lazy(() => import('@/pages/admin/Notifications/Notifications'));
const SendNotification = lazy(() => import('@/pages/admin/Notifications/SendNotification'));
const AdminProfile = lazy(() => import('@/pages/admin/Profile/Profile'));
const AdminEditProfile = lazy(() => import('@/pages/admin/Profile/EditProfile'));
const AdminSettings = lazy(() => import('@/pages/admin/Settings/Settings'));

// Advanced Attendance module (cross-role: QR, Face Recognition, Live, Analytics)
const GenerateQR = lazy(() => import('@/pages/attendance/QRAttendance/GenerateQR'));
const AdvancedScanQR = lazy(() => import('@/pages/attendance/QRAttendance/ScanQR'));
const AdvancedQRHistory = lazy(() => import('@/pages/attendance/QRAttendance/QRHistory'));
const QRAnalytics = lazy(() => import('@/pages/attendance/QRAttendance/QRAnalytics'));
const RegisterFace = lazy(() => import('@/pages/attendance/FaceRecognition/RegisterFace'));
const VerifyFace = lazy(() => import('@/pages/attendance/FaceRecognition/VerifyFace'));
const RecognitionHistory = lazy(() => import('@/pages/attendance/FaceRecognition/RecognitionHistory'));
const RecognitionAnalytics = lazy(() => import('@/pages/attendance/FaceRecognition/RecognitionAnalytics'));
const LiveAttendance = lazy(() => import('@/pages/attendance/LiveAttendance/LiveAttendance'));
const AttendanceMonitor = lazy(() => import('@/pages/attendance/LiveAttendance/AttendanceMonitor'));
const AttendanceMap = lazy(() => import('@/pages/attendance/LiveAttendance/AttendanceMap'));
const AttendanceLogs = lazy(() => import('@/pages/attendance/LiveAttendance/AttendanceLogs'));
const AttendanceDashboard = lazy(() => import('@/pages/attendance/AttendanceAnalytics/AttendanceDashboard'));
const SubjectAnalyticsPage = lazy(() => import('@/pages/attendance/AttendanceAnalytics/SubjectAnalytics'));
const DepartmentAnalyticsPage = lazy(() => import('@/pages/attendance/AttendanceAnalytics/DepartmentAnalytics'));
const StudentAnalyticsPage = lazy(() => import('@/pages/attendance/AttendanceAnalytics/StudentAnalytics'));
const FacultyAnalyticsPage = lazy(() => import('@/pages/attendance/AttendanceAnalytics/FacultyAnalytics'));

// Enterprise Reports & Analytics Center (cross-role shared analytics)
const AnalyticsDashboard = lazy(() => import('@/pages/analytics/Dashboard/AnalyticsDashboard'));
const CenterAttendanceAnalytics = lazy(() => import('@/pages/analytics/AttendanceAnalytics/AttendanceAnalytics'));
const StudentPerformance = lazy(() => import('@/pages/analytics/StudentPerformance/StudentPerformance'));
const FacultyPerformance = lazy(() => import('@/pages/analytics/FacultyPerformance/FacultyPerformance'));
const CenterDepartmentAnalytics = lazy(() => import('@/pages/analytics/DepartmentAnalytics/DepartmentAnalytics'));
const CourseAnalytics = lazy(() => import('@/pages/analytics/CourseAnalytics/CourseAnalytics'));
const CenterSubjectAnalytics = lazy(() => import('@/pages/analytics/SubjectAnalytics/SubjectAnalytics'));
const TrendAnalysis = lazy(() => import('@/pages/analytics/TrendAnalysis/TrendAnalysis'));
const CustomReports = lazy(() => import('@/pages/analytics/CustomReports/CustomReports'));
const ExportCenter = lazy(() => import('@/pages/analytics/ExportCenter/ExportCenter'));

// --- Enterprise System Management ---
const SystemDashboard = lazy(() => import('@/pages/system/Dashboard/SystemDashboard'));
const SystemHealth = lazy(() => import('@/pages/system/Health/SystemHealth'));
const ApplicationHealth = lazy(() => import('@/pages/system/Health/ApplicationHealth'));
const AuditLogs = lazy(() => import('@/pages/system/Logs/AuditLogs'));
const ActivityLogs = lazy(() => import('@/pages/system/Logs/ActivityLogs'));
const RoleManagement = lazy(() => import('@/pages/system/Roles/RoleManagement'));
const AddRole = lazy(() => import('@/pages/system/Roles/AddRole'));
const EditRole = lazy(() => import('@/pages/system/Roles/EditRole'));
const PermissionManagement = lazy(() => import('@/pages/system/Permissions/PermissionManagement'));
const RolePermissionMatrix = lazy(() => import('@/pages/system/Permissions/RolePermissionMatrix'));
const SystemBackup = lazy(() => import('@/pages/system/Backup/Backup'));
const SystemRestore = lazy(() => import('@/pages/system/Backup/Restore'));
const MaintenanceMode = lazy(() => import('@/pages/system/Maintenance/MaintenanceMode'));
const SystemConfiguration = lazy(() => import('@/pages/system/Configuration/SystemConfiguration'));
const ApplicationConfiguration = lazy(() => import('@/pages/system/Configuration/ApplicationConfiguration'));
const SecurityConfiguration = lazy(() => import('@/pages/system/Configuration/SecurityConfiguration'));
const EmailConfiguration = lazy(() => import('@/pages/system/Configuration/EmailConfiguration'));
const NotificationConfiguration = lazy(() => import('@/pages/system/Configuration/NotificationConfiguration'));
const About = lazy(() => import('@/pages/system/About/About'));
const VersionInfo = lazy(() => import('@/pages/system/About/VersionInfo'));

// --- Help Center ---
const HelpCenter = lazy(() => import('@/pages/system/Help/HelpCenter'));
const FAQ = lazy(() => import('@/pages/system/Help/FAQ'));
const Feedback = lazy(() => import('@/pages/system/Help/Feedback'));
const SupportTickets = lazy(() => import('@/pages/system/Help/SupportTickets'));
const TicketDetails = lazy(() => import('@/pages/system/Help/TicketDetails'));

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'));
// Dev-only QA utility, not part of the product surface — see the
// component's own doc comment. Safe to remove before a real launch.
const DevSitemap = lazy(() => import('@/pages/DevSitemap'));

/**
 * Top-level route table. Public auth routes are unguarded; each
 * role's area sits behind its own role-guard route AND the shared
 * PageWrapper shell (navbar/sidebar/footer). Every route is code-split
 * via React.lazy, with PageLoader as the Suspense fallback.
 *
 * Student routes are nested under a single StudentRoute + PageWrapper
 * pair (rather than repeating the guard per page) so role validation
 * happens once per navigation into the area, not once per page.
 * layout/Breadcrumb auto-generates its trail from these paths, so no
 * separate breadcrumb config is needed here.
 */
const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public auth routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

      {/* Authenticated, role-agnostic */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PageWrapper />}>
          <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
        </Route>
      </Route>

      {/* Student area */}
      <Route element={<StudentRoute />}>
        <Route element={<PageWrapper />}>
          <Route path={ROUTES.STUDENT.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.STUDENT.ATTENDANCE} element={<Attendance />} />
          <Route path={ROUTES.STUDENT.ATTENDANCE_HISTORY} element={<AttendanceHistory />} />
          <Route path={ROUTES.STUDENT.ATTENDANCE_DETAILS} element={<AttendanceDetails />} />
          <Route path={ROUTES.STUDENT.PROFILE} element={<Profile />} />
          <Route path={ROUTES.STUDENT.PROFILE_EDIT} element={<EditProfile />} />
          <Route path={ROUTES.STUDENT.QR_ATTENDANCE} element={<ScanQR />} />
          <Route path={ROUTES.STUDENT.QR_HISTORY} element={<QRHistory />} />
          <Route path={ROUTES.STUDENT.FACE_RECOGNITION} element={<FaceVerification />} />
          <Route path={ROUTES.STUDENT.FACE_HISTORY} element={<FaceHistory />} />
          <Route path={ROUTES.STUDENT.LEAVE_APPLY} element={<ApplyLeave />} />
          <Route path={ROUTES.STUDENT.LEAVE_HISTORY} element={<LeaveHistory />} />
          <Route path={ROUTES.STUDENT.TIMETABLE} element={<Timetable />} />
          <Route path={ROUTES.STUDENT.SUBJECTS} element={<Subjects />} />
          <Route path={ROUTES.STUDENT.REPORTS} element={<Reports />} />
          <Route path={ROUTES.STUDENT.NOTIFICATIONS} element={<Notifications />} />
          <Route path={ROUTES.STUDENT.SETTINGS} element={<Settings />} />
        </Route>
      </Route>

      {/* Faculty area */}
      <Route element={<FacultyRoute />}>
        <Route element={<PageWrapper />}>
          <Route path={ROUTES.FACULTY.DASHBOARD} element={<FacultyDashboardPage />} />
          <Route path={ROUTES.FACULTY.ATTENDANCE_MARK} element={<MarkAttendance />} />
          <Route path={ROUTES.FACULTY.ATTENDANCE_HISTORY} element={<FacultyAttendanceHistory />} />
          <Route path={ROUTES.FACULTY.ATTENDANCE_DETAILS} element={<FacultyAttendanceDetails />} />
          <Route path={ROUTES.FACULTY.STUDENTS} element={<Students />} />
          <Route path={ROUTES.FACULTY.STUDENT_DETAILS} element={<StudentDetails />} />
          <Route path={ROUTES.FACULTY.SUBJECTS} element={<FacultySubjects />} />
          <Route path={ROUTES.FACULTY.SUBJECT_DETAILS} element={<FacultySubjectDetails />} />
          <Route path={ROUTES.FACULTY.LEAVE_APPROVAL} element={<LeaveApproval />} />
          <Route path={ROUTES.FACULTY.LEAVE_DETAILS} element={<LeaveDetails />} />
          <Route path={ROUTES.FACULTY.TIMETABLE} element={<FacultyTimetable />} />
          <Route path={ROUTES.FACULTY.REPORTS} element={<FacultyReports />} />
          <Route path={ROUTES.FACULTY.NOTIFICATIONS} element={<FacultyNotifications />} />
          <Route path={ROUTES.FACULTY.PROFILE} element={<FacultyProfile />} />
          <Route path={ROUTES.FACULTY.PROFILE_EDIT} element={<FacultyEditProfile />} />
          <Route path={ROUTES.FACULTY.SETTINGS} element={<FacultySettings />} />
        </Route>
      </Route>

      {/* Admin area */}
      <Route element={<AdminRoute />}>
        <Route element={<PageWrapper />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboardPage />} />
          <Route path={ROUTES.ADMIN.STUDENTS} element={<AdminStudents />} />
          <Route path={ROUTES.ADMIN.STUDENTS_ADD} element={<AddStudent />} />
          <Route path={ROUTES.ADMIN.STUDENTS_EDIT} element={<EditStudent />} />
          <Route path={ROUTES.ADMIN.STUDENT_DETAILS} element={<AdminStudentDetails />} />
          <Route path={ROUTES.ADMIN.FACULTY} element={<AdminFaculty />} />
          <Route path={ROUTES.ADMIN.FACULTY_ADD} element={<AddFaculty />} />
          <Route path={ROUTES.ADMIN.FACULTY_EDIT} element={<EditFaculty />} />
          <Route path={ROUTES.ADMIN.FACULTY_DETAILS} element={<AdminFacultyDetails />} />
          <Route path={ROUTES.ADMIN.DEPARTMENTS} element={<Departments />} />
          <Route path={ROUTES.ADMIN.DEPARTMENTS_ADD} element={<AddDepartment />} />
          <Route path={ROUTES.ADMIN.DEPARTMENTS_EDIT} element={<EditDepartment />} />
          <Route path={ROUTES.ADMIN.COURSES} element={<Courses />} />
          <Route path={ROUTES.ADMIN.COURSES_ADD} element={<AddCourse />} />
          <Route path={ROUTES.ADMIN.COURSES_EDIT} element={<EditCourse />} />
          <Route path={ROUTES.ADMIN.SUBJECTS} element={<AdminSubjects />} />
          <Route path={ROUTES.ADMIN.SUBJECTS_ADD} element={<AddSubject />} />
          <Route path={ROUTES.ADMIN.SUBJECTS_EDIT} element={<EditSubject />} />
          <Route path={ROUTES.ADMIN.ATTENDANCE} element={<AdminAttendance />} />
          <Route path={ROUTES.ADMIN.ATTENDANCE_ANALYTICS} element={<AttendanceAnalytics />} />
          <Route path={ROUTES.ADMIN.TIMETABLE} element={<AdminTimetable />} />
          <Route path={ROUTES.ADMIN.TIMETABLE_CREATE} element={<CreateTimetable />} />
          <Route path={ROUTES.ADMIN.TIMETABLE_EDIT} element={<EditTimetable />} />
          <Route path={ROUTES.ADMIN.REPORTS} element={<AdminReports />} />
          <Route path={ROUTES.ADMIN.NOTIFICATIONS} element={<AdminNotifications />} />
          <Route path={ROUTES.ADMIN.NOTIFICATIONS_SEND} element={<SendNotification />} />
          <Route path={ROUTES.ADMIN.PROFILE} element={<AdminProfile />} />
          <Route path={ROUTES.ADMIN.PROFILE_EDIT} element={<AdminEditProfile />} />
          <Route path={ROUTES.ADMIN.SETTINGS} element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Advanced Attendance module — cross-role (student/faculty/admin) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PageWrapper />}>
          <Route path={ROUTES.ATTENDANCE.QR_GENERATE} element={<GenerateQR />} />
          <Route path={ROUTES.ATTENDANCE.QR_SCAN} element={<AdvancedScanQR />} />
          <Route path={ROUTES.ATTENDANCE.QR_HISTORY} element={<AdvancedQRHistory />} />
          <Route path={ROUTES.ATTENDANCE.QR_ANALYTICS} element={<QRAnalytics />} />
          <Route path={ROUTES.ATTENDANCE.FACE_REGISTER} element={<RegisterFace />} />
          <Route path={ROUTES.ATTENDANCE.FACE_VERIFY} element={<VerifyFace />} />
          <Route path={ROUTES.ATTENDANCE.FACE_HISTORY} element={<RecognitionHistory />} />
          <Route path={ROUTES.ATTENDANCE.FACE_ANALYTICS} element={<RecognitionAnalytics />} />
          <Route path={ROUTES.ATTENDANCE.LIVE} element={<LiveAttendance />} />
          <Route path={ROUTES.ATTENDANCE.MONITOR} element={<AttendanceMonitor />} />
          <Route path={ROUTES.ATTENDANCE.MAP} element={<AttendanceMap />} />
          <Route path={ROUTES.ATTENDANCE.LOGS} element={<AttendanceLogs />} />
          <Route path={ROUTES.ATTENDANCE.DASHBOARD} element={<AttendanceDashboard />} />
          <Route path={ROUTES.ATTENDANCE.SUBJECT_ANALYTICS} element={<SubjectAnalyticsPage />} />
          <Route path={ROUTES.ATTENDANCE.DEPARTMENT_ANALYTICS} element={<DepartmentAnalyticsPage />} />
          <Route path={ROUTES.ATTENDANCE.STUDENT_ANALYTICS} element={<StudentAnalyticsPage />} />
          <Route path={ROUTES.ATTENDANCE.FACULTY_ANALYTICS} element={<FacultyAnalyticsPage />} />
        </Route>
      </Route>

      {/* Enterprise Reports & Analytics Center — cross-role (student/faculty/admin) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PageWrapper />}>
          <Route path={ROUTES.ANALYTICS.DASHBOARD} element={<AnalyticsDashboard />} />
          <Route path={ROUTES.ANALYTICS.ATTENDANCE} element={<CenterAttendanceAnalytics />} />
          <Route path={ROUTES.ANALYTICS.STUDENTS} element={<StudentPerformance />} />
          <Route path={ROUTES.ANALYTICS.FACULTY} element={<FacultyPerformance />} />
          <Route path={ROUTES.ANALYTICS.DEPARTMENTS} element={<CenterDepartmentAnalytics />} />
          <Route path={ROUTES.ANALYTICS.COURSES} element={<CourseAnalytics />} />
          <Route path={ROUTES.ANALYTICS.SUBJECTS} element={<CenterSubjectAnalytics />} />
          <Route path={ROUTES.ANALYTICS.TRENDS} element={<TrendAnalysis />} />
          <Route path={ROUTES.ANALYTICS.CUSTOM} element={<CustomReports />} />
          <Route path={ROUTES.ANALYTICS.EXPORT} element={<ExportCenter />} />
        </Route>
      </Route>

      {/* Enterprise System Management — admin only */}
      <Route element={<AdminRoute />}>
        <Route element={<PageWrapper />}>
          <Route path={ROUTES.SYSTEM.DASHBOARD} element={<SystemDashboard />} />
          <Route path={ROUTES.SYSTEM.HEALTH} element={<SystemHealth />} />
          <Route path={ROUTES.SYSTEM.APP_HEALTH} element={<ApplicationHealth />} />
          <Route path={ROUTES.SYSTEM.AUDIT_LOGS} element={<AuditLogs />} />
          <Route path={ROUTES.SYSTEM.ACTIVITY_LOGS} element={<ActivityLogs />} />
          <Route path={ROUTES.SYSTEM.ROLES} element={<RoleManagement />} />
          <Route path={ROUTES.SYSTEM.ROLES_ADD} element={<AddRole />} />
          <Route path={ROUTES.SYSTEM.ROLES_EDIT} element={<EditRole />} />
          <Route path={ROUTES.SYSTEM.PERMISSIONS} element={<PermissionManagement />} />
          <Route path={ROUTES.SYSTEM.PERMISSION_MATRIX} element={<RolePermissionMatrix />} />
          <Route path={ROUTES.SYSTEM.BACKUP} element={<SystemBackup />} />
          <Route path={ROUTES.SYSTEM.RESTORE} element={<SystemRestore />} />
          <Route path={ROUTES.SYSTEM.MAINTENANCE} element={<MaintenanceMode />} />
          <Route path={ROUTES.SYSTEM.CONFIG_SYSTEM} element={<SystemConfiguration />} />
          <Route path={ROUTES.SYSTEM.CONFIG_APPLICATION} element={<ApplicationConfiguration />} />
          <Route path={ROUTES.SYSTEM.CONFIG_SECURITY} element={<SecurityConfiguration />} />
          <Route path={ROUTES.SYSTEM.CONFIG_EMAIL} element={<EmailConfiguration />} />
          <Route path={ROUTES.SYSTEM.CONFIG_NOTIFICATIONS} element={<NotificationConfiguration />} />
          <Route path={ROUTES.SYSTEM.ABOUT} element={<About />} />
          <Route path={ROUTES.SYSTEM.VERSION} element={<VersionInfo />} />
        </Route>
      </Route>

      {/* Help Center — any authenticated user (student/faculty/admin) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PageWrapper />}>
          <Route path={ROUTES.HELP.CENTER} element={<HelpCenter />} />
          <Route path={ROUTES.HELP.FAQ} element={<FAQ />} />
          <Route path={ROUTES.HELP.FEEDBACK} element={<Feedback />} />
          <Route path={ROUTES.HELP.TICKETS} element={<SupportTickets />} />
          <Route path={ROUTES.HELP.TICKET_DETAILS} element={<TicketDetails />} />
        </Route>
      </Route>

      {/* Utility routes */}
      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
      <Route path="/dev/sitemap" element={<DevSitemap />} />
      <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
