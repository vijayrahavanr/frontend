export const ROLES = Object.freeze({
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
});

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.FACULTY]: 'Faculty',
  [ROLES.STUDENT]: 'Student',
};

export default ROLES;
