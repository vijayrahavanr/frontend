import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiUpload, FiDownload } from 'react-icons/fi';
import { useStudents } from '@/hooks/useStudents';
import AdminTopbar from '@/components/admin/AdminTopbar';
import DataTable from '@/components/tables/DataTable';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';

const DEPARTMENT_OPTIONS = [
  { label: 'All departments', value: 'all' },
  { label: 'Computer Science', value: 'CSE' },
  { label: 'Electronics', value: 'ECE' },
  { label: 'Mechanical', value: 'ME' },
];

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
];

const COLUMNS = [
  { key: 'rollNumber', header: 'Roll No.', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'department', header: 'Department', hideOnMobile: true },
  { key: 'semester', header: 'Semester', hideOnMobile: true },
  { key: 'attendance', header: 'Attendance', sortable: true, render: (row) => `${row.attendance}%` },
  { key: 'status', header: 'Status', status: true },
];

/**
 * Admin student roster — backed by studentSlice's admin CRUD via
 * useStudents.
 */
const Students = () => {
  const navigate = useNavigate();
  const { students, loading, error, fetchStudents, removeStudent } = useStudents();
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStudents({
      department: department === 'all' ? undefined : department,
      status: status === 'all' ? undefined : status,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department, status]);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    const result = await removeStudent(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Student deleted successfully.');
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar
        title="Students"
        subtitle="Manage student records across all departments"
        actions={
          <>
            <Button variant="outlined" size="sm" startIcon={<FiUpload size={14} />}>
              Import
            </Button>
            <Button variant="outlined" size="sm" startIcon={<FiDownload size={14} />}>
              Export
            </Button>
            <Link to="/admin/students/add">
              <Button size="sm" startIcon={<FiPlus size={14} />}>
                Add Student
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:max-w-md sm:grid-cols-2">
        <Select label="Department" options={DEPARTMENT_OPTIONS} value={department} onChange={(e) => setDepartment(e.target.value)} />
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>

      <DataTable
        columns={COLUMNS}
        data={students}
        loading={loading}
        error={error}
        onRetry={() => fetchStudents({ department, status })}
        pageSize={10}
        searchKeys={['name', 'rollNumber', 'department']}
        rowActions={(row) => (
          <div className="flex justify-end gap-1">
            <IconButton icon={<FiEye size={14} />} aria-label={`View ${row.name}`} size="sm" variant="ghost" onClick={() => navigate(`/admin/students/${row.id}`)} />
            <IconButton icon={<FiEdit2 size={14} />} aria-label={`Edit ${row.name}`} size="sm" variant="ghost" onClick={() => navigate(`/admin/students/${row.id}/edit`)} />
            <IconButton icon={<FiTrash2 size={14} />} aria-label={`Delete ${row.name}`} size="sm" variant="ghost" onClick={() => setDeleteTarget(row)} />
          </div>
        )}
      />

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        variant="delete"
        title="Delete student record?"
        description={`${deleteTarget?.name}'s record will be permanently removed.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default Students;
