import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useTimetable } from '@/hooks/useTimetable';
import { useSubjects } from '@/hooks/useSubjects';
import { useFaculty } from '@/hooks/useFaculty';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';

const SECTION_OPTIONS = [
  { label: 'Section A', value: 'A' },
  { label: 'Section B', value: 'B' },
];
const DAY_OPTIONS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => ({
  label: d,
  value: d,
}));

/**
 * New timetable period creation form — dispatches timetableSlice's
 * createTimetable thunk via useTimetable. Subject/faculty options
 * come from the shared subject/faculty slices.
 */
const CreateTimetable = () => {
  const navigate = useNavigate();
  const { loading, addTimetable } = useTimetable();
  const { subjects, fetchSubjects } = useSubjects();
  const { facultyList, fetchFacultyList } = useFaculty();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { subject: '', section: '', faculty: '', day: '', time: '', room: '' } });

  useEffect(() => {
    fetchSubjects();
    fetchFacultyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subjectOptions = subjects.map((s) => ({ label: s.name, value: s.code }));
  const facultyOptions = facultyList.map((f) => ({ label: f.name, value: f.id }));

  const onSubmit = async (values) => {
    const result = await addTimetable(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Timetable period created successfully.');
      navigate('/admin/timetable');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Create Timetable" subtitle="Schedule a new class period" />

      <Link
        to="/admin/timetable"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to timetable
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Period Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select label="Subject" options={subjectOptions} required error={errors.subject} {...register('subject', { required: 'Select a subject' })} />
            <Select label="Section" options={SECTION_OPTIONS} required error={errors.section} {...register('section', { required: 'Select a section' })} />
            <Select label="Faculty" options={facultyOptions} required error={errors.faculty} {...register('faculty', { required: 'Select a faculty member' })} />
            <Select label="Day" options={DAY_OPTIONS} required error={errors.day} {...register('day', { required: 'Select a day' })} />
            <Input label="Time" placeholder="e.g. 09:00 AM" required error={errors.time} {...register('time', { required: 'Time is required' })} />
            <Input label="Room" required error={errors.room} {...register('room', { required: 'Room is required' })} />
          </div>
        </Section>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outlined" onClick={() => navigate('/admin/timetable')}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<FiPlus size={15} />} loading={loading}>
            Create Period
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTimetable;
