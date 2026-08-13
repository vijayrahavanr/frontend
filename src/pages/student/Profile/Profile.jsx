import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiLock, FiBookOpen, FiPhone, FiUsers } from 'react-icons/fi';
import { useStudent } from '@/hooks/useStudent';
import StudentTopbar from '@/components/student/StudentTopbar';
import StudentProfileCard from '@/components/student/StudentProfileCard';
import StudentInfoCard from '@/components/student/StudentInfoCard';
import Button from '@/components/common/Button';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';

/**
 * Student profile — reads from studentSlice via useStudent, fetching
 * the profile on mount if it isn't already loaded.
 */
const Profile = () => {
  const { profile, loading, error, fetchProfile } = useStudent();

  useEffect(() => {
    if (!profile) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState description={error} onRetry={fetchProfile} />;

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar
        title="My Profile"
        subtitle="Your personal, academic, and contact information"
        actions={
          <>
            <Link to="/student/profile/edit">
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
        <StudentProfileCard student={profile} />
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
            <StudentInfoCard
              title="Academic Details"
              icon={<FiBookOpen size={16} />}
              fields={[
                { label: 'Roll Number', value: profile.rollNumber },
                { label: 'Department', value: profile.department },
                { label: 'Year / Semester', value: profile.year },
              ]}
            />

            <StudentInfoCard
              title="Contact Details"
              icon={<FiPhone size={16} />}
              fields={[
                { label: 'Email', value: profile.email },
                { label: 'Phone', value: profile.phone },
                { label: 'Address', value: profile.address },
              ]}
            />

            <StudentInfoCard
              title="Guardian Details"
              icon={<FiUsers size={16} />}
              className="lg:col-span-2"
              fields={[
                { label: 'Guardian Name', value: profile.guardianName },
                { label: 'Contact Number', value: profile.guardianPhone },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
