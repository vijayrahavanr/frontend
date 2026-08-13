import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useReports } from '@/hooks/useReports';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import FacultyReportCard from '@/components/faculty/FacultyReportCard';
import BarChart from '@/components/charts/BarChart';
import ChartContainer from '@/components/common/ChartContainer';
import Section from '@/components/common/Section';
import EmptyState from '@/components/empty-state/EmptyState';
import { COLORS } from '@/constants/theme.constants';

/**
 * Faculty reports — backed by reportSlice's faculty-facing plural
 * actions (fetchAttendanceReports/fetchPerformanceReports) via
 * useReports.
 */
const Reports = () => {
  const { attendanceReports, loading, fetchAttendanceReports, downloadReports } = useReports();

  useEffect(() => {
    fetchAttendanceReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = async (reportId) => {
    const result = await downloadReports({ reportId, format: 'pdf' });
    if (result.meta.requestStatus === 'fulfilled') toast.success('Report download started.');
  };

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="Reports" subtitle="Generate and download attendance and performance reports" />

      <Section title="Available Reports" spacing="sm">
        {loading && !attendanceReports.length ? (
          <EmptyState title="Loading reports..." compact />
        ) : attendanceReports.length === 0 ? (
          <EmptyState title="No reports available" compact />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attendanceReports.map((report) => (
              <FacultyReportCard
                key={report.id}
                title={report.title}
                description={report.description}
                onDownload={() => handleDownload(report.id)}
              />
            ))}
          </div>
        )}
      </Section>

      <ChartContainer title="Section-wise Attendance" subtitle="Average attendance by section" loading={loading}>
        <BarChart
          labels={attendanceReports?.[0]?.sectionLabels ?? []}
          datasets={[
            { label: 'Attendance %', data: attendanceReports?.[0]?.sectionData ?? [], backgroundColor: COLORS.secondary },
          ]}
          height={260}
        />
      </ChartContainer>
    </div>
  );
};

export default Reports;
