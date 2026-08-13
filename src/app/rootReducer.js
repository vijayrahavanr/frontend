import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../redux/slices/authSlice';
import adminReducer from '../redux/slices/adminSlice';
import studentReducer from '../redux/slices/studentSlice';
import facultyReducer from '../redux/slices/facultySlice';
import attendanceReducer from '../redux/slices/attendanceSlice';
import departmentReducer from '../redux/slices/departmentSlice';
import courseReducer from '../redux/slices/courseSlice';
import subjectReducer from '../redux/slices/subjectSlice';
import qrAttendanceReducer from '../redux/slices/qrAttendanceSlice';
import faceRecognitionReducer from '../redux/slices/faceRecognitionSlice';
import leaveReducer from '../redux/slices/leaveSlice';
import reportReducer from '../redux/slices/reportSlice';
import notificationReducer from '../redux/slices/notificationSlice';
import timetableReducer from '../redux/slices/timetableSlice';
import systemReducer from '../redux/slices/systemSlice';
import roleReducer from '../redux/slices/roleSlice';
import helpReducer from '../redux/slices/helpSlice';

// Note on auth + persistence: authSlice is deliberately NOT wrapped in
// a persistReducer here (see store.js). Session restore is already
// handled end-to-end by utils/tokenManager.js + hooks/useAuthInit.js:
// tokenManager writes the token/user to localStorage or sessionStorage
// depending on Remember Me, and useAuthInit re-derives the full Redux
// auth state from a valid stored token via getProfile() on every app
// start. Layering redux-persist's single fixed storage engine on top
// would (a) duplicate that source of truth and (b) always write to
// localStorage regardless of Remember Me, silently breaking the
// "don't remember me → sessionStorage, cleared on browser close"
// requirement. Persist other slices here later if they need to
// survive a refresh — just wrap them the same way store.js's
// persistConfig.whitelist expects.
export const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  student: studentReducer,
  faculty: facultyReducer,
  attendance: attendanceReducer,
  department: departmentReducer,
  course: courseReducer,
  subject: subjectReducer,
  qrAttendance: qrAttendanceReducer,
  faceRecognition: faceRecognitionReducer,
  leave: leaveReducer,
  report: reportReducer,
  notification: notificationReducer,
  timetable: timetableReducer,
  system: systemReducer,
  role: roleReducer,
  help: helpReducer,
});

export default rootReducer;
