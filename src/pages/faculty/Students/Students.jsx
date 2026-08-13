import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import DataTable from '@/components/tables/DataTable';
import Select from '@/components/common/Select';
import IconButton from '@/components/common/IconButton';
import Badge from '@/components/common/Badge';

const SECTION_OPTIONS = [
  { label: 'All sections', value: 'all' },
  { label: 'Section A', value: 'A' },
  { label: 'Section B', value: 'B' },
];

const STUDENTS = Array.from({ length: 26 }).map((_, i) => ({
  id: i + 1,
  rollNumber: `CS21B0${40 + i}`,
  name: `Student ${i + 1}`,
  section: i % 2 === 0 ? 'A' : 'B',
  attendance: 60 + ((i * 3) % 40),
  status: 60 + ((i * 3) % 40) >= 75 ? 'Good Standing' : 'At Risk',
}));

const COLUMNS = [
  { key: 'rollNumber', header: 'Roll No.', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'section', header: 'Section', hideOnMobile: true },
  { key: 'attendance', header: 'Attendance', sortable: true, render: (row) => `${row.attendance}%` },
  { key: 'status', header: 'Status', status: true },
];

/**
 * Faculty-facing student roster: searchable, filterable by section,
 * paginated (all via the shared DataTable).
 */
const Students = () => {
  const [section, setSection] = useState('all');

  const rows = section === 'all' ? STUDENTS : STUDENTS.filter((s) => s.section === section);

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="Students" subtitle="Students enrolled in your sections" />

      <div className="flex items-center gap-3">
        <Badge color="primary">{rows.length} students</Badge>
        <div className="max-w-xs flex-1">
          <Select
            label="Filter by section"
            options={SECTION_OPTIONS}
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={COLUMNS}
        data={rows}
        pageSize={10}
        searchKeys={['name', 'rollNumber']}
        rowActions={(row) => (
          <Link to={`/faculty/students/${row.id}`}>
            <IconButton icon={<FiEye size={14} />} aria-label={`View ${row.name}`} size="sm" variant="ghost" />
          </Link>
        )}
      />
    </div>
  );
};

export default Students;
