import { useState } from 'react';
import { useAttendanceAnalytics } from '@/hooks/useAttendanceAnalytics';
import Header from '@/components/common/Header';
import AttendanceSearch from '@/components/attendance/AttendanceSearch';
import AttendanceSummaryCard from '@/components/attendance/AttendanceSummaryCard';
import AttendanceChartCard from '@/components/attendance/AttendanceChartCard';
import EmptyState from '@/components/empty-state/EmptyState';
import Skeleton from '@/components/common/Skeleton';
import { formatChartData } from '@/utils/dashboardHelpers';

/**
 * Per-student attendance analytics — backed by attendanceSlice's
 * studentAnalytics via useAttendanceAnalytics. Search dispatches the
 * fetch for the matched student.
 */
const StudentAnalytics = () => {
  const [query, setQuery] = useState('');
  const { studentAnalytics, loading, fetchStudentAnalytics } = useAttendanceAnalytics();

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim().length > 2) fetchStudentAnalytics({ studentId: value });
  };

  const subjectChart = formatChartData(studentAnalytics?.subjectBreakdown ?? []);

  return (
    <div className="flex flex-col gap-6">
      <Header title="Student Analytics" description="Individual attendance breakdown by student" />

      <AttendanceSearch
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for a student by name or roll number..."
        className="max-w-sm"
      />

      {loading ? (
        <Skeleton className="h-32 rounded-2xl" />
      ) : !studentAnalytics ? (
        <EmptyState title="Search for a student to view their analytics" />
      ) : (
        <>
          <AttendanceSummaryCard
            title={`${studentAnalytics.name} (${studentAnalytics.rollNumber})`}
            percentage={studentAnalytics.percentage}
            present={studentAnalytics.present}
            absent={studentAnalytics.absent}
            late={studentAnalytics.late}
          />

          <AttendanceChartCard
            type="bar"
            title="Subject-wise Attendance"
            subtitle="Current semester"
            labels={subjectChart.labels}
            data={[{ label: 'Attendance %', data: subjectChart.data }]}
          />
        </>
      )}
    </div>
  );
};

export default StudentAnalytics;
