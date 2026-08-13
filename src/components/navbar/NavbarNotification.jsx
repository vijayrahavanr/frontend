import NotificationBell from '@/components/notifications/NotificationBell';

/**
 * Thin Navbar-scoped wrapper over NotificationBell — kept as its own
 * file so the Navbar composition stays declarative and this slot can
 * later gain navbar-specific behavior (e.g. fetching notifications)
 * without touching NotificationBell itself.
 *
 * @param {object} props
 * @param {object[]} props.notifications
 */
const NavbarNotification = (props) => <NotificationBell {...props} />;

export default NavbarNotification;
