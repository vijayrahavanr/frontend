import ConfirmationDialog from './ConfirmationDialog';

/**
 * Modal shown when a session ends involuntarily — an expired/invalid
 * token, a failed refresh, or an idle timeout. Reused for the idle
 * *warning* (with a "Stay signed in" escape hatch) by passing
 * `onStaySignedIn`; without it, it renders as a terminal "please log
 * back in" notice.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {string} [props.reason]
 * @param {() => void} props.onConfirm - navigate to /login (and clear the flag)
 * @param {() => void} [props.onStaySignedIn] - idle-warning mode only
 */
const SessionExpiredDialog = ({ open, reason, onConfirm, onStaySignedIn }) => (
  <ConfirmationDialog
    open={open}
    onClose={onStaySignedIn || onConfirm}
    onConfirm={onConfirm}
    variant="warning"
    title={onStaySignedIn ? "You've been inactive" : 'Session expired'}
    description={
      reason ||
      (onStaySignedIn
        ? "You'll be signed out soon due to inactivity."
        : 'Your session has ended. Please log in again to continue.')
    }
    confirmLabel={onStaySignedIn ? 'Log out now' : 'Log in again'}
    cancelLabel="Stay signed in"
    hideCancel={!onStaySignedIn}
  />
);

export default SessionExpiredDialog;
