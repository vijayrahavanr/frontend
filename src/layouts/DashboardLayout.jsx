import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/footer/Footer';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import { logout, selectCurrentUser } from '@/redux/slices/authSlice';

/**
 * Application shell: fixed Navbar, collapsible Sidebar, routed page
 * content in the middle, Footer pinned to the bottom.
 * Wrap protected route groups with this via a layout route.
 */
const PageWrapper = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__content">
        <Navbar user={user} onLogout={() => dispatch(logout())} />
        <main className="app-container flex-1 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PageWrapper;
