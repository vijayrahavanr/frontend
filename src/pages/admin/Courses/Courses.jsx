import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useCourses } from '@/hooks/useCourses';
import AdminTopbar from '@/components/admin/AdminTopbar';
import CourseCard from '@/components/admin/CourseCard';
import IconButton from '@/components/common/IconButton';
import Button from '@/components/common/Button';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const Courses = () => {
  const navigate = useNavigate();
  const { courses, loading, error, fetchCourses, removeCourse } = useCourses();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    const result = await removeCourse(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Course deleted successfully.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchCourses} />;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar
        title="Courses"
        subtitle="Manage academic courses/programs"
        actions={
          <Link to="/admin/courses/add">
            <Button size="sm" startIcon={<FiPlus size={14} />}>
              Add Course
            </Button>
          </Link>
        }
      />

      {loading && !courses.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <EmptyState title="No courses yet" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              action={
                <div className="flex justify-end gap-1">
                  <IconButton icon={<FiEdit2 size={14} />} aria-label={`Edit ${course.name}`} size="sm" variant="ghost" onClick={() => navigate(`/admin/courses/${course.id}/edit`)} />
                  <IconButton icon={<FiTrash2 size={14} />} aria-label={`Delete ${course.name}`} size="sm" variant="ghost" onClick={() => setDeleteTarget(course)} />
                </div>
              }
            />
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        variant="delete"
        title="Delete course?"
        description={`${deleteTarget?.name} will be permanently removed.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default Courses;
