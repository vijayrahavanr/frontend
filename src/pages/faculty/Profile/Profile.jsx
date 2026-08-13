import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiLock, FiBriefcase, FiPhone, FiAward } from 'react-icons/fi';
import { useFaculty } from '@/hooks/useFaculty';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import FacultyProfileCard from '@/components/faculty/FacultyProfileCard';
import FacultyInfoCard from '@/components/faculty/FacultyInfoCard';
import Button from '@/components/common/Button';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';

/**
 * Faculty profile — reads from facultySlice via useFaculty, fetching
 * the profile on mount if it isn't already loaded.
 */
const Profile = () => {
  const { profile, loading, error, fetchProfile } = useFaculty();

  useEffect(() => {
    if (!profile) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchProfile} />;

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar
        title="My Profile"
        subtitle="Your personal, academic, and contact information"
        actions={
          <>
            <Link to="/faculty/profile/edit">
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
        <FacultyProfileCard faculty={profile} />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {loading || !profile ? (
          <>
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl lg:col-span-2" />
          </>
        ) : (
          <>
            <FacultyInfoCard
              title="Department Details"
              icon={<FiBriefcase size={16} />}
              fields={[
                { label: 'Designation', value: profile.designation },
                { label: 'Department', value: profile.department },
                { label: 'Employee ID', value: profile.employeeId },
              ]}
            />

            <FacultyInfoCard
              title="Contact Details"
              icon={<FiPhone size={16} />}
              fields={[
                { label: 'Email', value: profile.email },
                { label: 'Phone', value: profile.phone },
                { label: 'Office', value: profile.office },
              ]}
            />

            <FacultyInfoCard
              title="Qualification & Experience"
              icon={<FiAward size={16} />}
              className="lg:col-span-2"
              fields={[
                { label: 'Qualification', value: profile.qualification },
                { label: 'Experience', value: profile.experience },
                { label: 'Specialization', value: profile.specialization },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
