import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiLock, FiShield, FiPhone } from 'react-icons/fi';
import { useAdmin } from '@/hooks/useAdmin';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminProfileCard from '@/components/admin/AdminProfileCard';
import Button from '@/components/common/Button';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';

/**
 * Admin profile — reads from adminSlice via useAdmin, fetching the
 * profile on mount if it isn't already loaded.
 */
const Profile = () => {
  const { profile, loading, error, fetchProfile } = useAdmin();

  useEffect(() => {
    if (!profile) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchProfile} />;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar
        title="My Profile"
        subtitle="Your personal and account information"
        actions={
          <>
            <Link to="/admin/profile/edit">
              <Button variant="outlined" size="sm" startIcon={<FiEdit2 size={14} />}>
                Edit profile
              </Button>
            </Link>
            <Link to="/auth/change-password">
              <Button variant="outlined" size="sm" startIcon={<FiLock size={14} />}>
                Change password
              </Button>
            </Link>
          </>
        }
      />

      {loading || !profile ? (
        <Skeleton className="h-24 rounded-2xl" />
      ) : (
        <AdminProfileCard admin={profile} />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {loading || !profile ? (
          <>
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </>
        ) : (
          <>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <FiShield size={16} className="text-primary" />
                Account Information
              </h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-xs text-slate-400">Access Level</dt>
                  <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{profile.accessLevel}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Admin ID</dt>
                  <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{profile.adminId}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Joined</dt>
                  <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{profile.joinedOn}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <FiPhone size={16} className="text-primary" />
                Contact Details
              </h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-xs text-slate-400">Email</dt>
                  <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{profile.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Phone</dt>
                  <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{profile.phone}</dd>
                </div>
              </dl>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
