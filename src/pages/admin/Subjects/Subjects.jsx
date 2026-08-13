import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';
import { useSubjects } from '@/hooks/useSubjects';
import { useFaculty } from '@/hooks/useFaculty';
import AdminTopbar from '@/components/admin/AdminTopbar';
import SubjectCard from '@/components/admin/SubjectCard';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
import Select from '@/components/common/Select';
import Modal from '@/components/modals/Modal';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

/**
 * Subject list — backed by subjectSlice via useSubjects, with an
 * assign-faculty modal wired to subjectSlice's assignFaculty thunk.
 */
const Subjects = () => {
  const navigate = useNavigate();
  const { subjects, loading, error, fetchSubjects, removeSubject, assignSubjectFaculty } = useSubjects();
  const { facultyList, fetchFacultyList } = useFaculty();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [assignTarget, setAssignTarget] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchSubjects();
    fetchFacultyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const facultyOptions = (facultyList ?? []).map((f) => ({ label: f.name, value: f.id }));

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    const result = await removeSubject(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Subject deleted successfully.');
  };

  const handleAssignConfirm = async () => {
    setAssigning(true);
    const result = await assignSubjectFaculty(assignTarget.id, selectedFaculty);
    setAssigning(false);
    setAssignTarget(null);
    setSelectedFaculty('');
    if (result.meta.requestStatus === 'fulfilled') toast.success('Faculty assigned successfully.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchSubjects} />;

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar
        title="Subjects"
        subtitle="Manage subjects and faculty assignments"
        actions={
          <Link to="/admin/subjects/add">
            <Button size="sm" startIcon={<FiPlus size={14} />}>
              Add Subject
            </Button>
          </Link>
        }
      />

      {loading && !subjects.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : subjects.length === 0 ? (
        <EmptyState title="No subjects yet" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              action={
                <div className="flex gap-1">
                  <IconButton
                    icon={<FiUserPlus size={14} />}
                    aria-label={`Assign faculty for ${subject.name}`}
                    size="sm"
                    variant="ghost"
                    onClick={() => setAssignTarget(subject)}
                  />
                  <IconButton icon={<FiEdit2 size={14} />} aria-label={`Edit ${subject.name}`} size="sm" variant="ghost" onClick={() => navigate(`/admin/subjects/${subject.id}/edit`)} />
                  <IconButton icon={<FiTrash2 size={14} />} aria-label={`Delete ${subject.name}`} size="sm" variant="ghost" onClick={() => setDeleteTarget(subject)} />
                </div>
              }
            />
          ))}
        </div>
      )}

      <Modal
        open={Boolean(assignTarget)}
        onClose={() => setAssignTarget(null)}
        title="Assign Faculty"
        size="sm"
        footer={
          <>
            <Button variant="outlined" onClick={() => setAssignTarget(null)}>
              Cancel
            </Button>
            <Button onClick={handleAssignConfirm} loading={assigning} disabled={!selectedFaculty}>
              Assign
            </Button>
          </>
        }
      >
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Choose a faculty member to teach <strong>{assignTarget?.name}</strong>.
        </p>
        <Select
          label="Faculty"
          options={facultyOptions}
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
        />
      </Modal>

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        variant="delete"
        title="Delete subject?"
        description={`${deleteTarget?.name} will be permanently removed.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default Subjects;
