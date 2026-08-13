import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useFaculty } from '@/hooks/useFaculty';
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

const COLUMNS = [
  { key: 'employeeId', header: 'Employee ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'department', header: 'Department', hideOnMobile: true },
  { key: 'designation', header: 'Designation', hideOnMobile: true },
  { key: 'status', header: 'Status', status: true },
];

/**
 * Admin faculty roster — backed by facultySlice's admin CRUD via
 * useFaculty.
 */
const Faculty = () => {
  const navigate = useNavigate();
  const { facultyList, loading, error, fetchFacultyList, removeFaculty } = useFaculty();
  const [department, setDepartment] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchFacultyList({ department: department === 'all' ? undefined : department });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    const result = await removeFaculty(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Faculty member deleted successfully.');
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar
        title="Faculty"
        subtitle="Manage faculty records across all departments"
        actions={
          <Link to="/admin/faculty/add">
            <Button size="sm" startIcon={<FiPlus size={14} />}>
              Add Faculty
            </Button>
          </Link>
        }
      />

      <div className="max-w-xs">
        <Select label="Department" options={DEPARTMENT_OPTIONS} value={department} onChange={(e) => setDepartment(e.target.value)} />
      </div>

      <DataTable
        columns={COLUMNS}
        data={facultyList}
        loading={loading}
        error={error}
        onRetry={() => fetchFacultyList({ department })}
        pageSize={10}
        searchKeys={['name', 'employeeId', 'department', 'designation']}
        rowActions={(row) => (
          <div className="flex justify-end gap-1">
            <IconButton icon={<FiEye size={14} />} aria-label={`View ${row.name}`} size="sm" variant="ghost" onClick={() => navigate(`/admin/faculty/${row.id}`)} />
            <IconButton icon={<FiEdit2 size={14} />} aria-label={`Edit ${row.name}`} size="sm" variant="ghost" onClick={() => navigate(`/admin/faculty/${row.id}/edit`)} />
            <IconButton icon={<FiTrash2 size={14} />} aria-label={`Delete ${row.name}`} size="sm" variant="ghost" onClick={() => setDeleteTarget(row)} />
          </div>
        )}
      />

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        variant="delete"
        title="Delete faculty record?"
        description={`${deleteTarget?.name}'s record will be permanently removed.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default Faculty;
