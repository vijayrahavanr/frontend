import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useStudents } from '@/hooks/useStudents';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import CircularProgress from '@/components/common/CircularProgress';
import Skeleton from '@/components/common/Skeleton';
import ErrorState from '@/components/error/ErrorState';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';

/**
 * Admin student detail view — backed by studentSlice's studentDetails
 * via useStudents, looked up by :id.
 */
const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { studentDetails, loading, error, fetchStudentById, removeStudent } = useStudents();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStudentById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    const result = await removeStudent(id);
    setDeleting(false);
    setDeleteOpen(false);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Student deleted successfully.');
      navigate('/admin/students');
    }
  };

  if (loading && !studentDetails) return <Skeleton className="h-64 rounded-2xl" />;
  if (error) return <ErrorState description={error} onRetry={() => fetchStudentById(id)} />;
  if (!studentDetails) return null;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Student Details" subtitle={`Record #${id}`} />

      <Link
        to="/admin/students"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to students
      </Link>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-surface-dark-elevated dark:shadow-card-dark sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={studentDetails.name} size="xl" />
          <div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-slate-900 dark:text-white">{studentDetails.name}</p>
              <Badge color={studentDetails.status === 'Active' ? 'success' : 'neutral'}>{studentDetails.status}</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Roll No. {studentDetails.rollNumber} · {studentDetails.department}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CircularProgress value={studentDetails.attendance ?? 0} size={64} />
          <div className="flex gap-2">
            <Link to={`/admin/students/${id}/edit`}>
              <Button variant="outlined" startIcon={<FiEdit2 size={14} />}>
                Edit
              </Button>
            </Link>
            <Button variant="danger" startIcon={<FiTrash2 size={14} />} onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
        <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Contact Information</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-slate-400">Email</dt>
            <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{studentDetails.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-400">Phone</dt>
            <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{studentDetails.phone}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-400">Semester</dt>
            <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{studentDetails.semester}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-400">Attendance</dt>
            <dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{studentDetails.attendance}%</dd>
          </div>
        </dl>
      </div>

      <ConfirmationDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        variant="delete"
        title="Delete student record?"
        description={`${studentDetails.name}'s record will be permanently removed.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default StudentDetails;
